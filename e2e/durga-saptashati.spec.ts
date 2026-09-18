import { test, expect } from "@playwright/test";

test.describe("Durga Saptashati", () => {
  test("home and folio open Chandi patha leaves", async ({ page }) => {
    await page.goto("/durga-saptashati");
    await expect(page).toHaveTitle(/Durga Saptashati/);
    await expect(
      page.getByRole("heading", { name: /Devi Mahatmya as a living Chandi patha/i })
    ).toBeVisible();
    await page.getByRole("link", { name: /Open the pothi/i }).click();
    await expect(page).toHaveURL(/\/durga-saptashati\/book/);
    await expect(page.getByRole("heading", { name: /दुर्गा सप्तशती/ })).toBeVisible();
    await page.getByRole("link", { name: /Start Kavacham/i }).click();
    await expect(page.getByRole("heading", { name: "देवी कवचम्", exact: true })).toBeVisible();
    await expect(page.getByText(/कवच म्हणजे देवीच्या नामांनी/)).toBeVisible();
  });
});
