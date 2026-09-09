import assert from "node:assert/strict";
import { test } from "node:test";
import {
  DEVI_DEEP,
  GANESHA_DEEP,
  MAHADEV_DEEP,
  VISHNU_DEEP,
  primersByKind,
} from "./tradition-deep";

test("tradition deep primers cover katha, practice, and etiquette", () => {
  for (const list of [MAHADEV_DEEP, DEVI_DEEP, VISHNU_DEEP, GANESHA_DEEP]) {
    assert.ok(list.length >= 5);
    assert.ok(primersByKind(list, "katha").length >= 1);
    assert.ok(primersByKind(list, "etiquette").length >= 1);
    for (const item of list) {
      assert.ok(item.body.length > 60);
    }
  }
});
