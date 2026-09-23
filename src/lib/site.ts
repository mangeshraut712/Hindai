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

/** Root-relative public file, including GitHub Pages `basePath` when set. */
export function publicUrl(path: string): string {
  if (!path || /^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!BASE_PATH || normalized === BASE_PATH || normalized.startsWith(`${BASE_PATH}/`)) {
    return normalized;
  }
  return `${BASE_PATH}${normalized}`;
}

/** Absolute public URL for sitemap/canonical loc values. Always trailing-slash pages. */
export function absolutePageUrl(path: string = "/"): string {
  if (!path || path === "/") {
    return `${SITE_URL}/`;
  }
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  const trimmed = withSlash.endsWith("/") ? withSlash.slice(0, -1) : withSlash;
  return `${SITE_URL}${trimmed}/`;
}
