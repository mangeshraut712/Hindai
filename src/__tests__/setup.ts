/**
 * Test Setup File
 *
 * Configure testing environment
 */

import "@testing-library/jest-dom";
import { vi, afterEach } from "vitest";

// Mock environment variables
process.env.GEMMA_API_KEY = "test-api-key";
process.env.GEMMA_MODEL = "gemma-4-26b-a4b-it";
process.env.UPSTASH_REDIS_REST_URL = "https://test.upstash.io";
process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";

// Mock fetch
global.fetch = vi.fn();

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
});
