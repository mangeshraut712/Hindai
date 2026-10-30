import assert from "node:assert/strict";
import { test } from "node:test";
import worker from "../../../workers/hindai-gemma/src/index";

const WORKER_URL = "https://hindai-gemma.example.test";

type WorkerResult = ReadableStream | { response?: string; result?: { response?: string } };

function request(path: string, body: Record<string, unknown>, client: string): Request {
  return new Request(`${WORKER_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": client,
    },
    body: JSON.stringify(body),
  });
}

function workerEnv(run: () => Promise<WorkerResult>) {
  return {
    AI: { run: async () => run() },
    GEMMA_MODEL: "test-gemma",
    OPENROUTER_MODEL: "test-openrouter",
  };
}

test("initial streaming failures return a generic Worker error", async () => {
  const routes = [
    { path: "/api/ai/chat", body: { messages: [{ role: "user", content: "synthetic prompt" }] } },
    { path: "/api/ai/stream", body: { query: "synthetic prompt" } },
    { path: "/api/ai/dharma", body: { query: "synthetic prompt" } },
  ];

  for (const [index, route] of routes.entries()) {
    const response = await worker.fetch(
      request(route.path, route.body, `stream-error-${index}`),
      workerEnv(async () => {
        throw new Error("internal synthetic fixture secret");
      })
    );

    assert.equal(response.status, 503);
    const payload = await response.json();
    assert.deepEqual(payload, { error: "Gemma 4 gateway failed." });
    assert.equal(JSON.stringify(payload).includes("fixture secret"), false);
  }
});

test("malformed Worker quiz output returns a safe failure instead of an unusable question", async () => {
  const response = await worker.fetch(
    request("/api/ai/quiz", { topic: "synthetic topic" }, "quiz-error"),
    workerEnv(async () => ({
      response: JSON.stringify({
        question: "Synthetic malformed question",
        options: [],
        correctAnswer: 7,
        explanation: "",
        scripture: "",
        difficulty: "wrong",
      }),
    }))
  );

  assert.equal(response.status, 503);
  const payload = await response.json();
  assert.deepEqual(payload, { error: "Gemma 4 gateway failed." });
  assert.equal(JSON.stringify(payload).includes("Synthetic malformed"), false);
});

test("well-formed Worker quiz output remains available", async () => {
  const question = {
    question: "Which synthetic answer is correct?",
    options: ["One", "Two", "Three", "Four"],
    correctAnswer: 1,
    explanation: "The second synthetic option is correct.",
    scripture: "Synthetic scripture 1.1",
    difficulty: "easy",
  };
  const response = await worker.fetch(
    request("/api/ai/quiz", { topic: "synthetic topic" }, "quiz-success"),
    workerEnv(async () => ({ response: JSON.stringify(question) }))
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { question, model: "test-gemma" });
});
