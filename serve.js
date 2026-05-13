const http = require("http");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { spawn } = require("child_process");

const root = __dirname;
const port = 5173;
const dataDir = path.join(root, "data");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".cmd": "text/plain; charset=utf-8",
};

const storageFiles = {
  history: path.join(dataDir, "history.json"),
  statsSnapshot: path.join(dataDir, "stats-snapshot.json"),
  topCache: path.join(dataDir, "top-cache.json"),
  backendPicks: path.join(dataDir, "backend-picks.json"),
  telegramSentHistory: path.join(dataDir, "telegram-sent-history.json"),
  betModeHistory: path.join(dataDir, "bet-mode-history.json"),
  paperTrades: path.join(dataDir, "paper-trades.json"),
  backendStatus: path.join(dataDir, "backend-status.json"),
  backendMetrics: path.join(dataDir, "backend-metrics.json"),
  backendLogs: path.join(dataDir, "backend-logs.json"),
};

const sportProfiles = {
  soccer: { apiName: "Futbol", baseTotal: 2.5, spreadLabel: "handicap +0.5" },
  mlb: { apiName: "MLB", baseTotal: 8.5, spreadLabel: "run line +1.5" },
  nba: { apiName: "NBA", baseTotal: 219.5, spreadLabel: "spread +4.5" },
  nfl: { apiName: "NFL", baseTotal: 44.5, spreadLabel: "spread +3.5" },
};

const dataSourceLabels = {
  oddsapi: "The Odds API",
  thesportsdb: "TheSportsDB",
  mlb: "MLB Stats API",
  backend: "Backend del bot",
  soccer_total: "Futbol total",
  estimated: "Estimadas",
  base: "Base",
  empty: "Sin fuente",
  idle: "Sin fuente",
};

function dataSourceLabel(source) {
  return dataSourceLabels[source] || source || "Sin fuente";
}

const backendLeagues = [
  { sport: "soccer", leagueId: "4328", leagueName: "Premier League", oddsKey: "soccer_epl" },
  { sport: "soccer", leagueId: "4480", leagueName: "UEFA Champions League", oddsKey: "soccer_uefa_champs_league" },
  { sport: "soccer", leagueId: "4481", leagueName: "UEFA Europa League", oddsKey: "soccer_uefa_europa_league" },
  { sport: "soccer", leagueId: "5071", leagueName: "UEFA Conference League", oddsKey: "soccer_uefa_europa_conference_league" },
  { sport: "soccer", leagueId: "4351", leagueName: "Brazilian Serie A", oddsKey: "soccer_brazil_campeonato" },
  { sport: "soccer", leagueId: "4406", leagueName: "Argentinian Primera Division", oddsKey: "soccer_argentina_primera_division" },
  { sport: "soccer", leagueId: "4335", leagueName: "La Liga", oddsKey: "soccer_spain_la_liga" },
  { sport: "soccer", leagueId: "4331", leagueName: "Bundesliga", oddsKey: "soccer_germany_bundesliga" },
  { sport: "soccer", leagueId: "4332", leagueName: "Serie A", oddsKey: "soccer_italy_serie_a" },
  { sport: "soccer", leagueId: "4346", leagueName: "MLS", oddsKey: "soccer_usa_mls" },
  { sport: "soccer", leagueId: "4350", leagueName: "Liga MX", oddsKey: "soccer_mexico_ligamx" },
  { sport: "soccer", leagueId: "4429", leagueName: "FIFA World Cup", oddsKey: "soccer_fifa_world_cup" },
  { sport: "mlb", leagueId: "mlb", leagueName: "Major League Baseball", oddsKey: "baseball_mlb" },
  { sport: "nba", leagueId: "4387", leagueName: "NBA", oddsKey: "basketball_nba" },
  { sport: "nfl", leagueId: "nfl", leagueName: "NFL", oddsKey: "americanfootball_nfl" },
];

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
}

function readJson(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    return fallback;
  }
}

function writeJson(filePath, value) {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2), "utf8");
}

function appendBackendLog(kind, action, detail, meta = {}) {
  const logs = readJson(storageFiles.backendLogs, []);
  logs.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    at: new Date().toISOString(),
    kind,
    action,
    detail,
    meta,
  });
  writeJson(storageFiles.backendLogs, logs.slice(0, 300));
}

function addBackendMetric(action, value = 1, meta = {}) {
  const metrics = readJson(storageFiles.backendMetrics, []);
  metrics.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    at: new Date().toISOString(),
    action,
    value: Number(value) || 0,
    meta,
  });
  writeJson(storageFiles.backendMetrics, metrics.slice(0, 1000));
}

function summarizeMetrics(metrics = []) {
  const grouped = {};
  metrics.forEach((entry) => {
    const key = entry.action || "unknown";
    if (!grouped[key]) grouped[key] = { action: key, count: 0, total: 0, lastAt: null };
    grouped[key].count += 1;
    grouped[key].total += Number(entry.value) || 0;
    if (!grouped[key].lastAt || String(entry.at || "") > grouped[key].lastAt) grouped[key].lastAt = entry.at;
  });
  return Object.values(grouped).sort((a, b) => b.lastAt.localeCompare(a.lastAt));
}

function normalizeName(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function namesMatch(left, right) {
  const a = normalizeName(left);
  const b = normalizeName(right);
  return a && b && (a.includes(b) || b.includes(a));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function toPercent(value) {
  return `${Math.round(Number(value) || 0)}%`;
}

function money(value) {
  const num = Number(value) || 0;
  const sign = num > 0 ? "+" : "";
  return `${sign}${num.toFixed(2)}u`;
}

function loadBotConfig() {
  try {
    const filePath = path.join(root, "config.js");
    const code = fs.readFileSync(filePath, "utf8");
    const sandbox = { window: {} };
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox);
    return sandbox.window.BOT_CONFIG || {};
  } catch (error) {
    return {};
  }
}

function uniqueStrings(values = []) {
  return [...new Set(values.filter(Boolean).map((value) => String(value).trim()).filter(Boolean))];
}

function resolvePythonCandidates() {
  const config = loadBotConfig();
  const home = process.env.USERPROFILE || process.env.HOME || "";
  return uniqueStrings([
    config.pythonExecutable,
    home ? path.join(home, ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "python", "python.exe") : "",
    "py",
    "python",
  ]);
}

function runPythonJson(executable, args, stdinPayload, timeoutMs = 300000) {
  return new Promise((resolve, reject) => {
    const child = spawn(executable, args, {
      cwd: root,
      windowsHide: true,
      stdio: ["pipe", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        child.kill();
        reject(new Error("PyESPN timeout"));
      }
    }, timeoutMs);

    child.stdout.on("data", (chunk) => { stdout += String(chunk || ""); });
    child.stderr.on("data", (chunk) => { stderr += String(chunk || ""); });
    child.on("error", (error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (code !== 0) {
        reject(new Error(stderr.trim() || `PyESPN termino con codigo ${code}`));
        return;
      }
      try {
        resolve(JSON.parse(stdout));
      } catch (error) {
        reject(new Error(`PyESPN devolvio JSON invalido: ${error.message}`));
      }
    });

    child.stdin.write(stdinPayload || "");
    child.stdin.end();
  });
}

async function runPyEspnPropBatch({ league, season, recent = 5, names = [] }) {
  const cleanNames = uniqueStrings(names).slice(0, 20);
  if (!cleanNames.length) {
    return { league, season, requested: [], resolved: {}, unresolved: [] };
  }
  const scriptPath = path.join(root, "tools", "pyespn_prop_batch.py");
  if (!fs.existsSync(scriptPath)) {
    throw new Error("No existe tools/pyespn_prop_batch.py");
  }

  const args = [scriptPath, "--league", String(league), "--season", String(season), "--recent", String(recent)];
  const payload = JSON.stringify({ names: cleanNames });
  const candidates = resolvePythonCandidates();
  let lastError = null;

  for (const candidate of candidates) {
    try {
      return await runPythonJson(candidate, args, payload);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("No se encontro un ejecutable de Python utilizable para PyESPN");
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function collectBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 2_000_000) {
        reject(new Error("Payload demasiado grande"));
      }
    });
    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error("JSON invalido"));
      }
    });
    req.on("error", reject);
  });
}

