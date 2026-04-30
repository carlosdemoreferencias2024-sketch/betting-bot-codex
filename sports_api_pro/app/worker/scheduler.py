import asyncio
from datetime import datetime, timezone

from app.core.config import settings
from app.database import SessionLocal
from app.services.ingestion import ingest_all_sports, update_finished_matches


INGEST_INTERVAL_SECONDS = 60 * 30
RESULTS_INTERVAL_SECONDS = 60 * 45


async def run_ingest_cycle() -> None:
    db = SessionLocal()
    try:
        result = await ingest_all_sports(db, settings.sports_config)
        print(f"[{datetime.now(timezone.utc).isoformat()}] ingest: {result}")
    finally:
        db.close()


async def run_results_cycle() -> None:
    db = SessionLocal()
    try:
        result = await update_finished_matches(db, settings.sports_config)
        print(f"[{datetime.now(timezone.utc).isoformat()}] results: {result}")
    finally:
        db.close()


async def ingest_loop() -> None:
    while True:
        await run_ingest_cycle()
        await asyncio.sleep(INGEST_INTERVAL_SECONDS)


async def results_loop() -> None:
    while True:
        await run_results_cycle()
        await asyncio.sleep(RESULTS_INTERVAL_SECONDS)


async def main() -> None:
    print("Scheduler Sports API Pro activo. Ingesta cada 30 min, resultados cada 45 min.")
    await asyncio.gather(ingest_loop(), results_loop())


if __name__ == "__main__":
    asyncio.run(main())
