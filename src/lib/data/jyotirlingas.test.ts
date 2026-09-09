import assert from "node:assert/strict";
import { test } from "node:test";
import {
  DWADASHA_JYOTIRLINGA_LINES,
  JYOTIRLINGAS,
  getJyotirlingaBySlug,
  listJyotirlingaSlugs,
} from "./jyotirlingas";
import { CANONICAL_COUNTS } from "./canonical-counts";

test("twelve Jyotirlingas with slugs, disputes named, no silent claims", () => {
  assert.equal(JYOTIRLINGAS.length, CANONICAL_COUNTS.jyotirlingas);
  assert.equal(listJyotirlingaSlugs().length, 12);
  assert.equal(new Set(listJyotirlingaSlugs()).size, 12);
  assert.ok(getJyotirlingaBySlug("somnath"));
  assert.ok(
    getJyotirlingaBySlug("vaidyanath")?.otherClaims.some((claim) => /Parli/i.test(claim.place))
  );
  assert.ok(
    getJyotirlingaBySlug("nageshwar")?.otherClaims.some((claim) => /Aundha/i.test(claim.name))
  );
  assert.match(getJyotirlingaBySlug("kedarnath")?.history ?? "", /2013/);
  assert.match(getJyotirlingaBySlug("vishwanath")?.history ?? "", /2021/);
  assert.equal(DWADASHA_JYOTIRLINGA_LINES.length, 6);
});
