import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/contents",
  "/ai-guide",
  "/shivlilamrit",
  "/ganesh-aarti",
  "/panchanga",
  "/sadhana",
  "/guide",
  "/quiz",
  "/stotras",
];

function isHydrationNoise(text: string): boolean {
  return (
    /hydrat/i.test(text) || text.includes("did not match") || text.includes("server rendered HTML")
  );
}

for (const route of routes) {
  test(`no hydration mismatch on ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        errors.push(message.text());
      }
    });
    page.on("pageerror", (error) => {
      errors.push(error.message);
    });

    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.locator("header").first()).toBeVisible();

    const hydrationErrors = errors.filter(isHydrationNoise);
    expect(hydrationErrors, hydrationErrors.join("\n\n")).toEqual([]);
  });
}
