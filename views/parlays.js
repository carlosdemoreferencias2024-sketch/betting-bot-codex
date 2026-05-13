(function initParlaysView(root, factory) {
  const api = factory();
  root.BotViews = root.BotViews || {};
  root.BotViews.parlays = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : window, function createParlaysView() {
  function buildEmptyParlaysMarkup({ sportLabel, slateCount }) {
    return `
      <div class="empty">
        No se armo un parlay util para ${sportLabel}.
        ${slateCount < 2
          ? "Este slate trae muy pocos partidos para combinar con criterio."
          : "Todavia no hay suficientes piernas limpias y no correlacionadas para mostrarte seguro, sueño o bomba."}
      </div>
    `;
  }

  function buildParlaysMarkup({ parlays = [], registerParlay, deps }) {
    return parlays.map((parlay) => {
      const id = deps.parlayId(parlay);
      const suggestedStake = deps.recommendedStakeForParlay(parlay);
      registerParlay(id, parlay);
      const legs = parlay.legs.map((tip) => `
        <li>
          <span class="leg-match">${tip.leagueName || deps.sportProfiles[tip.game?.sport || "soccer"]?.apiName || "Liga"} · ${tip.game.away} @ ${tip.game.home}</span>
          <span class="leg-pick">${tip.type}: ${tip.pick} - ${tip.odds.toFixed(2)}x</span>
          <span class="leg-book">${tip.bookmaker || "Book"} · ${tip.oddsSource || "Fuente mixta"}</span>
        </li>
      `).join("");
      const criteria = (parlay.criteria || []).map((item) => `<li>${item}</li>`).join("");
      const parlayBadges = [...(parlay.badges || []), ...(parlay.scopeLabel ? [parlay.scopeLabel] : [])];
      const badges = parlayBadges.map((badge) => `<span class="pill parlay-badge">${badge}</span>`).join("");
      const composition = parlay.composition
        ? `
          <div class="parlay-composition">
            <p class="eyebrow">Composicion</p>
            <div class="pill-row">
              <span class="pill parlay-badge">${parlay.composition.conservative} conservadores</span>
              <span class="pill parlay-badge">${parlay.composition.value} value</span>
              <span class="pill parlay-badge">${parlay.composition.aggressive} agresivos</span>
            </div>
          </div>
        `
        : "";
      const sportMix = parlay.sportMix
        ? `
          <div class="parlay-composition">
            <p class="eyebrow">Mix por deporte</p>
            <div class="pill-row">
              <span class="pill parlay-badge">${parlay.sportMix.soccer} Futbol</span>
              <span class="pill parlay-badge">${parlay.sportMix.mlb} MLB</span>
            </div>
          </div>
        `
        : "";

      return `
        <article class="parlay-card ${parlay.className}">
          <div class="parlay-top">
            <p class="parlay-title">${parlay.name}</p>
            <span class="parlay-risk">${parlay.risk}</span>
          </div>
          ${badges ? `<div class="pill-row parlay-badge-row">${badges}</div>` : ""}
          <ul class="parlay-legs">${legs}</ul>
          <div class="parlay-meta">
            <div>
              <span>Cuota est.</span>
              <strong>${parlay.odds.toFixed(2)}x</strong>
            </div>
            <div>
              <span>Prob. est.</span>
              <strong>${deps.toPercent(parlay.hitRate)}</strong>
            </div>
          </div>
          <p class="parlay-note">${parlay.note}</p>
          <p class="parlay-note subtle">${parlay.scopeResolution || "Construido con liga actual"}</p>
          <p class="parlay-note subtle">Piernas disponibles antes del corte: ${parlay.availableLegs || parlay.legs.length}.</p>
          ${composition}
          ${sportMix}
          ${criteria ? `
            <div class="parlay-criteria">
              <p class="eyebrow">Criterio</p>
              <ul class="parlay-criteria-list">${criteria}</ul>
            </div>
          ` : ""}
          <p class="parlay-note subtle">Base evaluada: ${parlay.sourceCount || parlay.legs.length} mercado(s) candidatos del slate.</p>
          <div class="track-row">
            <input class="stake-field" type="number" min="0.1" step="0.1" value="${suggestedStake}" data-stake-id="${id}" />
            <button class="ghost-btn" type="button" data-ticket-add="${id}">Al ticket</button>
            <button class="track-btn" type="button" data-history-action="pending" data-history-id="${id}">Guardar</button>
            <button class="track-btn win" type="button" data-history-action="win" data-history-id="${id}">Ganado</button>
            <button class="track-btn loss" type="button" data-history-action="loss" data-history-id="${id}">Perdido</button>
          </div>
        </article>
      `;
    }).join("");
  }

  return {
    buildEmptyParlaysMarkup,
    buildParlaysMarkup,
  };
}));
