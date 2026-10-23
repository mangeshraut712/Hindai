import assert from "node:assert/strict";
import { test } from "node:test";
import { ScriptConverter } from "./converter";

test("IAST dharma becomes Devanagari धर्म, not a letter-by-letter scramble", () => {
  assert.equal(ScriptConverter.convert("dharma", "IAST", "Devanagari").converted, "धर्म");
  assert.equal(ScriptConverter.convert("kha", "IAST", "Devanagari").converted, "ख");
  assert.equal(ScriptConverter.convert("ai", "IAST", "Devanagari").converted, "ऐ");
});

test("Devanagari round-trips through IAST with virama", () => {
  assert.equal(ScriptConverter.convert("धर्म", "Devanagari", "IAST").converted, "dharma");
  assert.equal(ScriptConverter.convert("राम", "Devanagari", "IAST").converted, "rāma");
});

test("the same akshara rules reach Bengali", () => {
  assert.equal(ScriptConverter.convert("dharma", "IAST", "Bengali").converted, "ধর্ম");
});
