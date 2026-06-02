#!/usr/bin/env node

const { spawnSync } = require("node:child_process");

const isCi = process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true";

if (isCi) {
  console.log("Skipping React Doctor agent install in CI.");
  process.exit(0);
}

const result = spawnSync("npx", ["react-doctor", "install", "--yes"], {
  shell: process.platform === "win32",
  stdio: "inherit",
});

if (result.error) {
  console.warn(`React Doctor agent install skipped: ${result.error.message}`);
} else if (result.status !== 0) {
  console.warn(`React Doctor agent install skipped after exit code ${result.status}.`);
}
