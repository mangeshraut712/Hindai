import assert from "node:assert/strict";
import { test } from "node:test";
import {
  CHAPTER_IDS,
  SHIVLILAMRIT_CHAPTERS,
  getChapter,
  isChapterId,
  listChapterIds,
  readerLocaleLabel,
  readerThemeLabel,
} from "./catalog";
import { kathaParagraphs } from "./locales";
import { loadChapterOvis } from "./load-ovis";
import { firstPageForSlug, folioCount, getFolio, toDevanagariNumeral } from "./book";
import { listPothi } from "./pothi";

test("fifteen adhyays including special Rudra chapter 11", () => {
  assert.deepEqual(listChapterIds(), [...CHAPTER_IDS]);
  assert.equal(SHIVLILAMRIT_CHAPTERS.length, 15);
  assert.equal(getChapter(11).special, true);
  assert.match(getChapter(3).titleMr, /प्रियव्रत/);
  assert.match(getChapter(11).titleMr, /रुद्राक्ष/);
  assert.equal(SHIVLILAMRIT_CHAPTERS.filter((chapter) => chapter.special).length, 1);
  assert.equal(isChapterId(0), false);
  assert.equal(isChapterId(16), false);
});

test("public-domain ovis cover the whole pothi", async () => {
  const counts: number[] = [];
  for (const id of CHAPTER_IDS) {
    const ovis = await loadChapterOvis(id);
    counts.push(ovis.length);
    assert.ok(ovis.length >= 100, `adhyay ${id} too short`);
    assert.match(ovis[0], /॥/);
  }
  const total = counts.reduce((sum, n) => sum + n, 0);
  assert.equal(total, 2780);
  assert.equal(counts[10], 182);
});

test("pothi map covers front matter, 15 adhyays, and closing stotras", () => {
  const slugs = listPothi().map((entry) => entry.slug);
  assert.ok(slugs.includes("nityapath"));
  assert.ok(slugs.includes("phalashruti"));
  for (const id of CHAPTER_IDS) {
    assert.ok(slugs.includes(String(id)));
  }
  assert.ok(slugs.includes("nitya-ovis"));
  assert.ok(slugs.includes("raksha"));
  assert.ok(slugs.length >= 24);
});

test("reader themes are exhaustive", () => {
  assert.equal(readerThemeLabel("mandir"), "Mandir");
  assert.equal(readerThemeLabel("paper"), "Paper");
  assert.equal(readerThemeLabel("sepia"), "Sepia");
  assert.equal(readerThemeLabel("night"), "Night");
});

test("sequential pothi has contents as a numbered leaf", () => {
  assert.equal(getFolio(1)?.kind, "cover");
  assert.equal(getFolio(2)?.kind, "contents");
  assert.equal(toDevanagariNumeral(11), "११");
  assert.ok(folioCount() > 700);
  const eleven = firstPageForSlug("11");
  assert.equal(getFolio(eleven)?.kind, "katha");
  assert.equal(getFolio(eleven)?.chapterId, 11);
  assert.equal(getFolio(eleven + 1)?.kind, "ovis");
});

test("pan-India katha locales", () => {
  assert.equal(readerLocaleLabel("hi"), "हिन्दी");
  const hindi = kathaParagraphs(getChapter(11).katha, "hi", 11);
  assert.match(hindi[0], /रुद्र/);
  const roman = kathaParagraphs(getChapter(1).katha, "roman", 1);
  assert.match(roman[0], /śrīdhara/i);
});
