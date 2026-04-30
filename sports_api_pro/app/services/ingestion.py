from datetime import datetime

from sqlalchemy import case, func, select
from sqlalchemy.orm import Session

from app.models import AlgoPerformance, Fixture, League, MatchResult, OddSnapshot, Team, TeamAlias
from app.services.analytics import BettingAlgorithms
from app.services.cache import cache_set
from app.services.fetcher import fetch_odds_by_sport, fetch_scores_by_sport, parse_commence_time
from app.services.normalizer import TeamNormalizer


normalizer = TeamNormalizer()


def upsert_league(db: Session, sport_name: str, league_key: str) -> League:
    league = db.execute(select(League).where(League.key == league_key)).scalar_one_or_none()
    if league:
        return league
    league = League(sport_name=sport_name.upper(), key=league_key, name=league_key.replace("_", " ").title())
    db.add(league)
    db.commit()
    db.refresh(league)
    return league


def ensure_team_refs(db: Session, sport_name: str, league_key: str, team_name: str) -> None:
    official_name = normalizer.normalize(sport_name, team_name)
    existing = db.execute(
        select(Team).where(Team.sport_name == sport_name.upper(), Team.official_name == official_name)
    ).scalar_one_or_none()
    if not existing:
        db.add(Team(sport_name=sport_name.upper(), official_name=official_name, league_key=league_key))
    alias = db.execute(
        select(TeamAlias).where(TeamAlias.sport_name == sport_name.upper(), TeamAlias.alias_name == team_name)
    ).scalar_one_or_none()
    if not alias:
        db.add(TeamAlias(sport_name=sport_name.upper(), alias_name=team_name, official_name=official_name))
    db.commit()


def build_market_recommendation(sport_name: str, bookmaker: str, market: str, selection: str, price: float) -> tuple[float, float, float]:
    if sport_name == "SOCCER":
        prediction = BettingAlgorithms.soccer_poisson(1.45, 1.1)
        probability = prediction["draw"] if selection.lower() == "draw" else prediction["home"] if "home" in selection.lower() else prediction["away"]
    elif sport_name == "MLB":
        prediction = BettingAlgorithms.mlb_log5(0.55, 0.48)
        probability = prediction["home"] if "home" in selection.lower() else prediction["away"]
    else:
        prediction = BettingAlgorithms.elo_prediction(1580, 1490)
        probability = prediction["home"] if "home" in selection.lower() else prediction["away"]

    fair_odd = BettingAlgorithms.fair_odd(probability)
    edge = BettingAlgorithms.edge_percent(price, fair_odd)
    kelly = BettingAlgorithms.kelly_fraction(price, probability)
    return fair_odd, edge, kelly


async def ingest_sport(db: Session, sport_name: str, sport_key: str) -> dict:
    events = await fetch_odds_by_sport(sport_key)
    inserted = 0

    for event in events:
        league = upsert_league(db, sport_name, sport_key)
        home_team = normalizer.normalize(sport_name, event["home_team"])
        away_team = normalizer.normalize(sport_name, event["away_team"])
        ensure_team_refs(db, sport_name, league.key, home_team)
        ensure_team_refs(db, sport_name, league.key, away_team)

        fixture = db.execute(select(Fixture).where(Fixture.external_id == event["id"])).scalar_one_or_none()
        if not fixture:
            fixture = Fixture(
                external_id=event["id"],
                sport_name=sport_name.upper(),
                league_key=league.key,
                home_team=home_team,
                away_team=away_team,
                event_date=parse_commence_time(event["commence_time"]),
                status="PREMATCH",
                commence_time_utc=event["commence_time"],
                metadata_json={"sport_key": sport_key},
            )
            db.add(fixture)
            db.flush()

        for bookmaker in event.get("bookmakers", []):
            for market in bookmaker.get("markets", []):
                for outcome in market.get("outcomes", []):
                    price = float(outcome["price"])
                    line_value = outcome.get("point")
                    snapshot = OddSnapshot(
                        fixture_id=fixture.id,
                        bookmaker=bookmaker["title"],
                        market_type=market["key"],
                        selection=outcome["name"],
                        line_value=float(line_value) if line_value is not None else None,
                        price=price,
                        implied_probability=round(1 / price, 4),
                        payload_json={"bookmaker_key": bookmaker.get("key")},
                        updated_at=datetime.utcnow(),
                    )
                    db.add(snapshot)

                    fair_odd, edge, kelly = build_market_recommendation(
                        sport_name.upper(),
                        bookmaker["title"],
                        market["key"],
                        outcome["name"],
                        price,
                    )
                    if edge >= 5:
                        db.add(
                            AlgoPerformance(
                                fixture_id=fixture.id,
                                sport_name=sport_name.upper(),
                                market_type=market["key"],
                                predicted_selection=outcome["name"],
                                predicted_probability=round(1 / fair_odd, 4),
                                fair_odd=fair_odd,
                                market_odd_at_bet=price,
                                edge_percent=edge,
                                kelly_fraction=kelly,
                                notes=f"Book {bookmaker['title']} sugiere value inicial para {outcome['name']}.",
                            )
                        )

        db.commit()
        inserted += 1
        cache_set(
            f"live_odds:{fixture.id}",
            {
                "fixture_id": fixture.id,
                "sport": fixture.sport_name,
                "league": fixture.league_key,
                "home_team": fixture.home_team,
                "away_team": fixture.away_team,
                "event_date": fixture.event_date.isoformat(),
            },
            ttl_seconds=300,
        )

    return {"sport": sport_name, "fetched": len(events), "fixtures_processed": inserted}


