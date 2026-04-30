from contextlib import asynccontextmanager
import time

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router
from app.core.config import settings
from app.database import Base, engine


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title=settings.app_name, lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://127.0.0.1:8000",
        "http://localhost:8000",
        "null",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)

_rate_state: dict[str, list[float]] = {}


@app.middleware("http")
async def basic_ops_middleware(request, call_next):
    client_ip = request.client.host if request.client else "unknown"
    now = time.time()
    bucket = [stamp for stamp in _rate_state.get(client_ip, []) if now - stamp < 60]
    if len(bucket) >= 120:
        return JSONResponse(status_code=429, content={"detail": "Rate limit excedido"})
    bucket.append(now)
    _rate_state[client_ip] = bucket

    start = time.perf_counter()
    response = await call_next(request)
    response.headers["X-Process-Time"] = f"{time.perf_counter() - start:.4f}"
    return response
