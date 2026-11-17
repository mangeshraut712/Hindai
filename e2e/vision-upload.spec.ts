import { expect, test } from "@playwright/test";

test("public Worker deployments keep unsupported manuscript uploads in the browser", async ({
  page,
}) => {
  test.setTimeout(90_000);
  let visionRequests = 0;
  await page.route("**/api/ai/vision", async (route) => {
    visionRequests += 1;
    await route.abort();
  });

  await page.goto("/vision", { waitUntil: "domcontentloaded", timeout: 60_000 });

  await expect(
    page.getByText("Manuscript vision analysis is currently unavailable on this site.")
  ).toBeVisible();
  await expect(page.getByLabel("Upload manuscript image")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Analyze Image" })).toHaveCount(0);
  expect(visionRequests).toBe(0);
});
