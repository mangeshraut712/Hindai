import assert from "node:assert/strict";
import { test } from "node:test";
import { runSanskritTool } from "./run-tool";

test("transliterates Devanagari through the local tool runner", () => {
  const result = runSanskritTool("transliterate", "राम") as { iast?: string; source?: string };
  assert.equal(result.source, "local-index");
  assert.ok(result.iast);
  assert.notEqual(result.iast, "राम");
});

test("rejects empty Sanskrit tool input", () => {
  assert.throws(() => runSanskritTool("sandhi", "   "), /Text is required/);
});
