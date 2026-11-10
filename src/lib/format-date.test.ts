import assert from "node:assert/strict";
import { test } from "node:test";
import { formatDate } from "./format-date.ts";

test("formatDate renders a valid date in en-IN", () => {
  // Local midnight so the calendar day does not depend on the runner's zone.
  assert.equal(formatDate(new Date(2026, 10, 10)), "10 November 2026");
});

test("formatDate returns an empty string for invalid values", () => {
  assert.equal(formatDate(new Date(Number.NaN)), "");
  assert.equal(formatDate("not a date"), "");
  assert.equal(formatDate(""), "");
});
