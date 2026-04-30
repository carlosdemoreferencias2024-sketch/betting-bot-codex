import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, JSON, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Sport(Base):
    __tablename__ = "sports"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(50), unique=True, index=True)


class League(Base):
    __tablename__ = "leagues"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    sport_name: Mapped[str] = mapped_column(String(50), index=True)
    key: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(120))
    country_code: Mapped[str | None] = mapped_column(String(3), nullable=True)


class Team(Base):
    __tablename__ = "teams"
    __table_args__ = (UniqueConstraint("sport_name", "official_name", name="uq_team_sport_name"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    sport_name: Mapped[str] = mapped_column(String(50), index=True)
    official_name: Mapped[str] = mapped_column(String(120), index=True)
    league_key: Mapped[str | None] = mapped_column(String(120), nullable=True)


class TeamAlias(Base):
    __tablename__ = "team_aliases"
    __table_args__ = (UniqueConstraint("sport_name", "alias_name", name="uq_alias_sport_name"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    sport_name: Mapped[str] = mapped_column(String(50), index=True)
    alias_name: Mapped[str] = mapped_column(String(120), index=True)
    official_name: Mapped[str] = mapped_column(String(120), index=True)


class Fixture(Base):
    __tablename__ = "fixtures"

    id: Mapped[str] = mapped_column(String(64), primary_key=True, default=lambda: str(uuid.uuid4()))
    external_id: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    sport_name: Mapped[str] = mapped_column(String(50), index=True)
    league_key: Mapped[str] = mapped_column(String(120), index=True)
    home_team: Mapped[str] = mapped_column(String(120))
    away_team: Mapped[str] = mapped_column(String(120))
    event_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), index=True)
    status: Mapped[str] = mapped_column(String(20), default="PREMATCH", index=True)
    commence_time_utc: Mapped[str | None] = mapped_column(String(40), nullable=True)
    metadata_json: Mapped[dict | None] = mapped_column(JSON, nullable=True)

    odds = relationship("OddSnapshot", back_populates="fixture", cascade="all, delete-orphan")
    performance = relationship("AlgoPerformance", back_populates="fixture", cascade="all, delete-orphan")


class OddSnapshot(Base):
    __tablename__ = "odds_snapshots"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    fixture_id: Mapped[str] = mapped_column(String(64), ForeignKey("fixtures.id"), index=True)
    bookmaker: Mapped[str] = mapped_column(String(80), index=True)
    market_type: Mapped[str] = mapped_column(String(50), index=True)
    selection: Mapped[str] = mapped_column(String(120))
    line_value: Mapped[float | None] = mapped_column(Float, nullable=True)
    price: Mapped[float] = mapped_column(Float)
    implied_probability: Mapped[float | None] = mapped_column(Float, nullable=True)
    payload_json: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, index=True)

    fixture = relationship("Fixture", back_populates="odds")


class MatchResult(Base):
    __tablename__ = "match_results"

    fixture_id: Mapped[str] = mapped_column(String(64), ForeignKey("fixtures.id"), primary_key=True)
    home_score: Mapped[int] = mapped_column(Integer)
    away_score: Mapped[int] = mapped_column(Integer)
    final_status: Mapped[str] = mapped_column(String(20), default="FINAL")
    winner_name: Mapped[str | None] = mapped_column(String(120), nullable=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)


class AlgoPerformance(Base):
    __tablename__ = "algo_performance"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    fixture_id: Mapped[str] = mapped_column(String(64), ForeignKey("fixtures.id"), index=True)
    sport_name: Mapped[str] = mapped_column(String(50), index=True)
    market_type: Mapped[str] = mapped_column(String(50), index=True)
    predicted_selection: Mapped[str] = mapped_column(String(120))
    predicted_probability: Mapped[float] = mapped_column(Float)
    fair_odd: Mapped[float] = mapped_column(Float)
    market_odd_at_bet: Mapped[float] = mapped_column(Float)
    edge_percent: Mapped[float] = mapped_column(Float)
    kelly_fraction: Mapped[float] = mapped_column(Float, default=0.0)
    was_correct: Mapped[bool | None] = mapped_column(Boolean, nullable=True)
    profit_loss: Mapped[float | None] = mapped_column(Float, nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)

    fixture = relationship("Fixture", back_populates="performance")
