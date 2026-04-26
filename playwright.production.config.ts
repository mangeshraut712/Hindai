import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/production.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  timeout: 60000,
  workers: process.env.CI ? 2 : undefined,
  reporter: "html",
  use: {
    baseURL: "https://hindai-nine.vercel.app",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    ...(process.env.CI
      ? []
      : [
          {
            name: "Mobile Chrome",
            use: { ...devices["Pixel 5"] },
          },
          {
            name: "Mobile Safari",
            use: { ...devices["iPhone 12"] },
          },
        ]),
  ],
});
