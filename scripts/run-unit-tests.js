#!/usr/bin/env node

const { spawnSync } = require("node:child_process");
const { readdirSync, statSync } = require("node:fs");
const { join } = require("node:path");

function collectTests(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      collectTests(path, acc);
      continue;
    }
    if (name.endsWith(".test.ts")) {
      acc.push(path);
    }
  }
  return acc;
}

const files = collectTests("src");
if (files.length === 0) {
  console.error("No src/**/*.test.ts files found.");
  process.exit(1);
}

const result = spawnSync(
  "npx",
  ["tsx", "--tsconfig", "tsconfig.json", "--test", ...files],
  {
    stdio: "inherit",
    shell: process.platform === "win32",
  }
);

process.exit(result.status === null ? 1 : result.status);
