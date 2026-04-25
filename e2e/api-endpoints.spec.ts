import { test, expect } from "@playwright/test";

test.describe("API Endpoints", () => {
  test("health check endpoint", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty("status");
  });

  test("info endpoint", async ({ request }) => {
    const response = await request.get("/api/info");
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty("version");
  });

  test("sanskrit transliterate endpoint", async ({ request }) => {
    const response = await request.post("/api/sanskrit/transliterate", {
      data: {
        text: "धर्म",
        direction: "devanagari-to-roman",
      },
    });
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty("transliteration");
  });

  test("sanskrit tracks endpoint", async ({ request }) => {
    const response = await request.get("/api/sanskrit/tracks");
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty("tracks");
  });

  test("sanskrit chat endpoint requires POST", async ({ request }) => {
    const response = await request.get("/api/sanskrit/chat");
    expect(response.status()).toBe(405); // Method not allowed
  });

  test("sanskrit chat endpoint POST", async ({ request }) => {
    const response = await request.post("/api/sanskrit/chat", {
      data: {
        message: "Hello",
      },
    });
    // Should return 200 even if API key not configured (graceful fallback)
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty("reply");
  });

  test("ai generate endpoint requires POST", async ({ request }) => {
    const response = await request.get("/api/ai/generate");
    expect(response.status()).toBe(405); // Method not allowed
  });

  test("ai generate endpoint POST", async ({ request }) => {
    const response = await request.post("/api/ai/generate", {
      data: {
        prompt: "What is dharma?",
      },
    });
    // Should return 200 even if API key not configured (graceful fallback)
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty("response");
  });
});
