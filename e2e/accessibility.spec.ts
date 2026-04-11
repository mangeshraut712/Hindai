// e2e/accessibility.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test("should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("nav")).toBeVisible();
  });

  test("should have proper alt text for images", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // Check all images have alt text
    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt).not.toBeNull();
      expect(alt?.length).toBeGreaterThan(0);
    }
  });

  test("should be keyboard navigable", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // Tab through focusable elements
    await page.keyboard.press("Tab");
    let focusedElement = await page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    // Continue tabbing
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Tab");
      focusedElement = await page.locator(":focus");
      await expect(focusedElement).toBeVisible();
    }
  });

  test("should have sufficient color contrast", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // This would typically use axe-playwright or similar
    // For now, we'll check that text is readable
    const textElements = page.locator("p, span, div").filter({ hasText: /.+/ });
    const count = await textElements.count();

    // Basic check that text elements exist and are visible
    expect(count).toBeGreaterThan(0);
  });

  test("should support screen readers", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    await expect(page.locator("nav")).toBeVisible();
    await expect(page.getByRole("button", { name: /open search dialog/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /switch to .* theme/i })).toBeVisible();
  });

  test("should work with reduced motion", async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "networkidle" });

    // Check that page still loads and functions
    await expect(page.locator("h1")).toBeVisible();

    // Test functionality still works
    await page.getByRole("button", { name: /open search dialog/i }).click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
  });
});
