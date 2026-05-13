(function initPicksView(root, factory) {
  const api = factory();
  root.BotViews = root.BotViews || {};
  root.BotViews.picks = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : window, function createPicksView() {
  function buildFlatSlateMarkup({ flatGroups = [], threshold, registerTip, deps }) {
    return `
      <div class="slate-table-shell">
        <table class="slate-table">
          <thead>
            <tr>
              <th>Liga</th>
              <th>Partido</th>
              <th>Rol</th>
              <th>Mercado</th>
              <th>Fecha</th>
              <th>Cuota</th>
              <th>EV</th>
              <th>Conf.</th>
              <th>Estado</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            ${flatGroups.map((group) => {
              const leagueLabel = group.markets[0]?.tip?.leagueName || group.game?.leagueName || "Futbol";
              if (!group.markets.length) {
                return `
                  <tr class="slate-group-row">
                    <td colspan="10">
                      <div class="slate-group-label">
                        <strong>${leagueLabel}</strong>
                        <span>${group.game.away} @ ${group.game.home}</span>
                      </div>
                    </td>
                  </tr>
                  <tr class="slate-row no-bet">
                    <td>${leagueLabel}</td>
                    <td>
                      <div class="slate-match-cell">
                        <strong>${group.game.away} @ ${group.game.home}</strong>
                        <span>${group.game.status || "Programado"}</span>
                      </div>
                    </td>
                    <td><span class="slate-role-pill value">Sin paso</span></td>
                    <td><div class="slate-flat-empty">Ningun mercado supero el corte actual.</div></td>
                    <td>${group.game.date || "--"}</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td><span class="pill grade-pill grade-c">No bet</span></td>
                    <td><span class="slate-action-text">Esperar</span></td>
                  </tr>
                `;
              }
              const rows = group.markets.map((entry, index) => {
                const { tip, role, rank } = entry;
                const id = deps.tipId(tip);
                const suggestedStake = deps.recommendedStakeForTip(tip);
                const grade = deps.recommendationGradeMeta(tip);
                const action = deps.recommendationActionForTip(tip);
                registerTip(id, { ...tip, selectionRole: role.label });
                return `
                  <tr class="slate-row flat-market-row ${action.key}">
                    <td>${index === 0 ? leagueLabel : ""}</td>
                    <td>
                      <div class="slate-match-cell">
                        <strong>${tip.game.away} @ ${tip.game.home}</strong>
                        <span>${tip.game.status || "Programado"}</span>
                      </div>
                    </td>
                    <td><span class="slate-role-pill ${role.key}">${role.label}</span></td>
                    <td>
                      <div class="slate-market-cell">
                        <strong>${rank}. ${tip.type}</strong>
                        <span>${tip.pick}</span>
                        <em>${tip.reason}</em>
                      </div>
                    </td>
                    <td>${tip.game.date || "--"}</td>
                    <td>${tip.odds.toFixed(2)}x</td>
                    <td>${tip.ev > 0 ? "+" : ""}${tip.ev}%</td>
                    <td>${deps.toPercent(tip.confidence)}</td>
                    <td>
                      <span class="pill grade-pill ${grade.key}">${grade.grade}</span>
                      <span class="pill ${tip.confidence >= 60 ? "pick-clean-badge safe" : tip.confidence >= 55 ? "pick-clean-badge medium" : "pick-clean-badge light"}">${action.label}</span>
                    </td>
                    <td>
                      <div class="slate-row-actions">
                        <input class="stake-field compact-stake" type="number" min="0.1" step="0.1" value="${suggestedStake}" data-stake-id="${id}" />
                        <button class="ghost-btn" type="button" data-share-tip="${id}">Imagen</button>
                        <button class="ghost-btn" type="button" data-ticket-add="${id}">Ticket</button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join("");
              return `
                <tr class="slate-group-row">
                  <td colspan="10">
                    <div class="slate-group-label">
                      <strong>${leagueLabel}</strong>
                      <span>${group.game.away} @ ${group.game.home}</span>
                      <span>${group.markets.length} mercado(s) sobre ${threshold}%</span>
                    </div>
                  </td>
                </tr>
                ${rows}
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function buildSummarySlateMarkup({ visibleGames = [], candidatePool = [], registerTip, deps }) {
    return `
      <div class="slate-table-shell">
        <table class="slate-table">
          <thead>
            <tr>
              <th>Partido</th>
              <th>Pick principal</th>
              <th>Mercados jugables</th>
              <th>Fecha</th>
              <th>Cuota</th>
              <th>EV</th>
              <th>Conf.</th>
              <th>Estado</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            ${visibleGames.map((game) => {
              const tip = deps.bestTipForSlateGame(candidatePool, game);
              if (!tip) {
                return `
                  <tr class="slate-row no-bet">
                    <td>
                      <div class="slate-match-cell">
                        <strong>${game.away} @ ${game.home}</strong>
                        <span>${game.status || "Programado"}</span>
                      </div>
                    </td>
                    <td><span class="slate-main-pick">No bet</span><span class="slate-subpick">Sin valor claro en esta corrida.</span></td>
                    <td><span class="slate-subpick">Sin mercados con edge suficiente.</span></td>
                    <td>${game.date || "--"}</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td><span class="pill grade-pill grade-c">No bet</span></td>
                    <td><span class="slate-action-text">Esperar</span></td>
                  </tr>
                `;
              }
              const id = deps.tipId(tip);
              const suggestedStake = deps.recommendedStakeForTip(tip);
              const grade = deps.recommendationGradeMeta(tip);
              const action = deps.recommendationActionForTip(tip);
              const rankedTips = deps.visibleSlateMarketTips(candidatePool, game);
              const topMarkets = deps.topSlateMarketsForDisplay(candidatePool, game);
              const marketGroups = deps.groupedMarketsForSlateGame(candidatePool, game);
              const secondaryTip = rankedTips.find((item) => deps.tipId(item) !== id) || null;
              registerTip(id, { ...tip, selectionRole: "Principal" });
              return `
                <tr class="slate-row ${action.key}">
                  <td>
                    <div class="slate-match-cell">
                      <strong>${tip.game.away} @ ${tip.game.home}</strong>
                      <span>${tip.leagueName || deps.sportProfiles[tip.game.sport].apiName}</span>
                    </div>
                  </td>
                  <td>
                    <span class="slate-main-pick">${tip.type}: ${tip.pick}</span>
                    <span class="slate-subpick">${secondaryTip ? `Alt: ${secondaryTip.type}: ${secondaryTip.pick}` : grade.label}</span>
                    ${topMarkets.length > 1 ? `
                      <div class="slate-top-market-list">
                        ${topMarkets.map((marketTip, index) => `
                          <div class="slate-top-market-item ${index === 0 ? "primary" : ""}">
                            <strong>${index + 1}. ${marketTip.type}</strong>
                            <span>${marketTip.pick}</span>
                            <em>${marketTip.odds.toFixed(2)}x · EV ${marketTip.ev > 0 ? "+" : ""}${marketTip.ev}%</em>
                          </div>
                        `).join("")}
                      </div>
                    ` : ""}
                  </td>
                  <td>
                    <div class="slate-market-stack">
                      ${rankedTips.map((marketTip, index) => `
                        <span class="slate-market-pill ${index === 0 ? "primary" : ""}">
                          ${marketTip.type}: ${marketTip.pick} · ${marketTip.odds.toFixed(2)}x
                        </span>
                      `).join("")}
                    </div>
                  </td>
                  <td>${tip.game.date || "--"}</td>
                  <td>${tip.odds.toFixed(2)}x</td>
                  <td>${tip.ev > 0 ? "+" : ""}${tip.ev}%</td>
                  <td>${deps.toPercent(tip.confidence)}</td>
                  <td>
                    <span class="pill grade-pill ${grade.key}">${grade.grade}</span>
                    <span class="pill ${tip.confidence >= 60 ? "pick-clean-badge safe" : tip.confidence >= 55 ? "pick-clean-badge medium" : "pick-clean-badge light"}">${action.label}</span>
                  </td>
                  <td>
                    <div class="slate-row-actions">
                      <input class="stake-field compact-stake" type="number" min="0.1" step="0.1" value="${suggestedStake}" data-stake-id="${id}" />
                      <button class="ghost-btn" type="button" data-slate-expand="${deps.slateGameKey(game)}">Ver mercados</button>
                      <button class="ghost-btn" type="button" data-share-tip="${id}">Imagen</button>
                      <button class="ghost-btn" type="button" data-ticket-add="${id}">Ticket</button>
                    </div>
                  </td>
                </tr>
                <tr class="slate-detail-row" data-slate-detail="${deps.slateGameKey(game)}" hidden>
                  <td colspan="8">
                    <div class="slate-detail-grid">
                      ${[
                        { key: "main", eyebrow: "1X2", title: "Principales", empty: "Sin 1X2 fuerte." },
                        { key: "totals", eyebrow: "Totales", title: "Over / Under", empty: "Sin totales fuertes." },
                        { key: "handicap", eyebrow: "Handicap", title: "Lados y lineas", empty: "Sin handicap fuerte." },
                        { key: "props", eyebrow: "Props", title: "Mercados extra", empty: "Sin props fuertes." },
                      ].map((groupMeta) => `
                        <div class="mini-board">
                          <div class="section-head">
                            <div>
                              <p class="eyebrow">${groupMeta.eyebrow}</p>
                              <h2>${groupMeta.title}</h2>
                            </div>
                          </div>
                          <div class="alerts-list">
                            ${marketGroups[groupMeta.key]?.length ? marketGroups[groupMeta.key].map((marketTip) => `
                              <article class="alert-card">
                                <div class="alert-top">
                                  <strong>${marketTip.type}: ${marketTip.pick}</strong>
                                  <span>${marketTip.odds.toFixed(2)}x</span>
                                </div>
                                <div class="alert-meta">
                                  <div>EV ${marketTip.ev > 0 ? "+" : ""}${marketTip.ev}% · Conf. ${deps.toPercent(marketTip.confidence)}</div>
                                </div>
                              </article>
                            `).join("") : `<div class="empty">${groupMeta.empty}</div>`}
                          </div>
                        </div>
                      `).join("")}
                    </div>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  return {
    buildFlatSlateMarkup,
    buildSummarySlateMarkup,
  };
}));
