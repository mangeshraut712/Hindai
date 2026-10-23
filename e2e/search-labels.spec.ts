import { expect, test } from "@playwright/test";

test("library search exposes a named field and a named clear control", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open search dialog" }).click();
  const search = page.getByRole("textbox", { name: "Search the library" });
  await expect(search).toBeVisible();
  await search.fill("gita");
  await expect(page.getByRole("button", { name: "Clear search" })).toBeVisible();
});