async function sendTelegramServerSide(text, summary = "Envio manual") {
  const config = loadBotConfig();
  if (!config.telegramBotToken || !config.telegramChatId) {
    appendBackendLog("warn", "telegram.send", "Falta token o chat id de Telegram");
    throw new Error("Falta token o chat id de Telegram");
  }

  const response = await fetch(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: config.telegramChatId,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Telegram respondio ${response.status}`);
  }

  const payload = await response.json();
  addBackendMetric("telegram_sent", 1, { summary });
  appendBackendLog("info", "telegram.send", "Mensaje enviado por backend", { summary });
  const sentHistory = readJson(storageFiles.telegramSentHistory, []);
  sentHistory.unshift({
    kind: "Backend Telegram",
    summary,
    sentAt: new Date().toISOString(),
  });
  writeJson(storageFiles.telegramSentHistory, sentHistory.slice(0, 80));
  return payload;
}

function profitFor(record) {
  const stake = Number(record.stake) || 1;
  if (record.result === "win") return stake * (Number(record.odds) - 1);
  if (record.result === "loss") return -stake;
  return 0;
}

function clvFor(record) {
  if (!Number.isFinite(Number(record.closingOdds))) return null;
  return Number((((Number(record.odds) / Number(record.closingOdds)) - 1) * 100).toFixed(1));
}

function buildStatsSnapshot(history) {
  const settled = history.filter((record) => record.result !== "pending");
  const wins = settled.filter((record) => record.result === "win").length;
  const profit = settled.reduce((sum, record) => sum + profitFor(record), 0);
  const totalRisk = settled.reduce((sum, record) => sum + (Number(record.stake) || 1), 0);
  const roi = totalRisk ? (profit / totalRisk) * 100 : 0;
  const winRate = settled.length ? (wins / settled.length) * 100 : 0;
  return {
    updatedAt: new Date().toISOString(),
    count: history.length,
    settled: settled.length,
    winRate: Number(winRate.toFixed(2)),
    roi: Number(roi.toFixed(2)),
    profit: Number(profit.toFixed(2)),
    bankroll: Number((100 + profit).toFixed(2)),
  };
}

async function fetchOddsForSport(oddsKey) {
  const config = loadBotConfig();
  if (!config.oddsApiKey) return [];
  const params = new URLSearchParams({
    apiKey: config.oddsApiKey,
    regions: config.oddsRegion || "us",
    markets: config.oddsMarkets || "h2h,spreads,totals",
    oddsFormat: "decimal",
    dateFormat: "iso",
  });
  const response = await fetch(`https://api.the-odds-api.com/v4/sports/${encodeURIComponent(oddsKey)}/odds?${params.toString()}`);
  if (!response.ok) throw new Error(`Odds ${oddsKey} respondio ${response.status}`);
  return response.json();
}

async function fetchScoresForSport(oddsKey) {
  const config = loadBotConfig();
  if (!config.oddsApiKey) return [];
  const params = new URLSearchParams({
    apiKey: config.oddsApiKey,
    daysFrom: "3",
    dateFormat: "iso",
  });
  const response = await fetch(`https://api.the-odds-api.com/v4/sports/${encodeURIComponent(oddsKey)}/scores?${params.toString()}`);
  if (!response.ok) throw new Error(`Scores ${oddsKey} respondio ${response.status}`);
  return response.json();
}

async function fetchSportsDbUpcomingLeague(leagueId) {
  const config = loadBotConfig();
  const key = config.sportsDbKey || "123";
  const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${encodeURIComponent(key)}/eventsnextleague.php?id=${encodeURIComponent(leagueId)}`);
  if (!response.ok) throw new Error(`TheSportsDB upcoming respondio ${response.status}`);
  const payload = await response.json();
  return Array.isArray(payload?.events) ? payload.events : [];
}

async function fetchSportsDbRecentLeague(leagueId) {
  const config = loadBotConfig();
  const key = config.sportsDbKey || "123";
  const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${encodeURIComponent(key)}/eventspastleague.php?id=${encodeURIComponent(leagueId)}`);
  if (!response.ok) throw new Error(`TheSportsDB recent respondio ${response.status}`);
  const payload = await response.json();
  return Array.isArray(payload?.events) ? payload.events : [];
}

async function fetchSportsDbTable(leagueId) {
  const config = loadBotConfig();
  const key = config.sportsDbKey || "123";
  const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${encodeURIComponent(key)}/lookuptable.php?l=${encodeURIComponent(leagueId)}`);
  if (!response.ok) throw new Error(`TheSportsDB table respondio ${response.status}`);
  const payload = await response.json();
  return Array.isArray(payload?.table) ? payload.table : [];
}

async function fetchMlbScheduleRange(startDate, endDate) {
  const url = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}&hydrate=probablePitcher,team`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`MLB Stats schedule respondio ${response.status}`);
  const payload = await response.json();
  const dates = Array.isArray(payload?.dates) ? payload.dates : [];
  return dates.flatMap((day) => day.games || []);
}

async function fetchMlbUpcomingGames() {
  const start = new Date();
  const end = new Date(start.getTime() + (1000 * 60 * 60 * 24 * 3));
  return fetchMlbScheduleRange(start.toISOString().slice(0, 10), end.toISOString().slice(0, 10));
}

async function fetchMlbRecentGames() {
  const end = new Date();
  const start = new Date(end.getTime() - (1000 * 60 * 60 * 24 * 7));
  return fetchMlbScheduleRange(start.toISOString().slice(0, 10), end.toISOString().slice(0, 10));
}

