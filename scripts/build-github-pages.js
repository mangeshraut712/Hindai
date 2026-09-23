#!/usr/bin/env node

/**
 * GitHub Pages static export.
 *
 * Next.js `output: 'export'` cannot compile App Router Route Handlers
 * (`app/api/**`). Those endpoints need a Node server (previously Vercel).
 * This script stashes `app/api` for the duration of `next build`, then
 * restores it so local `next dev` still has the API routes.
 */

const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const apiDir = path.join(root, "app", "api");
const stashDir = path.join(root, ".static-export-api-stash");
const outDir = path.join(root, "out");

const { prefixPublicAssetContent } = require("./prefix-public-asset-paths");

const SITE_URL = "https://mangeshraut712.github.io/Hindai";
const BASE_PATH = "/Hindai";

// A previous export may have been interrupted while app/api was stashed.
// Recover those routes before starting a new build.
if (!fs.existsSync(apiDir) && fs.existsSync(stashDir)) {
  fs.renameSync(stashDir, apiDir);
}

function restoreApi() {
  if (!fs.existsSync(stashDir)) {
    return;
  }
  if (fs.existsSync(apiDir)) {
    fs.rmSync(apiDir, { recursive: true, force: true });
  }
  fs.renameSync(stashDir, apiDir);
}

function stashApi() {
  if (!fs.existsSync(apiDir)) {
    return false;
  }
  if (fs.existsSync(stashDir)) {
    fs.rmSync(stashDir, { recursive: true, force: true });
  }
  fs.renameSync(apiDir, stashDir);
  return true;
}

const stashed = stashApi();

process.env.GITHUB_PAGES = "true";
process.env.NEXT_PUBLIC_BASE_PATH = BASE_PATH;
process.env.NEXT_PUBLIC_SITE_URL = SITE_URL;
process.env.NEXT_PUBLIC_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://hindai-gemma.mangeshraut712.workers.dev";
process.env.NEXT_PUBLIC_HAS_SERVER_API = process.env.NEXT_PUBLIC_API_BASE ? "true" : "false";

let status = 1;

try {
  const result = spawnSync("npx", ["next", "build"], {
    cwd: root,
    stdio: "inherit",
    env: process.env,
    shell: process.platform === "win32",
  });
  status = result.status ?? 1;

  if (status === 0) {
    if (!fs.existsSync(outDir)) {
      console.error("Static export did not produce an `out/` directory.");
      status = 1;
    } else {
      fs.writeFileSync(path.join(outDir, ".nojekyll"), "");
      prefixPublicAssetPaths(outDir, BASE_PATH);
      writeOfflineManifest(outDir, BASE_PATH);
    }
  }
} finally {
  if (stashed) {
    restoreApi();
  }
}

process.exit(status);

/**
 * Next 15 static export currently emits `src="/logo.webp"` and
 * `href="/manifest.json"` without basePath. Rewrite public-root paths
 * so GitHub Pages serves `/Hindai/...`.
 */
function prefixPublicAssetPaths(dir, basePath) {
  let changedFiles = 0;

  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules") continue;
        walk(full);
        continue;
      }
      if (!/\.(html|js|rsc)$/.test(entry.name)) continue;
      const before = fs.readFileSync(full, "utf8");
      const after = prefixPublicAssetContent(before, basePath, true);
      if (after !== before) {
        fs.writeFileSync(full, after);
        changedFiles += 1;
      }
    }
  }

  walk(dir);
  console.log(`Prefixed public asset paths with ${basePath} in ${changedFiles} files.`);
}

function writeOfflineManifest(dir, basePath) {
  const entries = [];
  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      const relative = path.relative(dir, full).split(path.sep).join("/");
      if (relative === ".nojekyll" || relative === "offline-manifest.json") continue;
      const url =
        relative === "index.html"
          ? basePath + "/"
          : relative.endsWith("/index.html")
            ? basePath + "/" + relative.slice(0, -"index.html".length)
            : basePath + "/" + relative;
      entries.push({ url, bytes: fs.statSync(full).size });
    }
  }
  walk(dir);
  entries.sort((a, b) => a.url.localeCompare(b.url));
  fs.writeFileSync(
    path.join(dir, "offline-manifest.json"),
    JSON.stringify({ version: 1, entries }) + "\n"
  );
  console.log("Offline library manifest: " + entries.length + " files.");
}
