import assert from "node:assert/strict";
import { test } from "node:test";
import { KATHA_GRANTHAS, getKathaBySlug, kathaSlugs } from "./katha-grantha";

test("katha granthas have unique slugs and chapter depth", () => {
  const slugs = kathaSlugs();
  assert.equal(slugs.length, 4);
  assert.equal(new Set(slugs).size, 4);
  for (const grantha of KATHA_GRANTHAS) {
    assert.ok(grantha.chapters.length >= 3);
    for (const chapter of grantha.chapters) {
      assert.ok(chapter.body.length >= 2);
      assert.ok(chapter.body.every((para) => para.length > 40));
      assert.ok(chapter.sources.length >= 1);
      assert.ok(chapter.readingMinutes >= 4);
    }
  }
  assert.ok(getKathaBySlug("mahadev")?.chapters.some((c) => c.id === "linga-of-light"));
  assert.ok(getKathaBySlug("devi")?.relatedHref === "/devi");
});
