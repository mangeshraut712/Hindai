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

const SITE_URL = "https://mangeshraut712.github.io/Hindai";
const BASE_PATH = "/Hindai";

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
    }
  }
} finally {
  if (stashed) {
    restoreApi();
  }
}

process.exit(status);
