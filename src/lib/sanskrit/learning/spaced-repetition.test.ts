import assert from "node:assert/strict";
import { test } from "node:test";
import { SpacedRepetitionSystem } from "./spaced-repetition";
import type { LearningProgress } from "./types";

test("due cards survive a JSON round trip of nextReview", () => {
  const progress = SpacedRepetitionSystem.initializeProgress("student", "vocab-1");
  const overdue = JSON.parse(JSON.stringify(progress)) as LearningProgress;
  overdue.nextReview = "2020-01-01T00:00:00.000Z" as unknown as Date;
  assert.deepEqual(SpacedRepetitionSystem.getDueCards([overdue], "student"), ["vocab-1"]);

  const later = {
    ...overdue,
    nextReview: "2999-01-01T00:00:00.000Z" as unknown as Date,
  };
  assert.deepEqual(SpacedRepetitionSystem.getDueCards([later], "student"), []);
});
