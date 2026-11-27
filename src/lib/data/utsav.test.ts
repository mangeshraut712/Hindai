import assert from "node:assert/strict";
import { test } from "node:test";
import { UTSAVS, getUtsavBySlug, upcomingUtsavs, utsavSlugs, utsavsByMonth } from "./utsav";

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
  assert.equal(getUtsavBySlug("buddha-purnima")?.image, "/festivals/buddha-purnima.webp");
  assert.equal(getUtsavBySlug("govardhan-puja")?.image, "/festivals/govardhan-puja.webp");
  assert.ok(getUtsavBySlug("ganesh-chaturthi")?.image?.includes("/festivals/"));
  assert.equal(getUtsavBySlug("maha-shivaratri")?.image, "/festivals/maha-shivaratri.webp");
  assert.equal(getUtsavBySlug("janmashtami")?.image, "/festivals/janmashtami.webp");
  assert.ok(
    utsavsByMonth()
      .get("October")
      ?.some((item) => item.slug === "sharad-navaratri")
  );
  assert.ok(
    utsavsByMonth()
      .get("March")
      ?.some((item) => item.slug === "ugadi-gudi-padwa")
  );
});

test("upcoming utsavs respect a civil from-date", () => {
  const list = upcomingUtsavs(new Date("2026-09-01T00:00:00"), 3);
  assert.equal(list[0]?.slug, "janmashtami");
  assert.ok(list.every((item) => item.dateISO >= "2026-09-01"));
});

test("each utsav's next civil date falls in the following year", () => {
  for (const item of UTSAVS) {
    assert.ok(item.nextDateISO, item.slug);
    assert.match(item.nextDateISO, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(
      Number(item.nextDateISO.slice(0, 4)),
      Number(item.dateISO.slice(0, 4)) + 1,
      item.slug
    );
  }
  assert.equal(getUtsavBySlug("diwali")?.nextDateISO, "2027-10-29");
  assert.equal(getUtsavBySlug("chhath-puja")?.nextDateISO, "2027-11-04");
});

test("upcoming utsavs continue past the last 2026 catalog date", () => {
  const list = upcomingUtsavs(new Date("2026-11-25T00:00:00"), 4);
  assert.equal(list.length, 4);
  assert.ok(list.every((item) => item.dateISO >= "2026-11-25"));
  assert.ok(
    !list.some((item) => item.slug === "ganesh-chaturthi" && item.dateISO.startsWith("2026"))
  );
  assert.equal(list[0]?.slug, "makar-sankranti");
  assert.equal(list[0]?.dateISO, "2027-01-15");
});

test("a rolled-forward utsav does not keep this year's date in its summary", () => {
  const list = upcomingUtsavs(new Date("2026-11-25T00:00:00"), 40);
  const rolled = list.filter((item) => item.dateISO.startsWith("2027") && item.nextSummary);
  assert.ok(rolled.length > 0);
  for (const item of rolled) {
    assert.doesNotMatch(item.summary, /2026/, item.slug);
  }
});
