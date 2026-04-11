import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, MessageSquare, Bookmark, Share2, Minus, Plus, Volume2, ChevronDown, ChevronUp, Sun, Moon } from "lucide-react";

const VOID = "#0A0A0F";
const SURFACE = "#111118";
const SURFACE2 = "#1A1A28";
const BORDER = "#2A2A3F";
const SAFFRON = "#E8842D";
const GOLD = "#D4A843";
const CREAM = "#F5ECD7";
const ASH = "#8B8BA0";
const EMERALD = "#2D7A5F";

const tableOfContents = [
  {
    chapter: 1, title: "Arjuna Vishada Yoga", verses: 47, subtitle: "The Yoga of Arjuna's Grief", open: false,
    verses_preview: ["1.1 — Dhritarashtra's inquiry", "1.2 — Duryodhana's report", "1.20 — Arjuna's despair"]
  },
  {
    chapter: 2, title: "Sankhya Yoga", verses: 72, subtitle: "The Yoga of Knowledge", open: false,
    verses_preview: ["2.1 — Sanjaya's description", "2.17 — Indestructible nature of Self", "2.47 — Karmanye Vadhikaraste"]
  },
  {
    chapter: 3, title: "Karma Yoga", verses: 43, subtitle: "The Yoga of Action", open: true,
    verses_preview: ["3.1 — Arjuna's question", "3.9 — Yajna sacrifice", "3.19 — Action without attachment"]
  },
  {
    chapter: 4, title: "Jnana Yoga", verses: 42, subtitle: "The Yoga of Wisdom", open: false,
    verses_preview: ["4.1 — Eternal knowledge", "4.7 — Whenever dharma declines", "4.34 — Approach a guru"]
  },
  {
    chapter: 5, title: "Karma Sanyasa Yoga", verses: 29, subtitle: "The Yoga of Renunciation", open: false,
    verses_preview: ["5.1 — Arjuna's confusion", "5.10 — Lotus in water", "5.29 — Peace through knowing God"]
  },
];

const currentVerse = {
  chapter: 3,
  verse: 19,
  chapterTitle: "Karma Yoga",
  subtitle: "The Yoga of Selfless Action",
  totalVerses: 43,
  sanskrit: "तस्माद् असक्तः सततं कार्यं कर्म समाचर।\nअसक्तो ह्याचरन् कर्म परमाप्नोति पूरुषः॥",
  transliteration: "tasmād asaktaḥ satataṁ kāryaṁ karma samācara\nasakto hyācaran karma param āpnoti pūruṣaḥ",
  translation: "Therefore, without being attached to the results of activities, one should act as a matter of duty; for by working without attachment, one attains the Supreme.",
  commentary: "In this verse, Sri Krishna synthesizes the entire teaching of Karma Yoga. The word 'asaktah' (without attachment) is the key — it does not mean indifference to work, but rather freedom from the anxiety about results. The sage Janaka is cited as an exemplar who performed his duties as a king while remaining completely unattached to the fruits of those actions. This principle liberates the worker from the bondage of karma while still participating fully in worldly life.",
};

const aiQuestions = [
  "How does this verse apply to modern workplace stress?",
  "What is the relationship between attachment and suffering?",
  "Can you compare this teaching with Stoic philosophy?",
];

type Theme = "dark" | "sepia";

