import assert from "node:assert/strict";
import { test } from "node:test";
import {
  firstPageForSlug,
  nextStoryPage,
  pagesForView,
  prevStoryPage,
  storyFolio,
  storyPages,
} from "./book";

test("story view walks cover, contents, then whole adhyays", () => {
  const stops = storyPages();
  assert.equal(stops[0], 1);
  assert.ok(stops.includes(8));
  assert.ok(stops.includes(firstPageForSlug("1")));
  assert.ok(stops.includes(firstPageForSlug("4")));
  assert.equal(storyFolio(firstPageForSlug("1") + 1).chapterId, 1);
  assert.equal(nextStoryPage(1), 2);
  assert.equal(nextStoryPage(8), firstPageForSlug("1"));
  assert.equal(prevStoryPage(firstPageForSlug("1")), 8);
  assert.ok(nextStoryPage(firstPageForSlug("4")) > firstPageForSlug("4"));
  const adhyayOne = firstPageForSlug("1");
  assert.deepEqual(pagesForView(adhyayOne, "two"), [adhyayOne, adhyayOne + 1]);
});
