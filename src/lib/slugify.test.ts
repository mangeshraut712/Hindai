import assert from "node:assert/strict";
import { test } from "node:test";
import { slugify } from "./slugify";

test("slugify trims leading and trailing hyphens", () => {
  assert.equal(slugify("  Hello World!  "), "hello-world");
  assert.equal(slugify("---Nice---"), "nice");
  assert.equal(slugify("-already-slugged-"), "already-slugged");
});

test("slugify returns an empty string when nothing usable remains", () => {
  assert.equal(slugify("   "), "");
  assert.equal(slugify("!!!"), "");
  assert.equal(slugify("---"), "");
});

test("slugify still collapses inner punctuation and spaces", () => {
  assert.equal(slugify("Shri  Ganesha"), "shri-ganesha");
  assert.equal(slugify("A--B  C"), "a-b-c");
});
