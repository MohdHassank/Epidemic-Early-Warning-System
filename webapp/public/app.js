function riskText(r) {
  r = Number(r);
  if (r >= 60) return "HIGH";
  if (r >= 31) return "MEDIUM";
  return "LOW";
}

/* ===== MAP (SAFE) ===== */
let map, markersLayer;

function initMap() {
  if (map) return;

  // if Leaflet not loaded, don't crash the dashboard
  if (typeof L === "undefined") {
    console.log("Leaflet not loaded (L is undefined). Check HTML script order.");
    return;
  }

  map = L.map("map").setView([28.6139, 77.2090], 12); // default Delhi

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  markersLayer = L.layerGroup().addTo(map);
}


const DEMO_MODE = true;

// Put any coordinates you want (example points near Delhi)
const DEMO_MARKERS = [
  // SAFE (green)
  { id: "SAFE-1", lat: 28.6139, lon: 77.2090, danger: false }, // Connaught Place
  { id: "SAFE-2", lat: 28.6304, lon: 77.2177, danger: false }, // Karol Bagh
  { id: "SAFE-3", lat: 28.6245, lon: 77.1855, danger: false }, // Patel Nagar
  { id: "SAFE-4", lat: 28.5965, lon: 77.1610, danger: false }, // Vasant Vihar
  { id: "SAFE-5", lat: 28.5355, lon: 77.2639, danger: false }, // Noida side

  // DANGEROUS (red)
  { id: "DANGER-1", lat: 28.6020, lon: 77.2300, danger: true }, // ITO
  { id: "DANGER-2", lat: 28.5900, lon: 77.2000, danger: true }, // Lajpat Nagar
  { id: "DANGER-3", lat: 28.6508, lon: 77.2380, danger: true }, // Shahdara
  { id: "DANGER-4", lat: 28.5562, lon: 77.1000, danger: true }, // Dwarka
  { id: "DANGER-5", lat: 28.6780, lon: 77.3200, danger: true }  // Ghaziabad side
];

function spreadPoint(lat, lon, index, total, radius = 0.01) {
  // radius ≈ 1 km (0.01), increase for more separation
  const angle = (2 * Math.PI * index) / total;
  return [
    lat + radius * Math.cos(angle),
    lon + radius * Math.sin(angle)
  ];
}



function updateMap(latest) {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  initMap();
  if (!map || !markersLayer) return;

  markersLayer.clearLayers();
  const pts = [];

  // --- your existing real markers (lat/lon from API) ---
  Object.keys(latest).sort().forEach(id => {
    const d = latest[id];
    const lat = Number(d.lat);
    const lon = Number(d.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;

    pts.push([lat, lon]);

    const isDanger = Number(d.r) >= 60;
    const color = isDanger ? "#ff6b6b" : "#20c997";
    

    L.circleMarker([lat, lon], {
      radius: 12,
      color,
      fillColor: color,
      fillOpacity: 1,
      weight: 3,
    }).bindPopup(`<b>${d.id}</b><br>Risk: ${d.r ?? "-"} (${riskText(d.r)})`)
      .addTo(markersLayer);
  });

if (DEMO_MODE) {
  const total = DEMO_MARKERS.length;

  DEMO_MARKERS.forEach((m, i) => {
    const color = m.danger ? "#ff3b3b" : "#1dd1a1";

    const [lat, lon] = spreadPoint(m.lat, m.lon, i, total, 0.015);
    // ↑ increase 0.015 → 0.02 for even more gap

    pts.push([lat, lon]);

    const marker = L.circleMarker([lat, lon], {
      radius: 10,
      color: "#ffffff",
      weight: 3,
      fillColor: color,
      fillOpacity: 1
    })
    .bindPopup(`<b>${m.id}</b><br>${m.danger ? "DANGEROUS" : "SAFE"}`)
    .addTo(markersLayer);

    marker.bringToFront();
  });
}


  if (pts.length > 0) {
    map.fitBounds(L.latLngBounds(pts), { padding: [30, 30] });
  }
}

/* ===== EXISTING DASHBOARD (UNCHANGED LOGIC) ===== */
async function load() {
  try {
    const res = await fetch("/api/state");
    const data = await res.json();

    const latest = data.latest || {};
    console.log("latest sample:", Object.values(latest)[0]);

    const alerts = data.alerts || [];

    const ids = Object.keys(latest);
    const tbody = document.getElementById("deviceRows");
    tbody.innerHTML = "";

    if (ids.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7">Waiting for data.</td></tr>`;
    } else {
      ids.sort().forEach(id => {
        const d = latest[id];
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${d.id}</td>
          <td>${d.t ?? "-"}</td>
          <td>${d.h ?? "-"}</td>
          <td>${d.s ?? "-"}</td>
          <td>${d.w ?? "-"}</td>
          <td>${d.r ?? "-"} (<span class="risk-${riskText(d.r).toLowerCase()}">${riskText(d.r)}</span>)</td>
          <td>${d.time ?? "-"}</td>
        `;
        tbody.appendChild(row);
      });
    }

    const ul = document.getElementById("alertList");
    ul.innerHTML = "";

    if (alerts.length === 0) {
      ul.innerHTML = `<li>No alerts yet</li>`;
    } else {
      alerts.slice(0, 10).forEach(a => {
        const li = document.createElement("li");
        li.textContent = `${a.time} | ${a.id} | Risk: ${a.risk}`;
        ul.appendChild(li);
      });
    }

    // ✅ Map update happens here (latest is defined here)
    updateMap(latest);

  } catch (e) {
    console.log("Error:", e);
    initMap();
    updateMap({}); 

  // OPTIONAL (small bugfix UX): show API issue in table
  const tbody = document.getElementById("deviceRows");
  if (tbody) tbody.innerHTML = `<tr><td colspan="7">API not reachable (/api/state).</td></tr>`;
}
}

setInterval(load, 2000);
initMap();
updateMap({}); // ✅ show demo dots instantly
load();
