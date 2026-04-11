import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Send, Mic, Paperclip, Volume2, Save, Share2, ThumbsUp, ThumbsDown, Search, Plus, BookOpen, ChevronRight, RotateCcw, Loader2 } from "lucide-react";

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

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  verse?: {
    ref: string;
    sanskrit: string;
    transliteration: string;
    translation: string;
    explanation: string;
    related: string[];
  };
  timestamp: string;
};

const conversationHistory = [
  { id: "c1", title: "What is the meaning of karma?", source: "BG", date: "Today" },
  { id: "c2", title: "Dharma vs Adharma in Mahabharata", source: "MB", date: "Yesterday" },
  { id: "c3", title: "Concept of Brahman in Upanishads", source: "UP", date: "Apr 9" },
  { id: "c4", title: "Yoga paths: Bhakti vs Jnana", source: "BG", date: "Apr 8" },
  { id: "c5", title: "Ramayana's message about duty", source: "RM", date: "Apr 7" },
];

const initialMessages: Message[] = [
  {
    id: "m1",
    role: "user",
    content: "What does the Gita say about doing your duty without attachment?",
    timestamp: "10:32 AM",
  },
  {
    id: "m2",
    role: "ai",
    content: "The Bhagavad Gita's core teaching on nishkama karma — action without attachment to results — is most clearly expressed in Chapter 3, Verse 19.",
    verse: {
      ref: "Bhagavad Gita · Chapter 3 · Verse 19",
      sanskrit: "तस्माद् असक्तः सततं कार्यं कर्म समाचर।\nअसक्तो ह्याचरन् कर्म परमाप्नोति पूरुषः॥",
      transliteration: "tasmād asaktaḥ satataṁ kāryaṁ karma samācara\nasakto hyācaran karma param āpnoti pūruṣaḥ",
      translation: "Therefore, without being attached to the results of activities, one should act as a matter of duty; for by working without attachment, one attains the Supreme.",
      explanation: "Krishna explains that performing one's prescribed duties without being attached to the fruits of action is the path to liberation. This teaching forms the foundation of Karma Yoga — the yoga of selfless action. The key is not to abandon action, but to act with full effort while surrendering the outcomes to the Divine.",
      related: ["BG 2.47", "BG 18.66", "YV 4.23"],
    },
    timestamp: "10:32 AM",
  },
];

const suggestedFollowUps = [
  "What are examples of attachment in daily life?",
  "How does this apply to modern work life?",
  "What is the difference between renunciation and detachment?",
];

