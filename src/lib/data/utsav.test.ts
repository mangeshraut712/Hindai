import assert from "node:assert/strict";
import { test } from "node:test";
import {
  UTSAVS,
  getUtsavBySlug,
  upcomingUtsavs,
  utsavSlugs,
  utsavsByMonth,
} from "./utsav";

test("utsav catalog has unique slugs, ISO dates, and deep fields", () => {
  const slugs = utsavSlugs();
  assert.equal(new Set(slugs).size, slugs.length);
  assert.ok(slugs.length >= 20);
  for (const item of UTSAVS) {
    assert.match(item.dateISO, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(item.image?.startsWith("/festivals/"), item.slug);
    assert.ok(item.katha.length > 80);
    assert.ok(item.livingPractice.length > 40);
    assert.ok(item.inTheTemple.length > 40);
    assert.ok(item.doList.length >= 2);
    assert.ok(item.dontList.length >= 2);
    assert.ok(item.funFacts.length >= 1);
    assert.ok(item.sources.length >= 2);
  }
  assert.equal(getUtsavBySlug("maha-shivaratri")?.dateISO, "2026-02-15");
  assert.equal(getUtsavBySlug("janmashtami")?.dateISO, "2026-09-04");
  assert.equal(getUtsavBySlug("onam")?.dateISO, "2026-08-26");
  assert.equal(getUtsavBySlug("vijayadashami")?.dateISO, "2026-10-20");
  assert.equal(getUtsavBySlug("chhath-puja")?.dateISO, "2026-11-18");
  assert.equal(getUtsavBySlug("diwali")?.dateISO, "2026-11-08");
  assert.equal(getUtsavBySlug("govardhan-puja")?.dateISO, "2026-11-10");
  assert.equal(getUtsavBySlug("buddha-purnima")?.dateISO, "2026-05-01");
  assert.equal(getUtsavBySlug("buddha-purnima")?.tradition, "buddhist");
  assert.equal(getUtsavBySlug("buddha-purnima")?.image, "/festivals/buddha-purnima.png");
  assert.equal(getUtsavBySlug("govardhan-puja")?.image, "/festivals/govardhan-puja.png");
  assert.ok(getUtsavBySlug("ganesh-chaturthi")?.image?.includes("/festivals/"));
  assert.equal(getUtsavBySlug("maha-shivaratri")?.image, "/festivals/maha-shivaratri.png");
  assert.equal(getUtsavBySlug("janmashtami")?.image, "/festivals/janmashtami.png");
  assert.ok(utsavsByMonth().get("October")?.some((item) => item.slug === "sharad-navaratri"));
  assert.ok(utsavsByMonth().get("March")?.some((item) => item.slug === "ugadi-gudi-padwa"));
});

test("upcoming utsavs respect a civil from-date", () => {
  const list = upcomingUtsavs(new Date("2026-09-01T00:00:00"), 3);
  assert.equal(list[0]?.slug, "janmashtami");
  assert.ok(list.every((item) => item.dateISO >= "2026-09-01"));
});
