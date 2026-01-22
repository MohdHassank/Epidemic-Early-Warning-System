const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

const latest = {};
const alerts = [];

app.post("/api/data", (req, res) => {
  const d = req.body;

  if (!d || !d.id) return res.status(400).json({ ok: false, error: "Missing id" });

  d.time = new Date().toISOString();
  latest[d.id] = d;

  if (Number(d.r) >= 60) {
    alerts.unshift({ time: d.time, id: d.id, risk: d.r });
    if (alerts.length > 50) alerts.pop();
  }

  console.log("✅ Received:", d);
  res.json({ ok: true });
});

app.get("/api/state", (req, res) => {
  res.json({ latest, alerts });
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
