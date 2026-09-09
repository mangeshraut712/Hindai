import { test, expect } from "@playwright/test";

test.describe("Shridhar sister pothis", () => {
  test("Harivijay home and folio open Krishna katha leaves", async ({ page }) => {
    await page.goto("/harivijay");
    await expect(page).toHaveTitle(/Harivijay/);
    await expect(page.getByRole("heading", { name: /श्रीहरिविजय/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /अनुक्रमणिका/ })).toBeVisible();
    await page.getByRole("link", { name: /Open the pothi/i }).click();
    await expect(page).toHaveURL(/\/harivijay\/book/);
    await expect(page.getByRole("heading", { name: /सचित्र श्रीहरिविजय/ })).toBeVisible();
    await page.getByRole("link", { name: /Start adhyay 1/i }).click();
    await expect(page.getByText("॥ अध्याय १ ॥")).toBeVisible();
    await page.getByTestId("harivijay-next").click();
    await expect(page.getByRole("heading", { name: "॥ अध्याय २ ॥" })).toBeVisible();
  });

  test("Ramvijay home opens Rama pothi cover", async ({ page }) => {
    await page.goto("/ramvijay");
    await expect(page.getByRole("heading", { name: /श्रीरामविजय/ })).toBeVisible();
    await page.getByRole("link", { name: /Open the pothi/i }).click();
    await expect(page).toHaveURL(/\/ramvijay\/book/);
    await expect(page.getByRole("heading", { name: /सचित्र श्रीरामविजय/ })).toBeVisible();
  });
});