function normalizeSportsDbEvent(event, sport, leagueMeta, source = "thesportsdb") {
  return {
    home: event.strHomeTeam || event.strEvent?.split(" vs ")?.[0] || "Local",
    away: event.strAwayTeam || event.strEvent?.split(" vs ")?.[1] || "Visitante",
    date: event.dateEvent || String(event.strTimestamp || "").slice(0, 10) || "Proximo",
    homeScore: Number.isFinite(Number(event.intHomeScore)) ? Number(event.intHomeScore) : null,
    awayScore: Number.isFinite(Number(event.intAwayScore)) ? Number(event.intAwayScore) : null,
    source,
    sport,
    leagueId: leagueMeta?.leagueId || "",
    leagueName: leagueMeta?.leagueName || "",
    status: Number.isFinite(Number(event.intHomeScore)) && Number.isFinite(Number(event.intAwayScore)) ? "Final" : "Programado",
  };
}

function normalizeOddsEventToGame(event, sport, leagueMeta, source = "oddsapi") {
  return {
    home: event.home_team,
    away: event.away_team,
    date: String(event.commence_time || "").slice(0, 10) || "Proximo",
    homeScore: Number.isFinite(Number(event.scores?.find?.((item) => item.name === event.home_team)?.score))
      ? Number(event.scores.find((item) => item.name === event.home_team).score)
      : null,
    awayScore: Number.isFinite(Number(event.scores?.find?.((item) => item.name === event.away_team)?.score))
      ? Number(event.scores.find((item) => item.name === event.away_team).score)
      : null,
    source,
    sport,
    leagueId: leagueMeta?.leagueId || "",
    leagueName: leagueMeta?.leagueName || "",
    status: event.completed ? "Final" : "Programado",
  };
}

function normalizeMlbGame(game, leagueMeta, source = "mlb") {
  const homePitcher = game.teams?.home?.probablePitcher || {};
  const awayPitcher = game.teams?.away?.probablePitcher || {};
  return {
    home: game.teams?.home?.team?.name || "Local MLB",
    away: game.teams?.away?.team?.name || "Visitante MLB",
    date: String(game.gameDate || "").slice(0, 10) || "Proximo",
    homeScore: Number.isFinite(Number(game.teams?.home?.score)) ? Number(game.teams.home.score) : null,
    awayScore: Number.isFinite(Number(game.teams?.away?.score)) ? Number(game.teams.away.score) : null,
    homePitcher: homePitcher.fullName || "",
    awayPitcher: awayPitcher.fullName || "",
    source,
    sport: "mlb",
    leagueId: leagueMeta?.leagueId || "mlb",
    leagueName: leagueMeta?.leagueName || "Major League Baseball",
    status: Number.isFinite(Number(game.teams?.home?.score)) && Number.isFinite(Number(game.teams?.away?.score)) ? "Final" : "Programado",
  };
}

function standingsMapFromTable(rows = []) {
  return rows.reduce((acc, row) => {
    const team = row.strTeam || row.name || row.strTeamBadge;
    if (!team) return acc;
    acc[team] = {
      rank: Number(row.intRank || row.rank || 0),
      played: Number(row.intPlayed || row.played || 0),
      wins: Number(row.intWin || row.wins || 0),
      draws: Number(row.intDraw || row.draws || 0),
      losses: Number(row.intLoss || row.losses || 0),
      points: Number(row.intPoints || row.points || 0),
      source: "thesportsdb",
    };
    return acc;
  }, {});
}

function getBestH2HOutcome(event) {
  const outcomes = (event.bookmakers || [])
    .flatMap((bookmaker) => (bookmaker.markets || [])
      .filter((market) => market.key === "h2h")
      .flatMap((market) => (market.outcomes || []).map((outcome) => ({
        bookmaker: bookmaker.title,
        name: outcome.name,
        price: Number(outcome.price),
      }))));
  return outcomes.filter((item) => Number.isFinite(item.price)).sort((a, b) => a.price - b.price)[0] || null;
}

function outcomesForMarket(event, marketKey) {
  return (event.bookmakers || [])
    .flatMap((bookmaker) => (bookmaker.markets || [])
      .filter((market) => market.key === marketKey)
      .flatMap((market) => (market.outcomes || []).map((outcome) => ({
        bookmaker: bookmaker.title,
        name: outcome.name,
        price: Number(outcome.price),
        point: Number(outcome.point),
      }))));
}

function impliedProbability(price) {
  return price ? 1 / Number(price) : 0;
}

function confidenceFromPrice(price, base = 50, weight = 35, min = 52, max = 76) {
  return clamp(base + impliedProbability(price) * weight, min, max);
}

function buildBackendTip(event, meta, marketType) {
  const match = `${event.away_team} @ ${event.home_team}`;
  const eventDate = String(event.commence_time || "").slice(0, 10);

  if (marketType === "winner") {
    const best = getBestH2HOutcome(event);
    if (!best) return null;
    const confidence = confidenceFromPrice(best.price, 49, 38, 54, 77);
    const ev = Number((((confidence / 100) * best.price - 1) * 100).toFixed(1));
    return {
      id: `winner-${meta.sport}-${event.id || match}-${best.name}`,
      type: "Ganador",
      pick: `${best.name} gana`,
      targetTeam: best.name,
      confidence: Number(confidence.toFixed(1)),
      reason: `Pick inicial del backend usando favorito de moneyline y consenso de cuotas reales para ${meta.leagueName}.`,
      market: "Moneyline",
      line: "",
      odds: Number(best.price.toFixed(2)),
      bookmaker: best.bookmaker,
      oddsSource: "Real",
      books: outcomesForMarket(event, "h2h").slice(0, 6),
      edge: Number((confidence - impliedProbability(best.price) * 100).toFixed(1)),
      ev,
      game: {
        home: event.home_team,
        away: event.away_team,
        date: eventDate,
        sport: meta.sport,
      },
      leagueId: meta.leagueId,
      leagueName: meta.leagueName,
    };
  }

  if (marketType === "spread") {
    const outcomes = outcomesForMarket(event, "spreads").filter((item) => Number.isFinite(item.price) && Number.isFinite(item.point));
    if (!outcomes.length) return null;
    const conservative = outcomes
      .slice()
      .sort((a, b) => Math.abs(b.point) - Math.abs(a.point) || a.price - b.price)[0];
    const confidence = confidenceFromPrice(conservative.price, 47, 32, 52, 72);
    const ev = Number((((confidence / 100) * conservative.price - 1) * 100).toFixed(1));
    return {
      id: `spread-${meta.sport}-${event.id || match}-${conservative.name}-${conservative.point}`,
      type: "Spread",
      pick: `${conservative.name} ${conservative.point > 0 ? "+" : ""}${conservative.point}`,
      targetTeam: conservative.name,
      confidence: Number(confidence.toFixed(1)),
      reason: `Backend spread inicial apoyado en la linea mas protectora disponible y comparacion de books.`,
      market: meta.sport === "mlb" ? "Run line" : "Spread",
      line: `${conservative.point > 0 ? "+" : ""}${conservative.point}`,
      odds: Number(conservative.price.toFixed(2)),
      bookmaker: conservative.bookmaker,
      oddsSource: "Real",
      books: outcomes.slice(0, 6),
      edge: Number((confidence - impliedProbability(conservative.price) * 100).toFixed(1)),
      ev,
      game: {
        home: event.home_team,
        away: event.away_team,
        date: eventDate,
        sport: meta.sport,
      },
      leagueId: meta.leagueId,
      leagueName: meta.leagueName,
    };
  }

  if (marketType === "total") {
    const outcomes = outcomesForMarket(event, "totals").filter((item) => Number.isFinite(item.price) && Number.isFinite(item.point));
    if (!outcomes.length) return null;
    const favoriteTotal = outcomes.slice().sort((a, b) => a.price - b.price)[0];
    const confidence = confidenceFromPrice(favoriteTotal.price, 47, 30, 52, 70);
    const ev = Number((((confidence / 100) * favoriteTotal.price - 1) * 100).toFixed(1));
    const side = String(favoriteTotal.name).toLowerCase().includes("under") ? "Under" : "Over";
    return {
      id: `total-${meta.sport}-${event.id || match}-${side}-${favoriteTotal.point}`,
      type: "Over/Under",
      pick: `${side} ${favoriteTotal.point}`,
      totalSide: side,
      confidence: Number(confidence.toFixed(1)),
      reason: `Backend total inicial apoyado en la opcion mas respaldada por mercado real para ${match}.`,
      market: "Totales",
      line: String(favoriteTotal.point),
      odds: Number(favoriteTotal.price.toFixed(2)),
      bookmaker: favoriteTotal.bookmaker,
      oddsSource: "Real",
      books: outcomes.slice(0, 6),
      edge: Number((confidence - impliedProbability(favoriteTotal.price) * 100).toFixed(1)),
      ev,
      game: {
        home: event.home_team,
        away: event.away_team,
        date: eventDate,
        sport: meta.sport,
      },
      leagueId: meta.leagueId,
      leagueName: meta.leagueName,
    };
  }

  return null;
}

