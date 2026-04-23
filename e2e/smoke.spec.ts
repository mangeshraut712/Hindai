import { test, expect } from "@playwright/test";

test.describe("Hind AI Smoke Tests", () => {
  test("homepage loads correctly", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Hind AI/);
    await expect(page.locator("text=Ancient wisdom").first()).toBeVisible();
  });

  test("navigation works", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Library");
    await expect(page).toHaveURL(/\/contents/);
  });

  test("scripture page loads", async ({ page }) => {
    await page.goto("/bhagavad-gita");
    await expect(page.locator("h1").first()).toBeVisible();
  });
});
