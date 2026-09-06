export const GITHUB_PAGES_ORIGIN = "https://mangeshraut712.github.io";
export const GITHUB_PAGES_BASE_PATH = "/Hindai";

/**
 * Asset/router prefix. Empty for local `next dev` / server builds.
 * Set to `/Hindai` when building with `npm run build:pages`.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Public site URL baked in at build time.
 * GitHub Pages production sets `NEXT_PUBLIC_SITE_URL`.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (BASE_PATH ? `${GITHUB_PAGES_ORIGIN}${BASE_PATH}` : "https://hindai.dev");
