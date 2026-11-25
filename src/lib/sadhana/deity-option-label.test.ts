import assert from "node:assert/strict";
import { test } from "node:test";
import { deityOptionLabel, sanskritDeityToken } from "./deity-option-label";

test("sanskrit option token keeps the deity name, not a trailing honorific", () => {
  assert.equal(sanskritDeityToken("भगवान शिव"), "शिव");
  assert.equal(sanskritDeityToken("माँ दुर्गा"), "दुर्गा");
  assert.equal(sanskritDeityToken("हनुमान जी"), "हनुमान");
  assert.equal(sanskritDeityToken("सूर्य देव"), "सूर्य");
  assert.equal(deityOptionLabel("Lord Hanuman", "हनुमान जी"), "Lord Hanuman (हनुमान)");
  assert.equal(deityOptionLabel("Sun God (Surya)", "सूर्य देव"), "Sun God (Surya) (सूर्य)");
});
