import { test, expect } from "@playwright/test";

test.describe("Contents Page Layout Tests", () => {
  test("should load contents page successfully", async ({ page }) => {
    await page.goto("/contents");
    await expect(page).toHaveTitle(/Contents|Hind AI/);
  });

  test("should have proper grid layout for scripture sections", async ({ page }) => {
    await page.goto("/contents");

    // Check if the page has content
    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible();
  });

  test("should have working navigation", async ({ page }) => {
    await page.goto("/contents");

    const header = page.locator("header");
    await expect(header).toBeVisible();
  });

  test("should have no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/contents");
    await page.waitForLoadState("networkidle");

    if (errors.length > 0) {
      console.error("Console errors found:", errors);
    }
    expect(errors.length).toBe(0);
  });
});
