/**
 * Runtime capability flags.
 *
 * GitHub Pages cannot host App Router `/api/*` handlers. Production Gemma
 * traffic goes to the Cloudflare Worker in `workers/hindai-gemma`.
 * Local `next dev` still uses in-repo route handlers when no API base is set.
 */
export const PUBLIC_GEMMA_WORKER = "https://hindai-gemma.mangeshraut712.workers.dev";

const PUBLIC_GEMMA_WORKER_ROUTES = new Set([
  "/",
  "/health",
  "/api/health",
  "/api/ai/agent",
  "/api/ai/chat",
  "/api/ai/dharma",
  "/api/ai/quiz",
  "/api/ai/stream",
  "/api/ai/translate",
  "/api/pothi/speak",
  "/api/sanskrit/chat",
]);

export const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? PUBLIC_GEMMA_WORKER).replace(
  /\/+$/,
  ""
);

export const HAS_SERVER_API = process.env.NEXT_PUBLIC_HAS_SERVER_API !== "false";

function normalizeApiPath(path: string): string {
  const pathname = path.split(/[?#]/, 1)[0] || "/";
  return pathname.replace(/\/+$/, "") || "/";
}

export function isPublicGemmaWorkerRouteSupported(path: string): boolean {
  return PUBLIC_GEMMA_WORKER_ROUTES.has(normalizeApiPath(path));
}

export function isServerApiRouteAvailable(
  path: string,
  apiBase = API_BASE,
  hasServerApi = HAS_SERVER_API
): boolean {
  if (!hasServerApi) return false;
  if (apiBase !== PUBLIC_GEMMA_WORKER) return true;
  return isPublicGemmaWorkerRouteSupported(path);
}

export const SERVER_API_UNAVAILABLE_MESSAGE =
  "Gemma 4 is served by the Cloudflare Worker (`workers/hindai-gemma`) or local `npm run dev`. Set NEXT_PUBLIC_API_BASE to the Worker URL for GitHub Pages.";
