import assert from "node:assert/strict";
import { test } from "node:test";
import { getLocalStreak } from "./local-progress";

test("computes a consecutive local study streak", () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const dates = [yesterday.toISOString().slice(0, 10), today.toISOString().slice(0, 10)];
  assert.equal(getLocalStreak(dates), 2);
});

test("resets the streak when the newest review is older than yesterday", () => {
  assert.equal(getLocalStreak(["2020-01-01"]), 0);
  assert.equal(getLocalStreak([]), 0);
});
