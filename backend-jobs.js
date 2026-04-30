const jobBase = "http://127.0.0.1:5173";
const intervalHours = 6;

async function post(path) {
  const response = await fetch(`${jobBase}${path}`, { method: "POST" });
  if (!response.ok) {
    throw new Error(`${path} respondio ${response.status}`);
  }
  return response.json();
}

async function runCycle() {
  const now = new Date().toISOString();
  try {
    const picks = await post("/api/jobs/picks");
    const digest = await post("/api/jobs/digest");
    const grade = await post("/api/jobs/grade");
    console.log(`[${now}] picks ok=${picks.ok} digest ok=${digest.ok} grade ok=${grade.ok}`);
  } catch (error) {
    console.error(`[${now}] backend jobs failed: ${error.message}`);
  }
}

console.log(`Scheduler local activo. Correra picks + digest + grade cada ${intervalHours} horas.`);
runCycle();
setInterval(runCycle, intervalHours * 60 * 60 * 1000);