function buildBackendPickPackage(meta, events) {
  const games = events.map((event) => ({
    home: event.home_team,
    away: event.away_team,
    date: String(event.commence_time || "").slice(0, 10),
    sport: meta.sport,
  }));

  const tips = events
    .flatMap((event) => ([
      buildBackendTip(event, meta, "winner"),
      buildBackendTip(event, meta, "spread"),
      buildBackendTip(event, meta, "total"),
    ]))
    .filter(Boolean)
    .sort((a, b) => b.confidence - a.confidence || b.ev - a.ev)
    .slice(0, 12);

  return {
    sport: meta.sport,
    leagueId: meta.leagueId,
    leagueName: meta.leagueName,
    updatedAt: new Date().toISOString(),
    games,
    tips,
    oddsEvents: events,
    recentGames: [],
    externalRef: { source: "backend", standings: {}, injuries: {} },
    health: {
      source: { state: games.length ? "ok" : "warn", detail: `Backend del bot · ${games.length} partido(s)` },
      recent: { state: "warn", detail: "Historico backend aun basico en esta primera fase." },
      odds: { state: events.length ? "ok" : "warn", detail: events.length ? `${events.length} evento(s) con odds reales` : "Sin odds reales disponibles" },
      external: { state: "warn", detail: "La capa de enriquecimiento backend sigue en construccion." },
    },
  };
}

function buildEmptyBackendPickPackage(meta, detail = "Sin odds reales disponibles") {
  return {
    sport: meta.sport,
    leagueId: meta.leagueId,
    leagueName: meta.leagueName,
    updatedAt: new Date().toISOString(),
    games: [],
    tips: [],
    oddsEvents: [],
    recentGames: [],
    externalRef: { source: "backend", standings: {}, injuries: {} },
    health: {
      source: { state: "warn", detail: `Backend del bot · 0 partido(s)` },
      recent: { state: "warn", detail: "Historico backend aun basico en esta primera fase." },
      odds: { state: "warn", detail },
      external: { state: "warn", detail: "La capa de enriquecimiento backend sigue en construccion." },
    },
  };
}

function sourceMode(source) {
  if (source === "cache") return "cache";
  if (!source || source === "estimated" || source === "base" || source === "demo" || source === "empty") return "fallback";
  return "live";
}

async function loadBackendFixtures(meta) {
  const failures = [];
  if (meta.sport === "soccer") {
    try {
      const events = await fetchOddsForSport(meta.oddsKey);
      if (events.length) {
        return {
          games: events.map((event) => normalizeOddsEventToGame(event, meta.sport, meta, "oddsapi")),
          oddsEvents: events,
          source: "oddsapi",
          failures,
        };
      }
      failures.push("The Odds API: sin partidos utiles");
    } catch (error) {
      failures.push(`The Odds API: ${error.message}`);
    }
    try {
      const events = await fetchSportsDbUpcomingLeague(meta.leagueId);
      if (events.length) {
        return {
          games: events.map((event) => normalizeSportsDbEvent(event, meta.sport, meta, "thesportsdb")),
          oddsEvents: [],
          source: "thesportsdb",
          failures,
        };
      }
      failures.push("TheSportsDB: sin partidos utiles");
    } catch (error) {
      failures.push(`TheSportsDB: ${error.message}`);
    }
  }

  if (meta.sport === "mlb") {
    try {
      const games = await fetchMlbUpcomingGames();
      if (games.length) {
        return {
          games: games.map((game) => normalizeMlbGame(game, meta, "mlb")),
          oddsEvents: [],
          source: "mlb",
          failures,
        };
      }
      failures.push("MLB Stats API: sin partidos utiles");
    } catch (error) {
      failures.push(`MLB Stats API: ${error.message}`);
    }
    try {
      const events = await fetchOddsForSport(meta.oddsKey);
      if (events.length) {
        return {
          games: events.map((event) => normalizeOddsEventToGame(event, meta.sport, meta, "oddsapi")),
          oddsEvents: events,
          source: "oddsapi",
          failures,
        };
      }
      failures.push("The Odds API: sin partidos utiles");
    } catch (error) {
      failures.push(`The Odds API: ${error.message}`);
    }
  }

  if (meta.sport === "nba" || meta.sport === "nfl") {
    try {
      const events = await fetchOddsForSport(meta.oddsKey);
      if (events.length) {
        return {
          games: events.map((event) => normalizeOddsEventToGame(event, meta.sport, meta, "oddsapi")),
          oddsEvents: events,
          source: "oddsapi",
          failures,
        };
      }
      failures.push("The Odds API: sin partidos utiles");
    } catch (error) {
      failures.push(`The Odds API: ${error.message}`);
    }
  }

  return { games: [], oddsEvents: [], source: "empty", failures };
}

