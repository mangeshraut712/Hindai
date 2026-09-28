import { test, expect } from "@playwright/test";

test.describe("Developer agent page", () => {
  test("should load the developer agent studio", async ({ page }) => {
    await page.goto("/developer-agent");
    await expect(page.locator("h1")).toContainText(/Navigate a repo/i);
    await expect(page.getByTestId("developer-agent-studio")).toBeVisible();
  });

  test("should render a tool trace after a demo run", async ({ page }) => {
    await page.route("**/api/ai/agent", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          backend: "mock",
          model: "hindai-mock-policy",
          submitted: true,
          stoppedReason: "submit_patch",
          finalMessage: "Submitted a workspace patch.",
          note: "Playwright stub",
          steps: [
            {
              thought: "mock:edit_file",
              call: { name: "edit_file", arguments: {} },
              observation: { name: "edit_file", ok: true, output: "updated query/limits.py" },
            },
          ],
          patch: "--- a/query/limits.py\n+    return default if value is None else value\n",
        }),
      });
    });
    await page.goto("/developer-agent");
    await page.getByRole("button", { name: /Run on demo workspace/i }).click();
    await expect(page.getByTestId("developer-agent-result")).toBeVisible();
    await expect(page.getByTestId("developer-agent-patch")).toContainText("value is None");
  });
});
