# Sports API Pro

API propia multideporte para `MLB`, `NBA`, `NFL` y `Futbol`, pensada para correr como servicio aparte del bot frontend.

## Incluye

- FastAPI con docs automaticas
- PostgreSQL para historico
- Redis para cache rapida
- workers de ingesta y cierre de resultados
- scheduler local y servicio Docker para ingesta/resultados automaticos
- normalizacion de equipos
- analytics base:
  - `Poisson` para futbol
  - `Log5` para MLB
  - `Elo` para NBA y NFL
  - `Kelly` para stake
  - deteccion simple de `value`

## Endpoints base

- `/health`
- `/v1/sports`
- `/v1/leagues`
- `/v1/odds/{sport}`
- `/v1/odds/{sport}/{league}`
- `/v1/fixtures/{fixture_id}/history`
- `/v1/compare/{fixture_id}`
- `/v1/analytics/value/{sport}`
- `/v1/analytics/performance`
- `/v1/jobs/ingest`
- `/v1/jobs/results`
- `/v1/jobs/all`

## Arranque con Docker

1. Copia `.env.example` a `.env`
2. Coloca tus llaves reales en `.env`
3. Ejecuta:

```bash
docker compose up --build
```

Swagger queda en:

- [http://localhost:8000/docs](http://localhost:8000/docs)

## Arranque local sin Docker

En Windows puedes usar:

- [abrir-api-pro.cmd](C:/Users/tsacl/Documents/Codex/2026-04-20-puedes-hacer-un-bot-de-pronosticos/sports_api_pro/abrir-api-pro.cmd)
- [abrir-api-pro-jobs.cmd](C:/Users/tsacl/Documents/Codex/2026-04-20-puedes-hacer-un-bot-de-pronosticos/sports_api_pro/abrir-api-pro-jobs.cmd)

## Integracion con el bot principal

La app principal ya puede usar esta API nueva seleccionando `Sports API Pro` en el selector de fuente.

Tambien puede correr junto con:

- [`abrir-todo.cmd`](C:/Users/tsacl/Documents/Codex/2026-04-20-puedes-hacer-un-bot-de-pronosticos/abrir-todo.cmd)

## Notas

- guarda tiempos en UTC
- Redis es opcional: si falla, la API puede seguir leyendo desde almacenamiento persistente
- este scaffold esta listo para crecer hacia una arquitectura mas seria de datos deportivos
