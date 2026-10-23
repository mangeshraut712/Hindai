import assert from "node:assert/strict";
import { test } from "node:test";
import { ContextManager } from "./context-manager";

test("trim keeps one server system prompt at the front", () => {
  const manager = new ContextManager();
  const trimmed = manager.trimConversation(
    [
      { role: "system", content: "CLIENT SYSTEM" },
      { role: "user", content: "What is dharma?" },
    ],
    "SERVER"
  );

  assert.equal(trimmed[0]?.role, "system");
  assert.equal(trimmed[0]?.content, "SERVER");
  assert.equal(trimmed.filter((message) => message.role === "system").length, 1);
  assert.equal(trimmed.at(-1)?.content, "What is dharma?");
});
