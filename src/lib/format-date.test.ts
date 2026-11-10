import assert from "node:assert/strict";
import { test } from "node:test";
import { formatDate, formatDateTime } from "./format-date.ts";

test("formatDate renders a valid date in en-IN", () => {
  // Local midnight so the calendar day does not depend on the runner's zone.
  assert.equal(formatDate(new Date(2026, 10, 10)), "10 November 2026");
});

test("formatDate returns an empty string for invalid values", () => {
  assert.equal(formatDate(new Date(Number.NaN)), "");
  assert.equal(formatDate("not a date"), "");
  assert.equal(formatDate(""), "");
});

test("formatDateTime returns an empty string for invalid values", () => {
  assert.equal(formatDateTime(new Date(Number.NaN)), "");
  assert.equal(formatDateTime("not a date"), "");
});

test("formatDateTime includes the calendar day for a valid local time", () => {
  const rendered = formatDateTime(new Date(2026, 10, 10, 15, 30));
  assert.match(rendered, /10/);
  assert.match(rendered, /Nov/i);
});
