import { defineConfig, devices } from "@playwright/test";

const chromiumProject = {
  name: "chromium",
  use: {
    ...devices["Desktop Chrome"],
    ...(process.env.PLAYWRIGHT_CHROMIUM_CHANNEL === "chrome" ? { channel: "chrome" as const } : {}),
  },
};

const playwrightPort =
  process.env.PLAYWRIGHT_PORT && /^\d+$/.test(process.env.PLAYWRIGHT_PORT)
    ? process.env.PLAYWRIGHT_PORT
    : "3100";
const baseURL = `http://localhost:${playwrightPort}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  timeout: 60000,
  workers: process.env.CI ? 2 : undefined,
  reporter: "html",
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  projects: process.env.CI
    ? [chromiumProject]
    : [
        chromiumProject,
        {
          name: "firefox",
          use: { ...devices["Desktop Firefox"] },
        },
        {
          name: "webkit",
          use: { ...devices["Desktop Safari"] },
        },
        {
          name: "Mobile Chrome",
          use: { ...devices["Pixel 5"] },
        },
        {
          name: "Mobile Safari",
          use: { ...devices["iPhone 12"] },
        },
      ],
  webServer: {
    command: `npm run dev -- -p ${playwrightPort}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
