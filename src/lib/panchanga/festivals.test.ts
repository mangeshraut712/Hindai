import assert from "node:assert/strict";
import { test } from "node:test";
import { getUpcomingFestivals } from "./festivals";

test("upcoming festivals continue past the last date of the catalog year", () => {
  const list = getUpcomingFestivals(4, new Date("2026-11-25T00:00:00"));
  assert.equal(list.length, 4);
  assert.ok(list.every((festival) => festival.date >= new Date("2026-11-25T00:00:00")));
});

test("upcoming festivals list each festival once", () => {
  const list = getUpcomingFestivals(40, new Date("2026-01-01T00:00:00"));
  const ids = list.map((festival) => festival.id);
  assert.equal(new Set(ids).size, ids.length);
});
