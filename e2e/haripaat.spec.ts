import { test, expect } from "@playwright/test";

test.describe("Haripaat", () => {
  test("home and folio open daily Hari leaves", async ({ page }) => {
    await page.goto("/haripaat");
    await expect(page).toHaveTitle(/Haripaat/);
    await expect(page.getByRole("heading", { name: /Daily Hari patha/i })).toBeVisible();
    await page.getByRole("link", { name: /Open Haripaat/i }).click();
    await expect(page).toHaveURL(/\/haripaat\/book/);
    await expect(page.getByRole("heading", { name: /हरिपाठ/ })).toBeVisible();
    await page.getByRole("link", { name: /Start leaf 1/i }).click();
    await expect(page.getByRole("heading", { name: /पाठ १/ })).toBeVisible();
    await expect(page.getByText(/मंगलाचरण/)).toBeVisible();
  });
});
