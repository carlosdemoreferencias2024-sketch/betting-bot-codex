from datetime import datetime, timezone
import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import desc, select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.database import get_db
from app.models import AlgoPerformance, Fixture, League, MatchResult, OddSnapshot
from app.schemas import HealthSchema, ValuePickSchema
from app.services.cache import get_redis_client
from app.services.ingestion import ingest_all_sports, performance_summary, update_finished_matches
from app.services.outliers import detect_outliers


router = APIRouter()


@router.get("/health", response_model=HealthSchema)
def health(db: Session = Depends(get_db)):
    postgres_ok = True
    redis_ok = False

    try:
        db.execute(select(League.id).limit(1))
    except Exception:
        postgres_ok = False

    client = get_redis_client()
    if client:
        try:
            redis_ok = bool(client.ping())
        except Exception:
            redis_ok = False

    return HealthSchema(
        status="ok" if postgres_ok else "degraded",
        postgres=postgres_ok,
        redis=redis_ok,
        timestamp=datetime.now(timezone.utc),
    )


@router.get("/v1/sports")
def list_sports():
    payload = []
    for key, value in settings.sports_config.items():
        provider_keys = value if isinstance(value, list) else [value]
        for provider_key in provider_keys:
            payload.append({"key": key, "provider_key": provider_key})
    return payload


@router.get("/v1/leagues")
def list_leagues(db: Session = Depends(get_db)):
    rows = db.execute(select(League).order_by(League.sport_name, League.name)).scalars().all()
    return [
        {
            "id": row.id,
            "sport": row.sport_name,
            "key": row.key,
            "name": row.name,
            "country_code": row.country_code,
        }
        for row in rows
    ]


@router.get("/v1/odds/live")
def get_live_odds():
    client = get_redis_client()
    if not client:
        return {"count": 0, "data": [], "source": "redis_unavailable"}
    try:
        keys = client.keys("live_odds:*")
        data = []
        for key in keys:
            raw = client.get(key)
            if raw:
                try:
                    data.append(json.loads(raw))
                except json.JSONDecodeError:
                    data.append({"raw": raw})
        return {"count": len(keys), "data": data, "source": "redis"}
    except Exception:
        return {"count": 0, "data": [], "source": "redis_error"}


@router.get("/v1/odds/{sport_name}")
def get_odds_by_sport(sport_name: str, db: Session = Depends(get_db)):
    fixtures = db.execute(
        select(Fixture).where(Fixture.sport_name == sport_name.upper()).order_by(Fixture.event_date)
    ).scalars().all()
    return [_fixture_payload(db, fixture) for fixture in fixtures]


@router.get("/v1/odds/{sport_name}/{league_key}")
def get_odds_by_league(sport_name: str, league_key: str, db: Session = Depends(get_db)):
    fixtures = db.execute(
        select(Fixture)
        .where(Fixture.sport_name == sport_name.upper(), Fixture.league_key == league_key)
        .order_by(Fixture.event_date)
    ).scalars().all()
    return [_fixture_payload(db, fixture) for fixture in fixtures]


@router.get("/v1/fixtures/{fixture_id}/history")
def get_fixture_history(fixture_id: str, db: Session = Depends(get_db)):
    fixture = db.get(Fixture, fixture_id)
    if not fixture:
        raise HTTPException(status_code=404, detail="Fixture no encontrado")
    history = db.execute(
        select(OddSnapshot).where(OddSnapshot.fixture_id == fixture_id).order_by(desc(OddSnapshot.updated_at))
    ).scalars().all()
    return {
        "fixture": _fixture_payload(db, fixture),
        "history": [
            {
                "bookmaker": row.bookmaker,
                "market_type": row.market_type,
                "selection": row.selection,
                "line_value": row.line_value,
                "price": row.price,
                "updated_at": row.updated_at,
            }
            for row in history
        ],
    }


