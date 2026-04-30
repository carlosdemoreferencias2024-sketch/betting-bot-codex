from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = Field(default="Sports API Pro", alias="APP_NAME")
    app_env: str = Field(default="development", alias="APP_ENV")
    debug: bool = Field(default=True, alias="DEBUG")

    api_key_odds: str = Field(default="", alias="API_KEY_ODDS")
    odds_base_url: str = Field(default="https://api.the-odds-api.com/v4/sports", alias="ODDS_BASE_URL")
    odds_regions: str = Field(default="us,eu", alias="ODDS_REGIONS")
    odds_markets: str = Field(default="h2h,spreads,totals", alias="ODDS_MARKETS")
    odds_format: str = Field(default="decimal", alias="ODDS_FORMAT")

    postgres_user: str = Field(default="admin_sports", alias="POSTGRES_USER")
    postgres_password: str = Field(default="change_me", alias="POSTGRES_PASSWORD")
    postgres_db: str = Field(default="sports_analytics", alias="POSTGRES_DB")
    postgres_host: str = Field(default="db", alias="POSTGRES_HOST")
    postgres_port: int = Field(default=5432, alias="POSTGRES_PORT")
    database_url_override: str | None = Field(default=None, alias="DATABASE_URL")

    redis_url: str = Field(default="redis://redis:6379/0", alias="REDIS_URL")
    default_timezone: str = Field(default="UTC", alias="DEFAULT_TIMEZONE")
    ingest_lookahead_days: int = Field(default=3, alias="INGEST_LOOKAHEAD_DAYS")

    @property
    def database_url(self) -> str:
      if self.database_url_override:
          return self.database_url_override
      return (
          f"postgresql+psycopg2://{self.postgres_user}:{self.postgres_password}"
          f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
      )

    @property
    def sports_config(self) -> dict[str, str]:
      return {
          "mlb": "baseball_mlb",
          "nba": "basketball_nba",
          "nfl": "americanfootball_nfl",
          "soccer": "soccer_mexico_ligamx",
      }


settings = Settings()
