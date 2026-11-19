import assert from "node:assert/strict";
import test from "node:test";

import { VedicAccentEngine } from "./vedic-accent";

test("fallback accent analysis keeps a mark for every accented syllable", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    throw new Error("offline");
  }) as typeof fetch;
  const originalWarn = console.warn;
  console.warn = () => {};
  try {
    const result = await VedicAccentEngine.analyzeAccents("अग्निमीळे", "rigveda");
    const marks = [...result.markedText].filter((char) => "´`^".includes(char));
    assert.ok(result.accents.length >= 3);
    assert.equal(marks.length, result.accents.length);
    assert.equal(result.markedText.replace(/[´`^]/g, ""), "अग्निमीळे");
  } finally {
    globalThis.fetch = originalFetch;
    console.warn = originalWarn;
  }
});