async function loadBackendRecent(meta) {
  const failures = [];
  if (meta.sport === "soccer") {
    try {
      const events = await fetchScoresForSport(meta.oddsKey);
      const recent = events.filter((event) => event.completed).map((event) => normalizeOddsEventToGame(event, meta.sport, meta, "oddsapi"));
      if (recent.length) {
        return { recentGames: recent, source: "oddsapi", failures };
      }
      failures.push("Scores odds: sin resultados utiles");
    } catch (error) {
      failures.push(`Scores odds: ${error.message}`);
    }
    try {
      const events = await fetchSportsDbRecentLeague(meta.leagueId);
      const recent = events.map((event) => normalizeSportsDbEvent(event, meta.sport, meta, "thesportsdb"))
        .filter((game) => Number.isFinite(game.homeScore) && Number.isFinite(game.awayScore));
      if (recent.length) {
        return { recentGames: recent, source: "thesportsdb", failures };
      }
      failures.push("TheSportsDB recent: sin resultados utiles");
    } catch (error) {
      failures.push(`TheSportsDB recent: ${error.message}`);
    }
  }
  if (meta.sport === "mlb") {
    try {
      const games = await fetchMlbRecentGames();
      const recent = games.map((game) => normalizeMlbGame(game, meta, "mlb"))
        .filter((game) => Number.isFinite(game.homeScore) && Number.isFinite(game.awayScore));
      if (recent.length) {
        return { recentGames: recent, source: "mlb", failures };
      }
      failures.push("MLB Stats recent: sin resultados utiles");
    } catch (error) {
      failures.push(`MLB Stats recent: ${error.message}`);
    }
  }
  return { recentGames: [], source: "empty", failures };
}

async function loadBackendExternal(meta) {
  const failures = [];
  if (meta.sport === "soccer") {
    try {
      const table = await fetchSportsDbTable(meta.leagueId);
      const standings = standingsMapFromTable(table);
      if (Object.keys(standings).length) {
        return {
          externalRef: { source: "thesportsdb", standings, injuries: {} },
          source: "thesportsdb",
          failures,
        };
      }
      failures.push("TheSportsDB table: sin referencias utiles");
    } catch (error) {
      failures.push(`TheSportsDB table: ${error.message}`);
    }
  }
  return {
    externalRef: { source: "base", standings: {}, injuries: {} },
    source: "base",
    failures,
  };
}

async function buildBackendUnifiedPackage(meta, options = {}) {
  const fixturesLayer = await loadBackendFixtures(meta);
  const recentLayer = await loadBackendRecent(meta);
  const externalLayer = await loadBackendExternal(meta);

  let oddsEvents = fixturesLayer.oddsEvents || [];
  let oddsSource = fixturesLayer.source;
  const oddsFailures = [];
  if (!oddsEvents.length) {
    try {
      oddsEvents = await fetchOddsForSport(meta.oddsKey);
      oddsSource = oddsEvents.length ? "oddsapi" : "estimated";
      if (!oddsEvents.length) oddsFailures.push("The Odds API: sin odds utiles");
    } catch (error) {
      oddsSource = "estimated";
      oddsFailures.push(`The Odds API: ${error.message}`);
    }
  }

  const backendPackage = oddsEvents.length ? buildBackendPickPackage(meta, oddsEvents.slice(0, 24)) : buildEmptyBackendPickPackage(meta);
  const sourceWinner = fixturesLayer.source !== "empty" ? fixturesLayer.source : backendPackage.source || "backend";

  return {
    ok: true,
    sport: meta.sport,
    leagueId: meta.leagueId,
    leagueName: meta.leagueName,
    source: sourceWinner,
    games: fixturesLayer.games || [],
    tips: backendPackage.tips || [],
    backendTips: [],
    oddsEvents,
    recentGames: recentLayer.recentGames || [],
    validationGames: fixturesLayer.games || [],
    validationSource: fixturesLayer.source || "backend",
    externalRef: externalLayer.externalRef || { source: "base", standings: {}, injuries: {} },
    health: {
      source: {
        state: (fixturesLayer.games || []).length ? "ok" : "warn",
        mode: sourceMode(fixturesLayer.source),
        winner: fixturesLayer.source || "empty",
        detail: (fixturesLayer.games || []).length
          ? `${dataSourceLabel(fixturesLayer.source)} gano fixtures con ${fixturesLayer.games.length} partido(s).`
          : "Sin fixtures vivos en backend",
      },
      recent: {
        state: (recentLayer.recentGames || []).length ? "ok" : "warn",
        mode: sourceMode(recentLayer.source),
        winner: recentLayer.source || "empty",
        detail: (recentLayer.recentGames || []).length
          ? `${dataSourceLabel(recentLayer.source)} cargo ${recentLayer.recentGames.length} resultado(s) recientes.`
          : "Historico backend sin resultados utiles.",
      },
      odds: {
        state: oddsEvents.length ? "ok" : "warn",
        mode: sourceMode(oddsSource),
        winner: oddsSource || "estimated",
        detail: oddsEvents.length
          ? `${dataSourceLabel(oddsSource)} gano odds con ${oddsEvents.length} evento(s).`
          : "Sin odds reales disponibles en backend.",
      },
      external: {
        state: Object.keys(externalLayer.externalRef?.standings || {}).length ? "ok" : "warn",
        mode: sourceMode(externalLayer.source),
        winner: externalLayer.source || "base",
        detail: Object.keys(externalLayer.externalRef?.standings || {}).length
          ? `${dataSourceLabel(externalLayer.source)} activo con ${Object.keys(externalLayer.externalRef.standings).length} referencia(s).`
          : "Sin referencias externas utiles en backend.",
      },
      props: {
        state: "idle",
        mode: "idle",
        winner: "idle",
        detail: "Props siguen resueltos del lado del frontend.",
      },
    },
    backendDiagnostics: {
      fixturesFailures: fixturesLayer.failures || [],
      recentFailures: recentLayer.failures || [],
      oddsFailures,
      externalFailures: externalLayer.failures || [],
    },
    updatedAt: new Date().toISOString(),
  };
}

