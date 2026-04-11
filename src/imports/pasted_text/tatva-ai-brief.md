Here is your complete, production-ready Figma prompt covering everything — UI screens, project plan, architecture, and sprint board. Copy this entire document into Figma AI or use it as your design brief.

---

# 🎨 TATVA AI — Complete Figma Master Brief
### Gemma 4 Good Hackathon · Solo Build · May 18 Deadline

---

## 1. DESIGN SYSTEM

### Brand Identity
- **Project Name:** Tatva AI (तत्त्व)
- **Tagline:** *Ancient Wisdom. Intelligently Unlocked.*
- **Sub-tagline:** *Ask the scriptures. In your language.*
- **Logo concept:** Sanskrit "त" letterform inside a subtle lotus/mandala geometric — minimal, not kitsch

### Color Palette
```
--color-void:        #0A0A0F   (deep space black — background)
--color-surface:     #111118   (card backgrounds)
--color-surface-2:   #1A1A28   (elevated surfaces)
--color-border:      #2A2A3F   (subtle borders)
--color-saffron:     #E8842D   (primary CTA — sacred fire)
--color-gold:        #D4A843   (accent — manuscript gold)
--color-cream:       #F5ECD7   (text on dark — aged paper)
--color-ash:         #8B8BA0   (secondary text)
--color-emerald:     #2D7A5F   (success, Vedic green)
--color-deep-blue:   #1E3A6E   (knowledge, depth)
--color-glow:        rgba(232,132,45,0.15) (saffron ambient glow)
```

### Typography
```
Display:    Cormorant Garamond   700   — scripture titles, hero text
Heading:    Cormorant Garamond   600   — section headers
Body:       Inter                400   — UI text, descriptions
Mono:       JetBrains Mono       400   — verse references, citations
Sanskrit:   Noto Serif Devanagari 400  — actual Sanskrit text rendering
UI Labels:  Inter                500   — buttons, tags, nav
```

### Spacing & Shape
- Base grid: **8px**
- Card radius: **16px**
- Button radius: **100px** (pill)
- Input radius: **12px**
- Micro radius: **6px** (tags, chips)
- Elevation via **glow shadows**, not drop shadows

### Design Mood
Dark, sacred, scholarly. Think **Notion × Ancient manuscript × Linear**. No gradients except subtle saffron glows. The UI should feel like reading by candlelight in a library of infinite scrolls.

---

## 2. FIGMA FILE STRUCTURE

```
TATVA AI/
├── 🎨 01 — Design System
│   ├── Colors & Tokens
│   ├── Typography Scale
│   ├── Component Library
│   ├── Icons & Illustrations
│   └── Motion Principles
│
├── 📱 02 — Mobile App (390×844)
│   ├── Onboarding Flow
│   ├── Home & Ask
│   ├── Voice Interface
│   ├── Answer & Citation
│   ├── Scripture Reader
│   └── Settings
│
├── 🖥️ 03 — Web App (1440×900)
│   ├── Landing Page
│   ├── Dashboard / Home
│   ├── AI Chat Interface
│   ├── Scripture Reader
│   ├── Knowledge Graph
│   └── Settings
│
├── 🗺️ 04 — Architecture Diagram
│   ├── System Architecture
│   ├── AI Pipeline Flow
│   ├── RAG Flow
│   └── Data Flow
│
├── 📋 05 — Project Plan
│   ├── Sprint Board (4 weeks)
│   ├── Timeline / Gantt
│   ├── Prize Track Map
│   └── Submission Checklist
│
└── 🎬 06 — Video Storyboard
    ├── Scene 1–6 frames
    └── Demo script overlay
```

---

## 3. MOBILE APP SCREENS (390×844px)

---

### SCREEN M1 — Splash & Onboarding (3 slides)

