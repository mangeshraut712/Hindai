# Hind AI engineering

Hind AI is a Next.js 15 App Router site with a static GitHub Pages export and a Cloudflare Worker for Gemma. New work must fit this layout. Do not invent parallel stacks.

## Layers

| Layer | Lives in | Responsibility |
| --- | --- | --- |
| Routes | `app/` | Pages, metadata, static params. Keep page files thin. |
| UI | `src/components/` | Presentation and interaction. No network SDKs, no scripture catalogs. |
| Domain | `src/lib/data/`, `src/lib/scripture/`, `src/lib/sanskrit/` | Catalogs, readers, transliteration, local indexes. |
| AI gateway | `src/lib/ai/`, `workers/hindai-gemma/` | Gemma only. Browser `appFetch` uses the Worker by default (`NEXT_PUBLIC_API_BASE`). Local `app/api` is for OpenRouter when that env is set empty and a key is present. |
| Hosting | `scripts/build-github-pages.js`, `workers/` | Pages cannot run `app/api`. Worker mirrors the routes the static site needs. |

## Rules

- One responsibility per module. A folio UI does not own TTS HTTP details; a catalog does not render React.
- Names must say what the value is. Avoid `data`, `tmp`, `handleClick` without the object they act on.
- Functions stay small. If a component grows past about 300 lines, split data loading, speech, and view.
- TypeScript stays strict. No `any` unless the PR explains why a typed boundary is impossible.
- Public routes for GitHub Pages must be statically renderable. Do not `await searchParams` in `app/**/page.tsx`.
- Tests live next to the domain they prove (`*.test.ts`) and are picked up by `npm test`. UI flows that users can break need Playwright coverage under `e2e/`.
- Refactor without changing behavior. Do not leave commented-out code or unused files.
- Secrets stay in environment variables and Worker secrets. Never commit API keys.

## Commands

```bash
npm run type-check
npm test
npm run lint
npm run build:pages
```

CI (`.github/workflows/ci.yml`) runs quality, unit tests, and the Pages export. `.github/workflows/pages.yml` deploys `main`.