export function ScriptureReader() {
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState(17);
  const [theme, setTheme] = useState<Theme>("dark");
  const [tocExpanded, setTocExpanded] = useState<number[]>([3]);
  const [commentaryOpen, setCommentaryOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [currentVerse_, setCurrentVerse] = useState(19);
  const [aiInputOpen, setAiInputOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");

  const bgColor = theme === "sepia" ? "#2A2218" : VOID;
  const surfaceColor = theme === "sepia" ? "#332A1E" : SURFACE;
  const surface2Color = theme === "sepia" ? "#3D3020" : SURFACE2;
  const textColor = theme === "sepia" ? "#E8D9C0" : CREAM;
  const ashColor = theme === "sepia" ? "#A09070" : ASH;

  const toggleToc = (ch: number) => {
    setTocExpanded((prev) => prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch]);
  };

  return (
    <div style={{ height: "100vh", display: "flex", backgroundColor: bgColor, fontFamily: "Inter, sans-serif", color: textColor, transition: "background-color 0.3s" }}>

      {/* Left: Table of Contents */}
      <div style={{ width: 260, borderRight: `1px solid ${BORDER}`, backgroundColor: surfaceColor, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "16px 16px 12px", borderBottom: `1px solid ${BORDER}` }}>
          <p style={{ color: SAFFRON, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Bhagavad Gita</p>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: textColor, lineHeight: 1.3 }}>Table of Contents</h3>
          {/* Progress bar */}
          <div style={{ marginTop: 10, height: 3, backgroundColor: BORDER, borderRadius: 100, overflow: "hidden" }}>
            <div style={{ width: `${(3 / 18) * 100}%`, height: "100%", backgroundColor: GOLD }} />
          </div>
          <p style={{ color: ashColor, fontSize: 11, marginTop: 4 }}>Chapter 3 of 18 · Verse {currentVerse_} of {currentVerse.totalVerses}</p>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {tableOfContents.map((ch) => (
            <div key={ch.chapter}>
              <button
                onClick={() => toggleToc(ch.chapter)}
                style={{
                  width: "100%", textAlign: "left", padding: "10px 16px",
                  backgroundColor: ch.chapter === 3 ? `${SAFFRON}10` : "transparent",
                  borderLeft: `3px solid ${ch.chapter === 3 ? SAFFRON : "transparent"}`,
                  border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between",
                }}
              >
                <div>
                  <p style={{ color: ch.chapter === 3 ? SAFFRON : ashColor, fontSize: 12, marginBottom: 1 }}>Chapter {ch.chapter}</p>
                  <p style={{ color: textColor, fontSize: 13, fontWeight: ch.chapter === 3 ? 500 : 400 }}>{ch.title}</p>
                </div>
                {tocExpanded.includes(ch.chapter) ? <ChevronUp size={13} color={ashColor} /> : <ChevronDown size={13} color={ashColor} />}
              </button>
              {tocExpanded.includes(ch.chapter) && (
                <div style={{ paddingLeft: 16, paddingBottom: 4 }}>
                  {ch.verses_preview.map((v, i) => (
                    <div key={i} style={{ padding: "6px 12px", borderLeft: `1px solid ${BORDER}`, marginLeft: 8, cursor: "pointer" }}>
                      <p style={{ color: ashColor, fontSize: 12, lineHeight: 1.5 }}>{v}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Center: Verse Display */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "14px 28px", backgroundColor: surfaceColor, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: 2 }}>
              <span style={{ color: ashColor, fontSize: 13 }}>Bhagavad Gita</span>
              <ChevronRight size={12} color={ashColor} />
              <span style={{ color: ashColor, fontSize: 13 }}>Chapter {currentVerse.chapter}</span>
              <ChevronRight size={12} color={ashColor} />
              <span style={{ color: SAFFRON, fontSize: 13 }}>Verse {currentVerse_}</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: textColor }}>{currentVerse.chapterTitle}</h2>
          </div>
          <div className="flex items-center gap-3">
            {/* Font controls */}
            <div className="flex items-center gap-1" style={{ border: `1px solid ${BORDER}`, borderRadius: 8, overflow: "hidden" }}>
              <button onClick={() => setFontSize(s => Math.max(13, s - 1))} style={{ padding: "6px 10px", background: "none", border: "none", cursor: "pointer", color: ashColor }}><Minus size={13} /></button>
              <span style={{ color: textColor, fontSize: 12, padding: "0 6px" }}>{fontSize}px</span>
              <button onClick={() => setFontSize(s => Math.min(24, s + 1))} style={{ padding: "6px 10px", background: "none", border: "none", cursor: "pointer", color: ashColor }}><Plus size={13} /></button>
            </div>
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(t => t === "dark" ? "sepia" : "dark")}
              style={{ padding: "7px 12px", backgroundColor: surface2Color, border: `1px solid ${BORDER}`, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: ashColor, fontSize: 13 }}
            >
              {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
              {theme === "dark" ? "Sepia" : "Dark"}
            </button>
            <button onClick={() => setBookmarked(b => !b)} style={{ padding: 7, backgroundColor: bookmarked ? `${GOLD}15` : surface2Color, border: `1px solid ${bookmarked ? GOLD + "44" : BORDER}`, borderRadius: 8, cursor: "pointer", color: bookmarked ? GOLD : ashColor }}>
              <Bookmark size={15} fill={bookmarked ? GOLD : "none"} />
            </button>
            <button style={{ padding: 7, backgroundColor: surface2Color, border: `1px solid ${BORDER}`, borderRadius: 8, cursor: "pointer", color: ashColor }}>
              <Share2 size={15} />
            </button>
          </div>
        </div>

        {/* Verse content */}
        <div className="flex-1 overflow-y-auto" style={{ padding: "40px 60px" }}>
          <motion.div
            key={currentVerse_}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ maxWidth: 720, margin: "0 auto" }}
          >
            {/* Verse number badge */}
            <div className="flex items-center gap-4 mb-8">
              <div style={{ width: 48, height: 48, borderRadius: "50%", border: `2px solid ${GOLD}55`, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: `${GOLD}10` }}>
                <span style={{ color: GOLD, fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 600 }}>{currentVerse_}</span>
              </div>
              <div>
                <p style={{ color: GOLD, fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>BG {currentVerse.chapter}.{currentVerse_}</p>
                <p style={{ color: ashColor, fontSize: 13 }}>{currentVerse.chapterTitle} · {currentVerse.subtitle || "Bhagavad Gita"}</p>
              </div>
              <button style={{ marginLeft: "auto", backgroundColor: `${SAFFRON}15`, color: SAFFRON, borderRadius: 100, padding: "6px 14px", border: `1px solid ${SAFFRON}33`, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                <Volume2 size={13} /> Listen
              </button>
            </div>

            {/* Sanskrit */}
            <div style={{ marginBottom: 24, padding: "24px 28px", backgroundColor: `${GOLD}08`, borderRadius: 14, border: `1px solid ${GOLD}20` }}>
              <p style={{ color: GOLD, fontSize: Math.floor(fontSize * 1.25), fontFamily: "'Noto Serif Devanagari', serif", lineHeight: 2, whiteSpace: "pre-line" }}>
                {currentVerse.sanskrit}
              </p>
            </div>

            {/* Transliteration */}
            <p style={{ color: ashColor, fontSize: Math.floor(fontSize * 0.85), fontFamily: "'JetBrains Mono', monospace", fontStyle: "italic", lineHeight: 1.9, whiteSpace: "pre-line", marginBottom: 24 }}>
              {currentVerse.transliteration}
            </p>

            {/* Translation */}
            <p style={{ color: textColor, fontSize, lineHeight: 1.9, marginBottom: 28 }}>
              {currentVerse.translation}
            </p>

            {/* Commentary */}
            <div style={{ backgroundColor: surface2Color, borderRadius: 14, border: `1px solid ${BORDER}`, overflow: "hidden" }}>
              <button
                onClick={() => setCommentaryOpen(c => !c)}
                style={{ width: "100%", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer" }}
              >
                <span style={{ color: textColor, fontSize: 15, fontWeight: 500 }}>📜 Commentary</span>
                {commentaryOpen ? <ChevronUp size={16} color={ashColor} /> : <ChevronDown size={16} color={ashColor} />}
              </button>
              <AnimatePresence>
                {commentaryOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: "hidden" }}
                  >
                    <p style={{ color: ashColor, fontSize: fontSize - 1, lineHeight: 1.9, padding: "0 20px 20px" }}>
                      {currentVerse.commentary}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div style={{ borderTop: `1px solid ${BORDER}`, padding: "14px 28px", backgroundColor: surfaceColor, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            onClick={() => setCurrentVerse(v => Math.max(1, v - 1))}
            style={{ display: "flex", alignItems: "center", gap: 8, color: ashColor, background: "none", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "9px 16px", cursor: "pointer", fontSize: 14 }}
            className="hover:text-[#F5ECD7] transition-colors"
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <button
            onClick={() => navigate("/app/chat")}
            style={{ backgroundColor: SAFFRON, color: CREAM, borderRadius: 100, padding: "10px 22px", fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: `0 0 16px ${SAFFRON}33` }}
          >
            <MessageSquare size={16} /> Ask AI about this verse
          </button>
          <button
            onClick={() => setCurrentVerse(v => Math.min(currentVerse.totalVerses, v + 1))}
            style={{ display: "flex", alignItems: "center", gap: 8, color: ashColor, background: "none", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "9px 16px", cursor: "pointer", fontSize: 14 }}
            className="hover:text-[#F5ECD7] transition-colors"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Right: AI Sidebar */}
      <div style={{ width: 320, borderLeft: `1px solid ${BORDER}`, backgroundColor: surfaceColor, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "16px 18px 12px", borderBottom: `1px solid ${BORDER}` }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: textColor, marginBottom: 4 }}>AI Scholar</h3>
          <p style={{ color: ashColor, fontSize: 12 }}>Ask anything about this verse</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {/* Suggested questions */}
          <p style={{ color: ashColor, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Quick Questions</p>
          <div className="flex flex-col gap-2 mb-6">
            {aiQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => { setAiQuery(q); setAiInputOpen(true); navigate("/app/chat"); }}
                style={{ backgroundColor: surface2Color, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 12px", fontSize: 13, color: textColor, cursor: "pointer", textAlign: "left", lineHeight: 1.5 }}
                className="hover:border-[#E8842D] transition-colors"
              >{q}</button>
            ))}
          </div>

          {/* AI Answer Preview */}
          <div style={{ backgroundColor: `${SAFFRON}08`, border: `1px solid ${SAFFRON}20`, borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <p style={{ color: SAFFRON, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Last Answer</p>
            <p style={{ color: textColor, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>
              This verse encapsulates Karma Yoga's core teaching: act with full effort, but surrender the fruit of action to the Divine. The attachment to results is what binds us, not the action itself.
            </p>
            <span style={{ color: GOLD, fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>BG 3.19 · Tatva AI</span>
          </div>

          {/* Cross-scripture links */}
          <p style={{ color: ashColor, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Cross-Scripture Links</p>
          {[
            { text: "Upanishads on selfless action", source: "UP 2.1", color: GOLD },
            { text: "Ramayana: Rama's dharma", source: "RM 3.14", color: EMERALD },
            { text: "Yoga Vasishtha: Non-doership", source: "YV 3.9", color: ASH },
          ].map((l, i) => (
            <div key={i} style={{ backgroundColor: surface2Color, borderRadius: 10, border: `1px solid ${BORDER}`, padding: "10px 12px", marginBottom: 8, cursor: "pointer" }}
              className="hover:border-[#E8842D] transition-colors"
            >
              <p style={{ color: textColor, fontSize: 13, marginBottom: 4 }}>{l.text}</p>
              <span style={{ color: l.color, fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>{l.source}</span>
            </div>
          ))}
        </div>

        {/* AI Input */}
        <div style={{ borderTop: `1px solid ${BORDER}`, padding: 16 }}>
          <div style={{ backgroundColor: surface2Color, borderRadius: 12, border: `1px solid ${BORDER}`, padding: "10px 14px", display: "flex", gap: 8, alignItems: "center" }}>
            <input
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && navigate("/app/chat")}
              placeholder="Ask about this verse…"
              style={{ flex: 1, background: "none", border: "none", outline: "none", color: textColor, fontSize: 13, fontFamily: "Inter, sans-serif" }}
            />
            <button
              onClick={() => navigate("/app/chat")}
              style={{ backgroundColor: SAFFRON, color: CREAM, borderRadius: 8, padding: "6px 12px", border: "none", cursor: "pointer", fontSize: 13 }}
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}