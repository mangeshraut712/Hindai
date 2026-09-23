import { test, expect } from "@playwright/test";

test("recitation index lists the nine full texts", async ({ page }) => {
  await page.goto("/recite");
  await expect(page.getByRole("heading", { name: "Full hymns for difficult days" })).toBeVisible();
  for (const name of [
    "Hanuman Chalisa",
    "Vishnu Sahasranama",
    "Kanakadhara Stotram",
    "Shiva Shatakam",
    "Kala Bhairava Ashtakam",
    "Ganapati Atharvashirsha",
    "Santana Gopala",
    "Durga Saptashati",
    "Aditya Hridayam",
  ]) {
    await expect(page.getByRole("link", { name: new RegExp(name) })).toBeVisible();
  }
});

test("Hanuman Chalisa can be read and spoken through", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: {
        cancel() {},
        speak(utterance: SpeechSynthesisUtterance) {
          document.documentElement.dataset.spokenText = utterance.text;
        },
      },
    });
  });
  await page.goto("/recite/hanuman-chalisa");
  await expect(page.getByRole("heading", { name: "Hanuman Chalisa" })).toBeVisible();
  const verses = page.locator("main ol > li");
  await expect(verses).toHaveCount(43);
  await expect(verses.nth(2)).toContainText("जय हनुमान ज्ञान गुन सागर");
  await expect(verses.last()).toContainText("पवनतनय संकट हरन");
  await page.getByRole("tab", { name: "English", exact: true }).click();
  await expect(verses.nth(2).locator("p").last()).not.toBeEmpty();
  await page.getByRole("tab", { name: "IAST", exact: true }).click();
  await expect(verses.nth(2)).toContainText("jaya hanumāna");
  await page.getByRole("button", { name: "Listen", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-spoken-text", /श्रीगुरु/);
});

test("Durga Saptashati opens on the path and can move to an adhyaya", async ({ page }) => {
  await page.goto("/recite/durga-saptashati");
  await expect(page.getByRole("heading", { name: "Durga Saptashati" })).toBeVisible();
  await page.getByLabel("Section").selectOption({ label: "Adhyaya 1 · Madhu and Kaitabha" });
  await expect(page.getByRole("heading", { name: "Adhyaya 1 · Madhu and Kaitabha" })).toBeVisible();
  await expect(page.locator("main ol")).toContainText("सावर्णि");
});
