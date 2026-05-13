(function initNflEngine(root, factory) {
  const api = factory();
  root.BotSportEngines = root.BotSportEngines || {};
  root.BotSportEngines.nfl = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : window, function createNflEngine() {
  function buildTips({ favorite, totalConfidence, homeEdge, awayEdge, profile }) {
    const teamTotalSide = favorite;
    return [
      {
        type: "Team total",
        pick: `${teamTotalSide} over 24.5 ${profile.totalLabel}`,
        targetTeam: teamTotalSide,
        marketKey: "team_total",
        confidence: Math.max(Math.min(totalConfidence - 1 + Math.abs(homeEdge - awayEdge) * 0.28, 77), 50),
        reason: "Aisla mejor el ataque del lado favorito cuando el modelo ve ventaja de ritmo, eficiencia o matchup.",
      },
    ];
  }

  return { buildTips };
}));
