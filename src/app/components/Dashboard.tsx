import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Mic, Camera, Keyboard, ArrowRight, Clock, BookOpen, TrendingUp, Star } from "lucide-react";

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

const scriptureCards = [
  { title: "Bhagavad Gita", verses: 700, chapters: 18, emoji: "🕉️", color: GOLD, tag: "Most Read" },
  { title: "Rigveda", verses: 10552, chapters: 10, emoji: "🔥", color: SAFFRON, tag: "Vedic Core" },
  { title: "Ramayana", verses: 24000, chapters: 7, emoji: "🏹", color: EMERALD, tag: "Epic" },
  { title: "Upanishads", verses: 2000, chapters: 108, emoji: "🧘", color: DEEP_BLUE, tag: "Philosophy" },
];

const recentActivity = [
  { question: "What does the Gita say about detachment?", source: "BG 3.19", time: "2 min ago", color: GOLD },
  { question: "Explain Brahman in the Upanishads", source: "UP 1.3", time: "1 hr ago", color: DEEP_BLUE },
  { question: "How does Rama embody dharma?", source: "RM 2.4", time: "Yesterday", color: EMERALD },
  { question: "What is karma according to Mahabharata?", source: "MB 12.11", time: "2 days ago", color: SAFFRON },
  { question: "Meaning of OM in Vedic tradition", source: "RV 1.1", time: "3 days ago", color: GOLD },
];

