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

test("Satyanarayan reader makes every source chapter readable in order", async ({ page }) => {
  await page.goto("/satyanarayan-puja");
  await expect(
    page.getByRole("heading", { name: "श्री सत्यनारायण व्रतकथा" }).first()
  ).toBeVisible();
  const reader = page.getByRole("region", { name: "Satyanarayan katha reader" });
  await expect(
    reader.getByRole("navigation", { name: "Five katha chapters" }).getByRole("button")
  ).toHaveCount(5);
  await expect(reader.getByRole("tab", { name: "मराठी पुस्तक" })).toHaveAttribute(
    "aria-selected",
    "true"
  );
  await expect(reader.getByRole("tabpanel")).toContainText("एकदा नैमिषारण्ये");
  await reader.getByRole("tab", { name: "हिन्दी कथा" }).click();
  await expect(reader.getByRole("tabpanel")).toContainText("शौनक");
  await reader.getByRole("tab", { name: "English story" }).click();
  await expect(reader.getByRole("tabpanel")).toContainText("Naimisharanya");
  await reader
    .getByRole("navigation", { name: "Five katha chapters" })
    .getByRole("button", { name: /Chapter 5/ })
    .click();
  await expect(page).toHaveURL(/#adhyay-5$/);
  await reader.getByRole("tab", { name: "संस्कृत पाठ" }).click();
  await expect(reader.getByRole("tabpanel")).toContainText("गोलोकं तु तदा ययुः");
  await expect(reader.getByRole("button", { name: /Next/ })).toBeDisabled();
  await expect(reader.getByRole("link", { name: /Compare with Wikisource page/ })).toHaveAttribute(
    "href",
    /२३७/
  );
});
