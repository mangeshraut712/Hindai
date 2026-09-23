import assert from "node:assert/strict";
import { test } from "node:test";
import { retrieveSitePages } from "./site-knowledge";

test("open requests land on the matching library page", () => {
  const chalisa = retrieveSitePages("open chanuman chalisa");
  assert.equal(chalisa.shouldOpen, true);
  assert.equal(chalisa.best?.href, "/recite/hanuman-chalisa");

  const purana = retrieveSitePages("shivpuran");
  assert.equal(purana.shouldOpen, true);
  assert.equal(purana.best?.href, "/shiva-purana");

  const katha = retrieveSitePages("open katha");
  assert.equal(katha.shouldOpen, true);
  assert.equal(katha.best?.href, "/katha");
});

test("a study question stays on the chat and still names the page", () => {
  const asked = retrieveSitePages("what is the meaning of hanuman chalisa");
  assert.equal(asked.shouldOpen, false);
  assert.equal(asked.onSite, true);
  assert.equal(asked.best?.href, "/recite/hanuman-chalisa");
});

test("an unknown topic is marked outside the library", () => {
  const outside = retrieveSitePages("explain the recipe for sourdough bread");
  assert.equal(outside.onSite, false);
  assert.equal(outside.shouldOpen, false);
});
