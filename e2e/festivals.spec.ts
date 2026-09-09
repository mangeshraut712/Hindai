import { test, expect } from "@playwright/test";

test.describe("Festival encyclopedia", () => {
  test("festivals hub and deep Maha Shivaratri article", async ({ page }) => {
    await page.goto("/festivals");
    await expect(page.getByRole("heading", { name: /Hindu festivals with origin/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Month by month/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Onam/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Chhath Puja/i }).first()).toBeVisible();
    await page
      .getByRole("link", { name: /Maha Shivaratri/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/festivals\/maha-shivaratri/);
    await expect(page.getByRole("heading", { name: "Origin / katha" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "In the temple" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Do", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Don’t", exact: true })).toBeVisible();
    await expect(page.getByText(/Tradition — Purāṇa/i)).toBeVisible();
  });
});

test.describe("Katha grantha", () => {
  test("katha hub and Mahadeva chapters", async ({ page }) => {
    await page.goto("/katha");
    await expect(page.getByRole("heading", { name: /Book-depth god stories/i })).toBeVisible();
    await page
      .getByRole("link", { name: /Mahadeva Katha/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/katha\/mahadev/);
    await expect(page.getByRole("heading", { name: "Chapters" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Linga of light/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Open tirtha home/i })).toBeVisible();
  });
});
