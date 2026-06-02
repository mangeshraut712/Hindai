# Contributing to Hind AI

Thank you for your interest in contributing to **Hind AI** — your AI-powered digital
Gurukul for ancient Indian scriptures. Whether you're a developer, designer, Sanskrit
scholar, or simply a spiritual seeker, your contributions are welcome.

> 🙏 _सर्वे भवन्तु सुखिनः_ — May all beings be happy.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## 🤝 Code of Conduct

This project is rooted in respect, inclusivity, and reverence for the wisdom it
preserves. By participating, you agree to:

- Be welcoming and patient with newcomers.
- Respect all cultural, religious, and philosophical backgrounds.
- Refrain from harassment, hate speech, or discriminatory language of any kind.
- Give and receive constructive feedback gracefully.

Violations may result in temporary or permanent removal from the project.

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js** ≥ 20.0.0 (LTS recommended — use `nvm use` if you have [nvm](https://github.com/nvm-sh/nvm))
- **npm** ≥ 9.0.0 (or pnpm/yarn — but `package-lock.json` is the source of truth)
- **Git** ≥ 2.30

### 2. Fork & Clone

```bash
git clone https://github.com/<your-username>/Hindai.git
cd Hindai
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Fill in the required values (most importantly `OPENROUTER_API_KEY`).

### 5. Start the Development Server

```bash
npm run dev
```

Open <http://localhost:3000> in your browser.

---

## 🛠️ Development Workflow

### Available Scripts

| Script                 | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Start the local dev server on port 3000            |
| `npm run build`        | Produce a production build (verifies types + lint) |
| `npm run start`        | Serve the production build                         |
| `npm run lint`         | Run TypeScript, Prettier, and quality checks       |
| `npm run type-check`   | Strict TypeScript check (`tsc --noEmit`)           |
| `npm run format`       | Format all files with Prettier                     |
| `npm run format:check` | Verify formatting without writing                  |
| `npm run test:e2e`     | Run Playwright E2E tests                           |
| `npm run security`     | Run an `npm audit`                                 |

### Recommended Branch Naming

Use the following prefix conventions:

- `feat/<short-description>` — new features
- `fix/<short-description>` — bug fixes
- `chore/<short-description>` — tooling or maintenance
- `docs/<short-description>` — documentation-only
- `refactor/<short-description>` — refactors with no behavior change
- `test/<short-description>` — adding or fixing tests

Example: `feat/sanskrit-verse-filters`

---

## 📂 Project Structure

```
app/                # Next.js 15 App Router (pages, layouts, API routes)
  api/              # Backend API endpoints
  [slug]/           # Dynamic scripture pages
src/
  components/       # Reusable React components
  lib/              # Server-side helpers, AI, Sanskrit, data
  types/            # Shared TypeScript types
  integrations/     # Third-party integrations (Supabase, etc.)
public/             # Static assets (images, manifest, sw.js)
e2e/                # Playwright E2E tests
scripts/            # Build/utility scripts
```

For a deeper tour, see the [README](./README.md).

---

## 📏 Coding Standards

- **TypeScript strict mode is required** — no `any` unless absolutely justified.
- Use **ESLint + Prettier** — they are enforced at build time. Run `npm run lint`
  before opening a PR.
- Prefer **functional, declarative React** — hooks over class components when possible.
- Use **`cn(...)`** from `@/lib/utils` for conditional class names.
- Keep components **small and focused**. If a component exceeds ~300 lines, split it.
- **Accessibility matters** — use semantic HTML, ARIA labels, and keyboard
  navigation. Always test with reduced motion enabled.
- Respect **`prefers-reduced-motion`** when adding animations.
- Add **JSDoc comments** for exported functions and components where the intent
  isn't obvious.

### Styling

- We use **Tailwind CSS** with custom design tokens (see `src/index.css`).
- Avoid inline `style={{ ... }}` unless driven by dynamic values.
- Reuse the design system — colors, radii, shadows — defined as CSS variables.

### AI & Prompting

- Keep prompts in `src/lib/ai/` and `src/lib/ai/gemma.ts`.
- Use the **OpenRouter** abstraction — don't call the API directly from components.
- Always include a graceful fallback for users without an API key.

---

## 📝 Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

<optional body>

<optional footer>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`.

Examples:

- `feat(ai-chat): add streaming citations`
- `fix(header): resolve mobile menu focus trap`
- `docs(readme): update deployment instructions`

---

## ✅ Pull Request Process

1. **Sync with `main`** — rebase or merge before opening the PR.
2. **Run all checks** locally:
   ```bash
   npm run lint
   npm run build
   npm run test:e2e   # if your change affects UI
   ```
3. **Describe the change** clearly in the PR template, including:
   - The **problem** it solves
   - **Screenshots / screen recordings** for UI changes
   - **Linked issues** (e.g., `Closes #42`)
4. **Keep PRs focused** — small, atomic changes are easier to review.
5. **Wait for review** — at least one maintainer approval is required.
6. **Squash & merge** once approved.

A CI pipeline will automatically run type-checks, lint, and a build on your PR.

---

## 🐛 Reporting Bugs

Found a bug? Please use the GitHub issue template. Include:

- A clear, descriptive title
- Steps to reproduce
- Expected vs. actual behavior
- Browser/OS/device info
- Screenshots or screen recordings when applicable
- Console errors (if any)

---

## 💡 Suggesting Features

We love thoughtful feature requests! Please open an issue with:

- A clear description of the problem you're trying to solve
- Your proposed solution (or a few alternatives)
- Any visual/UX mockups
- Why this benefits the broader user base

---

## 🙏 A Note on Cultural Sensitivity

This project curates sacred material that is meaningful to millions of people.
Please be thoughtful when:

- Translating verses — work with the source in `IAST` or `Devanagari` carefully
- Naming features — Sanskrit/Devanagari terms should be properly diacritized
- Commenting in code — use English for code, but consider adding the original
  Sanskrit term in comments where it helps context

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the
[Creative Commons Attribution 4.0 International (CC-BY 4.0)](./LICENSE).

---

**धन्यवाद** — Thank you for helping make ancient wisdom accessible to the world. 🙏
