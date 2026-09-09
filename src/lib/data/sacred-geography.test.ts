import assert from "node:assert/strict";
import { test } from "node:test";
import { ASHTAVINAYAK } from "./ashtavinayak";
import { CHAR_DHAM } from "./char-dham";
import { JYOTIRLINGAS } from "./jyotirlingas";
import { JYOTIRLINGA_COORDS, projectSouthAsia } from "./sacred-geography";
import { getShaktiPeethaBySlug, SHAKTI_PEETHAS } from "./shakti-peethas";
import { MAP_VIEW, SOUTH_ASIA_LAND_PATH } from "./south-asia-basemap";
import { auditMapMarkers, allMapMarkers, trailMarkers } from "./tirtha-map";

test("every map pin audits clean and sits west-to-east as the land does", () => {
  assert.deepEqual(auditMapMarkers(), []);
  assert.equal(
    JYOTIRLINGAS.every((item) => Boolean(JYOTIRLINGA_COORDS[item.slug])),
    true
  );
  const hinglaj = allMapMarkers().find((item) => item.slug === "hinglaj");
  const somnath = allMapMarkers().find((item) => item.slug === "somnath");
  const kamakhya = allMapMarkers().find((item) => item.slug === "kamakhya");
  const kedarnath = allMapMarkers().find((item) => item.slug === "kedarnath");
  const rameswaram = allMapMarkers().find((item) => item.slug === "rameshwaram");
  assert.ok(hinglaj && somnath && kamakhya && kedarnath && rameswaram);
  assert.ok(hinglaj.lng < somnath.lng);
  assert.ok(somnath.lng < kamakhya.lng);
  assert.ok(kedarnath.lat > rameswaram.lat);
  const kedarnathY = projectSouthAsia(kedarnath).y;
  const rameswaramY = projectSouthAsia(rameswaram).y;
  assert.ok(kedarnathY < rameswaramY);
  const somnathX = projectSouthAsia(somnath).x;
  const kamakhyaX = projectSouthAsia(kamakhya).x;
  assert.ok(somnathX < kamakhyaX);
  assert.ok(somnathX > 20 && somnathX < 45);
  assert.ok(kamakhyaX > 90);
});

test("basemap uses Natural Earth window and a real land path", () => {
  assert.equal(MAP_VIEW.width, 120);
  assert.equal(MAP_VIEW.height, 100);
  assert.ok(SOUTH_ASIA_LAND_PATH.includes("M"));
  assert.ok(SOUTH_ASIA_LAND_PATH.length > 1000);
});

test("Devi catalog does not fake Vaishno Devi or Panchkula as secure peethas", () => {
  assert.equal(getShaktiPeethaBySlug("vaishno-devi")?.listStatus, "major-yatra");
  assert.equal(getShaktiPeethaBySlug("mansa-devi-panchkula")?.listStatus, "major-yatra");
  assert.equal(getShaktiPeethaBySlug("kamakhya")?.listStatus, "peetha-common");
  assert.ok(SHAKTI_PEETHAS.length < 51);
  assert.ok(SHAKTI_PEETHAS.some((item) => item.country === "Pakistan"));
  assert.ok(SHAKTI_PEETHAS.some((item) => item.country === "Nepal"));
  assert.equal(getShaktiPeethaBySlug("kamakhya")?.image, "/devi/peethas/kamakhya.webp");
  assert.equal(getShaktiPeethaBySlug("kalighat")?.image, "/devi/peethas/kalighat.webp");
  assert.equal(getShaktiPeethaBySlug("hinglaj")?.image, "/devi/peethas/hinglaj.webp");
  assert.equal(getShaktiPeethaBySlug("vaishno-devi")?.image, "/devi/peethas/vaishno-devi.webp");
  for (const item of SHAKTI_PEETHAS) {
    assert.ok(item.puranaStory.length > 40, item.slug);
    assert.ok(item.history.length > 40, item.slug);
    assert.ok(item.today.length > 40, item.slug);
    assert.doesNotMatch(
      `${item.story} ${item.puranaStory} ${item.significance}`,
      /grants liberation|infinite merit|guarantees moksha/i
    );
  }
});

test("Char Dham is four corners and Ashtavinayak is eight in order", () => {
  assert.equal(CHAR_DHAM.length, 4);
  assert.deepEqual(
    CHAR_DHAM.map((item) => item.slug),
    ["badrinath", "puri", "dwarka", "rameswaram"]
  );
  assert.equal(ASHTAVINAYAK.length, 8);
  assert.deepEqual(
    [...ASHTAVINAYAK]
      .sort((left, right) => left.circuitOrder - right.circuitOrder)
      .map((item) => item.circuitOrder),
    [1, 2, 3, 4, 5, 6, 7, 8]
  );
  assert.equal(trailMarkers("ashtavinayak")[0]?.slug, "morgaon");
  assert.equal(trailMarkers("char-dham").length, 4);
});
