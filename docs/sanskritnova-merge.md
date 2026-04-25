# SanskritNova to HindAI Merge

## Comparison

HindAI is the canonical app:

- Next.js 15, React 19, TypeScript, Tailwind
- Existing Gemma 4 runtime in `src/lib/ai/gemma.ts`
- Scripture library, AI guide, verse generation, quiz, study paths, PWA, Vercel deployment

SanskritNova contributed product surfaces:

- Sanskrit tutor modes: learn, translate, analyze, grounded
- Devanagari to IAST transliteration
- Guided Sanskrit learning tracks
- Optional Python/FastAPI/OpenRouter/RAG deployment stack

The merged direction is to keep HindAI's stack and Gemma 4 runtime, then port SanskritNova's user-facing features into HindAI. The separate SanskritNova Python/OpenRouter deployment is not needed for the merged app.

## What Was Merged

- `/sanskrit-nova` now exposes SanskritNova as a HindAI Sanskrit Studio.
- `/api/sanskrit/chat` routes Sanskrit tutor prompts through HindAI Gemma 4.
- `/api/sanskrit/transliterate` preserves the Devanagari to IAST workflow.
- `/api/sanskrit/tracks` exposes guided Sanskrit tracks.
- Legacy SanskritNova API paths are preserved:
  - `/api/chat`
  - `/api/transliterate`
  - `/api/tracks`
  - `/api/info`
  - `/api/grounded-answer`
  - `/api/agentic-answer`
- Header, footer, and sitemap now point to the merged surface.

## Cross-Check Result

| SanskritNova feature               | HindAI status                                              |
| ---------------------------------- | ---------------------------------------------------------- |
| Tutor learn mode                   | Merged in `/sanskrit-nova` and `/api/sanskrit/chat`        |
| Translate mode                     | Merged through Gemma 4 Sanskrit chat                       |
| Analyze mode                       | Merged through Gemma 4 Sanskrit chat                       |
| Grounded mode                      | Merged through HindAI scripture-aware Gemma 4 route        |
| Agentic mode                       | Merged as a Gemma 4 study-agent flow, not LangGraph/Python |
| Devanagari to IAST transliteration | Merged with canonical and legacy API routes                |
| Recent transliteration examples    | Merged in the HindAI page                                  |
| Speak/copy/clear transliteration   | Merged in the HindAI page                                  |
| Guided tracks                      | Merged with English and Hindi labels                       |
| Hindi language toggle              | Merged in the HindAI Sanskrit Studio                       |
| Python/FastAPI/OpenRouter stack    | Intentionally not merged; HindAI Gemma 4 is canonical      |
| Docker/Kubernetes/Netlify stack    | Intentionally not merged; HindAI deployment remains Vercel |

The intentionally skipped pieces were infrastructure duplicates, not user-facing learning features. Keeping them out avoids two AI backends, two deployment models, and two API contracts inside one app.

## Final Repo Cleanup Steps

Run these after reviewing and pushing HindAI:

```bash
git status
npm run type-check
npm run build
git add .
git commit -m "Merge SanskritNova features into HindAI"
git push origin main
```

Then preserve the old project before deletion:

```bash
git clone --mirror https://github.com/mangeshraut712/SanskritNova.git SanskritNova.git
```

On GitHub, delete or archive `mangeshraut712/SanskritNova` only after HindAI production is verified. Deleting is permanent from the normal GitHub UI path, so archiving first is safer if there are open issues, stars, releases, or traffic.
