const leagues = {
  soccer: [
    { id: "4328", name: "Premier League", api: "thesportsdb" },
    { id: "4480", name: "UEFA Champions League", api: "thesportsdb" },
    { id: "4481", name: "UEFA Europa League", api: "thesportsdb" },
    { id: "5071", name: "UEFA Conference League", api: "thesportsdb" },
    { id: "4335", name: "La Liga", api: "thesportsdb" },
    { id: "4331", name: "Bundesliga", api: "thesportsdb" },
    { id: "4332", name: "Serie A", api: "thesportsdb" },
    { id: "4346", name: "MLS", api: "thesportsdb" },
    { id: "4350", name: "Liga MX", api: "thesportsdb" },
    { id: "4429", name: "FIFA World Cup", api: "thesportsdb" },
  ],
  mlb: [
    { id: "mlb", name: "Major League Baseball", api: "mlb" },
  ],
  nba: [
    { id: "4387", name: "NBA", api: "balldontlie" },
  ],
  nfl: [
    { id: "nfl", name: "NFL", api: "oddsapi" },
  ],
};

const demoGames = {
  soccer: [
    { home: "Manchester City", away: "Arsenal", date: "2026-04-22", sport: "soccer" },
    { home: "Real Madrid", away: "Barcelona", date: "2026-04-23", sport: "soccer" },
    { home: "Inter Miami", away: "LAFC", date: "2026-04-24", sport: "soccer" },
  ],
  mlb: [
    { home: "Los Angeles Dodgers", away: "San Diego Padres", date: "2026-04-22", sport: "mlb" },
    { home: "New York Yankees", away: "Boston Red Sox", date: "2026-04-23", sport: "mlb" },
    { home: "Houston Astros", away: "Texas Rangers", date: "2026-04-24", sport: "mlb" },
  ],
  nba: [
    { home: "Boston Celtics", away: "New York Knicks", date: "2026-04-22", sport: "nba" },
    { home: "Denver Nuggets", away: "Phoenix Suns", date: "2026-04-23", sport: "nba" },
    { home: "Los Angeles Lakers", away: "Golden State Warriors", date: "2026-04-24", sport: "nba" },
  ],
  nfl: [
    { home: "Kansas City Chiefs", away: "Buffalo Bills", date: "2026-09-10", sport: "nfl" },
    { home: "Dallas Cowboys", away: "Philadelphia Eagles", date: "2026-09-13", sport: "nfl" },
    { home: "San Francisco 49ers", away: "Detroit Lions", date: "2026-09-14", sport: "nfl" },
  ],
};

const dataSourceLabels = {
  thesportsdb: "TheSportsDB",
  mlb: "MLB Stats API",
  demo: "Demo local",
  oddsapi: "The Odds API",
  sxbet: "SX Bet",
  balldontlie: "balldontlie",
  therundown: "TheRundown",
  backend: "Backend del bot",
  sportsapipro: "Sports API Pro",
};

const oddsSportKeys = {
  soccer: {
    "4328": "soccer_epl",
    "4480": "soccer_uefa_champs_league",
    "4481": "soccer_uefa_europa_league",
    "5071": "soccer_uefa_europa_conference_league",
    "4335": "soccer_spain_la_liga",
    "4331": "soccer_germany_bundesliga",
    "4332": "soccer_italy_serie_a",
    "4346": "soccer_usa_mls",
    "4350": "soccer_mexico_ligamx",
    "4429": "soccer_fifa_world_cup",
  },
  mlb: {
    mlb: "baseball_mlb",
  },
  nba: {
    "4387": "basketball_nba",
  },
  nfl: {
    nfl: "americanfootball_nfl",
  },
};

const theRundownSportIds = {
  soccer: {
    "4346": 10,
    "4328": 11,
    "4331": 13,
    "4335": 14,
    "4332": 15,
  },
  mlb: {
    mlb: 3,
  },
  nba: {
    "4387": 4,
  },
  nfl: {},
};

const sxBetCaches = {
  sports: null,
  leagues: {},
  fixtures: {},
  markets: {},
};

const sxBetSportHints = {
  soccer: ["soccer", "football"],
  mlb: ["baseball"],
  nba: ["basketball"],
  nfl: ["football", "american football"],
};

const sxBetLeagueHints = {
  soccer: {
    "4328": ["premier league"],
    "4480": ["champions league"],
    "4481": ["europa league"],
    "5071": ["conference league", "europa conference"],
    "4335": ["la liga"],
    "4331": ["bundesliga"],
    "4332": ["serie a"],
    "4346": ["major league soccer", "mls"],
    "4350": ["liga mx", "mexico"],
    "4429": ["world cup"],
  },
  mlb: {
    mlb: ["major league baseball", "mlb", "baseball"],
  },
  nba: {
    "4387": ["nba", "basketball"],
  },
  nfl: {
    nfl: ["nfl", "american football"],
  },
};

const sportProfiles = {
  soccer: {
    totalLabel: "goles",
    baseTotal: 2.5,
    spreadLabel: "handicap +0.5",
    apiName: "Futbol",
  },
  mlb: {
    totalLabel: "carreras",
    baseTotal: 8.5,
    spreadLabel: "run line +1.5",
    apiName: "MLB",
  },
  nba: {
    totalLabel: "puntos",
    baseTotal: 219.5,
    spreadLabel: "spread +4.5",
    apiName: "NBA",
  },
  nfl: {
    totalLabel: "puntos",
    baseTotal: 44.5,
    spreadLabel: "spread +3.5",
    apiName: "NFL",
  },
};

const marketConfig = {
  soccer: {
    Ganador: { market: "Moneyline", fairMin: 1.42, fairMax: 2.85 },
    "Over/Under": { market: "Totales", fairMin: 1.72, fairMax: 2.18 },
    Spread: { market: "Handicap", fairMin: 1.62, fairMax: 2.08 },
    "Ambos anotan": { market: "BTTS", fairMin: 1.7, fairMax: 2.28 },
    "Doble oportunidad": { market: "Doble oportunidad", fairMin: 1.28, fairMax: 1.95 },
    "Empate no apuesta": { market: "Empate no apuesta", fairMin: 1.38, fairMax: 2.2 },
    "Handicap asiatico": { market: "Handicap asiatico", fairMin: 1.6, fairMax: 2.2 },
    "Correct score": { market: "Correct score", fairMin: 4.5, fairMax: 10.5 },
  },
  mlb: {
    Ganador: { market: "Moneyline", fairMin: 1.45, fairMax: 2.55 },
    "Over/Under": { market: "Totales", fairMin: 1.74, fairMax: 2.12 },
    Spread: { market: "Run line", fairMin: 1.68, fairMax: 2.22 },
    "Team total": { market: "Team total", fairMin: 1.7, fairMax: 2.35 },
    "First 5 innings": { market: "F5 moneyline", fairMin: 1.55, fairMax: 2.5 },
    "First 5 total": { market: "F5 totals", fairMin: 1.72, fairMax: 2.18 },
  },
  nba: {
    Ganador: { market: "Moneyline", fairMin: 1.35, fairMax: 2.75 },
    "Over/Under": { market: "Totales", fairMin: 1.76, fairMax: 2.1 },
    Spread: { market: "Spread", fairMin: 1.78, fairMax: 2.08 },
    "Team total": { market: "Team total", fairMin: 1.76, fairMax: 2.18 },
  },
  nfl: {
    Ganador: { market: "Moneyline", fairMin: 1.42, fairMax: 2.95 },
    "Over/Under": { market: "Totales", fairMin: 1.8, fairMax: 2.12 },
    Spread: { market: "Spread", fairMin: 1.82, fairMax: 2.1 },
    "Team total": { market: "Team total", fairMin: 1.78, fairMax: 2.16 },
  },
};

const els = {
  sport: document.querySelector("#sportSelect"),
  league: document.querySelector("#leagueSelect"),
  uefaTabs: [...document.querySelectorAll(".uefa-tab")],
  dashboardTabs: [...document.querySelectorAll(".dashboard-tab")],
  executiveTopPick: document.querySelector("#executiveTopPick"),
  executiveHeroCard: document.querySelector("#executiveHeroCard"),
  executiveHeroHighlights: document.querySelector("#executiveHeroHighlights"),
  executiveSlateState: document.querySelector("#executiveSlateState"),
  executiveBankrollState: document.querySelector("#executiveBankrollState"),
  executiveQuickActions: document.querySelector("#executiveQuickActions"),
  executivePulse: document.querySelector("#executivePulse"),
  autoConfidencePanel: document.querySelector("#autoConfidencePanel"),
  autoConfidencePanelBadge: document.querySelector("#autoConfidencePanelBadge"),
  api: document.querySelector("#apiSelect"),
  apiKey: document.querySelector("#apiKeyInput"),
  load: document.querySelector("#loadBtn"),
  copyOpenCommand: document.querySelector("#copyOpenCommandBtn"),
  runCollect: document.querySelector("#runCollectBtn"),
  runDigest: document.querySelector("#runDigestBtn"),
  runGrade: document.querySelector("#runGradeBtn"),
  risk: document.querySelector("#riskSlider"),
  minConfidence: document.querySelector("#confidenceSlider"),
  confidenceMode: document.querySelector("#confidenceModeSelect"),
  confidenceAutoBadge: document.querySelector("#confidenceAutoBadge"),
  valueOnly: document.querySelector("#valueOnlyToggle"),
  realOnly: document.querySelector("#realOnlyToggle"),
  evStrongOnly: document.querySelector("#evStrongOnlyToggle"),
  bankroll: document.querySelector("#bankrollInput"),
  stakeProfile: document.querySelector("#stakeProfileSelect"),
  betMode: document.querySelector("#betModeSelect"),
  stake: document.querySelector("#stakeInput"),
  autoGrade: document.querySelector("#autoGradeToggle"),
  tips: document.querySelector("#tipsList"),
  parlays: document.querySelector("#parlaysList"),
  topPicks: document.querySelector("#topPicksList"),
  realTopPicks: document.querySelector("#realTopPicksList"),
  dailySlateDate: document.querySelector("#dailySlateDate"),
  dailySlateTips: document.querySelector("#dailySlateTips"),
  dailyRealSlateTips: document.querySelector("#dailyRealSlateTips"),
  dailySportsActive: document.querySelector("#dailySportsActive"),
  dailyNextRun: document.querySelector("#dailyNextRun"),
  sendSlateTop: document.querySelector("#sendSlateTopBtn"),
  dailyOpsPanel: document.querySelector("#dailyOpsPanel"),
  dailySportOpsList: document.querySelector("#dailySportOpsList"),
  bettingPlanPanel: document.querySelector("#bettingPlanPanel"),
  bettingPlanBadge: document.querySelector("#bettingPlanBadge"),
  copyBettingPlan: document.querySelector("#copyBettingPlanBtn"),
  sendTelegramPlan: document.querySelector("#sendTelegramPlanBtn"),
  betModeHistoryPanel: document.querySelector("#betModeHistoryPanel"),
  backendActivityBadge: document.querySelector("#backendActivityBadge"),
  backendLastRun: document.querySelector("#backendLastRun"),
  backendJobRuns: document.querySelector("#backendJobRuns"),
  backendValueHits: document.querySelector("#backendValueHits"),
  backendWarnings: document.querySelector("#backendWarnings"),
  backendMetricsPanel: document.querySelector("#backendMetricsPanel"),
  backendValuePanel: document.querySelector("#backendValuePanel"),
  backendLogsPanel: document.querySelector("#backendLogsPanel"),
  telegramPreview: document.querySelector("#telegramPreview"),
  statsSnapshotPanel: document.querySelector("#statsSnapshotPanel"),
  telegramSentHistory: document.querySelector("#telegramSentHistory"),
  openBotHelp: document.querySelector("#openBotHelp"),
  feedHealthList: document.querySelector("#feedHealthList"),
  oddsAlerts: document.querySelector("#oddsAlertsList"),
  alertsCenter: document.querySelector("#alertsCenterList"),
  booksCompare: document.querySelector("#booksCompareList"),
  lineMovement: document.querySelector("#lineMovementList"),
  marketEventTabs: document.querySelector("#marketEventTabs"),
  marketFamilyTabs: document.querySelector("#marketFamilyTabs"),
  marketExplorerMeta: document.querySelector("#marketExplorerMeta"),
  marketExplorer: document.querySelector("#marketExplorerList"),
  validationList: document.querySelector("#validationList"),
  validationBadge: document.querySelector("#validationBadge"),
  consensusList: document.querySelector("#consensusList"),
  externalSignalsList: document.querySelector("#externalSignalsList"),
  externalBadge: document.querySelector("#externalBadge"),
  enableNotifications: document.querySelector("#enableNotificationsBtn"),
  sendTelegramSlip: document.querySelector("#sendTelegramSlipBtn"),
  sendTelegramTop: document.querySelector("#sendTelegramTopBtn"),
  sendTelegramDigest: document.querySelector("#sendTelegramDigestBtn"),
  ticketSummary: document.querySelector("#ticketSummary"),
  ticketList: document.querySelector("#ticketList"),
  clearTicket: document.querySelector("#clearTicketBtn"),
  copyTicket: document.querySelector("#copyTicketBtn"),
  copySlip: document.querySelector("#copySlipBtn"),
  calendarDate: document.querySelector("#calendarDateInput"),
  calendarToday: document.querySelector("#calendarTodayBtn"),
  calendarSummary: document.querySelector("#calendarSummary"),
  calendarPicks: document.querySelector("#calendarPicksList"),
  log: document.querySelector("#logPanel"),
  source: document.querySelector("#sourceBadge"),
  feedHealthBadge: document.querySelector("#feedHealthBadge"),
  telegramAutoTopToggle: document.querySelector("#telegramAutoTopToggle"),
  gamesCount: document.querySelector("#gamesCount"),
  tipsCount: document.querySelector("#tipsCount"),
  realTipsCount: document.querySelector("#realTipsCount"),
  avgConfidence: document.querySelector("#avgConfidence"),
  oddsAlertsCount: document.querySelector("#oddsAlertsCount"),
  evValidCount: document.querySelector("#evValidCount"),
  evRejectedCount: document.querySelector("#evRejectedCount"),
  slateDemandBadge: document.querySelector("#slateDemandBadge"),
  evRejectReasonsPanel: document.querySelector("#evRejectReasonsPanel"),
  snapshotBadge: document.querySelector("#snapshotBadge"),
  historyCount: document.querySelector("#historyCount"),
  historyWinRate: document.querySelector("#historyWinRate"),
  historyRoi: document.querySelector("#historyRoi"),
  historyProfit: document.querySelector("#historyProfit"),
  historyBankroll: document.querySelector("#historyBankroll"),
  historyTable: document.querySelector("#historyTable"),
  clearHistory: document.querySelector("#clearHistoryBtn"),
  exportHistory: document.querySelector("#exportHistoryBtn"),
  runPaperNow: document.querySelector("#runPaperNowBtn"),
  clearPaper: document.querySelector("#clearPaperBtn"),
  paperCount: document.querySelector("#paperCount"),
  paperPending: document.querySelector("#paperPending"),
  paperWinRate: document.querySelector("#paperWinRate"),
  paperRoi: document.querySelector("#paperRoi"),
  paperProfit: document.querySelector("#paperProfit"),
  paperModeBreakdown: document.querySelector("#paperModeBreakdown"),
  paperSportBreakdown: document.querySelector("#paperSportBreakdown"),
  paperMarketBreakdown: document.querySelector("#paperMarketBreakdown"),
  backtestSummary: document.querySelector("#backtestSummary"),
  backtestFromDate: document.querySelector("#backtestFromDate"),
  backtestToDate: document.querySelector("#backtestToDate"),
  backtestSourceFilter: document.querySelector("#backtestSourceFilter"),
  auditMinSample: document.querySelector("#auditMinSampleInput"),
  auditModeRoiBreakdown: document.querySelector("#auditModeRoiBreakdown"),
  auditModeClvBreakdown: document.querySelector("#auditModeClvBreakdown"),
  auditConfidenceBreakdown: document.querySelector("#auditConfidenceBreakdown"),
  auditValueBreakdown: document.querySelector("#auditValueBreakdown"),
  auditModeDrawdownBreakdown: document.querySelector("#auditModeDrawdownBreakdown"),
  auditYieldBreakdown: document.querySelector("#auditYieldBreakdown"),
  auditNoBetPanel: document.querySelector("#auditNoBetPanel"),
  auditRankingPanel: document.querySelector("#auditRankingPanel"),
  shareImagePreview: document.querySelector("#shareImagePreview"),
  shareImageMeta: document.querySelector("#shareImageMeta"),
  downloadShareImage: document.querySelector("#downloadShareImageBtn"),
  sportBreakdown: document.querySelector("#sportBreakdown"),
  marketBreakdown: document.querySelector("#marketBreakdown"),
  leagueBreakdown: document.querySelector("#leagueBreakdown"),
  pickTypeBreakdown: document.querySelector("#pickTypeBreakdown"),
  clvSportBreakdown: document.querySelector("#clvSportBreakdown"),
  clvMarketBreakdown: document.querySelector("#clvMarketBreakdown"),
  historyFromDate: document.querySelector("#historyFromDate"),
  historyToDate: document.querySelector("#historyToDate"),
  historySportFilter: document.querySelector("#historySportFilter"),
  historyMarketFilter: document.querySelector("#historyMarketFilter"),
  historyLeagueFilter: document.querySelector("#historyLeagueFilter"),
  watchlistInput: document.querySelector("#watchlistInput"),
  addWatchlist: document.querySelector("#addWatchlistBtn"),
  clearWatchlist: document.querySelector("#clearWatchlistBtn"),
  watchlistItems: document.querySelector("#watchlistItems"),
  weeklyWinRate: document.querySelector("#weeklyWinRate"),
  weeklyRoi: document.querySelector("#weeklyRoi"),
  monthlyWinRate: document.querySelector("#monthlyWinRate"),
  monthlyRoi: document.querySelector("#monthlyRoi"),
  yieldValue: document.querySelector("#yieldValue"),
  drawdownValue: document.querySelector("#drawdownValue"),
  equityCurve: document.querySelector("#equityCurve"),
};

let currentOddsBook = [];
let currentPropStatsBook = {};
let currentMlbLineupBook = {};
let currentTrackingItems = {};
const oddsCache = {};
const nbaPlayerSearchCache = {};
const nbaPlayerStatsCache = {};
const pyEspnPropsCache = {};
let nflPlayerProjectionCache = {};
let nflPlayerGameLogCache = {};
const historyStorageKey = "sportsBotHistory:v1";
const oddsSnapshotKey = "sportsBotOddsSnapshot:v1";
const notificationsStateKey = "sportsBotNotifications:v1";
const watchlistKey = "sportsBotWatchlist:v1";
const ticketStorageKey = "sportsBotTicket:v1";
const telegramAutoTopStateKey = "sportsBotTelegramAutoTop:v1";
const topCacheStorageKey = "sportsBotTopCache:v1";
const statsSnapshotKey = "sportsBotStatsSnapshot:v1";
const telegramSentHistoryKey = "sportsBotTelegramSentHistory:v1";
const betModeHistoryKey = "sportsBotBetModeHistory:v1";
const paperTradesKey = "sportsBotPaperTrades:v1";
let currentTopFilter = "all";
let currentCalendarDate = "";
let lastBettingPlanText = "";
let isApplyingAutoTune = false;
let pendingAutoTuneRun = false;
let lastAutoTuneSignature = "";
let latestBackendStatus = null;
let latestBackendMetrics = [];
let latestBackendLogs = [];
let currentShareTipId = "";
let currentDashboardView = "overview";
let currentMarketEventId = "";
let currentMarketFamily = "main";
const workMode = new URLSearchParams(window.location.search).get("workmode") === "1";

function fillLeagues() {
  const items = leagues[els.sport.value];
  els.league.innerHTML = items.map((league) => `<option value="${league.id}">${league.name}</option>`).join("");
  els.api.value = "sportsapipro";
  syncUefaTabs();
}

function isUefaCompetition(leagueId, leagueName = "") {
  return ["4480", "4481", "5071"].includes(String(leagueId || "")) || /UEFA Champions League|UEFA Europa League|UEFA Conference League/i.test(String(leagueName || ""));
}

function competitionClassMeta(tip) {
  const leagueId = tip?.leagueId || "";
  const leagueName = tip?.leagueName || "";
  if (isUefaCompetition(leagueId, leagueName)) {
    return { key: "continental", label: "Torneo continental" };
  }
  return { key: "domestic", label: "Liga domestica" };
}

function mlbSplitBadgeMeta(game = {}) {
  if (game?.sport !== "mlb") return null;
  const hasHands = game.lineupHomeHands || game.lineupAwayHands;
  const hasPitchers = game.homePitcherHand || game.awayPitcherHand;
  if (!hasHands || !hasPitchers) return null;
  const homePlatoon = mlbLineupAdvantageVsPitcher(game.lineupHomeHands, game.awayPitcherHand);
  const awayPlatoon = mlbLineupAdvantageVsPitcher(game.lineupAwayHands, game.homePitcherHand);
  const edge = Math.abs(homePlatoon - awayPlatoon);
  if (edge < 0.08) {
    return { label: "Split neutral", detail: "Platoon equilibrado", key: "pending" };
  }
  return {
    label: "Split vs mano detectado",
    detail: `${describeMlbPlatoon(game.lineupHomeHands, game.awayPitcherHand)} | ${describeMlbPlatoon(game.lineupAwayHands, game.homePitcherHand)}`,
    key: edge >= 0.22 ? "elite" : "confirmed",
  };
}

function syncUefaTabs() {
  if (!els.uefaTabs?.length) return;
  const isSoccer = els.sport.value === "soccer";
  els.uefaTabs.forEach((button) => {
    button.hidden = !isSoccer;
    button.classList.toggle("active", isSoccer && button.dataset.uefaLeague === els.league.value);
  });
}

function dashboardViewRegistry() {
  return {
    overview: [
      '[aria-label="Dashboard ejecutivo"]',
      '[aria-label="Radar automatico"]',
      '[aria-label="Operacion diaria"]',
      '[aria-label="Tops del dia"]',
      '[aria-label="Top picks reales del dia"]',
    ],
    picks: [
      '[aria-label="Consenso final"]',
      '[aria-label="Picks recomendados"]',
      '[aria-label="Parlays recomendados"]',
      '[aria-label="Ticket builder"]',
      '[aria-label="Bitacora"]',
    ],
    markets: [
      '[aria-label="Vista mercados"]',
      '[aria-label="Comparador de cuotas"]',
      '[aria-label="Apertura vs actual"]',
      '[aria-label="Validacion cruzada"]',
      '[aria-label="Senales externas"]',
    ],
    alerts: [
      '[aria-label="Centro de alertas"]',
      '[aria-label="Resumen de filtro EV"]',
      '[aria-label="Alertas de cuotas"]',
      '[aria-label="Salud del feed"]',
      '[aria-label="Calendario diario"]',
    ],
    ops: [
      '[aria-label="Abrir bot"]',
      '[aria-label="Plan de apuesta"]',
      '[aria-label="Historial del modo auto"]',
      '[aria-label="Resumen para Telegram"]',
      '[aria-label="Snapshot de estadisticas"]',
      '[aria-label="Historial de envios telegram"]',
      '[aria-label="Watchlist y rendimiento"]',
    ],
    backend: [
      '[aria-label="Actividad backend"]',
    ],
    audit: [
      '[aria-label="Auditoria del bot"]',
    ],
    history: [
      '[aria-label="Historial del bot"]',
    ],
    media: [
      '[aria-label="Generador de imagen para redes"]',
    ],
  };
}

function initDashboardViews() {
  const registry = dashboardViewRegistry();
  Object.entries(registry).forEach(([view, selectors]) => {
    selectors.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.dataset.dashboardView = view;
      }
    });
  });
}

function setDashboardView(view) {
  currentDashboardView = view;
  document.querySelectorAll("[data-dashboard-view]").forEach((section) => {
    section.hidden = section.dataset.dashboardView !== view;
  });
  els.dashboardTabs?.forEach((button) => {
    button.classList.toggle("active", button.dataset.dashboardViewBtn === view);
  });
}

function log(message) {
  const line = document.createElement("p");
  line.textContent = message;
  els.log.prepend(line);
}

function setLoading(isLoading) {
  els.load.disabled = isLoading;
  els.load.innerHTML = isLoading ? "<span>...</span> Analizando" : "<span aria-hidden=\"true\">↻</span> Generar tips";
}

function hashScore(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function ratingFor(team, sport) {
  const seed = hashScore(`${team}-${sport}`);
  const attack = 50 + (seed % 47);
  const defense = 48 + ((seed >> 3) % 43);
  const form = 45 + ((seed >> 6) % 51);
  return { attack, defense, form };
}

function blendRating(base, form) {
  if (!form) return base;
  return {
    attack: clamp(base.attack * 0.58 + form.attack * 0.42, 35, 105),
    defense: clamp(base.defense * 0.58 + form.defense * 0.42, 35, 105),
    form: clamp(base.form * 0.48 + form.form * 0.52, 30, 100),
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function toPercent(value) {
  return `${Math.round(value)}%`;
}

function money(value) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}u`;
}

function isoToday() {
  return new Date().toISOString().slice(0, 10);
}

function currentStakeValue() {
  return clamp(Number(els.stake.value) || 1, 0.1, 100000);
}

function currentBankrollValue() {
  return clamp(Number(els.bankroll.value) || 100, 1, 100000000);
}

function riskScale() {
  return clamp(0.3 + Number(els.risk.value || 5) * 0.08, 0.35, 1.1);
}

function stakeProfileScale() {
  const profile = els.stakeProfile.value;
  if (profile === "conservative") return 0.55;
  if (profile === "aggressive") return 1.35;
  return 1;
}

function recommendedStakeFromEdge(probability, odds) {
  const bankroll = currentBankrollValue();
  const decimalOdds = Math.max(Number(odds) || 0, 1.01);
  const ev = (probability * decimalOdds) - 1;
  if (ev <= 0) return 0;
  const b = Math.max(decimalOdds - 1, 0.01);
  const q = 1 - probability;
  const rawKelly = ((b * probability) - q) / b;
  const fractionalKelly = Math.max(rawKelly, 0) * 0.25 * riskScale() * stakeProfileScale();
  const minStake = bankroll * 0.005;
  const maxStake = bankroll * 0.03;
  const stake = bankroll * fractionalKelly;
  return Number(clamp(stake, minStake, maxStake).toFixed(2));
}

function recommendedStakeForTip(tip) {
  const bankroll = currentBankrollValue();
  const base = recommendedStakeFromEdge(tip.modelProbability || (tip.confidence / 100), tip.odds);
  const isProp = String(tip.marketKey || "").includes("player_prop") || String(tip.marketKey || "").startsWith("player_");
  const highRisk = String(tip.riskLabel || "") === "Alto";
  const maxCap = isProp ? bankroll * 0.015 : highRisk ? bankroll * 0.01 : bankroll * 0.03;
  return Number(clamp(base, bankroll * 0.005, maxCap).toFixed(2));
}

function recommendedStakeForParlay(parlay) {
  return recommendedStakeFromEdge(parlay.hitRate / 100, parlay.odds);
}

function valueTier(edge) {
  if (edge > 20) return "high";
  if (edge >= 10) return "medium";
  return "low";
}

function valueLabel(edge) {
  const tier = valueTier(edge);
  if (tier === "high") return "Valor alto";
  if (tier === "medium") return "Valor medio";
  return "Valor bajo";
}

function notificationState() {
  try {
    return JSON.parse(localStorage.getItem(notificationsStateKey)) || { enabled: false, sent: {} };
  } catch (error) {
    return { enabled: false, sent: {} };
  }
}

function saveNotificationState(state) {
  localStorage.setItem(notificationsStateKey, JSON.stringify(state));
}

function updateNotificationButton() {
  const state = notificationState();
  const active = state.enabled && "Notification" in window && Notification.permission === "granted";
  els.enableNotifications.textContent = active ? "Notificaciones activas" : "Activar notificaciones";
}

function loadWatchlist() {
  try {
    return JSON.parse(localStorage.getItem(watchlistKey)) || [];
  } catch (error) {
    return [];
  }
}

function saveWatchlist(items) {
  localStorage.setItem(watchlistKey, JSON.stringify(items.slice(0, 30)));
}

function loadTicket() {
  try {
    return JSON.parse(localStorage.getItem(ticketStorageKey)) || [];
  } catch (error) {
    return [];
  }
}

function saveTicket(items) {
  localStorage.setItem(ticketStorageKey, JSON.stringify(items.slice(0, 20)));
}

function loadTelegramAutoTopState() {
  try {
    return JSON.parse(localStorage.getItem(telegramAutoTopStateKey)) || { lastSentKey: "", enabled: true };
  } catch (error) {
    return { lastSentKey: "", enabled: true };
  }
}

function saveTelegramAutoTopState(state) {
  localStorage.setItem(telegramAutoTopStateKey, JSON.stringify(state));
}

function loadTopCache() {
  try {
    return JSON.parse(localStorage.getItem(topCacheStorageKey)) || {};
  } catch (error) {
    return {};
  }
}

function saveTopCache(cache) {
  localStorage.setItem(topCacheStorageKey, JSON.stringify(cache));
  postBackend("/api/storage/top-cache", { cache });
}

function loadStatsSnapshot() {
  try {
    return JSON.parse(localStorage.getItem(statsSnapshotKey)) || null;
  } catch (error) {
    return null;
  }
}

function saveStatsSnapshot(snapshot) {
  localStorage.setItem(statsSnapshotKey, JSON.stringify(snapshot));
  postBackend("/api/storage/stats-snapshot", { snapshot });
}

function loadTelegramSentHistory() {
  try {
    return JSON.parse(localStorage.getItem(telegramSentHistoryKey)) || [];
  } catch (error) {
    return [];
  }
}

function saveTelegramSentHistory(items) {
  localStorage.setItem(telegramSentHistoryKey, JSON.stringify(items.slice(0, 80)));
  postBackend("/api/storage/telegram-sent", { items: items.slice(0, 80) });
}

function pushTelegramSentEntry(entry) {
  const history = loadTelegramSentHistory();
  history.unshift({ ...entry, sentAt: new Date().toISOString() });
  saveTelegramSentHistory(history);
}

function loadBetModeHistory() {
  try {
    return JSON.parse(localStorage.getItem(betModeHistoryKey)) || [];
  } catch (error) {
    return [];
  }
}

function saveBetModeHistory(items) {
  localStorage.setItem(betModeHistoryKey, JSON.stringify(items.slice(0, 120)));
  postBackend("/api/storage/bet-mode-history", { items: items.slice(0, 120) });
}

function pushBetModeHistory(entry) {
  const history = loadBetModeHistory();
  const key = `${entry.date}|${entry.sport}|${entry.league}`;
  const index = history.findIndex((item) => `${item.date}|${item.sport}|${item.league}` === key);
  if (index >= 0) {
    history[index] = { ...history[index], ...entry };
  } else {
    history.unshift(entry);
  }
  saveBetModeHistory(history);
}

function loadPaperTrades() {
  try {
    return JSON.parse(localStorage.getItem(paperTradesKey)) || [];
  } catch (error) {
    return [];
  }
}

function savePaperTrades(items) {
  localStorage.setItem(paperTradesKey, JSON.stringify(items.slice(0, 1000)));
  postBackend("/api/storage/paper-trades", { items: items.slice(0, 1000) });
}

async function postBackend(path, payload) {
  try {
    await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // keep frontend resilient if backend sync fails
  }
}

async function bootstrapFromBackend() {
  try {
    const response = await fetch("/api/bootstrap");
    if (!response.ok) return;
    const data = await response.json();
    if (Array.isArray(data.history)) localStorage.setItem(historyStorageKey, JSON.stringify(data.history));
    if (data.statsSnapshot) localStorage.setItem(statsSnapshotKey, JSON.stringify(data.statsSnapshot));
    if (data.topCache) localStorage.setItem(topCacheStorageKey, JSON.stringify(data.topCache));
    if (Array.isArray(data.telegramSentHistory)) localStorage.setItem(telegramSentHistoryKey, JSON.stringify(data.telegramSentHistory));
    if (Array.isArray(data.betModeHistory)) localStorage.setItem(betModeHistoryKey, JSON.stringify(data.betModeHistory));
    if (Array.isArray(data.paperTrades)) localStorage.setItem(paperTradesKey, JSON.stringify(data.paperTrades));
    latestBackendStatus = data.backendStatus || latestBackendStatus;
  } catch (error) {
    // fallback silently
  }
}

async function bootstrapBackendTelemetry() {
  try {
    const [metricsResponse, logsResponse] = await Promise.all([
      fetch("/api/metrics"),
      fetch("/api/logs"),
    ]);
    if (metricsResponse.ok) {
      const metricsData = await metricsResponse.json();
      latestBackendMetrics = Array.isArray(metricsData.items) ? metricsData.items : [];
    }
    if (logsResponse.ok) {
      const logsData = await logsResponse.json();
      latestBackendLogs = Array.isArray(logsData.items) ? logsData.items : [];
    }
  } catch (error) {
    // fallback silently
  }
}

async function runBackendJob(path, label) {
  try {
    const response = await fetch(path, { method: "POST" });
    if (!response.ok) throw new Error(`${label} respondio ${response.status}`);
    const data = await response.json();
    await bootstrapFromBackend();
    await bootstrapBackendTelemetry();
    renderStatsSnapshot();
    renderTelegramSentHistory();
    renderHistory();
    renderBackendActivity();
    latestBackendStatus = data.status || latestBackendStatus;
    renderDailyOps(window.__lastRenderedTips || []);
    log(`${label} ejecutado correctamente.`);
    return data;
  } catch (error) {
    log(`No se pudo correr ${label}. Detalle: ${error.message}`);
    throw error;
  }
}

async function fetchBackendPicksPackage(sport, leagueId) {
  const response = await fetch(`/api/picks?sport=${encodeURIComponent(sport)}&leagueId=${encodeURIComponent(leagueId || "")}`);
  if (!response.ok) {
    throw new Error(`Backend picks respondio ${response.status}`);
  }
  return response.json();
}

function sportsApiProLeagueKey(sport, leagueId) {
  return oddsSportKeys[sport]?.[leagueId] || leagueId;
}

function normalizeSportsApiProFixture(fixture, sport) {
  return {
    home: fixture.home_team || "Local",
    away: fixture.away_team || "Visitante",
    date: String(fixture.event_date || fixture.commence_time_utc || "").slice(0, 10) || "Proximo",
    homeScore: Number.isFinite(Number(fixture.result?.home_score)) ? Number(fixture.result.home_score) : null,
    awayScore: Number.isFinite(Number(fixture.result?.away_score)) ? Number(fixture.result.away_score) : null,
    source: "sportsapipro",
    sport,
    status: fixture.status || "",
  };
}

function normalizeSportsApiProOddsEvent(fixture, sport) {
  const groupedBooks = {};
  (fixture.bookmakers || []).forEach((row) => {
    const book = row.bookmaker || "API Pro";
    const marketKey = row.market_type === "h2h" ? "h2h" : row.market_type === "spreads" ? "spreads" : row.market_type === "totals" ? "totals" : row.market_type;
    if (!groupedBooks[book]) groupedBooks[book] = {};
    if (!groupedBooks[book][marketKey]) groupedBooks[book][marketKey] = [];
    groupedBooks[book][marketKey].push({
      name: row.selection,
      price: Number(row.price),
      point: row.line_value ?? null,
    });
  });

  return {
    home_team: fixture.home_team || "Local",
    away_team: fixture.away_team || "Visitante",
    commence_time: fixture.event_date || fixture.commence_time_utc || "",
    bookmakers: Object.entries(groupedBooks).map(([title, markets]) => ({
      title,
      markets: Object.entries(markets).map(([key, outcomes]) => ({ key, outcomes })),
    })),
    source: "sportsapipro",
    sport,
  };
}

async function fetchSportsApiProFixtures(sport, leagueId) {
  const leagueKey = sportsApiProLeagueKey(sport, leagueId);
  const response = await fetch(`http://127.0.0.1:8000/v1/odds/${encodeURIComponent(sport)}/${encodeURIComponent(leagueKey)}`);
  if (!response.ok) throw new Error(`Sports API Pro respondio ${response.status}`);
  return response.json();
}

function isWatchlistMatch(tip) {
  const list = loadWatchlist();
  return list.some((team) => namesMatch(team, tip.game.home) || namesMatch(team, tip.game.away) || namesMatch(team, tip.targetTeam));
}

function renderWatchlist() {
  const list = loadWatchlist();
  if (!list.length) {
    els.watchlistItems.innerHTML = `<div class="empty">Todavia no agregas equipos favoritos.</div>`;
    return;
  }

  els.watchlistItems.innerHTML = list.map((team) => `
    <span class="watch-pill">
      ${team}
      <button type="button" class="ghost-btn" data-watch-remove="${team}">Quitar</button>
    </span>
  `).join("");
}

function oddsSnapshotId(tip) {
  return `${tip.game.sport}|${tip.game.date}|${tip.game.away}|${tip.game.home}|${tip.type}|${tip.pick}`;
}

function loadOddsSnapshot() {
  try {
    return JSON.parse(localStorage.getItem(oddsSnapshotKey)) || { capturedAt: null, items: {} };
  } catch (error) {
    return { capturedAt: null, items: {} };
  }
}

function saveOddsSnapshot(tips) {
  const items = {};
  tips.forEach((tip) => {
    items[oddsSnapshotId(tip)] = {
      odds: Number(tip.odds.toFixed(2)),
      ev: Number(tip.ev || 0),
      market: tip.market,
      pick: tip.pick,
      match: `${tip.game.away} @ ${tip.game.home}`,
    };
  });
  localStorage.setItem(oddsSnapshotKey, JSON.stringify({ capturedAt: new Date().toISOString(), items }));
}

function buildOddsAlerts(tips) {
  const snapshot = loadOddsSnapshot();
  const alerts = tips
    .map((tip) => {
      const previous = snapshot.items[oddsSnapshotId(tip)];
      if (!previous) return null;
      const delta = Number((tip.odds - previous.odds).toFixed(2));
      if (Math.abs(delta) < 0.08) return null;
      const prevEv = Number(previous.ev || 0);
      const evState = tip.ev >= 5 && prevEv < 5 ? "gained" : tip.ev < 5 && prevEv >= 5 ? "lost" : "";
      return {
        direction: delta > 0 ? "up" : "down",
        delta,
        current: tip.odds,
        previous: previous.odds,
        currentEv: Number(tip.ev || 0),
        previousEv: prevEv,
        evState,
        match: `${tip.game.away} @ ${tip.game.home}`,
        pick: `${tip.type}: ${tip.pick}`,
      };
    })
    .filter(Boolean)
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));

  return { alerts, capturedAt: snapshot.capturedAt };
}

function renderOddsAlerts(alertPackage) {
  const { alerts, capturedAt } = alertPackage;
  els.oddsAlertsCount.textContent = alerts.length;
  els.snapshotBadge.textContent = capturedAt ? `Snapshot ${capturedAt.slice(0, 16).replace("T", " ")}` : "Sin snapshot";

  if (!alerts.length) {
    els.oddsAlerts.innerHTML = `<div class="empty">No hay cambios fuertes de cuota frente al snapshot anterior.</div>`;
    return;
  }

  els.oddsAlerts.innerHTML = alerts.map((alert) => `
    <article class="alert-card ${alert.direction}">
      <div class="alert-top">
        <strong>${alert.pick}</strong>
        <span>${alert.delta > 0 ? "+" : ""}${alert.delta.toFixed(2)}</span>
      </div>
      <div class="alert-meta">
        <div>${alert.match}</div>
        <div>Antes ${alert.previous.toFixed(2)}x -> Ahora ${alert.current.toFixed(2)}x</div>
        <div>${alert.evState === "gained" ? "Ahora tiene EV+" : alert.evState === "lost" ? "Ya no tiene valor" : `EV ${alert.currentEv > 0 ? "+" : ""}${alert.currentEv}%`}</div>
      </div>
    </article>
  `).join("");
}

function renderBooksCompare(tips) {
  const items = tips.filter((tip) => tip.books && tip.books.length > 1).slice(0, 8);
  if (!items.length) {
    els.booksCompare.innerHTML = `<div class="empty">No hay comparacion de books disponible todavia para estos picks.</div>`;
    return;
  }

  els.booksCompare.innerHTML = items.map((tip) => `
    <article class="alert-card">
      <div class="alert-top">
        <strong>${tip.type}: ${tip.pick}</strong>
        <span>Best ${tip.bookmaker} ${tip.odds.toFixed(2)}x</span>
      </div>
      <div class="alert-meta">${tip.game.away} @ ${tip.game.home}</div>
      <div class="book-row">
        ${tip.books.slice(0, 5).map((book) => `<span class="pill">${book.bookmaker} ${book.point ?? ""} ${book.price.toFixed(2)}x</span>`).join("")}
      </div>
      ${tip.books.length >= 2 && (tip.books[0].price - tip.books[tip.books.length - 1].price) >= 0.18 ? `<div class="alert-meta">Gap grande entre casas: ${(tip.books[0].price - tip.books[tip.books.length - 1].price).toFixed(2)}x</div>` : ""}
    </article>
  `).join("");
}

function renderLineMovement(tips) {
  const snapshot = loadOddsSnapshot();
  const items = tips
    .map((tip) => {
      const previous = snapshot.items[oddsSnapshotId(tip)];
      if (!previous) return null;
      const delta = Number((tip.odds - previous.odds).toFixed(2));
      if (Math.abs(delta) < 0.05) return null;
      return {
        match: `${tip.game.away} @ ${tip.game.home}`,
        pick: `${tip.type}: ${tip.pick}`,
        open: previous.odds,
        current: tip.odds,
        delta,
      };
    })
    .filter(Boolean)
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
    .slice(0, 8);

  if (!items.length) {
    els.lineMovement.innerHTML = `<div class="empty">No hay line movement suficiente contra el snapshot anterior.</div>`;
    return;
  }

  els.lineMovement.innerHTML = items.map((item) => `
    <article class="alert-card ${item.delta > 0 ? "up" : "down"}">
      <div class="alert-top">
        <strong>${item.pick}</strong>
        <span>${item.delta > 0 ? "+" : ""}${item.delta.toFixed(2)}</span>
      </div>
      <div class="alert-meta">
        <div>${item.match}</div>
        <div>Apertura ${item.open.toFixed(2)}x · Actual ${item.current.toFixed(2)}x</div>
      </div>
    </article>
  `).join("");
}

function validateTip(tip, validationGames = [], context = {}) {
  const supportingGame = validationGames.find((game) =>
    namesMatch(game.home, tip.game.home) &&
    namesMatch(game.away, tip.game.away) &&
    (!game.date || game.date === tip.game.date)
  );

  const flags = [];
  let score = 0;

  if (supportingGame) {
    flags.push(`Partido validado por ${dataSourceLabels[context.validationSource] || context.validationSource}`);
    score += 2;
  } else {
    flags.push("Sin confirmacion de partido en fuente secundaria");
  }

  if (tip.oddsSource === "Real") {
    flags.push(`Cuota real disponible en ${tip.bookmaker}`);
    score += 2;
  } else {
    flags.push("Usando cuota estimada del bot");
  }

  if ((context.formBook?.[tip.game.home]?.games || 0) >= 3 && (context.formBook?.[tip.game.away]?.games || 0) >= 3) {
    flags.push("Muestra reciente suficiente para ambos equipos");
    score += 1;
  } else {
    flags.push("Base reciente limitada");
  }

  if (tip.edge >= 6) {
    flags.push("Edge fuerte");
    score += 1;
  }

  const level = score >= 4 ? "high" : score >= 2 ? "medium" : "low";
  return { ...tip, validationLevel: level, validationFlags: flags, validationScore: score };
}

function renderValidation(tips) {
  const items = [...tips]
    .sort((a, b) => b.validationScore - a.validationScore || b.confidence - a.confidence)
    .slice(0, 8);

  const counts = items.reduce((acc, tip) => {
    acc[tip.validationLevel] += 1;
    return acc;
  }, { high: 0, medium: 0, low: 0 });
  els.validationBadge.textContent = `${counts.high} alta · ${counts.medium} media · ${counts.low} baja`;

  if (!items.length) {
    els.validationList.innerHTML = `<div class="empty">Todavia no hay picks para validar.</div>`;
    return;
  }

  els.validationList.innerHTML = items.map((tip) => `
    <article class="alert-card validation-${tip.validationLevel}">
      <div class="alert-top">
        <strong>${tip.type}: ${tip.pick}</strong>
        <span>${tip.validationLevel === "high" ? "Alta" : tip.validationLevel === "medium" ? "Media" : "Baja"}</span>
      </div>
      <div class="alert-meta">
        <div>${tip.game.away} @ ${tip.game.home}</div>
        <div>${tip.validationFlags.join(" · ")}</div>
      </div>
    </article>
  `).join("");
}

function applyConsensusAdjustment(tip) {
  let delta = 0;

  if (tip.validationLevel === "high") delta += 4;
  if (tip.validationLevel === "medium") delta += 1.5;
  if (tip.validationLevel === "low") delta -= 3;
  if (tip.oddsSource === "Real") delta += 1;
  if ((tip.books || []).length >= 3) delta += 1;
  if (tip.edge >= 8) delta += 2;
  if (tip.edge <= 1) delta -= 1.5;
  if (isWatchlistMatch(tip)) delta += 1;
  if ((tip.externalSignalScore || 0) >= 4) delta += 2;
  if ((tip.externalSignalScore || 0) <= 0) delta -= 1.5;

  const consensusConfidence = clamp(tip.confidence + delta, 40, 82);
  const consensusTier = consensusConfidence >= 66 ? "high" : consensusConfidence >= 57 ? "medium" : "low";
  return {
    ...tip,
    consensusConfidence,
    consensusTier,
    consensusDelta: Number(delta.toFixed(1)),
  };
}

function externalSignalsForTip(tip, context = {}) {
  const homeGames = context.formBook?.[tip.game.home]?.games || 0;
  const awayGames = context.formBook?.[tip.game.away]?.games || 0;
  const signals = [];
  const homeRef = context.externalRef?.standings?.[normalizeName(tip.game.home)];
  const awayRef = context.externalRef?.standings?.[normalizeName(tip.game.away)];
  const homeInjuries = context.externalRef?.injuries?.[normalizeName(tip.game.home)] || 0;
  const awayInjuries = context.externalRef?.injuries?.[normalizeName(tip.game.away)] || 0;

  if (tip.validationLevel === "high") signals.push({ label: "Cruce alto entre fuentes", weight: 2 });
  if (tip.validationLevel === "medium") signals.push({ label: "Cruce medio entre fuentes", weight: 1 });
  if (tip.oddsSource === "Real") signals.push({ label: "Cuota real disponible", weight: 1 });
  if ((tip.books || []).length >= 3) signals.push({ label: "Multiples books comparados", weight: 1 });
  if (homeGames >= 3 && awayGames >= 3) signals.push({ label: "Muestra reciente suficiente", weight: 1 });
  if (tip.edge >= 6) signals.push({ label: "Edge fuerte", weight: 2 });
  if (isWatchlistMatch(tip)) signals.push({ label: "Equipo en watchlist", weight: 1 });
  if (tip.oddsSource !== "Real") signals.push({ label: "Sin cuota real confirmada", weight: -1 });
  if (homeGames < 2 || awayGames < 2) signals.push({ label: "Muestra reciente limitada", weight: -1 });
  if (tip.validationLevel === "low") signals.push({ label: "Cruce bajo entre fuentes", weight: -2 });

  if (homeRef && awayRef && tip.type === "Ganador") {
    const targetKey = normalizeName(tip.targetTeam);
    const targetRef = targetKey === normalizeName(tip.game.home) ? homeRef : awayRef;
    const otherRef = targetKey === normalizeName(tip.game.home) ? awayRef : homeRef;
    if (targetRef.position && otherRef.position) {
      const gap = otherRef.position - targetRef.position;
      if (gap >= 4) signals.push({ label: "Ventaja clara en tabla/seed", weight: 1.5 });
      if (gap <= -4) signals.push({ label: "Desventaja clara en tabla/seed", weight: -1.5 });
    }
  }

  if (tip.game.sport !== "soccer") {
    const injuryGap = awayInjuries - homeInjuries;
    if (Math.abs(injuryGap) >= 2) {
      if (tip.targetTeam && namesMatch(tip.targetTeam, tip.game.home) && injuryGap >= 2) signals.push({ label: "Rival con mas bajas", weight: 1 });
      if (tip.targetTeam && namesMatch(tip.targetTeam, tip.game.away) && injuryGap <= -2) signals.push({ label: "Rival con mas bajas", weight: 1 });
      if (tip.targetTeam && namesMatch(tip.targetTeam, tip.game.home) && injuryGap <= -2) signals.push({ label: "Tu lado tiene mas bajas", weight: -1 });
      if (tip.targetTeam && namesMatch(tip.targetTeam, tip.game.away) && injuryGap >= 2) signals.push({ label: "Tu lado tiene mas bajas", weight: -1 });
    }
  }

  const score = signals.reduce((sum, signal) => sum + signal.weight, 0);
  const level = score >= 4 ? "high" : score >= 1 ? "medium" : "low";
  return { ...tip, externalSignals: signals, externalSignalScore: score, externalSignalLevel: level };
}

function renderExternalSignals(tips) {
  const items = [...tips]
    .sort((a, b) => b.externalSignalScore - a.externalSignalScore || b.consensusConfidence - a.consensusConfidence)
    .slice(0, 8);

  const counts = items.reduce((acc, item) => {
    acc[item.externalSignalLevel] += 1;
    return acc;
  }, { high: 0, medium: 0, low: 0 });
  els.externalBadge.textContent = `${counts.high} altas · ${counts.medium} medias · ${counts.low} bajas`;

  if (!items.length) {
    els.externalSignalsList.innerHTML = `<div class="empty">Todavia no hay senales externas.</div>`;
    return;
  }

  els.externalSignalsList.innerHTML = items.map((tip) => `
    <article class="alert-card validation-${tip.externalSignalLevel}">
      <div class="alert-top">
        <strong>${tip.type}: ${tip.pick}</strong>
        <span>${tip.externalSignalScore > 0 ? "+" : ""}${tip.externalSignalScore}</span>
      </div>
      <div class="alert-meta">
        <div>${tip.game.away} @ ${tip.game.home}</div>
        <div>${tip.externalSignals.map((signal) => signal.label).join(" · ")}</div>
      </div>
    </article>
  `).join("");
}

function renderConsensus(tips) {
  const items = [...tips]
    .map(applyConsensusAdjustment)
    .sort((a, b) => b.consensusConfidence - a.consensusConfidence || b.ev - a.ev)
    .slice(0, 8);

  if (!items.length) {
    els.consensusList.innerHTML = `<div class="empty">Todavia no hay picks para consenso final.</div>`;
    return;
  }

  els.consensusList.innerHTML = items.map((tip) => `
    <article class="alert-card validation-${tip.consensusTier}">
      <div class="alert-top">
        <strong>${tip.type}: ${tip.pick}</strong>
        <span>${toPercent(tip.consensusConfidence)}</span>
      </div>
      <div class="alert-meta">
        <div>${tip.game.away} @ ${tip.game.home}</div>
        <div>Base ${toPercent(tip.confidence)} · Ajuste ${tip.consensusDelta > 0 ? "+" : ""}${tip.consensusDelta} · EV ${tip.ev > 0 ? "+" : ""}${tip.ev}%</div>
      </div>
    </article>
  `).join("");
}

function buildTelegramSlipText() {
  const items = loadTicket();
  if (!items.length) return "";
  const totalStake = items.reduce((sum, item) => sum + item.stake, 0);
  const combinedOdds = items.reduce((product, item) => product * item.odds, 1);
  const totalEv = items.reduce((sum, item) => sum + item.ev, 0);
  return [
    "SLIP BOT DE PRONOSTICOS",
    ...items.map((item, index) => `${index + 1}. ${item.label} | ${item.match} | ${item.bestBook} | ${item.odds.toFixed(2)}x | Stake ${money(item.stake)} | EV ${item.ev > 0 ? "+" : ""}${item.ev}%`),
    `Total stake: ${money(totalStake)}`,
    `Cuota combinada: ${combinedOdds.toFixed(2)}x`,
    `EV total: ${totalEv > 0 ? "+" : ""}${totalEv.toFixed(1)}%`,
  ].join("\n");
}

function buildTelegramTopText() {
  const combined = combinedCachedTopTips();
  const liveTips = rankRealTopTips(window.__lastRenderedTips || []).slice(0, 5).map((tip) => ({
    id: tipId(tip),
    sport: tip.game.sport,
    leagueName: tip.leagueName || sportProfiles[tip.game.sport].apiName,
    type: tip.type,
    pick: tip.pick,
    match: `${tip.game.away} @ ${tip.game.home}`,
    eventDate: tip.game.date,
    odds: Number(tip.odds.toFixed(2)),
    bookmaker: tip.bookmaker,
    consensusConfidence: tip.consensusConfidence,
    ev: tip.ev,
  }));
  const tips = [...liveTips, ...combined]
    .filter((tip, index, array) => array.findIndex((item) => item.id === tip.id) === index)
    .sort((a, b) => b.consensusConfidence - a.consensusConfidence || b.ev - a.ev)
    .slice(0, 8);
  if (!tips.length) return "";
  return [
    "TOP PICKS REALES BOT DE PRONOSTICOS",
    ...tips.map((tip, index) => `${index + 1}. ${tip.type}: ${tip.pick} | ${tip.match} | ${tip.leagueName} | ${tip.bookmaker} ${Number(tip.odds).toFixed(2)}x | Consenso ${toPercent(tip.consensusConfidence)} | EV ${tip.ev > 0 ? "+" : ""}${tip.ev}%`),
  ].join("\n");
}

function buildTelegramDigestText() {
  const grouped = {};
  combinedCachedTopTips().forEach((tip) => {
    if (!grouped[tip.sport]) grouped[tip.sport] = [];
    if (grouped[tip.sport].length < 2) grouped[tip.sport].push(tip);
  });

  const orderedSports = ["soccer", "mlb", "nba", "nfl"];
  const lines = orderedSports.flatMap((sport) => {
    const items = grouped[sport] || [];
    return items.map((tip, index) => `${sportProfiles[sport]?.apiName || sport} ${index + 1}: ${tip.type} ${tip.pick} | ${tip.match} | ${tip.leagueName} | ${tip.bookmaker} ${Number(tip.odds).toFixed(2)}x | Consenso ${toPercent(tip.consensusConfidence)} | EV ${tip.ev > 0 ? "+" : ""}${tip.ev}%`);
  });

  if (!lines.length) return "";
  return ["DIGEST MULTIDEPORTE BOT DE PRONOSTICOS", ...lines].join("\n");
}

function buildTelegramSlateTopText() {
  const targetDate = currentCalendarDate || isoToday();
  const ranked = rankRealTopTips((window.__lastRenderedTips || []).filter((tip) => tip.game?.date === targetDate)).slice(0, 5);
  if (!ranked.length) return "";
  return [
    `TOP DEL SLATE ${targetDate}`,
    ...ranked.map((tip, index) => `${index + 1}. ${tip.type}: ${tip.pick} | ${tip.game.away} @ ${tip.game.home} | ${tip.leagueName || sportProfiles[tip.game.sport].apiName} | ${tip.bookmaker} ${Number(tip.odds).toFixed(2)}x | Consenso ${toPercent(tip.consensusConfidence || tip.confidence)} | EV ${tip.ev > 0 ? "+" : ""}${tip.ev}%`),
  ].join("\n");
}

async function sendTelegramMessage(text) {
  const response = await fetch("/api/telegram/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      summary: "Envio desde frontend",
    }),
  });
  if (!response.ok) throw new Error(`Telegram respondio ${response.status}`);
  return response.json();
}

function renderTopPicks(tips) {
  const filtered = currentTopFilter === "all"
    ? tips
    : currentTopFilter === "uefa"
      ? tips.filter((tip) => isUefaCompetition(tip.leagueId, tip.leagueName))
      : tips.filter((tip) => tip.game.sport === currentTopFilter);
  const top = [...filtered]
    .sort((a, b) => {
      const aScore = a.edge + a.confidence * 0.12 + (isWatchlistMatch(a) ? 4.5 : 0);
      const bScore = b.edge + b.confidence * 0.12 + (isWatchlistMatch(b) ? 4.5 : 0);
      return bScore - aScore;
    })
    .slice(0, 6);

  if (!top.length) {
    els.topPicks.innerHTML = `<div class="empty">No hay picks suficientes para rankear.</div>`;
    return;
  }

  els.topPicks.innerHTML = top.map((tip, index) => {
    const tier = valueTier(tip.edge);
    const suggestedStake = tip.recommendedStake ?? recommendedStakeForTip(tip);
    const reality = pickRealityMeta(tip);
    const competition = competitionClassMeta(tip);
    const mlbSplitBadge = mlbSplitBadgeMeta(tip.game);
    const grade = recommendationGradeMeta(tip);
    const id = tipId(tip);
    currentTrackingItems[id] = { kind: "tip", payload: tip };
    return `
      <article class="top-pick-card">
        <div class="section-head">
          <span class="top-rank">${index + 1}</span>
          <div class="pill-row">
            <span class="grade-pill ${grade.key}">${grade.grade}</span>
            <span class="value-chip ${tier}">${valueLabel(tip.edge)}</span>
          </div>
        </div>
        <p class="match">${tip.game.away} @ ${tip.game.home}</p>
        <p class="pick"><strong>${tip.type}:</strong> ${tip.pick}</p>
        <div class="pill-row">
          <span class="pill pick-reality ${reality.key}">${reality.label}</span>
          <span class="pill competition-tag ${competition.key}">${competition.label}</span>
          <span class="pill">${tip.odds.toFixed(2)}x</span>
          <span class="pill">Modelo ${toPercent((tip.modelProbability || 0) * 100)}</span>
          <span class="pill">EV ${tip.ev > 0 ? "+" : ""}${tip.ev}%</span>
          <span class="pill trust-pill ${trustTierForTip(tip)}">${grade.label} · ${trustLabelForTip(tip)} · ${trustScoreForTip(tip)}</span>
          <span class="pill">Stake ${money(suggestedStake)}</span>
          <span class="pill">${tip.riskLabel || "Medio"}</span>
          ${mlbSplitBadge ? `<span class="pill mlb-signal ${mlbSplitBadge.key}">${mlbSplitBadge.label}</span>` : ""}
          ${isWatchlistMatch(tip) ? '<span class="pill">Watchlist</span>' : ""}
        </div>
        <p class="alert-meta">${reality.detail} · ${tip.reason}</p>
        <div class="share-actions">
          <button class="ghost-btn" type="button" data-share-tip="${id}">Imagen</button>
        </div>
      </article>
    `;
  }).join("");
}

function ensureSafePicks(tips, fallbackTips = []) {
  if (els.realOnly?.checked) {
    return [...tips]
      .filter((tip) => isRealTip(tip))
      .sort((a, b) => b.confidence - a.confidence || b.ev - a.ev);
  }

  const preferred = [...tips].sort((a, b) => b.confidence - a.confidence || b.ev - a.ev);
  const safe = preferred.filter((tip) => tip.confidence >= 58).slice(0, 3);
  if (safe.length >= 3) return preferred;

  const backup = [...fallbackTips]
    .filter((tip) => !safe.some((item) => tipId(item) === tipId(tip)))
    .sort((a, b) => b.confidence - a.confidence || b.ev - a.ev)
    .slice(0, 3 - safe.length);

  return [...safe, ...backup, ...preferred.filter((tip) => !safe.some((item) => tipId(item) === tipId(tip)) && !backup.some((item) => tipId(item) === tipId(tip)))];
}

function renderRealTopPicks(tips) {
  const ranked = rankRealTopTips(tips).slice(0, 5);

  if (!ranked.length) {
    els.realTopPicks.innerHTML = `<div class="empty">Todavia no hay picks suficientes para el top real.</div>`;
    return;
  }

  els.realTopPicks.innerHTML = ranked.map((tip, index) => `
    <article class="top-pick-card">
      <div class="section-head">
        <span class="top-rank">${index + 1}</span>
        <div class="pill-row">
          <span class="grade-pill ${recommendationGradeMeta(tip).key}">${recommendationGradeMeta(tip).grade}</span>
          <span class="value-chip ${tip.consensusTier}">${tip.oddsSource === "Real" ? "Odds reales" : "Modelo"}</span>
        </div>
      </div>
      <p class="match">${tip.game.away} @ ${tip.game.home}</p>
      <p class="pick"><strong>${tip.type}:</strong> ${tip.pick}</p>
      <div class="pill-row">
        <span class="pill pick-reality ${pickRealityMeta(tip).key}">${pickRealityMeta(tip).label}</span>
        <span class="pill competition-tag ${competitionClassMeta(tip).key}">${competitionClassMeta(tip).label}</span>
        <span class="pill">${tip.leagueName || sportProfiles[tip.game.sport].apiName}</span>
        <span class="pill">${tip.bookmaker} ${tip.odds.toFixed(2)}x</span>
        <span class="pill">Modelo ${toPercent((tip.modelProbability || 0) * 100)}</span>
        <span class="pill">EV ${tip.ev > 0 ? "+" : ""}${tip.ev}%</span>
        <span class="pill trust-pill ${trustTierForTip(tip)}">${recommendationGradeMeta(tip).label} · ${trustLabelForTip(tip)} · ${trustScoreForTip(tip)}</span>
        <span class="pill">Stake ${money(tip.recommendedStake ?? recommendedStakeForTip(tip))}</span>
        <span class="pill">Riesgo ${tip.riskLabel || "Medio"}</span>
        ${mlbSplitBadgeMeta(tip.game) ? `<span class="pill mlb-signal ${mlbSplitBadgeMeta(tip.game).key}">${mlbSplitBadgeMeta(tip.game).label}</span>` : ""}
      </div>
      <p class="alert-meta">Base ${toPercent(tip.confidence)} · Ajuste ${tip.consensusDelta > 0 ? "+" : ""}${tip.consensusDelta} · ${tip.reason}</p>
    </article>
  `).join("");
}

function formatBackendStamp(value) {
  if (!value) return "Sin dato";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString("es-MX");
}

function nextBackendRunLabel(status = latestBackendStatus) {
  const base = status?.lastBackendPicksAt || status?.updatedAt;
  if (!base) return "Sin dato";
  const date = new Date(base);
  if (Number.isNaN(date.getTime())) return "Sin dato";
  date.setHours(date.getHours() + 6);
  return date.toLocaleString("es-MX");
}

function backendLogTone(kind = "") {
  const normalized = String(kind || "").toLowerCase();
  if (normalized === "warn" || normalized === "error") return "warn";
  return "ok";
}

function summarizeBackendValue(metrics = []) {
  const summary = {
    runs: 0,
    valueHits: 0,
    warnings: latestBackendLogs.filter((entry) => ["warn", "error"].includes(String(entry.kind || "").toLowerCase())).length,
    items: [],
  };
  const byAction = {};
  metrics.forEach((entry) => {
    const action = String(entry.action || "");
    if (!action) return;
    if (!byAction[action]) byAction[action] = { action, count: 0, impact: 0, lastAt: entry.at || null };
    byAction[action].count += 1;
    if (!byAction[action].lastAt || String(entry.at || "") > byAction[action].lastAt) byAction[action].lastAt = entry.at;

    if (action === "job_grade_runs") byAction[action].impact += Number(entry.meta?.changed || 0);
    if (action === "telegram_sent") byAction[action].impact += 1;
    if (action === "job_picks_runs") byAction[action].impact += Number(entry.meta?.buckets || 0);
    if (action === "pyespn_props_runs") byAction[action].impact += Number(entry.meta?.resolved || 0);
    if (action === "storage_history_sync") byAction[action].impact += Math.min(Number(entry.value || 0), 25);
    summary.runs += action.startsWith("job_") ? 1 : 0;
  });
  summary.items = Object.values(byAction)
    .sort((a, b) => b.impact - a.impact || String(b.lastAt || "").localeCompare(String(a.lastAt || "")))
    .slice(0, 8);
  summary.valueHits = summary.items.reduce((sum, item) => sum + (Number(item.impact) || 0), 0);
  return summary;
}

function backendActionLabel(action = "") {
  const map = {
    job_digest_runs: "Digest",
    job_picks_runs: "Picks backend",
    job_grade_runs: "Autoevaluacion",
    telegram_sent: "Telegram",
    pyespn_props_runs: "PyESPN props",
    storage_history_sync: "Sync historial",
    storage_paper_sync: "Sync paper",
  };
  return map[action] || action;
}

function renderBackendActivity() {
  const metrics = latestBackendMetrics || [];
  const logs = latestBackendLogs || [];
  const summary = summarizeBackendValue(metrics);

  els.backendActivityBadge.textContent = metrics.length || logs.length
    ? `${summary.items.length} focos activos`
    : "Sin actividad";
  els.backendLastRun.textContent = formatBackendStamp(latestBackendStatus?.lastMetricAt || latestBackendStatus?.lastLogAt || latestBackendStatus?.updatedAt);
  els.backendJobRuns.textContent = summary.runs;
  els.backendValueHits.textContent = summary.valueHits;
  els.backendWarnings.textContent = summary.warnings;

  if (!metrics.length) {
    els.backendMetricsPanel.innerHTML = `<div class="empty">Todavia no hay metricas backend para mostrar.</div>`;
    els.backendValuePanel.innerHTML = `<div class="empty">Todavia no hay suficiente actividad para auditar aportes.</div>`;
  } else {
    const grouped = {};
    metrics.forEach((entry) => {
      const key = entry.action || "unknown";
      if (!grouped[key]) grouped[key] = { action: key, count: 0, total: 0, lastAt: null };
      grouped[key].count += 1;
      grouped[key].total += Number(entry.value) || 0;
      if (!grouped[key].lastAt || String(entry.at || "") > grouped[key].lastAt) grouped[key].lastAt = entry.at;
    });
    els.backendMetricsPanel.innerHTML = Object.values(grouped)
      .sort((a, b) => String(b.lastAt || "").localeCompare(String(a.lastAt || "")))
      .slice(0, 10)
      .map((item) => `
        <div class="alert-item">
          <strong>${backendActionLabel(item.action)}</strong>
          <span>${item.count} evento(s)</span>
          <div>Total ${item.total} · Ultimo ${formatBackendStamp(item.lastAt)}</div>
        </div>
      `).join("");

    els.backendValuePanel.innerHTML = summary.items.length
      ? summary.items.map((item) => `
        <div class="alert-item">
          <strong>${backendActionLabel(item.action)}</strong>
          <span>Impacto ${item.impact}</span>
          <div>${item.count} corrida(s) · Ultimo ${formatBackendStamp(item.lastAt)}</div>
        </div>
      `).join("")
      : `<div class="empty">Todavia no hay impacto medible en jobs backend.</div>`;
  }

  els.backendLogsPanel.innerHTML = logs.length
    ? logs.slice(0, 18).map((entry) => `
      <div class="alert-item ${backendLogTone(entry.kind)}">
        <strong>${entry.action || "backend"}</strong>
        <span>${formatBackendStamp(entry.at)}</span>
        <div>${entry.detail || "Sin detalle"}</div>
      </div>
    `).join("")
    : `<div class="empty">Todavia no hay logs backend recientes.</div>`;
}

function renderDailyOps(tips = []) {
  const targetDate = currentCalendarDate || isoToday();
  const slateTips = (tips || []).filter((tip) => tip.game?.date === targetDate);
  const realSlateTips = slateTips.filter((tip) => isRealTip(tip));
  const combined = combinedCachedTopTips().filter((tip) => !tip.eventDate || tip.eventDate === targetDate);
  const topBySport = {};

  [...rankRealTopTips(slateTips), ...combined]
    .forEach((tip) => {
      const sport = tip.game?.sport || tip.sport;
      if (!sport || topBySport[sport]) return;
      topBySport[sport] = tip;
    });

  const activeSports = Object.keys(topBySport);
  const digestReady = activeSports.length >= 2;

  els.dailySlateDate.textContent = targetDate;
  els.dailySlateTips.textContent = String(slateTips.length);
  els.dailyRealSlateTips.textContent = String(realSlateTips.length);
  els.dailySportsActive.textContent = String(activeSports.length);
  els.dailyNextRun.textContent = nextBackendRunLabel();

  const backend = latestBackendStatus || {};
  const opsCards = [
    `
      <article class="alert-card">
        <div class="alert-top">
          <strong>Estado del dia</strong>
          <span>${digestReady ? "Digest listo" : "Digest flojo"}</span>
        </div>
        <div class="alert-meta">
          <div>Slate ${targetDate} · ${slateTips.length} pick(s) · ${realSlateTips.length} real(es).</div>
          <div>${digestReady ? "Ya hay material para digest multideporte." : "Todavia falta profundidad para digest fuerte."}</div>
        </div>
      </article>
    `,
    `
      <article class="alert-card">
        <div class="alert-top">
          <strong>Backend</strong>
          <span>${backend.ok ? "OK" : "Base"}</span>
        </div>
        <div class="alert-meta">
          <div>Picks backend: ${formatBackendStamp(backend.lastBackendPicksAt)} · Stats: ${formatBackendStamp(backend.lastStatsSnapshotAt)}</div>
          <div>Telegram: ${backend.hasTelegram ? "configurado" : "sin configurar"} · Ultimo envio: ${formatBackendStamp(backend.lastTelegramSentAt)}</div>
          <div>Proxima corrida estimada: ${nextBackendRunLabel(backend)}</div>
        </div>
      </article>
    `,
    `
      <article class="alert-card">
        <div class="alert-top">
          <strong>Proxima accion</strong>
          <span>Runbook</span>
        </div>
        <div class="alert-meta">
          <div>1. Revisa top real del slate.</div>
          <div>2. Si hay 2+ deportes activos, manda digest. 3. Si el real slate es corto, baja volumen o espera nueva corrida.</div>
        </div>
      </article>
    `,
  ];

  els.dailyOpsPanel.innerHTML = opsCards.join("");

  if (!activeSports.length) {
    els.dailySportOpsList.innerHTML = `<div class="empty">Todavia no hay tops diarios suficientes por deporte.</div>`;
    return;
  }

  els.dailySportOpsList.innerHTML = activeSports.map((sport) => {
    const tip = topBySport[sport];
    const match = tip.match || `${tip.game?.away} @ ${tip.game?.home}`;
    const league = tip.leagueName || sportProfiles[sport]?.apiName || sport;
    const consensus = tip.consensusConfidence ?? tip.confidence ?? 0;
    const odds = Number(tip.odds || 0).toFixed(2);
    const book = tip.bookmaker || "Bot";
    return `
      <article class="alert-card">
        <div class="alert-top">
          <strong>${sportProfiles[sport]?.apiName || sport}</strong>
          <span>${toPercent(consensus)}</span>
        </div>
        <div class="alert-meta">
          <div>${tip.type}: ${tip.pick}</div>
          <div>${match} · ${league}</div>
          <div>${book} ${odds}x · EV ${tip.ev > 0 ? "+" : ""}${tip.ev}%</div>
        </div>
      </article>
    `;
  }).join("");
}

function renderExecutiveDashboard(tips = []) {
  const ranked = rankRealTopTips(tips);
  const top = ranked[0] || tips[0] || null;
  const shortlist = ranked.slice(0, 3);
  const targetDate = currentCalendarDate || isoToday();
  const slateTips = tips.filter((tip) => tip.game?.date === targetDate);
  const realSlateTips = slateTips.filter((tip) => isRealTip(tip));
  const bankroll = currentBankrollValue();
  const snapshot = loadStatsSnapshot() || {};
  const noBet = String(els.betMode.value) === "auto" && String(els.betMode.dataset?.noBet || "") === "1";
  const confidencePackage = effectiveMinConfidence(tips);

  if (!top) {
    els.executiveHeroCard.innerHTML = `<div class="empty">Todavia no hay un pick premium para destacar.</div>`;
    els.executiveTopPick.innerHTML = `<div class="empty">Todavia no hay un pick fuerte para destacar.</div>`;
    els.executiveHeroHighlights.innerHTML = "";
  } else {
    const competition = competitionClassMeta(top);
    const grade = recommendationGradeMeta(top);
    const heroMlbSplit = mlbSplitBadgeMeta(top.game);
    els.executiveHeroCard.innerHTML = `
      <article class="executive-hero">
        <div class="executive-hero-top">
          <span class="executive-hero-label">Mejor oportunidad del slate</span>
          <div class="executive-hero-badges">
            <span class="grade-pill ${grade.key}">${grade.grade}</span>
            <span class="trust-pill ${trustTierForTip(top)}">${trustLabelForTip(top)}</span>
          </div>
        </div>
        <div class="executive-hero-body">
          <div>
            <p class="match executive-hero-match">${top.game.away} @ ${top.game.home}</p>
            <p class="executive-hero-pick"><strong>${top.type}:</strong> ${top.pick}</p>
            <p class="alert-meta">${top.leagueName || sportProfiles[top.game.sport]?.apiName || top.game.sport} · ${competition.label} · ${pickRealityMeta(top).detail}</p>
          </div>
          <div class="executive-hero-stats">
            <div class="share-stat"><strong>Cuota</strong><span>${top.bookmaker || "Bot"} ${Number(top.odds || 0).toFixed(2)}x</span></div>
            <div class="share-stat"><strong>Modelo</strong><span>${toPercent((top.modelProbability || 0) * 100)}</span></div>
            <div class="share-stat"><strong>EV</strong><span>${top.ev > 0 ? "+" : ""}${top.ev}%</span></div>
            <div class="share-stat"><strong>Stake</strong><span>${money(top.recommendedStake ?? recommendedStakeForTip(top))}</span></div>
          </div>
        </div>
      </article>
    `;
    els.executiveTopPick.innerHTML = `
      <article class="alert-card">
        <div class="alert-top">
          <strong>${top.type}: ${top.pick}</strong>
          <span class="grade-pill ${grade.key}">${grade.grade}</span>
        </div>
      <div class="alert-meta">
        <div>${top.game.away} @ ${top.game.home}</div>
        <div>${top.leagueName || sportProfiles[top.game.sport]?.apiName || top.game.sport} · ${competition.label}</div>
        <div>Modelo ${toPercent((top.modelProbability || 0) * 100)} · EV ${top.ev > 0 ? "+" : ""}${top.ev}% · Stake ${money(top.recommendedStake ?? recommendedStakeForTip(top))}</div>
        <div>${grade.label} · ${trustLabelForTip(top)} · score ${trustScoreForTip(top)}</div>
      </div>
    </article>
  `;
    els.executiveHeroHighlights.innerHTML = `
      <div class="executive-highlight-strip">
        <span class="pill ${grade.key}">${grade.label}</span>
        <span class="pill trust-pill ${trustTierForTip(top)}">${trustLabelForTip(top)}</span>
        <span class="pill">EV ${top.ev > 0 ? "+" : ""}${top.ev}%</span>
        <span class="pill">Modelo ${toPercent((top.modelProbability || 0) * 100)}</span>
        <span class="pill">${top.bookmaker} ${Number(top.odds || 0).toFixed(2)}x</span>
        ${heroMlbSplit ? `<span class="pill mlb-signal ${heroMlbSplit.key}">${heroMlbSplit.label}</span>` : ""}
      </div>
    `;
    els.executiveHeroCard.innerHTML = els.executiveHeroCard.innerHTML
      .replace(pickRealityMeta(top).detail, pickRealityMeta(top).label)
      .replaceAll(" Â· ", " | ");
    els.executiveTopPick.innerHTML = els.executiveTopPick.innerHTML.replaceAll(" Â· ", " | ");
  }

  els.executiveSlateState.innerHTML = `
    <article class="alert-card">
      <div class="alert-top">
        <strong>${noBet ? "No apostar hoy" : "Slate activo"}</strong>
        <span>${targetDate}</span>
      </div>
      <div class="alert-meta">
        <div>${slateTips.length} pick(s) del slate · ${realSlateTips.length} reales.</div>
        <div>${els.evStrongOnly?.checked ? "Filtro EV fuerte activo." : "Filtro EV normal activo."}</div>
        <div>Confianza ${confidencePackage.automatic ? "automatica" : "manual"} · corte ${confidencePackage.threshold}%.</div>
        <div>${Number(els.evRejectedCount?.textContent || 0)} pick(s) rechazados por filtro.</div>
      </div>
    </article>
  `;
  els.executiveSlateState.innerHTML = els.executiveSlateState.innerHTML
    .replace(`${slateTips.length} pick(s) del slate Â· ${realSlateTips.length} reales.`, `${slateTips.length} pick(s) | ${realSlateTips.length} reales | ${Number(els.evValidCount?.textContent || 0)} validos por EV.`)
    .replace(els.evStrongOnly?.checked ? "Filtro EV fuerte activo." : "Filtro EV normal activo.", els.evStrongOnly?.checked ? "Filtro EV fuerte" : "Filtro EV normal")
    .replace(`Confianza ${confidencePackage.automatic ? "automatica" : "manual"} Â· corte ${confidencePackage.threshold}%.`, `Confianza ${confidencePackage.automatic ? "auto" : "manual"} ${confidencePackage.threshold}%.`)
    .replace(`${Number(els.evRejectedCount?.textContent || 0)} pick(s) rechazados por filtro.`, `${Number(els.evRejectedCount?.textContent || 0)} pick(s) fuera por filtro.`);

  els.executiveBankrollState.innerHTML = `
    <article class="alert-card">
      <div class="alert-top">
        <strong>Banca actual</strong>
        <span>${money(bankroll)}</span>
      </div>
      <div class="alert-meta">
        <div>ROI ${Number(snapshot.roi || 0).toFixed(1)}% · Win rate ${Number(snapshot.winRate || 0).toFixed(1)}%</div>
        <div>Profit ${money(Number(snapshot.profit || 0))} · Drawdown ${els.drawdownValue?.textContent || "0%"}</div>
      </div>
    </article>
  `;

  if (!shortlist.length) {
    els.executivePulse.innerHTML = "";
    return;
  }

  els.executivePulse.innerHTML = shortlist.map((tip, index) => `
    <article class="executive-pulse-card">
      <div class="alert-top">
        <strong>${index + 1}. ${tip.pick}</strong>
        <span class="grade-pill ${recommendationGradeMeta(tip).key}">${recommendationGradeMeta(tip).grade}</span>
      </div>
      <div class="alert-meta">
        <div>${tip.game.away} @ ${tip.game.home}</div>
        <div>${tip.type} · ${trustLabelForTip(tip)} · EV ${tip.ev > 0 ? "+" : ""}${tip.ev}% · Stake ${money(tip.recommendedStake ?? recommendedStakeForTip(tip))}</div>
      </div>
    </article>
  `).join("");
}

function renderAutoConfidencePanel(tips = []) {
  const packageInfo = effectiveMinConfidence(tips);
  const modeInfo = effectiveBetMode(tips);
  const ranked = [...tips]
    .sort((a, b) => trustScoreForTip(b) - trustScoreForTip(a) || b.ev - a.ev || b.confidence - a.confidence)
    .slice(0, 3);

  if (!ranked.length) {
    els.autoConfidencePanelBadge.textContent = packageInfo.label || "Esperando slate";
    els.autoConfidencePanel.innerHTML = `
      <article class="alert-card">
        <div class="alert-top">
          <strong>Sin jugadas para recomendar</strong>
          <span>${packageInfo.threshold}%</span>
        </div>
        <div class="alert-meta">
          <div>${packageInfo.detail}</div>
          <div>En cuanto entren picks con EV y confianza suficiente, aqui te voy a resumir las mejores.</div>
        </div>
      </article>
    `;
    return;
  }

  els.autoConfidencePanelBadge.textContent = modeInfo.noBet ? "No bet sugerido" : packageInfo.label || "Auto";
  els.autoConfidencePanel.innerHTML = [
    `
      <article class="alert-card">
        <div class="alert-top">
          <strong>${modeInfo.noBet ? "Hoy pisaria el freno" : "Recomendacion automatica"}</strong>
          <span>${packageInfo.threshold}%</span>
        </div>
        <div class="alert-meta">
          <div>${packageInfo.detail}</div>
          <div>${modeInfo.reasons?.[0] || "El motor ya esta priorizando valor, confianza y calidad del dato."}</div>
          <div>${modeInfo.noBet ? "El slate no da para abrir mucho la mano." : `Modo sugerido: ${betModeLabel(modeInfo.mode)}.`}</div>
        </div>
      </article>
    `,
    ...ranked.map((tip, index) => {
      const trustScore = trustScoreForTip(tip);
      const competition = competitionClassMeta(tip);
      const reality = pickRealityMeta(tip);
      const grade = recommendationGradeMeta(tip);
      return `
        <article class="alert-card">
          <div class="alert-top">
            <strong>${index + 1}. ${tip.type}: ${tip.pick}</strong>
            <span class="grade-pill ${grade.key}">${grade.grade}</span>
          </div>
          <div class="alert-meta">
            <div>${tip.game.away} @ ${tip.game.home} · ${tip.leagueName || sportProfiles[tip.game.sport]?.apiName || tip.game.sport}</div>
            <div>${reality.label} · ${competition.label} · ${tip.bookmaker} ${Number(tip.odds || 0).toFixed(2)}x</div>
            <div>${grade.label} · ${trustLabelForTip(tip)} · score ${trustScore}</div>
            <div>Modelo ${toPercent((tip.modelProbability || 0) * 100)} · EV ${tip.ev > 0 ? "+" : ""}${tip.ev}% · Stake ${money(tip.recommendedStake ?? recommendedStakeForTip(tip))}</div>
          </div>
        </article>
      `;
    }),
  ].join("");
}

function marketFamilyMeta(tip) {
  const key = String(tip?.marketKey || tip?.market || "").toLowerCase();
  if (key.startsWith("player_") || key.includes("player_prop")) return { key: "props", label: "Props" };
  if (key.includes("total")) return { key: "totals", label: "Totales" };
  if (key.includes("handicap") || key.includes("spread") || key.includes("runline")) return { key: "handicap", label: "Handicap" };
  return { key: "main", label: "1X2" };
}

function uniqueEventTips(tips = []) {
  const grouped = new Map();
  tips.forEach((tip) => {
    const id = tip.eventId || stableId(`${tip.game?.sport || ""}|${tip.game?.date || ""}|${tip.game?.away || ""}|${tip.game?.home || ""}`);
    if (!grouped.has(id)) grouped.set(id, []);
    grouped.get(id).push(tip);
  });
  return [...grouped.entries()].map(([eventId, items]) => ({ eventId, items }));
}

function eventMarketKeyFromGame(game = {}) {
  return stableId(`${game.sport || ""}|${game.date || ""}|${game.away || ""}|${game.home || ""}`);
}

function eventMarketKeyFromOddsEvent(event = {}, fallbackSport = "") {
  return stableId(`${fallbackSport || event.sport || ""}|${String(event.commence_time || "").slice(0, 10)}|${event.away_team || ""}|${event.home_team || ""}`);
}

function marketLabelFromKey(key) {
  const map = {
    h2h: "1X2 / Moneyline",
    totals: "Totales",
    spreads: "Handicap / Spread",
    player_points: "Puntos jugador",
    player_rebounds: "Rebotes jugador",
    player_assists: "Asistencias jugador",
    player_threes: "Triples jugador",
    player_pass_yds: "Passing yards",
    player_pass_tds: "Passing touchdowns",
    player_rush_yds: "Rushing yards",
    player_reception_yds: "Receiving yards",
    player_anytime_td: "Anytime TD",
  };
  return map[key] || String(key || "Mercado").replace(/_/g, " ");
}

function propsMarketsForSport(sport) {
  if (sport === "nba") return window.BOT_CONFIG?.oddsNbaPropsMarkets || "";
  if (sport === "nfl") return window.BOT_CONFIG?.oddsNflPropsMarkets || "";
  return "";
}

function propStatTypeFromMarketKey(marketKey = "") {
  const normalized = String(marketKey || "").toLowerCase();
  if (normalized === "player_points") return "pts";
  if (normalized === "player_rebounds") return "reb";
  if (normalized === "player_assists") return "ast";
  if (normalized === "player_threes") return "fg3m";
  if (normalized === "player_pass_yds") return "pass_yds";
  if (normalized === "player_pass_tds") return "pass_tds";
  if (normalized === "player_rush_yds") return "rush_yds";
  if (normalized === "player_reception_yds") return "rec_yds";
  if (normalized === "player_anytime_td") return "td";
  return "";
}

function numericAverageFromStats(rows = [], statKey = "") {
  const values = rows
    .map((row) => Number(row?.[statKey] ?? row?.stats?.[statKey] ?? 0))
    .filter((value) => Number.isFinite(value));
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function averageMinutesFromStats(rows = []) {
  const values = rows
    .map((row) => String(row?.min ?? row?.minutes ?? row?.stats?.min ?? "0"))
    .map((value) => Number.parseFloat(String(value).replace(":", ".")))
    .filter((value) => Number.isFinite(value));
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function statsGameDate(row = {}) {
  return row?.game?.date || row?.game?.datetime || row?.date || "";
}

function sportsDataIoHeaders() {
  const apiKey = window.BOT_CONFIG?.sportsdataApiKey;
  return apiKey ? { "Ocp-Apim-Subscription-Key": apiKey } : {};
}

async function fetchSportsDataIoJson(url) {
  const apiKey = window.BOT_CONFIG?.sportsdataApiKey;
  if (!apiKey) throw new Error("Falta la API key de SportsDataIO");
  const response = await fetch(url, { headers: sportsDataIoHeaders() });
  if (!response.ok) throw new Error(`SportsDataIO respondio ${response.status}`);
  return response.json();
}

function replaceTemplateTokens(template, values = {}) {
  return Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{${key}}`, String(value ?? "")), template);
}

function mergePropStatsEntry(baseEntry, overlayEntry, sourceOverride = "") {
  if (!baseEntry && !overlayEntry) return null;
  const base = baseEntry || {};
  const overlay = overlayEntry || {};
  return {
    ...base,
    ...overlay,
    recent: { ...(base.recent || {}), ...(overlay.recent || {}) },
    season: { ...(base.season || {}), ...(overlay.season || {}) },
    projection: { ...(base.projection || {}), ...(overlay.projection || {}) },
    source: sourceOverride || overlay.source || base.source || "",
  };
}

async function fetchPyEspnPropStatsBook(league, names = []) {
  const cleanNames = [...new Set((names || []).map((name) => String(name || "").trim()).filter(Boolean))].slice(0, 18);
  if (!cleanNames.length) return {};
  if (!String(window.location?.protocol || "").startsWith("http")) return {};
  const season = league === "nfl" ? inferredNflSeason() : currentSeasonForNba();
  const cacheKey = `${league}:${season}:${cleanNames.map((name) => normalizeName(name)).sort().join("|")}`;
  if (pyEspnPropsCache[cacheKey]) return pyEspnPropsCache[cacheKey];
  try {
    const response = await fetch("/api/pyespn/props", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        league,
        season,
        recent: 5,
        names: cleanNames,
      }),
    });
    const data = await response.json();
    if (!response.ok || !data?.ok) throw new Error(data?.error || `PyESPN respondio ${response.status}`);
    const resolved = Object.fromEntries(
      Object.entries(data.resolved || {}).filter(([, entry]) => entry && !String(entry.source || "").includes("error"))
    );
    pyEspnPropsCache[cacheKey] = resolved;
    return resolved;
  } catch (error) {
    return {};
  }
}

function propSelectionDirection(selection = "") {
  const normalized = String(selection || "").toLowerCase();
  if (normalized.includes("over")) return "over";
  if (normalized.includes("under")) return "under";
  if (normalized.includes("yes")) return "yes";
  if (normalized.includes("no")) return "no";
  return "neutral";
}

function average(values = []) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function buildPropModel(entry) {
  const books = entry.books || [];
  const bestPrice = Number(entry.bestPrice || 0);
  const secondPrice = Number(entry.secondPrice || 0);
  const comparisonBooks = books.slice(1, Math.min(4, books.length));
  const comparisonPrices = comparisonBooks.length
    ? comparisonBooks.map((book) => Number(book.price || 0)).filter((price) => Number.isFinite(price) && price > 1.01)
    : books.map((book) => Number(book.price || 0)).filter((price) => Number.isFinite(price) && price > 1.01);
  const comparisonPrice = average(comparisonPrices) || bestPrice || 1.01;
  const impliedProbability = impliedProbabilityFromOdds(bestPrice || 1.01);
  const marketProbability = impliedProbabilityFromOdds(comparisonPrice || 1.01);
  const gapBoost = clamp((Math.max(bestPrice - (secondPrice || comparisonPrice), 0) * 100) / 20, 0, 0.025);
  const booksBoost = books.length >= 5 ? 0.015 : books.length >= 4 ? 0.01 : books.length >= 3 ? 0.005 : 0;
  const lineConsensusPenalty = books.length >= 3 && new Set(books.map((book) => `${book.point ?? ""}`)).size > 1 ? 0.012 : 0;
  const directionBoost = propSelectionDirection(entry.selection) === "neutral" ? -0.005 : 0.004;
  const playerStats = currentPropStatsBook[normalizeName(entry.player || "")] || null;
  const statKey = propStatTypeFromMarketKey(entry.marketKey);
  const recentStat = Number(playerStats?.recent?.[statKey] || 0);
  const seasonStat = Number(playerStats?.season?.[statKey] || 0);
  const projectionStat = Number(playerStats?.projection?.[statKey] || 0);
  const projectedStat = projectionStat
    ? Number(((projectionStat * 0.55) + (recentStat * 0.3) + (seasonStat * 0.15)).toFixed(2))
    : recentStat && seasonStat
      ? Number(((recentStat * 0.65) + (seasonStat * 0.35)).toFixed(2))
      : recentStat || seasonStat || 0;
  const line = Number(entry.line || 0);
  const direction = propSelectionDirection(entry.selection);
  const projectionGap = line && projectedStat
    ? direction === "under"
      ? line - projectedStat
      : projectedStat - line
    : 0;
  const projectionBoost = clamp(projectionGap / Math.max(line || projectedStat || 1, 1), -0.035, 0.06);
  const minutesBoost = clamp(((Number(playerStats?.recent?.min || 0) || Number(playerStats?.season?.min || 0)) - 26) / 220, -0.015, 0.02);
  const injuryPenalty = playerStats?.injured ? 0.03 : 0;
  const realLogsBoost = playerStats?.recentGames >= 3 ? 0.008 : playerStats?.recentGames >= 1 ? 0.004 : 0;
  const modelProbability = clamp(marketProbability + gapBoost + booksBoost + directionBoost + projectionBoost + minutesBoost - lineConsensusPenalty - injuryPenalty, 0.48, 0.82);
  const adjustedModelProbability = clamp(modelProbability + realLogsBoost, 0.48, 0.84);
  const evDecimal = (adjustedModelProbability * Math.max(bestPrice, 1.01)) - 1;
  const ev = Number((evDecimal * 100).toFixed(1));
  const edge = Number(((adjustedModelProbability - impliedProbability) * 100).toFixed(1));
  const riskLabel =
    bestPrice > 3 || books.length < 3 ? "Alto"
      : bestPrice >= 2.2 || ev < 7 ? "Medio"
      : "Bajo";
  const tipShape = {
    marketKey: entry.marketKey,
    odds: bestPrice,
    modelProbability: adjustedModelProbability,
    impliedProbability,
    ev,
    riskLabel,
    books,
    oddsSource: "Real",
    bookmaker: entry.bestBook,
    validationLevel: books.length >= 4 ? "high" : books.length >= 3 ? "medium" : "low",
    consensusConfidence: clamp((adjustedModelProbability * 100) + Math.min(books.length * 2, 8), 50, 84),
    confidence: clamp((adjustedModelProbability * 100) + Math.min(books.length * 2, 8), 50, 84),
    oddsAgeState: "fresh",
  };
  const trustScore = trustScoreForTip(tipShape);
  const grade = recommendationGradeMeta(tipShape);
  return {
    impliedProbability,
    comparisonPrice: Number(comparisonPrice.toFixed(2)),
    modelProbability: adjustedModelProbability,
    evDecimal: Number(evDecimal.toFixed(4)),
    ev,
    edge,
    riskLabel,
    trustScore,
    trustLabel: trustLabelForTip(tipShape),
    trustTier: trustTierForTip(tipShape),
    grade,
    recommendedStake: recommendedStakeForTip({ ...tipShape, marketKey: entry.marketKey }),
    valueTier: valueTier(ev),
    valueLabel: valueLabel(ev),
    statsSourceLabel: playerStats
      ? (playerStats.source === "pyespn-sportsdataio-hybrid"
        ? "PyESPN + proyeccion NFL"
        : playerStats.source === "pyespn-nfl"
          ? "Game logs NFL ESPN"
          : playerStats.source === "pyespn+balldontlie"
            ? "PyESPN + balldontlie NBA"
            : playerStats.source === "pyespn-nba"
              ? "Game logs NBA ESPN"
              : playerStats.source === "sportsdataio-hybrid"
        ? "Game logs + proyeccion NFL"
        : playerStats.source === "sportsdataio"
          ? "Proyeccion NFL"
          : "Stats reales NBA")
      : entry.sport === "nfl"
        ? "Consenso de books NFL"
        : "Consenso de books",
    projectionStat: Number(projectionStat.toFixed(1)),
    projectedStat: Number(projectedStat.toFixed(1)),
    recentStat: Number(recentStat.toFixed(1)),
    seasonStat: Number(seasonStat.toFixed(1)),
    playerStats,
  };
}

function mergeBookmakerMarkets(baseMarkets = [], extraMarkets = []) {
  const grouped = new Map();
  [...baseMarkets, ...extraMarkets].forEach((market) => {
    const key = `${market.key}|${market.description || ""}`;
    if (!grouped.has(key)) {
      grouped.set(key, { ...market, outcomes: [...(market.outcomes || [])] });
      return;
    }
    const existing = grouped.get(key);
    const seen = new Set((existing.outcomes || []).map((outcome) => `${outcome.name}|${outcome.description || ""}|${outcome.point ?? ""}`));
    (market.outcomes || []).forEach((outcome) => {
      const outcomeKey = `${outcome.name}|${outcome.description || ""}|${outcome.point ?? ""}`;
      if (!seen.has(outcomeKey)) {
        existing.outcomes.push(outcome);
        seen.add(outcomeKey);
      }
    });
  });
  return [...grouped.values()];
}

function mergeOddsEvents(baseEvents = [], extraEvents = [], sport = "") {
  const merged = new Map();
  [...baseEvents, ...extraEvents].forEach((event) => {
    const key = event.id || eventMarketKeyFromOddsEvent(event, sport);
    if (!merged.has(key)) {
      merged.set(key, {
        ...event,
        sport: sport || event.sport,
        bookmakers: (event.bookmakers || []).map((bookmaker) => ({
          ...bookmaker,
          markets: (bookmaker.markets || []).map((market) => ({ ...market, outcomes: [...(market.outcomes || [])] })),
        })),
      });
      return;
    }
    const current = merged.get(key);
    const bookMap = new Map((current.bookmakers || []).map((bookmaker) => [bookmaker.title, bookmaker]));
    (event.bookmakers || []).forEach((bookmaker) => {
      if (!bookMap.has(bookmaker.title)) {
        current.bookmakers.push({
          ...bookmaker,
          markets: (bookmaker.markets || []).map((market) => ({ ...market, outcomes: [...(market.outcomes || [])] })),
        });
        bookMap.set(bookmaker.title, current.bookmakers[current.bookmakers.length - 1]);
        return;
      }
      const currentBook = bookMap.get(bookmaker.title);
      currentBook.markets = mergeBookmakerMarkets(currentBook.markets || [], bookmaker.markets || []);
    });
  });
  return [...merged.values()];
}

function propFeedGrade(entry) {
  const gap = Math.max(0, Number((entry.bestPrice || 0) - (entry.secondPrice || 0)).toFixed(2));
  if (entry.books.length >= 4 && gap >= 0.12) return { grade: "A", label: "Feed firme", key: "grade-a" };
  if (entry.books.length >= 3 && gap >= 0.06) return { grade: "B", label: "Feed usable", key: "grade-b" };
  return { grade: "C", label: "Solo monitoreo", key: "grade-c" };
}

function buildPropMarketEntriesForEvent(event = {}) {
  const groups = new Map();
  (event.bookmakers || []).forEach((bookmaker) => {
    (bookmaker.markets || [])
      .filter((market) => String(market.key || "").startsWith("player_"))
      .forEach((market) => {
        (market.outcomes || []).forEach((outcome) => {
          const player = outcome.description || market.description || "Jugador";
          const key = `${market.key}|${player}|${outcome.name}|${outcome.point ?? ""}`;
          if (!groups.has(key)) {
            groups.set(key, {
              kind: "prop",
              family: "props",
              sport: event.sport || els.sport.value,
              marketKey: market.key,
              market: marketLabelFromKey(market.key),
              player,
              selection: outcome.name,
              line: outcome.point ?? null,
              books: [],
              feedOrigin: "merge-props",
              feedOriginLabel: "Merge de props",
            });
          }
          const entry = groups.get(key);
          const price = Number(outcome.price);
          if (!Number.isFinite(price)) return;
          entry.books.push({
            bookmaker: bookmaker.title,
            price,
            point: outcome.point ?? null,
          });
        });
      });
  });

  return [...groups.values()]
    .map((entry) => {
      entry.books = entry.books.sort((a, b) => b.price - a.price);
      entry.bestBook = entry.books[0]?.bookmaker || "";
      entry.bestPrice = entry.books[0]?.price || 0;
      entry.secondBook = entry.books[1]?.bookmaker || "";
      entry.secondPrice = entry.books[1]?.price || 0;
      entry.grade = propFeedGrade(entry);
      return { ...entry, ...buildPropModel(entry) };
    })
    .filter((entry) => entry.books.length);
}

function renderMarketExplorer(tips = []) {
  const tipEventGroups = uniqueEventTips(tips).filter((group) => group.items.length);
  const oddsEvents = (currentOddsBook || []).filter((event) => Array.isArray(event.bookmakers) && event.bookmakers.length);
  const oddsEventGroups = oddsEvents.map((event) => ({
    eventId: event.id || eventMarketKeyFromOddsEvent(event, els.sport.value),
    event,
    items: tipEventGroups.find((group) => group.eventId === (event.id || eventMarketKeyFromOddsEvent(event, els.sport.value)))?.items || [],
  }));
  const eventGroups = oddsEventGroups.length ? oddsEventGroups : tipEventGroups.map((group) => ({ ...group, event: null }));

  if (!eventGroups.length) {
    els.marketEventTabs.innerHTML = "";
    els.marketFamilyTabs.innerHTML = "";
    els.marketExplorerMeta.innerHTML = `<div class="empty">Todavia no hay partidos con mercados para explorar.</div>`;
    els.marketExplorer.innerHTML = "";
    return;
  }

  if (!currentMarketEventId || !eventGroups.some((group) => group.eventId === currentMarketEventId)) {
    currentMarketEventId = eventGroups[0].eventId;
  }

  const activeGroup = eventGroups.find((group) => group.eventId === currentMarketEventId) || eventGroups[0];
  const activeEventTips = activeGroup.items || [];
  const activePropEntries = buildPropMarketEntriesForEvent(activeGroup.event || {});
  const familyGroups = ["main", "totals", "handicap", "props"].map((family) => ({
    family,
    label: family === "main" ? "1X2" : family === "totals" ? "Totales" : family === "handicap" ? "Handicap" : "Props",
    items: family === "props"
      ? activePropEntries
      : activeEventTips.filter((tip) => marketFamilyMeta(tip).key === family),
  }));

  if (!familyGroups.some((group) => group.family === currentMarketFamily && group.items.length)) {
    currentMarketFamily = familyGroups.find((group) => group.items.length)?.family || "main";
  }

  const activeFamily = familyGroups.find((group) => group.family === currentMarketFamily) || familyGroups[0];
  const leadTip = activeEventTips[0];
  const leadEvent = activeGroup.event;
  const displayAway = leadTip?.game?.away || leadEvent?.away_team || "Visitante";
  const displayHome = leadTip?.game?.home || leadEvent?.home_team || "Local";
  const displayLeague = leadTip?.leagueName || sportProfiles[els.sport.value]?.apiName || els.sport.value;
  const displayDate = leadTip?.game?.date || String(leadEvent?.commence_time || "").slice(0, 10) || "Proximo";

  els.marketEventTabs.innerHTML = eventGroups.map((group) => {
    const sampleTip = group.items?.[0];
    const sampleEvent = group.event;
    const away = sampleTip?.game?.away || sampleEvent?.away_team || "Visitante";
    const home = sampleTip?.game?.home || sampleEvent?.home_team || "Local";
    return `<button class="ghost-btn top-tab ${group.eventId === currentMarketEventId ? "active" : ""}" type="button" data-market-event="${group.eventId}">${away} @ ${home}</button>`;
  }).join("");

  els.marketFamilyTabs.innerHTML = familyGroups.map((group) => `
    <button class="ghost-btn top-tab ${group.family === currentMarketFamily ? "active" : ""}" type="button" data-market-family="${group.family}">
      ${group.label} ${group.items.length ? `(${group.items.length})` : ""}
    </button>
  `).join("");

  els.marketExplorerMeta.innerHTML = `
    <article class="alert-card">
      <div class="alert-top">
        <strong>${displayAway} @ ${displayHome}</strong>
        <span>${displayLeague}</span>
      </div>
      <div class="alert-meta">
        <div>${displayDate}${leadTip ? ` · ${pickRealityMeta(leadTip).label} · ${competitionClassMeta(leadTip).label}` : " · Feed real del mercado"}</div>
        <div>${activeFamily.items.length} opcion(es) en ${activeFamily.label} para este partido.</div>
      </div>
    </article>
  `;
  els.marketExplorerMeta.innerHTML = els.marketExplorerMeta.innerHTML.replaceAll(" Â· ", " | ");

  if (!activeFamily.items.length) {
    els.marketExplorer.innerHTML = `<div class="empty">Todavia no hay picks del tipo ${activeFamily.label} para este partido.</div>`;
    return;
  }

  els.marketExplorer.innerHTML = activeFamily.items
    .sort((a, b) => {
      if (a.kind === "prop" || b.kind === "prop") {
        return Number(b.bestPrice || 0) - Number(a.bestPrice || 0);
      }
      return trustScoreForTip(b) - trustScoreForTip(a) || b.ev - a.ev;
    })
    .map((tip) => {
      if (tip.kind === "prop") {
        return `
          <article class="alert-card market-card">
            <div class="alert-top">
              <strong>${tip.player}: ${tip.selection}${tip.line != null ? ` ${tip.line}` : ""}</strong>
              <div class="pill-row">
                <span class="grade-pill ${tip.grade.key}">${tip.grade.grade}</span>
                <span class="trust-pill ${tip.trustTier}">${tip.trustLabel} · ${tip.trustScore}</span>
              </div>
            </div>
            <div class="alert-meta">
              <div>${tip.market} · Mejor ${tip.bestBook} ${Number(tip.bestPrice || 0).toFixed(2)}x</div>
              <div>Segundo mejor ${tip.secondBook || "Sin segundo"} ${tip.secondPrice ? `${Number(tip.secondPrice).toFixed(2)}x` : ""}</div>
              <div>${tip.grade.label} | Riesgo ${tip.riskLabel} | Stake ${money(tip.recommendedStake || 0)}</div>
              <div>Comp. ${Number(tip.comparisonPrice || 0).toFixed(2)}x | ${tip.valueLabel} | ${tip.statsSourceLabel}</div>
              ${tip.playerStats ? `<div>Reciente ${tip.recentStat} | Temporada ${tip.seasonStat} | Proyeccion ${tip.projectedStat}${tip.playerStats.injured ? ` | Lesion ${tip.playerStats.injuryLabel || "activa"}` : ""}</div>` : ""}
            </div>
            <div class="market-compare-grid">
              <div class="market-compare-stat best">
                <span>Mejor precio</span>
                <strong>${tip.bestBook || "Sin dato"} ${Number(tip.bestPrice || 0).toFixed(2)}x</strong>
              </div>
              <div class="market-compare-stat second">
                <span>Segundo mejor</span>
                <strong>${tip.secondBook || "Sin segundo"}${tip.secondPrice ? ` ${Number(tip.secondPrice).toFixed(2)}x` : ""}</strong>
              </div>
            </div>
            <div class="book-row"><span class="pill">Comp. ${Number(tip.comparisonPrice || 0).toFixed(2)}x</span><span class="pill value-band"><span class="value-dot ${tip.valueTier}"></span>${tip.valueLabel}</span>${tip.books.slice(0, 6).map((book) => `<span class="pill">${book.bookmaker} ${book.point ?? ""} ${Number(book.price || 0).toFixed(2)}x</span>`).join("")}</div>
          </article>
        `;
      }

      const grade = recommendationGradeMeta(tip);
      const altBooks = Array.isArray(tip.books)
        ? tip.books
            .filter((book) => String(book.bookmaker || "") !== String(tip.bookmaker || ""))
            .sort((a, b) => Number(b.price || 0) - Number(a.price || 0))
            .slice(0, 5)
        : [];
      const secondBook = altBooks[0] || null;
      return `
        <article class="alert-card market-card">
          <div class="alert-top">
            <strong>${tip.type}: ${tip.pick}</strong>
            <div class="pill-row">
              <span class="grade-pill ${grade.key}">${grade.grade}</span>
              <span class="trust-pill ${trustTierForTip(tip)}">${trustLabelForTip(tip)} · ${trustScoreForTip(tip)}</span>
            </div>
          </div>
          <div class="alert-meta">
            <div>${tip.market}${tip.line ? ` ${tip.line}` : ""} · Mejor ${tip.bookmaker} ${Number(tip.odds || 0).toFixed(2)}x</div>
            <div>Segundo mejor ${secondBook?.bookmaker || "Sin segundo"} ${secondBook ? `${Number(secondBook.price || 0).toFixed(2)}x` : ""}</div>
            <div>${grade.label} · Modelo ${toPercent((tip.modelProbability || 0) * 100)} · EV ${tip.ev > 0 ? "+" : ""}${tip.ev}% · Stake ${money(tip.recommendedStake ?? recommendedStakeForTip(tip))}</div>
            <div>${tip.reason}</div>
            <div>Origen: Book principal | Comparado con books alternos del evento.</div>
          </div>
          <div class="market-compare-grid">
            <div class="market-compare-stat best">
              <span>Mejor precio</span>
              <strong>${tip.bookmaker || "Sin dato"} ${Number(tip.odds || 0).toFixed(2)}x</strong>
            </div>
            <div class="market-compare-stat second">
              <span>Segundo mejor</span>
              <strong>${secondBook?.bookmaker || "Sin segundo"}${secondBook ? ` ${Number(secondBook.price || 0).toFixed(2)}x` : ""}</strong>
            </div>
          </div>
          ${altBooks.length ? `<div class="book-row">${altBooks.map((book) => `<span class="pill">Alt ${book.bookmaker} ${book.point ?? ""} ${Number(book.price || 0).toFixed(2)}x</span>`).join("")}</div>` : `<div class="alert-meta">Todavia no hay books alternos suficientes para esta seleccion.</div>`}
        </article>
      `;
    })
    .join("");
  els.marketExplorer.innerHTML = els.marketExplorer.innerHTML.replaceAll(" Â· ", " | ");
}

function buildUnifiedAlerts(tips = [], alertPackage = { alerts: [] }) {
  const alerts = [];
  (alertPackage.alerts || []).forEach((alert) => {
    alerts.push({
      type: alert.evState === "gained" ? "EV+" : alert.evState === "lost" ? "Perdio valor" : alert.direction === "up" ? "Cuota subio" : "Cuota bajo",
      accent: alert.evState === "gained" ? "high" : alert.evState === "lost" ? "low" : alert.direction === "up" ? "medium" : "high",
      title: alert.pick,
      meta: alert.match,
      detail: `Antes ${alert.previous.toFixed(2)}x · Ahora ${alert.current.toFixed(2)}x · EV ${alert.currentEv > 0 ? "+" : ""}${alert.currentEv}%`,
    });
  });

  tips
    .filter((tip) => Array.isArray(tip.books) && tip.books.length >= 2)
    .forEach((tip) => {
      const gap = Number((tip.books[0].price - tip.books[tip.books.length - 1].price).toFixed(2));
      if (gap >= 0.18) {
        alerts.push({
          type: "Gap entre casas",
          accent: "medium",
          title: `${tip.type}: ${tip.pick}`,
          meta: `${tip.game.away} @ ${tip.game.home}`,
          detail: `Mejor ${tip.books[0].bookmaker} ${tip.books[0].price.toFixed(2)}x · Peor ${tip.books[tip.books.length - 1].bookmaker} ${tip.books[tip.books.length - 1].price.toFixed(2)}x`,
        });
      }
    });

  tips
    .filter((tip) => Array.isArray(tip.books) && tip.books.length >= 2)
    .forEach((tip) => {
      const topA = tip.books[0]?.price || 0;
      const topB = tip.books[1]?.price || 0;
      if (topA > 0 && topB > 0) {
        const arb = (1 / topA) + (1 / topB);
        if (arb < 1) {
          alerts.push({
            type: "Arbitraje posible",
            accent: "high",
            title: `${tip.type}: ${tip.pick}`,
            meta: `${tip.game.away} @ ${tip.game.home}`,
            detail: `Suma implicita ${arb.toFixed(3)} con ${tip.books[0].bookmaker} y ${tip.books[1].bookmaker}.`,
          });
        }
      }
    });

  return alerts.sort((a, b) => {
    const score = (item) => (item.accent === "high" ? 3 : item.accent === "medium" ? 2 : 1);
    return score(b) - score(a);
  }).slice(0, 12);
}

function renderAlertsCenter(tips = [], alertPackage = { alerts: [] }) {
  const alerts = buildUnifiedAlerts(tips, alertPackage);
  if (!alerts.length) {
    els.alertsCenter.innerHTML = `<div class="empty">Todavia no hay alertas EV+ o movimientos de valor para este slate.</div>`;
    return;
  }

  els.alertsCenter.innerHTML = alerts.map((alert) => `
    <article class="alert-card validation-${alert.accent}">
      <div class="alert-top">
        <strong>${alert.type}</strong>
        <span>${alert.title}</span>
      </div>
      <div class="alert-meta">
        <div>${alert.meta}</div>
        <div>${alert.detail}</div>
      </div>
    </article>
  `).join("");
}

function stakeProfileLabel() {
  if (els.stakeProfile.value === "conservative") return "Conservador";
  if (els.stakeProfile.value === "aggressive") return "Agresivo";
  return "Balanceado";
}

function betModeLabel(mode) {
  if (mode === "conservative") return "Conservador";
  if (mode === "aggressive") return "Agresivo";
  if (mode === "value") return "Solo valor";
  return "Normal";
}

function recommendBetMode(tips) {
  const ranked = rankRealTopTips(tips).slice(0, 8);
  if (!ranked.length) {
    return {
      mode: "conservative",
      score: 0,
      noBet: true,
      reasons: ["No hay slate suficiente; mejor jugar defensivo o no forzar."],
    };
  }

  const avgConsensus = ranked.reduce((sum, tip) => sum + tip.consensusConfidence, 0) / ranked.length;
  const avgEdge = ranked.reduce((sum, tip) => sum + tip.edge, 0) / ranked.length;
  const avgEv = ranked.reduce((sum, tip) => sum + tip.ev, 0) / ranked.length;
  const realOddsRate = ranked.filter((tip) => tip.oddsSource === "Real").length / ranked.length;
  const strongCount = ranked.filter((tip) => tip.consensusConfidence >= 62 && tip.edge >= 6).length;
  const valueCount = ranked.filter((tip) => tip.edge >= 7 && tip.ev >= 6).length;
  const spread = Math.max(...ranked.map((tip) => tip.consensusConfidence)) - Math.min(...ranked.map((tip) => tip.consensusConfidence));

  const reasons = [
    `Consenso medio ${toPercent(avgConsensus)} y edge medio ${avgEdge > 0 ? "+" : ""}${avgEdge.toFixed(1)}%.`,
    `${Math.round(realOddsRate * 100)}% de los tops tienen odds reales.`,
  ];

  if (avgConsensus < 56 || avgEv < 1) {
    reasons.push("El slate viene flojo; conviene bajar ritmo y proteger banca.");
    return { mode: "conservative", score: 42, noBet: avgConsensus < 54 && avgEv < 0.8, reasons };
  }

  if (valueCount >= 3 && avgEdge >= 8 && avgConsensus < 63) {
    reasons.push("Hay valor de mercado claro, pero no tanta superioridad de confianza; mejor jugar selectivo.");
    return { mode: "value", score: 71, noBet: false, reasons };
  }

  if (strongCount >= 3 && avgConsensus >= 65 && avgEdge >= 7 && realOddsRate >= 0.6 && spread <= 12) {
    reasons.push("Hay profundidad real en el slate y la señal viene bastante pareja.");
    return { mode: "aggressive", score: 84, noBet: false, reasons };
  }

  if (strongCount >= 2 && avgConsensus >= 60 && avgEdge >= 4) {
    reasons.push("Hay material suficiente para jugar normal sin abrir demasiado la llave.");
    return { mode: "normal", score: 66, noBet: false, reasons };
  }

  reasons.push("La mejor lectura es ir corto y priorizar calidad.");
  return { mode: "conservative", score: 53, noBet: false, reasons };
}

function effectiveBetMode(tips) {
  if (els.betMode.value !== "auto") {
    return {
      mode: els.betMode.value,
      score: null,
      noBet: false,
      reasons: [`Modo manual fijado en ${betModeLabel(els.betMode.value)}.`],
      automatic: false,
    };
  }
  const recommended = recommendBetMode(tips);
  return { ...recommended, automatic: true };
}

function recommendConfidencePackage(tips = []) {
  if (!tips.length) {
    return {
      mode: "auto",
      threshold: 58,
      label: "Esperando slate",
      detail: "Sin muestra suficiente para recomendar umbral.",
    };
  }

  const avgEv = tips.reduce((sum, tip) => sum + Number(tip.ev || 0), 0) / tips.length;
  const avgModel = tips.reduce((sum, tip) => sum + Number((tip.modelProbability || 0) * 100), 0) / tips.length;
  const realRate = tips.filter((tip) => isRealTip(tip)).length / tips.length;
  const strongCount = tips.filter((tip) => tip.ev >= 10 && (tip.modelProbability || 0) >= 0.58).length;

  if (avgEv >= 14 && avgModel >= 61 && realRate >= 0.6 && strongCount >= 3) {
    return { mode: "auto", threshold: 54, label: "Slate premium", detail: "Hay varias jugadas fuertes; el bot puede abrir más el abanico sin perder calidad." };
  }
  if (avgEv >= 9 && avgModel >= 58) {
    return { mode: "auto", threshold: 57, label: "Slate sano", detail: "Hay valor real, pero conviene seguir selectivo con un corte medio." };
  }
  if (avgEv >= 5 && avgModel >= 55) {
    return { mode: "auto", threshold: 60, label: "Slate cauteloso", detail: "Hay picks jugables, pero toca pedir más calidad antes de recomendar." };
  }
  return { mode: "auto", threshold: 63, label: "Slate fino", detail: "El slate viene flojo; mejor exigir mucha confianza para que no entre ruido." };
}

function effectiveMinConfidence(tips = []) {
  if (els.confidenceMode?.value === "manual") {
    return {
      threshold: Number(els.minConfidence.value || 52),
      automatic: false,
      label: "Manual",
      detail: `Corte fijado manualmente en ${Number(els.minConfidence.value || 52)}%.`,
    };
  }
  return {
    ...recommendConfidencePackage(tips),
    automatic: true,
  };
}

function syncConfidenceControls(packageInfo) {
  const auto = els.confidenceMode?.value !== "manual";
  if (els.minConfidence) {
    els.minConfidence.disabled = auto;
    if (auto && packageInfo?.threshold) {
      els.minConfidence.value = String(packageInfo.threshold);
    }
  }
  if (els.confidenceAutoBadge) {
    const threshold = packageInfo?.threshold ?? Number(els.minConfidence.value || 52);
    els.confidenceAutoBadge.textContent = auto
      ? `${packageInfo?.label || "Auto"} · ${threshold}%`
      : `Manual · ${threshold}%`;
    els.confidenceAutoBadge.title = packageInfo?.detail || "";
  }
}

function autoTuneControls(modePackage) {
  if (els.betMode.value !== "auto") return;

  const preset = {
    conservative: { risk: 3, minConfidence: 60, valueOnly: true, stakeProfile: "conservative" },
    normal: { risk: 5, minConfidence: 56, valueOnly: false, stakeProfile: "balanced" },
    aggressive: { risk: 7, minConfidence: 52, valueOnly: false, stakeProfile: "aggressive" },
    value: { risk: 4, minConfidence: 58, valueOnly: true, stakeProfile: "balanced" },
  }[modePackage.mode] || { risk: 5, minConfidence: 56, valueOnly: false, stakeProfile: "balanced" };

  if (modePackage.noBet) {
    preset.risk = 2;
    preset.minConfidence = 64;
    preset.valueOnly = true;
    preset.stakeProfile = "conservative";
  }

  const signature = `${modePackage.mode}|${modePackage.noBet ? 1 : 0}|${preset.risk}|${preset.minConfidence}|${preset.valueOnly ? 1 : 0}|${preset.stakeProfile}`;

  const changed =
    Number(els.risk.value) !== preset.risk ||
    els.valueOnly.checked !== preset.valueOnly ||
    els.stakeProfile.value !== preset.stakeProfile;

  if (!changed) {
    lastAutoTuneSignature = signature;
    return;
  }

  isApplyingAutoTune = true;
  els.risk.value = String(preset.risk);
  if (els.confidenceMode?.value === "manual") {
    els.minConfidence.value = String(preset.minConfidence);
  }
  els.valueOnly.checked = preset.valueOnly;
  els.stakeProfile.value = preset.stakeProfile;
  isApplyingAutoTune = false;
  lastAutoTuneSignature = signature;
}

function dailyExposureFraction(mode) {
  const base = mode === "conservative" ? 0.05 : mode === "aggressive" ? 0.13 : mode === "value" ? 0.06 : 0.09;
  return clamp(base * (0.85 + Number(els.risk.value || 5) * 0.05), 0.04, 0.18);
}

function renderBettingPlan(tips) {
  const ranked = rankRealTopTips(tips).slice(0, 3);
  const bankroll = currentBankrollValue();
  const modePackage = effectiveBetMode(tips);
  const activeMode = modePackage.mode;
  autoTuneControls(modePackage);
  const exposureFraction = dailyExposureFraction(activeMode);
  const totalBudget = Number((bankroll * exposureFraction).toFixed(2));
  const singlesWeight = activeMode === "value" ? 0.85 : activeMode === "aggressive" ? 0.7 : 0.75;
  const parlayWeight = activeMode === "value" ? 0.05 : activeMode === "aggressive" ? 0.2 : 0.15;
  const reserveWeight = 1 - singlesWeight - parlayWeight;
  const singlesBudget = Number((totalBudget * singlesWeight).toFixed(2));
  const parlayBudget = Number((totalBudget * parlayWeight).toFixed(2));
  const reserveBudget = Number((totalBudget * reserveWeight).toFixed(2));
  const unitSize = Number((bankroll * 0.01).toFixed(2));

  if (!ranked.length) {
    els.bettingPlanBadge.textContent = "Sin plan";
    els.bettingPlanPanel.innerHTML = `<div class="empty">Genera picks para que el bot te proponga como entrarle y cuanto arriesgar.</div>`;
    lastBettingPlanText = "";
    return;
  }

  const stakes = ranked.map((tip) => ({ tip, stake: recommendedStakeForTip(tip) }));
  const rawTotal = stakes.reduce((sum, item) => sum + item.stake, 0) || 1;
  const normalized = stakes.map((item, index) => {
    const proportional = (item.stake / rawTotal) * singlesBudget;
    const capped = clamp(proportional, unitSize * 0.6, singlesBudget * (index === 0 ? 0.5 : index === 1 ? 0.33 : 0.24));
    return {
      ...item,
      finalStake: Number(capped.toFixed(2)),
      units: unitSize ? Number((capped / unitSize).toFixed(1)) : 0,
    };
  });

  const strongestEdge = Math.max(...ranked.map((tip) => tip.edge));
  const planTone = strongestEdge >= 8 ? "Aprovechable" : strongestEdge >= 4 ? "Controlado" : "Ligero";
  els.bettingPlanBadge.textContent = modePackage.noBet ? `No apostar hoy · ${betModeLabel(activeMode)}` : `${planTone} · ${betModeLabel(activeMode)}`;

  pushBetModeHistory({
    date: isoToday(),
    sport: sportProfiles[els.sport.value]?.apiName || els.sport.value,
    league: selectedLeagueMeta()?.name || "",
    mode: activeMode,
    score: modePackage.score,
    noBet: modePackage.noBet,
    bankroll,
    topCount: ranked.length,
  });

  const cards = [
    `
      <article class="alert-card">
        <div class="alert-top">
          <strong>Plan del dia</strong>
          <span>${betModeLabel(activeMode)}</span>
        </div>
        <div class="alert-meta">
          <div>Banca ${money(bankroll)} · 1u = ${money(unitSize)} · exposicion sugerida ${money(totalBudget)} (${toPercent(exposureFraction * 100)})</div>
          <div>Singles ${money(singlesBudget)} · Parlay seguro ${money(parlayBudget)} · Reserva ${money(reserveBudget)}</div>
        </div>
      </article>
    `,
    `
      <article class="alert-card">
        <div class="alert-top">
          <strong>Modo recomendado</strong>
          <span>${modePackage.automatic ? "Auto" : "Manual"}</span>
        </div>
        <div class="alert-meta">
          <div>${betModeLabel(activeMode)}${modePackage.score !== null ? ` · score ${modePackage.score}/100` : ""}</div>
          <div>${modePackage.reasons.join(" ")}</div>
        </div>
      </article>
    `,
    modePackage.noBet ? `
      <article class="alert-card down">
        <div class="alert-top">
          <strong>No apostar hoy</strong>
          <span>Proteccion</span>
        </div>
        <div class="alert-meta">
          <div>El bot detecta que el slate no trae suficiente calidad para abrir exposicion real.</div>
          <div>Si aun quieres tocar algo, limitalo a 0.5u o menos y solo picks con odds reales.</div>
        </div>
      </article>
    ` : "",
    `
      <article class="alert-card">
        <div class="alert-top">
          <strong>Como jugarlo</strong>
          <span>Guia</span>
        </div>
        <div class="alert-meta">
          <div>1. Prioriza picks individuales con odds reales y consenso alto.</div>
          <div>2. ${activeMode === "value" ? `Solo usa picks con edge claro y no fuerces parlay arriba de ${money(parlayBudget)}.` : `Usa el parlay solo si el top 1 y top 2 siguen vivos y no rebases ${money(parlayBudget)}.`}</div>
          <div>3. ${modePackage.noBet ? "Hoy la prioridad es proteger banca; la mejor jugada puede ser no entrar." : activeMode === "aggressive" ? "Puedes abrir un poco mas la llave, pero si dos picks seguidos se caen, vuelves a modo normal." : "Si dos picks seguidos se caen, frena y guarda la reserva."}</div>
        </div>
      </article>
    `,
    ...normalized.map((item, index) => `
      <article class="alert-card betting-plan-card">
        <div class="alert-top">
          <strong>${index + 1}. ${item.tip.type}: ${item.tip.pick}</strong>
          <span>${money(item.finalStake)}</span>
        </div>
        <div class="alert-meta">
          <div>${item.tip.game.away} @ ${item.tip.game.home} · ${item.tip.bookmaker} ${item.tip.odds.toFixed(2)}x</div>
          <div>${item.units}u · Consenso ${toPercent(item.tip.consensusConfidence)} · Edge ${item.tip.edge > 0 ? "+" : ""}${item.tip.edge}% · EV ${item.tip.ev > 0 ? "+" : ""}${item.tip.ev}%</div>
        </div>
      </article>
    `),
  ];

  els.bettingPlanPanel.innerHTML = cards.join("");
  lastBettingPlanText = [
    "PLAN DE APUESTA BOT",
    `Modo: ${betModeLabel(activeMode)}${modePackage.noBet ? " | NO APOSTAR HOY" : ""}`,
    `Banca: ${money(bankroll)} | 1u: ${money(unitSize)} | Exposicion: ${money(totalBudget)}`,
    `Singles: ${money(singlesBudget)} | Parlay: ${money(parlayBudget)} | Reserva: ${money(reserveBudget)}`,
    ...modePackage.reasons.map((reason, index) => `${index + 1}. ${reason}`),
    ...normalized.map((item, index) => `${index + 1}. ${item.tip.type}: ${item.tip.pick} | ${item.tip.game.away} @ ${item.tip.game.home} | Stake ${money(item.finalStake)} | ${item.units}u | EV ${item.tip.ev > 0 ? "+" : ""}${item.tip.ev}%`),
  ].join("\n");
  renderBetModeHistory();
}

function renderTelegramPreview(tips) {
  const ranked = rankRealTopTips(tips).slice(0, 3);
  if (!ranked.length) {
    els.telegramPreview.innerHTML = `<div class="empty">Todavia no hay picks para armar el mensaje de Telegram.</div>`;
    return;
  }

  els.telegramPreview.innerHTML = ranked.map((tip, index) => `
    <article class="alert-card">
      <div class="alert-top">
        <strong>${index + 1}. ${tip.type}: ${tip.pick}</strong>
        <span>${tip.bookmaker} ${tip.odds.toFixed(2)}x</span>
      </div>
      <div class="alert-meta">
        <div>${tip.game.away} @ ${tip.game.home}</div>
        <div>${tip.leagueName || sportProfiles[tip.game.sport].apiName} · Consenso ${toPercent(tip.consensusConfidence)} · EV ${tip.ev > 0 ? "+" : ""}${tip.ev}%</div>
      </div>
    </article>
  `).join("");
}

function renderStatsSnapshot() {
  const snapshot = loadStatsSnapshot();
  if (!snapshot) {
    els.statsSnapshotPanel.innerHTML = `<div class="empty">Todavia no hay snapshot guardado.</div>`;
    return;
  }

  els.statsSnapshotPanel.innerHTML = `
    <article class="alert-card">
      <div class="alert-top">
        <strong>Ultimo cierre</strong>
        <span>${new Date(snapshot.updatedAt).toLocaleString("es-MX")}</span>
      </div>
      <div class="alert-meta">
        <div>${snapshot.count} registro(s) · ${snapshot.settled} cerrados</div>
        <div>Acierto ${toPercent(snapshot.winRate)} · ROI ${toPercent(snapshot.roi)} · Profit ${money(snapshot.profit)} · Banca ${money(snapshot.bankroll)}</div>
      </div>
    </article>
  `;
}

function renderTelegramSentHistory() {
  const history = loadTelegramSentHistory();
  if (!history.length) {
    els.telegramSentHistory.innerHTML = `<div class="empty">Todavia no hay envios guardados a Telegram.</div>`;
    return;
  }

  els.telegramSentHistory.innerHTML = history.slice(0, 8).map((entry) => `
    <article class="alert-card">
      <div class="alert-top">
        <strong>${entry.kind}</strong>
        <span>${new Date(entry.sentAt).toLocaleString("es-MX")}</span>
      </div>
      <div class="alert-meta">
        <div>${entry.summary}</div>
      </div>
    </article>
  `).join("");
}

function renderBetModeHistory() {
  const history = loadBetModeHistory();
  if (!history.length) {
    els.betModeHistoryPanel.innerHTML = `<div class="empty">Todavia no hay decisiones guardadas del modo auto.</div>`;
    return;
  }

  els.betModeHistoryPanel.innerHTML = history.slice(0, 10).map((entry) => `
    <article class="alert-card ${entry.noBet ? "down" : ""}">
      <div class="alert-top">
        <strong>${entry.date} · ${entry.sport}</strong>
        <span>${betModeLabel(entry.mode)}${entry.noBet ? " · No bet" : ""}</span>
      </div>
      <div class="alert-meta">
        <div>${entry.league || "Sin liga"} · score ${entry.score ?? "-"} · banca ${money(Number(entry.bankroll || 0))}</div>
        <div>${entry.topCount || 0} top pick(s) considerados.</div>
      </div>
    </article>
  `).join("");
}

function renderOpenBotHelp() {
  const command = `C:\\Users\\tsacl\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\bin\\node.exe serve.js`;
  const schedulerCommand = `C:\\Users\\tsacl\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\bin\\node.exe backend-jobs.js`;
  els.openBotHelp.innerHTML = `
    <article class="alert-card">
      <div class="alert-top">
        <strong>Doble clic rapido</strong>
        <span>Local</span>
      </div>
      <div class="alert-meta">
        <div>Usa <strong>abrir-bot.cmd</strong> desde la carpeta del proyecto para levantar servidor, scheduler local y navegador.</div>
        <div>Servidor: <code>${command}</code></div>
        <div>Scheduler: <code>${schedulerCommand}</code></div>
      </div>
    </article>
  `;
}

function renderFeedHealth(status = {}) {
  const items = [
    {
      label: "Fuente principal",
      state: status.sourceState || "idle",
      detail: status.sourceDetail || "Esperando carga",
    },
    {
      label: "Odds reales",
      state: status.oddsState || "idle",
      detail: status.oddsDetail || "Sin verificar",
    },
    {
      label: "Referencias externas",
      state: status.externalState || "idle",
      detail: status.externalDetail || "Sin verificar",
    },
    {
      label: "Feed de props",
      state: status.propsState || "idle",
      detail: status.propsDetail || "Sin verificar",
    },
    {
      label: "Telegram auto top",
      state: status.telegramState || "idle",
      detail: status.telegramDetail || "Sin verificar",
    },
    {
      label: "Ultima actualizacion",
      state: "ok",
      detail: status.updatedAt || new Date().toLocaleString("es-MX"),
    },
  ];

  const healthy = items.filter((item) => item.state === "ok").length;
  const degraded = items.filter((item) => item.state === "warn").length;
  els.feedHealthBadge.textContent = `${healthy} ok · ${degraded} alerta`;

  els.feedHealthList.innerHTML = items.map((item) => `
    <article class="alert-card ${item.state === "warn" ? "down" : item.state === "ok" ? "up" : ""}">
      <div class="alert-top">
        <strong>${item.label}</strong>
        <span>${item.state === "ok" ? "OK" : item.state === "warn" ? "Alerta" : "Base"}</span>
      </div>
      <div class="alert-meta">${item.detail}</div>
    </article>
  `).join("");
}

async function maybeAutoSendTelegramTop(tips) {
  const token = window.BOT_CONFIG?.telegramBotToken;
  const chatId = window.BOT_CONFIG?.telegramChatId;
  const state = loadTelegramAutoTopState();
  if (state.enabled === false) {
    return { state: "warn", detail: "Autoenvio desactivado desde la UI." };
  }
  if (!token || !chatId) {
    return { state: "warn", detail: "Falta token o chat id." };
  }

  const candidates = combinedCachedTopTips();
  const top = candidates[0] || rankRealTopTips(tips)[0];
  if (!top || top.consensusConfidence < 66 || top.ev < 2) {
    return { state: "warn", detail: "Todavia no hay top real lo bastante fuerte para autoenvio." };
  }

  const sendKey = `${top.eventDate || top.game?.date}|${top.match || `${top.game?.away} @ ${top.game?.home}`}|${top.pick}|${Number(top.odds).toFixed(2)}`;
  if (state.lastSentKey === sendKey) {
    return { state: "ok", detail: "El top real actual ya fue enviado antes." };
  }

  await sendTelegramMessage(buildTelegramTopText());
  saveTelegramAutoTopState({ ...state, lastSentKey: sendKey, sentAt: new Date().toISOString() });
  return { state: "ok", detail: `Top real enviado: ${top.leagueName || top.sport} · ${top.type} ${top.pick}.` };
}

function renderCalendar(tips) {
  const targetDate = currentCalendarDate || isoToday();
  els.calendarDate.value = targetDate;
  const items = tips.filter((tip) => tip.game.date === targetDate);
  const avgConfidence = items.length ? items.reduce((sum, tip) => sum + tip.confidence, 0) / items.length : 0;
  els.calendarSummary.textContent = items.length
    ? `${items.length} pick(s) para ${targetDate} · confianza media ${toPercent(avgConfidence)}`
    : `No hay picks para ${targetDate}.`;

  if (!items.length) {
    els.calendarPicks.innerHTML = `<div class="empty">No hay picks cargados para esa fecha.</div>`;
    return;
  }

  els.calendarPicks.innerHTML = items.map((tip) => `
    <article class="top-pick-card">
      <div class="section-head">
        <span class="value-chip ${valueTier(tip.edge)}">${valueLabel(tip.edge)}</span>
        <span class="pill">${tip.odds.toFixed(2)}x</span>
      </div>
      <p class="match">${tip.game.away} @ ${tip.game.home}</p>
      <p class="pick"><strong>${tip.type}:</strong> ${tip.pick}</p>
      <div class="pill-row">
        <span class="pill">${toPercent(tip.confidence)}</span>
        <span class="pill">Edge ${tip.edge > 0 ? "+" : ""}${tip.edge}%</span>
        <span class="pill">Stake ${money(recommendedStakeForTip(tip))}</span>
      </div>
    </article>
  `).join("");
}

function maybeSendNotifications(tips, alertPackage) {
  const state = notificationState();
  if (!state.enabled) return;
  if (!("Notification" in window) || Notification.permission !== "granted") return;

  const premiumTips = tips
    .filter((tip) => tip.confidence >= 64 && tip.edge >= 6)
    .slice(0, 2);

  const alertItems = alertPackage.alerts
    .filter((alert) => Math.abs(alert.delta) >= 0.12)
    .slice(0, 2);

  premiumTips.forEach((tip) => {
    const key = `tip:${oddsSnapshotId(tip)}:${tip.odds.toFixed(2)}`;
    if (state.sent[key]) return;
    new Notification("Pick fuerte detectado", {
      body: `${tip.type}: ${tip.pick} | ${tip.game.away} @ ${tip.game.home} | ${tip.odds.toFixed(2)}x`,
    });
    state.sent[key] = Date.now();
  });

  alertItems.forEach((alert) => {
    const key = `alert:${alert.match}:${alert.pick}:${alert.current.toFixed(2)}`;
    if (state.sent[key]) return;
    new Notification("Cambio de cuota", {
      body: `${alert.pick} | ${alert.match} | ${alert.previous.toFixed(2)}x -> ${alert.current.toFixed(2)}x`,
    });
    state.sent[key] = Date.now();
  });

  const recentEntries = Object.entries(state.sent)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 80);
  state.sent = Object.fromEntries(recentEntries);
  saveNotificationState(state);
}

function normalizeName(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function namesMatch(left, right) {
  const a = normalizeName(left);
  const b = normalizeName(right);
  return a && b && (a.includes(b) || b.includes(a));
}

function gameKey(tip) {
  return `${tip.game.away}-${tip.game.home}-${tip.game.date}`;
}

function stableId(text) {
  return hashScore(text).toString(36);
}

function selectedLeagueMeta() {
  return (leagues[els.sport.value] || []).find((league) => league.id === els.league.value) || null;
}

function applyWorkModeDefaults() {
  if (!workMode) return;
  els.api.value = "backend";
  els.valueOnly.checked = false;
  if (els.telegramAutoTopToggle) {
    els.telegramAutoTopToggle.checked = false;
  }
}

function uniqueSortedDates(games) {
  return [...new Set((games || []).map((game) => game?.date).filter(Boolean))].sort();
}

function selectTargetSlateDate(games) {
  const dates = uniqueSortedDates(games);
  if (!dates.length) return currentCalendarDate || isoToday();
  if (currentCalendarDate && dates.includes(currentCalendarDate)) return currentCalendarDate;
  const today = isoToday();
  const nextDate = dates.find((date) => date >= today);
  return nextDate || dates[0];
}

function slateGamesForDate(games, targetDate) {
  if (!targetDate) return games || [];
  const filtered = (games || []).filter((game) => game?.date === targetDate);
  return filtered.length ? filtered : (games || []);
}

function isRealGame(game) {
  return Boolean(
    game &&
    game.source &&
    game.source !== "demo" &&
    game.date &&
    game.date !== "Proximo"
  );
}

function isRealTip(tip) {
  return Boolean(
    tip &&
    tip.oddsSource === "Real" &&
    isRealGame(tip.game) &&
    tip.bookmaker &&
    tip.bookmaker !== "Bot"
  );
}

function pickRealityMeta(tip) {
  const realGame = isRealGame(tip?.game);
  const realOdds = Boolean(tip?.oddsSource === "Real" && tip?.bookmaker && tip.bookmaker !== "Bot");

  if (realGame && realOdds) {
    return { key: "real", label: "Real", detail: "Partido y cuota reales" };
  }
  if (realGame || realOdds) {
    return {
      key: "mixed",
      label: "Mixto",
      detail: realGame ? "Partido real con modelo mixto" : "Cuota real con contexto mixto",
    };
  }
  return { key: "estimated", label: "Estimado", detail: "Modelo y cuota estimada" };
}

function trustScoreForTip(tip) {
  if (!tip) return 0;
  const reality = pickRealityMeta(tip);
  const model = Number((tip.modelProbability || 0.52) * 100);
  const confidence = Number(tip.consensusConfidence || tip.confidence || 0);
  const ev = Number(tip.ev || 0);
  const books = Number((tip.books || []).length || 0);
  const validationBoost = tip.validationLevel === "high" ? 8 : tip.validationLevel === "medium" ? 4 : 0;
  const signalBoost = clamp(Number(tip.externalSignalScore || 0) * 3, -9, 9);
  const realityBoost = reality.key === "real" ? 10 : reality.key === "mixed" ? 4 : -4;
  const freshnessBoost = tip.oddsAgeState === "old" ? -6 : 3;
  const booksBoost = books >= 3 ? 4 : books >= 2 ? 2 : 0;
  const riskPenalty = String(tip.riskLabel || "") === "Alto" ? -8 : String(tip.riskLabel || "") === "Medio" ? -3 : 0;
  const oddsPenalty = Number(tip.odds || 0) > 3 ? -6 : 0;

  const score =
    28 +
    clamp((model - 50) * 1.25, 0, 24) +
    clamp((confidence - 52) * 0.7, 0, 14) +
    clamp(ev * 1.15, 0, 24) +
    validationBoost +
    signalBoost +
    realityBoost +
    freshnessBoost +
    booksBoost +
    riskPenalty +
    oddsPenalty;

  return clamp(Math.round(score), 28, 96);
}

function trustTierForTip(tip) {
  const score = trustScoreForTip(tip);
  if (score >= 82) return "elite";
  if (score >= 70) return "high";
  if (score >= 58) return "medium";
  return "low";
}

function trustLabelForTip(tip) {
  const tier = trustTierForTip(tip);
  if (tier === "elite") return "Muy confiable";
  if (tier === "high") return "Confiable";
  if (tier === "medium") return "Jugable";
  return "Volatil";
}

function recommendationGradeMeta(tip) {
  const trust = trustScoreForTip(tip);
  const reality = pickRealityMeta(tip);
  const ev = Number(tip?.ev || 0);
  const model = Number((tip?.modelProbability || 0) * 100);

  if (trust >= 82 && ev >= 8 && model >= 58 && reality.key !== "estimated") {
    return { grade: "A", label: "Top premium", key: "grade-a" };
  }
  if (trust >= 68 && ev >= 5 && model >= 54) {
    return { grade: "B", label: "Buena jugada", key: "grade-b" };
  }
  return { grade: "C", label: "Solo selectiva", key: "grade-c" };
}

function shareVerdictMeta(tip) {
  const confidence = Number(tip?.consensusConfidence || tip?.confidence || 0);
  const edge = Number(tip?.edge || 0);
  const ev = Number(tip?.ev || 0);

  if (confidence >= 70 && edge >= 8 && ev >= 6) {
    return { key: "good", label: "Buena" };
  }
  if (confidence >= 60 && edge >= 3 && ev >= 1) {
    return { key: "medium", label: "Media" };
  }
  return { key: "risky", label: "Arriesgada" };
}

function shareTipText(tip) {
  const verdict = shareVerdictMeta(tip);
  const competition = competitionClassMeta(tip);
  return [
    `${tip.game.away} @ ${tip.game.home}`,
    `${tip.type}: ${tip.pick}`,
    competition.label,
    `${tip.bookmaker} ${Number(tip.odds).toFixed(2)}x`,
    `Modelo ${toPercent((tip.modelProbability || 0) * 100)} · EV ${tip.ev > 0 ? "+" : ""}${tip.ev}%`,
    `Sello: ${verdict.label}`,
  ].join("\n");
}

function renderShareCard(tip) {
  if (!tip) {
    els.shareImagePreview.innerHTML = `<div class="empty">Selecciona un pick con el boton Imagen.</div>`;
    els.shareImageMeta.innerHTML = `<div class="empty">Todavia no hay pick listo para redes.</div>`;
    return;
  }

  const verdict = shareVerdictMeta(tip);
  const reality = pickRealityMeta(tip);
  const competition = competitionClassMeta(tip);
  els.shareImagePreview.innerHTML = `
    <article class="share-card">
      <div class="share-card-head">
        <span class="share-brand">Betting Bot Codex</span>
        <span class="share-verdict ${verdict.key}">${verdict.label}</span>
      </div>
      <div>
        <p class="match share-match">${tip.game.away} @ ${tip.game.home}</p>
        <p class="share-pick"><strong>${tip.type}:</strong> ${tip.pick}</p>
      </div>
      <div class="share-grid">
        <div class="share-stat"><strong>Liga</strong><span>${tip.leagueName || sportProfiles[tip.game.sport].apiName}</span></div>
        <div class="share-stat"><strong>Cuota</strong><span>${tip.bookmaker} ${Number(tip.odds).toFixed(2)}x</span></div>
        <div class="share-stat"><strong>Modelo</strong><span>${toPercent((tip.modelProbability || 0) * 100)}</span></div>
        <div class="share-stat"><strong>EV</strong><span>${tip.ev > 0 ? "+" : ""}${tip.ev}%</span></div>
        <div class="share-stat"><strong>Stake</strong><span>${money(tip.recommendedStake ?? recommendedStakeForTip(tip))}</span></div>
        <div class="share-stat"><strong>Dato</strong><span>${reality.label}</span></div>
        <div class="share-stat"><strong>Competencia</strong><span>${competition.label}</span></div>
      </div>
      <div class="share-card-footer">
        <span class="pill pick-reality ${reality.key}">${reality.detail}</span>
        <span class="pill competition-tag ${competition.key}">${competition.label}</span>
        <span class="pill">${tip.game.date}</span>
      </div>
    </article>
  `;

  els.shareImageMeta.innerHTML = `
    <article class="alert-card">
      <div class="alert-top">
        <strong>Texto listo</strong>
        <span>${verdict.label}</span>
      </div>
      <div class="alert-meta">
        <div>${shareTipText(tip).replace(/\n/g, "<br />")}</div>
      </div>
    </article>
  `;
}

function syncShareCardFromTips(tips) {
  const trackedTip = currentShareTipId ? currentTrackingItems[currentShareTipId]?.payload : null;
  const fallbackTip = trackedTip || tips[0] || null;
  if (fallbackTip) {
    currentShareTipId = tipId(fallbackTip);
  }
  renderShareCard(fallbackTip);
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text || "").split(" ");
  let line = "";
  let cursorY = y;
  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY);
      line = word;
      cursorY += lineHeight;
    } else {
      line = testLine;
    }
  });
  if (line) ctx.fillText(line, x, cursorY);
  return cursorY;
}

function downloadShareImage(tip) {
  if (!tip) return;
  const verdict = shareVerdictMeta(tip);
  const reality = pickRealityMeta(tip);
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#111412";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#1b211e");
  gradient.addColorStop(1, "#101512");
  ctx.fillStyle = gradient;
  ctx.fillRect(60, 60, 960, 1230);

  ctx.strokeStyle = "rgba(244,247,241,0.12)";
  ctx.lineWidth = 3;
  ctx.strokeRect(60, 60, 960, 1230);

  ctx.fillStyle = "#b9c4b8";
  ctx.font = "700 28px Segoe UI";
  ctx.fillText("BETTING BOT CODEX", 110, 130);

  const verdictColor = verdict.key === "good" ? "#52d273" : verdict.key === "medium" ? "#f2c14e" : "#ff6b5f";
  ctx.fillStyle = verdictColor;
  ctx.beginPath();
  ctx.roundRect(780, 95, 150, 48, 24);
  ctx.fill();
  ctx.fillStyle = "#0b110d";
  ctx.font = "900 24px Segoe UI";
  ctx.fillText(verdict.label.toUpperCase(), 810, 128);

  ctx.fillStyle = "#f4f7f1";
  ctx.font = "900 58px Segoe UI";
  wrapCanvasText(ctx, `${tip.game.away} @ ${tip.game.home}`, 110, 250, 820, 70);

  ctx.font = "700 38px Segoe UI";
  ctx.fillStyle = "#f4f7f1";
  wrapCanvasText(ctx, `${tip.type}: ${tip.pick}`, 110, 420, 820, 52);

  const stats = [
    ["Liga", tip.leagueName || sportProfiles[tip.game.sport].apiName],
    ["Cuota", `${tip.bookmaker} ${Number(tip.odds).toFixed(2)}x`],
    ["Modelo", toPercent((tip.modelProbability || 0) * 100)],
    ["EV", `${tip.ev > 0 ? "+" : ""}${tip.ev}%`],
    ["Stake", money(tip.recommendedStake ?? recommendedStakeForTip(tip))],
    ["Dato", reality.label],
  ];

  let boxY = 560;
  stats.forEach((item, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = 110 + col * 420;
    const y = boxY + row * 150;
    ctx.fillStyle = "rgba(16,21,18,0.92)";
    ctx.fillRect(x, y, 360, 110);
    ctx.strokeStyle = "rgba(244,247,241,0.10)";
    ctx.strokeRect(x, y, 360, 110);
    ctx.fillStyle = "#b9c4b8";
    ctx.font = "700 24px Segoe UI";
    ctx.fillText(item[0], x + 22, y + 34);
    ctx.fillStyle = "#f4f7f1";
    ctx.font = "900 30px Segoe UI";
    wrapCanvasText(ctx, item[1], x + 22, y + 76, 315, 34);
  });

  ctx.fillStyle = "#b8d8ff";
  ctx.font = "800 28px Segoe UI";
  ctx.fillText(reality.detail, 110, 1080);
  ctx.fillStyle = "#b9c4b8";
  ctx.font = "700 24px Segoe UI";
  ctx.fillText(tip.game.date, 110, 1130);

  const link = document.createElement("a");
  const slug = `${tip.game.away}-${tip.game.home}-${tip.type}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  link.href = canvas.toDataURL("image/png");
  link.download = `${slug}.png`;
  link.click();
}

function rankRealTopTips(tips) {
  return [...tips]
    .map(applyConsensusAdjustment)
    .sort((a, b) => {
      const realBoostA = a.oddsSource === "Real" ? 3 : 0;
      const realBoostB = b.oddsSource === "Real" ? 3 : 0;
      const scoreA = a.consensusConfidence * 1.15 + a.ev + realBoostA;
      const scoreB = b.consensusConfidence * 1.15 + b.ev + realBoostB;
      return scoreB - scoreA;
    });
}

function cacheRealTopTips(tips, context = {}) {
  const ranked = rankRealTopTips(tips).slice(0, 6).map((tip) => ({
    id: tipId(tip),
    sport: tip.game.sport,
    leagueName: tip.leagueName || context.leagueName || sportProfiles[tip.game.sport].apiName,
    type: tip.type,
    pick: tip.pick,
    match: `${tip.game.away} @ ${tip.game.home}`,
    eventDate: tip.game.date,
    odds: Number(tip.odds.toFixed(2)),
    bookmaker: tip.bookmaker,
    consensusConfidence: Number(tip.consensusConfidence?.toFixed ? tip.consensusConfidence.toFixed(1) : tip.consensusConfidence),
    ev: Number(tip.ev.toFixed(1)),
    reason: tip.reason,
    cachedAt: new Date().toISOString(),
  }));

  const cache = loadTopCache();
  cache[context.sport || els.sport.value] = {
    sport: context.sport || els.sport.value,
    leagueId: context.leagueId || els.league.value,
    leagueName: context.leagueName || selectedLeagueMeta()?.name || "",
    updatedAt: new Date().toISOString(),
    items: ranked,
  };
  saveTopCache(cache);
}

function combinedCachedTopTips() {
  return Object.values(loadTopCache())
    .flatMap((entry) => entry.items || [])
    .sort((a, b) => b.consensusConfidence - a.consensusConfidence || b.ev - a.ev);
}

function tipId(tip) {
  return `tip-${stableId(`${tip.game.sport}-${tip.game.date}-${tip.game.away}-${tip.game.home}-${tip.type}-${tip.pick}-${tip.odds}`)}`;
}

function parlayId(parlay) {
  return `parlay-${stableId(`${parlay.name}-${parlay.legs.map((tip) => tipId(tip)).join("-")}-${parlay.odds}`)}`;
}

function findOddsEvent(game) {
  return currentOddsBook.find((event) => {
    const sameHome = namesMatch(event.home_team, game.home);
    const sameAway = namesMatch(event.away_team, game.away);
    const swappedHome = namesMatch(event.home_team, game.away);
    const swappedAway = namesMatch(event.away_team, game.home);
    return (sameHome && sameAway) || (swappedHome && swappedAway);
  });
}

function getMarket(event, key) {
  return event.bookmakers
    ?.flatMap((bookmaker) => bookmaker.markets?.map((market) => ({ ...market, bookmaker: bookmaker.title })) || [])
    .find((market) => market.key === key);
}

function getMarkets(event, key) {
  return event.bookmakers
    ?.flatMap((bookmaker) => bookmaker.markets?.map((market) => ({ ...market, bookmaker: bookmaker.title })) || [])
    .filter((market) => market.key === key) || [];
}

function bestOutcome(market, predicate) {
  const outcomes = market?.outcomes || [];
  const matches = outcomes.filter(predicate).filter((outcome) => Number.isFinite(Number(outcome.price)));
  if (!matches.length) return null;
  return matches.sort((a, b) => Number(b.price) - Number(a.price))[0];
}

function allOutcomes(markets, predicate) {
  return markets.flatMap((market) =>
    (market.outcomes || [])
      .filter(predicate)
      .filter((outcome) => Number.isFinite(Number(outcome.price)))
      .map((outcome) => ({
        bookmaker: market.bookmaker,
        price: Number(outcome.price),
        point: outcome.point,
        name: outcome.name,
        updatedAt: market.last_update || market.updatedAt || null,
      }))
  ).sort((a, b) => b.price - a.price);
}

function findRealOdds(tip) {
  const event = findOddsEvent(tip.game);
  if (!event) return null;

  if (tip.type === "Ganador") {
    const markets = getMarkets(event, "h2h");
    const outcome = allOutcomes(markets, (item) => namesMatch(item.name, tip.targetTeam))[0];
    if (!outcome) return null;
    return { market: "Moneyline", price: Number(outcome.price), bookmaker: outcome.bookmaker, books: allOutcomes(markets, (item) => namesMatch(item.name, tip.targetTeam)) };
  }

  if (tip.type === "Over/Under") {
    const markets = getMarkets(event, "totals");
    const target = tip.totalSide || (tip.pick.startsWith("Over") ? "Over" : "Under");
    const matches = allOutcomes(markets, (item) => item.name === target);
    const outcome = matches[0];
    if (!outcome) return null;
    return { market: "Totales", price: Number(outcome.price), bookmaker: outcome.bookmaker, line: outcome.point, books: matches };
  }

  if (tip.type === "Spread") {
    const markets = getMarkets(event, "spreads");
    const matches = allOutcomes(markets, (item) => namesMatch(item.name, tip.targetTeam));
    const outcome = matches[0];
    if (!outcome) return null;
    return { market: tip.game.sport === "mlb" ? "Run line" : "Spread", price: Number(outcome.price), bookmaker: outcome.bookmaker, line: outcome.point, books: matches };
  }

  return null;
}

function estimateDecimalOdds(tip, profile) {
  if (tip.odds) return tip.odds;
  const base = 100 / clamp(tip.confidence, 42, 82);
  const typeBoosts = {
    Ganador: 0.08,
    "Over/Under": 0.16,
    Spread: 0.13,
    "Ambos anotan": 0.2,
  };
  return clamp(base + (typeBoosts[tip.type] || 0.12) + profile.boost, 1.18, profile.maxLegOdds);
}

function impliedProbabilityFromOdds(decimalOdds) {
  return Number((1 / Math.max(Number(decimalOdds) || 1.01, 1.01)).toFixed(4));
}

function modelProbabilityFromTip(tip) {
  return Number(clamp((tip.consensusConfidence || tip.confidence || 0) / 100, 0.45, 0.82).toFixed(4));
}

function riskLabelForTip(tip) {
  const probability = tip.modelProbability || modelProbabilityFromTip(tip);
  if ((tip.odds || 0) >= 2.35 || probability < 0.58) return "Alto";
  if ((tip.odds || 0) >= 1.85 || probability < 0.64) return "Medio";
  return "Bajo";
}

function isStaleOdds(tip) {
  if (!tip.oddsUpdatedAt) return false;
  const updated = new Date(tip.oddsUpdatedAt);
  if (Number.isNaN(updated.getTime())) return false;
  const ageHours = (Date.now() - updated.getTime()) / 3600000;
  return ageHours > 12;
}

function enrichValueMetrics(tip) {
  const modelProbability = modelProbabilityFromTip(tip);
  const impliedProbability = impliedProbabilityFromOdds(tip.odds);
  const evDecimal = (modelProbability * Number(tip.odds || 0)) - 1;
  const ev = Number((evDecimal * 100).toFixed(1));
  const recommendedStake = recommendedStakeFromEdge(modelProbability, tip.odds);
  const eventId = stableId(`${tip.game?.sport || ""}|${tip.game?.date || ""}|${tip.game?.away || ""}|${tip.game?.home || ""}`);
  return {
    ...tip,
    eventId,
    sport: tip.game?.sport,
    league: tip.leagueName || selectedLeagueMeta()?.name || sportProfiles[tip.game?.sport]?.apiName || "",
    homeTeam: tip.game?.home || "",
    awayTeam: tip.game?.away || "",
    startTime: tip.game?.date || "",
    selection: tip.pick,
    sportsbook: tip.bookmaker,
    riskLevel: riskLabelForTip({ ...tip, modelProbability, ev }),
    status: tip.analysisOnly ? "analysis" : "active",
    impliedProbability,
    modelProbability,
    evDecimal: Number(evDecimal.toFixed(4)),
    ev,
    edge: ev,
    recommendedStake,
    valueTier: valueTier(ev),
    valueLabel: valueLabel(ev),
    riskLabel: riskLabelForTip({ ...tip, modelProbability, ev }),
    oddsAgeState: isStaleOdds(tip) ? "old" : "fresh",
  };
}

function passesValueFilters(tip, seen = new Set(), options = {}) {
  const reject = (reason) => ({ passed: false, reason });
  const key = `${tip.game?.date}|${tip.game?.away}|${tip.game?.home}|${tip.market}|${Number(tip.odds).toFixed(2)}`;
  const minEv = options.strongOnly ? 0.10 : 0.05;
  if (seen.has(key)) return reject("odds duplicadas");
  if (!tip.game?.date || tip.game.date === "Proximo") return reject("fecha no confirmada");
  if (Number(tip.odds) < 1.5 || Number(tip.odds) > 4) return reject("cuota fuera de rango");
  if ((tip.modelProbability || 0) < 0.52) return reject("probabilidad modelo baja");
  if (((tip.modelProbability || 0) - (tip.impliedProbability || 0)) < 0.03) return reject("edge insuficiente");
  if ((tip.evDecimal || 0) < minEv) return reject("EV bajo");
  if (tip.oddsAgeState === "old") return reject("odds viejas");
  seen.add(key);
  return { passed: true, reason: "" };
}

function createOdds(tip) {
  const realOdds = findRealOdds(tip);
  if (realOdds) {
    return enrichValueMetrics({
      ...tip,
      market: realOdds.market,
      odds: realOdds.price,
      fairOdds: Number((1 / modelProbabilityFromTip(tip)).toFixed(2)),
      bookmaker: realOdds.bookmaker,
      oddsSource: "Real",
      line: realOdds.line,
      books: realOdds.books || [],
      oddsUpdatedAt: realOdds.updatedAt || null,
    });
  }

  const config = marketConfig[tip.game.sport]?.[tip.type] || { market: tip.type, fairMin: 1.55, fairMax: 2.25 };
  const implied = 1 / modelProbabilityFromTip(tip);
  const volatility = tip.type === "Ganador" ? 0.08 : 0.16;
  const fairOdds = clamp(implied + volatility, config.fairMin, config.fairMax);
  const marketOdds = clamp(fairOdds + ((hashScore(tip.pick) % 17) - 8) / 100, config.fairMin, config.fairMax + 0.18);
  return enrichValueMetrics({
    ...tip,
    market: config.market,
    odds: Number(marketOdds.toFixed(2)),
    fairOdds: Number(fairOdds.toFixed(2)),
    bookmaker: "Bot",
    oddsSource: "Estimada",
    books: [],
    oddsUpdatedAt: new Date().toISOString(),
  });
}

function createTicketEntryFromTip(tip, stake = recommendedStakeForTip(tip)) {
  return {
    id: tipId(tip),
    type: "pick",
    label: `${tip.type}: ${tip.pick}`,
    match: `${tip.game.away} @ ${tip.game.home}`,
    odds: Number(tip.odds.toFixed(2)),
    ev: Number(tip.ev.toFixed(1)),
    stake: Number(stake.toFixed(2)),
    bookmaker: tip.bookmaker,
    bestBook: tip.bookmaker,
  };
}

function createTicketEntryFromParlay(parlay, stake = recommendedStakeForParlay(parlay)) {
  return {
    id: parlayId(parlay),
    type: "parlay",
    label: parlay.name,
    match: `${parlay.legs.length} selecciones`,
    odds: Number(parlay.odds.toFixed(2)),
    ev: Number((parlay.legs.reduce((sum, leg) => sum + leg.ev, 0)).toFixed(1)),
    stake: Number(stake.toFixed(2)),
    bookmaker: "Mixto",
    bestBook: "Mixto",
    legs: parlay.legs.map((leg) => `${leg.type}: ${leg.pick}`),
  };
}

function renderTicket() {
  const items = loadTicket();
  if (!items.length) {
    els.ticketSummary.textContent = "Todavia no hay picks en el ticket.";
    els.ticketList.innerHTML = `<div class="empty">Agrega picks o parlays desde las tarjetas.</div>`;
    return;
  }

  const totalStake = items.reduce((sum, item) => sum + item.stake, 0);
  const combinedOdds = items.reduce((product, item) => product * item.odds, 1);
  const totalEv = items.reduce((sum, item) => sum + item.ev, 0);
  els.ticketSummary.textContent = `${items.length} jugada(s) · stake total ${money(totalStake)} · cuota combinada ${combinedOdds.toFixed(2)}x · EV total ${totalEv > 0 ? "+" : ""}${totalEv.toFixed(1)}%`;

  els.ticketList.innerHTML = items.map((item) => `
    <article class="alert-card">
      <div class="alert-top">
        <strong>${item.label}</strong>
        <span>${item.odds.toFixed(2)}x</span>
      </div>
      <div class="alert-meta">
        <div>${item.match}</div>
        <div>Stake ${money(item.stake)} · EV ${item.ev > 0 ? "+" : ""}${item.ev}% · Mejor book ${item.bestBook}</div>
        ${item.legs ? `<div>${item.legs.join(" | ")}</div>` : ""}
      </div>
      <div class="track-row">
        <button class="ghost-btn" type="button" data-ticket-remove="${item.id}">Quitar</button>
      </div>
    </article>
  `).join("");
}

function uniqueByGame(tips) {
  const seen = new Set();
  return tips.filter((tip) => {
    const key = gameKey(tip);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildParlay(name, className, risk, tips, profile) {
  const ordered = profile.sorter(tips).filter((tip) => tip.confidence >= profile.minConfidence);
  let legs = uniqueByGame(ordered).slice(0, profile.legs);

  if (legs.length < profile.minLegs) {
    legs = uniqueByGame(profile.sorter(tips)).slice(0, profile.minLegs);
  }

  const odds = legs.reduce((product, tip) => product * estimateDecimalOdds(tip, profile), 1);
  const hitRate = legs.reduce((product, tip) => product * (tip.confidence / 100), 1) * 100;

  return {
    name,
    className,
    risk,
    legs,
    odds,
    hitRate,
    note: profile.note,
  };
}

function buildParlays(tips) {
  const profiles = [
    {
      name: "Parlay seguro",
      className: "safe",
      risk: "Bajo",
      legs: 2,
      minLegs: 2,
      minConfidence: 60,
      boost: 0.02,
      maxLegOdds: 1.7,
      sorter: (items) => [...items].sort((a, b) => b.confidence - a.confidence),
      note: "El mas conservador: pocas selecciones y la mayor confianza disponible.",
    },
    {
      name: "Parlay del sueño",
      className: "dream",
      risk: "Medio",
      legs: 4,
      minLegs: 3,
      minConfidence: 54,
      boost: 0.18,
      maxLegOdds: 2.05,
      sorter: (items) => [...items].sort((a, b) => Math.abs(59 - a.confidence) - Math.abs(59 - b.confidence)),
      note: "Balance entre confianza y pago potencial. Mas piernas, mas volatilidad.",
    },
    {
      name: "Parlay bomba",
      className: "bomb",
      risk: "Alto",
      legs: 6,
      minLegs: 4,
      minConfidence: 45,
      boost: 0.42,
      maxLegOdds: 2.55,
      sorter: (items) => [...items].sort((a, b) => a.confidence - b.confidence),
      note: "Agresivo y dificil. Solo para stake pequeno o diversion.",
    },
  ];

  return profiles
    .map((profile) => buildParlay(profile.name, profile.className, profile.risk, tips, profile))
    .filter((parlay) => parlay.legs.length >= 2);
}

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(historyStorageKey)) || [];
  } catch (error) {
    return [];
  }
}

function saveHistory(items) {
  localStorage.setItem(historyStorageKey, JSON.stringify(items.slice(0, 500)));
  postBackend("/api/storage/history", { items: items.slice(0, 500) });
}

function profitFor(record) {
  const stake = Number(record.stake) || 1;
  if (record.result === "win") return stake * (record.odds - 1);
  if (record.result === "loss") return -stake;
  return 0;
}

function clvFor(record) {
  if (!Number.isFinite(Number(record.closingOdds))) return null;
  return Number((((Number(record.odds) / Number(record.closingOdds)) - 1) * 100).toFixed(1));
}

function csvEscape(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, "\"\"")}"`;
}

function groupMetrics(records, key) {
  const groups = {};

  records.forEach((record) => {
    const bucket = record[key] || "Sin dato";
    if (!groups[bucket]) {
      groups[bucket] = { total: 0, settled: 0, wins: 0, profit: 0, risk: 0 };
    }
    groups[bucket].total += 1;
    if (record.result !== "pending") {
      groups[bucket].settled += 1;
      groups[bucket].wins += record.result === "win" ? 1 : 0;
      groups[bucket].profit += profitFor(record);
      groups[bucket].risk += Number(record.stake) || 1;
    }
  });

  return Object.entries(groups)
    .map(([label, stats]) => ({
      label,
      total: stats.total,
      winRate: stats.settled ? (stats.wins / stats.settled) * 100 : 0,
      roi: stats.risk ? (stats.profit / stats.risk) * 100 : 0,
      profit: stats.profit,
    }))
    .sort((a, b) => b.total - a.total || a.label.localeCompare(b.label));
}

function groupClv(records, key) {
  const groups = {};
  records
    .filter((record) => Number.isFinite(Number(record.clv)))
    .forEach((record) => {
      const bucket = record[key] || "Sin dato";
      if (!groups[bucket]) groups[bucket] = { total: 0, clv: 0 };
      groups[bucket].total += 1;
      groups[bucket].clv += Number(record.clv);
    });

  return Object.entries(groups)
    .map(([label, stats]) => ({
      label,
      total: stats.total,
      avgClv: stats.total ? stats.clv / stats.total : 0,
    }))
    .sort((a, b) => b.total - a.total || b.avgClv - a.avgClv);
}

function drawdownForRecords(records) {
  const settled = [...records]
    .filter((record) => record.result !== "pending")
    .sort((a, b) => new Date(a.updatedAt || a.createdAt || `${a.eventDate}T00:00:00`) - new Date(b.updatedAt || b.createdAt || `${b.eventDate}T00:00:00`));

  let equity = 100;
  let peak = equity;
  let maxDrawdown = 0;

  settled.forEach((record) => {
    equity += profitFor(record);
    peak = Math.max(peak, equity);
    const drawdown = peak ? ((peak - equity) / peak) * 100 : 0;
    maxDrawdown = Math.max(maxDrawdown, drawdown);
  });

  return Number(maxDrawdown.toFixed(2));
}

function groupDrawdown(records, key) {
  const groups = {};
  records.forEach((record) => {
    const bucket = record[key] || "Sin dato";
    if (!groups[bucket]) groups[bucket] = [];
    groups[bucket].push(record);
  });

  return Object.entries(groups)
    .map(([label, items]) => ({
      label,
      total: items.length,
      drawdown: drawdownForRecords(items),
      roi: groupMetrics(items, key).find((item) => item.label === label)?.roi || 0,
    }))
    .sort((a, b) => b.total - a.total || a.drawdown - b.drawdown);
}

function groupYield(records, key) {
  const groups = {};
  records.forEach((record) => {
    const bucket = record[key] || "Sin dato";
    if (!groups[bucket]) groups[bucket] = { total: 0, settled: 0, profit: 0, risk: 0 };
    groups[bucket].total += 1;
    if (record.result !== "pending") {
      groups[bucket].settled += 1;
      groups[bucket].profit += profitFor(record);
      groups[bucket].risk += Number(record.stake) || 1;
    }
  });

  return Object.entries(groups)
    .map(([label, stats]) => ({
      label,
      total: stats.total,
      settled: stats.settled,
      yield: stats.risk ? (stats.profit / stats.risk) * 100 : 0,
      profit: stats.profit,
    }))
    .sort((a, b) => b.total - a.total || b.yield - a.yield);
}

function renderClvBreakdown(target, items, emptyLabel) {
  if (!items.length) {
    target.innerHTML = `<div class="empty">${emptyLabel}</div>`;
    return;
  }

  target.innerHTML = items.map((item) => `
    <div class="breakdown-row">
      <strong>${item.label}</strong>
      <span>${item.total} regs</span>
      <span>CLV prom.</span>
      <span>${item.avgClv > 0 ? "+" : ""}${item.avgClv.toFixed(1)}%</span>
    </div>
  `).join("");
}

function renderDrawdownBreakdown(target, items, emptyLabel) {
  if (!items.length) {
    target.innerHTML = `<div class="empty">${emptyLabel}</div>`;
    return;
  }

  target.innerHTML = items.map((item) => `
    <div class="breakdown-row">
      <strong>${item.label}</strong>
      <span>${item.total} regs</span>
      <span>Drawdown max</span>
      <span>${toPercent(item.drawdown)}</span>
    </div>
  `).join("");
}

function renderYieldBreakdown(target, items, emptyLabel) {
  if (!items.length) {
    target.innerHTML = `<div class="empty">${emptyLabel}</div>`;
    return;
  }

  target.innerHTML = items.map((item) => `
    <div class="breakdown-row">
      <strong>${item.label}</strong>
      <span>${item.total} regs</span>
      <span>Yield</span>
      <span>${toPercent(item.yield)} (${money(item.profit)})</span>
    </div>
  `).join("");
}

function renderBreakdown(target, items, emptyLabel) {
  if (!items.length) {
    target.innerHTML = `<div class="empty">${emptyLabel}</div>`;
    return;
  }

  target.innerHTML = items.map((item) => `
    <div class="breakdown-row">
      <strong>${item.label}</strong>
      <span>${item.total} regs</span>
      <span>${toPercent(item.winRate)} acierto</span>
      <span>${toPercent(item.roi)} ROI (${money(item.profit)})</span>
    </div>
  `).join("");
}

function backtestFilters() {
  return {
    from: els.backtestFromDate?.value || "",
    to: els.backtestToDate?.value || "",
    source: els.backtestSourceFilter?.value || "all",
  };
}

function auditMinSampleValue() {
  return Math.max(1, Number(els.auditMinSample?.value || 5));
}

function filterAuditGroupItems(items) {
  const minSample = auditMinSampleValue();
  return (items || []).filter((item) => (item.total || 0) >= minSample);
}

function confidenceBucketForRecord(record) {
  const confidence = Number(record.confidence || 0);
  if (confidence >= 70) return "70+";
  if (confidence >= 60) return "60-69";
  if (confidence >= 50) return "50-59";
  return "40-49";
}

function recordAuditDate(record) {
  return record.eventDate || (record.createdAt ? String(record.createdAt).slice(0, 10) : "");
}

function inDateRange(record, from, to) {
  const date = recordAuditDate(record);
  if (!date) return true;
  if (from && date < from) return false;
  if (to && date > to) return false;
  return true;
}

function applyBacktestFilters(history, paper) {
  const { from, to, source } = backtestFilters();
  const filteredHistory = history.filter((record) => inDateRange(record, from, to));
  const filteredPaper = paper.filter((record) => inDateRange(record, from, to));

  let auditRecords = [...filteredPaper];
  if (source === "history") auditRecords = [...filteredHistory];
  if (source === "all") auditRecords = [...filteredHistory, ...filteredPaper];

  return {
    filteredHistory,
    filteredPaper,
    auditRecords,
    source,
  };
}

function rankingCard(title, item, suffix = "") {
  if (!item) {
    return `
      <article class="alert-card">
        <div class="alert-top">
          <strong>${title}</strong>
          <span>Sin dato</span>
        </div>
        <div class="alert-meta">
          <div>Todavia no hay muestra cerrada suficiente.</div>
        </div>
      </article>
    `;
  }

  return `
    <article class="alert-card">
      <div class="alert-top">
        <strong>${title}</strong>
        <span>${item.label}</span>
      </div>
      <div class="alert-meta">
        <div>${item.total} regs${suffix ? ` · ${suffix}` : ""}</div>
        <div>${toPercent(item.winRate)} acierto · ${toPercent(item.roi)} ROI (${money(item.profit)})</div>
      </div>
    </article>
  `;
}

function renderAuditRanking(records) {
  const settled = records.filter((record) => record.result !== "pending");
  if (!settled.length) {
    els.auditRankingPanel.innerHTML = `<div class="empty">Todavia no hay datos suficientes para ranking.</div>`;
    return;
  }

  const sportStats = filterAuditGroupItems(groupMetrics(records, "sport").filter((item) => item.total > 0));
  const marketStats = filterAuditGroupItems(groupMetrics(records, "market").filter((item) => item.total > 0));
  const modeStats = filterAuditGroupItems(groupMetrics(records, "betMode").filter((item) => item.total > 0 && item.label !== "Sin dato"));

  const bestSport = [...sportStats].sort((a, b) => b.roi - a.roi || b.winRate - a.winRate || b.total - a.total)[0];
  const bestMarket = [...marketStats].sort((a, b) => b.roi - a.roi || b.winRate - a.winRate || b.total - a.total)[0];
  const bestMode = [...modeStats].sort((a, b) => b.roi - a.roi || b.winRate - a.winRate || b.total - a.total)[0];
  const worstMode = [...modeStats].sort((a, b) => a.roi - b.roi || a.winRate - b.winRate || b.total - a.total)[0];

  els.auditRankingPanel.innerHTML = [
    rankingCard("Mejor deporte", bestSport),
    rankingCard("Mejor mercado", bestMarket),
    rankingCard("Mejor modo", bestMode),
    rankingCard("Peor modo", worstMode),
  ].join("");
}

function groupConfidenceMetrics(records) {
  const enriched = records.map((record) => ({ ...record, confidenceBucket: confidenceBucketForRecord(record) }));
  return groupMetrics(enriched, "confidenceBucket").sort((a, b) => {
    const order = { "70+": 0, "60-69": 1, "50-59": 2, "40-49": 3 };
    return (order[a.label] ?? 99) - (order[b.label] ?? 99);
  });
}

function renderNoBetAudit(records) {
  const decisions = loadBetModeHistory().filter((entry) => entry.noBet);
  if (!decisions.length) {
    els.auditNoBetPanel.innerHTML = `<div class="empty">Todavia no hay jornadas marcadas como No apostar hoy.</div>`;
    return;
  }

  const byKey = {};
  records
    .filter((record) => record.result !== "pending")
    .forEach((record) => {
      const key = `${record.eventDate}|${record.sport}|${record.league || ""}`;
      if (!byKey[key]) byKey[key] = { profit: 0, count: 0 };
      byKey[key].profit += profitFor(record);
      byKey[key].count += 1;
    });

  const audited = decisions.map((entry) => {
    const key = `${entry.date}|${entry.sport}|${entry.league || ""}`;
    const result = byKey[key] || { profit: 0, count: 0 };
    return { ...entry, profit: result.profit, count: result.count };
  }).filter((entry) => entry.count > 0);

  if (!audited.length) {
    els.auditNoBetPanel.innerHTML = `<div class="empty">Todavia no hay muestra cerrada para evaluar los No bet.</div>`;
    return;
  }

  const protectedDays = audited.filter((entry) => entry.profit < 0).length;
  const missedPositive = audited.filter((entry) => entry.profit > 0).length;
  const flatDays = audited.filter((entry) => entry.profit === 0).length;
  const avgProfit = audited.reduce((sum, entry) => sum + entry.profit, 0) / audited.length;

  els.auditNoBetPanel.innerHTML = `
    <article class="alert-card">
      <div class="alert-top">
        <strong>No bet auditado</strong>
        <span>${audited.length} dias</span>
      </div>
      <div class="alert-meta">
        <div>Protegio ${protectedDays} jornada(s) negativas · dejo pasar ${missedPositive} positiva(s) · neutras ${flatDays}</div>
        <div>Resultado medio si hubieras entrado: ${money(avgProfit)}</div>
      </div>
    </article>
  `;
}

function currentModePackageForAudit() {
  return effectiveBetMode(window.__lastRenderedTips || []);
}

function buildPaperTradeRecord(tip, modePackage, stake = recommendedStakeForTip(tip)) {
  return {
    id: `paper-${tipId(tip)}-${isoToday()}`,
    createdAt: new Date().toISOString(),
    eventDate: tip.game.date,
    sport: sportProfiles[tip.game.sport].apiName,
    league: tip.leagueName || sportProfiles[tip.game.sport].apiName,
    market: tip.market,
    pickType: tip.type,
    title: `${tip.game.away} @ ${tip.game.home}`,
    pick: `${tip.type}: ${tip.pick}`,
    odds: tip.odds,
    stake,
    confidence: Math.round(tip.confidence),
    modelProbability: tip.modelProbability,
    impliedProbability: tip.impliedProbability,
    ev: tip.ev,
    valueTier: tip.valueTier,
    valueLabel: tip.valueLabel,
    riskLabel: tip.riskLabel,
    betMode: modePackage.mode,
    noBetDay: Boolean(modePackage.noBet),
    result: "pending",
    game: {
      home: tip.game.home,
      away: tip.game.away,
      sport: tip.game.sport,
    },
    tipMeta: {
      type: tip.type,
      targetTeam: tip.targetTeam || "",
      totalSide: tip.totalSide || "",
      bttsPick: tip.pick,
    },
  };
}

function runPaperTrading(tips, { force = false } = {}) {
  if (!tips.length) return;
  const modePackage = currentModePackageForAudit();
  const ranked = rankRealTopTips(tips).slice(0, 3);
  const paper = loadPaperTrades();
  let changed = false;

  ranked.forEach((tip) => {
    const record = buildPaperTradeRecord(tip, modePackage);
    const index = paper.findIndex((item) => item.id === record.id);
    if (index >= 0 && !force) return;
    if (index >= 0) {
      paper[index] = record;
    } else {
      paper.unshift(record);
    }
    changed = true;
  });

  if (changed) {
    savePaperTrades(paper);
    renderAuditPanel();
    log(`Paper trading: ${ranked.length} pick(s) registrados para auditoria.`);
  }
}

function autoGradePaperTrades(finalGames) {
  const paper = loadPaperTrades();
  let changed = 0;
  const updated = paper.map((record) => {
    if (record.result !== "pending") return record;
    const finalGame = findFinalGame(finalGames, record.game, record.eventDate);
    const outcome = gradeLeg({ ...record.tipMeta, game: record.game }, finalGame);
    if (outcome === null) return record;
    changed += 1;
    return { ...record, result: outcome ? "win" : "loss", updatedAt: new Date().toISOString(), autoGraded: true };
  });

  if (changed) {
    savePaperTrades(updated);
    renderAuditPanel();
    log(`Paper trading: ${changed} registro(s) cerrados automaticamente.`);
  }
}

function renderBacktestSummary(history, paper) {
  const settledHistory = history.filter((record) => record.result !== "pending");
  const settledPaper = paper.filter((record) => record.result !== "pending");
  const { source } = backtestFilters();
  const sourceLabel = source === "history" ? "Historial real" : source === "paper" ? "Paper trading" : "Muestra combinada";

  if (!settledHistory.length && !settledPaper.length) {
    els.backtestSummary.innerHTML = `<div class="empty">Todavia no hay muestra cerrada suficiente para backtesting.</div>`;
    return;
  }

  const historyRisk = settledHistory.reduce((sum, record) => sum + (Number(record.stake) || 1), 0);
  const paperRisk = settledPaper.reduce((sum, record) => sum + (Number(record.stake) || 1), 0);
  const historyProfit = settledHistory.reduce((sum, record) => sum + profitFor(record), 0);
  const paperProfit = settledPaper.reduce((sum, record) => sum + profitFor(record), 0);
  const historyRoi = historyRisk ? (historyProfit / historyRisk) * 100 : 0;
  const paperRoi = paperRisk ? (paperProfit / paperRisk) * 100 : 0;
  const modeStats = groupMetrics([...history, ...paper], "betMode").filter((item) => item.label !== "Sin dato");
  const bestMode = modeStats[0]?.label || "Sin dato";

  els.backtestSummary.innerHTML = `
    <article class="alert-card">
      <div class="alert-top">
        <strong>Backtest rapido</strong>
        <span>${settledHistory.length + settledPaper.length} cierres</span>
      </div>
      <div class="alert-meta">
        <div>Historial ROI ${toPercent(historyRoi)} · Paper ROI ${toPercent(paperRoi)}</div>
        <div>Mejor modo observado: ${bestMode}</div>
      </div>
    </article>
  `;
}

function renderAuditPanel() {
  const paper = loadPaperTrades();
  const history = loadHistory();
  const { filteredHistory, filteredPaper, auditRecords, source } = applyBacktestFilters(history, paper);
  const settled = filteredPaper.filter((record) => record.result !== "pending");
  const wins = settled.filter((record) => record.result === "win").length;
  const profit = settled.reduce((sum, record) => sum + profitFor(record), 0);
  const risk = settled.reduce((sum, record) => sum + (Number(record.stake) || 1), 0);
  const roi = risk ? (profit / risk) * 100 : 0;
  const winRate = settled.length ? (wins / settled.length) * 100 : 0;

  els.paperCount.textContent = filteredPaper.length;
  els.paperPending.textContent = filteredPaper.filter((record) => record.result === "pending").length;
  els.paperWinRate.textContent = toPercent(winRate);
  els.paperRoi.textContent = toPercent(roi);
  els.paperProfit.textContent = money(profit);
  renderBreakdown(els.paperModeBreakdown, filterAuditGroupItems(groupMetrics(filteredPaper, "betMode")), "Todavia no hay paper trades por modo.");
  renderBreakdown(els.paperSportBreakdown, filterAuditGroupItems(groupMetrics(filteredPaper, "sport")), "Todavia no hay paper trades por deporte.");
  renderBreakdown(els.paperMarketBreakdown, filterAuditGroupItems(groupMetrics(filteredPaper, "market")), "Todavia no hay paper trades por mercado.");
  renderBreakdown(
    els.auditModeRoiBreakdown,
    filterAuditGroupItems(groupMetrics(auditRecords, "betMode").filter((item) => source !== "history" || item.label !== "Sin dato")),
    "Todavia no hay muestra suficiente por modo."
  );
  renderClvBreakdown(
    els.auditModeClvBreakdown,
    filterAuditGroupItems(groupClv(auditRecords, "betMode").filter((item) => item.label !== "Sin dato")),
    "Todavia no hay CLV suficiente por modo."
  );
  renderBreakdown(
    els.auditConfidenceBreakdown,
    filterAuditGroupItems(groupConfidenceMetrics(auditRecords)),
    "Todavia no hay muestra suficiente por rango de confianza."
  );
  renderBreakdown(
    els.auditValueBreakdown,
    filterAuditGroupItems(groupMetrics(auditRecords, "valueLabel")),
    "Todavia no hay muestra suficiente por banda de valor."
  );
  renderDrawdownBreakdown(
    els.auditModeDrawdownBreakdown,
    filterAuditGroupItems(groupDrawdown(auditRecords, "betMode").filter((item) => source !== "history" || item.label !== "Sin dato")),
    "Todavia no hay muestra suficiente para drawdown por modo."
  );
  renderYieldBreakdown(
    els.auditYieldBreakdown,
    filterAuditGroupItems([
      ...groupYield(auditRecords, "sport").map((item) => ({ ...item, label: `Deporte · ${item.label}` })),
      ...groupYield(auditRecords, "market").map((item) => ({ ...item, label: `Mercado · ${item.label}` })),
    ]),
    "Todavia no hay muestra suficiente para yield por deporte y mercado."
  );
  renderBacktestSummary(filteredHistory, filteredPaper);
  renderAuditRanking(auditRecords);
  renderNoBetAudit(auditRecords);
}

function findFinalGame(finalGames, metaGame, eventDate) {
  return finalGames.find((game) => {
    const sameTeams =
      namesMatch(game.home, metaGame.home) &&
      namesMatch(game.away, metaGame.away);
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

function autoGradeHistory(finalGames) {
  if (!els.autoGrade.checked || !finalGames.length) return;

  const history = loadHistory();
  let changed = 0;
  const updated = history.map((record) => {
    if (record.result !== "pending") return record;

    if (record.kind === "Pick" && record.game) {
      const finalGame = findFinalGame(finalGames, record.game, record.eventDate);
      const outcome = gradeLeg({ ...record.tipMeta, game: record.game }, finalGame);
      if (outcome === null) return record;
      changed += 1;
      return { ...record, result: outcome ? "win" : "loss", updatedAt: new Date().toISOString(), autoGraded: true };
    }

    if (record.kind === "Parlay" && Array.isArray(record.legs)) {
      const legResults = record.legs.map((leg) => {
        const finalGame = findFinalGame(finalGames, leg.game, leg.game.date || record.eventDate);
        return gradeLeg(leg, finalGame);
      });
      if (legResults.some((result) => result === null)) return record;
      changed += 1;
      return { ...record, result: legResults.every(Boolean) ? "win" : "loss", updatedAt: new Date().toISOString(), autoGraded: true };
    }

    return record;
  });

  if (changed) {
    saveHistory(updated);
    renderStatsSnapshot();
    autoGradePaperTrades(finalGames);
    renderAuditPanel();
    log(`Auto evaluacion: ${changed} registro(s) actualizados con marcador final.`);
  }
}

function getFilters() {
  return {
    from: els.historyFromDate.value,
    to: els.historyToDate.value,
    sport: els.historySportFilter.value,
    market: els.historyMarketFilter.value,
    league: els.historyLeagueFilter.value,
  };
}

function applyHistoryFilters(history) {
  const filters = getFilters();
  return history.filter((record) => {
    if (filters.from && record.eventDate < filters.from) return false;
    if (filters.to && record.eventDate > filters.to) return false;
    if (filters.sport && record.sport !== filters.sport) return false;
    if (filters.market && record.market !== filters.market) return false;
    if (filters.league && record.league !== filters.league) return false;
    return true;
  });
}

function populateFilterOptions(history) {
  const sports = [...new Set(history.map((record) => record.sport).filter(Boolean))].sort();
  const markets = [...new Set(history.map((record) => record.market).filter(Boolean))].sort();
  const leaguesUsed = [...new Set(history.map((record) => record.league).filter(Boolean))].sort();
  const currentSport = els.historySportFilter.value;
  const currentMarket = els.historyMarketFilter.value;
  const currentLeague = els.historyLeagueFilter.value;

  els.historySportFilter.innerHTML = `<option value="">Todos</option>${sports.map((item) => `<option value="${item}">${item}</option>`).join("")}`;
  els.historyMarketFilter.innerHTML = `<option value="">Todos</option>${markets.map((item) => `<option value="${item}">${item}</option>`).join("")}`;
  els.historyLeagueFilter.innerHTML = `<option value="">Todas</option>${leaguesUsed.map((item) => `<option value="${item}">${item}</option>`).join("")}`;
  els.historySportFilter.value = sports.includes(currentSport) ? currentSport : "";
  els.historyMarketFilter.value = markets.includes(currentMarket) ? currentMarket : "";
  els.historyLeagueFilter.value = leaguesUsed.includes(currentLeague) ? currentLeague : "";
}

function recordTip(tip, stake = currentStakeValue()) {
  return {
    id: tipId(tip),
    snapshotId: oddsSnapshotId(tip),
    createdAt: new Date().toISOString(),
    eventDate: tip.game.date,
    kind: "Pick",
    sport: sportProfiles[tip.game.sport].apiName,
    league: tip.leagueName || sportProfiles[tip.game.sport].apiName,
    market: tip.market,
    pickType: tip.type,
    title: `${tip.game.away} @ ${tip.game.home}`,
    pick: `${tip.type}: ${tip.pick}`,
    odds: tip.odds,
    stake,
    confidence: Math.round(tip.confidence),
    impliedProbability: tip.impliedProbability,
    modelProbability: tip.modelProbability,
    ev: tip.ev,
    valueTier: tip.valueTier || valueTier(tip.edge),
    valueLabel: tip.valueLabel || valueLabel(tip.edge),
    riskLabel: tip.riskLabel || "Medio",
    result: "pending",
    game: {
      home: tip.game.home,
      away: tip.game.away,
      sport: tip.game.sport,
    },
    tipMeta: {
      type: tip.type,
      targetTeam: tip.targetTeam || "",
      totalSide: tip.totalSide || "",
      bttsPick: tip.pick,
    },
  };
}

function recordParlay(parlay, stake = currentStakeValue()) {
  const leaguesUsed = [...new Set(parlay.legs.map((tip) => tip.leagueName || sportProfiles[tip.game.sport].apiName))];
  return {
    id: parlayId(parlay),
    snapshotId: parlayId(parlay),
    createdAt: new Date().toISOString(),
    eventDate: parlay.legs[0]?.game.date || "Proximo",
    kind: "Parlay",
    sport: parlay.risk,
    league: leaguesUsed.length === 1 ? leaguesUsed[0] : "Mixto",
    market: parlay.name,
    pickType: "Parlay",
    title: `${parlay.legs.length} selecciones`,
    pick: parlay.legs.map((tip) => `${tip.type}: ${tip.pick}`).join(" | "),
    odds: Number(parlay.odds.toFixed(2)),
    stake,
    confidence: Math.round(parlay.hitRate),
    valueTier: "mixed",
    valueLabel: "Mixto",
    riskLabel: parlay.risk,
    result: "pending",
    legs: parlay.legs.map((tip) => ({
      game: {
        home: tip.game.home,
        away: tip.game.away,
        sport: tip.game.sport,
        date: tip.game.date,
      },
      type: tip.type,
      targetTeam: tip.targetTeam || "",
      totalSide: tip.totalSide || "",
      bttsPick: tip.pick,
    })),
  };
}

function upsertHistory(record, result = "pending") {
  const history = loadHistory();
  const index = history.findIndex((item) => item.id === record.id);
  const snapshot = loadOddsSnapshot();
  const snapshotItem = snapshot.items[record.snapshotId || record.id] || snapshot.items[record.snapshotRef || ""];
  const closingOdds = snapshotItem?.odds;
  const next = {
    ...record,
    result,
    updatedAt: new Date().toISOString(),
    closingOdds: result === "pending" ? record.closingOdds : (closingOdds || record.closingOdds || record.odds),
  };
  if (result !== "pending" && Number.isFinite(Number(next.closingOdds))) {
    next.clv = clvFor(next);
  }

  if (index >= 0) {
    history[index] = { ...history[index], ...next };
  } else {
    history.unshift(next);
  }

  saveHistory(history);
  renderHistory();
  renderStatsSnapshot();
  log(`${record.kind} guardado como ${result === "win" ? "ganado" : result === "loss" ? "perdido" : "pendiente"}.`);
}

function renderHistory() {
  const history = loadHistory();
  populateFilterOptions(history);
  const filteredHistory = applyHistoryFilters(history);
  const settled = filteredHistory.filter((record) => record.result !== "pending");
  const wins = settled.filter((record) => record.result === "win").length;
  const profit = settled.reduce((sum, record) => sum + profitFor(record), 0);
  const totalRisk = settled.reduce((sum, record) => sum + (Number(record.stake) || 1), 0);
  const roi = totalRisk ? (profit / totalRisk) * 100 : 0;
  const winRate = settled.length ? (wins / settled.length) * 100 : 0;
  const currentBankroll = currentBankrollValue() + profit;

  els.historyCount.textContent = filteredHistory.length;
  els.historyWinRate.textContent = toPercent(winRate);
  els.historyRoi.textContent = toPercent(roi);
  els.historyProfit.textContent = money(profit);
  els.historyBankroll.textContent = money(currentBankroll);
  renderBreakdown(els.sportBreakdown, groupMetrics(filteredHistory, "sport"), "Todavia no hay datos por deporte.");
  renderBreakdown(els.marketBreakdown, groupMetrics(filteredHistory, "market"), "Todavia no hay datos por mercado.");
  renderBreakdown(els.leagueBreakdown, groupMetrics(filteredHistory, "league"), "Todavia no hay datos por liga.");
  renderBreakdown(els.pickTypeBreakdown, groupMetrics(filteredHistory, "pickType"), "Todavia no hay datos por tipo de pick.");
  renderClvBreakdown(els.clvSportBreakdown, groupClv(filteredHistory, "sport"), "Todavia no hay CLV por deporte.");
  renderClvBreakdown(els.clvMarketBreakdown, groupClv(filteredHistory, "market"), "Todavia no hay CLV por mercado.");
  renderPerformanceWindows(history);
  saveStatsSnapshot({
    updatedAt: new Date().toISOString(),
    count: filteredHistory.length,
    settled: settled.length,
    winRate: Number(winRate.toFixed(2)),
    roi: Number(roi.toFixed(2)),
    profit: Number(profit.toFixed(2)),
    bankroll: Number(currentBankroll.toFixed(2)),
    sportBreakdown: groupMetrics(filteredHistory, "sport"),
    marketBreakdown: groupMetrics(filteredHistory, "market"),
    leagueBreakdown: groupMetrics(filteredHistory, "league"),
    pickTypeBreakdown: groupMetrics(filteredHistory, "pickType"),
    clvSportBreakdown: groupClv(filteredHistory, "sport"),
    clvMarketBreakdown: groupClv(filteredHistory, "market"),
  });
  renderExecutiveDashboard(window.__lastRenderedTips || []);
  renderAutoConfidencePanel(window.__lastRenderedTips || []);
  renderMarketExplorer(window.__lastRenderedTips || []);
  renderAlertsCenter(window.__lastRenderedTips || [], buildOddsAlerts(window.__lastRenderedTips || []));

  if (!filteredHistory.length) {
    els.historyTable.innerHTML = `<tr><td colspan="8">No hay registros para esos filtros.</td></tr>`;
    return;
  }

  els.historyTable.innerHTML = filteredHistory.map((record) => {
    const profit = profitFor(record);
    const resultLabel = record.result === "win" ? "Ganado" : record.result === "loss" ? "Perdido" : "Pendiente";
    const profitClass = profit > 0 ? "profit-win" : profit < 0 ? "profit-loss" : "";

    return `
      <tr>
        <td>${record.eventDate}</td>
        <td>${record.kind}<br><span class="leg-match">${record.sport}</span></td>
        <td><strong>${record.market}</strong><br>${record.pick}<br><span class="leg-match">${record.title}</span></td>
        <td>${Number(record.odds).toFixed(2)}x<br><span class="leg-match">${record.confidence}% conf. · ${record.valueLabel || "-"}</span></td>
        <td>${money(Number(record.stake) || 1)}</td>
        <td>${record.clv === undefined || record.clv === null ? "-" : `${record.clv > 0 ? "+" : ""}${record.clv}%`}</td>
        <td><span class="result-pill ${record.result}">${resultLabel}</span></td>
        <td class="${profitClass}">${money(profit)}</td>
      </tr>
    `;
  }).join("");
}

function metricsForWindow(history, days) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  const settled = history.filter((record) => record.result !== "pending" && new Date(record.updatedAt || record.createdAt || `${record.eventDate}T00:00:00`) >= since);
  const wins = settled.filter((record) => record.result === "win").length;
  const profit = settled.reduce((sum, record) => sum + profitFor(record), 0);
  const risk = settled.reduce((sum, record) => sum + (Number(record.stake) || 1), 0);
  return {
    winRate: settled.length ? (wins / settled.length) * 100 : 0,
    roi: risk ? (profit / risk) * 100 : 0,
  };
}

function renderPerformanceWindows(history) {
  const weekly = metricsForWindow(history, 7);
  const monthly = metricsForWindow(history, 30);
  els.weeklyWinRate.textContent = toPercent(weekly.winRate);
  els.weeklyRoi.textContent = toPercent(weekly.roi);
  els.monthlyWinRate.textContent = toPercent(monthly.winRate);
  els.monthlyRoi.textContent = toPercent(monthly.roi);
  renderBankrollAdvanced(history);
}

function renderBankrollAdvanced(history) {
  const settled = [...history]
    .filter((record) => record.result !== "pending")
    .sort((a, b) => new Date(a.updatedAt || a.createdAt || `${a.eventDate}T00:00:00`) - new Date(b.updatedAt || b.createdAt || `${b.eventDate}T00:00:00`));

  const totalRisk = settled.reduce((sum, record) => sum + (Number(record.stake) || 1), 0);
  const totalProfit = settled.reduce((sum, record) => sum + profitFor(record), 0);
  const yieldValue = totalRisk ? (totalProfit / totalRisk) * 100 : 0;

  let equity = currentBankrollValue();
  let peak = equity;
  let maxDrawdown = 0;
  const points = [{ x: 0, y: equity }];

  settled.forEach((record, index) => {
    equity += profitFor(record);
    peak = Math.max(peak, equity);
    const drawdown = peak ? ((peak - equity) / peak) * 100 : 0;
    maxDrawdown = Math.max(maxDrawdown, drawdown);
    points.push({ x: index + 1, y: equity });
  });

  els.yieldValue.textContent = toPercent(yieldValue);
  els.drawdownValue.textContent = toPercent(maxDrawdown);
  renderEquityCurve(points);
}

function renderEquityCurve(points) {
  if (!points.length) {
    els.equityCurve.innerHTML = "";
    return;
  }

  const minY = Math.min(...points.map((point) => point.y));
  const maxY = Math.max(...points.map((point) => point.y));
  const spanY = Math.max(maxY - minY, 1);
  const spanX = Math.max(points.length - 1, 1);

  const path = points.map((point, index) => {
    const x = (point.x / spanX) * 100;
    const y = 34 - (((point.y - minY) / spanY) * 30 + 2);
    return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ");

  els.equityCurve.innerHTML = `
    <rect x="0" y="0" width="100" height="36" rx="2" fill="rgba(16,21,18,0.55)"></rect>
    <path d="${path}" fill="none" stroke="#52d273" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
  `;
}

function parseDateValue(value) {
  if (!value) return null;
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function daysBetweenDates(startValue, endValue) {
  const start = parseDateValue(startValue);
  const end = parseDateValue(endValue);
  if (!start || !end) return null;
  return Math.round((end - start) / 86400000);
}

function buildScheduleContext(upcomingGames, recentGames) {
  const lastPlayed = {};
  recentGames
    .filter((game) => Number.isFinite(game.homeScore) && Number.isFinite(game.awayScore) && game.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach((game) => {
      if (!lastPlayed[game.home]) lastPlayed[game.home] = game.date;
      if (!lastPlayed[game.away]) lastPlayed[game.away] = game.date;
    });

  return { lastPlayed, upcomingCount: upcomingGames.length };
}

function standingForTeam(externalRef, teamName) {
  return externalRef?.standings?.[normalizeName(teamName)] || null;
}

function recordPctFromGameSide(wins, losses) {
  const total = Number(wins || 0) + Number(losses || 0);
  if (!total) return null;
  return Number(wins || 0) / total;
}

function mlbLineupAdvantageVsPitcher(lineupHands, pitcherHand) {
  if (!lineupHands || !pitcherHand) return 0;
  const hand = String(pitcherHand || "").trim().toUpperCase();
  const total = Math.max(Number(lineupHands.total || 0), 1);
  const left = Number(lineupHands.left || 0);
  const right = Number(lineupHands.right || 0);
  const sw = Number(lineupHands.switch || 0);
  if (hand.startsWith("L")) {
    return ((right + sw * 0.75) - (left * 0.35)) / total;
  }
  if (hand.startsWith("R")) {
    return ((left + sw * 0.75) - (right * 0.15)) / total;
  }
  return 0;
}

function describeMlbPlatoon(lineupHands, pitcherHand) {
  if (!lineupHands || !pitcherHand) return "";
  const hand = String(pitcherHand || "").trim().toUpperCase();
  if (hand.startsWith("L")) {
    return `${lineupHands.right || 0} derechos / ${lineupHands.switch || 0} switch vs zurdo`;
  }
  if (hand.startsWith("R")) {
    return `${lineupHands.left || 0} zurdos / ${lineupHands.switch || 0} switch vs derecho`;
  }
  return "";
}

function sportAdjustmentPackage(game, context = {}) {
  const externalRef = context.externalRef || { standings: {}, injuries: {} };
  const scheduleContext = context.scheduleContext || { lastPlayed: {} };
  const formBook = context.formBook || {};
  const winnerNotes = [];
  const totalNotes = [];
  const spreadNotes = [];
  let homeDelta = 0;
  let awayDelta = 0;
  let totalDelta = 0;
  let confidenceDelta = 0;

  if (game.sport === "soccer") {
    const homeStanding = standingForTeam(externalRef, game.home);
    const awayStanding = standingForTeam(externalRef, game.away);
    const homeForm = formBook[game.home];
    const awayForm = formBook[game.away];
    if (homeStanding && awayStanding) {
      const positionGap = clamp((awayStanding.position || 0) - (homeStanding.position || 0), -8, 8);
      const pointsGap = clamp(((homeStanding.points || 0) - (awayStanding.points || 0)) / 3, -6, 6);
      const tableImpact = positionGap * 0.45 + pointsGap * 0.35;
      homeDelta += tableImpact;
      awayDelta -= tableImpact;
      totalDelta += Math.abs(positionGap) >= 5 ? -1.1 : 0.45;
      confidenceDelta += Math.min(Math.abs(tableImpact), 2.6);
      winnerNotes.push(`Tabla ${homeStanding.position || "-"} vs ${awayStanding.position || "-"} y puntos ${homeStanding.points || 0}-${awayStanding.points || 0}.`);
      totalNotes.push(Math.abs(positionGap) >= 5 ? "La brecha de tabla sugiere un partido mas controlado." : "La tabla no marca una brecha extrema; el partido puede abrirse.");
      spreadNotes.push("La tabla ayuda a medir si el margen deberia ser corto o amplio.");
    }
    if (homeForm?.homeGames >= 2 && awayForm?.awayGames >= 2) {
      const splitEdge = clamp(((homeForm.homeForm || homeForm.form) - (awayForm.awayForm || awayForm.form)) / 10, -3, 3);
      homeDelta += splitEdge;
      awayDelta -= splitEdge;
      totalDelta += clamp((((homeForm.homeAttack || homeForm.attack) - (homeForm.homeDefense || homeForm.defense)) + ((awayForm.awayAttack || awayForm.attack) - (awayForm.awayDefense || awayForm.defense))) / 28, -1.5, 1.5);
      confidenceDelta += Math.min(Math.abs(splitEdge), 1.8);
      winnerNotes.push(`Forma local/visita ${game.home}: ${Math.round(homeForm.homeForm || homeForm.form)} vs ${game.away}: ${Math.round(awayForm.awayForm || awayForm.form)}.`);
      spreadNotes.push("La forma en casa y fuera ya entra directo al margen esperado.");
    }
    if (homeForm && awayForm) {
      const recentEdge = clamp(((homeForm.recentForm || homeForm.form) - (awayForm.recentForm || awayForm.form)) / 12, -2.5, 2.5);
      const marginEdge = clamp(((homeForm.scoringMargin || 0) - (awayForm.scoringMargin || 0)) * 0.65, -1.8, 1.8);
      const matchupOpen = clamp((((homeForm.recentAttack || homeForm.attack) - (awayForm.recentDefense || awayForm.defense)) + ((awayForm.recentAttack || awayForm.attack) - (homeForm.recentDefense || homeForm.defense))) / 30, -1.2, 1.2);
      homeDelta += recentEdge + Math.max(marginEdge, -1);
      awayDelta -= recentEdge + Math.min(marginEdge, 1);
      totalDelta += matchupOpen;
      if ((homeForm.cleanSheetRate || 0) >= 0.45 || (awayForm.cleanSheetRate || 0) >= 0.45) totalDelta -= 0.6;
      if ((homeForm.bttsRate || 0) >= 0.55 && (awayForm.bttsRate || 0) >= 0.55) totalDelta += 0.7;
      confidenceDelta += Math.min(Math.abs(recentEdge) + Math.abs(marginEdge) * 0.4, 1.6);
      winnerNotes.push(`Forma reciente ${game.home}: ${Math.round(homeForm.recentForm || homeForm.form)} vs ${game.away}: ${Math.round(awayForm.recentForm || awayForm.form)}.`);
      totalNotes.push(`Perfil de partido ${game.home}: ${homeForm.totalAverage || "-"} y ${game.away}: ${awayForm.totalAverage || "-"} goles totales recientes.`);
    }
  }

  if (game.sport === "nba") {
    const homeForm = formBook[game.home];
    const awayForm = formBook[game.away];
    const homeRest = daysBetweenDates(scheduleContext.lastPlayed?.[game.home], game.date);
    const awayRest = daysBetweenDates(scheduleContext.lastPlayed?.[game.away], game.date);
    const homeB2B = homeRest !== null && homeRest <= 1;
    const awayB2B = awayRest !== null && awayRest <= 1;
    const restEdge = clamp((homeRest ?? 2) - (awayRest ?? 2), -3, 3);
    homeDelta += restEdge * 1.35;
    awayDelta -= restEdge * 1.35;
    if (homeB2B || awayB2B) totalDelta -= 2.4;
    if ((homeRest ?? 0) >= 2 && (awayRest ?? 0) >= 2) totalDelta += 1.1;
    if (homeB2B !== awayB2B) confidenceDelta += 2;
    if (homeRest !== null && awayRest !== null) {
      winnerNotes.push(`Descanso ${game.home}: ${homeRest}d, ${game.away}: ${awayRest}d.`);
      spreadNotes.push(homeB2B || awayB2B ? "El back-to-back pesa bastante en el spread." : "El descanso parejo reduce ruido en el spread.");
      if (homeB2B || awayB2B) totalNotes.push("Back-to-back detectado; el total se enfria un poco.");
    }
    const homeStanding = standingForTeam(externalRef, game.home);
    const awayStanding = standingForTeam(externalRef, game.away);
    if (homeStanding?.winPct !== undefined && awayStanding?.winPct !== undefined) {
      const standingEdge = clamp((Number(homeStanding.winPct) - Number(awayStanding.winPct)) * 12, -3, 3);
      homeDelta += standingEdge;
      awayDelta -= standingEdge;
      confidenceDelta += Math.min(Math.abs(standingEdge) * 0.5, 1.5);
    }
    const homeInjuries = externalRef.injuries?.[normalizeName(game.home)] || 0;
    const awayInjuries = externalRef.injuries?.[normalizeName(game.away)] || 0;
    if (homeInjuries || awayInjuries) {
      const injuryEdge = clamp((awayInjuries - homeInjuries) * 0.9, -3.5, 3.5);
      homeDelta += injuryEdge;
      awayDelta -= injuryEdge;
      totalDelta -= Math.abs(awayInjuries - homeInjuries) * 0.55;
      confidenceDelta += Math.min(Math.abs(awayInjuries - homeInjuries) * 0.4, 1.8);
      winnerNotes.push(`Bajas reportadas ${game.home}: ${homeInjuries}, ${game.away}: ${awayInjuries}.`);
      totalNotes.push("Las lesiones ya empujan el total y el lado del pick, no solo la confianza externa.");
    }
    if (homeForm && awayForm) {
      const paceEdge = clamp(((homeForm.paceScore || 50) + (awayForm.paceScore || 50) - 100) / 10, -2, 2);
      const marginEdge = clamp(((homeForm.scoringMargin || 0) - (awayForm.scoringMargin || 0)) * 0.45, -2.4, 2.4);
      const recentEdge = clamp(((homeForm.recentForm || homeForm.form) - (awayForm.recentForm || awayForm.form)) / 10, -2.2, 2.2);
      homeDelta += recentEdge + marginEdge;
      awayDelta -= recentEdge + marginEdge;
      totalDelta += paceEdge;
      confidenceDelta += Math.min(Math.abs(recentEdge) + Math.abs(marginEdge) * 0.35, 1.7);
      winnerNotes.push(`Margen reciente ${game.home}: ${homeForm.scoringMargin || 0} vs ${game.away}: ${awayForm.scoringMargin || 0}.`);
      totalNotes.push(`Ritmo proyectado ${Math.round(homeForm.paceScore || 50)} / ${Math.round(awayForm.paceScore || 50)}.`);
    }
  }

  if (game.sport === "mlb") {
    const homePct = recordPctFromGameSide(game.homeWins, game.homeLosses);
    const awayPct = recordPctFromGameSide(game.awayWins, game.awayLosses);
    const homeForm = formBook[game.home];
    const awayForm = formBook[game.away];
    if (homePct !== null && awayPct !== null) {
      const recordImpact = clamp((homePct - awayPct) * 12, -4, 4);
      homeDelta += recordImpact;
      awayDelta -= recordImpact;
      confidenceDelta += Math.min(Math.abs(recordImpact) * 0.55, 2);
      winnerNotes.push(`Record ${game.home}: ${game.homeWins || 0}-${game.homeLosses || 0} vs ${game.away}: ${game.awayWins || 0}-${game.awayLosses || 0}.`);
    }

    if (game.homePitcher && game.awayPitcher) {
      confidenceDelta += 1.2;
      totalDelta -= 0.7;
      winnerNotes.push(`Abridores probables: ${game.awayPitcher} vs ${game.homePitcher}.`);
      totalNotes.push("Con ambos pitchers probables anunciados, el total tiene menos incertidumbre.");
      if (Number.isFinite(game.homePitcherEra) && Number.isFinite(game.awayPitcherEra)) {
        const eraEdge = clamp((game.awayPitcherEra - game.homePitcherEra) * 0.9, -2.5, 2.5);
        homeDelta += eraEdge;
        awayDelta -= eraEdge;
        totalDelta -= clamp((7.2 - (game.homePitcherEra + game.awayPitcherEra)) * 0.28, -1.2, 1.2);
        confidenceDelta += 0.8;
        winnerNotes.push(`ERA ${game.homePitcher}: ${game.homePitcherEra.toFixed(2)} vs ${game.awayPitcher}: ${game.awayPitcherEra.toFixed(2)}.`);
      }
      if (game.homePitcherHand || game.awayPitcherHand) {
        winnerNotes.push(`Mano ${game.awayPitcher}: ${game.awayPitcherHand || "-"} / ${game.homePitcher}: ${game.homePitcherHand || "-"}.`);
      }
    } else if (game.homePitcher && !game.awayPitcher) {
      homeDelta += 1.4;
      confidenceDelta -= 0.4;
      winnerNotes.push(`${game.home} ya tiene pitcher probable confirmado.`);
    } else if (!game.homePitcher && game.awayPitcher) {
      awayDelta += 1.4;
      confidenceDelta -= 0.4;
      winnerNotes.push(`${game.away} ya tiene pitcher probable confirmado.`);
    } else {
      confidenceDelta -= 1.6;
      totalNotes.push("Sin pitchers probables confirmados, el total queda mas volado.");
    }

    if (game.lineupConfirmed || game.lineupHomeCount || game.lineupAwayCount) {
      const lineupEdge = clamp(((game.lineupHomeCount || 0) - (game.lineupAwayCount || 0)) * 0.08, -0.8, 0.8);
      homeDelta += lineupEdge;
      awayDelta -= lineupEdge;
      confidenceDelta += game.lineupConfirmed ? 0.9 : 0.3;
      winnerNotes.push(game.lineupConfirmed
        ? "Lineups MLB confirmados para este juego."
        : "Hay proyeccion de lineup MLB, aunque aun no esta totalmente confirmada.");
    }

    if ((game.lineupHomeHands || game.lineupAwayHands) && (game.homePitcherHand || game.awayPitcherHand)) {
      const homePlatoon = mlbLineupAdvantageVsPitcher(game.lineupHomeHands, game.awayPitcherHand);
      const awayPlatoon = mlbLineupAdvantageVsPitcher(game.lineupAwayHands, game.homePitcherHand);
      const platoonEdge = clamp((homePlatoon - awayPlatoon) * 3.8, -1.9, 1.9);
      const platoonRunEnv = clamp((homePlatoon + awayPlatoon) * 0.7, -0.5, 0.8);
      homeDelta += platoonEdge;
      awayDelta -= platoonEdge;
      totalDelta += platoonRunEnv;
      confidenceDelta += Math.min(Math.abs(platoonEdge) * 0.4, 0.9);
      if (homePlatoon || awayPlatoon) {
        winnerNotes.push(`Split vs mano rival ${game.home}: ${describeMlbPlatoon(game.lineupHomeHands, game.awayPitcherHand)} | ${game.away}: ${describeMlbPlatoon(game.lineupAwayHands, game.homePitcherHand)}.`);
        totalNotes.push("La mezcla de bats del lineup ya pesa frente a la mano del abridor rival.");
        spreadNotes.push("El run line ya toma en cuenta el platoon del lineup frente al pitcher rival.");
      }
    }

    if (game.weatherTemp || game.weatherCondition || game.weatherWind) {
      const warmBoost = Number(game.weatherTemp || 0) >= 82 ? 0.45 : Number(game.weatherTemp || 0) <= 58 ? -0.4 : 0;
      const windBoost = /out|salida|towards out/i.test(String(game.weatherWind || "")) ? 0.5 : /in|towards in/i.test(String(game.weatherWind || "")) ? -0.45 : 0;
      totalDelta += warmBoost + windBoost;
      totalNotes.push(`Clima ${game.weatherCondition || "neutral"}${game.weatherTemp ? ` ${game.weatherTemp}F` : ""}${game.weatherWind ? ` | viento ${game.weatherWind}` : ""}.`);
    }

    if (game.venueName) {
      winnerNotes.push(`Parque: ${game.venueName}.`);
    }

    if (homeForm?.bullpenForm && awayForm?.bullpenForm) {
      const bullpenEdge = clamp(((homeForm.bullpenForm - awayForm.bullpenForm) / 10), -2.5, 2.5);
      const bullpenStabilityEdge = clamp(((awayForm.volatility || 50) - (homeForm.volatility || 50)) / 18, -1.2, 1.2);
      homeDelta += bullpenEdge;
      awayDelta -= bullpenEdge;
      homeDelta += bullpenStabilityEdge;
      awayDelta -= bullpenStabilityEdge;
      totalDelta -= clamp(((homeForm.bullpenForm + awayForm.bullpenForm) - 100) / 18, -1.2, 1.2);
      winnerNotes.push(`Staff reciente ${game.home}: ${Math.round(homeForm.bullpenForm)} vs ${game.away}: ${Math.round(awayForm.bullpenForm)}.`);
      totalNotes.push("La tendencia reciente del staff/bullpen ya pesa en el total.");
      spreadNotes.push("La estabilidad reciente del bullpen ya entra como capa extra del run line.");
    }

    if (homeForm && awayForm) {
      const mlbBaseTotal = sportProfiles.mlb.baseTotal || 8.5;
      const attackEdge = clamp(((homeForm.recentAttack || homeForm.attack) - (awayForm.recentDefense || awayForm.defense)) / 18, -2, 2);
      const awayAttackEdge = clamp(((awayForm.recentAttack || awayForm.attack) - (homeForm.recentDefense || homeForm.defense)) / 18, -2, 2);
      const marginEdge = clamp(((homeForm.scoringMargin || 0) - (awayForm.scoringMargin || 0)) * 0.55, -2.4, 2.4);
      const runEnv = clamp((((homeForm.totalAverage || mlbBaseTotal) + (awayForm.totalAverage || mlbBaseTotal)) / (mlbBaseTotal * 2) - 1) * 2.4, -1.3, 1.3);
      const splitEdge = clamp((((homeForm.homeAttack || homeForm.attack) - (awayForm.awayDefense || awayForm.defense)) - ((awayForm.awayAttack || awayForm.attack) - (homeForm.homeDefense || homeForm.defense))) / 18, -2.2, 2.2);
      const splitRunEnv = clamp((((homeForm.homeAttack || homeForm.attack) + (awayForm.awayAttack || awayForm.attack)) - ((homeForm.homeDefense || homeForm.defense) + (awayForm.awayDefense || awayForm.defense))) / 28, -1.1, 1.1);
      homeDelta += attackEdge + marginEdge;
      awayDelta += awayAttackEdge - marginEdge;
      homeDelta += splitEdge;
      awayDelta -= splitEdge;
      totalDelta += runEnv + splitRunEnv;
      confidenceDelta += Math.min(Math.abs(marginEdge) * 0.45 + Math.abs(runEnv) * 0.25 + Math.abs(splitEdge) * 0.3, 1.9);
      winnerNotes.push(`Forma reciente ${game.home}: margen ${homeForm.scoringMargin || 0}, ${game.away}: margen ${awayForm.scoringMargin || 0}.`);
      totalNotes.push(`Entorno de carreras reciente ${game.home}: ${homeForm.totalAverage || "-"} y ${game.away}: ${awayForm.totalAverage || "-"}.`);
      spreadNotes.push(`Split local/visita ${game.home}: ${Math.round(homeForm.homeForm || homeForm.form)} vs ${game.away}: ${Math.round(awayForm.awayForm || awayForm.form)}.`);
    }

    spreadNotes.push("El moneyline y run line se ajustan con record y pitchers probables.");
  }

  if (game.sport === "nfl") {
    const homeForm = formBook[game.home];
    const awayForm = formBook[game.away];
    if (homeForm && awayForm) {
      const formEdge = clamp(((homeForm.recentForm || homeForm.form) - (awayForm.recentForm || awayForm.form)) / 11, -2.4, 2.4);
      const marginEdge = clamp(((homeForm.scoringMargin || 0) - (awayForm.scoringMargin || 0)) * 0.3, -2.6, 2.6);
      const paceEdge = clamp(((homeForm.paceScore || 50) + (awayForm.paceScore || 50) - 100) / 12, -1.8, 1.8);
      homeDelta += formEdge + marginEdge;
      awayDelta -= formEdge + marginEdge;
      totalDelta += paceEdge;
      confidenceDelta += Math.min(Math.abs(formEdge) + Math.abs(marginEdge) * 0.3, 1.5);
      winnerNotes.push(`Forma reciente ${game.home}: ${Math.round(homeForm.recentForm || homeForm.form)} vs ${game.away}: ${Math.round(awayForm.recentForm || awayForm.form)}.`);
      totalNotes.push(`Ritmo reciente ${Math.round(homeForm.paceScore || 50)} / ${Math.round(awayForm.paceScore || 50)}.`);
      spreadNotes.push("El margen reciente y la forma empujan el spread cuando hay muestra suficiente.");
    }
  }

  return {
    homeDelta,
    awayDelta,
    totalDelta,
    confidenceDelta,
    notes: {
      winner: winnerNotes.join(" "),
      total: totalNotes.join(" "),
      spread: spreadNotes.join(" "),
    },
  };
}

function createTips(game, settings, context = {}) {
  const profile = sportProfiles[game.sport];
  const formBook = context.formBook || {};
  const home = blendRating(ratingFor(game.home, game.sport), formBook[game.home]);
  const away = blendRating(ratingFor(game.away, game.sport), formBook[game.away]);
  const adjustments = sportAdjustmentPackage(game, context);
  const riskBoost = (Number(settings.risk) - 5) * 1.4;
  const homeEdge = 4.5 + (home.attack - away.defense) * 0.22 + (home.form - away.form) * 0.18 + adjustments.homeDelta;
  const awayEdge = (away.attack - home.defense) * 0.22 + (away.form - home.form) * 0.18 + adjustments.awayDelta;
  const favorite = homeEdge >= awayEdge ? game.home : game.away;
  const dog = favorite === game.home ? game.away : game.home;
  const edge = Math.abs(homeEdge - awayEdge);
  const winConfidence = clamp(50 + edge * 1.55 + riskBoost + adjustments.confidenceDelta, 45, 80);
  const totalLean = home.attack + away.attack - home.defense - away.defense + home.form * 0.12 + away.form * 0.12 + adjustments.totalDelta;
  const isOver = totalLean > 19;
  const totalConfidence = clamp(49 + Math.abs(totalLean - 19) * 0.65 + riskBoost / 2 + adjustments.confidenceDelta * 0.45, 45, 75);
  const spreadConfidence = clamp(winConfidence - 4 + (dog.length % 4) + adjustments.confidenceDelta * 0.35, 45, 74);
  const bothScoreConfidence = clamp(48 + (home.attack + away.attack) / 18 - Math.abs(home.defense - away.defense) / 10, 45, 69);

  const tips = [
    {
      type: "Ganador",
      pick: `${favorite} gana`,
      targetTeam: favorite,
      marketKey: game.sport === "soccer" ? "1x2" : "moneyline",
      confidence: winConfidence,
      reason: `${favorite} sale mejor por forma reciente y diferencial ataque/defensa. La localia esta incluida en el calculo.${adjustments.notes.winner ? ` ${adjustments.notes.winner}` : ""}`,
    },
    {
      type: "Over/Under",
      pick: `${isOver ? "Over" : "Under"} ${profile.baseTotal} ${profile.totalLabel}`,
      totalSide: isOver ? "Over" : "Under",
      marketKey: "totals",
      confidence: totalConfidence,
      reason: `La tendencia combinada de ataque y defensa apunta a un partido ${isOver ? "abierto" : "cerrado"}.${adjustments.notes.total ? ` ${adjustments.notes.total}` : ""}`,
    },
    {
      type: "Spread",
      pick: `${dog} ${profile.spreadLabel}`,
      targetTeam: dog,
      marketKey: game.sport === "mlb" ? "runline" : "spread",
      confidence: spreadConfidence,
      reason: `El margen proyectado no es extremo, por eso el lado con ventaja de puntos tiene valor conservador.${adjustments.notes.spread ? ` ${adjustments.notes.spread}` : ""}`,
    },
  ];

  if (game.sport === "soccer") {
    tips.push({
      type: "Ambos anotan",
      pick: bothScoreConfidence > 56 ? "Ambos equipos anotan" : "No ambos anotan",
      marketKey: "btts",
      confidence: bothScoreConfidence,
      reason: "Se cruza la fuerza ofensiva de ambos clubes contra la solidez defensiva estimada.",
    });
    tips.push({
      type: "Doble oportunidad",
      pick: `${favorite} o empate`,
      targetTeam: favorite,
      marketKey: "double_chance",
      confidence: clamp(winConfidence + 7, 52, 84),
      reason: "Ideal para cubrir el empate cuando el favorito tiene ventaja, pero sin querer pagar la volatilidad del 1X2 puro.",
    });
    tips.push({
      type: "Empate no apuesta",
      pick: `${favorite} empate no apuesta`,
      targetTeam: favorite,
      marketKey: "draw_no_bet",
      confidence: clamp(winConfidence + 4, 50, 82),
      reason: "Reduce riesgo cuando el modelo favorece un lado, pero la igualdad sigue viva por contexto de tabla o forma.",
    });
    tips.push({
      type: "Handicap asiatico",
      pick: `${dog} +0.5 handicap asiatico`,
      targetTeam: dog,
      marketKey: "asian_handicap",
      line: "+0.5",
      confidence: clamp(spreadConfidence + 3, 50, 80),
      reason: "El asian handicap absorbe mejor partidos cortos o cerrados y baja castigo frente al moneyline.",
    });
    tips.push({
      type: "Correct score",
      pick: edge >= 9 ? "2-1" : edge >= 5 ? "1-0" : "1-1",
      marketKey: "correct_score",
      confidence: clamp(44 + edge * 0.5, 40, 58),
      analysisOnly: true,
      reason: "Marcador correcto solo para analisis. No entra a picks automaticos por volatilidad.",
    });
  }

  if (game.sport === "mlb") {
    const teamTotalSide = homeEdge >= awayEdge ? game.home : game.away;
    tips.push({
      type: "Team total",
      pick: `${teamTotalSide} over 4.5 carreras`,
      targetTeam: teamTotalSide,
      marketKey: "team_total",
      confidence: clamp(totalConfidence - 1 + Math.abs(homeEdge - awayEdge) * 0.35, 50, 78),
      reason: "Combina entorno de carreras, forma ofensiva reciente y ventaja del lineup esperado para aislar daño del rival.",
    });
    if (game.homePitcher || game.awayPitcher) {
      tips.push({
        type: "First 5 innings",
        pick: `${favorite} gana primeras 5 entradas`,
        targetTeam: favorite,
        marketKey: "f5_moneyline",
        confidence: clamp(winConfidence + 2, 52, 80),
        reason: "Con abridores probables, el F5 pesa mas por matchup de pitcher y evita ruido tardio del bullpen.",
      });
      tips.push({
        type: "First 5 total",
        pick: `${isOver ? "Over" : "Under"} 4.5 primeras 5 entradas`,
        totalSide: isOver ? "Over" : "Under",
        marketKey: "f5_totals",
        confidence: clamp(totalConfidence + 1, 50, 78),
        reason: "El total de primeras 5 entradas aprovecha mejor la lectura del abridor y corta parte de la volatilidad del relevo.",
      });
    }
  }

  if (game.sport === "nba" || game.sport === "nfl") {
    const teamTotalSide = favorite;
    const baseLine = game.sport === "nba" ? 112.5 : 24.5;
    tips.push({
      type: "Team total",
      pick: `${teamTotalSide} over ${baseLine} ${profile.totalLabel}`,
      targetTeam: teamTotalSide,
      marketKey: "team_total",
      confidence: clamp(totalConfidence - 1 + Math.abs(homeEdge - awayEdge) * 0.28, 50, 77),
      reason: "Aisla mejor el ataque del lado favorito cuando el modelo ve ventaja de ritmo, eficiencia o matchup.",
    });
  }

  return tips
    .filter((tip) => !tip.analysisOnly)
    .filter((tip) => tip.confidence >= (settings.autoConfidence ? 45 : Number(settings.minConfidence)))
    .filter((tip) => !settings.valueOnly || tip.confidence >= 58)
    .map((tip) => createOdds({ ...tip, game, leagueId: context.leagueId || "", leagueName: context.leagueName || "" }));
}

function normalizeSportsDbEvent(event, sport, source = "thesportsdb") {
  return {
    home: event.strHomeTeam || event.strEvent?.split(" vs ")?.[0] || "Local",
    away: event.strAwayTeam || event.strEvent?.split(" vs ")?.[1] || "Visitante",
    date: event.dateEvent || event.strTimestamp?.slice(0, 10) || "Proximo",
    homeScore: Number.isFinite(Number(event.intHomeScore)) ? Number(event.intHomeScore) : null,
    awayScore: Number.isFinite(Number(event.intAwayScore)) ? Number(event.intAwayScore) : null,
    source,
    sport,
  };
}

function normalizeMlbGame(game, source = "mlb") {
  const homePitcher = game.teams?.home?.probablePitcher || {};
  const awayPitcher = game.teams?.away?.probablePitcher || {};
  const venueName = game.venue?.name || game.venue?.venueName || "";
  const weatherCondition = game.weather?.condition || game.weather?.conditions || game.gameInfo?.weather?.condition || "";
  const weatherTemp = Number(game.weather?.temp ?? game.weather?.temperature ?? game.gameInfo?.weather?.temp ?? NaN);
  const weatherWind = game.weather?.wind || game.gameInfo?.weather?.wind || "";
  const lineupKey = `${(game.gameDate?.slice(0, 10) || "Proximo")}|${normalizeName(game.teams?.away?.team?.name || "Visitante MLB")}|${normalizeName(game.teams?.home?.team?.name || "Local MLB")}`;
  const lineupInfo = currentMlbLineupBook[lineupKey] || null;
  return {
    home: game.teams?.home?.team?.name || "Local MLB",
    away: game.teams?.away?.team?.name || "Visitante MLB",
    date: game.gameDate?.slice(0, 10) || "Proximo",
    homeScore: Number.isFinite(Number(game.teams?.home?.score)) ? Number(game.teams.home.score) : null,
    awayScore: Number.isFinite(Number(game.teams?.away?.score)) ? Number(game.teams.away.score) : null,
    homeWins: Number(game.teams?.home?.leagueRecord?.wins || 0),
    homeLosses: Number(game.teams?.home?.leagueRecord?.losses || 0),
    awayWins: Number(game.teams?.away?.leagueRecord?.wins || 0),
    awayLosses: Number(game.teams?.away?.leagueRecord?.losses || 0),
    homePitcher: homePitcher.fullName || "",
    awayPitcher: awayPitcher.fullName || "",
    homePitcherHand: homePitcher.pitchHand?.code || homePitcher.pitchHand?.description || homePitcher.hand || "",
    awayPitcherHand: awayPitcher.pitchHand?.code || awayPitcher.pitchHand?.description || awayPitcher.hand || "",
    homePitcherEra: Number(homePitcher.era ?? homePitcher.stats?.era ?? homePitcher.seasonStats?.era ?? NaN),
    awayPitcherEra: Number(awayPitcher.era ?? awayPitcher.stats?.era ?? awayPitcher.seasonStats?.era ?? NaN),
    venueName,
    venueId: game.venue?.id || game.venue?.venueId || null,
    weatherCondition,
    weatherTemp: Number.isFinite(weatherTemp) ? weatherTemp : null,
    weatherWind,
    lineupConfirmed: Boolean(lineupInfo?.confirmed),
    lineupHomeCount: Number(lineupInfo?.homeCount || 0),
    lineupAwayCount: Number(lineupInfo?.awayCount || 0),
    lineupHomeHands: lineupInfo?.homeHands || null,
    lineupAwayHands: lineupInfo?.awayHands || null,
    lineupSource: lineupInfo?.source || "",
    source,
    sport: "mlb",
  };
}

function normalizeOddsEvent(event, sport) {
  return {
    home: event.home_team || "Local",
    away: event.away_team || "Visitante",
    date: event.commence_time?.slice(0, 10) || "Proximo",
    source: "oddsapi",
    sport,
  };
}

function normalizeBalldontlieGame(game) {
  return {
    home: game.home_team?.full_name || "Local NBA",
    homeTeamId: game.home_team?.id || null,
    away: game.visitor_team?.full_name || "Visitante NBA",
    awayTeamId: game.visitor_team?.id || null,
    date: (game.date || game.datetime || "").slice(0, 10) || "Proximo",
    homeScore: Number.isFinite(Number(game.home_team_score)) ? Number(game.home_team_score) : null,
    awayScore: Number.isFinite(Number(game.visitor_team_score)) ? Number(game.visitor_team_score) : null,
    source: "balldontlie",
    sport: "nba",
    status: game.status || "",
  };
}

function convertAmericanToDecimal(price) {
  const value = Number(price);
  if (!Number.isFinite(value) || value === 0.0001) return null;
  if (value > 0) return Number((1 + value / 100).toFixed(2));
  return Number((1 + 100 / Math.abs(value)).toFixed(2));
}

function normalizeTheRundownOddsEvent(event, sport) {
  const teams = event.teams || [];
  const away = teams[0]?.name || "Visitante";
  const home = teams[1]?.name || "Local";

  const bookmakerMarkets = {};
  (event.markets || []).forEach((market) => {
    const marketKey = market.market_id === 1 ? "h2h" : market.market_id === 2 ? "spreads" : market.market_id === 3 ? "totals" : null;
    if (!marketKey) return;

    (market.participants || []).forEach((participant) => {
      (participant.lines || []).forEach((line) => {
        Object.entries(line.prices || {}).forEach(([affiliateId, priceObj]) => {
          const decimal = convertAmericanToDecimal(priceObj?.price);
          if (!decimal) return;
          if (!bookmakerMarkets[affiliateId]) bookmakerMarkets[affiliateId] = {};
          if (!bookmakerMarkets[affiliateId][marketKey]) bookmakerMarkets[affiliateId][marketKey] = [];

          bookmakerMarkets[affiliateId][marketKey].push({
            name: participant.name,
            price: decimal,
            point: line.value ?? null,
          });
        });
      });
    });
  });

  const bookmakers = Object.entries(bookmakerMarkets).map(([affiliateId, markets]) => ({
    title: `Book ${affiliateId}`,
    markets: Object.entries(markets).map(([key, outcomes]) => ({ key, outcomes })),
  }));

  return {
    home_team: home,
    away_team: away,
    commence_time: event.date || event.event_date || "",
    bookmakers,
    source: "therundown",
    sport,
  };
}

function normalizeTheRundownGame(event, sport) {
  const teams = event.teams || [];
  return {
    home: teams[1]?.name || "Local",
    away: teams[0]?.name || "Visitante",
    date: (event.date || event.event_date || "").slice(0, 10) || "Proximo",
    homeScore: Number.isFinite(Number(event.score?.score_home)) ? Number(event.score.score_home) : null,
    awayScore: Number.isFinite(Number(event.score?.score_away)) ? Number(event.score.score_away) : null,
    source: "therundown",
    sport,
    status: event.score?.event_status || "",
  };
}

function normalizeSxBetFixture(fixture, sport, leagueLabel = "") {
  return {
    home: fixture.participantOneName || fixture.teamOneName || fixture.homeTeamName || "Local",
    away: fixture.participantTwoName || fixture.teamTwoName || fixture.awayTeamName || "Visitante",
    date: String(fixture.startDate || fixture.gameTime || "").slice(0, 10) || "Proximo",
    source: "sxbet",
    sport,
    status: fixture.status || "",
    eventId: fixture.eventId || fixture.id || "",
    leagueLabel: fixture.leagueLabel || leagueLabel || "",
  };
}

function sxBetMarketKey(typeId) {
  const totals = new Set([2, 21, 28, 29, 45, 46, 77, 165, 236, 1536]);
  const spreads = new Set([3, 53, 64, 65, 66, 201, 281, 342, 835, 866]);
  const h2h = new Set([1, 52, 63, 88, 202, 203, 204, 205, 226, 274, 1618]);
  if (totals.has(Number(typeId))) return "totals";
  if (spreads.has(Number(typeId))) return "spreads";
  if (h2h.has(Number(typeId))) return "h2h";
  return null;
}

function extractSxBetPrice(value) {
  const numeric = Number(value);
  if (Number.isFinite(numeric) && numeric > 1.01 && numeric < 100) return Number(numeric.toFixed(2));
  if (Number.isFinite(numeric) && Math.abs(numeric) >= 100) return convertAmericanToDecimal(numeric);
  return null;
}

function extractSxBetOutcomes(market, marketKey) {
  const rawOutcomes = [
    {
      name: market.outcomeOneName || market.participantOneName || market.teamOneName,
      price: extractSxBetPrice(market.outcomeOnePrice ?? market.priceOne ?? market.oddsOne ?? market.bestPriceOne),
      point: market.line ?? null,
    },
    {
      name: market.outcomeTwoName || market.participantTwoName || market.teamTwoName,
      price: extractSxBetPrice(market.outcomeTwoPrice ?? market.priceTwo ?? market.oddsTwo ?? market.bestPriceTwo),
      point: market.line ?? null,
    },
    {
      name: market.outcomeDrawName || market.outcomeThreeName || market.drawName,
      price: extractSxBetPrice(market.outcomeDrawPrice ?? market.outcomeThreePrice ?? market.priceDraw ?? market.oddsDraw ?? market.bestPriceDraw),
      point: null,
    },
  ].filter((item) => item.name && item.price);

  if (rawOutcomes.length) return rawOutcomes;

  const prices = Array.isArray(market.prices) ? market.prices : Array.isArray(market.outcomes) ? market.outcomes : [];
  return prices
    .map((item) => ({
      name: item.name || item.label || item.outcomeName || item.participantName || "",
      price: extractSxBetPrice(item.price ?? item.decimalOdds ?? item.odds),
      point: item.line ?? market.line ?? null,
    }))
    .filter((item) => item.name && item.price && sxBetMarketKey(market.type) === marketKey);
}

function normalizeSxBetOddsEvent(fixture, markets, sport) {
  const grouped = {};
  (markets || []).forEach((market) => {
    const marketKey = sxBetMarketKey(market.type);
    if (!marketKey) return;
    const book = market.sportsbook || market.exchange || market.source || "SX Bet";
    const outcomes = extractSxBetOutcomes(market, marketKey);
    if (!outcomes.length) return;
    if (!grouped[book]) grouped[book] = {};
    if (!grouped[book][marketKey]) grouped[book][marketKey] = [];
    grouped[book][marketKey].push(...outcomes);
  });

  return {
    home_team: fixture.participantOneName || fixture.teamOneName || fixture.homeTeamName || "Local",
    away_team: fixture.participantTwoName || fixture.teamTwoName || fixture.awayTeamName || "Visitante",
    commence_time: fixture.startDate || fixture.gameTime || "",
    bookmakers: Object.entries(grouped).map(([title, marketMap]) => ({
      title,
      markets: Object.entries(marketMap).map(([key, outcomes]) => ({ key, outcomes })),
    })),
    source: "sxbet",
    sport,
  };
}

async function fetchSportsDb(sport, leagueId) {
  const key = els.apiKey.value.trim() || "123";
  const url = `https://www.thesportsdb.com/api/v1/json/${encodeURIComponent(key)}/eventsnextleague.php?id=${encodeURIComponent(leagueId)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("TheSportsDB no respondio correctamente");
  const data = await response.json();
  const events = data.events || [];
  return events.slice(0, 12).map((event) => normalizeSportsDbEvent(event, sport));
}

async function fetchSxBetJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`SX Bet respondio ${response.status}`);
  const result = await response.json();
  if (result?.status && result.status !== "success") throw new Error("SX Bet devolvio estado invalido");
  return result?.data ?? result;
}

async function fetchSxBetSports() {
  if (Array.isArray(sxBetCaches.sports)) return sxBetCaches.sports;
  const sports = await fetchSxBetJson("https://api.sx.bet/sports");
  sxBetCaches.sports = sports;
  return sports;
}

function matchByHints(label, hints = []) {
  const normalized = String(label || "").toLowerCase();
  return hints.some((hint) => normalized.includes(hint));
}

async function fetchSxBetLeaguesForSport(sport) {
  if (sxBetCaches.leagues[sport]) return sxBetCaches.leagues[sport];
  const sports = await fetchSxBetSports();
  const sportId = (sports || []).find((item) => matchByHints(item.label, sxBetSportHints[sport] || []))?.sportId;
  if (!sportId) return [];
  const leagues = await fetchSxBetJson(`https://api.sx.bet/leagues/active?sportId=${encodeURIComponent(sportId)}`);
  sxBetCaches.leagues[sport] = leagues;
  return leagues;
}

async function fetchSxBetLeagueMeta(sport, leagueId) {
  const leagues = await fetchSxBetLeaguesForSport(sport);
  const hints = sxBetLeagueHints[sport]?.[leagueId] || [];
  if (!hints.length) return null;
  return (leagues || []).find((league) => matchByHints(league.label, hints)) || null;
}

async function fetchSxBetFixtures(sport, leagueId) {
  const league = await fetchSxBetLeagueMeta(sport, leagueId);
  if (!league?.leagueId) return [];
  const cacheKey = `${sport}:${league.leagueId}`;
  if (sxBetCaches.fixtures[cacheKey]) return sxBetCaches.fixtures[cacheKey];
  const fixtures = await fetchSxBetJson(`https://api.sx.bet/fixture/active?leagueId=${encodeURIComponent(league.leagueId)}`);
  sxBetCaches.fixtures[cacheKey] = fixtures;
  return fixtures;
}

async function fetchSxBetMarketsForEvent(eventId) {
  if (sxBetCaches.markets[eventId]) return sxBetCaches.markets[eventId];
  const data = await fetchSxBetJson(`https://api.sx.bet/markets/active?eventId=${encodeURIComponent(eventId)}&onlyMainLine=true`);
  const markets = data?.markets || data || [];
  sxBetCaches.markets[eventId] = markets;
  return markets;
}

async function fetchSxBetUpcomingGames(sport, leagueId) {
  const league = await fetchSxBetLeagueMeta(sport, leagueId);
  const fixtures = await fetchSxBetFixtures(sport, leagueId);
  return fixtures.slice(0, 12).map((fixture) => normalizeSxBetFixture(fixture, sport, league?.label || ""));
}

async function fetchSxBetOddsEvents(sport, leagueId) {
  const fixtures = await fetchSxBetFixtures(sport, leagueId);
  const topFixtures = fixtures.slice(0, 8);
  const marketGroups = await Promise.all(topFixtures.map(async (fixture) => {
    try {
      const markets = await fetchSxBetMarketsForEvent(fixture.eventId || fixture.id);
      return normalizeSxBetOddsEvent(fixture, markets, sport);
    } catch (error) {
      return null;
    }
  }));
  return marketGroups.filter((item) => item && item.bookmakers?.length);
}

async function fetchBalldontlieGames(startDate, endDate) {
  const apiKey = window.BOT_CONFIG?.balldontlieApiKey;
  if (!apiKey) throw new Error("Falta la API key de balldontlie");

  const params = new URLSearchParams({
    start_date: startDate,
    end_date: endDate,
    per_page: "100",
  });
  const url = `https://api.balldontlie.io/v1/games?${params.toString()}`;
  const response = await fetch(url, {
    headers: {
      Authorization: apiKey,
    },
  });
  if (!response.ok) throw new Error(`balldontlie respondio ${response.status}`);
  const data = await response.json();
  return (data.data || []).map(normalizeBalldontlieGame);
}

function currentSeasonForNba() {
  const now = new Date();
  const year = now.getFullYear();
  return now.getMonth() + 1 < 8 ? year - 1 : year;
}

function currentSeasonForMlb() {
  return new Date().getFullYear();
}

async function fetchBalldontlieNbaStandings() {
  const apiKey = window.BOT_CONFIG?.balldontlieApiKey;
  if (!apiKey) return [];
  const season = currentSeasonForNba();
  const response = await fetch(`https://api.balldontlie.io/v1/standings?season=${season}`, {
    headers: { Authorization: apiKey },
  });
  if (!response.ok) throw new Error(`balldontlie standings respondio ${response.status}`);
  const data = await response.json();
  return data.data || [];
}

async function fetchBalldontlieNbaInjuries() {
  const apiKey = window.BOT_CONFIG?.balldontlieApiKey;
  if (!apiKey) return [];
  const response = await fetch("https://api.balldontlie.io/v1/player_injuries?per_page=100", {
    headers: { Authorization: apiKey },
  });
  if (!response.ok) throw new Error(`balldontlie injuries respondio ${response.status}`);
  const data = await response.json();
  return data.data || [];
}

async function fetchBalldontlieNbaPlayersSearch(playerName) {
  const apiKey = window.BOT_CONFIG?.balldontlieApiKey;
  const query = String(playerName || "").trim();
  if (!apiKey || !query) return [];
  const cacheKey = normalizeName(query);
  if (nbaPlayerSearchCache[cacheKey]) return nbaPlayerSearchCache[cacheKey];
  const params = new URLSearchParams({ search: query, per_page: "10" });
  const response = await fetch(`https://api.balldontlie.io/v1/players?${params.toString()}`, {
    headers: { Authorization: apiKey },
  });
  if (!response.ok) throw new Error(`balldontlie players respondio ${response.status}`);
  const data = await response.json();
  nbaPlayerSearchCache[cacheKey] = data.data || [];
  return nbaPlayerSearchCache[cacheKey];
}

async function fetchBalldontlieNbaPlayerStatsSummary(playerName) {
  const query = String(playerName || "").trim();
  if (!query) return null;
  const cacheKey = normalizeName(query);
  if (nbaPlayerStatsCache[cacheKey]) return nbaPlayerStatsCache[cacheKey];
  const matches = await fetchBalldontlieNbaPlayersSearch(query);
  if (!matches.length) return null;
  const exact = matches.find((player) => normalizeName(`${player.first_name || ""} ${player.last_name || ""}`) === cacheKey) || matches[0];
  const playerId = exact?.id;
  if (!playerId) return null;
  const apiKey = window.BOT_CONFIG?.balldontlieApiKey;
  const season = currentSeasonForNba();
  const params = new URLSearchParams({ per_page: "100", "player_ids[]": String(playerId), "seasons[]": String(season) });
  const response = await fetch(`https://api.balldontlie.io/v1/stats?${params.toString()}`, {
    headers: { Authorization: apiKey },
  });
  if (!response.ok) throw new Error(`balldontlie stats respondio ${response.status}`);
  const data = await response.json();
  const rows = [...(data.data || [])]
    .filter((row) => statsGameDate(row))
    .sort((a, b) => new Date(statsGameDate(b)) - new Date(statsGameDate(a)));
  const recent = rows.slice(0, 5);
  const injuries = await fetchBalldontlieNbaInjuries();
  const injury = injuries.find((item) => Number(item.player?.id || 0) === Number(playerId));
  const summary = {
    source: "balldontlie",
    playerId,
    playerName: `${exact.first_name || ""} ${exact.last_name || ""}`.trim(),
    teamId: exact.team?.id || exact.team_id || null,
    teamName: exact.team?.full_name || "",
    recentGames: recent.length,
    seasonGames: rows.length,
    recent: {
      pts: numericAverageFromStats(recent, "pts"),
      reb: numericAverageFromStats(recent, "reb"),
      ast: numericAverageFromStats(recent, "ast"),
      fg3m: numericAverageFromStats(recent, "fg3m"),
      min: averageMinutesFromStats(recent),
    },
    season: {
      pts: numericAverageFromStats(rows, "pts"),
      reb: numericAverageFromStats(rows, "reb"),
      ast: numericAverageFromStats(rows, "ast"),
      fg3m: numericAverageFromStats(rows, "fg3m"),
      min: averageMinutesFromStats(rows),
    },
    injured: Boolean(injury),
    injuryLabel: injury?.status || injury?.description || "",
  };
  nbaPlayerStatsCache[cacheKey] = summary;
  return summary;
}

async function buildNbaPropStatsBook(oddsEvents = []) {
  const propPlayers = new Set();
  oddsEvents.forEach((event) => {
    (event.bookmakers || []).forEach((bookmaker) => {
      (bookmaker.markets || [])
        .filter((market) => String(market.key || "").startsWith("player_"))
        .forEach((market) => {
          (market.outcomes || []).forEach((outcome) => {
            const player = outcome.description || market.description || "";
            if (player) propPlayers.add(player);
          });
        });
    });
  });
  const players = [...propPlayers].slice(0, 18);
  const pyEspnBook = await fetchPyEspnPropStatsBook("nba", players);
  const entries = await Promise.all(players.map(async (player) => {
    try {
      return await fetchBalldontlieNbaPlayerStatsSummary(player);
    } catch (error) {
      return null;
    }
  }));
  const balldontlieBook = Object.fromEntries(
    entries
      .filter(Boolean)
      .map((entry) => [normalizeName(entry.playerName || ""), entry])
  );
  const keys = [...new Set([...Object.keys(pyEspnBook || {}), ...Object.keys(balldontlieBook)])];
  return Object.fromEntries(
    keys.map((key) => {
      const espnEntry = pyEspnBook[key] || null;
      const balldontlieEntry = balldontlieBook[key] || null;
      const merged = mergePropStatsEntry(
        balldontlieEntry,
        espnEntry,
        espnEntry && balldontlieEntry ? "pyespn+balldontlie" : espnEntry ? "pyespn-nba" : (balldontlieEntry?.source || "")
      );
      return [key, merged];
    }).filter(([, entry]) => entry)
  );
}

function averageNumbers(values = []) {
  const filtered = values.map(Number).filter(Number.isFinite);
  return filtered.length ? filtered.reduce((sum, value) => sum + value, 0) / filtered.length : 0;
}

function extractSportsDataIoStat(row = {}, keys = []) {
  for (const key of keys) {
    const value = Number(row?.[key]);
    if (Number.isFinite(value)) return value;
  }
  return 0;
}

function inferredNflSeason() {
  const override = Number(window.BOT_CONFIG?.nflSeasonOverride || 0);
  if (override) return override;
  const now = new Date();
  const month = now.getMonth() + 1;
  return month >= 8 ? now.getFullYear() : now.getFullYear() - 1;
}

function inferredNflWeek() {
  const override = Number(window.BOT_CONFIG?.nflWeekOverride || 0);
  if (override) return override;
  return 1;
}

async function fetchSportsDataIoNflPlayerProjections() {
  const apiKey = window.BOT_CONFIG?.sportsdataApiKey;
  if (!apiKey) return [];
  const season = inferredNflSeason();
  const week = inferredNflWeek();
  const cacheKey = `${season}-${week}`;
  if (nflPlayerProjectionCache[cacheKey]) return nflPlayerProjectionCache[cacheKey];
  const template = window.BOT_CONFIG?.sportsDataIoNflPlayerProjectionUrl
    || "https://api.sportsdata.io/v3/nfl/projections/json/PlayerGameProjectionStatsByWeek/{season}/{week}";
  const url = replaceTemplateTokens(template, { season, week });
  const data = await fetchSportsDataIoJson(url);
  nflPlayerProjectionCache[cacheKey] = Array.isArray(data) ? data : [];
  return nflPlayerProjectionCache[cacheKey];
}

async function fetchSportsDataIoNflPlayerGameStatsByWeek(week) {
  const apiKey = window.BOT_CONFIG?.sportsdataApiKey;
  const season = inferredNflSeason();
  if (!apiKey || !season || !week) return [];
  const cacheKey = `${season}-${week}`;
  if (nflPlayerGameLogCache[cacheKey]) return nflPlayerGameLogCache[cacheKey];
  const template = window.BOT_CONFIG?.sportsDataIoNflPlayerGameStatsUrl
    || "https://api.sportsdata.io/v3/nfl/stats/json/PlayerGameStatsByWeek/{season}/{week}";
  const url = replaceTemplateTokens(template, { season, week });
  const data = await fetchSportsDataIoJson(url);
  nflPlayerGameLogCache[cacheKey] = Array.isArray(data) ? data : [];
  return nflPlayerGameLogCache[cacheKey];
}

async function fetchSportsDataIoNflRecentGameLogs() {
  const currentWeek = inferredNflWeek();
  const lastCompletedWeek = Math.max(currentWeek - 1, 0);
  if (!lastCompletedWeek) return [];
  const startWeek = Math.max(1, lastCompletedWeek - 4);
  const weeks = [];
  for (let week = startWeek; week <= lastCompletedWeek; week += 1) weeks.push(week);
  const rows = (await Promise.all(weeks.map((week) => fetchSportsDataIoNflPlayerGameStatsByWeek(week)))).flat();
  return rows
    .filter((row) => row?.Name)
    .map((row) => ({ ...row, __week: Number(row.Week || row.__week || 0) }));
}

function summarizeSportsDataIoNflLogs(rows = []) {
  const recent = rows.slice(0, 5);
  const statAvg = (collection, keys) => averageNumbers(collection.map((row) => extractSportsDataIoStat(row, keys)));
  return {
    recentGames: recent.length,
    seasonGames: rows.length,
    recent: {
      pass_yds: statAvg(recent, ["PassingYards"]),
      pass_tds: statAvg(recent, ["PassingTouchdowns"]),
      rush_yds: statAvg(recent, ["RushingYards"]),
      rec_yds: statAvg(recent, ["ReceivingYards"]),
      td: statAvg(recent, ["Touchdowns", "ReceivingTouchdowns", "RushingTouchdowns", "PassingTouchdowns"]),
      min: 0,
    },
    season: {
      pass_yds: statAvg(rows, ["PassingYards"]),
      pass_tds: statAvg(rows, ["PassingTouchdowns"]),
      rush_yds: statAvg(rows, ["RushingYards"]),
      rec_yds: statAvg(rows, ["ReceivingYards"]),
      td: statAvg(rows, ["Touchdowns", "ReceivingTouchdowns", "RushingTouchdowns", "PassingTouchdowns"]),
      min: 0,
    },
  };
}

async function buildNflPropStatsBook(oddsEvents = []) {
  const propPlayers = new Set();
  oddsEvents.forEach((event) => {
    (event.bookmakers || []).forEach((bookmaker) => {
      (bookmaker.markets || [])
        .filter((market) => String(market.key || "").startsWith("player_"))
        .forEach((market) => {
          (market.outcomes || []).forEach((outcome) => {
            const player = outcome.description || market.description || "";
            if (player) propPlayers.add(player);
          });
        });
    });
  });
  const playerKeys = [...propPlayers].map((name) => normalizeName(name)).filter(Boolean);
  if (!playerKeys.length) return {};
  const pyEspnBook = await fetchPyEspnPropStatsBook("nfl", [...propPlayers]);

  const [projectionRows, gameLogRows] = await Promise.all([
    fetchSportsDataIoNflPlayerProjections(),
    fetchSportsDataIoNflRecentGameLogs(),
  ]);

  const projectionsByPlayer = new Map(
    projectionRows
      .filter((row) => row?.Name)
      .map((row) => [normalizeName(row.Name), row])
  );
  const logsByPlayer = {};
  gameLogRows
    .filter((row) => row?.Name)
    .sort((a, b) => Number(b.__week || 0) - Number(a.__week || 0))
    .forEach((row) => {
      const key = normalizeName(row.Name);
      if (!key) return;
      if (!logsByPlayer[key]) logsByPlayer[key] = [];
      logsByPlayer[key].push(row);
    });

  const sportsDataBook = Object.fromEntries(
    playerKeys.map((key) => {
      const projection = projectionsByPlayer.get(key) || null;
      const logs = logsByPlayer[key] || [];
      const summary = summarizeSportsDataIoNflLogs(logs);
      const projectionPack = {
        pass_yds: Number(projection?.PassingYards || 0),
        pass_tds: Number(projection?.PassingTouchdowns || 0),
        rush_yds: Number(projection?.RushingYards || 0),
        rec_yds: Number(projection?.ReceivingYards || 0),
        td: Number(projection?.Touchdowns || projection?.ReceivingTouchdowns || projection?.RushingTouchdowns || projection?.PassingTouchdowns || 0),
        min: 0,
      };
      return [
        key,
        {
          source: projection && logs.length ? "sportsdataio-hybrid" : "sportsdataio",
          playerId: projection?.PlayerID || projection?.PlayerId || logs[0]?.PlayerID || logs[0]?.PlayerId || null,
          playerName: projection?.Name || logs[0]?.Name || "",
          teamName: projection?.Team || projection?.TeamID || logs[0]?.Team || logs[0]?.TeamID || "",
          recentGames: summary.recentGames,
          seasonGames: summary.seasonGames,
          recent: summary.recent,
          season: summary.season,
          projection: projectionPack,
          injured: Boolean(projection?.InjuryStatus || projection?.InjuryPractice || projection?.DeclaredInactive),
          injuryLabel: projection?.InjuryStatus || projection?.InjuryPractice || "",
          projected: Boolean(projection),
        },
      ];
    }).filter(([, entry]) => entry.playerName || entry.projected || entry.recentGames)
  );
  const keys = [...new Set([...playerKeys, ...Object.keys(pyEspnBook || {})])];
  return Object.fromEntries(
    keys.map((key) => {
      const espnEntry = pyEspnBook[key] || null;
      const sportsDataEntry = sportsDataBook[key] || null;
      const merged = mergePropStatsEntry(
        sportsDataEntry,
        espnEntry,
        espnEntry && sportsDataEntry ? "pyespn-sportsdataio-hybrid" : espnEntry ? "pyespn-nfl" : (sportsDataEntry?.source || "")
      );
      return [key, merged];
    }).filter(([, entry]) => entry)
  );
}

async function fetchSportsDataIoMlbStartingLineupsByDate(dateValue) {
  const apiKey = window.BOT_CONFIG?.sportsdataApiKey;
  if (!apiKey || !dateValue) return [];
  const template = window.BOT_CONFIG?.sportsDataIoMlbLineupsUrl
    || "https://api.sportsdata.io/v3/mlb/projections/json/StartingLineupsByDate/{date}";
  const url = replaceTemplateTokens(template, { date: dateValue });
  const data = await fetchSportsDataIoJson(url);
  return Array.isArray(data) ? data : [];
}

function pickFirstArray(obj = {}, keys = []) {
  for (const key of keys) {
    if (Array.isArray(obj?.[key])) return obj[key];
  }
  return [];
}

function buildMlbLineupBook(lineupRows = []) {
  const book = {};
  lineupRows.forEach((row) => {
    const homeName = row.HomeTeamName || row.HomeTeam || row.Home || "";
    const awayName = row.AwayTeamName || row.AwayTeam || row.Away || "";
    const date = String(row.DateTime || row.Day || "").slice(0, 10);
    const homeLineup = pickFirstArray(row, ["HomeTeamLineup", "HomeLineup", "HomePlayers", "HomeStartingLineup"]);
    const awayLineup = pickFirstArray(row, ["AwayTeamLineup", "AwayLineup", "AwayPlayers", "AwayStartingLineup"]);
    const key = `${date}|${normalizeName(awayName)}|${normalizeName(homeName)}`;
    const summarizeHands = (lineup = []) => {
      const hands = lineup.reduce((acc, player) => {
        const rawHand = String(
          player?.BattingHand
          || player?.BatHand
          || player?.Bats
          || player?.BatSide
          || player?.BatsThrows?.Bats
          || player?.BatsThrows?.BatSide
          || player?.Player?.BattingHand
          || player?.Player?.BatHand
          || player?.Player?.Bats
          || ""
        ).trim().toUpperCase();
        if (rawHand.startsWith("L")) acc.left += 1;
        else if (rawHand.startsWith("R")) acc.right += 1;
        else if (rawHand.startsWith("S")) acc.switch += 1;
        else acc.unknown += 1;
        return acc;
      }, { left: 0, right: 0, switch: 0, unknown: 0 });
      hands.total = lineup.length;
      return hands;
    };
    const homeHands = summarizeHands(homeLineup);
    const awayHands = summarizeHands(awayLineup);
    book[key] = {
      confirmed: Boolean(row.HomeTeamBattingOrderConfirmed || row.AwayTeamBattingOrderConfirmed || row.BattingOrderConfirmed || row.Confirmed),
      homeCount: homeLineup.length,
      awayCount: awayLineup.length,
      homeLineup,
      awayLineup,
      homeHands,
      awayHands,
      source: "sportsdataio",
    };
  });
  return book;
}

function enrichMlbGameContext(game) {
  if (!game || game.sport !== "mlb") return game;
  const lineupKey = `${game.date || "Proximo"}|${normalizeName(game.away || "")}|${normalizeName(game.home || "")}`;
  const lineupInfo = currentMlbLineupBook[lineupKey] || null;
  return {
    ...game,
    lineupConfirmed: Boolean(lineupInfo?.confirmed || game.lineupConfirmed),
    lineupHomeCount: Number(lineupInfo?.homeCount || game.lineupHomeCount || 0),
    lineupAwayCount: Number(lineupInfo?.awayCount || game.lineupAwayCount || 0),
    lineupHomeHands: lineupInfo?.homeHands || game.lineupHomeHands || null,
    lineupAwayHands: lineupInfo?.awayHands || game.lineupAwayHands || null,
    lineupSource: lineupInfo?.source || game.lineupSource || "",
  };
}

async function fetchTheRundownEvents(sport, leagueId, date = isoToday()) {
  const apiKey = window.BOT_CONFIG?.theRundownApiKey;
  const sportId = theRundownSportIds[sport]?.[leagueId];
  if (!apiKey || !sportId) return [];

  const params = new URLSearchParams({
    key: apiKey,
    market_ids: "1,2,3",
    main_line: "true",
    offset: "300",
  });
  const url = `https://therundown.io/api/v2/sports/${sportId}/events/${date}?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`TheRundown respondio ${response.status}`);
  const data = await response.json();
  return data.events || [];
}

async function fetchOddsApi(sport, leagueId, marketsOverride = null) {
  const apiKey = window.BOT_CONFIG?.oddsApiKey;
  const sportKey = oddsSportKeys[sport]?.[leagueId];
  if (!apiKey || !sportKey) return [];

  const region = window.BOT_CONFIG?.oddsRegion || "us";
  const markets = marketsOverride || window.BOT_CONFIG?.oddsMarkets || "h2h,spreads,totals";
  const cacheKey = `${sportKey}-${region}-${markets}`;
  const cached = oddsCache[cacheKey];
  const now = Date.now();

  if (cached && now - cached.time < 10 * 60 * 1000) {
    log("Usando odds reales en cache para ahorrar cuota.");
    return cached.events;
  }

  const params = new URLSearchParams({
    apiKey,
    regions: region,
    markets,
    oddsFormat: "decimal",
    dateFormat: "iso",
  });
  const url = `https://api.the-odds-api.com/v4/sports/${encodeURIComponent(sportKey)}/odds?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`The Odds API respondio ${response.status}`);
  const events = await response.json();
  oddsCache[cacheKey] = { time: now, events };
  return events;
}

async function fetchPreferredOddsEvents(sport, leagueId, apiChoice) {
  if (apiChoice === "demo") return { source: "demo", events: [] };

  if (apiChoice === "sxbet") {
    try {
      const events = await fetchSxBetOddsEvents(sport, leagueId);
      if (events.length) return { source: "sxbet", events };
      log("SX Bet trajo fixtures/markets, pero sin precio utilizable. Fallback a The Odds API.");
    } catch (error) {
      log(`SX Bet no disponible para odds directas. Fallback a The Odds API. Detalle: ${error.message}`);
    }
  }

  if (apiChoice === "sportsapipro" || apiChoice === "auto") {
    try {
      const fixtures = await fetchSportsApiProFixtures(sport, leagueId);
      if (fixtures.length) {
        return {
          source: "sportsapipro",
          events: fixtures.map((fixture) => normalizeSportsApiProOddsEvent(fixture, sport)),
        };
      }
    } catch (error) {
      log(`Sports API Pro no disponible. Fallback a otras fuentes. Detalle: ${error.message}`);
    }
  }

  if (apiChoice === "therundown" || apiChoice === "auto") {
    try {
      const rawEvents = await fetchTheRundownEvents(sport, leagueId);
      if (rawEvents.length) {
        return {
          source: "therundown",
          events: rawEvents.map((event) => normalizeTheRundownOddsEvent(event, sport)),
        };
      }
    } catch (error) {
      log(`TheRundown no disponible. Fallback a The Odds API. Detalle: ${error.message}`);
    }
  }

  if (apiChoice === "oddsapi" || apiChoice === "auto" || apiChoice === "balldontlie" || apiChoice === "mlb" || apiChoice === "thesportsdb" || apiChoice === "sxbet") {
    try {
      return {
        source: "oddsapi",
        events: await fetchOddsApi(sport, leagueId),
      };
    } catch (error) {
      log(`The Odds API no disponible. Se usaran odds estimadas. Detalle: ${error.message}`);
    }
  }

  return { source: "demo", events: [] };
}

async function fetchValidationGames(sport, leagueId, apiChoice) {
  try {
    if (apiChoice === "sxbet") {
      return { source: "sxbet", games: await fetchSxBetUpcomingGames(sport, leagueId) };
    }

    if (sport === "nfl") {
      const oddsEvents = await fetchOddsApi(sport, leagueId);
      return { source: "oddsapi", games: oddsEvents.slice(0, 20).map((event) => normalizeOddsEvent(event, sport)) };
    }

    if (sport === "nba" && apiChoice !== "balldontlie") {
      return { source: "balldontlie", games: (await fetchBalldontlieUpcoming()).slice(0, 20) };
    }

    if (sport === "mlb" && apiChoice !== "mlb") {
      return { source: "mlb", games: (await fetchMlbSchedule()).slice(0, 20) };
    }

    if (sport === "soccer" && apiChoice !== "thesportsdb") {
      return { source: "thesportsdb", games: (await fetchSportsDb(sport, leagueId)).slice(0, 20) };
    }

    if (theRundownSportIds[sport]?.[leagueId] && apiChoice !== "therundown") {
      const events = await fetchTheRundownEvents(sport, leagueId);
      return { source: "therundown", games: events.slice(0, 20).map((event) => normalizeTheRundownGame(event, sport)) };
    }
  } catch (error) {
    log(`No se pudo cargar fuente secundaria para validacion. Detalle: ${error.message}`);
  }

  return { source: "demo", games: [] };
}

async function fetchExternalReferencePackage(sport, leagueId) {
  try {
    if (sport === "nfl") {
      return { source: "oddsapi", standings: {}, injuries: {} };
    }

    if (sport === "soccer") {
      const table = await fetchSportsDbTable(leagueId);
      return {
        source: "thesportsdb",
        standings: Object.fromEntries(table.map((row) => [normalizeName(row.strTeam), { position: Number(row.intRank || row.intPosition || 0), points: Number(row.intPoints || 0) }])),
        injuries: {},
      };
    }

    if (sport === "nba") {
      const standings = await fetchBalldontlieNbaStandings();
      const injuries = await fetchBalldontlieNbaInjuries();
      const teamMap = Object.fromEntries(standings.map((row) => [String(row.team?.id || ""), row.team?.display_name || row.team?.full_name || ""]));
      const injuryMap = {};
      injuries.forEach((item) => {
        const teamName = teamMap[String(item.player?.team_id || "")];
        if (!teamName) return;
        const key = normalizeName(teamName);
        injuryMap[key] = (injuryMap[key] || 0) + 1;
      });
      return {
        source: "balldontlie",
        standings: Object.fromEntries(standings.map((row) => [normalizeName(row.team?.display_name || row.team?.full_name || ""), { position: Number(row.conference_rank || row.playoff_seed || 0), winPct: Number(row.win_pct || 0) }])),
        injuries: injuryMap,
      };
    }

    if (sport === "mlb") {
      const standings = await fetchBalldontlieMlbStandings();
      const injuries = await fetchBalldontlieMlbInjuries();
      const teamMap = Object.fromEntries(standings.map((row) => [String(row.team?.id || ""), row.team?.display_name || `${row.team?.location || ""} ${row.team?.name || ""}`.trim()]));
      const injuryMap = {};
      injuries.forEach((item) => {
        const teamName = teamMap[String(item.player?.team_id || "")];
        if (!teamName) return;
        const key = normalizeName(teamName);
        injuryMap[key] = (injuryMap[key] || 0) + 1;
      });
      return {
        source: "balldontlie",
        standings: Object.fromEntries(standings.map((row) => [normalizeName(row.team?.display_name || `${row.team?.location || ""} ${row.team?.name || ""}`.trim()), { position: Number(row.division_rank || row.league_rank || 0), winPct: Number(row.percentage || row.win_pct || 0) }])),
        injuries: injuryMap,
      };
    }
  } catch (error) {
    log(`Referencias externas no disponibles. Detalle: ${error.message}`);
  }

  return { source: "base", standings: {}, injuries: {} };
}

async function fetchSportsDbRecent(sport, leagueId) {
  const key = els.apiKey.value.trim() || "123";
  const url = `https://www.thesportsdb.com/api/v1/json/${encodeURIComponent(key)}/eventspastleague.php?id=${encodeURIComponent(leagueId)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("TheSportsDB historico no respondio correctamente");
  const data = await response.json();
  const events = data.events || [];
  return events.slice(0, 30).map((event) => normalizeSportsDbEvent(event, sport));
}

async function fetchSportsDbTable(leagueId) {
  const key = els.apiKey.value.trim() || "123";
  const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${encodeURIComponent(key)}/lookuptable.php?l=${encodeURIComponent(leagueId)}`);
  if (!response.ok) throw new Error(`TheSportsDB table respondio ${response.status}`);
  const data = await response.json();
  return data.table || [];
}

async function fetchBalldontlieUpcoming() {
  const today = new Date();
  const end = new Date(today);
  end.setDate(today.getDate() + 7);
  return fetchBalldontlieGames(today.toISOString().slice(0, 10), end.toISOString().slice(0, 10));
}

async function fetchBalldontlieRecent() {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 14);
  const games = await fetchBalldontlieGames(start.toISOString().slice(0, 10), today.toISOString().slice(0, 10));
  return games.filter((game) => Number.isFinite(game.homeScore) && Number.isFinite(game.awayScore)).slice(-40);
}

async function fetchBalldontlieMlbStandings() {
  const apiKey = window.BOT_CONFIG?.balldontlieApiKey;
  if (!apiKey) return [];
  const season = currentSeasonForMlb();
  const response = await fetch(`https://api.balldontlie.io/mlb/v1/standings?season=${season}`, {
    headers: { Authorization: apiKey },
  });
  if (!response.ok) throw new Error(`balldontlie MLB standings respondio ${response.status}`);
  const data = await response.json();
  return data.data || [];
}

async function fetchBalldontlieMlbInjuries() {
  const apiKey = window.BOT_CONFIG?.balldontlieApiKey;
  if (!apiKey) return [];
  const response = await fetch("https://api.balldontlie.io/mlb/v1/player_injuries?per_page=100", {
    headers: { Authorization: apiKey },
  });
  if (!response.ok) throw new Error(`balldontlie MLB injuries respondio ${response.status}`);
  const data = await response.json();
  return data.data || [];
}

async function fetchMlbSchedule() {
  const today = new Date();
  const end = new Date(today);
  end.setDate(today.getDate() + 7);
  const startDate = today.toISOString().slice(0, 10);
  const endDate = end.toISOString().slice(0, 10);
  const url = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=${startDate}&endDate=${endDate}&hydrate=probablePitcher,team`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("MLB Stats API no respondio correctamente");
  const data = await response.json();
  return (data.dates || []).flatMap((date) => date.games || []).slice(0, 12).map(normalizeMlbGame);
}

async function fetchMlbRecent() {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 14);
  const startDate = start.toISOString().slice(0, 10);
  const endDate = today.toISOString().slice(0, 10);
  const url = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=${startDate}&endDate=${endDate}&hydrate=probablePitcher,team`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("MLB Stats API historico no respondio correctamente");
  const data = await response.json();
  return (data.dates || [])
    .flatMap((date) => date.games || [])
    .filter((game) => game.status?.abstractGameState === "Final")
    .slice(-40)
    .map((game) => normalizeMlbGame(game));
}

function buildFormBook(recentGames, sport) {
  const book = {};
  const profile = sportProfiles[sport];
  const baseTotal = profile.baseTotal || 1;

  recentGames
    .filter((game) => Number.isFinite(game.homeScore) && Number.isFinite(game.awayScore))
    .forEach((game) => {
      const teams = [
        { name: game.home, scored: game.homeScore, allowed: game.awayScore, won: game.homeScore > game.awayScore, side: "home" },
        { name: game.away, scored: game.awayScore, allowed: game.homeScore, won: game.awayScore > game.homeScore, side: "away" },
      ];

      teams.forEach((team) => {
        if (!book[team.name]) {
          book[team.name] = {
            games: 0,
            scored: 0,
            allowed: 0,
            wins: 0,
            cleanSheets: 0,
            bothScored: 0,
            homeGames: 0,
            homeScored: 0,
            homeAllowed: 0,
            homeWins: 0,
            awayGames: 0,
            awayScored: 0,
            awayAllowed: 0,
            awayWins: 0,
            lastAllowed: [],
            lastScored: [],
            lastMargins: [],
            lastTotals: [],
            lastResults: [],
          };
        }
        book[team.name].games += 1;
        book[team.name].scored += team.scored;
        book[team.name].allowed += team.allowed;
        book[team.name].wins += team.won ? 1 : 0;
        book[team.name].cleanSheets += team.allowed === 0 ? 1 : 0;
        book[team.name].bothScored += team.scored > 0 && team.allowed > 0 ? 1 : 0;
        book[team.name].lastAllowed.unshift(team.allowed);
        book[team.name].lastScored.unshift(team.scored);
        book[team.name].lastMargins.unshift(team.scored - team.allowed);
        book[team.name].lastTotals.unshift(team.scored + team.allowed);
        book[team.name].lastResults.unshift(team.won ? 1 : 0);

        const sidePrefix = team.side === "home" ? "home" : "away";
        book[team.name][`${sidePrefix}Games`] += 1;
        book[team.name][`${sidePrefix}Scored`] += team.scored;
        book[team.name][`${sidePrefix}Allowed`] += team.allowed;
        book[team.name][`${sidePrefix}Wins`] += team.won ? 1 : 0;
      });
    });

  Object.keys(book).forEach((team) => {
    const item = book[team];
    const scoredAvg = item.scored / item.games;
    const allowedAvg = item.allowed / item.games;
    const winRate = item.wins / item.games;
    const recentAllowedAvg = item.lastAllowed.length ? item.lastAllowed.slice(0, 5).reduce((sum, value) => sum + value, 0) / Math.min(item.lastAllowed.length, 5) : allowedAvg;
    const recentScoredAvg = item.lastScored.length ? item.lastScored.slice(0, 5).reduce((sum, value) => sum + value, 0) / Math.min(item.lastScored.length, 5) : scoredAvg;
    const homeScoredAvg = item.homeGames ? item.homeScored / item.homeGames : scoredAvg;
    const homeAllowedAvg = item.homeGames ? item.homeAllowed / item.homeGames : allowedAvg;
    const awayScoredAvg = item.awayGames ? item.awayScored / item.awayGames : scoredAvg;
    const awayAllowedAvg = item.awayGames ? item.awayAllowed / item.awayGames : allowedAvg;
    const homeWinRate = item.homeGames ? item.homeWins / item.homeGames : winRate;
    const awayWinRate = item.awayGames ? item.awayWins / item.awayGames : winRate;
    const sampleRecent = Math.min(item.lastScored.length, 5) || 1;
    const recentMarginAvg = item.lastMargins.length ? item.lastMargins.slice(0, 5).reduce((sum, value) => sum + value, 0) / sampleRecent : scoredAvg - allowedAvg;
    const totalAverage = item.lastTotals.length ? item.lastTotals.slice(0, 5).reduce((sum, value) => sum + value, 0) / sampleRecent : scoredAvg + allowedAvg;
    const recentWinRate = item.lastResults.length ? item.lastResults.slice(0, 5).reduce((sum, value) => sum + value, 0) / sampleRecent : winRate;
    const cleanSheetRate = item.games ? item.cleanSheets / item.games : 0;
    const bttsRate = item.games ? item.bothScored / item.games : 0;
    const paceScore = clamp(45 + ((totalAverage / baseTotal) - 1) * 26, 28, 88);
    const volatility = clamp(36 + (Math.abs(recentMarginAvg) / Math.max(baseTotal / 3, 1)) * 10 + Math.abs(recentScoredAvg - scoredAvg) * 5, 25, 85);
    book[team] = {
      attack: clamp(48 + (scoredAvg / baseTotal) * 42, 35, 105),
      defense: clamp(92 - (allowedAvg / baseTotal) * 32, 35, 105),
      form: clamp(38 + winRate * 56 + Math.min(item.games, 6), 30, 100),
      homeAttack: clamp(48 + (homeScoredAvg / baseTotal) * 42, 35, 105),
      homeDefense: clamp(92 - (homeAllowedAvg / baseTotal) * 32, 35, 105),
      awayAttack: clamp(48 + (awayScoredAvg / baseTotal) * 42, 35, 105),
      awayDefense: clamp(92 - (awayAllowedAvg / baseTotal) * 32, 35, 105),
      homeForm: clamp(36 + homeWinRate * 58 + Math.min(item.homeGames, 5), 30, 100),
      awayForm: clamp(36 + awayWinRate * 58 + Math.min(item.awayGames, 5), 30, 100),
      recentForm: clamp(38 + recentWinRate * 56 + Math.min(sampleRecent, 5), 30, 100),
      recentAttack: clamp(48 + (recentScoredAvg / baseTotal) * 42, 35, 105),
      recentDefense: clamp(92 - (recentAllowedAvg / baseTotal) * 32, 35, 105),
      scoringMargin: Number(recentMarginAvg.toFixed(2)),
      totalAverage: Number(totalAverage.toFixed(2)),
      cleanSheetRate: Number(cleanSheetRate.toFixed(2)),
      bttsRate: Number(bttsRate.toFixed(2)),
      paceScore: Number(paceScore.toFixed(1)),
      volatility: Number(volatility.toFixed(1)),
      bullpenForm: sport === "mlb" ? clamp(50 + ((allowedAvg - recentAllowedAvg) / Math.max(baseTotal / 2, 1)) * 18, 30, 80) : null,
      games: item.games,
      homeGames: item.homeGames,
      awayGames: item.awayGames,
    };
  });

  return book;
}

const sportsDataApi = {
  async getUpcomingGames({ sport, leagueId, apiChoice }) {
    if (apiChoice === "demo") return { games: demoGames[sport], source: "demo" };

    if (apiChoice === "sxbet") {
      const sxGames = await fetchSxBetUpcomingGames(sport, leagueId);
      let sxOddsEvents = [];
      try {
        sxOddsEvents = await fetchSxBetOddsEvents(sport, leagueId);
      } catch (error) {
        log(`SX Bet no pudo cargar markets mainline. Seguimos con fixtures. Detalle: ${error.message}`);
      }
      return { games: sxGames, source: "sxbet", oddsEvents: sxOddsEvents };
    }

    if (apiChoice === "sportsapipro") {
      const fixtures = await fetchSportsApiProFixtures(sport, leagueId);
      return {
        games: fixtures.map((fixture) => normalizeSportsApiProFixture(fixture, sport)).slice(0, 12),
        source: "sportsapipro",
        oddsEvents: fixtures.map((fixture) => normalizeSportsApiProOddsEvent(fixture, sport)),
      };
    }

    if (apiChoice === "backend") {
      const backendPackage = await fetchBackendPicksPackage(sport, leagueId);
      return {
        games: backendPackage.games || [],
        tips: backendPackage.tips || [],
        source: "backend",
        oddsEvents: backendPackage.oddsEvents || [],
        backendPackage,
      };
    }

    if (apiChoice === "therundown") {
      const events = await fetchTheRundownEvents(sport, leagueId);
      return { games: events.slice(0, 12).map((event) => normalizeTheRundownGame(event, sport)), source: "therundown", oddsEvents: events.map((event) => normalizeTheRundownOddsEvent(event, sport)) };
    }

    if (sport === "nfl" && (apiChoice === "auto" || apiChoice === "oddsapi")) {
      const oddsEvents = await fetchOddsApi(sport, leagueId);
      return { games: oddsEvents.slice(0, 12).map((event) => normalizeOddsEvent(event, sport)), source: "oddsapi", oddsEvents };
    }

    if (apiChoice === "auto") {
      try {
        const fixtures = await fetchSportsApiProFixtures(sport, leagueId);
        if (fixtures.length) {
          return {
            games: fixtures.map((fixture) => normalizeSportsApiProFixture(fixture, sport)).slice(0, 12),
            source: "sportsapipro",
            oddsEvents: fixtures.map((fixture) => normalizeSportsApiProOddsEvent(fixture, sport)),
          };
        }
      } catch (error) {
        log(`Auto no pudo usar Sports API Pro primero. Detalle: ${error.message}`);
      }
    }

    if (sport === "nba" && (apiChoice === "auto" || apiChoice === "balldontlie")) {
      return { games: (await fetchBalldontlieUpcoming()).slice(0, 12), source: "balldontlie" };
    }

    if (apiChoice === "oddsapi") {
      const oddsEvents = await fetchOddsApi(sport, leagueId);
      return { games: oddsEvents.slice(0, 12).map((event) => normalizeOddsEvent(event, sport)), source: "oddsapi", oddsEvents };
    }

    if (sport === "mlb" && (apiChoice === "auto" || apiChoice === "mlb")) {
      return { games: await fetchMlbSchedule(), source: "mlb" };
    }

    if (apiChoice === "auto" || apiChoice === "thesportsdb") {
      return { games: await fetchSportsDb(sport, leagueId), source: "thesportsdb" };
    }

    return { games: demoGames[sport], source: "demo" };
  },

  async getRecentGames({ sport, leagueId, apiChoice }) {
    if (apiChoice === "demo") return [];

    if (apiChoice === "sxbet") {
      if (sport === "nba") return fetchBalldontlieRecent();
      if (sport === "mlb") return fetchMlbRecent();
      if (sport === "soccer") return fetchSportsDbRecent(sport, leagueId);
      return [];
    }

    if (apiChoice === "sportsapipro") {
      const fixtures = await fetchSportsApiProFixtures(sport, leagueId);
      return fixtures
        .map((fixture) => normalizeSportsApiProFixture(fixture, sport))
        .filter((game) => Number.isFinite(game.homeScore) && Number.isFinite(game.awayScore))
        .slice(-40);
    }

    if (sport === "nfl") {
      return [];
    }

    if (sport === "nba" && (apiChoice === "auto" || apiChoice === "balldontlie")) {
      return fetchBalldontlieRecent();
    }

    if (sport === "mlb" && (apiChoice === "auto" || apiChoice === "mlb")) {
      return fetchMlbRecent();
    }

    if (apiChoice === "auto" || apiChoice === "thesportsdb") {
      return fetchSportsDbRecent(sport, leagueId);
    }

    return [];
  },
};

async function loadDataPackage() {
  const sport = els.sport.value;
  const leagueId = els.league.value;
  const apiChoice = els.api.value;
  const leagueMeta = selectedLeagueMeta();
  const health = {
    source: { state: "idle", detail: "Sin intentar" },
    recent: { state: "idle", detail: "Sin intentar" },
    odds: { state: "idle", detail: "Sin intentar" },
    external: { state: "idle", detail: "Sin intentar" },
    props: { state: "idle", detail: "Sin intentar" },
  };

  log("Consultando API interna del bot y fuentes gratuitas.");
  const upcoming = await sportsDataApi.getUpcomingGames({ sport, leagueId, apiChoice });
  if (apiChoice === "backend" && upcoming.backendPackage) {
    const backendGames = upcoming.backendPackage.games || [];
    const backendTips = upcoming.backendPackage.tips || [];
    if (!backendGames.length && !backendTips.length && workMode) {
      return {
        games: demoGames[sport],
        recentGames: [],
        formBook: {},
        scheduleContext: { lastPlayed: {} },
        source: "demo",
        leagueId,
        leagueName: leagueMeta?.name || sportProfiles[sport]?.apiName || "",
        oddsEvents: [],
        validationGames: [],
        validationSource: "demo",
        externalRef: { source: "demo", standings: {}, injuries: {} },
        health: {
          source: { state: "warn", detail: "Modo trabajo activo · usando demo local por bloqueo de red." },
          recent: { state: "warn", detail: "Sin historico por politica de red." },
          odds: { state: "warn", detail: "Sin odds reales por politica de red." },
          external: { state: "warn", detail: "Sin referencias externas por politica de red." },
        },
        updatedAt: new Date().toLocaleString("es-MX"),
        backendTips: [],
      };
    }
    return {
      games: backendGames,
      recentGames: upcoming.backendPackage.recentGames || [],
      formBook: {},
      scheduleContext: { lastPlayed: {} },
      source: "backend",
      leagueId,
      leagueName: leagueMeta?.name || sportProfiles[sport]?.apiName || "",
      oddsEvents: upcoming.backendPackage.oddsEvents || [],
      validationGames: [],
      validationSource: "backend",
      externalRef: upcoming.backendPackage.externalRef || { source: "backend", standings: {}, injuries: {} },
      health: upcoming.backendPackage.health || health,
      updatedAt: upcoming.backendPackage.updatedAt || new Date().toLocaleString("es-MX"),
      backendTips,
    };
  }
  health.source = {
    state: upcoming.games?.length ? "ok" : "warn",
    detail: `${dataSourceLabels[upcoming.source] || upcoming.source} · ${upcoming.games?.length || 0} partido(s)`,
  };
  if (sport === "mlb") {
    try {
      const lineupDates = [...new Set((upcoming.games || []).map((game) => game.date).filter(Boolean))].slice(0, 4);
      const lineupRows = (await Promise.all(lineupDates.map((date) => fetchSportsDataIoMlbStartingLineupsByDate(date)))).flat();
      currentMlbLineupBook = buildMlbLineupBook(lineupRows);
    } catch (error) {
      currentMlbLineupBook = {};
      log(`Lineups MLB no disponibles. Seguimos sin esa capa. Detalle: ${error.message}`);
    }
  } else {
    currentMlbLineupBook = {};
  }
  const validationPackage = await fetchValidationGames(sport, leagueId, apiChoice);
  let recentGames = [];
  let oddsEvents = upcoming.oddsEvents || [];
  let externalRef = { source: "base", standings: {}, injuries: {} };

  try {
    recentGames = await sportsDataApi.getRecentGames({ sport, leagueId, apiChoice });
    health.recent = {
      state: recentGames.length ? "ok" : "warn",
      detail: `${recentGames.length} resultado(s) recientes cargados`,
    };
  } catch (error) {
    health.recent = { state: "warn", detail: `Historico no disponible: ${error.message}` };
    log(`No se pudo cargar historico reciente. Se usaran ratings mixtos. Detalle: ${error.message}`);
  }

  if (!oddsEvents.length && apiChoice !== "demo") {
    try {
      const preferredOdds = await fetchPreferredOddsEvents(sport, leagueId, apiChoice);
      oddsEvents = preferredOdds.events;
      health.odds = {
        state: oddsEvents.length ? "ok" : "warn",
        detail: oddsEvents.length
          ? `${dataSourceLabels[preferredOdds.source] || preferredOdds.source} · ${oddsEvents.length} evento(s)`
          : "Sin odds reales; usando estimadas",
      };
      if (oddsEvents.length) {
        log(`Odds reales cargadas desde ${dataSourceLabels[preferredOdds.source] || preferredOdds.source}: ${oddsEvents.length} eventos.`);
      }
    } catch (error) {
      health.odds = { state: "warn", detail: `Odds no disponibles: ${error.message}` };
    }
  } else {
    health.odds = {
      state: oddsEvents.length ? "ok" : "warn",
      detail: oddsEvents.length ? `Odds activas desde ${dataSourceLabels[upcoming.source] || upcoming.source}` : "Sin odds reales en la fuente principal",
    };
  }

  const propsMarkets = propsMarketsForSport(sport);
  if ((sport === "nba" || sport === "nfl") && apiChoice !== "demo" && propsMarkets) {
    try {
      const propEvents = await fetchOddsApi(sport, leagueId, propsMarkets);
      if (propEvents.length) {
        oddsEvents = mergeOddsEvents(oddsEvents, propEvents, sport);
        const propCount = oddsEvents.reduce((sum, event) => sum + buildPropMarketEntriesForEvent(event).length, 0);
        if (sport === "nba") {
          currentPropStatsBook = await buildNbaPropStatsBook(oddsEvents);
          const nbaStatsCount = Object.keys(currentPropStatsBook || {}).length;
          const pyEspnCount = Object.values(currentPropStatsBook || {}).filter((entry) => String(entry?.source || "").includes("pyespn")).length;
          health.props = {
            state: nbaStatsCount ? "ok" : "warn",
            detail: nbaStatsCount
              ? (pyEspnCount
                ? `PyESPN + stats NBA para ${pyEspnCount} jugador(es)`
                : `Stats reales NBA activas para ${nbaStatsCount} jugador(es)`)
              : "Props NBA cargados, pero sin stats reales enlazadas",
          };
        } else if (sport === "nfl") {
          currentPropStatsBook = await buildNflPropStatsBook(oddsEvents);
          const nflPropEntries = Object.values(currentPropStatsBook || {});
          const pyEspnHybridCount = nflPropEntries.filter((entry) => entry?.source === "pyespn-sportsdataio-hybrid").length;
          const hybridCount = nflPropEntries.filter((entry) => entry?.source === "sportsdataio-hybrid").length;
          const pyEspnOnlyCount = nflPropEntries.filter((entry) => entry?.source === "pyespn-nfl").length;
          const projectionOnlyCount = nflPropEntries.filter((entry) => entry?.source === "sportsdataio").length;
          if (!window.BOT_CONFIG?.sportsdataApiKey || window.BOT_CONFIG?.sportsdataApiKey === "replace_me") {
            log("NFL props: sin SportsDataIO configurado, seguimos con consenso de books hasta conectar game logs reales.");
            health.props = {
              state: pyEspnOnlyCount ? "ok" : "warn",
              detail: pyEspnOnlyCount
                ? `${pyEspnOnlyCount} jugador(es) NFL con game logs ESPN`
                : "SportsDataIO no configurado; NFL props sigue en consenso de books",
            };
          } else if (pyEspnHybridCount || hybridCount) {
            log(`NFL props: ${pyEspnHybridCount || hybridCount} jugador(es) ya combinan logs reales con proyeccion semanal.${projectionOnlyCount ? ` ${projectionOnlyCount} siguen solo con proyeccion.` : ""}`);
            health.props = {
              state: "ok",
              detail: `${pyEspnHybridCount || hybridCount} jugador(es) NFL con logs + proyeccion${projectionOnlyCount ? ` | ${projectionOnlyCount} solo proyeccion` : ""}${pyEspnOnlyCount ? ` | ${pyEspnOnlyCount} solo PyESPN` : ""}`,
            };
          } else if (pyEspnOnlyCount) {
            health.props = {
              state: "ok",
              detail: `${pyEspnOnlyCount} jugador(es) NFL con game logs ESPN`,
            };
          } else if (projectionOnlyCount) {
            log(`NFL props: hay ${projectionOnlyCount} jugador(es) con proyeccion, pero aun no entran game logs recientes para esta semana.`);
            health.props = {
              state: "warn",
              detail: `${projectionOnlyCount} jugador(es) NFL con proyeccion, aun sin game logs recientes`,
            };
          } else {
            health.props = {
              state: "warn",
              detail: "Props NFL cargados, pero sin datos de jugador enlazados",
            };
          }
        } else {
          currentPropStatsBook = {};
          health.props = { state: "idle", detail: "Sin props para este deporte" };
        }
        if (propCount) {
          health.odds = {
            state: "ok",
            detail: `${health.odds.detail}${health.odds.detail.includes("props") ? "" : ` | props ${propCount}`}`,
          };
          log(`Props reales cargados para ${sport.toUpperCase()}: ${propCount} mercado(s) de jugador.`);
        }
      } else {
        health.props = { state: "warn", detail: `No llegaron props reales para ${sport.toUpperCase()}` };
      }
    } catch (error) {
      currentPropStatsBook = {};
      health.props = { state: "warn", detail: `Props no disponibles: ${error.message}` };
      log(`Props no disponibles para ${sport.toUpperCase()}. Seguimos sin ellos. Detalle: ${error.message}`);
    }
  } else {
    currentPropStatsBook = {};
    health.props = { state: "idle", detail: "No aplica para este deporte o fuente" };
  }

  try {
    externalRef = await fetchExternalReferencePackage(sport, leagueId);
    const extCount = Object.keys(externalRef.standings || {}).length + Object.keys(externalRef.injuries || {}).length;
    health.external = {
      state: extCount ? "ok" : "warn",
      detail: extCount ? `Referencia ${externalRef.source} activa` : "Sin referencias externas utiles",
    };
  } catch (error) {
    health.external = { state: "warn", detail: `Referencia externa no disponible: ${error.message}` };
  }
  const updatedAt = new Date().toLocaleString("es-MX");
  const preparedGames = sport === "mlb" ? (upcoming.games || []).map(enrichMlbGameContext) : upcoming.games;

  return {
    games: preparedGames,
    recentGames,
    formBook: buildFormBook(recentGames, sport),
    scheduleContext: buildScheduleContext(upcoming.games, recentGames),
    source: upcoming.source,
    leagueId,
    leagueName: leagueMeta?.name || sportProfiles[sport]?.apiName || "",
    oddsEvents,
    validationGames: validationPackage.games,
    validationSource: validationPackage.source,
    externalRef,
    health,
    updatedAt,
  };
}

function renderTips(tips) {
  els.tips.innerHTML = "";

  if (!tips.length) {
    els.tips.innerHTML = `<div class="empty">${els.realOnly?.checked ? "No hay picks reales que superen el filtro actual para este slate." : "No hay tips que superen el filtro actual. Baja la confianza minima o desactiva picks fuertes."}</div>`;
    return;
  }

  tips.forEach((tip) => {
    const card = document.createElement("article");
    const confidenceClass = tip.confidence >= 62 ? "high" : tip.confidence >= 54 ? "medium" : "low";
    const id = tipId(tip);
    const suggestedStake = recommendedStakeForTip(tip);
    const reality = pickRealityMeta(tip);
    const competition = competitionClassMeta(tip);
    const trustScore = trustScoreForTip(tip);
    const grade = recommendationGradeMeta(tip);
    const mlbPitcherBadge = tip.game.sport === "mlb"
      ? (tip.game.homePitcher && tip.game.awayPitcher
          ? `Abridores confirmados${Number.isFinite(tip.game.homePitcherEra) && Number.isFinite(tip.game.awayPitcherEra) ? ` · ERA ${tip.game.awayPitcherEra.toFixed(2)} / ${tip.game.homePitcherEra.toFixed(2)}` : ""}`
          : "Abridores por confirmar")
      : "";
    const mlbSplitBadge = mlbSplitBadgeMeta(tip.game);
    const mlbPitcherClass = tip.game.sport === "mlb"
      ? (tip.game.homePitcher && tip.game.awayPitcher
          ? (Number.isFinite(tip.game.homePitcherEra) && Number.isFinite(tip.game.awayPitcherEra) && tip.game.homePitcherEra <= 3.4 && tip.game.awayPitcherEra <= 3.4
              ? "mlb-signal elite"
              : "mlb-signal confirmed")
          : "mlb-signal pending")
      : "";
    currentTrackingItems[id] = { kind: "tip", payload: tip };
    card.className = "tip-card";
    card.innerHTML = `
      <div>
        <p class="match">${tip.game.away} @ ${tip.game.home}</p>
        <div class="pick-head">
          <p class="pick"><strong>${tip.type}:</strong> ${tip.pick}</p>
          <span class="pick-clean-badge ${tip.confidence >= 60 ? "safe" : tip.confidence >= 55 ? "medium" : "light"}">${tip.confidence >= 60 ? "Pick seguro" : tip.confidence >= 55 ? "Pick estable" : "Pick vivo"}</span>
        </div>
        <p class="reason">${tip.reason.split(". ").slice(0, 2).join(". ")}.</p>
        <div class="pill-row">
          <span class="pill">${tip.game.date}</span>
          <span class="pill pick-reality ${reality.key}">${reality.label}</span>
          <span class="pill competition-tag ${competition.key}">${competition.label}</span>
          ${tip.leagueName ? `<span class="pill">${tip.leagueName}</span>` : ""}
          <span class="pill">${sportProfiles[tip.game.sport].apiName}</span>
          <span class="pill">Cuota ${tip.market}${tip.line ? ` ${tip.line}` : ""} ${tip.odds.toFixed(2)}x</span>
          <span class="pill">${tip.oddsSource}: ${tip.bookmaker}</span>
          <span class="pill">Imp. ${toPercent((tip.impliedProbability || 0) * 100)}</span>
          <span class="pill">Modelo ${toPercent((tip.modelProbability || 0) * 100)}</span>
          <span class="pill">EV ${tip.ev > 0 ? "+" : ""}${tip.ev}%</span>
          <span class="pill grade-pill ${grade.key}">${grade.grade}</span>
          <span class="pill trust-pill ${trustTierForTip(tip)}">${grade.label} · ${trustLabelForTip(tip)} · ${trustScore}</span>
          <span class="pill value-band"><span class="value-dot ${tip.valueTier || valueTier(tip.edge)}"></span>${tip.valueLabel || valueLabel(tip.edge)}</span>
          <span class="pill">Stake sug. ${money(tip.recommendedStake ?? suggestedStake)}</span>
          <span class="pill">Riesgo ${tip.riskLabel || "Medio"}</span>
          ${mlbPitcherBadge ? `<span class="pill ${mlbPitcherClass}">${mlbPitcherBadge}</span>` : ""}
          ${mlbSplitBadge ? `<span class="pill mlb-signal ${mlbSplitBadge.key}">${mlbSplitBadge.label}</span>` : ""}
        </div>
        <p class="reason">${reality.detail}</p>
        <div class="track-row">
          <input class="stake-field" type="number" min="0.1" step="0.1" value="${suggestedStake}" data-stake-id="${id}" />
          <button class="ghost-btn" type="button" data-share-tip="${id}">Imagen</button>
          <button class="ghost-btn" type="button" data-ticket-add="${id}">Al ticket</button>
          <button class="track-btn" type="button" data-history-action="pending" data-history-id="${id}">Guardar</button>
          <button class="track-btn win" type="button" data-history-action="win" data-history-id="${id}">Ganado</button>
          <button class="track-btn loss" type="button" data-history-action="loss" data-history-id="${id}">Perdido</button>
        </div>
      </div>
      <div class="confidence ${confidenceClass}">${toPercent(tip.confidence)}</div>
    `;
    els.tips.appendChild(card);
  });
}

function renderParlays(parlays) {
  els.parlays.innerHTML = "";

  if (!parlays.length) {
    els.parlays.innerHTML = "<div class=\"empty\">No hay suficientes picks para armar parlays. Baja el filtro de confianza o genera mas partidos.</div>";
    return;
  }

  parlays.forEach((parlay) => {
    const card = document.createElement("article");
    const id = parlayId(parlay);
    const suggestedStake = recommendedStakeForParlay(parlay);
    currentTrackingItems[id] = { kind: "parlay", payload: parlay };
    card.className = `parlay-card ${parlay.className}`;
    const legs = parlay.legs.map((tip) => `
      <li>
        <span class="leg-match">${tip.game.away} @ ${tip.game.home}</span>
        <span class="leg-pick">${tip.type}: ${tip.pick} - ${tip.odds.toFixed(2)}x</span>
      </li>
    `).join("");

    card.innerHTML = `
      <div class="parlay-top">
        <p class="parlay-title">${parlay.name}</p>
        <span class="parlay-risk">${parlay.risk}</span>
      </div>
      <ul class="parlay-legs">${legs}</ul>
      <div class="parlay-meta">
        <div>
          <span>Cuota est.</span>
          <strong>${parlay.odds.toFixed(2)}x</strong>
        </div>
        <div>
          <span>Prob. est.</span>
          <strong>${toPercent(parlay.hitRate)}</strong>
        </div>
      </div>
      <p class="parlay-note">${parlay.note}</p>
      <div class="track-row">
        <input class="stake-field" type="number" min="0.1" step="0.1" value="${suggestedStake}" data-stake-id="${id}" />
        <button class="ghost-btn" type="button" data-ticket-add="${id}">Al ticket</button>
        <button class="track-btn" type="button" data-history-action="pending" data-history-id="${id}">Guardar</button>
        <button class="track-btn win" type="button" data-history-action="win" data-history-id="${id}">Ganado</button>
        <button class="track-btn loss" type="button" data-history-action="loss" data-history-id="${id}">Perdido</button>
      </div>
    `;
    els.parlays.appendChild(card);
  });
}

function updateStats(games, tips, evStats = {}) {
  const avg = tips.length ? tips.reduce((sum, tip) => sum + tip.confidence, 0) / tips.length : 0;
  const realCount = tips.filter((tip) => isRealTip(tip)).length;
  els.gamesCount.textContent = games.length;
  els.tipsCount.textContent = tips.length;
  els.realTipsCount.textContent = `${realCount}/${tips.length}`;
  els.avgConfidence.textContent = toPercent(avg);
  els.evValidCount.textContent = String(evStats.valid ?? tips.length);
  els.evRejectedCount.textContent = String(evStats.rejected ?? 0);
}

function renderEvRejectReasons(reasons = {}, { strongOnly = false, valid = 0, rejected = 0 } = {}) {
  const entries = Object.entries(reasons).sort((a, b) => b[1] - a[1]);
  els.slateDemandBadge.textContent = strongOnly && valid <= 3 ? "Slate exigente" : strongOnly ? "EV fuerte" : "Slate normal";

  if (!entries.length) {
    els.evRejectReasonsPanel.innerHTML = `<div class="empty">Todavia no hay rechazos que mostrar para esta corrida.</div>`;
    return;
  }

  els.evRejectReasonsPanel.innerHTML = [
    `
      <article class="alert-card">
        <div class="alert-top">
          <strong>Resumen del filtro</strong>
          <span>${valid} validos / ${rejected} rechazados</span>
        </div>
        <div class="alert-meta">
          <div>${strongOnly ? "Modo EV fuerte activo (min. 10%)." : "Modo EV normal activo (min. 5%)."}</div>
        </div>
      </article>
    `,
    ...entries.map(([label, count]) => `
      <article class="alert-card">
        <div class="alert-top">
          <strong>${label}</strong>
          <span>${count}</span>
        </div>
      </article>
    `),
  ].join("");
}

async function run() {
  setLoading(true);
  els.source.textContent = "Analizando";
  renderOpenBotHelp();

  try {
    const dataPackage = await loadDataPackage();
    const normalizedGames = dataPackage.games.length ? dataPackage.games : demoGames[els.sport.value];
    const targetSlateDate = selectTargetSlateDate(normalizedGames);
    currentCalendarDate = targetSlateDate;
    const slateGames = slateGamesForDate(normalizedGames, targetSlateDate);
    currentOddsBook = dataPackage.oddsEvents || [];
    if (!dataPackage.games.length) log("La API no trajo partidos proximos; se cargaron datos demo.");

    const settings = {
      risk: els.risk.value,
      minConfidence: els.minConfidence.value,
      confidenceMode: els.confidenceMode?.value || "auto",
      autoConfidence: (els.confidenceMode?.value || "auto") !== "manual",
      valueOnly: els.valueOnly.checked,
      realOnly: els.realOnly.checked,
      evStrongOnly: els.evStrongOnly?.checked,
    };
    const baseRawTips = Array.isArray(dataPackage.backendTips) && dataPackage.backendTips.length
      ? dataPackage.backendTips
      : slateGames.flatMap((game) => createTips(game, settings, dataPackage));
    const baseFallbackTips = Array.isArray(dataPackage.backendTips) && dataPackage.backendTips.length
      ? dataPackage.backendTips
      : slateGames.flatMap((game) => createTips(game, { ...settings, minConfidence: 48, valueOnly: false }, dataPackage));
    const seenRawValueKeys = new Set();
    const seenFallbackValueKeys = new Set();
    const preValidatedTips = baseRawTips
      .filter((tip) => !settings.valueOnly || tip.confidence >= 58)
      .filter((tip) => !settings.realOnly || isRealTip(tip))
      .map((tip) => validateTip(tip, dataPackage.validationGames, dataPackage))
      .map((tip) => externalSignalsForTip(tip, dataPackage));
    const confidencePackage = effectiveMinConfidence(preValidatedTips);
    syncConfidenceControls(confidencePackage);
    const rawTips = preValidatedTips
      .filter((tip) => tip.confidence >= Number(confidencePackage.threshold || settings.minConfidence));
    const fallbackTips = baseFallbackTips
      .filter((tip) => !settings.realOnly || isRealTip(tip))
      .map((tip) => validateTip(tip, dataPackage.validationGames, dataPackage))
      .map((tip) => externalSignalsForTip(tip, dataPackage))
      .filter((tip) => tip.confidence >= Math.max(48, Number(confidencePackage.threshold || settings.minConfidence) - 3));
    const rejectReasons = {};
    const rawEvaluated = rawTips.map((tip) => ({ tip, verdict: passesValueFilters(tip, seenRawValueKeys, { strongOnly: settings.evStrongOnly }) }));
    const fallbackEvaluated = fallbackTips.map((tip) => ({ tip, verdict: passesValueFilters(tip, seenFallbackValueKeys, { strongOnly: settings.evStrongOnly }) }));
    rawEvaluated.filter((item) => !item.verdict.passed).forEach((item) => {
      rejectReasons[item.verdict.reason] = (rejectReasons[item.verdict.reason] || 0) + 1;
    });
    const passedRawTips = rawEvaluated.filter((item) => item.verdict.passed).map((item) => item.tip);
    const passedFallbackTips = fallbackEvaluated.filter((item) => item.verdict.passed).map((item) => item.tip);
    const tips = ensureSafePicks(passedRawTips, passedFallbackTips);
    window.__lastRenderedTips = tips;
    cacheRealTopTips(tips, dataPackage);
    const parlays = buildParlays(tips);
    const oddsAlerts = buildOddsAlerts(tips);
    currentTrackingItems = {};
    setDashboardView("picks");
    renderTips(tips);
    renderParlays(parlays);
    renderTopPicks(tips);
    renderRealTopPicks(tips);
    syncShareCardFromTips(tips);
    renderExecutiveDashboard(tips);
    renderAutoConfidencePanel(tips);
    renderDailyOps(tips);
    renderBettingPlan(tips);
    renderTelegramPreview(tips);
    runPaperTrading(tips);
    renderCalendar(tips);
    renderOddsAlerts(oddsAlerts);
    renderValidation(tips);
    renderConsensus(tips);
    renderExternalSignals(tips);
    renderBooksCompare(tips);
    renderLineMovement(tips);
    renderMarketExplorer(tips);
    renderAlertsCenter(tips, oddsAlerts);
    maybeSendNotifications(tips, oddsAlerts);
    let telegramHealth = { state: "warn", detail: "Sin intento de autoenvio." };
    try {
      telegramHealth = await maybeAutoSendTelegramTop(tips);
    } catch (error) {
      telegramHealth = { state: "warn", detail: `Autoenvio fallo: ${error.message}` };
      log(`Telegram auto top no se pudo enviar. Detalle: ${error.message}`);
    }
    renderFeedHealth({
      sourceState: dataPackage.health?.source?.state || (dataPackage.games.length ? "ok" : "warn"),
      sourceDetail: dataPackage.health?.source?.detail || `${dataSourceLabels[dataPackage.source] || dataPackage.source} · ${slateGames.length}/${normalizedGames.length} partido(s) del slate ${targetSlateDate}`,
      oddsState: dataPackage.health?.odds?.state || (currentOddsBook.length ? "ok" : "warn"),
      oddsDetail: dataPackage.health?.odds?.detail || (currentOddsBook.length ? `${currentOddsBook.length} evento(s) con odds reales` : "Sin odds reales activas; usando estimadas"),
      externalState: dataPackage.health?.external?.state || (Object.keys(dataPackage.externalRef?.standings || {}).length || Object.keys(dataPackage.externalRef?.injuries || {}).length ? "ok" : "warn"),
      externalDetail: dataPackage.health?.external?.detail || (dataPackage.externalRef?.source ? `Referencia ${dataPackage.externalRef.source}` : "Sin referencias externas"),
      propsState: dataPackage.health?.props?.state || "idle",
      propsDetail: dataPackage.health?.props?.detail || "Sin diagnostico de props",
      telegramState: telegramHealth.state,
      telegramDetail: telegramHealth.detail,
      updatedAt: dataPackage.updatedAt,
    });
    saveOddsSnapshot(tips);
    autoGradeHistory([...dataPackage.recentGames, ...normalizedGames.filter((game) => Number.isFinite(game.homeScore) && Number.isFinite(game.awayScore))]);
    updateStats(slateGames, tips, { valid: passedRawTips.length, rejected: Math.max(rawTips.length - passedRawTips.length, 0) });
    renderEvRejectReasons(rejectReasons, {
      strongOnly: Boolean(settings.evStrongOnly),
      valid: passedRawTips.length,
      rejected: Math.max(rawTips.length - passedRawTips.length, 0),
    });
    await bootstrapBackendTelemetry();
    renderBackendActivity();
    els.source.textContent = dataPackage.games.length ? dataSourceLabels[dataPackage.source] || "API/Datos OK" : "Demo";
    log(`Listo: slate ${targetSlateDate} con ${slateGames.length} partido(s), ${dataPackage.recentGames.length} resultados recientes, ${tips.length} tips y ${parlays.length} parlays.`);
  } catch (error) {
    const games = demoGames[els.sport.value];
    const targetSlateDate = selectTargetSlateDate(games);
    currentCalendarDate = targetSlateDate;
    const slateGames = slateGamesForDate(games, targetSlateDate);
    const leagueMeta = selectedLeagueMeta();
    currentOddsBook = [];
    const settings = {
      risk: els.risk.value,
      minConfidence: els.minConfidence.value,
      confidenceMode: els.confidenceMode?.value || "auto",
      autoConfidence: (els.confidenceMode?.value || "auto") !== "manual",
      valueOnly: els.valueOnly.checked,
      realOnly: els.realOnly.checked,
      evStrongOnly: els.evStrongOnly?.checked,
    };
    const seenDemoRawValueKeys = new Set();
    const seenDemoFallbackValueKeys = new Set();
    const preValidatedTips = slateGames
      .flatMap((game) => createTips(game, settings, { formBook: {}, externalRef: { standings: {}, injuries: {} }, scheduleContext: { lastPlayed: {} }, leagueId: leagueMeta?.id || "", leagueName: leagueMeta?.name || "" }))
      .filter((tip) => !settings.realOnly || isRealTip(tip))
      .map((tip) => validateTip(tip, [], { formBook: {} }))
      .map((tip) => externalSignalsForTip(tip, { formBook: {}, externalRef: { source: "base", standings: {}, injuries: {} } }));
    const confidencePackage = effectiveMinConfidence(preValidatedTips);
    syncConfidenceControls(confidencePackage);
    const rawTips = preValidatedTips.filter((tip) => tip.confidence >= Number(confidencePackage.threshold || settings.minConfidence));
    const fallbackTips = slateGames
      .flatMap((game) => createTips(game, { ...settings, minConfidence: 48, valueOnly: false }, { formBook: {}, externalRef: { standings: {}, injuries: {} }, scheduleContext: { lastPlayed: {} }, leagueId: leagueMeta?.id || "", leagueName: leagueMeta?.name || "" }))
      .filter((tip) => !settings.realOnly || isRealTip(tip))
      .map((tip) => validateTip(tip, [], { formBook: {} }))
      .map((tip) => externalSignalsForTip(tip, { formBook: {}, externalRef: { source: "base", standings: {}, injuries: {} } }))
      .filter((tip) => tip.confidence >= Math.max(48, Number(confidencePackage.threshold || settings.minConfidence) - 3));
    const rejectReasons = {};
    const rawEvaluated = rawTips.map((tip) => ({ tip, verdict: passesValueFilters(tip, seenDemoRawValueKeys, { strongOnly: settings.evStrongOnly }) }));
    const fallbackEvaluated = fallbackTips.map((tip) => ({ tip, verdict: passesValueFilters(tip, seenDemoFallbackValueKeys, { strongOnly: settings.evStrongOnly }) }));
    rawEvaluated.filter((item) => !item.verdict.passed).forEach((item) => {
      rejectReasons[item.verdict.reason] = (rejectReasons[item.verdict.reason] || 0) + 1;
    });
    const passedRawTips = rawEvaluated.filter((item) => item.verdict.passed).map((item) => item.tip);
    const passedFallbackTips = fallbackEvaluated.filter((item) => item.verdict.passed).map((item) => item.tip);
    const tips = ensureSafePicks(passedRawTips, passedFallbackTips);
    window.__lastRenderedTips = tips;
    cacheRealTopTips(tips, { sport: els.sport.value, leagueId: leagueMeta?.id || "", leagueName: leagueMeta?.name || "" });
    const parlays = buildParlays(tips);
    const oddsAlerts = buildOddsAlerts(tips);
    currentTrackingItems = {};
    setDashboardView("picks");
    renderTips(tips);
    renderParlays(parlays);
    renderTopPicks(tips);
    renderRealTopPicks(tips);
    syncShareCardFromTips(tips);
    renderExecutiveDashboard(tips);
    renderAutoConfidencePanel(tips);
    renderDailyOps(tips);
    renderBettingPlan(tips);
    renderTelegramPreview(tips);
    runPaperTrading(tips);
    renderCalendar(tips);
    renderOddsAlerts(oddsAlerts);
    renderValidation(tips);
    renderConsensus(tips);
    renderExternalSignals(tips);
    renderBooksCompare(tips);
    renderLineMovement(tips);
    renderMarketExplorer(tips);
    renderAlertsCenter(tips, oddsAlerts);
    maybeSendNotifications(tips, oddsAlerts);
    renderFeedHealth({
      sourceState: "warn",
      sourceDetail: "Modo demo local",
      oddsState: "warn",
      oddsDetail: "Sin odds reales activas",
      externalState: "warn",
      externalDetail: "Sin referencias externas en demo",
      telegramState: "warn",
      telegramDetail: "No se autoenvia desde demo por seguridad",
      updatedAt: new Date().toLocaleString("es-MX"),
    });
    saveOddsSnapshot(tips);
    autoGradeHistory([]);
    updateStats(slateGames, tips, { valid: passedRawTips.length, rejected: Math.max(rawTips.length - passedRawTips.length, 0) });
    renderEvRejectReasons(rejectReasons, {
      strongOnly: Boolean(settings.evStrongOnly),
      valid: passedRawTips.length,
      rejected: Math.max(rawTips.length - passedRawTips.length, 0),
    });
    await bootstrapBackendTelemetry();
    renderBackendActivity();
    els.source.textContent = "Demo";
    log(`No se pudo conectar con la API. Se uso demo local para el slate ${targetSlateDate}. Detalle: ${error.message}`);
  } finally {
    setLoading(false);
  }
}

els.sport.addEventListener("change", () => {
  fillLeagues();
  syncUefaTabs();
  run();
});
els.league.addEventListener("change", syncUefaTabs);
els.uefaTabs?.forEach((button) => {
  button.addEventListener("click", () => {
    els.sport.value = "soccer";
    fillLeagues();
    els.league.value = button.dataset.uefaLeague;
    syncUefaTabs();
    run();
  });
});
els.dashboardTabs?.forEach((button) => {
  button.addEventListener("click", () => {
    setDashboardView(button.dataset.dashboardViewBtn);
  });
});
els.executiveQuickActions?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-dashboard-action]");
  if (!button) return;
  setDashboardView(button.dataset.dashboardAction);
});
els.load.addEventListener("click", run);
els.copyOpenCommand.addEventListener("click", async () => {
  const command = `cd C:\\Users\\tsacl\\Documents\\Codex\\2026-04-20-puedes-hacer-un-bot-de-pronosticos && C:\\Users\\tsacl\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\bin\\node.exe serve.js`;
  try {
    await navigator.clipboard.writeText(command);
    log("Comando para abrir el bot copiado.");
  } catch (error) {
    log("No pude copiar el comando automaticamente.");
  }
});
els.telegramAutoTopToggle.addEventListener("change", () => {
  const state = loadTelegramAutoTopState();
  state.enabled = els.telegramAutoTopToggle.checked;
  saveTelegramAutoTopState(state);
  renderFeedHealth({
    telegramState: state.enabled ? "ok" : "warn",
    telegramDetail: state.enabled ? "Autoenvio activo desde la UI." : "Autoenvio desactivado desde la UI.",
    updatedAt: new Date().toLocaleString("es-MX"),
  });
  log(state.enabled ? "Auto top Telegram activado." : "Auto top Telegram desactivado.");
});
els.runCollect.addEventListener("click", async () => {
  await runBackendJob("/api/collect/run", "Collect backend");
});
els.runDigest.addEventListener("click", async () => {
  await runBackendJob("/api/jobs/digest", "Digest backend");
});
els.runGrade.addEventListener("click", async () => {
  await runBackendJob("/api/jobs/grade", "Grade backend");
});
els.risk.addEventListener("input", () => {
  if (els.betMode.value === "auto") {
    renderBettingPlan(window.__lastRenderedTips || []);
    return;
  }
  run();
});
els.confidenceMode?.addEventListener("change", () => {
  syncConfidenceControls(effectiveMinConfidence(window.__lastRenderedTips || []));
  run();
});
els.minConfidence.addEventListener("input", () => {
  if (els.confidenceMode?.value !== "manual") {
    syncConfidenceControls(effectiveMinConfidence(window.__lastRenderedTips || []));
    return;
  }
  if (els.betMode.value === "auto") {
    renderBettingPlan(window.__lastRenderedTips || []);
    return;
  }
  run();
});
els.valueOnly.addEventListener("change", () => {
  if (els.betMode.value === "auto") {
    renderBettingPlan(window.__lastRenderedTips || []);
    return;
  }
  run();
});
els.evStrongOnly?.addEventListener("change", run);
els.realOnly.addEventListener("change", run);
els.bankroll.addEventListener("input", () => {
  renderHistory();
  renderBettingPlan(window.__lastRenderedTips || []);
});
els.stakeProfile.addEventListener("change", () => {
  if (isApplyingAutoTune) {
    renderBettingPlan(window.__lastRenderedTips || []);
    return;
  }
  if (els.betMode.value === "auto") {
    renderBettingPlan(window.__lastRenderedTips || []);
    return;
  }
  run();
});
els.betMode.addEventListener("change", () => {
  if (els.betMode.value === "auto") {
    renderBettingPlan(window.__lastRenderedTips || []);
    run();
    return;
  }
  renderBettingPlan(window.__lastRenderedTips || []);
});
els.stake.addEventListener("input", () => {
  document.querySelectorAll("[data-stake-id]").forEach((input) => {
    input.value = currentStakeValue();
  });
  renderBettingPlan(window.__lastRenderedTips || []);
});
els.autoGrade.addEventListener("change", renderHistory);
els.historyFromDate.addEventListener("change", renderHistory);
els.historyToDate.addEventListener("change", renderHistory);
els.historySportFilter.addEventListener("change", renderHistory);
els.historyMarketFilter.addEventListener("change", renderHistory);
els.historyLeagueFilter.addEventListener("change", renderHistory);
els.calendarDate.addEventListener("change", () => {
  currentCalendarDate = els.calendarDate.value || isoToday();
  renderCalendar(window.__lastRenderedTips || []);
});
els.calendarToday.addEventListener("click", () => {
  currentCalendarDate = isoToday();
  renderCalendar(window.__lastRenderedTips || []);
});
els.addWatchlist.addEventListener("click", () => {
  const value = els.watchlistInput.value.trim();
  if (!value) return;
  const list = loadWatchlist();
  if (!list.some((item) => namesMatch(item, value))) {
    list.unshift(value);
    saveWatchlist(list);
    renderWatchlist();
    log(`Watchlist: ${value} agregado.`);
    run();
  }
  els.watchlistInput.value = "";
});
els.clearWatchlist.addEventListener("click", () => {
  saveWatchlist([]);
  renderWatchlist();
  log("Watchlist limpiada.");
  run();
});
els.enableNotifications.addEventListener("click", async () => {
  if (!("Notification" in window)) {
    log("Este navegador no soporta notificaciones.");
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    log("Las notificaciones no fueron autorizadas.");
    return;
  }

  const state = notificationState();
  state.enabled = true;
  saveNotificationState(state);
  updateNotificationButton();
  log("Notificaciones activadas para picks fuertes y cambios de cuota.");
});
els.downloadShareImage?.addEventListener("click", () => {
  const tip = currentShareTipId ? currentTrackingItems[currentShareTipId]?.payload : (window.__lastRenderedTips || [])[0];
  if (!tip) {
    log("Todavia no hay pick listo para descargar como imagen.");
    return;
  }
  downloadShareImage(tip);
  log("Imagen del pick descargada.");
});
document.addEventListener("click", (event) => {
  const removeTicket = event.target.closest("[data-ticket-remove]");
  if (removeTicket) {
    saveTicket(loadTicket().filter((item) => item.id !== removeTicket.dataset.ticketRemove));
    renderTicket();
    log("Jugada removida del ticket.");
    return;
  }

  const addTicket = event.target.closest("[data-ticket-add]");
  if (addTicket) {
    const trackedTicket = currentTrackingItems[addTicket.dataset.ticketAdd];
    if (!trackedTicket) return;
    const stakeInput = document.querySelector(`[data-stake-id="${addTicket.dataset.ticketAdd}"]`);
    const stake = clamp(Number(stakeInput?.value) || currentStakeValue(), 0.1, 100000);
    const entry = trackedTicket.kind === "parlay"
      ? createTicketEntryFromParlay(trackedTicket.payload, stake)
      : createTicketEntryFromTip(trackedTicket.payload, stake);
    const ticket = loadTicket().filter((item) => item.id !== entry.id);
    ticket.push(entry);
    saveTicket(ticket);
    renderTicket();
    log("Jugada agregada al ticket.");
    return;
  }

  const removeWatch = event.target.closest("[data-watch-remove]");
  if (removeWatch) {
    const team = removeWatch.dataset.watchRemove;
    saveWatchlist(loadWatchlist().filter((item) => item !== team));
    renderWatchlist();
    log(`Watchlist: ${team} removido.`);
    run();
    return;
  }

  const topTab = event.target.closest("[data-top-filter]");
  if (topTab) {
    currentTopFilter = topTab.dataset.topFilter;
    document.querySelectorAll("[data-top-filter]").forEach((button) => {
      button.classList.toggle("active", button.dataset.topFilter === currentTopFilter);
    });
    renderTopPicks(window.__lastRenderedTips || []);
    return;
  }

  const marketEventTab = event.target.closest("[data-market-event]");
  if (marketEventTab) {
    currentMarketEventId = marketEventTab.dataset.marketEvent || "";
    renderMarketExplorer(window.__lastRenderedTips || []);
    return;
  }

  const marketFamilyTab = event.target.closest("[data-market-family]");
  if (marketFamilyTab) {
    currentMarketFamily = marketFamilyTab.dataset.marketFamily || "main";
    renderMarketExplorer(window.__lastRenderedTips || []);
    return;
  }

  const sharePick = event.target.closest("[data-share-tip]");
  if (sharePick) {
    const trackedShare = currentTrackingItems[sharePick.dataset.shareTip];
    if (!trackedShare?.payload) {
      log("No encontre ese pick para generar la imagen.");
      return;
    }
    currentShareTipId = sharePick.dataset.shareTip;
    renderShareCard(trackedShare.payload);
    log("Generador de imagen actualizado con el pick seleccionado.");
    return;
  }

  const button = event.target.closest("[data-history-action]");
  if (!button) return;

  const tracked = currentTrackingItems[button.dataset.historyId];
  if (!tracked) {
    log("No encontre ese pick en la corrida actual. Genera tips de nuevo.");
    return;
  }

  const stakeInput = document.querySelector(`[data-stake-id="${button.dataset.historyId}"]`);
  const stake = clamp(Number(stakeInput?.value) || currentStakeValue(), 0.1, 100000);
  const record = tracked.kind === "parlay" ? recordParlay(tracked.payload, stake) : recordTip(tracked.payload, stake);
  upsertHistory(record, button.dataset.historyAction);
});
els.clearHistory.addEventListener("click", () => {
  if (!confirm("Seguro que quieres borrar todo el historial del bot?")) return;
  saveHistory([]);
  renderHistory();
  log("Historial limpiado.");
});
els.runPaperNow.addEventListener("click", () => {
  runPaperTrading(window.__lastRenderedTips || [], { force: true });
});
els.backtestFromDate?.addEventListener("change", () => {
  renderAuditPanel();
});
els.backtestToDate?.addEventListener("change", () => {
  renderAuditPanel();
});
els.backtestSourceFilter?.addEventListener("change", () => {
  renderAuditPanel();
});
els.auditMinSample?.addEventListener("input", () => {
  renderAuditPanel();
});
els.clearPaper.addEventListener("click", () => {
  if (!confirm("Seguro que quieres borrar el paper trading?")) return;
  savePaperTrades([]);
  renderAuditPanel();
  log("Paper trading limpiado.");
});
els.exportHistory.addEventListener("click", () => {
  const history = applyHistoryFilters(loadHistory());
  if (!history.length) {
    log("No hay historial para exportar.");
    return;
  }

  const headers = ["eventDate", "kind", "sport", "league", "market", "pickType", "title", "pick", "odds", "stake", "confidence", "modelProbability", "impliedProbability", "ev", "valueLabel", "riskLabel", "clv", "result", "profit"];
  const rows = history.map((record) => [
    record.eventDate,
    record.kind,
    record.sport,
    record.league || "",
    record.market,
    record.pickType || "",
    record.title,
    record.pick,
    Number(record.odds).toFixed(2),
    Number(record.stake || 1).toFixed(2),
    record.confidence,
    record.modelProbability ?? "",
    record.impliedProbability ?? "",
    record.ev ?? "",
    record.valueLabel ?? "",
    record.riskLabel ?? "",
    record.clv ?? "",
    record.result,
    profitFor(record).toFixed(2),
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `historial-bot-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  log("Historial exportado a CSV.");
});
els.clearTicket.addEventListener("click", () => {
  saveTicket([]);
  renderTicket();
  log("Ticket limpiado.");
});
els.copyTicket.addEventListener("click", async () => {
  const items = loadTicket();
  if (!items.length) {
    log("No hay jugadas en el ticket.");
    return;
  }
  const text = items.map((item, index) => `${index + 1}. ${item.label} | ${item.match} | ${item.odds.toFixed(2)}x | Stake ${money(item.stake)} | EV ${item.ev > 0 ? "+" : ""}${item.ev}%`).join("\n");
  try {
    await navigator.clipboard.writeText(text);
    log("Ticket copiado al portapapeles.");
  } catch (error) {
    log("No se pudo copiar el ticket.");
  }
});
els.copySlip.addEventListener("click", async () => {
  const items = loadTicket();
  if (!items.length) {
    log("No hay jugadas en el ticket.");
    return;
  }
  const totalStake = items.reduce((sum, item) => sum + item.stake, 0);
  const combinedOdds = items.reduce((product, item) => product * item.odds, 1);
  const totalEv = items.reduce((sum, item) => sum + item.ev, 0);
  const slip = [
    "SLIP BOT DE PRONOSTICOS",
    ...items.map((item, index) => `${index + 1}. ${item.label} | ${item.match} | Book ${item.bestBook} | ${item.odds.toFixed(2)}x | Stake ${money(item.stake)} | EV ${item.ev > 0 ? "+" : ""}${item.ev}%`),
    `Total stake: ${money(totalStake)}`,
    `Cuota combinada: ${combinedOdds.toFixed(2)}x`,
    `EV total: ${totalEv > 0 ? "+" : ""}${totalEv.toFixed(1)}%`,
  ].join("\n");
  try {
    await navigator.clipboard.writeText(slip);
    log("Slip copiado al portapapeles.");
  } catch (error) {
    log("No se pudo copiar el slip.");
  }
});
els.sendTelegramSlip.addEventListener("click", async () => {
  const text = buildTelegramSlipText();
  if (!text) {
    log("No hay slip para enviar a Telegram.");
    return;
  }
  try {
    await sendTelegramMessage(text);
    log("Slip enviado a Telegram.");
  } catch (error) {
    log(`No se pudo enviar el slip a Telegram. Detalle: ${error.message}`);
  }
});
els.sendTelegramTop.addEventListener("click", async () => {
  const text = buildTelegramTopText();
  if (!text) {
    log("No hay tops para enviar a Telegram.");
    return;
  }
  try {
    await sendTelegramMessage(text);
    pushTelegramSentEntry({ kind: "Top real", summary: "Se envio digest de tops reales." });
    renderTelegramSentHistory();
    log("Top picks enviados a Telegram.");
  } catch (error) {
    log(`No se pudieron enviar los tops a Telegram. Detalle: ${error.message}`);
  }
});
els.sendTelegramDigest.addEventListener("click", async () => {
  const text = buildTelegramDigestText();
  if (!text) {
    log("No hay digest multideporte para enviar.");
    return;
  }
  try {
    await sendTelegramMessage(text);
    pushTelegramSentEntry({ kind: "Digest multideporte", summary: "Se envio digest combinado de futbol, MLB, NBA y NFL." });
    renderTelegramSentHistory();
    log("Digest multideporte enviado a Telegram.");
  } catch (error) {
    log(`No se pudo enviar el digest multideporte. Detalle: ${error.message}`);
  }
});
els.sendSlateTop?.addEventListener("click", async () => {
  const text = buildTelegramSlateTopText();
  if (!text) {
    log("No hay top del slate activo para enviar.");
    return;
  }
  try {
    await sendTelegramMessage(text);
    pushTelegramSentEntry({ kind: "Top del slate", summary: `Se envio el top del slate ${currentCalendarDate || isoToday()}.` });
    renderTelegramSentHistory();
    log("Top del slate enviado a Telegram.");
  } catch (error) {
    log(`No se pudo enviar el top del slate. Detalle: ${error.message}`);
  }
});
els.copyBettingPlan.addEventListener("click", async () => {
  if (!lastBettingPlanText) {
    log("Todavia no hay plan de apuesta para copiar.");
    return;
  }
  try {
    await navigator.clipboard.writeText(lastBettingPlanText);
    log("Plan de apuesta copiado.");
  } catch (error) {
    log("No se pudo copiar el plan de apuesta.");
  }
});
els.sendTelegramPlan.addEventListener("click", async () => {
  if (!lastBettingPlanText) {
    log("Todavia no hay plan de apuesta para enviar.");
    return;
  }
  try {
    await sendTelegramMessage(lastBettingPlanText);
    pushTelegramSentEntry({ kind: "Plan de apuesta", summary: "Se envio el plan de apuesta actual." });
    renderTelegramSentHistory();
    log("Plan de apuesta enviado a Telegram.");
  } catch (error) {
    log(`No se pudo enviar el plan de apuesta. Detalle: ${error.message}`);
  }
});

async function initApp() {
  await bootstrapFromBackend();
  await bootstrapBackendTelemetry();
  fillLeagues();
  initDashboardViews();
  setDashboardView(currentDashboardView);
  applyWorkModeDefaults();
  syncConfidenceControls(effectiveMinConfidence([]));
  log("App iniciada. Puedes usar TheSportsDB con la llave gratuita 123 o MLB Stats API sin llave.");
  if (workMode) {
    log("Modo trabajo activo: priorizando backend local y fallback demo para evitar bloqueos.");
  }
  updateNotificationButton();
  els.telegramAutoTopToggle.checked = loadTelegramAutoTopState().enabled !== false;
  renderWatchlist();
  renderTicket();
  renderOpenBotHelp();
  renderStatsSnapshot();
  renderTelegramSentHistory();
  renderBetModeHistory();
  renderBackendActivity();
  renderDailyOps([]);
  renderExecutiveDashboard([]);
  renderAutoConfidencePanel([]);
  renderMarketExplorer([]);
  renderAlertsCenter([], { alerts: [] });
  renderBettingPlan([]);
  renderAuditPanel();
  renderFeedHealth({
    telegramState: els.telegramAutoTopToggle.checked ? "ok" : "warn",
    telegramDetail: els.telegramAutoTopToggle.checked ? "Autoenvio activo desde la UI." : "Autoenvio desactivado desde la UI.",
    updatedAt: new Date().toLocaleString("es-MX"),
  });
  currentCalendarDate = isoToday();
  renderHistory();
  run();
}

initApp();
