import assert from "node:assert/strict";
import { test } from "node:test";
import { VedicAccentAnalyzer } from "./analyzer";

test("known words keep their syllable and place the udātta on that syllable", () => {
  const varuna = VedicAccentAnalyzer.analyze("varuna");
  assert.equal(varuna.accents[0]?.syllable, "va");
  assert.equal(varuna.accentedWord, "va\u0301runa");
  assert.equal(varuna.accentedWord.startsWith("v\u0301"), false);

  const brahma = VedicAccentAnalyzer.analyze("brahma");
  assert.equal(brahma.accentedWord, "bra\u0301hma");
});
