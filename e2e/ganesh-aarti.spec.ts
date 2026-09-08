import { test, expect } from "@playwright/test";

test.describe("Ganesh Aarti Sangrah", () => {
  test("lists the Marathi collection and opens Sukhakarta", async ({ page }) => {
    await page.goto("/ganesh-aarti");
    await expect(page).toHaveTitle(/Ganesh Marathi Aarti/);
    await expect(page.getByRole("heading", { name: /Marathi Ganesh aartis/i })).toBeVisible();
    await page.getByRole("link", { name: /Sukhakarta Dukhaharta/i }).click();
    await expect(page.getByRole("heading", { name: /Sukhakarta/i })).toBeVisible();
    await expect(page.getByRole("button", { name: "Listen" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "English" })).toBeVisible();
  });
});
