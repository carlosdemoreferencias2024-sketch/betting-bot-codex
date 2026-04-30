from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


class OutcomeSchema(BaseModel):
    name: str
    price: float = Field(gt=1.0)
    point: float | None = None


class MarketSchema(BaseModel):
    key: str
    outcomes: list[OutcomeSchema]


class BookmakerSchema(BaseModel):
    key: str | None = None
    title: str
    markets: list[MarketSchema]


class FixtureInSchema(BaseModel):
    external_id: str
    sport: str
    league: str
    home_team: str
    away_team: str
    event_date: datetime
    status: str = "PREMATCH"
    bookmakers: list[BookmakerSchema] = Field(default_factory=list)


class OddsResponseSchema(BaseModel):
    fixture_id: str
    sport: str
    league: str
    home_team: str
    away_team: str
    event_date: datetime
    bookmakers: list[dict[str, Any]]


class HealthSchema(BaseModel):
    status: str
    postgres: bool
    redis: bool
    timestamp: datetime


class ValuePickSchema(BaseModel):
    fixture_id: str
    match: str
    market_type: str
    selection: str
    market_odd: float
    fair_odd: float
    edge_percent: float
    kelly_fraction: float
    recommendation: str
