#!/usr/bin/env node

const { readdirSync, readFileSync, writeFileSync, statSync, existsSync } = require("node:fs");
const { join, relative, resolve } = require("node:path");

const ROOT = resolve(__dirname, "..");
const PLAN_PATH = join(ROOT, "e2e", "shards.json");

function allSpecs() {
  const dir = join(ROOT, "e2e");
  return readdirSync(dir)
    .filter((name) => name.endsWith(".spec.ts"))
    .map((name) => `e2e/${name}`)
    .sort();
}

function loadPlan() {
  const plan = JSON.parse(readFileSync(PLAN_PATH, "utf8"));
  if (!Array.isArray(plan.shards) || plan.shards.length === 0) {
    throw new Error("e2e/shards.json has no shards.");
  }
  return plan;
}

function plannedFiles(plan) {
  const map = new Map();
  for (const shard of plan.shards) {
    if (!Number.isInteger(shard.id) || !Array.isArray(shard.files)) {
      throw new Error(`Invalid shard entry: ${JSON.stringify(shard)}`);
    }
    for (const file of shard.files) {
      if (map.has(file)) {
        throw new Error(`Spec ${file} is listed in more than one shard.`);
      }
      map.set(file, shard.id);
    }
  }
  return map;
}

function checkPlan(plan) {
  const specs = allSpecs();
  const map = plannedFiles(plan);
  const planned = [...map.keys()].sort();
  const missing = specs.filter((s) => !map.has(s));
  const extra = planned.filter((s) => !specs.includes(s));
  if (missing.length || extra.length || planned.length !== specs.length) {
    const detail = [
      `expected ${specs.length} specs, plan has ${planned.length}.`,
      missing.length ? `missing from plan: ${missing.join(", ")}` : null,
      extra.length ? `in plan but not on disk: ${extra.join(", ")}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    throw new Error(`Shard plan does not match e2e/*.spec.ts.\n${detail}`);
  }
  return { specs, map };
}

function writeShard(plan, id) {
  const { specs, map } = checkPlan(plan);
  const shard = plan.shards.find((s) => s.id === id);
  if (!shard) {
    throw new Error(`No shard ${id} in e2e/shards.json.`);
  }
  const files = [...shard.files].sort();
  writeFileSync("e2e-shard-files.txt", files.join("\n") + "\n");
  writeFileSync("e2e-shard-specs.txt", files.join("\n") + "\n");
  console.log(`Shard ${id}: ${files.length} of ${specs.length} specs`);
  for (const file of files) {
    console.log(`  ${file}`);
  }
  const covered = files.filter((f) => map.get(f) === id);
  if (covered.length !== files.length) {
    throw new Error("Shard file list does not match the plan map.");
  }
}

function collectSpecLists(dir, acc = []) {
  if (!existsSync(dir)) {
    throw new Error(`Spec list directory not found: ${dir}`);
  }
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) {
      collectSpecLists(path, acc);
      continue;
    }
    if (name === "e2e-shard-specs.txt") {
      const files = readFileSync(path, "utf8")
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);
      acc.push({ path: relative(ROOT, path) || path, files });
    }
  }
  return acc;
}

function verify(plan, dir) {
  const { specs } = checkPlan(plan);
  const lists = collectSpecLists(dir);
  if (lists.length !== plan.shards.length) {
    throw new Error(
      `Expected spec lists for ${plan.shards.length} shards, found ${lists.length} under ${dir}.`,
    );
  }
  const seen = new Map();
  let total = 0;
  for (const list of lists) {
    console.log(`${list.path}: ${list.files.length} specs`);
    for (const file of list.files) {
      console.log(`  ${file}`);
      if (seen.has(file)) {
        throw new Error(`Spec ${file} ran in more than one shard (${seen.get(file)} and ${list.path}).`);
      }
      seen.set(file, list.path);
      total += 1;
    }
  }
  const missing = specs.filter((s) => !seen.has(s));
  const extra = [...seen.keys()].filter((s) => !specs.includes(s));
  if (missing.length || extra.length || total !== specs.length) {
    throw new Error(
      [
        `Spec coverage is ${seen.size} unique / ${total} listed; expected ${specs.length}.`,
        missing.length ? `missing: ${missing.join(", ")}` : null,
        extra.length ? `unexpected: ${extra.join(", ")}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }
  console.log(`Coverage OK: ${total} specs across ${lists.length} shards = ${specs.length} total, no overlap.`);
}

function walkTests(node, acc = []) {
  if (!node || typeof node !== "object") {
    return acc;
  }
  if (Array.isArray(node.suites)) {
    for (const suite of node.suites) {
      walkTests(suite, acc);
    }
  }
  if (Array.isArray(node.specs)) {
    for (const spec of node.specs) {
      for (const test of spec.tests || []) {
        acc.push({
          title: [...(spec.titlePath || []), spec.title].filter(Boolean).join(" > ") || spec.title,
          file: spec.file || node.file,
          ok: test.status === "expected" || test.status === "skipped" || test.ok === true,
          status: test.status || (test.ok ? "expected" : "unexpected"),
          results: test.results || [],
        });
      }
    }
  }
  // merged / json reporter variants
  if (Array.isArray(node.tests) && node.fileName) {
    for (const test of node.tests) {
      const status = test.outcome || test.status;
      acc.push({
        title: test.title,
        file: node.fileName || node.file,
        ok: test.ok !== false && status !== "unexpected",
        status,
        results: test.results || [],
      });
    }
  }
  return acc;
}

function printFailures(reportPath) {
  if (!existsSync(reportPath)) {
    throw new Error(`Merged Playwright report not found: ${reportPath}`);
  }
  const report = JSON.parse(readFileSync(reportPath, "utf8"));
  const tests = walkTests(report);
  const failures = tests.filter((t) => !t.ok && t.status !== "skipped");
  const flaky = tests.filter((t) => t.status === "flaky");
  console.log(`Tests listed in merged report: ${tests.length}`);
  if (failures.length === 0) {
    console.log("No failed tests.");
  } else {
    console.log(`Failed tests (${failures.length}):`);
    for (const t of failures) {
      console.log(`  FAIL  ${t.file || "unknown file"}  ${t.title}  (${t.status})`);
    }
  }
  if (flaky.length) {
    console.log(`Flaky tests that passed on retry (${flaky.length}):`);
    for (const t of flaky) {
      console.log(`  FLAKY ${t.file || "unknown file"}  ${t.title}`);
    }
  }
  if (failures.length) {
    process.exit(1);
  }
}

function usage() {
  console.error(
    "Usage: node scripts/e2e-shard.js --check | --shard <id> | --verify <dir> | --print-failures <json>",
  );
  process.exit(2);
}

try {
  const args = process.argv.slice(2);
  if (args[0] === "--check" && args.length === 1) {
    const { specs, map } = checkPlan(loadPlan());
    console.log(`Shard plan OK: ${specs.length} specs, ${new Set(map.values()).size} shards.`);
  } else if (args[0] === "--shard" && args.length === 2) {
    writeShard(loadPlan(), Number(args[1]));
  } else if (args[0] === "--verify" && args.length === 2) {
    verify(loadPlan(), args[1]);
  } else if (args[0] === "--print-failures" && args.length === 2) {
    printFailures(args[1]);
  } else {
    usage();
  }
} catch (err) {
  console.error(err.message || err);
  process.exit(1);
}
