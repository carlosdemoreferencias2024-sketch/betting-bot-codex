(function initBotTipEngine(root, factory) {
  const api = factory();
  root.BotTipEngine = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : window, function createBotTipEngine() {
  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function tipStoryKey(tip = {}) {
    const type = normalizeText(tip.type);
    const market = normalizeText(tip.marketKey || tip.market);
    const pick = normalizeText(tip.pick);
    const game = [
      normalizeText(tip?.game?.sport),
      normalizeText(tip?.game?.date),
      normalizeText(tip?.game?.away),
      normalizeText(tip?.game?.home),
    ].join("|");

    if (/doble oportunidad|empate no apuesta|handicap asiatico|spread/.test(type) || /double chance|draw no bet|asian handicap|spread/.test(market)) {
      const side = normalizeText(tip.targetTeam || pick.split(" ")[0]);
      return `${game}|protective-side|${side}`;
    }
    if (/ganador/.test(type) || market === "1x2" || market === "moneyline") {
      return `${game}|winner|${normalizeText(tip.targetTeam || pick)}`;
    }
    if (/over\/under/.test(type) || market === "totals") {
      const side = normalizeText(tip.totalSide || (pick.startsWith("Over") ? "over" : "under"));
      return `${game}|totals|${side}`;
    }
    if (/ambos anotan/.test(type) || market === "btts") {
      return `${game}|btts|${pick.includes("No") ? "no" : "yes"}`;
    }
    if (/team total/.test(type) || market === "team_total") {
      return `${game}|team-total|${normalizeText(tip.targetTeam || pick)}`;
    }
    return `${game}|${type}|${market}|${pick}`;
  }

  function assignSoccerMarketRole(tip, rankedTips = [], index = 0) {
    if (!tip) return { key: "value", label: "Valor" };
    const type = normalizeText(tip.type);
    const market = normalizeText(tip.marketKey || tip.market);
    const odds = Number(tip.odds || 0);
    const evDecimal = Number(tip.evDecimal || 0);
    const edge = Number(tip.edge || 0);
    const topConfidence = Number(rankedTips[0]?.confidence || 0);
    const coverageLike = [
      "doble oportunidad",
      "empate no apuesta",
      "draw no bet",
      "double chance",
      "handicap asiatico",
      "asian handicap",
      "handicap",
      "spread",
    ];
    const valueLike = [
      "ambos anotan",
      "both teams to score",
      "btts",
      "over under",
      "totals",
      "correct score",
    ];

    const winnerLike = market === "1x2" || market === "winner" || type.includes("ganador");

    if (coverageLike.some((entry) => type.includes(entry) || market.includes(entry))) {
      return { key: "coverage", label: "Cobertura" };
    }
    if (
      evDecimal >= 0.08 ||
      edge >= 5 ||
      valueLike.some((entry) => type.includes(entry) || market.includes(entry))
    ) {
      return { key: "value", label: "Valor" };
    }
    if (winnerLike || index === 0 || Number(tip.confidence || 0) >= topConfidence - 2) {
      return { key: "principal", label: "Principal" };
    }
    if (odds < 1.5) return { key: "coverage", label: "Cobertura" };
    return { key: "value", label: "Valor" };
  }

  function dedupeTipsByStory(tips = [], options = {}) {
    const maxPerStory = Number(options.maxPerStory || 1);
    const keep = [];
    const counts = new Map();
    for (const tip of tips) {
      const key = tipStoryKey(tip);
      const count = counts.get(key) || 0;
      if (count >= maxPerStory) continue;
      counts.set(key, count + 1);
      keep.push(tip);
    }
    return keep;
  }

  return {
    normalizeText,
    tipStoryKey,
    assignSoccerMarketRole,
    dedupeTipsByStory,
  };
}));
