from datetime import datetime, timezone

import httpx

from app.core.config import settings


async def fetch_odds_by_sport(sport_key: str) -> list[dict]:
    if not settings.api_key_odds:
        return []

    params = {
        "apiKey": settings.api_key_odds,
        "regions": settings.odds_regions,
        "markets": settings.odds_markets,
        "oddsFormat": settings.odds_format,
        "dateFormat": "iso",
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.get(f"{settings.odds_base_url}/{sport_key}/odds", params=params)
        response.raise_for_status()
        return response.json()


async def fetch_scores_by_sport(sport_key: str, days_from: int = 1) -> list[dict]:
    if not settings.api_key_odds:
        return []

    params = {
        "apiKey": settings.api_key_odds,
        "daysFrom": str(days_from),
        "dateFormat": "iso",
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.get(f"{settings.odds_base_url}/{sport_key}/scores", params=params)
        response.raise_for_status()
        return response.json()


def parse_commence_time(value: str) -> datetime:
    return datetime.fromisoformat(value.replace("Z", "+00:00")).astimezone(timezone.utc)
