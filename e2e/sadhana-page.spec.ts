import { test, expect } from "@playwright/test";

test.describe("Sadhana page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/sadhana");
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();
  });

  test("loads the daily sadhana hub with SEO structured data", async ({ page }) => {
    await expect(page).toHaveTitle(/Daily Sadhana|Hind AI/);
    await expect(
      page.getByRole("heading", {
        name: /daily practice hub for mantra, reflection, and scripture/i,
      })
    ).toBeVisible();
    await expect(page.getByText(/Digital japa mala/i)).toBeVisible();

    const structuredDataCount = await page.locator('script[type="application/ld+json"]').count();
    expect(structuredDataCount).toBeGreaterThan(0);
  });

  test("counts chants, changes goals, and saves a session", async ({ page }) => {
    // Wait for page hydration by checking default goal
    await expect(page.getByText("of 108")).toBeVisible();

    await page.getByRole("button", { name: /^54$/ }).click();

    // Verify goal changed to 54 before chanting
    await expect(page.getByText("of 54")).toBeVisible();

    await page.getByRole("button", { name: /Add one chant/i }).click();
    await page.getByRole("button", { name: /Add one chant/i }).click();

    await expect(page.getByTestId("sadhana-count")).toHaveText("2");
    await expect(page.getByText("52 remaining")).toBeVisible();

    await page.getByRole("button", { name: /Save session/i }).click();
    await expect(page.getByText("2/54 chants")).toBeVisible();
  });

  test("loads the astrological guide, festival reminders, and daily routine generator", async ({
    page,
  }) => {
    await expect(page.getByText(/Today's Astrological Guide/i)).toBeVisible();
    await expect(page.getByText(/Upcoming Vrats & Festivals/i)).toBeVisible();
    await expect(page.getByText(/Guru AI Daily Routine Generator/i)).toBeVisible();

    // Verify presence of options in routine generator
    const selectElements = page.locator("select");
    await expect(selectElements).toHaveCount(5);
  });

  test("is reachable from homepage discovery cards", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /Daily sadhana Use a digital/i }).click();
    await expect(page).toHaveURL(/\/sadhana$/);
  });
});
