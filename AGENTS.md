# AGENTS.md — Hind AI

Guidance for coding agents working in this repo.

## Shape of the system

- **Static-first Next.js 15.5 / React 19.2 app** exported to GitHub Pages
  (`npm run build:pages`). Scripture, tirtha, festivals, katha, Panchanga and study UI must keep
  working fully offline in that export.
- **Model calls go through `workers/hindai-gemma`** (Cloudflare Worker, Workers AI Gemma 4, optional
  OpenRouter 31B). The static site never holds a model API key.
- Layering: routes / UI / domain / Worker — see `docs/engineering.md`.

## Setup and checks

```bash
npm install                # Node >= 20, npm 11
npm run dev
npm run type-check && npm run lint && npm run test
npm run test:e2e           # Playwright
npm run build:pages        # must succeed: it is the deploy artifact
npm run worker:dev         # wrangler dev for the Gemma worker
```

## Hard rules

1. **Do not break the static export.** Anything needing a server or a secret belongs in the Worker.
2. **Grounding over fluency.** Answers cite scripture sources already in the repo; do not add
   ungrounded generated content to the corpus.
3. **Escape user and scripture text in Vedic-accent rendering** (XSS fixes already landed; keep them).
4. Keep rate limiting (Upstash) on the Worker path; do not expose an unmetered model endpoint.
5. Run `react-doctor` (`npm run doctor`) after React changes; hydration warnings are regressions.
