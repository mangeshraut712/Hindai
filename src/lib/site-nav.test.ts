import assert from "node:assert/strict";
import { test } from "node:test";
import { EXPLORE_DESTINATIONS, SITE_NAV_GROUPS, allSiteNavHrefs } from "./site-nav";

test("site nav groups cover Places, Practice, Ask AI, Learn, More without duplicates", () => {
  assert.deepEqual(
    SITE_NAV_GROUPS.map((group) => group.id),
    ["places", "practice", "ask-ai", "learn", "more"]
  );
  const hrefs = SITE_NAV_GROUPS.flatMap((group) => group.items.map((item) => item.href));
  assert.equal(new Set(hrefs).size, hrefs.length);
  assert.ok(hrefs.includes("/pilgrimage"));
  assert.ok(hrefs.includes("/mahadev"));
  assert.ok(hrefs.includes("/devi"));
  assert.ok(hrefs.includes("/vishnu"));
  assert.ok(hrefs.includes("/ganesha"));
  assert.ok(hrefs.includes("/shivlilamrit"));
  assert.ok(hrefs.includes("/harivijay"));
  assert.ok(hrefs.includes("/haripaat"));
  assert.ok(hrefs.includes("/ramvijay"));
  assert.ok(hrefs.includes("/festivals"));
  assert.ok(hrefs.includes("/katha"));
  assert.equal(EXPLORE_DESTINATIONS.length, 8);
  assert.ok(allSiteNavHrefs().includes("/contents"));
  assert.ok(EXPLORE_DESTINATIONS.some((item) => item.href === "/festivals"));
  assert.ok(EXPLORE_DESTINATIONS.some((item) => item.href === "/katha"));
});
