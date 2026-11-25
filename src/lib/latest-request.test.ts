import assert from "node:assert/strict";
import { test } from "node:test";
import { createLatestRequest } from "./latest-request";

test("a slower earlier request does not replace later results", async () => {
  const latest = createLatestRequest();
  let results = "";
  let loading = false;

  let resolveFirst: (value: string) => void = () => {};
  const first = new Promise<string>((resolve) => {
    resolveFirst = resolve;
  });
  let resolveSecond: (value: string) => void = () => {};
  const second = new Promise<string>((resolve) => {
    resolveSecond = resolve;
  });

  async function run(work: Promise<string>) {
    const request = latest.begin();
    loading = true;
    try {
      const value = await work;
      if (request.isCurrent()) results = value;
    } finally {
      if (request.isCurrent()) loading = false;
    }
  }

  const pendingFirst = run(first);
  const pendingSecond = run(second);

  resolveSecond("verse-2");
  await pendingSecond;
  assert.equal(results, "verse-2");
  assert.equal(loading, false);

  resolveFirst("verse-1");
  await pendingFirst;
  assert.equal(results, "verse-2");
  assert.equal(loading, false);
});

test("begin() aborts the previous signal", () => {
  const latest = createLatestRequest();
  const first = latest.begin();
  assert.equal(first.signal.aborted, false);
  const second = latest.begin();
  assert.equal(first.signal.aborted, true);
  assert.equal(second.signal.aborted, false);
  assert.equal(first.isCurrent(), false);
  assert.equal(second.isCurrent(), true);
});
