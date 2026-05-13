(function initMlbEngine(root, factory) {
  const api = factory();
  root.BotSportEngines = root.BotSportEngines || {};
  root.BotSportEngines.mlb = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : window, function createMlbEngine() {
  function buildTips({ game, favorite, homeEdge, awayEdge, totalConfidence, winConfidence, isOver, profile }) {
    const teamTotalSide = homeEdge >= awayEdge ? game.home : game.away;
    const tips = [
      {
        type: "Team total",
        pick: `${teamTotalSide} over 4.5 carreras`,
        targetTeam: teamTotalSide,
        marketKey: "team_total",
        confidence: Math.max(Math.min(totalConfidence - 1 + Math.abs(homeEdge - awayEdge) * 0.35, 78), 50),
        reason: "Combina entorno de carreras, forma ofensiva reciente y ventaja del lineup esperado para aislar daño del rival.",
      },
    ];
    if (game.homePitcher || game.awayPitcher) {
      tips.push(
        {
          type: "First 5 innings",
          pick: `${favorite} gana primeras 5 entradas`,
          targetTeam: favorite,
          marketKey: "f5_moneyline",
          confidence: Math.max(Math.min(winConfidence + 2, 80), 52),
          reason: "Con abridores probables, el F5 pesa mas por matchup de pitcher y evita ruido tardio del bullpen.",
        },
        {
          type: "First 5 total",
          pick: `${isOver ? "Over" : "Under"} 4.5 primeras 5 entradas`,
          totalSide: isOver ? "Over" : "Under",
          marketKey: "f5_totals",
          confidence: Math.max(Math.min(totalConfidence + 1, 78), 50),
          reason: "El total de primeras 5 entradas aprovecha mejor la lectura del abridor y corta parte de la volatilidad del relevo.",
        }
      );
    }
    return tips;
  }

  return { buildTips };
}));