**Slide 1 — Identity**
- Full dark background `#0A0A0F`
- Center: "त" logo in gold, 80px, with subtle mandala ring
- Below: "Tatva AI" in Cormorant Garamond 48px cream
- Tagline: "Ancient Wisdom. Intelligently Unlocked." — ash colored, 16px Inter
- Soft saffron glow behind logo (radial gradient, low opacity)
- Bottom: "Get Started" pill button (saffron) + "Already have account? Sign in" ghost text

**Slide 2 — Problem Statement**
- Headline: "5,000 years of wisdom." / "Locked behind language."
- 3 icon rows: 🌐 English only · 📄 Unreadable PDFs · 🔍 No real answers
- Each row: icon + bold problem text + subtle ash description
- Bottom: "Next →" CTA

**Slide 3 — Solution**
- Headline: "Ask. Listen. Understand."
- 3 animated feature cards:
  - 🎙️ Speak in your language
  - 📖 Get exact verse citations
  - 📴 Works fully offline
- Language selector: EN · हिं · मराठी · தமிழ் — pill tabs
- "Enter Tatva" CTA — full width saffron button

---

### SCREEN M2 — Home / Ask Interface ⭐ HERO SCREEN

**Layout:**
- Top bar: "त" logo left · Language pill center · Settings gear right
- Offline badge: green dot + "Offline Ready" — top right corner

**Center Ask Box:**
- Large rounded input card (surface-2, 24px radius)
- Placeholder: *"What does the Gita say about action without attachment?"*
- Inside bottom row: 🎙️ Voice button (saffron) · 📷 Image (ash) · ⌨️ Type (ash)
- Subtle gold border glow on focus

**Quick Ask Chips (horizontal scroll):**
```
🕉️ Bhagavad Gita   📿 Ramayana   🌿 Vedas
🔥 Dharma   💫 Karma   🧘 Yoga   ⚔️ Mahabharata
```

**Recent Questions (last 3):**
- Each card: question text truncated · scripture source badge · timestamp
- Swipe left to delete

**Bottom Nav:**
- Home (active) · Search · Library · History · Settings
- Active state: saffron icon + gold underline dot

---

### SCREEN M3 — Voice Listening State

**Full screen takeover:**
- Background: `#0A0A0F` with radial saffron glow from center
- Center: animated waveform ring (concentric circles, pulsing) — saffron/gold
- Inside ring: large mic icon 48px
- Status text: "Listening…" — Cormorant 24px cream, centered
- Live transcription appearing below in real time — Inter 16px ash → cream as confidence grows
- Devanagari script showing simultaneously below Latin transcription
- Bottom: "Cancel" ghost button · "Done ✓" saffron pill

**States to show as variants:**
- `idle` — mic icon, no pulse
- `listening` — pulsing ring, waveform active
- `processing` — spinning sacred geometry loader
- `done` — checkmark, green flash

---

### SCREEN M4 — AI Answer Screen ⭐ KEY DEMO SCREEN

**Layout top-to-bottom:**

**User question bubble** (left, ash background):
> *"What does the Gita say about doing your duty without attachment?"*

**AI response card** (full width, surface-2):
- Scripture badge: `📖 Bhagavad Gita · Chapter 3 · Verse 19`
- Sanskrit verse in Noto Serif Devanagari — gold color, 18px
- Transliteration — ash, italic, 14px mono
- English translation — cream, 16px Inter, generous line height
- Explanation — ash, 15px, collapsible "Read more"

**Related verses strip** (horizontal scroll):
- 3 small cards: `BG 2.47` · `BG 18.66` · `Yoga Vasishtha 4.23`
- Tap to expand inline

**Action row:**
- 🔊 Hear this (saffron pill, primary)
- 💾 Save
- 🔗 Share
- 👍 / 👎 feedback

**Bottom "Ask Follow-up" input bar** — sticky

---

### SCREEN M5 — Scripture Reader

**Top:**
- Breadcrumb: Bhagavad Gita > Chapter 3 > Verse 19
- Progress bar (thin gold line)
- Font size control · Theme toggle (dark/sepia/light)

