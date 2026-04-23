# Hind AI

Hind AI is a Next.js 15 app for reading and studying Indian scriptures with a local `gemma4:latest` model running through Ollama.

It currently ships three primary AI experiences:

- `Guru AI`: explain, compare, and translate scripture concepts
- `AI quiz generation`: generate scripture-based multiple choice questions
- `Manuscript analysis API`: upload an image and ask for a brief reading

The project is optimized for local development with `gemma4:latest`, not a hosted Google API flow.

## What Works

- Local health checks report the active Ollama backend and model
- Streaming AI chat uses `gemma4:latest`
- Translation mode supports:
  - English
  - Hindi
  - Marathi
  - Bengali
  - Gujarati
  - Punjabi
  - Tamil
  - Telugu
  - Kannada
  - Malayalam
- The AI guide has separate explain, compare, and translate modes
- The root metadata/header now use the project `public/logo.png`

## Stack

- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS
- Ollama
- Gemma 4
- Upstash Redis and Ratelimit when configured

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Install and run Ollama

```bash
ollama pull gemma4:latest
ollama serve
```

### 3. Create local env

```bash
cp .env.example .env.local
```

Default local config:

```env
OLLAMA_URL=http://127.0.0.1:11434
OLLAMA_MODEL=gemma4:latest
```

### 4. Start the app

```bash
npm run dev
```

Open:

- `http://localhost:3000`
- `http://localhost:3000/ai-guide`

## AI Routes

### `GET /api/health`

Returns the active model and cache backend.

### `POST /api/ai/stream`

Streaming plain-text AI responses for the Guru AI chat surface.

Request:

```json
{
  "messages": [{ "role": "user", "content": "Explain karma yoga simply." }],
  "mode": "explain",
  "audience": "student"
}
```

### `POST /api/ai/generate`

Non-streaming structured generation used by quiz/explanation consumers.

Request:

```json
{
  "prompt": "Explain Bhagavad Gita 2.47 in simple English for a student",
  "audience": "student"
}
```

### `POST /api/ai/translate`

Translate Devanagari or Indic scripture text into supported languages.

Request:

```json
{
  "text": "असतो मा सद्गमय",
  "targetLang": "mr"
}
```

### `POST /api/ai/multimodal`

Accepts an uploaded image plus a text query.

Request:

- multipart form data
- `image`: image file
- `query`: text prompt

### `POST /api/ai/quiz`

Generates one structured multiple-choice quiz question with four options.

Request:

```json
{
  "topic": "Bhagavad Gita, Yoga Sutras, Upanishads, Ramayana, or Mahabharata"
}
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run type-check
npm run test
npm run test:e2e
```

## Repo Layout

```text
app/
  api/
  ai-guide/
  contents/
  daily/
  preface/
  quiz/
  study-paths/
src/
  components/
  lib/
  types/
public/
scripts/
  fine-tune-gemma4.py
docker/
.github/workflows/
```

## Important Files

- `src/lib/ai/gemma.ts`
  - model resolution
  - Ollama integration
  - streaming and non-stream generation
  - translation prompt handling
- `src/lib/ai/translation-languages.ts`
  - supported translation targets shared by UI and API
- `src/components/ai/ai-chat.tsx`
  - Guru AI explain / compare / translate UI
- `app/api/ai/*`
  - AI HTTP routes

## Notes

- The app prefers installed local `gemma4:latest` over slower fallback models.
- If a dev server gets stuck, restart `npm run dev`.
- `ollama_home/`, `ollama_models/`, `.next/`, and `.playwright-cli/` are local runtime artifacts and should not be treated as source folders.

## Fine-tuning Script

The experimental fine-tuning script now lives here:

```text
scripts/fine-tune-gemma4.py
```

It is not part of the runtime path for the web app.

## Verification Checklist

Before pushing:

```bash
./node_modules/.bin/tsc --noEmit
./node_modules/.bin/eslint app src
```

Recommended runtime checks:

```bash
curl http://localhost:3000/api/health
curl -X POST http://localhost:3000/api/ai/translate \
  -H 'Content-Type: application/json' \
  --data '{"text":"असतो मा सद्गमय","targetLang":"hi"}'
```

## License

See `LICENSE`.
