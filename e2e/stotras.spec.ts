import { test, expect, type Page } from "@playwright/test";

const selectStotraCard = async (page: Page, name: RegExp) => {
  const card = page.getByRole("button", { name });
  await expect(card).toBeVisible();
  await expect(async () => {
    await card.click();
    await expect(card).toHaveAttribute("aria-pressed", "true", { timeout: 1000 });
  }).toPass();
  return card;
};

test.describe("Stotras & Aartis Page Tests", () => {
  test("should load stotras list successfully", async ({ page }) => {
    await page.goto("/stotras");
    await expect(page).toHaveTitle(/Stotras|Mantras|Hind AI/);

    await expect(
      page.getByRole("heading", { name: "Devotional Literature Collection" })
    ).toBeVisible();

    await expect(page.getByRole("button", { name: /Vishnu Sahasranama/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Hanuman Chalisa/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Gayatri Mantra/i })).toBeVisible();
  });

  test("should open detailed stotra view", async ({ page }) => {
    await page.goto("/stotras");

    await selectStotraCard(page, /Hanuman Chalisa/i);

    await expect(page.getByRole("heading", { name: "Deity" })).toBeVisible();
    await expect(page.getByRole("paragraph").filter({ hasText: /^Hanuman$/ })).toBeVisible();
    await expect(page.getByText("Audio Available").last()).toBeVisible();
  });

  test("should show sample names and full text link", async ({ page }) => {
    await page.goto("/stotras");

    await selectStotraCard(page, /Vishnu Sahasranama/i);

    await expect(page.getByRole("heading", { name: "Sample Names" })).toBeVisible();
    await expect(page.getByText("The All-Pervading One")).toBeVisible();
    await expect(page.getByRole("link", { name: "Read Full Text" })).toHaveAttribute(
      "href",
      "/vishnu-sahasranama"
    );
  });

  test("should support keyboard card selection", async ({ page }) => {
    await page.goto("/stotras");

    const gayatriCard = page.getByRole("button", { name: /Gayatri Mantra/i });
    await selectStotraCard(page, /Vishnu Sahasranama/i);

    await gayatriCard.focus();
    await page.keyboard.press("Enter");

    await expect(gayatriCard).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText("The sacred Gayatri mantra").last()).toBeVisible();
  });
});
