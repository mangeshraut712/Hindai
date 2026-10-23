import assert from "node:assert/strict";
import { test } from "node:test";
import { SandhiAnalyzer } from "./analyzer";

test("a + i at the boundary becomes e once", () => {
  const result = SandhiAnalyzer.analyze("rāmaiṣṭa");
  assert.deepEqual(result.split, ["rāma", "iṣṭa"]);
  assert.equal(result.reconstructed, "rāmeṣṭa");
  assert.equal(result.rules[0]?.from, "a+i");
  assert.equal(result.rules[0]?.to, "e");
  assert.equal(result.rules.length, 1);
});
