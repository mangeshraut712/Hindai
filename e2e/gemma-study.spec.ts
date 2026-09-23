import { test, expect } from "@playwright/test";

const SURFACES = [
  "/katha",
  "/recite",
  "/stotras",
  "/ganesh-aarti",
  "/durga-saptashati/book?p=3",
  "/shivlilamrit/book?p=10",
];

test("katha, mantra, and book pages can ask Gemma 4 about the text on the page", async ({
  page,
}) => {
  for (const route of SURFACES) {
    await page.goto(route);
    const panel = page.getByTestId("gemma-study-panel").first();
    await expect(panel).toBeVisible();
    await expect(panel.getByRole("button", { name: "Ask", exact: true })).toBeVisible();
    await expect(panel.getByPlaceholder("Search what you want to understand")).toBeVisible();
  }
});
