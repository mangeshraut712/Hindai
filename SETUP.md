# Hind AI - Hackathon Setup Guide

## Quick Start for Gemma 4 Good Hackathon

### Prerequisites
- Node.js 20+ and npm 10+
- Git
- **Ollama** (for local AI)

### 1. Clone and Install

```bash
git clone https://github.com/hindai/hindai.git
cd hindai
npm install
```

### 2. Set Up Gemma 4 (Ollama)

```bash
# Install Ollama from https://ollama.com

# Pull Gemma 4 model (4B parameter version for edge deployment)
ollama pull gemma-4-4b-it

# Verify installation
ollama list
```

### 3. Environment Configuration

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your settings
cat > .env.local << EOF
# Gemma 4 Configuration
OLLAMA_URL=http://localhost:11434
GEMMA_MODEL=gemma-4-4b-it

# Optional: Supabase for data storage
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
EOF
```

### 4. Run Development Server

```bash
# Terminal 1: Start Ollama (if not already running)
ollama serve

# Terminal 2: Start Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Verify AI Integration

Test the AI features:
1. Press `⌘K` (or `Ctrl+K`) to open search
2. Search for "Bhagavad Gita"
3. Click "Get AI Explanation" on any verse
4. Verify Gemma 4 generates contextual explanation

### 6. Build for Production

```bash
npm run build
```

### 7. Deploy (Choose one)

#### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

#### Docker (Edge Deployment)
```bash
docker build -t hindai .
docker run -p 3000:3000 hindai
```

#### Ollama Edge Device
```bash
# For Raspberry Pi or edge devices
ollama pull gemma-4-4b-it-q4_0  # Quantized version
npm run build
npm start
```

---

## Hackathon Submission Checklist

### Required Files
- [x] `README.md` - Project overview
- [x] `HACKATHON.md` - Submission details
- [x] `LICENSE` - MIT License
- [ ] YouTube Video (3 min max) - Link in HACKATHON.md
- [ ] Kaggle Writeup - Link in HACKATHON.md
- [x] Live Demo URL - Update HACKATHON.md

### Video Requirements
- [ ] 3 minutes or less
- [ ] Published to YouTube (public/unlisted)
- [ ] Tell a story: Problem → Solution → Impact
- [ ] Demo Gemma 4 features live
- [ ] Show real-world utility

### Code Repository
- [x] Well-documented code
- [x] Gemma 4 integration visible
- [x] Clean project structure
- [x] Working demo

---

## Gemma 4 Model Variants

For different deployment scenarios:

| Model | Size | Use Case | Command |
|-------|------|----------|---------|
| gemma-4-4b-it | 4B | Standard | `ollama pull gemma-4-4b-it` |
| gemma-4-4b-it-q4_0 | 2.3GB | Edge/Raspberry Pi | `ollama pull gemma-4-4b-it:q4_0` |
| gemma-4-4b-it-q8_0 | 4.3GB | Higher quality | `ollama pull gemma-4-4b-it:q8_0` |

---

## Troubleshooting

### Ollama Connection Error
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Restart Ollama
ollama serve
```

### AI Not Responding
```bash
# Pull model again
ollama pull gemma-4-4b-it

# Verify model is available
ollama list
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

---

## Submission Links

- **GitHub**: https://github.com/hindai/hindai
- **Live Demo**: https://hindai.vercel.app
- **Video**: [YouTube Link]
- **Kaggle Writeup**: [Kaggle Link]

---

## Support

For hackathon-related questions:
- Email: hello@hindai.dev
- GitHub Issues: https://github.com/hindai/hindai/issues
