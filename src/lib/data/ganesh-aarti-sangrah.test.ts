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

test("Atharvashirsha preserves the photographed booklet's fourteen numbered verses", () => {
  const item = getGaneshAarti("ganapati-atharvashirsha")!;
  for (let n = 1; n <= 14; n++) {
    const digits = String(n).replace(/\d/g, (digit) => "०१२३४५६७८९"[Number(digit)]);
    const verse = item.verses.find((entry) => entry.number === n);
    assert.ok(verse, `missing booklet verse ${n}`);
    assert.ok(verse.original.endsWith(`॥${digits}॥`), `booklet verse ${n}`);
    assert.ok(verse.iast && verse.english && verse.meaning);
  }
  assert.equal(
    item.verses.find((entry) => entry.number === 2)?.original,
    "ऋतं वच्मि ॥ सत्यं वच्मि ॥२॥"
  );
  const all = item.verses.map((entry) => entry.original).join("\n");
  assert.ok(all.includes("स्वस्ति न इन्द्रो वृद्धश्रवाः"));
  assert.ok(all.includes("अव पश्चात्तात् । अव पुरस्तात्"));
  assert.ok(all.includes("नमो व्रातपतये"));
  assert.ok(all.includes("त्वं अवस्थात्रयातीतः"));
  assert.ok(all.includes("अनेन गणपतिमभिषिञ्चति"));
  assert.ok(all.includes("इत्युपनिषत्॥१४॥"));
  assert.ok(all.includes("ॐ सह नाववतु"));
  assert.ok(!all.includes("त्वं चतुर्धा वर्णसे"));
});