@router.get("/v1/compare/{fixture_id}")
def compare_books(fixture_id: str, db: Session = Depends(get_db)):
    fixture = db.get(Fixture, fixture_id)
    if not fixture:
        raise HTTPException(status_code=404, detail="Fixture no encontrado")
    rows = db.execute(select(OddSnapshot).where(OddSnapshot.fixture_id == fixture_id)).scalars().all()
    best_by_market = {}
    for row in rows:
        key = f"{row.market_type}:{row.selection}:{row.line_value}"
        current = best_by_market.get(key)
        if not current or row.price > current["price"]:
            best_by_market[key] = {
                "market_type": row.market_type,
                "selection": row.selection,
                "line_value": row.line_value,
                "price": row.price,
                "bookmaker": row.bookmaker,
            }
    return {
        "fixture_id": fixture_id,
        "match": f"{fixture.away_team} @ {fixture.home_team}",
        "best_prices": list(best_by_market.values()),
    }


@router.get("/v1/analytics/value/{sport_name}", response_model=list[ValuePickSchema])
def value_by_sport(sport_name: str, db: Session = Depends(get_db)):
    rows = db.execute(
        select(AlgoPerformance)
        .where(AlgoPerformance.sport_name == sport_name.upper())
        .order_by(desc(AlgoPerformance.edge_percent), desc(AlgoPerformance.created_at))
        .limit(25)
    ).scalars().all()
    payload = []
    for row in rows:
        fixture = db.get(Fixture, row.fixture_id)
        payload.append(
            ValuePickSchema(
                fixture_id=row.fixture_id,
                match=f"{fixture.away_team} @ {fixture.home_team}" if fixture else row.fixture_id,
                market_type=row.market_type,
                selection=row.predicted_selection,
                market_odd=row.market_odd_at_bet,
                fair_odd=row.fair_odd,
                edge_percent=row.edge_percent,
                kelly_fraction=row.kelly_fraction,
                recommendation="BET" if row.edge_percent >= 5 else "NO_VALUE",
            )
        )
    return payload


@router.get("/v1/analytics/performance")
def analytics_performance(db: Session = Depends(get_db)):
    return performance_summary(db)


@router.get("/v1/alerts/outliers")
def alerts_outliers(db: Session = Depends(get_db)):
    return detect_outliers(db)


@router.post("/v1/jobs/ingest")
async def run_ingest_job(db: Session = Depends(get_db)):
    return {"ok": True, "results": await ingest_all_sports(db, settings.sports_config)}


@router.post("/v1/jobs/results")
async def run_results_job(db: Session = Depends(get_db)):
    return {"ok": True, "results": await update_finished_matches(db, settings.sports_config)}


@router.post("/v1/jobs/all")
async def run_all_jobs(db: Session = Depends(get_db)):
    ingest = await ingest_all_sports(db, settings.sports_config)
    results = await update_finished_matches(db, settings.sports_config)
    return {"ok": True, "ingest": ingest, "results": results}


def _fixture_payload(db: Session, fixture: Fixture) -> dict:
    rows = db.execute(
        select(OddSnapshot).where(OddSnapshot.fixture_id == fixture.id).order_by(desc(OddSnapshot.updated_at))
    ).scalars().all()
    result = db.execute(select(MatchResult).where(MatchResult.fixture_id == fixture.id)).scalar_one_or_none()
    return {
        "fixture_id": fixture.id,
        "external_id": fixture.external_id,
        "sport": fixture.sport_name,
        "league": fixture.league_key,
        "home_team": fixture.home_team,
        "away_team": fixture.away_team,
        "event_date": fixture.event_date,
        "status": fixture.status,
        "result": {
            "home_score": result.home_score,
            "away_score": result.away_score,
            "winner_name": result.winner_name,
        } if result else None,
        "bookmakers": [
            {
                "bookmaker": row.bookmaker,
                "market_type": row.market_type,
                "selection": row.selection,
                "line_value": row.line_value,
                "price": row.price,
                "updated_at": row.updated_at,
            }
            for row in rows[:100]
        ],
    }
