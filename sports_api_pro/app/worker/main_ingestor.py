import asyncio

from app.core.config import settings
from app.database import SessionLocal
from app.services.ingestion import ingest_all_sports


async def main() -> None:
    db = SessionLocal()
    try:
        results = await ingest_all_sports(db, settings.sports_config)
        print(results)
    finally:
        db.close()


if __name__ == "__main__":
    asyncio.run(main())
