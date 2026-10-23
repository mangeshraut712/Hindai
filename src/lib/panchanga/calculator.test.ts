import assert from "node:assert/strict";
import { test } from "node:test";
import { karanaNameForHalf, PanchangaCalculator } from "./calculator";

test("yoga stays inside 1..27 before the unix epoch", () => {
  const date = new Date("1969-01-01T12:00:00Z");
  const yoga = PanchangaCalculator.getDate(date).yoga.number;
  const days = date.getTime() / (1000 * 60 * 60 * 24);
  const broken = Math.floor((days % 27) + 1);
  assert.ok(broken < 1);
  assert.ok(yoga >= 1 && yoga <= 27);
  assert.notEqual(yoga, broken);
});

test("shukla and krishna pratipada do not share a moonrise", () => {
  const shukla = PanchangaCalculator.getDate(new Date("2024-01-11T12:00:00Z"));
  const krishna = PanchangaCalculator.getDate(new Date("2024-01-26T12:00:00Z"));
  assert.equal(shukla.tithi.paksha, "Shukla");
  assert.equal(krishna.tithi.paksha, "Krishna");
  assert.equal(shukla.tithi.number, krishna.tithi.number);
  assert.notEqual(shukla.moonrise, krishna.moonrise);
});

test("the fixed karanas at the ends of the lunar month are distinct", () => {
  assert.equal(karanaNameForHalf(1, false), "Kinstughna");
  assert.equal(karanaNameForHalf(30, false), "Chatushpada");
  assert.equal(karanaNameForHalf(30, true), "Naga");
  assert.equal(PanchangaCalculator.getDate(new Date("2024-02-08T18:00:00Z")).karana.name, "Naga");
});
