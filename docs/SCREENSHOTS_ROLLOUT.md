# Screenshot skill rollout

Repo-agnostic procedure for applying the **app-store-screenshots** skill, then
putting only **passing** images in a README. Pilot: `mangeshraut712/Hindai`.

## What the skill produces

The skill does **not** belong in the product app’s root (it would overwrite
`package.json`). It copies a Next.js editor from the skill’s `template/` into a
**sidecar directory**, seeds real device captures, and **Export bundle** writes
store-sized PNGs:

| Device                   | Design canvas       | README-friendly export         |
| ------------------------ | ------------------- | ------------------------------ |
| iPhone                   | 1320 × 2868         | one locale, one size if needed |
| Mac (web / desktop apps) | 2880 × 1800 (16:10) | **1440 × 900**                 |
| Android phone            | 1080 × 1920         | one size                       |

Screenshots are **ads** (one idea, framed device, short copy), not raw UI dumps.
Copy formulas live in the skill’s `copy-ideas.md`. Visual QA lives in
`style-prompts/_QUALITY_BAR.md`.

## Fetch the skill

Prefer the copy vendored on Hindai (same files this pilot used):

```bash
git clone --depth 1 https://github.com/mangeshraut712/Hindai.git /tmp/hindai-skill-src
SKILL_DIR=/tmp/hindai-skill-src/.agents/skills/app-store-screenshots
test -f "$SKILL_DIR/SKILL.md"
```

Upstream (if Hindai is unavailable):
[ParthJadhav/app-store-screenshots](https://github.com/ParthJadhav/app-store-screenshots).

**Never** `cp -R "$SKILL_DIR/template/."` into a repo that already has an app.
Always:

```bash
mkdir -p /tmp/app-store-screenshots-editor
cp -R "$SKILL_DIR/template/." /tmp/app-store-screenshots-editor/
cd /tmp/app-store-screenshots-editor
npm install   # bun if present; else npm
npx next dev -p 3002
```

Open the editor at `http://localhost:3002` (not `127.0.0.1` unless
`allowedDevOrigins` includes it).

## Decide if a repo is a fit

**Run the skill only if the repo has a real user-facing UI** you can capture
from a running app, simulator, or production URL.

| Fit                                                | Skip                                  |
| -------------------------------------------------- | ------------------------------------- |
| Web app, PWA, iOS/Android/desktop app with screens | Libraries and SDKs                    |
| Product site with interactive pages                | CLIs, scripts, infra-only repos       |
| Games / tools with a window                        | Dotfiles, configs, course notes       |
|                                                    | Research dumps, datasets, paper repos |

If there is no window to photograph, stop. Do not invent UI or metrics.

## Capture real UI

1. Run the **product** (this repo: `npm run dev`), not the screenshot editor.
2. Capture current screens only. Dismiss splash/onboarding; hide Next.js /
   Vite dev badges.
3. Match source aspect to the deck: **16:10** for Mac frames (e.g. 1920×1200);
   portrait phone for iPhone frames.
4. Drop files into the editor’s `public/screenshots/...` layout (see
   `SKILL.md` Step 2) and point `app-store-screenshots.json` at those paths.
5. Headlines: one idea, 3–5 short words per line, **no** fake ratings, user
   counts, or features the product does not have.

For a website (Hindai), seed the **Mac** tab. For a native phone app, seed
**iPhone** / **Android**.

## Quality bar (“perfect”)

An image may go in the README only if **all** of these are true:

- Correct export size for the chosen device (Mac 16:10 slots, iPhone 6.9"
  1320×2868, etc.).
- Device frame shows **today’s** UI, not a splash, placeholder, or stale crop.
- Copy is spelled correctly and matches the screen (one idea).
- No clipped headlines, blank device rectangles, or accidental transparent
  gutters.
- Style is consistent across the set (one theme). Adjacent slides do not share
  the same layout.

Fail and **do not** README-attach: wrong dimensions, mid-page crops, splash
overlays, mismatched secondary windows, fabricated proof numbers.

Isolated canvas (`connectedCanvas: false`) is correct for README galleries:
every PNG must stand alone.

## README section format

Store optimized files in-repo (WebP or compressed PNG), not the full export
zip:

```text
docs/screenshots/01-home.webp
docs/screenshots/02-….webp
```

Keep the section short (about four images). Example:

```markdown
## Screenshots

Framed captures of the live app (current UI).

<div align="center">

<img src="docs/screenshots/01-home.webp" alt="…" width="720" />

<img src="docs/screenshots/02-library.webp" alt="…" width="720" />

</div>
```

Do not paste every App Store density. One size per slide is enough for GitHub.

## Commit and PR rules (this org)

- One PR per product repo.
- Commits **sole-authored** as `Mangesh Raut <mbr63@drexel.edu>`.
- Strip any `Co-authored-by: Cursor Agent` (or similar) trailers before push.
- Do not commit the screenshot **editor** into the product repo.
- Do not commit unused 2880×1800 / 6.9" bundles; they bloat git.
- Keep CI green (`format`, `lint`, `type-check`, tests as that repo requires).

## Suggested pass over Mangesh’s GitHub

1. List repos (`gh repo list mangeshraut712 --limit 100`).
2. Classify fit vs skip using the table above.
3. For each **fit** repo: sidecar editor, live captures, QA, README section,
   rollout-compliant commits.
4. Skip everything without a runnable UI.

Hindai is the template: Mac 1440×900 WebP under `docs/screenshots/`, README
**Screenshots** section, this file as the shared playbook.
