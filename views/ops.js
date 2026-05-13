(function initOpsView(root, factory) {
  const api = factory();
  root.BotViews = root.BotViews || {};
  root.BotViews.ops = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : window, function createOpsView() {
  function buildDailyOpsCards({ digestReady, targetDate, slateTipsCount, realSlateTipsCount, backendStatus, nextRunLabel }) {
    return [
      `
        <article class="alert-card">
          <div class="alert-top">
            <strong>Estado del dia</strong>
            <span>${digestReady ? "Digest listo" : "Digest flojo"}</span>
          </div>
          <div class="alert-meta">
            <div>Slate ${targetDate} · ${slateTipsCount} pick(s) · ${realSlateTipsCount} real(es).</div>
            <div>${digestReady ? "Ya hay material para digest multideporte." : "Todavia falta profundidad para digest fuerte."}</div>
          </div>
        </article>
      `,
      `
        <article class="alert-card">
          <div class="alert-top">
            <strong>Backend</strong>
            <span>${backendStatus.ok ? "OK" : "Base"}</span>
          </div>
          <div class="alert-meta">
            <div>Picks backend: ${backendStatus.lastBackendPicksAt} · Stats: ${backendStatus.lastStatsSnapshotAt}</div>
            <div>Telegram: ${backendStatus.hasTelegram ? "configurado" : "sin configurar"} · Ultimo envio: ${backendStatus.lastTelegramSentAt}</div>
            <div>Proxima corrida estimada: ${nextRunLabel}</div>
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
    ].join("");
  }

  function buildDailySportOpsMarkup({ activeSports = [], topBySport = {}, sportProfiles = {}, toPercent }) {
    if (!activeSports.length) {
      return `<div class="empty">Todavia no hay tops diarios suficientes por deporte.</div>`;
    }
    return activeSports.map((sport) => {
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

  function buildExecutiveEmptyState() {
    return {
      hero: `<div class="empty">Todavia no hay un pick premium para destacar.</div>`,
      topPick: `<div class="empty">Todavia no hay un pick fuerte para destacar.</div>`,
      highlights: "",
    };
  }

  function buildExecutiveHeroMarkup({ top, grade, trustLabel, competitionLabel, realityLabel, bookmakerLabel, modelLabel, evLabel, stakeLabel, splitBadge }) {
    return `
      <article class="executive-hero">
        <div class="executive-hero-top">
          <span class="executive-hero-label">Mejor oportunidad del slate</span>
          <div class="executive-hero-badges">
            <span class="grade-pill ${grade.key}">${grade.grade}</span>
            <span class="trust-pill ${trustLabel.key}">${trustLabel.label}</span>
          </div>
        </div>
        <div class="executive-hero-body">
          <div>
            <p class="match executive-hero-match">${top.game.away} @ ${top.game.home}</p>
            <p class="executive-hero-pick"><strong>${top.type}:</strong> ${top.pick}</p>
            <p class="alert-meta">${top.leagueName} | ${competitionLabel} | ${realityLabel}</p>
          </div>
          <div class="executive-hero-stats">
            <div class="share-stat"><strong>Cuota</strong><span>${bookmakerLabel}</span></div>
            <div class="share-stat"><strong>Modelo</strong><span>${modelLabel}</span></div>
            <div class="share-stat"><strong>EV</strong><span>${evLabel}</span></div>
            <div class="share-stat"><strong>Stake</strong><span>${stakeLabel}</span></div>
          </div>
        </div>
        ${splitBadge ? `<div class="executive-highlight-strip"><span class="pill mlb-signal ${splitBadge.key}">${splitBadge.label}</span></div>` : ""}
      </article>
    `;
  }

  function buildExecutiveTopPickMarkup({ top, grade, competitionLabel, modelLabel, evLabel, stakeLabel, trustText, trustScore }) {
    return `
      <article class="alert-card">
        <div class="alert-top">
          <strong>${top.type}: ${top.pick}</strong>
          <span class="grade-pill ${grade.key}">${grade.grade}</span>
        </div>
        <div class="alert-meta">
          <div>${top.game.away} @ ${top.game.home}</div>
          <div>${top.leagueName} | ${competitionLabel}</div>
          <div>Modelo ${modelLabel} | EV ${evLabel} | Stake ${stakeLabel}</div>
          <div>${grade.label} | ${trustText} | score ${trustScore}</div>
        </div>
      </article>
    `;
  }

  function buildExecutiveHighlightsMarkup({ gradeLabel, trustText, evLabel, modelLabel, bookmakerLabel, splitBadge }) {
    return `
      <div class="executive-highlight-strip">
        <span class="pill">${gradeLabel}</span>
        <span class="pill">${trustText}</span>
        <span class="pill">EV ${evLabel}</span>
        <span class="pill">Modelo ${modelLabel}</span>
        <span class="pill">${bookmakerLabel}</span>
        ${splitBadge ? `<span class="pill mlb-signal ${splitBadge.key}">${splitBadge.label}</span>` : ""}
      </div>
    `;
  }

  function buildExecutiveSlateStateMarkup({ noBet, targetDate, slateTipsCount, realSlateTipsCount, evValidCount, evStrongOnly, confidenceModeLabel, threshold, evRejectedCount }) {
    return `
      <article class="alert-card">
        <div class="alert-top">
          <strong>${noBet ? "No apostar hoy" : "Slate activo"}</strong>
          <span>${targetDate}</span>
        </div>
        <div class="alert-meta">
          <div>${slateTipsCount} pick(s) | ${realSlateTipsCount} reales | ${evValidCount} validos por EV.</div>
          <div>${evStrongOnly ? "Filtro EV fuerte" : "Filtro EV normal"}</div>
          <div>Confianza ${confidenceModeLabel} ${threshold}%.</div>
          <div>${evRejectedCount} pick(s) fuera por filtro.</div>
        </div>
      </article>
    `;
  }

  function buildExecutiveBankrollStateMarkup({ bankrollLabel, roiLabel, winRateLabel, profitLabel, drawdownLabel }) {
    return `
      <article class="alert-card">
        <div class="alert-top">
          <strong>Banca actual</strong>
          <span>${bankrollLabel}</span>
        </div>
        <div class="alert-meta">
          <div>ROI ${roiLabel} · Win rate ${winRateLabel}</div>
          <div>Profit ${profitLabel} · Drawdown ${drawdownLabel}</div>
        </div>
      </article>
    `;
  }

  function buildExecutivePulseMarkup({ shortlist = [], recommendationGradeMeta, trustLabelForTip, money, recommendedStakeForTip }) {
    return shortlist.map((tip, index) => `
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

  return {
    buildDailyOpsCards,
    buildDailySportOpsMarkup,
    buildExecutiveEmptyState,
    buildExecutiveHeroMarkup,
    buildExecutiveTopPickMarkup,
    buildExecutiveHighlightsMarkup,
    buildExecutiveSlateStateMarkup,
    buildExecutiveBankrollStateMarkup,
    buildExecutivePulseMarkup,
  };
}));