**Verse display:**
- Verse number badge — gold circle
- Sanskrit — Noto Serif Devanagari, 20px, gold
- Transliteration — mono, ash, 14px
- Translation — cream, 17px, 1.7 line height
- Commentary toggle — expandable card below

**Navigation:**
- `← Previous` · `Next →` — bottom corners
- "Ask AI about this verse" — floating saffron button, bottom center

**Side panel (slide in):**
- Related concepts
- Cross-scripture links
- Bookmarks

---

### SCREEN M6 — Settings

- Language preference (large selector with script preview)
- Voice speed: Slow · Normal · Fast
- Voice language for TTS
- Offline data packs:
  - `Bhagavad Gita` — 2.1MB · ✅ Downloaded
  - `Ramayana` — 8.4MB · ⬇️ Download
  - `All Scriptures` — 34MB · ⬇️ Download
- Gemma 4 model: `Gemma 4 E4B (Quantized)` — status badge "Running locally ✓"
- App version · Credits · Support

---

## 4. WEB APP SCREENS (1440×900px)

---

### SCREEN W1 — Landing Page

**Hero Section:**
- Full dark background
- Center headline (Cormorant 72px): "The Scriptures, Finally Searchable."
- Sub: "Ask any question. Get answers grounded in actual verses. In your language. Offline."
- Two CTAs: `Open the Library` (saffron) · `Watch Demo` (ghost, play icon)
- Background: extremely subtle mandala line art, low opacity, fills full screen

**Feature Grid (3 columns):**
```
🧠 AI-Powered RAG          🎙️ Voice in Your Language    📴 Fully Offline
Gemma 4 finds exact        Speak Hindi, Marathi,        Runs on your device.
verses, not generic        English. Hear answers        No cloud. No latency.
summaries.                 spoken back to you.          No privacy risk.
```

**Scripture Library Preview:**
- Horizontal scroll of scripture cards with cover art — Rigveda, Mahabharata, Ramayana, Bhagavatam etc.

**Tech Badge Row:**
- `Powered by Gemma 4` · `Fine-tuned with Unsloth` · `Runs via Ollama`

**Footer:** Dark, minimal. Links + "Built for Gemma 4 Good Hackathon 2026"

---

### SCREEN W2 — Main Dashboard / Home (Authenticated)

**Left Sidebar (240px):**
- Logo + "Tatva AI" wordmark
- Nav items with icons:
  - 🏠 Home
  - 💬 Ask AI
  - 📚 Library
  - 🗺️ Knowledge Graph
  - 📌 Saved
  - ⚙️ Settings
- Bottom: Gemma 4 status chip — green dot "Model Active (Local)"
- Offline indicator

**Main Canvas:**
- Welcome: "Namaste, Mangesh 🙏"
- Large ask box (same as mobile, adapted wide)
- 4 featured scripture cards in 2×2 grid
- Recent activity feed — right column (300px)
  - Last 5 questions with scripture source badges

---

### SCREEN W3 — AI Chat Interface ⭐ MAIN WEB DEMO SCREEN

**3-column layout:**

**Left (280px) — Conversation History:**
- Search bar
- List of past sessions by date
- Each item: truncated question + scripture badge

**Center (800px) — Chat Canvas:**
- Conversation thread — dark bubbles
- User messages: right-aligned, surface-2
- AI responses: left-aligned, full-width answer card (same as mobile M4)
- Sanskrit + transliteration + translation + citation in each AI card
- Sticky bottom input bar with voice + text + image attach

**Right (360px) — Context Panel:**
- Current verse highlighted in scripture
- Related verses
- Sanskrit word etymology pop-ups
- "Open in Reader →" CTA

---

### SCREEN W4 — Scripture Reader (Web)

