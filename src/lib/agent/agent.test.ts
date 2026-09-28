import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { inspectAgentPackage } from "./package";
import { parseToolCall } from "./parse-tool-call";
import { createZeroLimitWorkspace, isZeroLimitFixed, ZERO_LIMIT_ISSUE } from "./fixtures";
import { runDeveloperAgent } from "./loop";
import { COMPETITION_MODEL, HARNESS_TOOLS } from "./types";

test("Kaggle agent.yaml pins the hosted Gemma 4 variant and harness tools", () => {
  const pack = inspectAgentPackage();
  assert.deepEqual(pack.missing, []);
  assert.equal(pack.hasAgentYaml, true);
  assert.equal(pack.usesCompetitionModel, true);
  assert.ok(pack.yaml.includes("instruction: !include prompts/system.md"));
  for (const tool of HARNESS_TOOLS) {
    assert.ok(pack.declaresHarnessTools.includes(tool), `missing tool ${tool}`);
  }
  assert.equal(COMPETITION_MODEL, "gemma-4-31b-it-qat-w4a16-ct");
});

test("tool-call parser accepts the XML JSON protocol", () => {
  const call = parseToolCall(
    'Thought: inspect\n<tool_call>{"name":"read_file","arguments":{"filepath":"query/limits.py","start_line":1}}</tool_call>'
  );
  assert.ok(call);
  assert.equal(call?.name, "read_file");
  assert.equal(call?.arguments.filepath, "query/limits.py");
});

test("mock developer agent repairs the zero-limit fixture through harness tools", async () => {
  const workspace = createZeroLimitWorkspace();
  const result = await runDeveloperAgent({
    issue: ZERO_LIMIT_ISSUE,
    workspace,
  });
  assert.equal(result.backend, "mock");
  assert.equal(result.submitted, true);
  assert.equal(result.stoppedReason, "submit_patch");
  assert.ok(isZeroLimitFixed(workspace));
  assert.match(result.patch, /return default if value is None else value/);
  assert.ok(result.steps.some((step) => step.call?.name === "search_similar_code"));
  assert.ok(result.steps.some((step) => step.call?.name === "edit_file"));
  assert.ok(result.steps.at(-1)?.call?.name === "submit_patch");
});

test("build_submission.py writes agent.yaml at the zip root", () => {
  const script = join(process.cwd(), "kaggle/gemma4-developer-agent/build_submission.py");
  const out = join(process.cwd(), "kaggle/dist/submission.zip");
  const packed = spawnSync("python3", [script, "--out", out], { encoding: "utf8" });
  assert.equal(packed.status, 0, packed.stderr || packed.stdout);
  assert.equal(existsSync(out), true);
  const listing = spawnSync(
    "python3",
    [
      "-c",
      "import zipfile,sys; z=zipfile.ZipFile(sys.argv[1]); print('\\n'.join(z.namelist()))",
      out,
    ],
    { encoding: "utf8" }
  );
  assert.equal(listing.status, 0, listing.stderr);
  assert.match(listing.stdout, /^agent\.yaml$/m);
  assert.match(listing.stdout, /skills\/repo_navigation\/SKILL\.md/);
  assert.doesNotMatch(listing.stdout, /build_submission\.py/);
  assert.doesNotMatch(listing.stdout, /^README\.md$/m);
});