async def ingest_all_sports(db: Session, sports_config: dict[str, str]) -> list[dict]:
    results = []
    for sport_name, sport_key in sports_config.items():
        try:
            results.append(await ingest_sport(db, sport_name, sport_key))
        except Exception as exc:
            results.append({"sport": sport_name, "error": str(exc)})
    return results


async def update_finished_matches(db: Session, sports_config: dict[str, str]) -> list[dict]:
    updates = []
    for sport_name, sport_key in sports_config.items():
        try:
            scores = await fetch_scores_by_sport(sport_key, days_from=2)
        except Exception as exc:
            updates.append({"sport": sport_name, "error": str(exc)})
            continue

        changed = 0
        for item in scores:
            if not item.get("completed"):
                continue
            fixture = db.execute(select(Fixture).where(Fixture.external_id == item["id"])).scalar_one_or_none()
            if not fixture or fixture.status == "FINISHED":
                continue

            score_map = {score["name"]: int(score["score"]) for score in item.get("scores", [])}
            home_score = score_map.get(item["home_team"])
            away_score = score_map.get(item["away_team"])
            if home_score is None or away_score is None:
                continue

            winner_name = None
            if home_score > away_score:
                winner_name = fixture.home_team
            elif away_score > home_score:
                winner_name = fixture.away_team
            else:
                winner_name = "Draw"

            fixture.status = "FINISHED"
            result = db.execute(select(MatchResult).where(MatchResult.fixture_id == fixture.id)).scalar_one_or_none()
            if not result:
                db.add(
                    MatchResult(
                        fixture_id=fixture.id,
                        home_score=home_score,
                        away_score=away_score,
                        final_status="FINAL",
                        winner_name=winner_name,
                    )
                )
            perf_rows = db.execute(select(AlgoPerformance).where(AlgoPerformance.fixture_id == fixture.id)).scalars().all()
            for perf in perf_rows:
                perf.was_correct = perf.predicted_selection.lower() in {winner_name.lower(), item["home_team"].lower() if winner_name == fixture.home_team else "", item["away_team"].lower() if winner_name == fixture.away_team else ""}
                perf.profit_loss = round(perf.market_odd_at_bet - 1, 2) if perf.was_correct else -1.0
            db.commit()
            changed += 1

        updates.append({"sport": sport_name, "finished_updated": changed})
    return updates


def performance_summary(db: Session) -> list[dict]:
    rows = db.execute(
        select(
            AlgoPerformance.sport_name,
            func.count(AlgoPerformance.id),
            func.sum(func.coalesce(AlgoPerformance.profit_loss, 0.0)),
            func.avg(case((AlgoPerformance.was_correct == True, 1), else_=0)),
        ).group_by(AlgoPerformance.sport_name)
    ).all()

    return [
        {
            "sport": sport,
            "total_bets": total,
            "total_profit": round(float(profit or 0.0), 2),
            "win_rate": round(float((win_rate or 0.0) * 100), 2),
        }
        for sport, total, profit, win_rate in rows
    ]
