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

test("Atharvashirsha matches book numbering, layers, and spoken text", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "speechSynthesis", {
      value: {
        cancel() {},
        speak(utterance: SpeechSynthesisUtterance) {
          document.documentElement.dataset.spokenText = utterance.text;
        },
      },
    });
  });
  await page.goto("/ganesh-aarti/ganapati-atharvashirsha");
  const verses = page.locator("main ol > li");
  await expect(verses).toHaveCount(16);
  await expect(verses.nth(2)).toContainText("ऋतं वच्मि ॥ सत्यं वच्मि ॥२॥");
  await expect(verses.nth(14)).toContainText("इत्युपनिषत्॥१४॥");
  await expect(page.getByLabel("Printed booklet notes")).toContainText("हा जप १०८ वेळा करावा");
  for (const layer of ["IAST", "English", "Marathi note", "Devanagari"]) {
    const tab = page.getByRole("tab", { name: layer, exact: true });
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    await expect(verses.nth(14).locator("p").last()).not.toBeEmpty();
  }
  await page.getByRole("button", { name: "Listen", exact: true }).click();
  await expect(page.getByRole("button", { name: "Stop", exact: true })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-spoken-text", /अनेन गणपतिमभिषिञ्चति/);
  await expect(page.locator("html")).toHaveAttribute("data-spoken-text", /ॐ सह नाववतु/);
  await page.getByRole("button", { name: "Stop", exact: true }).click();
  await expect(page.getByRole("button", { name: "Listen", exact: true })).toBeVisible();
});