async function buildBackendAllSoccerPackage(apiChoice) {
  const soccerLeagues = backendLeagues.filter((item) => item.sport === "soccer");
  const settled = await Promise.allSettled(soccerLeagues.map((league) => buildBackendUnifiedPackage(league, { apiChoice })));
  const fulfilled = settled.filter((item) => item.status === "fulfilled").map((item) => item.value);
  const games = fulfilled.flatMap((item) => item.games || []);
  const tips = fulfilled.flatMap((item) => item.backendTips || []);
  const recentGames = fulfilled.flatMap((item) => item.recentGames || []);
  const oddsEvents = fulfilled.flatMap((item) => item.oddsEvents || []);
  const standings = Object.assign({}, ...fulfilled.map((item) => item.externalRef?.standings || {}));
  const liveFixturesCount = fulfilled.filter((item) => item.health?.source?.mode === "live").length;
  const cacheFixturesCount = fulfilled.filter((item) => item.health?.source?.mode === "cache").length;
  const liveOddsCount = fulfilled.filter((item) => item.health?.odds?.mode === "live").length;
  const cacheOddsCount = fulfilled.filter((item) => item.health?.odds?.mode === "cache").length;

  return {
    ok: true,
    sport: "soccer",
    leagueId: "__all_soccer__",
    leagueName: "Todas las ligas de futbol",
    source: "soccer_total",
    games,
    tips,
    backendTips: [],
    oddsEvents,
    recentGames,
    validationGames: games,
    validationSource: "backend",
    externalRef: { source: "backend", standings, injuries: {} },
    health: {
      source: {
        state: games.length ? "ok" : "warn",
        mode: liveFixturesCount ? "live" : cacheFixturesCount ? "cache" : "fallback",
        winner: "soccer_total",
        detail: `Fixtures: ${games.length} partido(s) desde ${fulfilled.length} liga(s)`,
      },
      recent: {
        state: recentGames.length ? "ok" : "warn",
        mode: recentGames.length ? "live" : "fallback",
        winner: "soccer_total",
        detail: `${recentGames.length} resultado(s) recientes cargados`,
      },
      odds: {
        state: oddsEvents.length ? "ok" : "warn",
        mode: liveOddsCount ? "live" : cacheOddsCount ? "cache" : "fallback",
        winner: oddsEvents.length ? "soccer_total" : "estimated",
        detail: oddsEvents.length ? `Odds: ${oddsEvents.length} evento(s) concentrados` : "Sin odds reales concentradas",
      },
      external: {
        state: Object.keys(standings).length ? "ok" : "warn",
        mode: Object.keys(standings).length ? "live" : "fallback",
        winner: Object.keys(standings).length ? "soccer_total" : "base",
        detail: "External: referencias cruzadas por liga",
      },
      props: {
        state: "idle",
        mode: "idle",
        winner: "idle",
        detail: "No aplica para futbol total",
      },
    },
    backendDiagnostics: {
      liveFixturesCount,
      cacheFixturesCount,
      liveOddsCount,
      cacheOddsCount,
    },
    updatedAt: new Date().toISOString(),
  };
}

function buildTopCacheEntry(event, meta) {
  const best = getBestH2HOutcome(event);
  if (!best) return null;
  const implied = best.price ? (100 / best.price) : 50;
  const confidence = clamp(52 + (100 - implied) * 0.35, 52, 78);
  const ev = Number((((confidence / 100) * best.price - 1) * 100).toFixed(1));
  return {
    id: `${meta.sport}-${event.id || `${event.away_team}-${event.home_team}-${event.commence_time}`}-${best.name}`,
    sport: meta.sport,
    leagueName: meta.leagueName,
    type: "Ganador",
    pick: `${best.name} gana`,
    match: `${event.away_team} @ ${event.home_team}`,
    eventDate: String(event.commence_time || "").slice(0, 10),
    odds: Number(best.price.toFixed(2)),
    bookmaker: best.bookmaker,
    consensusConfidence: Number(confidence.toFixed(1)),
    ev,
    reason: "Recolectado automaticamente desde odds reales del backend.",
    cachedAt: new Date().toISOString(),
  };
}

async function runDigestJob() {
  const topCache = {};
  const failures = [];
  let telegramError = null;
  appendBackendLog("info", "job.digest.start", "Iniciando digest multideporte", { leagues: backendLeagues.length });

  for (const meta of backendLeagues) {
    try {
      const events = await fetchOddsForSport(meta.oddsKey);
      const items = events
        .map((event) => buildTopCacheEntry(event, meta))
        .filter(Boolean)
        .sort((a, b) => b.consensusConfidence - a.consensusConfidence || b.ev - a.ev)
        .slice(0, 6);
      topCache[meta.sport] = {
        sport: meta.sport,
        leagueName: meta.leagueName,
        updatedAt: new Date().toISOString(),
        items,
      };
    } catch (error) {
      failures.push(`${meta.leagueName}: ${error.message}`);
    }
  }

  writeJson(storageFiles.topCache, topCache);

  const digestLines = Object.values(topCache)
    .flatMap((entry) => (entry.items || []).slice(0, 2))
    .sort((a, b) => b.consensusConfidence - a.consensusConfidence || b.ev - a.ev)
    .slice(0, 8)
    .map((tip, index) => `${index + 1}. ${tip.type}: ${tip.pick} | ${tip.match} | ${tip.leagueName} | ${tip.bookmaker} ${tip.odds.toFixed(2)}x | Consenso ${toPercent(tip.consensusConfidence)} | EV ${tip.ev > 0 ? "+" : ""}${tip.ev}%`);

  const digestText = digestLines.length ? ["DIGEST MULTIDEPORTE BOT DE PRONOSTICOS", ...digestLines].join("\n") : "";
  let telegram = null;
  if (digestText) {
    try {
      telegram = await sendTelegramServerSide(digestText, "Digest multideporte automatico desde backend");
    } catch (error) {
      telegramError = error.message;
      failures.push(`Telegram: ${error.message}`);
    }
  }

  writeBackendStatus();
  addBackendMetric("job_digest_runs", 1, { failures: failures.length, sent: Boolean(telegram) });
  appendBackendLog(
    failures.length ? "warn" : "info",
    "job.digest.finish",
    failures.length ? "Digest completado con alertas" : "Digest completado",
    { sports: Object.keys(topCache).length, failures, sent: Boolean(telegram), telegramError }
  );
  return { topCache, failures, sent: Boolean(telegram), digestText, telegramError };
}

async function runBackendPicksJob() {
  const packages = {};
  const failures = [];
  appendBackendLog("info", "job.picks.start", "Iniciando generacion de picks backend", { leagues: backendLeagues.length });

  for (const meta of backendLeagues) {
    try {
      const events = await fetchOddsForSport(meta.oddsKey);
      packages[`${meta.sport}:${meta.leagueId}`] = buildBackendPickPackage(meta, events.slice(0, 12));
    } catch (error) {
      failures.push(`${meta.leagueName}: ${error.message}`);
    }
  }

  writeJson(storageFiles.backendPicks, packages);
  writeBackendStatus();
  addBackendMetric("job_picks_runs", 1, { buckets: Object.keys(packages).length, failures: failures.length });
  appendBackendLog(
    failures.length ? "warn" : "info",
    "job.picks.finish",
    failures.length ? "Picks backend completados con alertas" : "Picks backend completados",
    { buckets: Object.keys(packages).length, failures }
  );
  return { ok: true, count: Object.keys(packages).length, failures, packages };
}

function findFinalGame(finalGames, metaGame, eventDate) {
  return finalGames.find((game) => {
    const sameTeams = namesMatch(game.home, metaGame.home) && namesMatch(game.away, metaGame.away);
    const sameDate = !eventDate || !game.date || game.date === eventDate;
    return sameTeams && sameDate;
  });
}