**Full-width immersive reader:**
- Left panel (260px): Table of contents — collapsible tree
- Center (840px): Verse display — same structure as mobile but wider, more breathing room
- Right panel (340px): AI sidebar — "Ask about this verse" always visible, previous answers inline

**Top bar:**
- Scripture title · Chapter navigation · Font controls · Theme
- Share · Bookmark · "Cite this verse" button

---

### SCREEN W5 — Knowledge Graph

**Full canvas interactive visualization:**
- Node-link diagram of scripture concepts
- Nodes: scriptures (large) → chapters (medium) → concepts (small)
- Node colors: Vedas (gold) · Epics (saffron) · Puranas (emerald) · Philosophy (blue)
- Clicking a node: side panel slides in with summary + "Ask AI" CTA
- Search bar top-left to highlight nodes
- Legend bottom-left
- Zoom controls bottom-right

**Example connections visible:**
- `Dharma` — linked to Gita Ch.3, Manu Smriti Ch.1, Ramayana Bk.2
- `Karma` — linked to 7 different texts
- `Yoga` — branching into Jnana, Bhakti, Karma, Raja

---

## 5. ARCHITECTURE DIAGRAM (1600×900px)

Create this as a **dark-background flow diagram** in Figma using auto-layout frames + connectors.

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACES                          │
│   [Mobile App]     [Web App]      [Voice Input]                │
│   Next.js PWA      Next.js 16     Whisper STT                  │
└──────────────┬──────────────┬──────────────┬───────────────────┘
               │              │              │
               ▼              ▼              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FASTAPI BACKEND                            │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────────┐ │
│  │  /ask route │  │ /voice route │  │   /scripture route     │ │
│  │  RAG engine │  │ STT→LLM→TTS  │  │   CRUD + search        │ │
│  └──────┬──────┘  └──────┬───────┘  └───────────┬────────────┘ │
└─────────┼────────────────┼───────────────────────┼─────────────┘
          │                │                       │
          ▼                ▼                       ▼
┌──────────────────────────────────────────────────────────────┐
│                    GEMMA 4 AI LAYER                           │
│                                                              │
│  ┌────────────────────┐    ┌──────────────────────────────┐ │
│  │  Gemma 4 E4B       │    │   Unsloth Fine-tuned         │ │
│  │  via Ollama        │    │   Gemma 4 (Sanskrit QA)      │ │
│  │  (local inference) │    │   Published → HuggingFace    │ │
│  └────────────────────┘    └──────────────────────────────┘ │
│                                                              │
│  Function Calling Tools:                                     │
│  search_verse() · get_context() · find_related() · explain() │
└──────────────┬───────────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                 │
│  ┌───────────────────┐    ┌────────────────────────────────┐ │
│  │  Supabase         │    │  pgvector embeddings           │ │
│  │  PostgreSQL       │    │  (all scripture verses)        │ │
│  │  (existing Tatva) │    │  semantic similarity search    │ │
│  └───────────────────┘    └────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

**Diagram styling notes:**
- Each layer: rounded rect frame with distinct border color (saffron/gold/emerald/blue)
- Arrows: animated dashes (use Figma prototype arrows)
- Icons inside each node
- Layer labels left-aligned, Cormorant 14px gold caps
- Background: `#0A0A0F` with faint grid lines

---

## 6. RAG PIPELINE FLOW DIAGRAM (1200×600px)

```
[User Question]
      │
      ▼
[Whisper / Text Input]
      │
      ▼
[Embedding Model]──────────────────────────────┐
      │                                         │
      ▼                                         ▼
[pgvector Search]                    [Supabase Scripture DB]
  top-5 verses                         all verses embedded
      │
      ▼
[Context Assembly]
  verse + chapter + book + commentary
      │
      ▼
[Gemma 4 Prompt]
  system: "You are a Vedic scholar..."
  context: {retrieved verses}
  user: {original question}
      │
      ▼
[Gemma 4 Response]
  answer + citation + Sanskrit + explanation
      │
      ▼
[TTS (optional)] ──► [Audio Output]
      │
      ▼
[UI Response Card]
  Sanskrit · Transliteration · Translation · Citation
```

