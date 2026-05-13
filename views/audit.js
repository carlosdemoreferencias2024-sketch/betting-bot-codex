(function initAuditView(root, factory) {
  const api = factory();
  root.BotViews = root.BotViews || {};
  root.BotViews.audit = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : window, function createAuditView() {
  function buildAuditRankingMarkup({ records = [], bestSport, bestMarket, bestMode, worstMode, rankingCard, emptyMessage }) {
    const settled = records.filter((record) => record.result !== "pending");
    if (!settled.length) {
      return `<div class="empty">${emptyMessage}</div>`;
    }

    return [
      rankingCard("Mejor deporte", bestSport),
      rankingCard("Mejor mercado", bestMarket),
      rankingCard("Mejor modo", bestMode),
      rankingCard("Peor modo", worstMode),
    ].join("");
  }

  function buildBacktestSummaryMarkup({
    settledHistory = [],
    settledPaper = [],
    sourceLabel,
    historyRoi,
    paperRoi,
    bestMode,
    toPercent,
  }) {
    if (!settledHistory.length && !settledPaper.length) {
      return `<div class="empty">Todavia no hay muestra cerrada suficiente para backtesting.</div>`;
    }

    return `
      <article class="alert-card">
        <div class="alert-top">
          <strong>Backtest rapido</strong>
          <span>${settledHistory.length + settledPaper.length} cierres</span>
        </div>
        <div class="alert-meta">
          <div>Fuente auditada: ${sourceLabel}</div>
          <div>Historial ROI ${toPercent(historyRoi)} · Paper ROI ${toPercent(paperRoi)}</div>
          <div>Mejor modo observado: ${bestMode}</div>
        </div>
      </article>
    `;
  }

  function buildHistoryRows({ records = [], profitFor, money, confidenceMeta }) {
    if (!records.length) {
      return `<tr><td colspan="8">No hay registros para esos filtros.</td></tr>`;
    }

    return records.map((record) => {
      const profit = profitFor(record);
      const resultLabel = record.result === "win" ? "Ganado" : record.result === "loss" ? "Perdido" : "Pendiente";
      const profitClass = profit > 0 ? "profit-win" : profit < 0 ? "profit-loss" : "";
      const confidenceLabel = confidenceMeta(record);

      return `
        <tr>
          <td>${record.eventDate}</td>
          <td>${record.kind}<br><span class="leg-match">${record.sport}</span></td>
          <td><strong>${record.market}</strong><br>${record.pick}<br><span class="leg-match">${record.title}</span></td>
          <td>${Number(record.odds).toFixed(2)}x<br><span class="leg-match">${confidenceLabel} · ${record.valueLabel || "-"}</span></td>
          <td>${money(Number(record.stake) || 1)}</td>
          <td>${record.clv === undefined || record.clv === null ? "-" : `${record.clv > 0 ? "+" : ""}${record.clv}%`}</td>
          <td><span class="result-pill ${record.result}">${resultLabel}</span></td>
          <td class="${profitClass}">${money(profit)}</td>
        </tr>
      `;
    }).join("");
  }

  return {
    buildAuditRankingMarkup,
    buildBacktestSummaryMarkup,
    buildHistoryRows,
  };
}));
