/**
 * Runtime capability flags.
 *
 * GitHub Pages cannot host App Router `/api/*` handlers. Production Gemma
 * traffic goes to the Cloudflare Worker in `workers/hindai-gemma`.
 * Local `next dev` still uses in-repo route handlers when no API base is set.
 */
export const PUBLIC_GEMMA_WORKER = "https://hindai-gemma.mangeshraut712.workers.dev";

export const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? PUBLIC_GEMMA_WORKER).replace(
  /\/+$/,
  ""
);

export const HAS_SERVER_API =
  process.env.NEXT_PUBLIC_HAS_SERVER_API === "true" ||
  Boolean(API_BASE) ||
  process.env.NEXT_PUBLIC_HAS_SERVER_API !== "false";

export const SERVER_API_UNAVAILABLE_MESSAGE =
  "Gemma 4 is served by the Cloudflare Worker (`workers/hindai-gemma`) or local `npm run dev`. Set NEXT_PUBLIC_API_BASE to the Worker URL for GitHub Pages.";
