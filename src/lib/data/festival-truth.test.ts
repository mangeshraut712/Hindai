import assert from "node:assert/strict";
import { test } from "node:test";
import { FESTIVALS, getFestivalById } from "../panchanga/festivals";
import { UTSAVS, deepFestivalHref, getUtsavBySlug } from "./utsav";

test("panchanga festivals derive dates from utsav without miracle claims", () => {
  for (const utsav of UTSAVS) {
    assert.equal(deepFestivalHref(utsav.slug), `/festivals/${utsav.slug}`);
  }
  assert.equal(deepFestivalHref("ram-navami"), "/festivals/rama-navami");
  assert.equal(deepFestivalHref("navratri"), "/festivals/sharad-navaratri");
  assert.equal(deepFestivalHref("dussehra"), "/festivals/vijayadashami");
  assert.equal(deepFestivalHref("govardhan-puja"), "/festivals/govardhan-puja");
  assert.equal(deepFestivalHref("buddha-purnima"), "/festivals/buddha-purnima");

  const hanuman = getFestivalById("hanuman-jayanti");
  assert.ok(hanuman);
  assert.equal(hanuman.date.toISOString().slice(0, 10), "2026-04-02");
  assert.equal(getUtsavBySlug("hanuman-jayanti")?.dateISO, "2026-04-02");

  const govardhan = getFestivalById("govardhan-puja");
  assert.ok(govardhan);
  assert.equal(govardhan.date.toISOString().slice(0, 10), "2026-11-10");
  assert.equal(getUtsavBySlug("govardhan-puja")?.dateISO, "2026-11-10");
  assert.equal(getUtsavBySlug("buddha-purnima")?.dateISO, "2026-05-01");
  assert.equal(getUtsavBySlug("buddha-purnima")?.tradition, "buddhist");

  const joined = FESTIVALS.map((item) => item.significance + item.description).join(" ");
  assert.doesNotMatch(joined, /grants liberation|infinite merit|most auspicious day/i);

  const ids = FESTIVALS.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length);

  // Every utsav-backed panchanga row shares the civil date
  for (const utsav of UTSAVS) {
    const id =
      utsav.slug === "rama-navami"
        ? "ram-navami"
        : utsav.slug === "sharad-navaratri"
          ? "navratri"
          : utsav.slug === "vijayadashami"
            ? "dussehra"
            : utsav.slug;
    const thin = getFestivalById(id);
    assert.ok(thin, utsav.slug);
    assert.equal(thin.date.toISOString().slice(0, 10), utsav.dateISO, utsav.slug);
  }
});
