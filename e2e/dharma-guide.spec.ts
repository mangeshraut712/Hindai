import { expect, test } from "@playwright/test";

test("a Dharma quick guide sends its selected prompt", async ({ page }) => {
  test.setTimeout(90_000);
  const quickGuide = "How can I observe Ekadashi properly?";
  let sentQuery: string | undefined;

  await page.route("**/api/ai/dharma", async (route) => {
    const payload = route.request().postDataJSON() as { query?: string };
    sentQuery = payload.query;
    await route.fulfill({
      status: 200,
      contentType: "text/event-stream",
      body: 'data: {"content":"Synthetic Dharma guidance."}\n\ndata: [DONE]\n\n',
    });
  });

  await page.goto("/dharma", { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.getByRole("button", { name: quickGuide }).click();

  await expect.poll(() => sentQuery).toBe(quickGuide);
  await expect(page.getByText("Synthetic Dharma guidance.")).toBeVisible();
});