function VerseCard({ verse }: { verse: Message["verse"] }) {
  const [expanded, setExpanded] = useState(false);
  if (!verse) return null;
  return (
    <div style={{ backgroundColor: SURFACE, borderRadius: 14, border: `1px solid ${BORDER}`, overflow: "hidden", marginTop: 12 }}>
      {/* Citation badge */}
      <div style={{ backgroundColor: `${SAFFRON}15`, borderBottom: `1px solid ${SAFFRON}25`, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
        <BookOpen size={13} color={SAFFRON} />
        <span style={{ color: SAFFRON, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>📖 {verse.ref}</span>
      </div>
      <div style={{ padding: 16 }}>
        {/* Sanskrit */}
        <p style={{ color: GOLD, fontSize: 16, fontFamily: "'Noto Serif Devanagari', serif", lineHeight: 1.9, marginBottom: 8 }}>{verse.sanskrit}</p>
        {/* Transliteration */}
        <p style={{ color: ASH, fontSize: 13, fontFamily: "'JetBrains Mono', monospace", fontStyle: "italic", lineHeight: 1.7, marginBottom: 12 }}>{verse.transliteration}</p>
        {/* Translation */}
        <p style={{ color: CREAM, fontSize: 15, lineHeight: 1.8, marginBottom: 12 }}>{verse.translation}</p>
        {/* Explanation (collapsible) */}
        {expanded && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            style={{ color: ASH, fontSize: 14, lineHeight: 1.8, marginBottom: 12 }}
          >{verse.explanation}</motion.p>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ color: SAFFRON, fontSize: 13, background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 14 }}
        >
          {expanded ? "Show less ↑" : "Read explanation ↓"}
        </button>
        {/* Related verses */}
        <div className="flex gap-2 flex-wrap">
          {verse.related.map((ref) => (
            <span key={ref} style={{ backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "4px 10px", fontSize: 12, color: GOLD, fontFamily: "'JetBrains Mono', monospace", cursor: "pointer" }}>{ref}</span>
          ))}
        </div>
      </div>
      {/* Action row */}
      <div style={{ borderTop: `1px solid ${BORDER}`, padding: "10px 16px", display: "flex", gap: 8, alignItems: "center" }}>
        <button style={{ backgroundColor: SAFFRON, color: CREAM, borderRadius: 100, padding: "7px 16px", fontSize: 13, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <Volume2 size={13} /> Hear this
        </button>
        <button style={{ color: ASH, background: "none", border: `1px solid ${BORDER}`, borderRadius: 100, padding: "7px 14px", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
          <Save size={13} /> Save
        </button>
        <button style={{ color: ASH, background: "none", border: `1px solid ${BORDER}`, borderRadius: 100, padding: "7px 14px", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
          <Share2 size={13} /> Share
        </button>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <button style={{ color: ASH, background: "none", border: `1px solid ${BORDER}`, borderRadius: 100, padding: "7px 12px", cursor: "pointer" }}><ThumbsUp size={13} /></button>
          <button style={{ color: ASH, background: "none", border: `1px solid ${BORDER}`, borderRadius: 100, padding: "7px 12px", cursor: "pointer" }}><ThumbsDown size={13} /></button>
        </div>
      </div>
    </div>
  );
}

export function ChatInterface() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeConv, setActiveConv] = useState("c1");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const q = text || input;
    if (!q.trim()) return;
    const userMsg: Message = { id: `m${Date.now()}`, role: "user", content: q, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const aiMsg: Message = {
        id: `m${Date.now() + 1}`,
        role: "ai",
        content: "The Bhagavad Gita addresses this profoundly in Chapter 2, emphasizing the eternal nature of the Self and the impermanence of action-results.",
        verse: {
          ref: "Bhagavad Gita · Chapter 2 · Verse 47",
          sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
          transliteration: "karmaṇy-evādhikāras te mā phaleṣu kadācana\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi",
          translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
          explanation: "This is perhaps the most quoted verse of the entire Gita. Krishna makes a fundamental distinction: you own your actions (karma), but not their fruits (phala). This verse is the cornerstone of Karma Yoga.",
          related: ["BG 3.19", "BG 18.66", "BG 5.10"],
        },
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 1800);
  };

  return (
    <div style={{ height: "100vh", display: "flex", backgroundColor: VOID, fontFamily: "Inter, sans-serif", color: CREAM }}>
      {/* Left: Conversation History */}
      <div style={{ width: 280, borderRight: `1px solid ${BORDER}`, backgroundColor: SURFACE, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "20px 16px 12px", borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: CREAM }}>Conversations</span>
            <button style={{ backgroundColor: SAFFRON, color: CREAM, borderRadius: 8, padding: "6px 10px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
              <Plus size={13} /> New
            </button>
          </div>
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: ASH }} />
            <input
              placeholder="Search conversations..."
              style={{ width: "100%", backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "8px 10px 8px 30px", fontSize: 13, color: CREAM, outline: "none", boxSizing: "border-box" }}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {conversationHistory.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConv(conv.id)}
              style={{
                width: "100%", textAlign: "left", padding: "12px 16px",
                backgroundColor: activeConv === conv.id ? SURFACE2 : "transparent",
                borderLeft: `3px solid ${activeConv === conv.id ? SAFFRON : "transparent"}`,
                border: "none", cursor: "pointer",
                borderBottom: `1px solid ${BORDER}`,
              }}
            >
              <p style={{ color: activeConv === conv.id ? CREAM : ASH, fontSize: 13, marginBottom: 4, lineHeight: 1.4 }}>{conv.title}</p>
              <div className="flex items-center gap-2">
                <span style={{ backgroundColor: `${GOLD}15`, color: GOLD, borderRadius: 4, padding: "1px 6px", fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}>{conv.source}</span>
                <span style={{ color: ASH, fontSize: 11 }}>{conv.date}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Center: Chat Canvas */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Chat header */}
        <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: SURFACE }}>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: CREAM }}>Ask the Scriptures</h2>
            <p style={{ color: ASH, fontSize: 13 }}>Gemma 4 · Vedic Scholar Mode · 47 scriptures indexed</p>
          </div>
          <div className="flex items-center gap-3">
            <div style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: `${EMERALD}15`, border: `1px solid ${EMERALD}33`, borderRadius: 100, padding: "5px 12px" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: EMERALD }} />
              <span style={{ color: EMERALD, fontSize: 12 }}>Model Active</span>
            </div>
            <button style={{ color: ASH, background: "none", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "7px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
              <RotateCcw size={13} /> Clear
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start", maxWidth: "100%" }}
              >
                {msg.role === "user" ? (
                  <div style={{ backgroundColor: SURFACE2, borderRadius: "14px 14px 4px 14px", padding: "12px 16px", maxWidth: "70%", border: `1px solid ${BORDER}` }}>
                    <p style={{ color: CREAM, fontSize: 15, lineHeight: 1.6 }}>{msg.content}</p>
                    <p style={{ color: ASH, fontSize: 11, marginTop: 6, textAlign: "right" }}>{msg.timestamp}</p>
                  </div>
                ) : (
                  <div style={{ maxWidth: "88%" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div style={{ width: 26, height: 26, borderRadius: "50%", border: `1px solid ${GOLD}44`, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: `${GOLD}10` }}>
                        <span style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: 12, color: GOLD }}>त</span>
                      </div>
                      <span style={{ color: GOLD, fontSize: 13, fontWeight: 500 }}>Tatva AI</span>
                      <span style={{ color: ASH, fontSize: 11 }}>{msg.timestamp}</span>
                    </div>
                    <p style={{ color: CREAM, fontSize: 15, lineHeight: 1.7, marginBottom: msg.verse ? 0 : 0 }}>{msg.content}</p>
                    {msg.verse && <VerseCard verse={msg.verse} />}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
              <div style={{ width: 26, height: 26, borderRadius: "50%", border: `1px solid ${GOLD}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: 12, color: GOLD }}>त</span>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: SAFFRON }}
                  />
                ))}
              </div>
              <span style={{ color: ASH, fontSize: 13 }}>Searching scriptures…</span>
            </motion.div>
          )}

          {/* Suggested follow-ups */}
          {!loading && messages.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {suggestedFollowUps.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 100, padding: "7px 14px", fontSize: 13, color: ASH, cursor: "pointer" }}
                  className="hover:border-[#E8842D] hover:text-[#F5ECD7] transition-colors"
                >{s}</button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div style={{ borderTop: `1px solid ${BORDER}`, padding: "16px 24px", backgroundColor: SURFACE }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, backgroundColor: SURFACE2, borderRadius: 16, border: `1px solid ${BORDER}`, padding: "12px 16px" }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Ask a follow-up question about the scriptures…"
              rows={1}
              style={{ flex: 1, backgroundColor: "transparent", border: "none", outline: "none", color: CREAM, fontSize: 15, resize: "none", fontFamily: "Inter, sans-serif", lineHeight: 1.6, caretColor: SAFFRON }}
            />
            <div className="flex gap-2 items-center flex-shrink-0">
              <button style={{ color: ASH, background: "none", border: "none", cursor: "pointer", padding: 6 }}><Paperclip size={17} /></button>
              <button style={{ color: ASH, background: "none", border: "none", cursor: "pointer", padding: 6 }}><Mic size={17} /></button>
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                style={{ backgroundColor: input.trim() ? SAFFRON : BORDER, color: CREAM, borderRadius: 10, padding: "8px 14px", border: "none", cursor: input.trim() ? "pointer" : "default", display: "flex", alignItems: "center", gap: 6, fontSize: 14, transition: "background-color 0.2s" }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
          <p style={{ color: ASH, fontSize: 11, textAlign: "center", marginTop: 8 }}>Tatva AI may make mistakes. Always verify important citations directly from the source texts.</p>
        </div>
      </div>

      {/* Right: Context Panel */}
      <div style={{ width: 340, borderLeft: `1px solid ${BORDER}`, backgroundColor: SURFACE, flexShrink: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${BORDER}` }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: CREAM }}>Context Panel</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {/* Current verse */}
          <div style={{ backgroundColor: SURFACE2, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 16, marginBottom: 16 }}>
            <p style={{ color: SAFFRON, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Current Reference</p>
            <p style={{ color: CREAM, fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Bhagavad Gita</p>
            <p style={{ color: ASH, fontSize: 13, marginBottom: 12 }}>Chapter 3 · Verse 19</p>
            <p style={{ color: GOLD, fontSize: 14, fontFamily: "'Noto Serif Devanagari', serif", lineHeight: 1.8 }}>तस्माद् असक्तः सततं</p>
            <button
              onClick={() => navigate("/app/reader")}
              style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 5, color: SAFFRON, background: "none", border: `1px solid ${SAFFRON}44`, borderRadius: 8, padding: "7px 12px", cursor: "pointer", fontSize: 13, width: "100%", justifyContent: "center" }}
            >
              Open in Reader <ChevronRight size={14} />
            </button>
          </div>

          {/* Related verses */}
          <p style={{ color: ASH, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Related Verses</p>
          {["BG 2.47 · Karmanye Vadhikaraste", "BG 18.66 · Sarva-dharman Parityajya", "YV 4.23 · Nishkama Karma", "UP 1.3 · Atman and Action"].map((v, i) => (
            <div
              key={i}
              style={{ backgroundColor: SURFACE2, borderRadius: 10, border: `1px solid ${BORDER}`, padding: "10px 12px", marginBottom: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
              className="hover:border-[#E8842D] transition-colors"
            >
              <span style={{ color: CREAM, fontSize: 13 }}>{v}</span>
              <ChevronRight size={13} color={ASH} />
            </div>
          ))}

          {/* Sanskrit etymology */}
          <p style={{ color: ASH, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, marginTop: 16 }}>Sanskrit Etymology</p>
          {[
            { word: "असक्तः", roman: "asaktaḥ", meaning: "without attachment; non-clinging" },
            { word: "कर्म", roman: "karma", meaning: "action, deed, work" },
            { word: "धर्म", roman: "dharma", meaning: "duty, righteousness, cosmic order" },
          ].map((e, i) => (
            <div key={i} style={{ backgroundColor: SURFACE2, borderRadius: 10, border: `1px solid ${BORDER}`, padding: "10px 12px", marginBottom: 8 }}>
              <div className="flex items-baseline gap-6 mb-1">
                <span style={{ color: GOLD, fontSize: 15, fontFamily: "'Noto Serif Devanagari', serif" }}>{e.word}</span>
                <span style={{ color: ASH, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontStyle: "italic" }}>{e.roman}</span>
              </div>
              <p style={{ color: CREAM, fontSize: 12, lineHeight: 1.5 }}>{e.meaning}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
