import assert from "node:assert/strict";
import { test } from "node:test";
import { upcomingUtsavs } from "@/lib/data/utsav";
import { visibleUpcoming } from "./upcoming";

// The festivals page is force-static and exported with `output: "export"`, so the
// server render evaluates new Date() at BUILD time. The list baked into the HTML
// is therefore correct only on the day of the build.

test("the build-time list goes stale once its first festival has passed", () => {
  // Documents the defect the client-side swap exists to fix.
  const built = upcomingUtsavs(new Date("2026-10-01T00:00:00"), 4);
  const first = built[0];
  assert.ok(first);

  const visitorDate = new Date(`${first.dateISO}T12:00:00`);
  visitorDate.setDate(visitorDate.getDate() + 1); // the day after it was celebrated
  const trulyUpcoming = upcomingUtsavs(visitorDate, 4);

  assert.notDeepEqual(
    built.map((i) => i.slug),
    trulyUpcoming.map((i) => i.slug),
    "a list computed at build time must differ from one computed for a later visitor"
  );
});

test("visibleUpcoming shows the visitor's list once the visitor date is known", () => {
  const built = upcomingUtsavs(new Date("2026-10-01T00:00:00"), 4);
  const later = new Date("2026-12-01T00:00:00");

  const shown = visibleUpcoming({ built, visitorNow: later, count: 4 });

  assert.deepEqual(
    shown.map((i) => i.slug),
    upcomingUtsavs(later, 4).map((i) => i.slug)
  );
  for (const item of shown) {
    assert.ok(
      item.dateISO >= "2026-12-01",
      `${item.slug} is not upcoming for ${later.toISOString()}`
    );
  }
});

test("visibleUpcoming keeps the build-time list before the client knows the date", () => {
  // First client render must match the server HTML exactly, or React hydrates a mismatch.
  const built = upcomingUtsavs(new Date("2026-10-01T00:00:00"), 4);

  const shown = visibleUpcoming({ built, visitorNow: null, count: 4 });

  assert.equal(shown, built, "must return the same reference so no re-render is triggered");
});

test("visibleUpcoming falls back to the build list when the visitor clock is unusable", () => {
  const built = upcomingUtsavs(new Date("2026-10-01T00:00:00"), 4);

  assert.equal(visibleUpcoming({ built, visitorNow: new Date("not a date"), count: 4 }), built);
});
