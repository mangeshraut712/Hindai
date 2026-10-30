import assert from "node:assert/strict";
import { test } from "node:test";
import {
  API_BASE,
  PUBLIC_GEMMA_WORKER,
  isServerApiRouteAvailable,
  isPublicGemmaWorkerRouteSupported,
} from "./capabilities";

test("public Worker route support blocks unknown API paths before a request", () => {
  assert.equal(isPublicGemmaWorkerRouteSupported("/api/ai/chat"), true);
  assert.equal(isPublicGemmaWorkerRouteSupported("/api/ai/vision"), false);
  assert.equal(isServerApiRouteAvailable("/api/ai/vision"), false);
  assert.equal(isServerApiRouteAvailable("/api/ai/chat", PUBLIC_GEMMA_WORKER, false), false);
  assert.equal(isServerApiRouteAvailable("/api/ai/vision", ""), true);
  assert.equal(
    isServerApiRouteAvailable("/api/ai/vision", "https://example.test/custom-worker"),
    true
  );
  assert.equal(API_BASE, PUBLIC_GEMMA_WORKER);
});
