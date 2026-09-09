import { test, expect } from "@playwright/test";

test.describe("Tirtha maps", () => {
  test("pilgrimage map and honest Devi yatras", async ({ page }) => {
    await page.goto("/pilgrimage");
    await expect(page.getByRole("heading", { name: /One map, four traditions/i })).toBeVisible();
    await expect(page.getByRole("button", { name: "All gods" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Twelve Jyotirlingas" })).toBeVisible();
    await expect(page.getByText(/Natural Earth coastline/i)).toBeVisible();
    await page.getByRole("button", { name: "Ashtavinayak order" }).click();
    await expect(page.getByRole("heading", { name: /Mayureshwar/i })).toBeVisible();
    await page.getByTestId("tirtha-open-place").click();
    await expect(page).toHaveURL(/\/ganesha\/morgaon/);
    await expect(page.getByText(/Ashtavinayak 1 of 8/i)).toBeVisible();
    await page.goto("/devi/vaishno-devi");
    await expect(page.getByText(/major-yatra/i)).toBeVisible();
    await expect(page.getByText(/will not call it ‘Sati’s head’/i)).toBeVisible();
    await page.goto("/devi/kamakhya");
    await expect(page.getByText("Nilachal hill, Guwahati · Kamakhya")).toBeVisible();
    await page.goto("/vishnu/puri");
    await expect(page.getByRole("link", { name: /Vimala/i })).toBeVisible();
  });
});