function gradeLeg(leg, finalGame) {
  if (!finalGame || !Number.isFinite(finalGame.homeScore) || !Number.isFinite(finalGame.awayScore)) return null;
  if (leg.type === "Ganador") {
    const winner = finalGame.homeScore > finalGame.awayScore ? finalGame.home : finalGame.away;
    return namesMatch(winner, leg.targetTeam);
  }
  if (leg.type === "Over/Under") {
    const total = finalGame.homeScore + finalGame.awayScore;
    const line = sportProfiles[leg.game?.sport || finalGame.sport]?.baseTotal || 0;
    return leg.totalSide === "Over" ? total > line : total < line;
  }
  if (leg.type === "Spread") {
    const lineText = sportProfiles[leg.game?.sport || finalGame.sport]?.spreadLabel || "";
    const line = Number((lineText.match(/([+-]?\d+(\.\d+)?)/) || [0, 0])[1]);
    const targetIsHome = namesMatch(leg.targetTeam, finalGame.home);
    const adjusted = targetIsHome ? finalGame.homeScore + line - finalGame.awayScore : finalGame.awayScore + line - finalGame.homeScore;
    return adjusted > 0;
  }
  if (leg.type === "Ambos anotan") {
    const both = finalGame.homeScore > 0 && finalGame.awayScore > 0;
    return leg.bttsPick === "Ambos equipos anotan" ? both : !both;
  }
  return null;
}

function mapOddsScoreToGame(scoreItem, fallbackSport = "") {
  return {
    home: scoreItem.home_team,
    away: scoreItem.away_team,
    date: String(scoreItem.commence_time || "").slice(0, 10),
    homeScore: Number(scoreItem.scores?.find((team) => namesMatch(team.name, scoreItem.home_team))?.score ?? scoreItem.home_score ?? NaN),
    awayScore: Number(scoreItem.scores?.find((team) => namesMatch(team.name, scoreItem.away_team))?.score ?? scoreItem.away_score ?? NaN),
    sport: fallbackSport,
  };
}

async function runGradeJob() {
  const history = readJson(storageFiles.history, []);
  appendBackendLog("info", "job.grade.start", "Iniciando autoevaluacion backend", { historyCount: history.length });
  const sportToOddsKey = {
    Futbol: "soccer_epl",
    MLB: "baseball_mlb",
    NBA: "basketball_nba",
    NFL: "americanfootball_nfl",
  };
  const soccerLeagueKeys = Object.fromEntries(
    backendLeagues
      .filter((league) => league.sport === "soccer")
      .map((league) => [league.leagueName, league.oddsKey]),
  );

  const finalGames = [];
  const usedKeys = [...new Set(history.map((record) => {
    if (record.sport === "Futbol") {
      return soccerLeagueKeys[record.league] || sportToOddsKey[record.sport];
    }
    return sportToOddsKey[record.sport];
  }).filter(Boolean))];
  const failures = [];

  for (const oddsKey of usedKeys) {
    try {
      const scores = await fetchScoresForSport(oddsKey);
      const sport = oddsKey.includes("baseball") ? "mlb" : oddsKey.includes("basketball") ? "nba" : oddsKey.includes("americanfootball") ? "nfl" : "soccer";
      scores
        .filter((item) => item.completed)
        .forEach((item) => finalGames.push(mapOddsScoreToGame(item, sport)));
    } catch (error) {
      failures.push(`${oddsKey}: ${error.message}`);
    }
  }

  let changed = 0;
  const updated = history.map((record) => {
    if (record.result !== "pending") return record;

    if (record.kind === "Pick" && record.game) {
      const finalGame = findFinalGame(finalGames, record.game, record.eventDate);
      const outcome = gradeLeg({ ...record.tipMeta, game: record.game }, finalGame);
      if (outcome === null) return record;
      changed += 1;
      const next = { ...record, result: outcome ? "win" : "loss", updatedAt: new Date().toISOString(), autoGraded: true };
      next.closingOdds = next.closingOdds || next.odds;
      next.clv = clvFor(next);
      return next;
    }

    if (record.kind === "Parlay" && Array.isArray(record.legs)) {
      const legResults = record.legs.map((leg) => {
        const finalGame = findFinalGame(finalGames, leg.game, leg.game.date || record.eventDate);
        return gradeLeg(leg, finalGame);
      });
      if (legResults.some((result) => result === null)) return record;
      changed += 1;
      const next = { ...record, result: legResults.every(Boolean) ? "win" : "loss", updatedAt: new Date().toISOString(), autoGraded: true };
      next.closingOdds = next.closingOdds || next.odds;
      next.clv = clvFor(next);
      return next;
    }

    return record;
  });

  writeJson(storageFiles.history, updated);
  writeJson(storageFiles.statsSnapshot, buildStatsSnapshot(updated));
  writeBackendStatus();
  addBackendMetric("job_grade_runs", 1, { changed, failures: failures.length, historyCount: updated.length });
  appendBackendLog(
    failures.length ? "warn" : "info",
    "job.grade.finish",
    failures.length ? "Autoevaluacion completada con alertas" : "Autoevaluacion completada",
    { changed, failures, historyCount: updated.length }
  );
  return { changed, failures, historyCount: updated.length };
}

function buildBackendStatus() {
  const config = loadBotConfig();
  const history = readJson(storageFiles.history, []);
  const statsSnapshot = readJson(storageFiles.statsSnapshot, null);
  const topCache = readJson(storageFiles.topCache, {});
  const backendPicks = readJson(storageFiles.backendPicks, {});
  const telegramSentHistory = readJson(storageFiles.telegramSentHistory, []);
  const backendMetrics = readJson(storageFiles.backendMetrics, []);
  const backendLogs = readJson(storageFiles.backendLogs, []);

  return {
    ok: true,
    hasTelegram: Boolean(config.telegramBotToken && config.telegramChatId),
    historyCount: history.length,
    topCacheSports: Object.keys(topCache),
    backendPickBuckets: Object.keys(backendPicks),
    lastStatsSnapshotAt: statsSnapshot?.updatedAt || null,
    lastBackendPicksAt: Object.values(backendPicks)[0]?.updatedAt || null,
    lastTelegramSentAt: telegramSentHistory[0]?.sentAt || null,
    lastMetricAt: backendMetrics[0]?.at || null,
    lastLogAt: backendLogs[0]?.at || null,
    updatedAt: new Date().toISOString(),
  };
}

function writeBackendStatus() {
  const status = buildBackendStatus();
  writeJson(storageFiles.backendStatus, status);
  return status;
}

