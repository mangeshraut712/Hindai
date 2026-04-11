// e2e/daily-wisdom.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Daily Wisdom", () => {
  test("should display daily wisdom content", async ({ page }) => {
    await page.goto("/daily", { waitUntil: "networkidle" });

    // Check main content
    await expect(page.locator("h1")).toContainText("दैनिक ज्ञान");

    // Check wisdom card
    await expect(page.locator("blockquote")).toBeVisible();

    // Check source citation
    await expect(page.locator("text=—")).toBeVisible();
  });

  test("should allow liking wisdom", async ({ page }) => {
    await page.goto("/daily", { waitUntil: "networkidle" });

    const likeButton = page.locator("button").filter({ hasText: "Love" });
    await likeButton.click();

    // Button text should change
    await expect(page.locator("button").filter({ hasText: "Loved" })).toBeVisible();
  });

  test("should show meditation timer", async ({ page }) => {
    await page.goto("/daily", { waitUntil: "networkidle" });

    // Click meditate button
    await page.locator("button").filter({ hasText: "Meditate" }).click();

    // Check if meditation timer appears
    await expect(page.locator("text=Meditation Timer")).toBeVisible();
  });

  test("should handle meditation timer controls", async ({ page }) => {
    await page.goto("/daily", { waitUntil: "networkidle" });

    // Open meditation timer
    await page.locator("button").filter({ hasText: "Meditate" }).click();

    // Check timer display
    await expect(page.locator("text=5:00")).toBeVisible();

    // Start timer
    await page.locator("button").filter({ hasText: "Start" }).click();

    // Check if pause button appears
    await expect(page.locator("button").filter({ hasText: "Pause" })).toBeVisible();
  });
});
