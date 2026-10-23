import assert from "node:assert/strict";
import { test } from "node:test";
import { parseStoredAiResponse } from "./gemma";

const stored = {
  explanation: "Dharma is a way of life grounded in scripture.",
  summary: "Dharma is a way of life.",
};

test("Upstash auto-parsed cache objects are returned instead of throwing", () => {
  const parsed = parseStoredAiResponse(stored);
  assert.equal(parsed?.explanation, stored.explanation);
});

test("a JSON string cache value still parses", () => {
  const parsed = parseStoredAiResponse(JSON.stringify(stored));
  assert.equal(parsed?.summary, stored.summary);
});

test("an object stringified by a mistaken JSON.parse does not crash", () => {
  assert.equal(parseStoredAiResponse("[object Object]"), null);
});
