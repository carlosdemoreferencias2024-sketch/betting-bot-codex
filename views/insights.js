(function initInsightsView(root, factory) {
  const api = factory();
  root.BotViews = root.BotViews || {};
  root.BotViews.insights = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : window, function createInsightsView() {
  function buildAutoConfidenceEmptyMarkup(packageInfo) {
    return `
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
  }

  function buildAutoConfidencePanelMarkup({ packageInfo, modeInfo, ranked = [], deps }) {
    return [
      `
        <article class="alert-card">
          <div class="alert-top">
            <strong>${modeInfo.noBet ? "Hoy pisaria el freno" : "Recomendacion automatica"}</strong>
            <span>${packageInfo.threshold}%</span>
          </div>
          <div class="alert-meta">
            <div>${packageInfo.detail}</div>
            <div>${modeInfo.reasons?.[0] || "El motor ya esta priorizando valor, confianza y calidad del dato."}</div>
            <div>${modeInfo.noBet ? "El slate no da para abrir mucho la mano." : `Modo sugerido: ${deps.betModeLabel(modeInfo.mode)}.`}</div>
          </div>
        </article>
      `,
      ...ranked.map((tip, index) => {
        const trustScore = deps.trustScoreForTip(tip);
        const competition = deps.competitionClassMeta(tip);
        const reality = deps.pickRealityMeta(tip);
        const grade = deps.recommendationGradeMeta(tip);
        return `
          <article class="alert-card">
            <div class="alert-top">
              <strong>${index + 1}. ${tip.type}: ${tip.pick}</strong>
              <span class="grade-pill ${grade.key}">${grade.grade}</span>
            </div>
            <div class="alert-meta">
              <div>${tip.game.away} @ ${tip.game.home} · ${tip.leagueName || deps.sportProfiles[tip.game.sport]?.apiName || tip.game.sport}</div>
              <div>${reality.label} · ${competition.label} · ${tip.bookmaker} ${Number(tip.odds || 0).toFixed(2)}x</div>
              <div>${grade.label} · ${deps.trustLabelForTip(tip)} · score ${trustScore}</div>
              <div>Modelo ${deps.toPercent((tip.modelProbability || 0) * 100)} · EV ${tip.ev > 0 ? "+" : ""}${tip.ev}% · Stake ${deps.money(tip.recommendedStake ?? deps.recommendedStakeForTip(tip))}</div>
            </div>
          </article>
        `;
      }),
    ].join("");
  }

  function buildMarketExplorerEmptyState(type) {
    if (type === "none") {
      return {
        meta: `<div class="empty">Todavia no hay partidos con mercados para explorar.</div>`,
        body: "",
      };
    }
    return {
      body: `<div class="empty">Todavia no hay picks del tipo seleccionado para este partido.</div>`,
    };
  }

  function buildMarketExplorerMetaMarkup({ displayAway, displayHome, displayLeague, displayDate, leadTip, deps, activeFamily }) {
    return `
      <article class="alert-card">
        <div class="alert-top">
          <strong>${displayAway} @ ${displayHome}</strong>
          <span>${displayLeague}</span>
        </div>
        <div class="alert-meta">
          <div>${displayDate}${leadTip ? ` · ${deps.pickRealityMeta(leadTip).label} · ${deps.competitionClassMeta(leadTip).label}` : " · Feed real del mercado"}</div>
          <div>${activeFamily.items.length} opcion(es) en ${activeFamily.label} para este partido.</div>
        </div>
      </article>
    `.replaceAll(" · ", " | ");
  }

  function buildMarketExplorerCardsMarkup({ activeFamily, deps }) {
    return activeFamily.items
      .sort((a, b) => {
        if (a.kind === "prop" || b.kind === "prop") {
          return Number(b.bestPrice || 0) - Number(a.bestPrice || 0);
        }
        return deps.trustScoreForTip(b) - deps.trustScoreForTip(a) || b.ev - a.ev;
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
                <div>${tip.grade.label} | Riesgo ${tip.riskLabel} | Stake ${deps.money(tip.recommendedStake || 0)}</div>
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

        const grade = deps.recommendationGradeMeta(tip);
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
                <span class="trust-pill ${deps.trustTierForTip(tip)}">${deps.trustLabelForTip(tip)} · ${deps.trustScoreForTip(tip)}</span>
              </div>
            </div>
            <div class="alert-meta">
              <div>${tip.market}${tip.line ? ` ${tip.line}` : ""} · Mejor ${tip.bookmaker} ${Number(tip.odds || 0).toFixed(2)}x</div>
              <div>Segundo mejor ${secondBook?.bookmaker || "Sin segundo"} ${secondBook ? `${Number(secondBook.price || 0).toFixed(2)}x` : ""}</div>
              <div>${grade.label} · Modelo ${deps.toPercent((tip.modelProbability || 0) * 100)} · EV ${tip.ev > 0 ? "+" : ""}${tip.ev}% · Stake ${deps.money(tip.recommendedStake ?? deps.recommendedStakeForTip(tip))}</div>
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
      .join("")
      .replaceAll(" · ", " | ");
  }

  function buildAlertsCenterMarkup(alerts = []) {
    if (!alerts.length) {
      return `<div class="empty">Todavia no hay alertas EV+ o movimientos de valor para este slate.</div>`;
    }
    return alerts.map((alert) => `
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

  return {
    buildAutoConfidenceEmptyMarkup,
    buildAutoConfidencePanelMarkup,
    buildMarketExplorerEmptyState,
    buildMarketExplorerMetaMarkup,
    buildMarketExplorerCardsMarkup,
    buildAlertsCenterMarkup,
  };
}));
