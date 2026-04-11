import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Play, ArrowRight, Wifi, Cpu, Mic, BookOpen, Star, ChevronRight } from "lucide-react";

const VOID = "#0A0A0F";
const SURFACE = "#111118";
const SURFACE2 = "#1A1A28";
const BORDER = "#2A2A3F";
const SAFFRON = "#E8842D";
const GOLD = "#D4A843";
const CREAM = "#F5ECD7";
const ASH = "#8B8BA0";
const EMERALD = "#2D7A5F";
const DEEP_BLUE = "#1E3A6E";

const scriptures = [
  { title: "Bhagavad Gita", subtitle: "700 verses · 18 chapters", color: GOLD, emoji: "🕉️", desc: "The Song of God — dialogue between Arjuna and Krishna on duty, action, and liberation." },
  { title: "Rigveda", subtitle: "10,552 hymns · 10 mandalas", color: SAFFRON, emoji: "🔥", desc: "The oldest of the four Vedas, composed in Vedic Sanskrit, containing hymns to the gods." },
  { title: "Ramayana", subtitle: "24,000 verses · 7 kandas", color: EMERALD, emoji: "🏹", desc: "Epic narrative of Rama's journey, teaching dharma, devotion, and righteousness." },
  { title: "Mahabharata", subtitle: "100,000+ verses · 18 parvas", color: SAFFRON, emoji: "⚔️", desc: "The world's longest epic poem containing the Bhagavad Gita within its narrative." },
  { title: "Upanishads", subtitle: "108 texts · Vedanta core", color: DEEP_BLUE, emoji: "🧘", desc: "Philosophical treatises exploring Brahman (ultimate reality) and Atman (self)." },
  { title: "Yoga Vasishtha", subtitle: "32,000 verses · 6 prakaranas", color: GOLD, emoji: "💫", desc: "Philosophical treatise on Vedanta through stories, teaching non-duality and liberation." },
  { title: "Shrimad Bhagavatam", subtitle: "18,000 verses · 12 cantos", color: EMERALD, emoji: "📿", desc: "Purana dedicated to Vishnu and his avatars, especially the life of Krishna." },
];

const features = [
  {
    icon: <Cpu size={28} />,
    title: "AI-Powered RAG",
    subtitle: "Gemma 4 finds exact verses, not generic summaries.",
    color: SAFFRON,
    detail: "Retrieval-Augmented Generation searches thousands of verses semantically to deliver precise, cited answers.",
  },
  {
    icon: <Mic size={28} />,
    title: "Voice in Your Language",
    subtitle: "Speak Hindi, Marathi, English. Hear answers spoken back.",
    color: GOLD,
    detail: "Multilingual STT powered by Whisper. TTS voices trained on Sanskrit phonetics for authentic pronunciation.",
  },
  {
    icon: <Wifi size={28} />,
    title: "Fully Offline",
    subtitle: "Runs on your device. No cloud. No latency. No privacy risk.",
    color: EMERALD,
    detail: "Gemma 4 E4B quantized model runs locally via Ollama. All scripture data embedded in pgvector on-device.",
  },
];

const techBadges = [
  { label: "Powered by Gemma 4", color: SAFFRON },
  { label: "Fine-tuned with Unsloth", color: GOLD },
  { label: "Runs via Ollama", color: EMERALD },
  { label: "pgvector Embeddings", color: DEEP_BLUE },
  { label: "FastAPI Backend", color: ASH },
];

