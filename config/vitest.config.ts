import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/__tests__/setup.ts"],
    exclude: ["node_modules/**", "e2e/**", "playwright.config.ts", "coverage/**", ".next/**"],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "e2e/", ".next/", "src/__tests__/", "**/*.d.ts", "**/*.config.*"],
      // Thresholds disabled for initial development
      // Add tests incrementally and re-enable:
      // thresholds: {
      //   lines: 70,
      //   functions: 70,
      //   branches: 60,
      //   statements: 70,
      // },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
});
