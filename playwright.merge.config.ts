import { defineConfig } from "@playwright/test";

export default defineConfig({
  reporter: [["html"], ["json", { outputFile: "test-results/merged.json" }]],
});
