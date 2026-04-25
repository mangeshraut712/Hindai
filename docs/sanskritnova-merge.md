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
- Header, footer, and sitemap now point to the merged surface.

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
