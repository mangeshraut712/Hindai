#!/usr/bin/env node
/**
 * Builds src/lib/data/south-asia-basemap.ts from Natural Earth 50m (public domain).
 * Usage: node scripts/build-south-asia-basemap.mjs [path/to/ne_50m_admin_0_countries.geojson]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const input =
  process.argv[2] || path.join(root, "scripts/tmp/ne_50m_admin_0_countries.geojson");

const BOUNDS = { minLat: 5.5, maxLat: 37.5, minLng: 60, maxLng: 98 };
const SOFT = { minLng: 55, maxLng: 102, minLat: 3, maxLat: 40 };
const W = 120;
const H = 100;

const CORE = ["India", "Pakistan", "Bangladesh", "Nepal", "Bhutan", "Sri Lanka", "Maldives"];
const NEIGHBOR = [
  "Afghanistan",
  "Iran",
  "China",
  "Myanmar",
  "Tajikistan",
  "Turkmenistan",
  "Uzbekistan",
  "Oman",
  "United Arab Emirates",
];

function project([lng, lat]) {
  return [
    ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * W,
    ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * H,
  ];
}

function clipRing(ring) {
  const clipped = ring.filter(
    ([lng, lat]) =>
      lng >= SOFT.minLng && lng <= SOFT.maxLng && lat >= SOFT.minLat && lat <= SOFT.maxLat
  );
  return clipped.length >= 4 ? clipped : null;
}

function simplify(ring, tol) {
  const pts = ring.map(project);
  if (pts.length <= 8) {
    return pts;
  }
  const keep = new Array(pts.length).fill(false);
  keep[0] = true;
  keep[pts.length - 1] = true;

  function dist(a, b, p) {
    const vx = b[0] - a[0];
    const vy = b[1] - a[1];
    const wx = p[0] - a[0];
    const wy = p[1] - a[1];
    const c2 = vx * vx + vy * vy;
    if (c2 < 1e-9) {
      return Math.hypot(wx, wy);
    }
    let t = (wx * vx + wy * vy) / c2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(p[0] - (a[0] + t * vx), p[1] - (a[1] + t * vy));
  }

  function dp(i0, i1) {
    let maxD = 0;
    let idx = -1;
    for (let i = i0 + 1; i < i1; i += 1) {
      const d = dist(pts[i0], pts[i1], pts[i]);
      if (d > maxD) {
        maxD = d;
        idx = i;
      }
    }
    if (maxD > tol && idx >= 0) {
      keep[idx] = true;
      dp(i0, idx);
      dp(idx, i1);
    }
  }

  dp(0, pts.length - 1);
  return pts.filter((_, i) => keep[i]);
}

function collectPaths(geometry, tol) {
  const out = [];
  function walkPolygon(coords) {
    for (const ring of coords) {
      const clipped = clipRing(ring);
      if (!clipped) {
        continue;
      }
      const pts = simplify(clipped, tol);
      if (pts.length < 4) {
        continue;
      }
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      for (const [x, y] of pts) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
      if (maxX - minX < 0.9 && maxY - minY < 0.9) {
        continue;
      }
      out.push(`M${pts.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join("L")}Z`);
    }
  }
  if (geometry.type === "Polygon") {
    walkPolygon(geometry.coordinates);
  }
  if (geometry.type === "MultiPolygon") {
    for (const poly of geometry.coordinates) {
      walkPolygon(poly);
    }
  }
  return out;
}

function pathsFor(features, names, tol) {
  return features
    .filter((f) => names.includes(f.properties.NAME))
    .flatMap((f) => collectPaths(f.geometry, tol));
}

if (!fs.existsSync(input)) {
  console.error(`Missing GeoJSON: ${input}`);
  console.error(
    "Download Natural Earth 50m admin 0 countries GeoJSON into scripts/tmp/ first."
  );
  process.exit(1);
}

const g = JSON.parse(fs.readFileSync(input, "utf8"));
const core = pathsFor(g.features, CORE, 0.28);
const neighbors = pathsFor(g.features, NEIGHBOR, 0.42);
const file = `/** Auto-generated from Natural Earth 50m (public domain). Run: node scripts/build-south-asia-basemap.mjs */
export const MAP_VIEW = {
  width: ${W},
  height: ${H},
  minLat: ${BOUNDS.minLat},
  maxLat: ${BOUNDS.maxLat},
  minLng: ${BOUNDS.minLng},
  maxLng: ${BOUNDS.maxLng},
} as const;

/** Neighbor landmasses for geographic context (faded). */
export const SOUTH_ASIA_NEIGHBORS_PATH = ${JSON.stringify(neighbors.join(""))};

/** India + Pakistan + Bangladesh + Nepal + Bhutan + Sri Lanka + Maldives. */
export const SOUTH_ASIA_LAND_PATH = ${JSON.stringify(core.join(""))};
`;

const out = path.join(root, "src/lib/data/south-asia-basemap.ts");
fs.writeFileSync(out, file);
console.log(`Wrote ${out} (core ${core.length} segs, neighbors ${neighbors.length} segs)`);
