// e2e/homepage.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load homepage and display main content", async ({ page }) => {
    await page.goto("/");

    // Check title
    await expect(page).toHaveTitle(/Hind AI/);

    // Check main heading
    await expect(page.locator("h1")).toContainText("Hind AI");

    // Check navigation
    await expect(page.locator("nav")).toBeVisible();

    // Check search functionality
    const searchButton = page.locator('button[aria-label*="search"]').first();
    await expect(searchButton).toBeVisible();
  });

  test("should navigate to different sections", async ({ page }) => {
    await page.goto("/");

    // Test navigation links
    await page.click("text=Granthalaya");
    await expect(page).toHaveURL(/.*contents/);

    await page.goto("/");
    await page.click("text=Guru AI");
    await expect(page).toHaveURL(/.*ai-guide/);
  });

  test("should open search dialog", async ({ page }) => {
    await page.goto("/");

    // Click search button
    await page.locator('button[aria-label*="search"]').first().click();

    // Check if search dialog opens
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(page.locator('input[placeholder*="search"]')).toBeVisible();
  });

  test("should toggle theme", async ({ page }) => {
    await page.goto("/");

    // Check initial theme
    const html = page.locator("html");
    const initialClass = await html.getAttribute("class");

    // Click theme toggle
    await page.locator('button[aria-label*="theme"]').click();

    // Check if theme changed
    const newClass = await html.getAttribute("class");
    expect(newClass).not.toBe(initialClass);
  });
});
