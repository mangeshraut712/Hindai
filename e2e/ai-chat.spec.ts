// e2e/ai-chat.spec.ts
import { test, expect } from "@playwright/test";

test.describe("AI Chat", () => {
  test("should load AI guide page", async ({ page }) => {
    await page.goto("/ai-guide");

    // Check page content
    await expect(page.locator("h1")).toContainText(/AI|Guru/);

    // Check chat interface
    await expect(page.locator('input[placeholder*="scripture"]')).toBeVisible();
  });

  test("should send AI query", async ({ page }) => {
    await page.goto("/ai-guide");

    // Type a question
    await page.fill('input[placeholder*="scripture"]', "What is karma yoga?");

    // Click send button
    await page.locator('button[type="submit"]').click();

    // Check if response appears (this might take time)
    await expect(page.locator(".message-assistant")).toBeVisible({ timeout: 30000 });
  });

  test("should handle error states", async ({ page }) => {
    // Mock a failed API call
    await page.route("**/api/ai/generate", (route) => route.abort());

    await page.goto("/ai-guide");

    // Try to send a query
    await page.fill('input[placeholder*="scripture"]', "Test query");
    await page.locator('button[type="submit"]').click();

    // Check for error message
    await expect(page.locator("text=error")).toBeVisible();
  });

  test("should show loading state during AI response", async ({ page }) => {
    await page.goto("/ai-guide");

    // Start typing
    await page.fill('input[placeholder*="scripture"]', "What is dharma?");

    // Click send
    await page.locator('button[type="submit"]').click();

    // Check for loading indicator
    await expect(page.locator('[aria-label*="loading"]')).toBeVisible();
  });
});
