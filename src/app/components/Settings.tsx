import { useState } from "react";
import { motion } from "motion/react";
import { Download, Check, Wifi, WifiOff, Cpu, Globe, Volume2, ChevronRight, Info, RotateCcw, Trash2 } from "lucide-react";

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

const offlinePacks = [
  { id: "gita", name: "Bhagavad Gita", size: "2.1 MB", verses: 700, downloaded: true, color: GOLD },
  { id: "upanishads", name: "Upanishads (Core 13)", size: "4.8 MB", verses: 2000, downloaded: true, color: GOLD },
  { id: "ramayana", name: "Ramayana", size: "8.4 MB", verses: 24000, downloaded: false, color: SAFFRON },
  { id: "mahabharata", name: "Mahabharata", size: "18.2 MB", verses: 100000, downloaded: false, color: SAFFRON },
  { id: "rigveda", name: "Rigveda", size: "6.3 MB", verses: 10552, downloaded: false, color: GOLD },
  { id: "all", name: "All Scriptures (47 texts)", size: "34 MB", verses: 142000, downloaded: false, color: EMERALD },
];

const languages = [
  { code: "en", name: "English", script: "English", selected: true },
  { code: "hi", name: "Hindi", script: "हिन्दी", selected: false },
  { code: "mr", name: "Marathi", script: "मराठी", selected: false },
  { code: "ta", name: "Tamil", script: "தமிழ்", selected: false },
  { code: "te", name: "Telugu", script: "తెలుగు", selected: false },
  { code: "pa", name: "Punjabi", script: "ਪੰਜਾਬੀ", selected: false },
  { code: "sa", name: "Sanskrit", script: "संस्कृत", selected: false },
];

function SectionHeader({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="mb-5">
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: CREAM, marginBottom: 4 }}>{title}</h2>
      {desc && <p style={{ color: ASH, fontSize: 14 }}>{desc}</p>}
    </div>
  );
}

