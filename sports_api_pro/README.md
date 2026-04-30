# Sports API Pro

API propia multideporte para `MLB`, `NBA`, `NFL` y `Futbol`, pensada para correr como servicio aparte del bot frontend.

## Incluye

- FastAPI con docs automáticas
- PostgreSQL para histórico
- Redis para caché rápida
- workers de ingesta y cierre de resultados
- scheduler local y servicio Docker para ingesta/resultados automáticos
- normalización de equipos
- analytics base:
  - `Poisson` para futbol
  - `Log5` para MLB
  - `ELO` para NBA/NFL
  - `Kelly` para stake
  - detección simple de `value`
- endpoints:
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

## Arranque con Docker

1. Copia `.env.example` a `.env`
2. Coloca tus llaves reales en `.env`
3. Ejecuta:

```bash
docker compose up --build
```

Swagger quedará en:

- [http://localhost:8000/docs](http://localhost:8000/docs)

El scheduler Docker también puede correr junto con la API para ingesta y cierre automáticos.

## Arranque local sin Docker

En Windows puedes usar:

- [abrir-api-pro.cmd](C:/Users/tsacl/Documents/Codex/2026-04-20-puedes-hacer-un-bot-de-pronosticos/sports_api_pro/abrir-api-pro.cmd)
- [abrir-api-pro-jobs.cmd](C:/Users/tsacl/Documents/Codex/2026-04-20-puedes-hacer-un-bot-de-pronosticos/sports_api_pro/abrir-api-pro-jobs.cmd)

## Integración con el bot actual

La app principal ya puede usar esta API nueva seleccionando `Sports API Pro` en el selector de fuente.
También queda como flujo preferente cuando el backend pro está activo.

## Notas

- Todo se guarda en UTC.
- Redis es opcional: si falla, la API sigue leyendo desde PostgreSQL.
- Este scaffold está preparado para conectar primero The Odds API y crecer a más proveedores.
