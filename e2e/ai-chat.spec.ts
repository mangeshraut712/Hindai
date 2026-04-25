import { test, expect } from "@playwright/test";

test.describe("AI Chat Functionality", () => {
  test("sanskrit nova page loads", async ({ page }) => {
    await page.goto("/sanskrit-nova");
    await expect(page).toHaveTitle(/Sanskrit/);
  });

  test("ai guide page loads", async ({ page }) => {
    await page.goto("/ai-guide");
    await expect(page).toHaveTitle(/AI/);
  });

  test("navigation to ai chat works", async ({ page }) => {
    await page.goto("/");

    // Click on Guru AI link
    await page.click("text=Guru AI");
    await expect(page).toHaveURL(/.*ai-guide/);
  });

  test("transliteration page loads", async ({ page }) => {
    await page.goto("/sanskrit-nova");
    await expect(page).toHaveTitle(/Sanskrit/);
  });

  test("learning paths page loads", async ({ page }) => {
    await page.goto("/study-paths");
    await expect(page).toHaveTitle(/Study/);
  });
});