function MandalaSVG() {
  return (
    <svg
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06, pointerEvents: "none" }}
    >
      <g transform="translate(400,400)">
        {[60, 100, 140, 190, 240, 290, 340, 380].map((r, i) => (
          <circle key={i} r={r} fill="none" stroke={GOLD} strokeWidth={i % 2 === 0 ? 0.8 : 0.4} />
        ))}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={0} y1={0}
              x2={Math.cos(rad) * 380} y2={Math.sin(rad) * 380}
              stroke={GOLD} strokeWidth={0.3}
            />
          );
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8;
          const rad = (angle * Math.PI) / 180;
          const x1 = Math.cos(rad) * 120;
          const y1 = Math.sin(rad) * 120;
          const x2 = Math.cos(rad + Math.PI / 8) * 160;
          const y2 = Math.sin(rad + Math.PI / 8) * 160;
          const x3 = Math.cos(rad + Math.PI / 4) * 120;
          const y3 = Math.sin(rad + Math.PI / 4) * 120;
          return <path key={i} d={`M ${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`} fill="none" stroke={SAFFRON} strokeWidth={0.6} />;
        })}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          const rad = (angle * Math.PI) / 180;
          const x1 = Math.cos(rad) * 200;
          const y1 = Math.sin(rad) * 200;
          const x2 = Math.cos(rad + Math.PI / 16) * 250;
          const y2 = Math.sin(rad + Math.PI / 16) * 250;
          const x3 = Math.cos(rad + Math.PI / 8) * 200;
          const y3 = Math.sin(rad + Math.PI / 8) * 200;
          return <path key={i} d={`M ${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`} fill="none" stroke={GOLD} strokeWidth={0.4} />;
        })}
        {[0, 45, 90, 135].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <rect
              key={i}
              x={-8} y={-340}
              width={16} height={100}
              fill="none"
              stroke={SAFFRON}
              strokeWidth={0.5}
              transform={`rotate(${angle})`}
            />
          );
        })}
      </g>
    </svg>
  );
}

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: VOID, minHeight: "100vh", color: CREAM, fontFamily: "Inter, sans-serif" }}>
      {/* Nav */}
      <nav style={{ borderBottom: `1px solid ${BORDER}`, backgroundColor: `${VOID}DD` }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: `radial-gradient(circle, ${GOLD}33 0%, transparent 70%)`,
            border: `1px solid ${GOLD}44`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Noto Serif Devanagari', serif",
            color: GOLD, fontSize: 20, fontWeight: 600,
          }}>त</div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: CREAM }}>Tatva AI</span>
        </div>
        <div className="flex items-center gap-3">
          <span style={{ color: ASH, fontSize: 14 }}>Ancient Wisdom. Intelligently Unlocked.</span>
          <button
            onClick={() => navigate("/onboarding")}
            style={{ backgroundColor: SAFFRON, color: CREAM, borderRadius: 100, padding: "8px 20px", fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer" }}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex items-center justify-center" style={{ minHeight: "100vh", overflow: "hidden" }}>
        <MandalaSVG />
        {/* Saffron glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 600, height: 600,
          background: `radial-gradient(circle, ${SAFFRON}12 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div className="relative z-10 text-center px-6" style={{ maxWidth: 800 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center mb-8"
          >
            <div style={{
              width: 100, height: 100, borderRadius: "50%",
              background: `radial-gradient(circle, ${GOLD}22 0%, transparent 70%)`,
              border: `2px solid ${GOLD}55`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
              boxShadow: `0 0 40px ${SAFFRON}33`,
            }}>
              <div style={{
                position: "absolute", inset: -8, borderRadius: "50%",
                border: `1px solid ${GOLD}22`,
              }} />
              <div style={{
                position: "absolute", inset: -16, borderRadius: "50%",
                border: `1px solid ${GOLD}11`,
              }} />
              <span style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: 48, color: GOLD, lineHeight: 1 }}>त</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 700, lineHeight: 1.15, color: CREAM, marginBottom: 20 }}
          >
            The Scriptures,<br />Finally Searchable.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ color: ASH, fontSize: 18, lineHeight: 1.7, marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}
          >
            Ask any question. Get answers grounded in actual verses. In your language. Offline.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <button
              onClick={() => navigate("/app")}
              style={{ backgroundColor: SAFFRON, color: CREAM, borderRadius: 100, padding: "14px 32px", fontSize: 16, fontWeight: 500, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: `0 0 24px ${SAFFRON}44` }}
            >
              <BookOpen size={18} /> Open the Library
            </button>
            <button
              onClick={() => navigate("/onboarding")}
              style={{ backgroundColor: "transparent", color: CREAM, borderRadius: 100, padding: "14px 32px", fontSize: 16, fontWeight: 500, border: `1px solid ${BORDER}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
            >
              <Play size={18} fill={CREAM} /> Watch Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex justify-center gap-2 mt-12 flex-wrap"
          >
            {["🕉️ Bhagavad Gita", "📿 Ramayana", "🌿 Vedas", "🔥 Dharma", "💫 Karma", "🧘 Yoga"].map((chip) => (
              <span key={chip} style={{
                backgroundColor: SURFACE, border: `1px solid ${BORDER}`,
                borderRadius: 100, padding: "6px 14px", fontSize: 13, color: ASH,
              }}>{chip}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="px-8 py-20" style={{ backgroundColor: SURFACE }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 700, color: CREAM, marginBottom: 12 }}>
              Why Tatva AI is Different
            </h2>
            <p style={{ color: ASH, fontSize: 16 }}>Not a search engine. A scholar that thinks.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                style={{
                  backgroundColor: SURFACE2, borderRadius: 16, padding: 32,
                  border: `1px solid ${BORDER}`,
                  position: "relative", overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: f.color,
                }} />
                <div style={{ color: f.color, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: CREAM, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: CREAM, fontSize: 15, marginBottom: 12, lineHeight: 1.6 }}>{f.subtitle}</p>
                <p style={{ color: ASH, fontSize: 14, lineHeight: 1.7 }}>{f.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture Library */}
      <section className="py-20" style={{ backgroundColor: VOID }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-8 mb-12"
          >
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 700, color: CREAM, marginBottom: 8 }}>
              The Sacred Library
            </h2>
            <p style={{ color: ASH, fontSize: 16 }}>5,000 years of wisdom, fully indexed and searchable.</p>
          </motion.div>
          <div className="flex gap-5 overflow-x-auto px-8 pb-6" style={{ scrollbarWidth: "none" }}>
            {scriptures.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate("/app/reader")}
                style={{
                  minWidth: 240, backgroundColor: SURFACE, borderRadius: 16,
                  border: `1px solid ${BORDER}`, padding: 24, cursor: "pointer",
                  flexShrink: 0, position: "relative", overflow: "hidden",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${s.color}22` }}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }}>{s.emoji}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: CREAM, marginBottom: 4 }}>{s.title}</h3>
                <p style={{ color: s.color, fontSize: 12, marginBottom: 10, fontFamily: "'JetBrains Mono', monospace" }}>{s.subtitle}</p>
                <p style={{ color: ASH, fontSize: 13, lineHeight: 1.6 }}>{s.desc}</p>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: s.color, opacity: 0.4 }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="px-8 py-20" style={{ backgroundColor: SURFACE }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 700, color: CREAM, marginBottom: 16 }}>
                Ask the Scriptures.<br />Get Real Answers.
              </h2>
              <p style={{ color: ASH, fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
                Not Wikipedia summaries. Actual verses from Bhagavad Gita, Upanishads, and Vedas — with Sanskrit, transliteration, and clear explanation.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "What does the Gita say about duty without attachment?",
                  "Explain the concept of Brahman in the Upanishads",
                  "How does the Ramayana define dharma?",
                ].map((q, i) => (
                  <div key={i} onClick={() => navigate("/app/chat")}
                    style={{ backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                    className="hover:border-[#E8842D] transition-colors"
                  >
                    <span style={{ color: CREAM, fontSize: 14 }}>{q}</span>
                    <ChevronRight size={16} color={ASH} />
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ backgroundColor: SURFACE2, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 24 }}
            >
              <div style={{ backgroundColor: `${SAFFRON}15`, borderRadius: 10, border: `1px solid ${SAFFRON}33`, padding: 16, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <BookOpen size={14} color={SAFFRON} />
                  <span style={{ color: SAFFRON, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>📖 Bhagavad Gita · Chapter 3 · Verse 19</span>
                </div>
                <p style={{ color: GOLD, fontSize: 16, fontFamily: "'Noto Serif Devanagari', serif", lineHeight: 1.8, marginBottom: 8 }}>
                  तस्माद् असक्तः सततं कार्यं कर्म समाचर।
                </p>
                <p style={{ color: ASH, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontStyle: "italic", marginBottom: 12 }}>
                  tasmād asaktaḥ satataṁ kāryaṁ karma samācara
                </p>
                <p style={{ color: CREAM, fontSize: 14, lineHeight: 1.7 }}>
                  Therefore, always perform your duty efficiently without attachment to the results, because by performing activities without attachment one attains the Supreme.
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {["BG 2.47", "BG 18.66", "YV 4.23"].map((ref) => (
                  <span key={ref} style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "4px 10px", fontSize: 12, color: GOLD, fontFamily: "'JetBrains Mono', monospace" }}>{ref}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Badges */}
      <section className="px-8 py-12" style={{ backgroundColor: VOID, borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ color: ASH, fontSize: 13, textAlign: "center", marginBottom: 20, textTransform: "uppercase", letterSpacing: 2 }}>Powered By</p>
          <div className="flex flex-wrap justify-center gap-3">
            {techBadges.map((b, i) => (
              <span key={i} style={{
                border: `1px solid ${b.color}44`, borderRadius: 100,
                padding: "8px 18px", fontSize: 13, color: b.color,
                backgroundColor: `${b.color}08`,
              }}>{b.label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Banner */}
      <section className="px-8 py-16" style={{ backgroundColor: SURFACE, borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: `${GOLD}15`, border: `1px solid ${GOLD}33`, borderRadius: 100, padding: "6px 16px", marginBottom: 20 }}>
            <Star size={14} color={GOLD} />
            <span style={{ color: GOLD, fontSize: 13 }}>Gemma 4 Good Hackathon 2026</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 700, color: CREAM, marginBottom: 16 }}>
            Built to Win. Built to Matter.
          </h2>
          <p style={{ color: ASH, fontSize: 16, lineHeight: 1.8, maxWidth: 600, margin: "0 auto 32px" }}>
            Tatva AI competes across Education, Digital Equity, and Special Tech tracks — representing the democratization of ancient Indian wisdom for 1.4 billion people.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            {[
              { label: "$50K Main Track", color: GOLD },
              { label: "$10K Education", color: SAFFRON },
              { label: "$10K Digital Equity", color: EMERALD },
              { label: "$10K Unsloth", color: DEEP_BLUE },
              { label: "$10K Ollama", color: ASH },
            ].map((p, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <span style={{ color: p.color, fontSize: 15, fontWeight: 600 }}>{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: VOID, borderTop: `1px solid ${BORDER}`, padding: "32px 48px" }}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span style={{ fontFamily: "'Noto Serif Devanagari', serif", color: GOLD, fontSize: 20 }}>त</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: CREAM, fontSize: 18, fontWeight: 600 }}>Tatva AI</span>
            <span style={{ color: ASH, fontSize: 13 }}>· Ancient Wisdom. Intelligently Unlocked.</span>
          </div>
          <div className="flex gap-6">
            {["GitHub", "HuggingFace", "Documentation", "Kaggle"].map((link) => (
              <a key={link} href="#" style={{ color: ASH, fontSize: 14, textDecoration: "none" }}
                className="hover:text-[#F5ECD7] transition-colors">{link}</a>
            ))}
          </div>
          <p style={{ color: ASH, fontSize: 13 }}>Built for Gemma 4 Good Hackathon 2026</p>
        </div>
      </footer>
    </div>
  );
}
