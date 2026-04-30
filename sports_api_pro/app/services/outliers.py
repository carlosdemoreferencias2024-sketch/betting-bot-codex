from collections import defaultdict

from sqlalchemy import desc, select
from sqlalchemy.orm import Session

from app.models import Fixture, OddSnapshot


def detect_outliers(db: Session, threshold_percent: float = 12.0) -> list[dict]:
    snapshots = db.execute(
        select(OddSnapshot).order_by(desc(OddSnapshot.updated_at))
    ).scalars().all()

    grouped: dict[str, list[OddSnapshot]] = defaultdict(list)
    for row in snapshots:
        key = f"{row.fixture_id}|{row.market_type}|{row.selection}|{row.line_value}"
        grouped[key].append(row)

    alerts = []
    for key, rows in grouped.items():
        prices = [row.price for row in rows if row.price and row.price > 1]
        if len(prices) < 2:
            continue
        avg_price = sum(prices) / len(prices)
        best = max(rows, key=lambda item: item.price)
        drift = ((best.price / avg_price) - 1) * 100
        if drift < threshold_percent:
            continue
        fixture = db.get(Fixture, best.fixture_id)
        alerts.append(
            {
                "fixture_id": best.fixture_id,
                "match": f"{fixture.away_team} @ {fixture.home_team}" if fixture else best.fixture_id,
                "market_type": best.market_type,
                "selection": best.selection,
                "bookmaker": best.bookmaker,
                "best_price": round(best.price, 3),
                "avg_price": round(avg_price, 3),
                "drift_percent": round(drift, 2),
            }
        )
    return sorted(alerts, key=lambda item: item["drift_percent"], reverse=True)[:25]
