// e2e/ai-chat.spec.ts
import { test, expect } from "@playwright/test";

test.describe("AI Chat", () => {
  test("should load AI guide page", async ({ page }) => {
    await page.goto("/ai-guide", { waitUntil: "networkidle" });

    // Check page content
    await expect(page.locator("h1")).toContainText(/living conversation/i);

    // Check chat interface
    await expect(
      page.locator('input[placeholder*="Ask about scriptures"]'),
    ).toBeVisible();
  });

  test("should send an explain-mode query", async ({ page }) => {
    await page.route("**/api/ai/stream/", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "text/plain; charset=utf-8",
        body: "Karma Yoga means acting with discipline while releasing attachment to outcomes.",
      });
    });

    await page.goto("/ai-guide", { waitUntil: "networkidle" });
    await page.fill(
      'input[placeholder*="Ask about scriptures"]',
      "What is karma yoga?",
    );
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(
      page.getByText(/Karma Yoga means acting with discipline/i),
    ).toBeVisible();
  });

  test("should render compare results as a structured summary", async ({
    page,
  }) => {
    await page.route("**/api/ai/stream/", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "text/plain; charset=utf-8",
        headers: {
          "x-hindai-compare-card": JSON.stringify({
            commonGround: [
              "Both texts connect disciplined practice with self-mastery.",
            ],
            differences: [
              {
                topic: "Primary lens",
                insight:
                  "The Gita frames action in duty, while Yoga Sutras frames practice in mind training.",
              },
            ],
            classroomUse: [
              "Use both texts to compare action and contemplation.",
            ],
          }),
        },
        body: "Comparison complete.",
      });
    });

    await page.goto("/ai-guide", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /compare texts/i }).click();
    await page
      .getByRole("button", { name: "Bhagavad Gita", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Yoga Sutras", exact: true })
      .click();
    await page.fill(
      'input[placeholder*="Compare two texts"]',
      "Compare Bhagavad Gita and Yoga Sutras",
    );
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByText("Compare summary")).toBeVisible();
    await expect(page.getByText("Common ground")).toBeVisible();
    await expect(page.getByText("Differences")).toBeVisible();
    await expect(page.getByText(/Primary lens/i)).toBeVisible();
  });

  test("should handle error states", async ({ page }) => {
    await page.route("**/api/ai/stream/", async (route) => {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ error: "AI service unavailable" }),
      });
    });

    await page.goto("/ai-guide", { waitUntil: "networkidle" });
    await page.fill('input[placeholder*="Ask about scriptures"]', "Test query");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(
      page.getByText(/having trouble connecting to the AI service/i),
    ).toBeVisible();
  });
});
