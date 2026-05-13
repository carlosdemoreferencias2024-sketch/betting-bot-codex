const assert = require("assert");
const path = require("path");

const tipEngine = require(path.join(__dirname, "..", "tip-engine.js"));
const dataLayers = require(path.join(__dirname, "..", "data-layers.js"));

function testSoccerRoleAssignment() {
  const ranked = [
    { type: "Ganador", confidence: 68 },
    { type: "Doble oportunidad", confidence: 66 },
    { type: "Over/Under", confidence: 61 },
  ];
  assert.deepStrictEqual(tipEngine.assignSoccerMarketRole(ranked[0], ranked, 0), { key: "principal", label: "Principal" });
  assert.deepStrictEqual(tipEngine.assignSoccerMarketRole(ranked[1], ranked, 1), { key: "coverage", label: "Cobertura" });
  assert.deepStrictEqual(tipEngine.assignSoccerMarketRole(ranked[2], ranked, 2), { key: "value", label: "Valor" });
}

function testStoryDeduplication() {
  const tips = [
    { type: "Doble oportunidad", pick: "Arsenal o empate", targetTeam: "Arsenal", game: { sport: "soccer", date: "2026-05-13", away: "Chelsea", home: "Arsenal" } },
    { type: "Empate no apuesta", pick: "Arsenal empate no apuesta", targetTeam: "Arsenal", game: { sport: "soccer", date: "2026-05-13", away: "Chelsea", home: "Arsenal" } },
    { type: "Over/Under", pick: "Over 2.5", totalSide: "Over", game: { sport: "soccer", date: "2026-05-13", away: "Chelsea", home: "Arsenal" } },
  ];
  const deduped = tipEngine.dedupeTipsByStory(tips, { maxPerStory: 1 });
  assert.strictEqual(deduped.length, 2);
}

function testBackendPackageAdaptation() {
  const adapted = dataLayers.adaptBackendDataPackage({
    sport: "soccer",
    leagueId: "4328",
    leagueName: "Premier League",
    games: [{ home: "A", away: "B", date: "2026-05-13", sport: "soccer" }],
    recentGames: [],
    health: {
      source: { state: "ok", mode: "live", winner: "oddsapi", detail: "ok" },
    },
  }, {
    buildFormBook: () => ({ A: { form: 60 } }),
    buildScheduleContext: () => ({ lastPlayed: { A: "2026-05-11" } }),
  });

  assert.strictEqual(adapted.games.length, 1);
  assert.strictEqual(adapted.health.source.mode, "live");
  assert.deepStrictEqual(adapted.formBook, { A: { form: 60 } });
  assert.deepStrictEqual(adapted.scheduleContext, { lastPlayed: { A: "2026-05-11" } });
}

function run() {
  testSoccerRoleAssignment();
  testStoryDeduplication();
  testBackendPackageAdaptation();
  console.log("Smoke tests passed.");
}

run();
