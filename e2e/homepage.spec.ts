// e2e/homepage.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load homepage and display main content", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // Check title
    await expect(page).toHaveTitle(/Hind AI/);

    // Check main heading
    await expect(page.locator("h1")).toContainText(/Ancient wisdom/i);

    // Check navigation
    await expect(page.locator("nav")).toBeVisible();

    // Check search functionality
    const searchButton = page.getByRole("button", {
      name: /open search dialog/i,
    });
    await expect(searchButton).toBeVisible();
  });

  test("should navigate to different sections", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // Test navigation links
    await page.getByRole("link", { name: /explore the library/i }).click();
    await expect(page).toHaveURL(/\/contents\/?$/);

    await page.goto("/");
    await page.getByRole("link", { name: /^Ask Guru AI$/i }).click();
    await expect(page).toHaveURL(/\/ai-guide\/?$/);
  });

  test("should open search dialog", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // Click search button
    await page.getByRole("button", { name: /open search dialog/i }).click();

    // Check if search dialog opens
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(
      page.getByPlaceholder(/search by name, description, or category/i),
    ).toBeVisible();
  });

  test("should toggle theme", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const html = page.locator("html");
    const initialClass = (await html.getAttribute("class")) || "";

    await page.getByRole("button", { name: /switch to .* theme/i }).click();

    await expect
      .poll(async () => (await html.getAttribute("class")) || "")
      .not.toBe(initialClass);
  });
});
