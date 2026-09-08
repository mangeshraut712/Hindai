import { test, expect } from "@playwright/test";

test.describe("Shivlilamrit ebook", () => {
  test("turns numbered folios from cover through contents into adhyay 11", async ({ page }) => {
    await page.goto("/shivlilamrit");
    await expect(page).toHaveTitle(/Shivlilamrit/);
    await expect(page.getByRole("heading", { name: /living pothi/i })).toBeVisible();
    const pothiHref = await page.getByRole("link", { name: /Open the pothi/i }).getAttribute("href");
    expect(pothiHref).toBeTruthy();
    await page.goto(pothiHref ?? "/shivlilamrit/book?p=1");
    await expect(page.getByRole("heading", { name: /सचित्र श्रीशिवलीलामृत/ })).toBeVisible();
    await page.getByRole("button", { name: /^Next$/ }).click();
    await expect(page.getByRole("heading", { name: /अनुक्रमणिका/ })).toBeVisible();
    await expect(page.getByText(/पृष्ठ/)).toBeVisible();
    await page.getByRole("button", { name: /Contents/i }).click();
    await page.goto("/shivlilamrit");
    await page.getByRole("link", { name: /Start adhyay 11/i }).click();
    await expect(page.getByText(/Rudra adhyay/i)).toBeVisible();
    await expect(page.getByText(/पृष्ठ/)).toBeVisible();
    await page.getByRole("button", { name: /^Next$/ }).click();
    await expect(page.getByText(/धन्य धन्य तेचि जन/)).toBeVisible();
    await expect(page.getByText(/Ovis 1/)).toBeVisible();
  });
});
