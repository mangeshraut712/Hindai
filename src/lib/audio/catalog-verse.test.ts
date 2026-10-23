import assert from "node:assert/strict";
import { test } from "node:test";
import { catalogVerseText } from "./catalog-verse";

test("the audio reader uses the catalog verse for the selected address", () => {
  const gita = catalogVerseText("bhagavad-gita", 2, 47);
  assert.match(gita ?? "", /कर्मण्येवाधिकारस्ते/);
  assert.equal((gita ?? "").includes("धृतराष्ट्र"), false);
  assert.equal(catalogVerseText("yajurveda", 1, 1), null);
});