**Styling:** Same dark theme, gold connector arrows, each step a pill-shaped node.

---

## 7. PROJECT PLAN — SPRINT BOARD (1800×1000px)

### Layout: Kanban + Gantt hybrid

**Top section — Gantt Timeline:**

```
WEEK 1 (Apr 12–18)    WEEK 2 (Apr 19–25)    WEEK 3 (Apr 26–May 2)    WEEK 4 (May 3–18)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[████ Supabase + pgvector setup ████]
        [████████ Gemma 4 RAG pipeline ████████]
                      [████ Unsloth fine-tune ████]
                             [████████ Voice interface ████████]
[██ Fork Tatva ██]
        [████████████ Frontend AI integration ████████████]
                                        [████ Polish + deploy ████]
                                                    [██ Video + submit ██]
```

**Bottom section — Sprint Kanban (4 columns):**

**Column 1 — WEEK 1: Foundation**
```
✅ Fork JDhruv14/tatva
✅ Set up local Gemma 4 via Ollama
□  Add pgvector to Supabase
□  Embed all scripture verses
□  Basic RAG endpoint (/ask)
□  Test: "What does Gita say about X?"
```

**Column 2 — WEEK 2: Intelligence**
```
□  Gemma 4 function calling tools
□  search_verse() implementation
□  find_related() cross-scripture
□  explain_sanskrit() etymology
□  Chat UI widget (web)
□  Mobile Ask screen
□  Whisper STT integration
```

**Column 3 — WEEK 3: Power Features**
```
□  Unsloth fine-tuning setup
□  Sanskrit QA dataset prep
□  Fine-tune Gemma 4 E4B
□  Publish weights → HuggingFace
□  TTS voice output (gTTS / Coqui)
□  Offline mode — Ollama config
□  Knowledge graph visualization
□  Cross-scripture concept links
```

**Column 4 — WEEK 4: Ship It**
```
□  Live demo deployment (Vercel + Railway)
□  Ollama Docker config
□  Performance optimization
□  Record 3-min demo video
□  Write Kaggle writeup (1500 words)
□  Finalize GitHub README
□  Submit on Kaggle before May 18
```

**Styling:**
- Each column: dark surface card, colored top border (saffron W1, gold W2, emerald W3, blue W4)
- Task items: checkbox style, Inter 14px
- Completed tasks: strikethrough + green check
- Priority tasks: saffron left border
- Each card has: task name + estimated hours chip

---

## 8. PRIZE TRACK MAP (1000×600px)

**Visual layout: Tatva AI at center, prize tracks radiating out**

```
                    [$50K Main Track]
                    Best Overall Project
                           ▲
                           │
[$10K Education] ◄─── [TATVA AI] ───► [$10K Digital Equity]
Future of Learning    (CENTER)         Language + Accessibility
                           │
                           ▼
                    [$10K Health —
                     optional angle:
                     mental wellness
                     through scriptures]

                    [$10K Unsloth]        [$10K Ollama]
                    Fine-tuned Gemma 4    Local deployment
                    Sanskrit QA model     no internet needed
```

**Total possible:** up to **$90,000** across 5 tracks

**Styling:** Nodes as pill labels, color-coded by track, dollar amounts in bold saffron, connecting lines dashed gold.

---

## 9. SUBMISSION CHECKLIST (800×600px)

Design as a clean checklist card — dark background, cream text:

