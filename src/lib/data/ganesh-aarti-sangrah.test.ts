import assert from "node:assert/strict";
import { test } from "node:test";
import {
  GANESH_AARTI_SANGRAH,
  aartiKindLabel,
  getGaneshAarti,
  listGaneshAartiSlugs,
} from "./ganesh-aarti-sangrah";

const BOOKLET_REQUIRED = [
  "sukhakarta-dukhaharta",
  "durge-durghat-bhari",
  "lavthavti-vikrala",
  "yuge-atthavis",
  "datta-aarti",
  "ghalin-lotangan",
  "dagdusheth-ganpati-aarti",
  "shej-aarti",
  "ganapati-atharvashirsha",
  "gajars",
  "mantra-pushpanjali",
  "nabh-bhairava-stotra",
  "sankatnashana-stotra",
  "ganesh-namavali",
  "temple-schedule",
];

test("booklet aartis are all present as site pages", () => {
  for (const slug of BOOKLET_REQUIRED) {
    const item = getGaneshAarti(slug);
    assert.ok(item, `missing ${slug}`);
    assert.equal(item.inBooklet, true);
    assert.ok(item.verses.length > 0);
    assert.ok(item.iconography.length > 0);
  }
  assert.equal(listGaneshAartiSlugs().length, BOOKLET_REQUIRED.length);
});

test("only Sukhakarta was already on the site", () => {
  const previouslyOnSite = GANESH_AARTI_SANGRAH.filter((item) => item.onSiteBefore);
  assert.deepEqual(
    previouslyOnSite.map((item) => item.slug),
    ["sukhakarta-dukhaharta"]
  );
});

test("aarti kind labels are exhaustive", () => {
  assert.equal(aartiKindLabel("aarti"), "Aarti");
  assert.equal(aartiKindLabel("schedule"), "Temple hours");
});