const quickChips = [
  { label: "🕉️ Bhagavad Gita", path: "/app/reader" },
  { label: "📿 Ramayana", path: "/app/reader" },
  { label: "🌿 Vedas", path: "/app/reader" },
  { label: "🔥 Dharma", path: "/app/chat" },
  { label: "💫 Karma", path: "/app/chat" },
  { label: "🧘 Yoga", path: "/app/chat" },
  { label: "⚔️ Mahabharata", path: "/app/reader" },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [inputMode, setInputMode] = useState<"type" | "voice" | "image">("type");

  const handleAsk = () => {
    if (query.trim()) navigate("/app/chat");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: VOID, padding: "32px 40px", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between mb-10"
        >
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 700, color: CREAM, lineHeight: 1.2, marginBottom: 6 }}>
              Namaste, Mangesh 🙏
            </h1>
            <p style={{ color: ASH, fontSize: 15 }}>What ancient wisdom would you like to explore today?</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ backgroundColor: `${EMERALD}15`, border: `1px solid ${EMERALD}33`, borderRadius: 100, padding: "6px 14px", display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: EMERALD }} />
              <span style={{ color: EMERALD, fontSize: 12 }}>Offline Ready</span>
            </div>
            <div style={{ color: ASH, fontSize: 14 }}>Saturday, Apr 11, 2026</div>
          </div>
        </motion.div>

        {/* Layout: Main + Sidebar */}
        <div className="flex gap-8">
          {/* Main column */}
          <div className="flex-1">
            {/* Ask Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ backgroundColor: SURFACE2, borderRadius: 20, border: `1px solid ${BORDER}`, padding: 24, marginBottom: 24, boxShadow: `0 0 30px ${SAFFRON}08` }}
            >
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAsk(); } }}
                placeholder="What does the Gita say about action without attachment?"
                rows={3}
                style={{
                  width: "100%", backgroundColor: "transparent", border: "none", outline: "none",
                  color: CREAM, fontSize: 16, lineHeight: 1.7, resize: "none",
                  fontFamily: "Inter, sans-serif", marginBottom: 16,
                  caretColor: SAFFRON,
                }}
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {[
                    { mode: "voice", icon: <Mic size={16} />, label: "Voice" },
                    { mode: "image", icon: <Camera size={16} />, label: "Image" },
                    { mode: "type", icon: <Keyboard size={16} />, label: "Type" },
                  ].map((m) => (
                    <button
                      key={m.mode}
                      onClick={() => setInputMode(m.mode as any)}
                      style={{
                        display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
                        borderRadius: 100, border: `1px solid ${inputMode === m.mode ? SAFFRON : BORDER}`,
                        backgroundColor: inputMode === m.mode ? `${SAFFRON}20` : "transparent",
                        color: inputMode === m.mode ? SAFFRON : ASH,
                        cursor: "pointer", fontSize: 13,
                      }}
                    >
                      {m.icon} {m.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleAsk}
                  style={{ backgroundColor: SAFFRON, color: CREAM, borderRadius: 100, padding: "10px 22px", fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                >
                  Ask Tatva <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>

            {/* Quick chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex gap-2 overflow-x-auto mb-8 pb-2"
              style={{ scrollbarWidth: "none" }}
            >
              {quickChips.map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => navigate(chip.path)}
                  style={{ flexShrink: 0, backgroundColor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 100, padding: "8px 16px", fontSize: 13, color: ASH, cursor: "pointer", whiteSpace: "nowrap" }}
                  className="hover:border-[#E8842D] hover:text-[#F5ECD7] transition-colors"
                >
                  {chip.label}
                </button>
              ))}
            </motion.div>

            {/* Scripture Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: CREAM, marginBottom: 16 }}>
                Featured Scriptures
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {scriptureCards.map((s, i) => (
                  <motion.div
                    key={i}
                    onClick={() => navigate("/app/reader")}
                    whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${s.color}18` }}
                    style={{ backgroundColor: SURFACE, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 24, cursor: "pointer", position: "relative", overflow: "hidden" }}
                  >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
                    <div className="flex items-start justify-between mb-3">
                      <span style={{ fontSize: 32 }}>{s.emoji}</span>
                      <span style={{ backgroundColor: `${s.color}20`, color: s.color, borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 500 }}>{s.tag}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: CREAM, marginBottom: 6 }}>{s.title}</h3>
                    <div className="flex gap-3">
                      <span style={{ color: ASH, fontSize: 12 }}>{s.verses.toLocaleString()} verses</span>
                      <span style={{ color: BORDER }}>·</span>
                      <span style={{ color: ASH, fontSize: 12 }}>{s.chapters} {s.chapters > 20 ? "texts" : "chapters"}</span>
                    </div>
                    <button
                      style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 4, color: s.color, fontSize: 13, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                    >
                      Open Reader <ArrowRight size={14} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-4 mt-6"
            >
              {[
                { label: "Scriptures Indexed", value: "47", icon: <BookOpen size={18} />, color: GOLD },
                { label: "Verses Embedded", value: "142K", icon: <TrendingUp size={18} />, color: SAFFRON },
                { label: "Questions Answered", value: "8,340", icon: <Star size={18} />, color: EMERALD },
              ].map((stat, i) => (
                <div key={i} style={{ backgroundColor: SURFACE, borderRadius: 12, border: `1px solid ${BORDER}`, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ color: stat.color }}>{stat.icon}</div>
                  <div>
                    <div style={{ color: CREAM, fontSize: 20, fontWeight: 600 }}>{stat.value}</div>
                    <div style={{ color: ASH, fontSize: 12 }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Sidebar: Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            style={{ width: 300, flexShrink: 0 }}
          >
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: CREAM, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <Clock size={18} color={ASH} /> Recent Activity
            </h2>
            <div className="flex flex-col gap-3">
              {recentActivity.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  onClick={() => navigate("/app/chat")}
                  style={{ backgroundColor: SURFACE, borderRadius: 12, border: `1px solid ${BORDER}`, padding: "14px 16px", cursor: "pointer", position: "relative", overflow: "hidden" }}
                  className="hover:border-[#2A2A3F] transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, backgroundColor: item.color }} />
                  <p style={{ color: CREAM, fontSize: 13, lineHeight: 1.5, marginBottom: 8, paddingLeft: 4 }}>{item.question}</p>
                  <div className="flex items-center justify-between" style={{ paddingLeft: 4 }}>
                    <span style={{ backgroundColor: `${item.color}15`, color: item.color, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>{item.source}</span>
                    <span style={{ color: ASH, fontSize: 11 }}>{item.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Daily wisdom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ marginTop: 20, backgroundColor: `${SAFFRON}10`, border: `1px solid ${SAFFRON}25`, borderRadius: 14, padding: 20 }}
            >
              <p style={{ color: SAFFRON, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Verse of the Day</p>
              <p style={{ color: GOLD, fontSize: 15, fontFamily: "'Noto Serif Devanagari', serif", lineHeight: 1.8, marginBottom: 8 }}>
                योगस्थः कुरु कर्माणि
              </p>
              <p style={{ color: ASH, fontSize: 12, fontStyle: "italic", marginBottom: 10, fontFamily: "'JetBrains Mono', monospace" }}>
                yogasthaḥ kuru karmāṇi
              </p>
              <p style={{ color: CREAM, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>
                "Be steadfast in yoga and perform your actions."
              </p>
              <span style={{ color: SAFFRON, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>BG 2.48</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
