# 🕉️ Hind AI - Ancient Wisdom Meets Modern AI {#top}

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=for-the-badge&logo=typescript)
![Next.js](https://img.shields.io/badge/Next.js-15.5.15-saffron?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.5-blue?style=for-the-badge&logo=react)
![OpenRouter](https://img.shields.io/badge/OpenRouter-Gemma%204-gold?style=for-the-badge&logo=openrouter)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-green?style=for-the-badge&logo=node.js)
![License](https://img.shields.io/badge/License-CC--BY--4.0-lightgrey?style=for-the-badge)

  <img src="public/logo.png" alt="Hind AI Logo" width="150" />

**🧘‍♂️ Your AI Guru for Ancient Wisdom | ज्ञान से मोक्ष तक (From Knowledge to Liberation)**

[![Live Demo](https://img.shields.io/badge/Live-Demo-Visit-blue?style=for-the-badge)](https://mangeshraut712.github.io/Hindai/)
[![GitHub Stars](https://img.shields.io/github/stars/mangeshraut712/Hindai?style=for-the-badge)](https://github.com/mangeshraut712/Hindai)
[![GitHub Issues](https://img.shields.io/github/issues/mangeshraut712/Hindai?style=for-the-badge)](https://github.com/mangeshraut712/Hindai/issues)

</div>

## 🏠 Home Page Preview

<div align="center">

![Home Page](public/Home.png)

**Experience the modern interface for ancient wisdom**

</div>

---

## 📖 Overview

**Hind AI** is a cutting-edge AI-powered spiritual learning platform that democratizes access to ancient Indian wisdom using **Google Gemma 4 via OpenRouter**. Our platform features advanced RAG pipelines, multimodal Sanskrit analysis, function calling tools, and comprehensive scripture analysis.

> **"सत्यमेव जयते · नमस्ते · ॐ"** - Truth Alone Triumphs · Welcome · Om

### 🎯 Key Highlights

- **🤖 AI-Powered**: Google Gemma 4 via Cloudflare Worker (Workers AI) with optional OpenRouter 31B
- **📚 Scripture Library**: Vedas, 108 Upanishads, 18 Puranas, Epics, Gita, and 30+ additional texts
- **🗺️ Culture & Tirtha**: Mahadev (12 Jyotirlingas), Devi peethas, Vishnu Char Dham, Ganesha Ashtavinayak — mapped with honest list-status labels
- **🪔 Festivals encyclopedia**: Deep utsav pages (origin → living practice → temple do/don’t) with Panchanga dates derived from one catalog
- **📖 Katha grantha**: Book-depth stories for Mahadev, Devi, Vishnu, and Ganesha
- **🕉️ Shivlilamrit**: Numbered pothi reader with recitation support
- **🔤 Sanskrit Tools**: Transliteration, sandhi, morphology, vibhakti, Vedic accents
- **☁️ Static-first live site**: GitHub Pages serves scripture, tirtha, festivals, katha, Panchanga, and study UI. Gemma goes through `workers/hindai-gemma`.
- **⚡ Modern Stack**: Next.js 15.5, React 19.2, TypeScript 5.9, Node.js >=20.0
- **🧱 Engineering**: Layered routes / UI / domain / Worker. See [docs/engineering.md](./docs/engineering.md).

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/mangeshraut712/Hindai.git
cd Hindai

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local

# Start development server
npm run dev

# Open http://localhost:3000
```

The public demo at [mangeshraut712.github.io/Hindai](https://mangeshraut712.github.io/Hindai/) is a static export. Scripture, tirtha, festivals, and katha run fully offline in the Pages build. Gemma chat goes to the durable Cloudflare Worker in `workers/hindai-gemma` (Workers AI `@cf/google/gemma-4-26b-a4b-it`, optional OpenRouter 31B).

Useful local commands:

```bash
npm run type-check
npm test
npm run lint
npm run build:pages
```

---

## 🆕 What's New (September 2026) — Culture platform depth

### Tirtha, festivals, and honest katha

- **Places by tradition** — `/mahadev`, `/devi`, `/vishnu`, `/ganesha` with South Asia map pins, deep place articles, and tradition primers (`tradition-deep`).
- **Festivals encyclopedia** — `/festivals` and `/festivals/[slug]` with katha vs living custom vs civil-date labels; Buddha Purnima marked Buddhist; miracle-claim calendar copy removed.
- **Single festival source** — Panchanga thin cards derive from `src/lib/data/utsav.ts` only (no parallel EXTRA list).
- **Katha grantha** — `/katha` book-depth stories for four deities.
- **Shivlilamrit** — pothi + print-edition reading paths kept in the Practice nav.
- **Artist impressions** — AI art under `public/{festivals,devi,ganesha,vishnu,mahadev,jyotirlingas,...}` with ATTRIBUTION files; never sold as temple photography.
- **Truth hygiene** — peetha list-status (`peetha-common` / `peetha-disputed` / `major-yatra`); Vaishno Devi not forced into the classical 51.
- **Engineering** — layered routes / UI / domain documented in [docs/engineering.md](./docs/engineering.md); Cursor rule in `.cursor/rules/long-term-engineering.mdc`.

### Earlier releases (condensed)

Hosting moved off paused Vercel onto **GitHub Pages + Cloudflare Worker** (2026). Prior work also covered Sadhana / Panchanga, React Doctor / hydration fixes, XSS escaping in Vedic accent rendering, Sanskrit linguistic tools, and CI quality gates (`tsc`, lint, Pages export). See git history for full changelogs.

---

## ✨ Core Features

### 🗺️ Culture, Tirtha & Festivals

- **South Asia tirtha map** — Jyotirlingas, peethas, Char Dham, and Ashtavinayak on one basemap (`/pilgrimage`)
- **Tradition homes** — `/mahadev`, `/devi`, `/vishnu`, `/ganesha` with deep articles and primers
- **Festivals encyclopedia** — `/festivals/[slug]` covers katha, living practice, temple etiquette, do/don’t, sources
- **Katha grantha** — `/katha/{mahadev,devi,vishnu,ganesha}` for longer on-platform reading
- **Truth labels** — katha vs custom vs civil dates; peetha list-status; AI art captioned as artist impressions
- **Panchanga link-through** — thin calendar cards deep-link into the utsav encyclopedia

### 🤖 Vedic AI Scholar - Advanced Spiritual Chatbot

- **Gemma 4 31B Powered**: Google AI model via OpenRouter with enhanced capabilities (~3s response time)
- **Conversational Interface**: Deep theological discourse on Vedas, Upanishads, Bhagavad Gita, Puranas
- **Streaming Responses**: Real-time AI responses with context window management
- **Expert Knowledge Base**: Comprehensive understanding of Hindu philosophy, Sanskrit grammar, Dharma, Karma, Moksha
- **Scriptural References**: Context-aware citations from authentic sources
- **Quick Questions**: Pre-built questions for common inquiries about Hindu philosophy
- **Copy Functionality**: Easy copying of AI responses for reference
- **Conversation Management**: Clear conversation to start fresh
- **Cultural Authenticity**: Proper pronunciation and traditional terminology
- **Multilingual Support**: Sanskrit, Hindi, and English explanations

### 🖼️ Multimodal Scriptural Analysis

- **Image Upload**: Drag-and-drop support for sacred text images, iconography, temple architecture
- **Gemma 4 Vision**: AI-powered Sanskrit character recognition and OCR
- **Iconography Recognition**: Identify deities, symbols, and sacred imagery
- **Temple Architecture**: Analyze temple structures, sculptures, and architectural elements
- **Ritual Object Identification**: Identify yantras, mandalas, and ritual objects
- **Custom Queries**: Ask specific questions about uploaded images
- **Sample Queries**: Pre-built queries for common use cases
- **Copy Functionality**: Easy copying of analysis results
- **Research Tool**: Academic analysis of ancient Indian texts and art

### 🧘 Smart Dharma Guide

- **Personalized Guidance**: AI-powered spiritual guidance based on user inquiries
- **Category Selection**: Daily Rituals, Meditation, Fasting, Mantra Practice, Pilgrimage, Festivals
- **Streaming Responses**: Real-time guidance with context-aware recommendations
- **Knowledge Base**: Vratas, Samskaras, Yajnas, Homas, Tirtha Yatra, Sadhana, Hindu festivals
- **Quick Guides**: Pre-built guides for common spiritual practices
- **Context-Aware**: Recommendations based on selected category
- **Disclaimers**: Proper guidance for practices requiring qualified teachers
- **Traditional Wisdom**: Balance traditional wisdom with contemporary understanding

### 📚 Digital Granthalaya - Scripture Library

- **Canonical Scope**: 18 Puranas + 4 Vedas + 108 Upanishads + Bhagavad Gita + 30+ additional texts
- **AI-Powered Search**: Semantic search with vector similarity using Upstash Vector
- **Multilingual**: Sanskrit (Devanagari) + Roman transliteration + English + Hindi
- **Interactive Study**: Verse-by-verse AI explanations and commentary
- **Rigveda Navigation**: Mandala and Sukta-based navigation
- **Verse Generation**: On-demand AI generation for missing verses
- **Verse Reader**: Multiple modes (Chapter, Verse, Listen, Study) for flexible reading
- **Commentary**: Multi-school commentary with Acharya-specific interpretations

### 🖼️ Multimodal Sanskrit Manuscript Analysis

- **Image Upload**: Support for JPG/PNG/WebP ancient manuscript images
- **Gemma 4 Vision**: AI-powered Sanskrit character recognition and OCR
- **Contextual Analysis**: Understanding of historical script variations
- **Research Tool**: Academic analysis of ancient Indian texts
- **Document Processing**: Batch processing for large manuscript collections
- **Secure Processing**: Safe object URL management with proper cleanup

### 🎨 Sacred Geometry & Design

- **Sacred Geometry Components**: Sri Yantra, Mandala, Lotus patterns with animations
- **Sophisticated Color Palette**: Sacred colors (saffron, vermilion, gold, indigo, peacock)
- **Light/Dark Mode**: Enhanced contrast and readability in both modes
- **Timeless Design**: Ancient aesthetic elegance with modern web performance
- **Responsive UI**: Mobile-optimized with haptic feedback

### 🧭 Personalized Learning Experience

- **Adaptive Quizzes**: AI-generated questions based on learning progress
- **Study Paths**: Curated learning journeys (Veda → Upanishad → Gita)
- **Progress Analytics**: Personalized spiritual development metrics
- **Audio Features**: Voice-guided meditation and Sanskrit pronunciation
- **Meditation Timer**: Built-in meditation timer with breathing guidance
- **Sanskrit Learning**: Flashcards, spaced repetition, and guided tracks
- **Panchanga**: Hindu calendar with festivals and auspicious dates
- **I18n Support**: Internationalization for multiple languages

---

## 🛠️ Tech Stack (2026)

### Core Framework

| Technology     | Version | Purpose                                       |
| -------------- | ------- | --------------------------------------------- |
| **Next.js**    | 15.5.15 | React framework with App Router & RSC         |
| **React**      | 19.2.5  | UI library with concurrent features & Actions |
| **TypeScript** | 5.9.3   | Type-safe JavaScript development              |
| **Node.js**    | >=20.0  | JavaScript runtime with ESM support           |

### AI & Machine Learning

| Technology        | Purpose                               |
| ----------------- | ------------------------------------- |
| **Gemma 4 31B**   | Google AI model via OpenRouter API    |
| **OpenRouter**    | Cloud AI inference platform           |
| **Upstash Redis** | Caching, rate limiting & vector store |
| **Supabase**      | Database & real-time subscriptions    |

### UI & Styling

| Technology                   | Purpose                          |
| ---------------------------- | -------------------------------- |
| **Tailwind CSS**             | Utility-first CSS framework      |
| **shadcn/ui**                | Accessible component library     |
| **Framer Motion**            | Animation library with GPU hints |
| **Radix UI**                 | Low-level UI primitives          |
| **Lucide React**             | Modern icon library              |
| **cmdk**                     | Command palette for navigation   |
| **next-themes**              | Dark mode with system preference |
| **class-variance-authority** | Component variant management     |

### State & Data

| Technology             | Purpose                      |
| ---------------------- | ---------------------------- |
| **TanStack Query**     | Data fetching & server state |
| **Zod**                | Runtime schema validation    |
| **@upstash/ratelimit** | API rate limiting            |

### Sanskrit & Linguistic Tools

| Technology                         | Purpose                       |
| ---------------------------------- | ----------------------------- |
| **indic-transliteration**          | Sanskrit script conversion    |
| **Vidyut**                         | Sandhi splitting & morphology |
| **Anvaya**                         | Prose word order analysis     |
| **Vedic Heritage Portal**          | Vedic audio integration       |
| **IIT Bombay Vedic Accent Engine** | Pitch accent analysis         |
| **Google Cloud TTS**               | Sanskrit audio synthesis      |

### Development & Testing

| Technology     | Purpose                                             |
| -------------- | --------------------------------------------------- |
| **Playwright** | E2E testing with multi-browser                      |
| **lint-check** | TypeScript, Prettier, and basic code quality checks |
| **Prettier**   | Code formatting with Tailwind plugin                |

### Performance & Monitoring

| Technology                 | Purpose                                         |
| -------------------------- | ----------------------------------------------- |
| **GitHub Pages + CI**      | Static export verified on every `main` push     |
| **Cloudflare Worker logs** | Gemma gateway observability                     |
| **Playwright**             | E2E coverage for culture and study flows        |

### Infrastructure

| Technology            | Purpose                                      |
| --------------------- | -------------------------------------------- |
| **GitHub Pages**      | Static site export and public hosting        |
| **Cloudflare Worker** | Gemma gateway (`workers/hindai-gemma`)       |
| **GitHub Actions**    | CI quality gates and Pages deploy on `main`  |

---

## 📂 Project Structure

```
Hindai/
├── app/                         # Next.js App Router (thin pages)
│   ├── api/                     # Local AI/Sanskrit routes (not on Pages)
│   ├── mahadev|devi|vishnu|ganesha/  # Tradition homes + [slug] articles
│   ├── festivals/               # Utsav encyclopedia
│   ├── katha/                   # Book-depth grantha
│   ├── pilgrimage/              # South Asia tirtha map
│   ├── shivlilamrit/            # Pothi + print reading
│   ├── panchanga|sadhana|…      # Practice & study routes
│   └── sitemap.ts
├── src/
│   ├── components/              # UI (tirtha, utsav, katha, shivlilamrit, …)
│   └── lib/
│       ├── data/                # Catalogs: utsav, peethas, jyotirlingas, …
│       ├── ai/                  # Gemma client helpers
│       ├── panchanga/           # Thin calendar derived from utsav
│       └── site-nav.ts          # Header + Footer nav source of truth
├── public/                      # Artist impressions + ATTRIBUTION.txt
├── workers/hindai-gemma/        # Production Gemma Worker
├── scripts/                     # Pages build, basemap, lint, tests
├── e2e/                         # Playwright
├── docs/engineering.md
└── .cursor/rules/long-term-engineering.mdc
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    HIND AI ARCHITECTURE                        │
│              Ancient Wisdom + Modern AI Stack (2026)           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   FRONTEND   │  │   BACKEND    │  │   AI LAYER   │        │
│  │              │  │              │  │              │        │
│  │  Next.js 15  │  │  Next.js API │  │  Gemma 4 31B │        │
│  │  React 19    │  │  Serverless  │  │  OpenRouter  │        │
│  │  TypeScript  │  │  RSC/SSR     │  │  Cloud API   │        │
│  │  Tailwind    │  │  API Routes  │  │  Streaming   │        │
│  │  Framer Motion│ │              │  │  Function    │        │
│  └──────────────┘  └──────────────┘  │  Calling     │        │
│                                       └──────────────┘        │
│  ┌──────────────┐  ┌──────────────┐                           │
│  │  CACHE LAYER │  │  DATA LAYER  │                           │
│  │              │  │              │                           │
│  │  Upstash Redis│  │  Scripture   │                           │
│  │  Rate Limit  │  │  Metadata    │                           │
│  │  Vector Store│  │  Verses      │                           │
│  │  Session     │  │  Translations│                           │
│  └──────────────┘  │  Supabase    │                           │
│                     └──────────────┘                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │  PERFORMANCE │  │  LINGUISTIC  │  │  MONITORING  │        │
│  │              │  │              │  │              │        │
│  │  Dynamic     │  │  Indic       │  │  Vercel      │        │
│  │  Imports     │  │  Translit    │  │  Analytics   │        │
│  │  CSS Hints   │  │  Vidyut      │  │  Speed       │        │
│  │  Font Opt    │  │  Anvaya      │  │  Core Web    │        │
│  │  Cache Strat │  │  Vedic Audio │  │  Vitals      │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │  DEPLOYMENT  │  │    CI/CD     │  │  TESTING     │        │
│  │              │  │              │  │              │        │
│  │  Vercel      │  │  GitHub      │  │  Playwright  │        │
│  │  Serverless  │  │  Actions     │  │  Playwright  │        │
│  │  Global CDN  │  │  Automated   │  │  E2E Tests   │        │
│  │  ISR/SSG     │  │  Checks      │  │  Smoke Tests │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
└─────────────────────────────────────────────────────────────────┘
```

### Key Principles

- **Performance-First**: Dynamic imports, CSS hints, font optimization, and caching strategies
- **Streaming-First**: Real-time AI responses with efficient streaming
- **Edge-Optimized**: Global deployment with Vercel Edge Network
- **AI-Centric**: Every interaction enhanced with Gemma 4 AI capabilities
- **Progressive Enhancement**: Graceful degradation without JavaScript
- **Accessibility-First**: Reduced motion support, ARIA labels, keyboard navigation
- **Linguistic-Aware**: Comprehensive Sanskrit tools (transliteration, sandhi, morphology)

---

## 🔧 Configuration

### Environment Variables

```env
# ==========================================
# REQUIRED: OpenRouter API for Gemma 4
# ==========================================
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=google/gemma-4-31b-it:free
OPENROUTER_URL=https://openrouter.ai/api/v1

# ==========================================
# OPTIONAL: Upstash Redis (Recommended for Production)
# ==========================================
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# ==========================================
# OPTIONAL: Analytics
# ==========================================
VERCEL_ANALYTICS_ID=your_vercel_analytics_id
```

### GitHub Pages (production)

The public site is a Next.js static export on GitHub Pages:

- Live URL: [https://mangeshraut712.github.io/Hindai/](https://mangeshraut712.github.io/Hindai/)
- Build: `npm run build:pages` (`output: 'export'`, `basePath: '/Hindai'`)
- Deploy: `.github/workflows/pages.yml` on push to `main`

**Static export blockers (not available on GitHub Pages):**

- App Router `/api/*` Route Handlers (Node/serverless only). The Pages build stashes `app/api` so `next build` can export HTML. Use `next dev` for local API work.
- `next.config.js` `headers()` (unsupported with `output: 'export'`)
- Next.js image optimization (Pages uses `images.unoptimized: true`)
- AI streaming, chat, quiz, panchanga JSON, and similar `/api` features return 404 on Pages

```bash
npm run build:pages
npx --yes serve@14 out
```

### Local AI / OpenRouter

1. **Create an OpenRouter API key**
2. **Set environment variables** (used by `next dev`, not by GitHub Pages):
   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key
   OPENROUTER_MODEL=google/gemma-4-31b-it:free
   OPENROUTER_URL=https://openrouter.ai/api/v1
   ```

---

## 📜 API Documentation

### POST `/api/ai/chat`

Generate streaming Gemma 4 responses for conversational AI.

**Request:**

```json
{
  "messages": [
    {
      "role": "user",
      "content": "What is the concept of Dharma in Hinduism?"
    }
  ],
  "stream": true,
  "temperature": 0.7,
  "maxTokens": 4096
}
```

**Response:** Server-Sent Events (SSE) streaming

### POST `/api/ai/vision`

Analyze images of sacred texts, iconography, or temple architecture.

**Request:** FormData with image file and query

```json
{
  "image": "base64_encoded_image",
  "query": "Identify the deity and explain the iconography"
}
```

**Response:**

```json
{
  "analysis": "Detailed AI analysis of the image...",
  "query": "Identify the deity and explain the iconography",
  "imageType": "image/png",
  "imageSize": 1234567
}
```

### POST `/api/ai/dharma`

Generate personalized spiritual guidance.

**Request:**

```json
{
  "query": "What should I include in my daily spiritual practice?",
  "context": "User is interested in Daily Rituals",
  "preferences": {
    "category": "Daily Rituals"
  }
}
```

**Response:** Server-Sent Events (SSE) streaming

### POST `/api/ai/generate`

Generate Gemma 4 explanation for verses or scripture questions.

**Request:**

```json
{
  "prompt": "Explain Bhagavad Gita 2.47 in simple English",
  "scriptureId": "bhagavad-gita",
  "chapter": 2,
  "verse": 47
}
```

**Response:**

```json
{
  "response": {
    "explanation": "Detailed AI analysis...",
    "context": "Historical background...",
    "keyTerms": [
      {
        "term": "dharma",
        "meaning": "Righteous duty",
        "sanskrit": "धर्म"
      }
    ],
    "references": [
      {
        "scripture": "Bhagavad Gita",
        "chapter": 2,
        "verse": 47
      }
    ]
  },
  "cached": false,
  "model": "gemma4:latest",
  "mock": false
}
```

### POST `/api/ai/verse-generate`

Generate complete verse data using Gemma 4 AI.

**Request:**

```json
{
  "scriptureId": "bhagavad-gita",
  "scriptureName": "Bhagavad Gita",
  "chapter": 2,
  "verse": 48,
  "speaker": "Krishna",
  "context": "Karma Yoga teaching"
}
```

**Response:**

```json
{
  "verse": {
    "id": "bg-2-48",
    "scriptureId": "bhagavad-gita",
    "chapter": 2,
    "verse": 48,
    "sanskrit": "योगस्थः कुरु कर्माणि...",
    "transliteration": "yoga-sthaḥ kuru karmāṇi...",
    "translation": {
      "en": "Perform your duty equipoised...",
      "hi": "योग में स्थित होकर कर्म करो..."
    },
    "wordByWord": [
      { "sanskrit": "योगस्थः", "iast": "yoga-sthaḥ", "meaning": "established in yoga" }
    ],
    "keyTerms": ["Karma Yoga", "Equipoise", "Duty"],
    "speaker": "Krishna"
  },
  "generated": true,
  "model": "gemma4:latest"
}
```

### POST `/api/ai/multimodal`

Analyze Sanskrit manuscript images with Gemma 4 Vision.

**Request:**

```json
{
  "image": "base64_encoded_image",
  "query": "What does this Sanskrit text say?"
}
```

### POST `/api/ai/stream`

Real-time streaming responses for interactive guidance.

### Sanskrit Linguistic APIs

#### POST `/api/sanskrit/transliterate`

Convert Sanskrit text between different scripts.

**Request:**

```json
{
  "text": "योगस्थः कुरु कर्माणि",
  "fromScript": "Devanagari",
  "toScript": "IAST"
}
```

**Response:**

```json
{
  "original": "योगस्थः कुरु कर्माणि",
  "converted": "yoga-sthaḥ kuru karmāṇi",
  "originalScript": "Devanagari",
  "targetScript": "IAST"
}
```

#### POST `/api/sanskrit/sandhi`

Split Sanskrit text into words using sandhi analysis.

#### POST `/api/sanskrit/vibhakti`

Analyze grammatical cases and declensions.

#### POST `/api/sanskrit/vedic-accents`

Analyze Vedic pitch accents for proper chanting.

### Audio APIs

#### POST `/api/audio/tts`

Generate Sanskrit audio using Google Cloud TTS.

#### POST `/api/audio/vedic-heritage`

Get Vedic audio recitations from Vedic Heritage Portal.

### Scripture APIs

#### GET `/api/bhagavad-gita`

Get Bhagavad Gita verses and metadata.

#### GET `/api/mahabharata`

Get Mahabharata chapters and verses.

#### GET `/api/ramayana`

Get Ramayana chapters and verses.

#### GET `/api/puranas`

Get Purana texts and metadata.

#### GET `/api/upanishads`

Get Upanishad texts and metadata.

---

## 🧪 Testing

### Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run TypeScript, Prettier, and basic quality checks
npm run type-check       # TypeScript strict mode check
npm run format           # Prettier formatting
npm run test             # Placeholder until unit tests are configured
npm run test:e2e         # Run Playwright E2E tests on port 3100
npm run analyze          # Bundle analysis
npm run security         # Security audit
```

### Quality Status

- ✅ TypeScript: 0 errors, strict mode passing
- ✅ Lint: Custom `lint-check` script validates TypeScript, Prettier, and basic code quality
- ✅ Build: 66 app routes generated successfully
- ✅ Tests: No unit test suite configured yet; E2E coverage is handled by Playwright
- ✅ E2E Tests: Playwright coverage for critical user flows across 7 spec files
- ✅ Prettier: All files formatted with Tailwind plugin
- ✅ Security: Audit available via `npm run security`
- ✅ Performance: Dynamic imports, scoped motion, font loading, static asset caching
- ✅ Accessibility: Reduced motion support, ARIA labels, keyboard navigation
- ✅ Node.js: Compatible with >=20.0.0

---

## 🏆 Competitive Advantages

### Unique Value Proposition

- **Cultural Authenticity**: Proper Sanskrit rendering with Devanagari and accurate transliteration
- **Performance-Optimized**: Dynamic imports, scoped motion and responsive layout fixes, and strategic caching for sub-second loads
- **Multimodal AI**: Sanskrit manuscript analysis with Gemma 4 Vision
- **Advanced RAG**: Scripture-grounded answers with citations using vector search
- **Function Calling**: Domain-specific AI tools for spiritual learning
- **Linguistic Excellence**: Comprehensive Sanskrit tools (sandhi, morphology, vibhakti, accents)

### Technical Differentiation

- **Modern Stack 2026**: Next.js 15.5, React 19.2, TypeScript 5.9
- **Performance-First**: Route-level loading states, font optimization, scoped rendering and stable responsive layouts
- **Edge-Optimized**: Vercel Edge Network with global CDN distribution
- **Enterprise Architecture**: Scalable design with Upstash Redis and Supabase
- **Research Ready**: Fine-tuning scripts for production scaling
- **Academic Standard**: Playwright E2E coverage for critical pages and responsive states
- **Accessibility-First**: Reduced motion support, ARIA labels, keyboard navigation

### Impact & Reach

- **1.4 Billion Potential Users**: Indian diaspora and spiritual seekers
- **Cultural Preservation**: Digital access to 5,000+ years of wisdom
- **Educational Equity**: Free, high-quality spiritual education
- **Global Accessibility**: Multilingual support (Sanskrit, Hindi, English)
- **Future-Proof**: Extensible architecture for additional languages
- **Performance Excellence**: Sub-second page loads with optimized bundle sizes

---

## 🔒 Security

- **Rate Limiting**: 10 requests/minute per user
- **Input Validation**: Zod schemas for all inputs
- **API Key Protection**: Secure environment variables
- **CORS**: Proper cross-origin policies
- **Content Security Policy**: XSS prevention
- **Secure Headers**: Next.js security headers
- **Dependency Scanning**: Automated vulnerability checks

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Write tests for new features
- Update documentation
- Use conventional commits
- Follow Karpathy principles: think before coding, simplicity first, surgical changes, goal-driven execution

---

## 📄 License

This project is licensed under the **Creative Commons Attribution 4.0 International (CC-BY 4.0)** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google AI** - Gemma 4 models and AI research
- **OpenRouter** - Hosted Gemma 4 inference
- **Vercel** - Edge computing infrastructure
- **Open Source Community** - Web technologies and libraries

---

<div align="center">

**Built with ❤️ for the future of spiritual education**

**🕉️ Powered by Gemma 4 AI | Built on Vercel Edge | Open Source Forever 🕉️**

[⬆️ Back to Top](#top)

</div>
