import { test, expect } from "@playwright/test";

test.describe("Basic Navigation", () => {
  test("homepage loads correctly", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("/");
  });

  test("navigation menu works", async ({ page }) => {
    await page.goto("/");

    // Test main navigation links
    await page.click("text=Library");
    await expect(page).toHaveURL(/.*contents/);

    await page.click("text=Guru AI");
    await expect(page).toHaveURL(/.*ai-guide/);

    await page.click("text=Sanskrit");
    await expect(page).toHaveURL(/.*sanskrit-nova/);
  });

  test("scripture pages load", async ({ page }) => {
    // Test direct navigation to scripture pages
    await page.goto("/bhagavad-gita");
    await expect(page).toHaveURL(/.*bhagavad-gita/);
  });

  test("search functionality", async ({ page }) => {
    await page.goto("/");

    // Click search button
    const searchButton = page.locator('button').filter({ hasText: 'Search' }).first();
    await searchButton.click();

    // Wait a moment for dialog
    await page.waitForTimeout(500);
  });

  test("responsive design", async ({ page }) => {
    await page.goto("/");

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveURL("/");

    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page).toHaveURL("/");
  });
});
