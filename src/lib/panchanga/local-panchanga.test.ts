import assert from "node:assert/strict";
import { test } from "node:test";
import { getLocalPanchanga, getLocalUpcomingFestivals } from "./local-panchanga";

test("calculates panchanga for a fixed date", () => {
  const panchanga = getLocalPanchanga(new Date("2026-09-08T00:00:00"));
  assert.ok(panchanga.vara.length > 0);
  assert.ok(panchanga.tithi.name.length > 0);
});

test("returns upcoming festivals from the local calendar", () => {
  const festivals = getLocalUpcomingFestivals(3);
  assert.ok(festivals.length <= 3);
  assert.ok(festivals.every((festival) => festival.name && festival.sanskrit));
});
