import json

from redis import Redis
from redis.exceptions import RedisError

from app.core.config import settings


def get_redis_client() -> Redis | None:
    try:
        return Redis.from_url(settings.redis_url, decode_responses=True)
    except RedisError:
        return None


def cache_set(key: str, value: dict, ttl_seconds: int = 300) -> None:
    client = get_redis_client()
    if not client:
        return
    try:
        client.set(key, json.dumps(value), ex=ttl_seconds)
    except RedisError:
        return


def cache_get(key: str) -> dict | None:
    client = get_redis_client()
    if not client:
        return None
    try:
        raw = client.get(key)
        return json.loads(raw) if raw else None
    except (RedisError, json.JSONDecodeError):
        return None
