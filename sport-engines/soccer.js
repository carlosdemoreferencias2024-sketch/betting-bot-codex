(function initSoccerEngine(root, factory) {
  const api = factory();
  root.BotSportEngines = root.BotSportEngines || {};
  root.BotSportEngines.soccer = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : window, function createSoccerEngine() {
  function buildTips({ favorite, dog, winConfidence, spreadConfidence, bothScoreConfidence }) {
    return [
      {
        type: "Ambos anotan",
        pick: bothScoreConfidence > 56 ? "Ambos equipos anotan" : "No ambos anotan",
        marketKey: "btts",
        confidence: bothScoreConfidence,
        reason: "Se cruza la fuerza ofensiva de ambos clubes contra la solidez defensiva estimada.",
      },
      {
        type: "Doble oportunidad",
        pick: `${favorite} o empate`,
        targetTeam: favorite,
        marketKey: "double_chance",
        confidence: Math.max(Math.min(winConfidence + 7, 84), 52),
        reason: "Ideal para cubrir el empate cuando el favorito tiene ventaja, pero sin querer pagar la volatilidad del 1X2 puro.",
      },
      {
        type: "Empate no apuesta",
        pick: `${favorite} empate no apuesta`,
        targetTeam: favorite,
        marketKey: "draw_no_bet",
        confidence: Math.max(Math.min(winConfidence + 4, 82), 50),
        reason: "Reduce riesgo cuando el modelo favorece un lado, pero la igualdad sigue viva por contexto de tabla o forma.",
      },
      {
        type: "Handicap asiatico",
        pick: `${dog} +0.5 handicap asiatico`,
        targetTeam: dog,
        marketKey: "asian_handicap",
        line: "+0.5",
        confidence: Math.max(Math.min(spreadConfidence + 3, 80), 50),
        reason: "El asian handicap absorbe mejor partidos cortos o cerrados y baja castigo frente al moneyline.",
      },
    ];
  }

  return { buildTips };
}));
