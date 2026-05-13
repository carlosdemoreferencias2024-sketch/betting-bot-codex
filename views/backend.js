(function initBackendView(root, factory) {
  const api = factory();
  root.BotViews = root.BotViews || {};
  root.BotViews.backend = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : window, function createBackendView() {
  function buildBackendMetricsMarkup(groups = [], labelForAction, stampFn) {
    return groups
      .sort((a, b) => String(b.lastAt || "").localeCompare(String(a.lastAt || "")))
      .slice(0, 10)
      .map((item) => `
        <div class="alert-item">
          <strong>${labelForAction(item.action)}</strong>
          <span>${item.count} evento(s)</span>
          <div>Total ${item.total} · Ultimo ${stampFn(item.lastAt)}</div>
        </div>
      `).join("");
  }

  function buildBackendValueMarkup(items = [], labelForAction, stampFn) {
    return items.length
      ? items.map((item) => `
        <div class="alert-item">
          <strong>${labelForAction(item.action)}</strong>
          <span>Impacto ${item.impact}</span>
          <div>${item.count} corrida(s) · Ultimo ${stampFn(item.lastAt)}</div>
        </div>
      `).join("")
      : `<div class="empty">Todavia no hay impacto medible en jobs backend.</div>`;
  }

  function buildBackendLogsMarkup(logs = [], toneForKind, stampFn) {
    return logs.length
      ? logs.slice(0, 18).map((entry) => `
        <div class="alert-item ${toneForKind(entry.kind)}">
          <strong>${entry.action || "backend"}</strong>
          <span>${stampFn(entry.at)}</span>
          <div>${entry.detail || "Sin detalle"}</div>
        </div>
      `).join("")
      : `<div class="empty">Todavia no hay logs backend recientes.</div>`;
  }

  return {
    buildBackendMetricsMarkup,
    buildBackendValueMarkup,
    buildBackendLogsMarkup,
  };
}));
