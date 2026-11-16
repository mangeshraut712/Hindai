import assert from "node:assert/strict";
import { test } from "node:test";
import { getLocalStreak, toLocalDateKey } from "./local-progress";

test("computes a consecutive local study streak", () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const dates = [toLocalDateKey(yesterday), toLocalDateKey(today)];
  assert.equal(getLocalStreak(dates), 2);
});

test("resets the streak when the newest review is older than yesterday", () => {
  assert.equal(getLocalStreak(["2020-01-01"]), 0);
  assert.equal(getLocalStreak([]), 0);
});

test("toLocalDateKey uses the local calendar day, not the UTC date", () => {
  // 19:30 UTC is 1:00 AM IST the next calendar day. The key must follow
  // local getFullYear/getMonth/getDate, not toISOString().
  const earlyMorning = new Date("2026-11-10T19:30:00.000Z");
  const expected = [
    earlyMorning.getFullYear(),
    String(earlyMorning.getMonth() + 1).padStart(2, "0"),
    String(earlyMorning.getDate()).padStart(2, "0"),
  ].join("-");
  assert.equal(toLocalDateKey(earlyMorning), expected);
  assert.equal(earlyMorning.toISOString().slice(0, 10), "2026-11-10");
});
