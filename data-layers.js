(function initBotDataLayers(root, factory) {
  const api = factory();
  root.BotDataLayers = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : window, function createBotDataLayers() {
  const ALL_SOCCER_LEAGUES_ID = "__all_soccer__";

  function ensureLayer(layer = {}, fallbackWinner = "base") {
    return {
      state: layer.state || "warn",
      mode: layer.mode || "fallback",
      winner: layer.winner || fallbackWinner,
      detail: layer.detail || "Sin detalle",
    };
  }

  function buildPackageQuery({ sport, leagueId, apiChoice, allSoccer = false }) {
    const params = new URLSearchParams({
      sport: String(sport || ""),
      leagueId: String(leagueId || ""),
      apiChoice: String(apiChoice || "auto"),
    });
    if (allSoccer || leagueId === ALL_SOCCER_LEAGUES_ID) {
      params.set("allSoccer", "1");
    }
    return `/api/picks?${params.toString()}`;
  }

  async function fetchUnifiedDataPackage(options = {}) {
    const response = await fetch(buildPackageQuery(options));
    if (!response.ok) {
      throw new Error(`Backend data package respondio ${response.status}`);
    }
    return response.json();
  }

  function adaptBackendDataPackage(payload = {}, helpers = {}) {
    const games = Array.isArray(payload.games) ? payload.games : [];
    const recentGames = Array.isArray(payload.recentGames) ? payload.recentGames : [];
    const buildFormBook = helpers.buildFormBook || (() => ({}));
    const buildScheduleContext = helpers.buildScheduleContext || (() => ({ lastPlayed: {} }));

    return {
      ...payload,
      games,
      recentGames,
      oddsEvents: Array.isArray(payload.oddsEvents) ? payload.oddsEvents : [],
      validationGames: Array.isArray(payload.validationGames) ? payload.validationGames : [],
      validationSource: payload.validationSource || "backend",
      externalRef: payload.externalRef || { source: "base", standings: {}, injuries: {} },
      backendTips: Array.isArray(payload.backendTips) ? payload.backendTips : [],
      formBook: payload.formBook || buildFormBook(recentGames, payload.sport),
      scheduleContext: payload.scheduleContext || buildScheduleContext(games, recentGames),
      health: {
        source: ensureLayer(payload.health?.source, payload.source || "backend"),
        recent: ensureLayer(payload.health?.recent, "backend"),
        odds: ensureLayer(payload.health?.odds, "estimated"),
        external: ensureLayer(payload.health?.external, payload.externalRef?.source || "base"),
        props: ensureLayer(payload.health?.props, "idle"),
      },
      updatedAt: payload.updatedAt || new Date().toLocaleString("es-MX"),
    };
  }

  function shouldUseBackendPackage(payload = {}) {
    if (!payload || typeof payload !== "object") return false;
    if (Array.isArray(payload.games) && payload.games.length) return true;
    if (Array.isArray(payload.backendTips) && payload.backendTips.length) return true;
    if (Array.isArray(payload.tips) && payload.tips.length) return true;
    return Boolean(payload.health?.source || payload.health?.odds || payload.health?.external);
  }

  return {
    ALL_SOCCER_LEAGUES_ID,
    buildPackageQuery,
    fetchUnifiedDataPackage,
    adaptBackendDataPackage,
    shouldUseBackendPackage,
  };
}));
