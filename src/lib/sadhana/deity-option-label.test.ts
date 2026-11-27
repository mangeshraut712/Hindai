import assert from "node:assert/strict";
import { test } from "node:test";
import { deityOptionLabel, sanskritDeityToken } from "./deity-option-label";

test("sanskrit option token keeps the deity name, not a trailing honorific", () => {
  assert.equal(sanskritDeityToken("भगवान शिव"), "शिव");
  assert.equal(sanskritDeityToken("माँ दुर्गा"), "दुर्गा");
  assert.equal(sanskritDeityToken("हनुमान जी"), "हनुमान");
  assert.equal(sanskritDeityToken("सूर्य देव"), "सूर्य");
  assert.equal(sanskritDeityToken("श्री हनुमान जी"), "हनुमान");
  assert.equal(sanskritDeityToken("माँ दुर्गा जी"), "दुर्गा");
  assert.equal(deityOptionLabel("Lord Hanuman", "हनुमान जी"), "Lord Hanuman (हनुमान)");
  assert.equal(deityOptionLabel("Lord Hanuman", "श्री हनुमान जी"), "Lord Hanuman (हनुमान)");
  assert.equal(deityOptionLabel("Sun God (Surya)", "सूर्य देव"), "Sun God (Surya) (सूर्य)");
});

test("sanskrit option token handles single-word, leading-only and empty names", () => {
  assert.equal(sanskritDeityToken("शिव"), "शिव");
  assert.equal(sanskritDeityToken("गणेश"), "गणेश");
  assert.equal(sanskritDeityToken("श्री गणेश"), "गणेश");
  assert.equal(sanskritDeityToken("श्री राम"), "राम");
  assert.equal(sanskritDeityToken("जी"), "जी");
  assert.equal(sanskritDeityToken(""), "");
  assert.equal(sanskritDeityToken("   "), "");
});
