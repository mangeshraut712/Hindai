import assert from "node:assert/strict";
import { test } from "node:test";
import { VibhaktiAnalyzer } from "./analyzer";

test("instrumental rāmeṇa is tritiyā, not a confident vocative", () => {
  const result = VibhaktiAnalyzer.analyze("rāmeṇa");
  assert.equal(result.vibhakti, "Tritiya");
  assert.equal(result.karaka, "Karanam");
  assert.equal(result.confidence, 0.9);
});

test("vocative rāma stays sambodhana", () => {
  assert.equal(VibhaktiAnalyzer.analyze("rāma").vibhakti, "Sambodhana");
});
