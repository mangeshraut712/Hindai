import assert from "node:assert/strict";
import { test } from "node:test";
import { GRANTHALAY_HALLS, granthalayShelfCount } from "./granthalay";

test("granthalay halls keep full books ahead of the name map", () => {
  assert.equal(GRANTHALAY_HALLS[0]?.id, "pothi");
  assert.equal(GRANTHALAY_HALLS.at(-1)?.id, "shruti");
  assert.ok(granthalayShelfCount() >= 20);
  const hrefs = GRANTHALAY_HALLS.flatMap((hall) => hall.shelves.map((shelf) => shelf.href));
  assert.equal(new Set(hrefs).size, hrefs.length);
  for (const href of hrefs) {
    assert.match(href, /^\//);
  }
  const full = GRANTHALAY_HALLS.flatMap((hall) => hall.shelves).filter(
    (shelf) => shelf.depth === "full"
  );
  assert.deepEqual(
    full.map((shelf) => shelf.href),
    ["/shivlilamrit", "/harivijay", "/ramvijay", "/haripaat", "/durga-saptashati"]
  );
});