async function handleApi(req, res, pathname) {
  if (req.method === "GET" && pathname === "/api/bootstrap") {
    sendJson(res, 200, {
      history: readJson(storageFiles.history, []),
      statsSnapshot: readJson(storageFiles.statsSnapshot, null),
      topCache: readJson(storageFiles.topCache, {}),
      telegramSentHistory: readJson(storageFiles.telegramSentHistory, []),
      betModeHistory: readJson(storageFiles.betModeHistory, []),
      paperTrades: readJson(storageFiles.paperTrades, []),
      backendStatus: writeBackendStatus(),
    });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/status") {
    sendJson(res, 200, writeBackendStatus());
    return true;
  }

  if (req.method === "GET" && pathname === "/api/metrics") {
    const metrics = readJson(storageFiles.backendMetrics, []);
    sendJson(res, 200, {
      ok: true,
      count: metrics.length,
      summary: summarizeMetrics(metrics),
      items: metrics.slice(0, 120),
    });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/logs") {
    const logs = readJson(storageFiles.backendLogs, []);
    sendJson(res, 200, {
      ok: true,
      count: logs.length,
      items: logs.slice(0, 120),
    });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/pyespn/props") {
    const body = await collectBody(req);
    const league = String(body.league || "").toLowerCase();
    const season = Number(body.season || 0);
    const recent = Number(body.recent || 5);
    const names = Array.isArray(body.names) ? body.names : [];
    if (!["nfl", "nba"].includes(league)) {
      sendJson(res, 400, { ok: false, error: "Liga PyESPN invalida" });
      return true;
    }
    if (!season) {
      sendJson(res, 400, { ok: false, error: "Temporada requerida" });
      return true;
    }
    try {
      appendBackendLog("info", "pyespn.props.start", "Resolviendo props por PyESPN", { league, season, requested: names.length });
      const result = await runPyEspnPropBatch({ league, season, recent, names });
      addBackendMetric("pyespn_props_runs", 1, {
        league,
        resolved: Object.keys(result.resolved || {}).length,
        unresolved: (result.unresolved || []).length,
      });
      appendBackendLog("info", "pyespn.props.finish", "PyESPN resolvio props", {
        league,
        season,
        resolved: Object.keys(result.resolved || {}).length,
        unresolved: (result.unresolved || []).length,
      });
      sendJson(res, 200, { ok: true, ...result });
    } catch (error) {
      appendBackendLog("warn", "pyespn.props.error", error.message, { league, season, requested: names.length });
      sendJson(res, 500, { ok: false, error: error.message });
    }
    return true;
  }

  if (req.method === "GET" && pathname === "/api/picks") {
    const url = new URL(req.url || "/", `http://${req.headers.host || "127.0.0.1"}`);
    const sport = url.searchParams.get("sport") || "";
    const leagueId = url.searchParams.get("leagueId") || "";
    const apiChoice = url.searchParams.get("apiChoice") || "auto";
    const allSoccer = url.searchParams.get("allSoccer") === "1" || leagueId === "__all_soccer__";
    const key = `${sport}:${leagueId}`;
    let packages = readJson(storageFiles.backendPicks, {});
    let payload = packages[key];

    if (!payload || apiChoice !== "backend" || allSoccer) {
      if (sport === "soccer" && allSoccer) {
        payload = await buildBackendAllSoccerPackage(apiChoice);
      } else {
      const meta = backendLeagues.find((item) => item.sport === sport && item.leagueId === leagueId);
      if (!meta) {
        sendJson(res, 404, { ok: false, error: "No encontre configuracion backend para ese deporte/liga" });
        return true;
      }
      try {
          payload = await buildBackendUnifiedPackage(meta, { apiChoice });
      } catch (error) {
          payload = {
            ...buildEmptyBackendPickPackage(meta, `No pude consultar datos en vivo: ${error.message}`),
            ok: true,
            validationGames: [],
            validationSource: "backend",
            health: {
              source: { state: "warn", mode: "fallback", winner: "empty", detail: `Sin fixtures: ${error.message}` },
              recent: { state: "warn", mode: "fallback", winner: "empty", detail: "Historico backend no disponible." },
              odds: { state: "warn", mode: "fallback", winner: "estimated", detail: `Sin odds: ${error.message}` },
              external: { state: "warn", mode: "fallback", winner: "base", detail: "Sin referencias externas." },
              props: { state: "idle", mode: "idle", winner: "idle", detail: "Props siguen resueltos del lado del frontend." },
            },
            backendDiagnostics: { error: error.message },
          };
        }
      }
      packages[key] = payload;
      writeJson(storageFiles.backendPicks, packages);
    }

    sendJson(res, 200, { ok: true, ...payload });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/storage/history") {
    const body = await collectBody(req);
    writeJson(storageFiles.history, Array.isArray(body.items) ? body.items : []);
    addBackendMetric("storage_history_sync", Array.isArray(body.items) ? body.items.length : 0);
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/storage/stats-snapshot") {
    const body = await collectBody(req);
    writeJson(storageFiles.statsSnapshot, body.snapshot || null);
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/storage/top-cache") {
    const body = await collectBody(req);
    writeJson(storageFiles.topCache, body.cache || {});
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/storage/telegram-sent") {
    const body = await collectBody(req);
    writeJson(storageFiles.telegramSentHistory, Array.isArray(body.items) ? body.items : []);
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/storage/bet-mode-history") {
    const body = await collectBody(req);
    writeJson(storageFiles.betModeHistory, Array.isArray(body.items) ? body.items : []);
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/storage/paper-trades") {
    const body = await collectBody(req);
    writeJson(storageFiles.paperTrades, Array.isArray(body.items) ? body.items : []);
    addBackendMetric("storage_paper_sync", Array.isArray(body.items) ? body.items.length : 0);
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/telegram/send") {
    const body = await collectBody(req);
    const result = await sendTelegramServerSide(body.text || "", body.summary || "Envio desde backend");
    sendJson(res, 200, { ok: true, result });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/jobs/digest") {
    const result = await runDigestJob();
    sendJson(res, 200, { ok: true, ...result, status: writeBackendStatus() });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/jobs/picks") {
    const result = await runBackendPicksJob();
    sendJson(res, 200, { ...result, status: writeBackendStatus() });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/jobs/grade") {
    const result = await runGradeJob();
    sendJson(res, 200, { ok: true, ...result, status: writeBackendStatus() });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/collect/run") {
    const picks = await runBackendPicksJob();
    const digest = await runDigestJob();
    const grade = await runGradeJob();
    sendJson(res, 200, {
      ok: true,
      picks,
      digest,
      grade,
      status: writeBackendStatus(),
    });
    return true;
  }

  return false;
}

function serveStatic(req, res, pathname) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(root, safePath));

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(error.code === "ENOENT" ? 404 : 500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });
    res.end(data);
  });
}

ensureDataDir();
writeBackendStatus();

http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "127.0.0.1"}`);
    const handled = await handleApi(req, res, url.pathname);
    if (handled) return;
    serveStatic(req, res, url.pathname);
  } catch (error) {
    sendJson(res, 500, { ok: false, error: error.message });
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Backend + static server running on http://127.0.0.1:${port}/`);
});
