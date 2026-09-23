import { expect, test } from "@playwright/test";

test("Ganeshotsav guide keeps the Pune honour order and opens the radio", async ({ page }) => {
  await page.goto("/ganeshotsav");
  await expect(page.getByRole("heading", { name: /Ganpati Bappa/ })).toBeVisible();
  const pune = page.locator("#pune ol > li");
  await expect(pune).toHaveCount(6);
  await expect(pune.nth(0)).toContainText("Kasba Ganpati");
  await expect(pune.nth(1)).toContainText("Tambdi Jogeshwari");
  await expect(pune.nth(2)).toContainText("Dagdusheth");
  await expect(pune.nth(3)).toContainText("Guruji Talim");
  await expect(pune.nth(4)).toContainText("Tulshibaug");
  await expect(pune.nth(5)).toContainText("Kesariwada");
  await expect(page.locator("#mumbai ol > li")).toHaveCount(4);
  await expect(page.getByRole("list", { name: "All 30 ganeshai songs" }).locator("li")).toHaveCount(
    30
  );
  await page.getByRole("button", { name: /Ya Re Ya/ }).click();
  await expect(page.getByTitle("Ya Re Ya on YouTube")).toHaveAttribute("src", /HzGE_WaSqE4/);
});

test("Satyanarayan guide links all five complete source chapters", async ({ page }) => {
  await page.goto("/satyanarayan-puja");
  const chapterLinks = page.getByRole("link", { name: /Compare with Wikisource page/ });
  await expect(chapterLinks).toHaveCount(5);
  await expect(page.getByText(/All five chapters below are available on this page/)).toBeVisible();
  const firstChapter = page.locator("details").first();
  await firstChapter.locator("summary").click();
  await expect(firstChapter).toContainText("सत्यनारायण");
  for (let index = 0; index < 5; index += 1) {
    await expect(chapterLinks.nth(index)).toHaveAttribute(
      "href",
      new RegExp(`२३${["३", "४", "५", "६", "७"][index]}`)
    );
  }
});
