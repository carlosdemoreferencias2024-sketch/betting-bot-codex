# Bot de Pronosticos Deportivos

App web MVP para generar tips de futbol, MLB y NBA.

## Abrir la app

Servidor local iniciado:

```text
http://127.0.0.1:5173/
```

Tambien puedes abrir `index.html` directamente en el navegador, aunque algunas APIs pueden bloquearse si el navegador no permite peticiones desde archivos locales.

## APIs gratuitas incluidas

- TheSportsDB: futbol y NBA. Usa la llave gratuita `123` o una llave propia.
- MLB Stats API: calendario de MLB sin llave.
- The Odds API: odds reales para moneyline, spreads y totals cuando la liga tiene cobertura.
- balldontlie: NBA con API key, juegos, resultados recientes y otras estadisticas del ecosistema.
- Sportradar: key guardada localmente para futura integracion via backend/proxy.
- SportsDataIO: key guardada localmente para futura integracion de feeds de NBA, MLB, soccer y odds.
- TheRundown: key guardada localmente para futura integracion de odds, schedules, scores y line movement.
- Demo local: partidos de ejemplo cuando una API falla o no hay eventos proximos.
- API interna del bot: normaliza partidos, historiales recientes, forma de equipos y odds estimadas para cada deporte.

## Configuracion de The Odds API

La llave esta en `config.js`.

```js
window.BOT_CONFIG = {
  oddsApiKey: "TU_LLAVE",
  oddsRegion: "us",
  oddsMarkets: "h2h,spreads,totals",
};
```

En una app publicada, conviene mover esta llave a un backend/proxy para no exponerla en el navegador.

## Nota sobre Sportradar

La documentacion oficial de Sportradar indica que sus APIs son un servicio B2B y **no estan pensadas para llamarse directamente desde una aplicacion cliente**.

Referencias oficiales:

- [Get Started](https://developer.sportradar.com/getting-started/docs/get-started)
- [NBA API Basics](https://developer.sportradar.com/basketball/docs/nba-ig-api-basics)
- [MLB API Basics](https://developer.sportradar.com/baseball/docs/mlb-ig-api-basics)
- [Soccer API Basics](https://developer.sportradar.com/soccer/docs/soccer-ig-api-basics)

Por eso, la forma correcta de integrarla aqui es mediante un backend/proxy local o publicado que reciba las peticiones del frontend y firme las llamadas a Sportradar con la API key en servidor.

## Nota sobre SportsDataIO

La documentacion oficial indica que:

- la API acepta la key por query string o header `Ocp-Apim-Subscription-Key`
- el Free Trial puede tener acceso limitado
- el Free Trial puede devolver datos de prueba o "scrambled but realistic data"

Referencias oficiales:

- [NBA API docs](https://sportsdata.io/developers/api-documentation/nba)
- [MLB API docs](https://sportsdata.io/developers/api-documentation/mlb)
- [Soccer API docs](https://sportsdata.io/developers/api-documentation/soccer)
- [Developer portal](https://sportsdata.io/developers)

Para una app publicada, igual conviene usar un backend/proxy para no exponer la API key en el navegador.

## Nota sobre TheRundown

La documentacion oficial de TheRundown indica:

- endpoint principal V2 para eventos con odds: `/api/v2/sports/{sportID}/events/{date}`
- mercados base: `1` moneyline, `2` spread, `3` total
- sport IDs utiles para este proyecto:
  - `3` MLB
  - `4` NBA
  - `10` MLS
  - `11` EPL
  - `13` Bundesliga
  - `14` La Liga
  - `15` Serie A
  - `16` Champions League

Referencias oficiales:

- [TheRundown docs](https://docs.therundown.io/)
- [Sports & Coverage](https://docs.therundown.io/reference/sports)
- [Getting Live Odds](https://docs.therundown.io/guides/getting-live-odds)

## Ligas incluidas

- Premier League.
- La Liga.
- Bundesliga.
- Serie A.
- MLS.
- Liga MX.
- MLB.
- NBA.

## Tips que genera

- Ganador probable.
- Over/under.
- Spread/handicap.
- Ambos anotan para futbol.
- Odds estimadas por mercado.
- Edge estimado contra la cuota calculada por el bot.

## Parlays

- Parlay seguro: 2 selecciones con la mayor confianza disponible.
- Parlay del sueño: 3 a 4 selecciones con balance entre confianza y pago potencial.
- Parlay bomba: 4 a 6 selecciones agresivas, de alto riesgo.

## Historial

Cada pick y parlay tiene botones para:

- Guardar.
- Marcar como ganado.
- Marcar como perdido.

El historial se guarda en el navegador con `localStorage` y calcula:

- Picks/parlays guardados.
- Porcentaje real de acierto.
- ROI por unidad apostada.
- Ganancia/perdida en unidades.
- Banca actual segun banca inicial y stakes.
- Stake por pick o parlay.
- Desglose por deporte.
- Desglose por mercado.
- Exportacion a CSV.

Tambien incluye:

- Filtros por fecha, deporte y mercado.
- Auto evaluacion de picks pendientes cuando la fuente trae marcador final compatible.

## Nota

El modelo es una base inicial para analisis. No garantiza resultados ni ganancias. Para una version mas avanzada conviene agregar historiales reales, lesiones, cuotas, backtesting y registro de resultados.