```
KAGGLE SUBMISSION CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━

CODE REPOSITORY
□  GitHub repo public
□  README with architecture
□  Ollama setup instructions
□  HuggingFace model link (Unsloth)
□  .env.example included

LIVE DEMO
□  Vercel deployment live
□  Voice input working
□  Offline mode working
□  Mobile responsive

VIDEO (≤ 3 minutes)
□  Problem statement (30s)
□  Live demo — voice ask → verse answer (90s)
□  Architecture explanation (30s)
□  Impact statement (30s)
□  Uploaded to YouTube (public)

KAGGLE WRITEUP (≤ 1500 words)
□  Title + subtitle
□  Track selected
□  Architecture section
□  Gemma 4 usage explained
□  Unsloth fine-tuning documented
□  Ollama local deployment documented
□  Challenges + solutions
□  Cover image attached
□  Video link attached
□  Code repo link attached
□  Live demo link attached

SUBMIT BUTTON — before May 18, 11:59 PM UTC
```

---

## 10. VIDEO STORYBOARD (6 frames, 1280×720px each)

**Frame 1 — The Hook (0:00–0:20)**
- Dark screen, text fades in: *"5,000 years of Indian wisdom."*
- Cut: *"Still locked behind Sanskrit."*
- Visuals: ancient manuscript texture, blur effect

**Frame 2 — The Problem (0:20–0:40)**
- Screen recording: Google search for "Bhagavad Gita karma" → generic results, no verse
- Text overlay: *"Search engines don't know the scriptures."*

**Frame 3 — The Demo: Voice Ask (0:40–1:20)**
- Mobile screen: mic button tapped
- Voice: *"What does the Gita say about doing your duty?"*
- Waveform visualization
- Response appears: Sanskrit verse + translation + BG 3.19 citation badge
- Audio plays the answer back in Hindi

**Frame 4 — The Demo: Cross-Scripture (1:20–1:50)**
- Web app: Knowledge graph lights up
- "Karma" node — connected to 7 texts
- Click Mahabharata node → verse appears instantly

**Frame 5 — Offline Proof (1:50–2:20)**
- Airplane mode turned on (screen recording)
- Ask the same question
- Answer appears immediately — *"No internet. No cloud. Just Gemma 4 on your device."*

**Frame 6 — Impact Close (2:20–3:00)**
- Text: *"For scholars. Students. Seekers. Anyone."*
- Tatva AI logo
- GitHub link · HuggingFace model link
- *"Built for the Gemma 4 Good Hackathon 2026"*

---

## 11. COMPONENT LIBRARY

Build all these as Figma components with variants:

| Component | Variants |
|---|---|
| `AskBox` | idle / focused / listening / loading |
| `VerseCard` | short / expanded / cited / saved |
| `ScriptureBadge` | by book (color-coded) |
| `VoiceButton` | idle / listening / processing / done |
| `WaveformRing` | static / animated (4 frames) |
| `OfflineBadge` | online / offline / syncing |
| `ModelStatus` | active / loading / error |
| `NavigationBar` | mobile bottom / web sidebar |
| `TaskCard` | todo / in-progress / done / blocked |
| `PrizeCard` | main / impact / special tech |
| `GanttBar` | by week color |
| `ChatBubble` | user / AI / AI-with-verse |
| `SanskritBlock` | verse / transliteration / translation |
| `KnowledgeNode` | scripture / chapter / concept (3 sizes) |

---

## 12. FIGMA PROTOTYPE FLOW

Connect these screens in prototype mode:

```
Splash 1 → Splash 2 → Splash 3
                          │
                          ▼
                    Home / Ask
                    │        │
              Voice Tap    Text Submit
                    │        │
              Listening    Processing
                    └────┬───┘
                         ▼
                   Answer Screen
                    │        │
              Hear Audio   Open Reader
                              │
                         Scripture Reader
                              │
                        Ask AI (float btn)
                              │
                         Answer Screen
```

Use **Smart Animate** for all transitions. Voice screen: dissolve in. Answer card: slide up. Reader: push left.

---

That's your complete Figma master brief. Every screen, every diagram, every sprint card, every prototype flow — all in one place.

**Start with the Design System page first**, then build M2 (Home/Ask) and W3 (AI Chat) — those are your two money shots for the video demo. Everything else follows from those two screens.