function SettingRow({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${BORDER}` }}>
      <div>
        <p style={{ color: CREAM, fontSize: 14, marginBottom: desc ? 3 : 0 }}>{label}</p>
        {desc && <p style={{ color: ASH, fontSize: 12 }}>{desc}</p>}
      </div>
      <div style={{ flexShrink: 0, marginLeft: 16 }}>{children}</div>
    </div>
  );
}

function Toggle({ value, onChange, color = SAFFRON }: { value: boolean; onChange: (v: boolean) => void; color?: string }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: 44, height: 24, borderRadius: 100,
        backgroundColor: value ? color : BORDER,
        border: "none", cursor: "pointer", position: "relative",
        transition: "background-color 0.2s",
      }}
    >
      <div style={{
        position: "absolute", top: 3,
        left: value ? 23 : 3,
        width: 18, height: 18, borderRadius: "50%",
        backgroundColor: CREAM,
        transition: "left 0.2s",
      }} />
    </button>
  );
}

export function Settings() {
  const [selectedLang, setSelectedLang] = useState("en");
  const [voiceSpeed, setVoiceSpeed] = useState<"slow" | "normal" | "fast">("normal");
  const [voiceLang, setVoiceLang] = useState("en");
  const [downloads, setDownloads] = useState<Record<string, boolean>>({ gita: true, upanishads: true });
  const [downloading, setDownloading] = useState<string | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const [showSanskrit, setShowSanskrit] = useState(true);
  const [showTranslit, setShowTranslit] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  const handleDownload = (id: string) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloads(d => ({ ...d, [id]: true }));
      setDownloading(null);
    }, 2000);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: VOID, padding: "32px 40px", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 700, color: CREAM, marginBottom: 8 }}>Settings</h1>
          <p style={{ color: ASH, fontSize: 15 }}>Configure Tatva AI for your ideal scholarly experience.</p>
        </motion.div>

        {/* Language Preference */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ backgroundColor: SURFACE, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 28, marginBottom: 20 }}>
          <SectionHeader title="Language Preference" desc="Choose your primary interface and response language" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                style={{
                  padding: "14px 12px",
                  borderRadius: 12,
                  border: `1px solid ${selectedLang === lang.code ? SAFFRON : BORDER}`,
                  backgroundColor: selectedLang === lang.code ? `${SAFFRON}15` : SURFACE2,
                  cursor: "pointer", textAlign: "center",
                  transition: "all 0.15s",
                }}
              >
                <p style={{ color: GOLD, fontSize: 20, fontFamily: "'Noto Serif Devanagari', serif", marginBottom: 4 }}>{lang.script}</p>
                <p style={{ color: selectedLang === lang.code ? SAFFRON : ASH, fontSize: 13 }}>{lang.name}</p>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Voice Settings */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          style={{ backgroundColor: SURFACE, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 28, marginBottom: 20 }}>
          <SectionHeader title="Voice Settings" desc="Configure voice input and text-to-speech output" />

          <SettingRow label="Speech Speed" desc="How fast Tatva reads back answers">
            <div className="flex gap-1">
              {(["slow", "normal", "fast"] as const).map((speed) => (
                <button
                  key={speed}
                  onClick={() => setVoiceSpeed(speed)}
                  style={{
                    padding: "7px 14px", borderRadius: 100, fontSize: 13, cursor: "pointer",
                    border: `1px solid ${voiceSpeed === speed ? SAFFRON : BORDER}`,
                    backgroundColor: voiceSpeed === speed ? `${SAFFRON}20` : "transparent",
                    color: voiceSpeed === speed ? SAFFRON : ASH,
                    textTransform: "capitalize",
                  }}
                >{speed}</button>
              ))}
            </div>
          </SettingRow>

          <SettingRow label="TTS Voice Language" desc="Language for spoken responses">
            <select
              value={voiceLang}
              onChange={(e) => setVoiceLang(e.target.value)}
              style={{ backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "8px 12px", color: CREAM, fontSize: 13, outline: "none", cursor: "pointer" }}
            >
              {languages.map((l) => <option key={l.code} value={l.code} style={{ backgroundColor: SURFACE2 }}>{l.name}</option>)}
            </select>
          </SettingRow>

          <SettingRow label="Auto-play responses" desc="Automatically read AI answers aloud">
            <Toggle value={autoPlay} onChange={setAutoPlay} />
          </SettingRow>
        </motion.section>

        {/* Display Settings */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ backgroundColor: SURFACE, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 28, marginBottom: 20 }}>
          <SectionHeader title="Display Settings" desc="Customize how scripture content is shown" />

          <SettingRow label="Show Sanskrit verses" desc="Display original Devanagari text">
            <Toggle value={showSanskrit} onChange={setShowSanskrit} color={GOLD} />
          </SettingRow>
          <SettingRow label="Show transliteration" desc="Display romanized phonetic text">
            <Toggle value={showTranslit} onChange={setShowTranslit} color={GOLD} />
          </SettingRow>
          <SettingRow label="Dark mode" desc="Dark scholarly reading experience">
            <Toggle value={darkMode} onChange={setDarkMode} />
          </SettingRow>
        </motion.section>

        {/* Offline Data Packs */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          style={{ backgroundColor: SURFACE, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 28, marginBottom: 20 }}>
          <SectionHeader title="Offline Data Packs" desc="Download scriptures for use without internet connection" />

          <div className="flex flex-col gap-3">
            {offlinePacks.map((pack) => {
              const isDownloaded = downloads[pack.id];
              const isDownloading = downloading === pack.id;
              return (
                <div key={pack.id} style={{
                  backgroundColor: SURFACE2, borderRadius: 12, border: `1px solid ${isDownloaded ? pack.color + "33" : BORDER}`,
                  padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div className="flex items-center gap-12">
                    <div>
                      <p style={{ color: CREAM, fontSize: 14, fontWeight: 500, marginBottom: 3 }}>{pack.name}</p>
                      <div className="flex gap-3">
                        <span style={{ color: pack.color, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>{pack.size}</span>
                        <span style={{ color: ASH, fontSize: 12 }}>{pack.verses.toLocaleString()} verses</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {isDownloaded ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, color: EMERALD }}>
                        <Check size={15} />
                        <span style={{ fontSize: 13 }}>Downloaded</span>
                      </div>
                    ) : isDownloading ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 80, height: 4, backgroundColor: BORDER, borderRadius: 100, overflow: "hidden" }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2 }}
                            style={{ height: "100%", backgroundColor: pack.color }}
                          />
                        </div>
                        <span style={{ color: ASH, fontSize: 13 }}>Downloading…</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDownload(pack.id)}
                        style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: `${pack.color}15`, color: pack.color, border: `1px solid ${pack.color}33`, borderRadius: 100, padding: "7px 14px", cursor: "pointer", fontSize: 13 }}
                      >
                        <Download size={13} /> Download
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p style={{ color: ASH, fontSize: 12, marginTop: 14, display: "flex", alignItems: "center", gap: 6 }}>
            <WifiOff size={12} /> Downloaded packs are stored locally and work without internet.
          </p>
        </motion.section>

        {/* AI Model Status */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ backgroundColor: SURFACE, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 28, marginBottom: 20 }}>
          <SectionHeader title="AI Model" desc="Gemma 4 local inference configuration" />

          <div style={{ backgroundColor: `${EMERALD}08`, border: `1px solid ${EMERALD}25`, borderRadius: 12, padding: "16px 18px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className="flex items-center gap-3">
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: EMERALD, boxShadow: `0 0 8px ${EMERALD}` }} />
              <div>
                <p style={{ color: CREAM, fontSize: 14, fontWeight: 500 }}>Gemma 4 E4B (Quantized)</p>
                <p style={{ color: ASH, fontSize: 12 }}>Running locally via Ollama · 4-bit quantization</p>
              </div>
            </div>
            <span style={{ backgroundColor: `${EMERALD}15`, color: EMERALD, borderRadius: 100, padding: "5px 12px", fontSize: 12, border: `1px solid ${EMERALD}33` }}>Running locally ✓</span>
          </div>

          <SettingRow label="Model version" desc="Currently active model">
            <span style={{ color: GOLD, fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>gemma4:e4b-q4_K_M</span>
          </SettingRow>
          <SettingRow label="Context window" desc="Maximum tokens per request">
            <span style={{ color: CREAM, fontSize: 13 }}>128,000 tokens</span>
          </SettingRow>
          <SettingRow label="Inference mode" desc="CPU / GPU acceleration">
            <span style={{ backgroundColor: `${DEEP_BLUE}20`, color: DEEP_BLUE === "#1E3A6E" ? "#5B8FD4" : DEEP_BLUE, borderRadius: 6, padding: "4px 10px", fontSize: 12 }}>CPU + MPS</span>
          </SettingRow>
          <SettingRow label="Fine-tuned model" desc="Sanskrit QA specialization">
            <a href="#" style={{ color: SAFFRON, fontSize: 13, textDecoration: "none" }}>View on HuggingFace →</a>
          </SettingRow>

          <div className="flex gap-3 mt-5">
            <button style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "9px 16px", color: ASH, cursor: "pointer", fontSize: 13 }}>
              <RotateCcw size={13} /> Restart Model
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "9px 16px", color: ASH, cursor: "pointer", fontSize: 13 }}>
              <Download size={13} /> Update Model
            </button>
          </div>
        </motion.section>

        {/* Privacy */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          style={{ backgroundColor: SURFACE, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 28, marginBottom: 20 }}>
          <SectionHeader title="Privacy & Data" desc="Control your data preferences" />
          <SettingRow label="Anonymous usage analytics" desc="Help improve Tatva AI (no personal data)">
            <Toggle value={analytics} onChange={setAnalytics} color={DEEP_BLUE === "#1E3A6E" ? "#5B8FD4" : DEEP_BLUE} />
          </SettingRow>
          <SettingRow label="Push notifications" desc="Daily verse and updates">
            <Toggle value={notifications} onChange={setNotifications} />
          </SettingRow>

          <button style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6, color: "#E05555", background: "none", border: `1px solid #E0555533`, borderRadius: 10, padding: "9px 16px", cursor: "pointer", fontSize: 13 }}>
            <Trash2 size={13} /> Clear all conversation history
          </button>
        </motion.section>

        {/* About */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          style={{ backgroundColor: SURFACE, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 28, marginBottom: 40 }}>
          <SectionHeader title="About Tatva AI" />
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Version", value: "2.0.0-hackathon" },
              { label: "Build", value: "Gemma4Good-2026" },
              { label: "Model", value: "Gemma 4 E4B" },
              { label: "Dataset", value: "Sanskrit QA v2" },
            ].map((item) => (
              <div key={item.label} style={{ backgroundColor: SURFACE2, borderRadius: 10, border: `1px solid ${BORDER}`, padding: "12px 14px" }}>
                <p style={{ color: ASH, fontSize: 12, marginBottom: 4 }}>{item.label}</p>
                <p style={{ color: CREAM, fontSize: 14, fontFamily: "'JetBrains Mono', monospace" }}>{item.value}</p>
              </div>
            ))}
          </div>
          <p style={{ color: ASH, fontSize: 13, marginTop: 16, lineHeight: 1.7 }}>
            Built for the <strong style={{ color: CREAM }}>Gemma 4 Good Hackathon 2026</strong>. Tatva AI is open source under MIT license.
            All scripture data sourced from public domain translations.
          </p>
          <div className="flex gap-3 mt-4 flex-wrap">
            {["GitHub", "HuggingFace", "Documentation", "Report Issue"].map((link) => (
              <a key={link} href="#" style={{ color: SAFFRON, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                {link} <ChevronRight size={12} />
              </a>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
