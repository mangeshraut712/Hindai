# 🕉️ Hind AI - Ancient Wisdom Meets Modern AI {#top}

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=for-the-badge&logo=typescript)
![Next.js](https://img.shields.io/badge/Next.js-15.5.15-saffron?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.5-blue?style=for-the-badge&logo=react)
![OpenRouter](https://img.shields.io/badge/OpenRouter-Gemma%204-gold?style=for-the-badge&logo=openrouter)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green?style=for-the-badge&logo=node.js)
![License](https://img.shields.io/badge/License-CC--BY--4.0-lightgrey?style=for-the-badge)

  <img src="public/logo.png" alt="Hind AI Logo" width="150" />

**🧘‍♂️ Your AI Guru for Ancient Wisdom | ज्ञान से मोक्ष तक (From Knowledge to Liberation)**

[![Live Demo](https://img.shields.io/badge/Live-Demo-Visit-blue?style=for-the-badge)](https://hindai-nine.vercel.app)
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

- **🤖 AI-Powered**: Google Gemma 4 31B via OpenRouter API with function calling
- **📚 Scripture Library**: Vedas, 108 Upanishads, 18 Puranas, Epics, Gita, and 30+ additional texts
- **🔍 RAG Pipeline**: Context-grounded answers with scripture citations using vector search
- **🖼️ Multimodal**: Sanskrit manuscript analysis with vision AI
- **🔤 Sanskrit Tools**: Comprehensive linguistic tools (transliteration, sandhi, morphology, vibhakti, accents)
- **🎵 Audio Features**: Vedic accent analysis, Google Cloud TTS, Vedic Heritage Portal integration
- **☁️ Cloud-Optimized**: Production-ready with global deployment on Vercel Edge Network
- **⚡ Modern Stack**: Next.js 15.5, React 19.2, TypeScript 5.9, Node.js >=18.0
- **♿ Accessible**: Reduced motion support, ARIA labels, keyboard navigation
- **🚀 Performance**: Dynamic imports, scoped motion and responsive layout fixes, route-level loading states

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/mangeshraut712/Hindai.git
cd HindAI

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local

# Start development server
npm run dev

# Open http://localhost:3000
```

---

## 🆕 What's New in Version 3.1.0 (April 2026)

### 🎨 Frontend Polish & Commit Readiness

- **Navigation IA refresh** - Consolidated desktop navigation into Scriptures, AI Features, Learning, Culture, Resources, and More.
- **Responsive header fix** - Desktop navigation now starts at the `xl` breakpoint to avoid tablet overflow.
- **Mobile hero improvement** - Primary homepage actions appear earlier in the first viewport.
- **Boot splash refinement** - Homepage splash is shorter, respects reduced motion, and only appears once per session.
- **Rendering cleanup** - Removed global `content-visibility` and broad section containment that caused blank full-page captures.
- **Footer alignment** - Footer groups now mirror the primary navigation, including AI routes.
- **E2E readiness** - Restored Playwright config/specs and moved local E2E server to port `3100` to avoid local port conflicts.

## 🆕 What Changed in Version 3.0.0

### 🤖 Comprehensive AI-Powered Features with Gemma 4

- **Vedic AI Scholar** - Conversational interface for deep theological discourse on Vedas, Upanishads, Bhagavad Gita
- **Streaming Responses** - Real-time AI responses with context window management for long conversations
- **Expert Knowledge Base** - Comprehensive understanding of Hindu philosophy, Sanskrit grammar, Dharma, Karma, Moksha
- **Scriptural References** - Context-aware citations from authentic sources
- **Quick Questions** - Pre-built questions for common inquiries about Hindu philosophy
- **Multimodal Scriptural Analysis** - Image upload for sacred text analysis, iconography recognition, temple architecture
- **Smart Dharma Guide** - Personalized spiritual guidance with category selection (Daily Rituals, Meditation, Fasting, etc.)
- **Context Window Management** - Intelligent token management for complex queries and long conversations

### 🎨 Enhanced UI/UX with Ancient Aesthetics

- **Sacred Geometry Components** - Sri Yantra, Mandala, Lotus patterns with animations
- **Sophisticated Color Palette** - Sacred colors (saffron, vermilion, gold, indigo, peacock) for timeless design
- **Light/Dark Mode Sacred Colors** - Enhanced contrast and readability in both modes
- **Haptic Feedback** - Mobile haptic feedback for interactive elements
- **Progressive Image Loading** - Blur-up effects for better perceived performance
- **Error Boundaries** - Graceful error handling with Vercel Analytics integration
- **Smooth Page Transitions** - Fade and scale animations for route changes
- **Accessibility Enhancements** - ARIA labels, keyboard navigation, focus states across all components

### ⚡ Performance Optimization Suite

- **Dynamic Component Loading** - Heavy components (AIChat, ScriptureStudyExplorer, VerseGenerator) now load on-demand with loading skeletons
- **Route-Level Loading States** - Beautiful shimmer loading skeletons for all major routes (ai-guide, contents, study-paths, sanskrit-nova, panchanga, [slug])
- **Font Optimization** - Manrope (primary font) preloaded with `display: swap`, secondary fonts deferred for faster initial paint
- **Scoped Motion & Rendering** - Reduced broad GPU/rendering hints and kept motion scoped to active UI states
- **Smooth Page Transitions** - PageProgress component with gradient progress bar for seamless navigation feedback
- **Scroll Optimization** - Smooth scroll behavior with `prefers-reduced-motion` support for accessibility
- **Touch Action Optimization** - `touch-action: manipulation` for faster mobile interactions
- **Static Asset Caching** - 1-year immutable cache headers for `_next/static` and `/static` assets
- **Build Performance** - Stale time optimizations for dynamic (30s) and static (180s) routes

### 🔧 Infrastructure Improvements

- **Next.js 15.5.15** - Latest Next.js with App Router optimizations
- **React 19.2.5** - Concurrent React features with improved performance
- **TypeScript 5.9.3** - Strict type checking with zero errors
- **Package Import Optimization** - Optimized imports for Radix UI, Lucide, and Framer Motion
- **CSS Optimization** - Experimental CSS optimization enabled
- **Server React Optimization** - Optimized server-side React rendering
- **Image Optimization** - WebP and AVIF formats with 30-day cache TTL
- **Security Headers** - Permissions-Policy for camera, microphone, and geolocation restrictions
- **CI/CD Pipeline** - GitHub Actions workflow with quality checks, testing, and E2E tests
- **Build Performance** - 63 app routes generated successfully in the latest production build

### 🤖 OpenRouter Integration with Gemma 4

- **Official LLM API** - Switched from NVIDIA to OpenRouter as official LLM provider
- **Google Gemma 4 31B** - Enhanced AI capabilities with larger model
- **Cloud-Optimized** - Production-ready deployment with Vercel
- **Improved Reliability** - Stable API endpoints with proper error handling
- **Enhanced Performance** - Faster response times and better token efficiency

### 🔤 Sanskrit Linguistic Tools

- **Indic Transliteration** - Convert between Devanagari, IAST, SLP1, HK, and ITRANS scripts
- **Vidyut Sandhi** - Sandhi splitting and morphological analysis
- **Anvaya Analyzer** - Prose word order analysis for Sanskrit verses
- **Vibhakti Analyzer** - Grammatical case analysis and declension patterns
- **Vedic Accents** - Pitch accent analysis using IIT Bombay Vedic Accent Engine
- **Dhatu Database** - Sanskrit root words and their derivatives
- **Samasa Analyzer** - Compound word analysis and patterns

### 🎵 Audio & Pronunciation Features

- **Google Cloud TTS** - Sanskrit text-to-speech synthesis
- **Vedic Heritage Portal** - Integration for Vedic audio recitations
- **IIT Bombay Vedic Accent Engine** - Pitch accent analysis for proper chanting
- **Audio API Endpoints** - RESTful APIs for audio generation and analysis

### 🗄️ Database & Vector Search

- **Supabase Integration** - PostgreSQL database for user data and real-time subscriptions
- **Upstash Vector** - Semantic search with vector embeddings for scripture similarity
- **Data Ingestion** - SanskritDocuments.org and DCS API integration for scripture data

### 📚 Scripture Data Status

| Category       | Count                  | Metadata        | Verse Data                 |
| -------------- | ---------------------- | --------------- | -------------------------- |
| Vedas          | 6                      | ✅ 100%         | ⚠️ 0.2% (Gemma4 gen ready) |
| Epics          | 2                      | ✅ 100%         | ✅ 0% (on-demand gen)      |
| Mahapuranas    | 18                     | ✅ 100%         | ✅ 0% (on-demand gen)      |
| Upanishads     | 108 canon / 29 indexed | ✅ Canon mapped | ⚠️ Indexed starter data    |
| Gita Verses    | 49/700                 | ✅ 100%         | ⚠️ 7% (651 to generate)    |
| Rigveda Verses | 21/~10,600             | ✅ 100%         | ⚠️ 0.2%                    |
| Additional     | 30+ texts              | ✅ 100%         | ✅ API endpoints ready     |

**New Texts Added:**

- Agamas & Tantras
- Brahma Sutras
- Devi Mahatmya
- Jyotirlingas
- Mahabharata
- Minor Gitas
- Nyaya Sutras
- Ramayana
- Sahasranama Collection
- Shakti Peethas
- Shodasha Samskaras
- Vishnu Sahasranama
- Yoga Sutras

### 🔧 Infrastructure Improvements

- ✅ TypeScript: 0 errors, strict mode passing
- ✅ Prettier: All files formatted with Tailwind plugin
- ✅ Build: 63 app routes generated successfully
- ✅ Tests: Playwright suite restored with 275 listed E2E tests
- ✅ E2E Tests: Playwright coverage for critical user flows
- ✅ Security: Security audit available via npm run security
- ✅ Performance: Dynamic imports, scoped motion, font loading, static asset caching
- ✅ Accessibility: Reduced motion support, ARIA labels, keyboard navigation
- ✅ Node.js: Compatible with >=18.0.0
- ✅ CI/CD: GitHub Actions workflow passing with quality checks

---

## ✨ Core Features

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
| **Node.js**    | >=18.0  | JavaScript runtime with ESM support           |

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

| Technology                 | Purpose                       |
| -------------------------- | ----------------------------- |
| **Vercel Analytics**       | Real-time performance metrics |
| **Vercel Speed Insights**  | Core Web Vitals monitoring    |
| **@vercel/analytics**      | User analytics & engagement   |
| **@vercel/speed-insights** | Performance optimization      |

### Infrastructure

| Technology         | Purpose                          |
| ------------------ | -------------------------------- |
| **Vercel**         | Edge deployment & global CDN     |
| **Docker**         | Containerization & orchestration |
| **Upstash Vector** | Semantic search & embeddings     |
| **Supabase**       | PostgreSQL database & auth       |

---

## 📂 Project Structure

```
Hind AI/
├── 📁 app/                          # Next.js App Router
│   ├── api/                         # Backend API routes
│   │   ├── ai/                      # AI endpoints
│   │   │   ├── chat/                # Vedic AI Scholar (streaming)
│   │   │   ├── vision/              # Multimodal scriptural analysis
│   │   │   ├── dharma/              # Smart Dharma Guide
│   │   │   ├── analyze/             # Verse analysis
│   │   │   ├── generate/            # Main AI response
│   │   │   ├── stream/              # Real-time streaming
│   │   │   ├── multimodal/          # Sanskrit manuscript analysis
│   │   │   ├── translate/           # Translation service
│   │   │   ├── verse-generate/      # Verse generation
│   │   │   ├── quiz/                # AI-generated quizzes
│   │   │   └── recommend/           # Scripture recommendations
│   │   ├── sanskrit/                # Sanskrit linguistic tools
│   │   │   ├── sandhi/              # Sandhi splitting API
│   │   │   ├── transliterate/       # Script conversion
│   │   │   ├── vedic-accents/       # Vedic accent analysis
│   │   │   └── vibhakti/            # Grammatical case analysis
│   │   └── health/                  # System health
│   ├── [slug]/                      # Dynamic scripture pages
│   │   ├── page.tsx                 # Scripture detail page
│   │   └── loading.tsx              # Route loading skeleton
│   ├── ai-guide/                    # Vedic AI Scholar
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── vision/                      # Multimodal Scriptural Analysis
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── dharma/                      # Smart Dharma Guide
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── daily/                       # Daily wisdom
│   ├── quiz/                        # Quiz system
│   ├── contents/                    # Scripture library
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── study-paths/                 # Learning paths
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── sanskrit-nova/               # Sanskrit Studio
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── panchanga/                   # Panchanga calendar
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── layout.tsx                   # Root layout with providers
│   ├── loading.tsx                  # Global loading state
│   ├── page.tsx                     # Home page
│   └── providers.tsx                # Context providers
├── 📁 src/
│   ├── components/
│   │   ├── ai/                      # AI components
│   │   │   ├── vedic-scholar.tsx     # Vedic AI Scholar
│   │   │   ├── scriptural-analysis.tsx # Multimodal analysis
│   │   │   ├── dharma-guide.tsx     # Smart Dharma Guide
│   │   │   ├── ai-chat.tsx
│   │   │   ├── ai-explanation.tsx
│   │   │   └── manuscript-analyzer.tsx
│   │   ├── scripture/               # Scripture components
│   │   │   ├── verse-generator.tsx
│   │   │   ├── batch-verse-generator.tsx
│   │   │   ├── scripture-study-explorer.tsx
│   │   │   └── scripture-search.tsx
│   │   ├── commentary/              # Commentary components
│   │   │   └── CommentaryBySchool.tsx
│   │   ├── quiz/                    # Quiz components
│   │   ├── ui/                      # shadcn/ui components
│   │   │   ├── sacred-geometry.tsx  # Sacred geometry patterns
│   │   │   ├── textarea.tsx         # Textarea component
│   │   │   └── index.ts             # UI exports
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── search.tsx
│   │   ├── meditation-timer.tsx
│   │   ├── voice-search.tsx
│   │   ├── learning-progress.tsx
│   │   ├── page-progress.tsx         # Page transition indicator
│   │   ├── error-boundary.tsx       # Error handling
│   │   ├── page-transition.tsx      # Route transitions
│   │   ├── service-worker-registration.tsx # PWA support
│   │   └── progressive-image.tsx    # Image loading
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── gemma.ts             # Core Gemma 4 integration
│   │   │   ├── context-manager.ts   # Context window management
│   │   │   └── translation-languages.ts
│   │   ├── audio/
│   │   │   ├── tts.ts               # Google Cloud TTS
│   │   │   ├── vedic-accent.ts      # IIT Bombay Vedic accent
│   │   │   └── vedic-heritage.ts   # Vedic Heritage Portal
│   │   ├── sanskrit/
│   │   │   ├── transliteration/     # Indic transliteration
│   │   │   ├── vidyut/              # Sandhi & morphology
│   │   │   ├── anvaya/              # Prose word order
│   │   │   └── vibhakti/            # Grammatical cases
│   │   ├── haptics.ts               # Haptic feedback utilities
│   │   ├── vector/
│   │   │   └── upstash.ts           # Vector search
│   │   ├── data/
│   │   │   ├── scriptures.ts        # Scripture metadata (184 scriptures)
│   │   │   ├── bhagavad-gita-verses.ts
│   │   │   └── rigveda-verses.ts
│   │   ├── data/ingestion/
│   │   │   ├── sanskrit-docs.ts     # SanskritDocuments.org
│   │   │   └── dcs-api.ts           # DCS API integration
│   │   ├── database/
│   │   │   └── supabase.ts          # Supabase client
│   │   ├── scripture-catalog.ts
│   │   ├── seo.ts
│   │   ├── performance.ts
│   │   ├── study-paths.ts
│   │   └── utils.ts
│   ├── types/
│   │   └── scripture.ts
│   ├── index.css                    # Global styles with performance hints
│   └── integrations/
│       └── supabase/
├── 📁 scripts/                      # Utility scripts
│   ├── fine-tune-gemma4.py          # Unsloth fine-tuning
│   ├── audit.js
│   ├── fetch_bg.js
│   ├── generate_bg.js
│   └── generate_rv.js
├── 📁 docker/                       # Docker configuration
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── Dockerfile.ollama
├── 📁 e2e/                          # Playwright E2E tests
├── 📁 .github/workflows/            # CI/CD
├── 📄 README.md
├── 📄 scripture-audit-report.md
├── 📄 next.config.js                # Next.js with performance config
├── 📄 tailwind.config.ts            # Tailwind configuration
└── 📄 package.json
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
│  │  React 19    │  │  Edge Runtime│  │  OpenRouter  │        │
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
│  │  DEPLOYMENT  │  │  CONTAINER   │  │  TESTING     │        │
│  │              │  │              │  │              │        │
│  │  Vercel      │  │  Docker      │  │  Playwright  │        │
│  │  Edge Network│  │  Compose     │  │  Playwright  │        │
│  │  Global CDN  │  │  Production  │  │  E2E Tests   │        │
│  │  ISR/SSG     │  │  Ready       │  │  Smoke Tests │        │
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

### Vercel AI Setup

1. **Create an OpenRouter API key**
2. **Configure Vercel environment variables**:
   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key
   OPENROUTER_MODEL=google/gemma-4-31b-it:free
   OPENROUTER_URL=https://openrouter.ai/api/v1
   ```
3. **Deploy to Vercel**:
   ```bash
   vercel --prod
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
- ✅ Build: 63 app routes generated successfully
- ✅ Tests: No unit test suite configured yet; E2E coverage is handled by Playwright
- ✅ E2E Tests: Playwright coverage for critical user flows; 275 tests listed across 5 files
- ✅ Prettier: All files formatted with Tailwind plugin
- ✅ Security: Audit available via `npm run security`
- ✅ Performance: Dynamic imports, scoped motion, font loading, static asset caching
- ✅ Accessibility: Reduced motion support, ARIA labels, keyboard navigation
- ✅ Node.js: Compatible with >=18.0.0

---

## 🐳 Docker Deployment

### Quick Start with Docker

```bash
# Build and start all services
docker-compose up -d

# Access the application
open http://localhost:3000
```

### Services

- **Hind AI**: Next.js application
- **OpenRouter**: Gemma 4 AI runtime
- **Redis**: Caching and rate limiting

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
