# Betting Bot Codex

Bot local de pronosticos deportivos para `Futbol`, `MLB`, `NBA` y `NFL`, con UI web, backend ligero en Node y una base de API propia en `sports_api_pro/`.

El proyecto esta pensado para:

- generar picks y parlays
- comparar odds reales y estimadas
- calcular stake, EV, ROI y CLV
- guardar historial, paper trading y auditoria
- enviar tops y planes a Telegram

## Que incluye

### App principal

- picks por deporte y liga
- parlays:
  - seguro
  - del sueno
  - bomba
- ticket builder
- plan de apuesta automatico
- modo de apuesta:
  - auto
  - conservador
  - normal
  - agresivo
  - solo valor
- historial con ROI, banca, CLV y exportacion CSV
- paper trading automatico
- auditoria por:
  - deporte
  - mercado
  - modo
  - fechas

### Backend local

- persistencia local en `data/`
- jobs para:
  - digest
  - grade
  - collect
- envio a Telegram desde backend
- cache de tops, historial, snapshots y paper trades

### API propia base

Dentro de [`sports_api_pro`](C:/Users/tsacl/Documents/Codex/2026-04-20-puedes-hacer-un-bot-de-pronosticos/sports_api_pro/README.md) ya hay un scaffold con:

- FastAPI
- PostgreSQL
- Redis
- workers de ingesta y resultados
- analytics base:
  - Poisson
  - Log5
  - Elo
  - Kelly

## Estructura principal

- [`index.html`](C:/Users/tsacl/Documents/Codex/2026-04-20-puedes-hacer-un-bot-de-pronosticos/index.html)
- [`styles.css`](C:/Users/tsacl/Documents/Codex/2026-04-20-puedes-hacer-un-bot-de-pronosticos/styles.css)
- [`app.js`](C:/Users/tsacl/Documents/Codex/2026-04-20-puedes-hacer-un-bot-de-pronosticos/app.js)
- [`serve.js`](C:/Users/tsacl/Documents/Codex/2026-04-20-puedes-hacer-un-bot-de-pronosticos/serve.js)
- [`backend-jobs.js`](C:/Users/tsacl/Documents/Codex/2026-04-20-puedes-hacer-un-bot-de-pronosticos/backend-jobs.js)
- [`sports_api_pro/`](C:/Users/tsacl/Documents/Codex/2026-04-20-puedes-hacer-un-bot-de-pronosticos/sports_api_pro)

## Como abrirlo

### Opcion 1: abrir todo

Usa:

- [`abrir-todo.cmd`](C:/Users/tsacl/Documents/Codex/2026-04-20-puedes-hacer-un-bot-de-pronosticos/abrir-todo.cmd)

Esto intenta abrir:

1. Sports API Pro
2. bot principal

### Opcion 2: solo el bot principal

Usa:

- [`abrir-bot.cmd`](C:/Users/tsacl/Documents/Codex/2026-04-20-puedes-hacer-un-bot-de-pronosticos/abrir-bot.cmd)

Abre la app principal en:

- [http://127.0.0.1:5173/](http://127.0.0.1:5173/)

### Opcion 3: modo trabajo

Si estas en una computadora con restricciones de red o navegador:

- [`abrir-modo-trabajo.cmd`](C:/Users/tsacl/Documents/Codex/2026-04-20-puedes-hacer-un-bot-de-pronosticos/abrir-modo-trabajo.cmd)

Este modo:

- usa `localhost`
- activa `workmode=1`
- prioriza backend local
- hace fallback a demo/cache cuando la red bloquea APIs externas

### Opcion 4: API propia

Usa:

- [`sports_api_pro/abrir-api-pro.cmd`](C:/Users/tsacl/Documents/Codex/2026-04-20-puedes-hacer-un-bot-de-pronosticos/sports_api_pro/abrir-api-pro.cmd)

Swagger queda en:

- [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## Fuentes de datos soportadas

- TheSportsDB
- MLB Stats API
- The Odds API
- balldontlie
- TheRundown
- Backend del bot
- Sports API Pro
- Demo local

Importante: el bot puede mezclar:

- datos reales
- odds reales
- reglas/modelo propio
- fallback demo

Por eso no todo pick significa automaticamente "pick real". En entornos con bloqueos de red, el proyecto puede caer en modo mixto o estimado.

## Configuracion

### Frontend

No subas tus llaves en [`config.js`](C:/Users/tsacl/Documents/Codex/2026-04-20-puedes-hacer-un-bot-de-pronosticos/config.js).

Usa como referencia:

- [`config.example.js`](C:/Users/tsacl/Documents/Codex/2026-04-20-puedes-hacer-un-bot-de-pronosticos/config.example.js)

### API propia

No subas:

- `sports_api_pro/.env`

Usa como referencia:

- [`sports_api_pro/.env.example`](C:/Users/tsacl/Documents/Codex/2026-04-20-puedes-hacer-un-bot-de-pronosticos/sports_api_pro/.env.example)

## Archivos ignorados en Git

No se suben:

- `config.js`
- `sports_api_pro/.env`
- `data/`
- bases locales (`*.db`, `*.sqlite`, `*.sqlite3`)

Esto es intencional para no exponer:

- API keys
- tokens de Telegram
- historiales locales
- snapshots de auditoria

## Estado del proyecto

Hoy el proyecto ya esta fuerte como MVP local:

- interfaz completa
- backend ligero
- paper trading
- auditoria
- plan de stake
- Telegram
- scaffold de API propia

Pero todavia no hay que venderlo como bot "garantizado". Lo que falta para volverlo mucho mas serio es:

1. mas profundidad estadistica por deporte
2. mayor consistencia de datos reales
3. backtesting historico mas profundo
4. paper trading con muestra mas larga
5. centralizar aun mas la logica en backend

## GitHub

Repo actual:

- [betting-bot-codex](https://github.com/carlosdemoreferencias2024-sketch/betting-bot-codex)

## Nota

Este proyecto es una herramienta de analisis y experimentacion. No garantiza ganancias y no reemplaza gestion de banca, validacion de datos ni backtesting serio.
