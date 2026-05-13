(function initSocialView(root, factory) {
  const api = factory();
  root.BotViews = root.BotViews || {};
  root.BotViews.social = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : window, function createSocialView() {
  function buildEmptyShareState() {
    return {
      preview: `<div class="empty">Selecciona un pick con el boton Imagen.</div>`,
      meta: `<div class="empty">Todavia no hay pick listo para redes.</div>`,
    };
  }

  function buildSharePreviewMarkup({ brandLabel, verdict, tip, leagueLabel, bookmakerLabel, modelLabel, evLabel, stakeLabel, reality, competition }) {
    return `
      <article class="share-card">
        <div class="share-card-head">
          <span class="share-brand">${brandLabel}</span>
          <span class="share-verdict ${verdict.key}">${verdict.label}</span>
        </div>
        <div>
          <p class="match share-match">${tip.game.away} @ ${tip.game.home}</p>
          <p class="share-pick"><strong>${tip.type}:</strong> ${tip.pick}</p>
        </div>
        <div class="share-grid">
          <div class="share-stat"><strong>Liga</strong><span>${leagueLabel}</span></div>
          <div class="share-stat"><strong>Cuota</strong><span>${bookmakerLabel}</span></div>
          <div class="share-stat"><strong>Modelo</strong><span>${modelLabel}</span></div>
          <div class="share-stat"><strong>EV</strong><span>${evLabel}</span></div>
          <div class="share-stat"><strong>Stake</strong><span>${stakeLabel}</span></div>
          <div class="share-stat"><strong>Dato</strong><span>${reality.label}</span></div>
          <div class="share-stat"><strong>Competencia</strong><span>${competition.label}</span></div>
        </div>
        <div class="share-card-footer">
          <span class="pill pick-reality ${reality.key}">${reality.detail}</span>
          <span class="pill competition-tag ${competition.key}">${competition.label}</span>
          <span class="pill">${tip.game.date}</span>
        </div>
      </article>
    `;
  }

  function buildShareMetaMarkup({ verdict, shareText }) {
    return `
      <article class="alert-card">
        <div class="alert-top">
          <strong>Texto listo</strong>
          <span>${verdict.label}</span>
        </div>
        <div class="alert-meta">
          <div>${shareText.replace(/\n/g, "<br />")}</div>
        </div>
      </article>
    `;
  }

  function drawShareImage({ canvas, tip, verdict, reality, helpers }) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return false;

    canvas.width = 1080;
    canvas.height = 1350;
    ctx.fillStyle = "#111412";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#1b211e");
    gradient.addColorStop(1, "#101512");
    ctx.fillStyle = gradient;
    ctx.fillRect(60, 60, 960, 1230);

    ctx.strokeStyle = "rgba(244,247,241,0.12)";
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 60, 960, 1230);

    ctx.fillStyle = "#b9c4b8";
    ctx.font = "700 28px Segoe UI";
    ctx.fillText(helpers.brandLabel, 110, 130);

    const verdictColor = verdict.key === "good" ? "#52d273" : verdict.key === "medium" ? "#f2c14e" : "#ff6b5f";
    ctx.fillStyle = verdictColor;
    ctx.beginPath();
    ctx.roundRect(780, 95, 150, 48, 24);
    ctx.fill();
    ctx.fillStyle = "#0b110d";
    ctx.font = "900 24px Segoe UI";
    ctx.fillText(verdict.label.toUpperCase(), 810, 128);

    ctx.fillStyle = "#f4f7f1";
    ctx.font = "900 58px Segoe UI";
    helpers.wrapCanvasText(ctx, `${tip.game.away} @ ${tip.game.home}`, 110, 250, 820, 70);

    ctx.font = "700 38px Segoe UI";
    ctx.fillStyle = "#f4f7f1";
    helpers.wrapCanvasText(ctx, `${tip.type}: ${tip.pick}`, 110, 420, 820, 52);

    const stats = [
      ["Liga", helpers.leagueLabel],
      ["Cuota", helpers.bookmakerLabel],
      ["Modelo", helpers.modelLabel],
      ["EV", helpers.evLabel],
      ["Stake", helpers.stakeLabel],
      ["Dato", reality.label],
    ];

    const boxY = 560;
    stats.forEach((item, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const x = 110 + col * 420;
      const y = boxY + row * 150;
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.fillRect(x, y, 360, 110);
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.strokeRect(x, y, 360, 110);
      ctx.fillStyle = "#9bb39d";
      ctx.font = "600 22px Segoe UI";
      ctx.fillText(item[0].toUpperCase(), x + 24, y + 32);
      ctx.fillStyle = "#f4f7f1";
      ctx.font = "700 30px Segoe UI";
      helpers.wrapCanvasText(ctx, item[1], x + 24, y + 74, 300, 34);
    });

    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(110, 1040, 820, 150);
    ctx.fillStyle = "#f4f7f1";
    ctx.font = "700 26px Segoe UI";
    helpers.wrapCanvasText(ctx, tip.reason || "Pick con valor respaldado por el modelo.", 140, 1090, 760, 34);

    ctx.fillStyle = "#8fa592";
    ctx.font = "600 22px Segoe UI";
    ctx.fillText(`Fecha ${tip.game.date}  |  ${reality.detail}`, 110, 1260);
    return true;
  }

  return {
    buildEmptyShareState,
    buildSharePreviewMarkup,
    buildShareMetaMarkup,
    drawShareImage,
  };
}));
