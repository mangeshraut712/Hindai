import { test, expect } from "@playwright/test";

test.describe("API Endpoints", () => {
  test("health check endpoint", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.ok()).toBeTruthy();
  });

  test("info endpoint", async ({ request }) => {
    const response = await request.get("/api/info");
    expect(response.ok()).toBeTruthy();
  });

  test("sanskrit tracks endpoint", async ({ request }) => {
    const response = await request.get("/api/sanskrit/tracks");
    expect(response.ok()).toBeTruthy();
  });

  test("transliterate endpoint", async ({ request }) => {
    const response = await request.post("/api/transliterate", {
      data: {
        text: "धर्म",
        direction: "devanagari-to-roman",
      },
    });
    expect(response.ok()).toBeTruthy();
  });

  test("tracks endpoint", async ({ request }) => {
    const response = await request.get("/api/tracks");
    expect(response.ok()).toBeTruthy();
  });
});
