import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Mic, BookOpen, WifiOff, Globe, FileX, Search, ChevronRight } from "lucide-react";

const VOID = "#0A0A0F";
const SURFACE = "#111118";
const SURFACE2 = "#1A1A28";
const BORDER = "#2A2A3F";
const SAFFRON = "#E8842D";
const GOLD = "#D4A843";
const CREAM = "#F5ECD7";
const ASH = "#8B8BA0";
const EMERALD = "#2D7A5F";

const languages = ["EN", "हिं", "मराठी", "தமிழ்", "తెలుగు", "ਪੰਜਾਬੀ"];

function Slide1({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      key="slide1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full text-center px-8"
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex items-center justify-center mb-8"
        style={{ width: 120, height: 120 }}
      >
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: `radial-gradient(circle, ${SAFFRON}20 0%, transparent 70%)`,
          animation: "pulse 3s ease-in-out infinite",
        }} />
        <div style={{
          width: 100, height: 100, borderRadius: "50%",
          border: `1.5px solid ${GOLD}55`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", inset: -12, borderRadius: "50%",
            border: `1px solid ${GOLD}22`,
          }} />
          <div style={{
            position: "absolute", inset: -22, borderRadius: "50%",
            border: `1px solid ${GOLD}11`,
          }} />
          <span style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: 56, color: GOLD, lineHeight: 1 }}>त</span>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 700, color: CREAM, marginBottom: 12, lineHeight: 1.2 }}
      >
        Tatva AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ color: GOLD, fontSize: 15, fontStyle: "italic", marginBottom: 8 }}
      >
        Ancient Wisdom. Intelligently Unlocked.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={{ color: ASH, fontSize: 14, marginBottom: 48 }}
      >
        Ask the scriptures. In your language.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex flex-col gap-3 w-full"
        style={{ maxWidth: 320 }}
      >
        <button
          onClick={onNext}
          style={{ backgroundColor: SAFFRON, color: CREAM, borderRadius: 100, padding: "16px 32px", fontSize: 16, fontWeight: 500, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 0 24px ${SAFFRON}44` }}
        >
          Get Started <ArrowRight size={18} />
        </button>
        <button
          style={{ backgroundColor: "transparent", color: ASH, border: "none", cursor: "pointer", fontSize: 14, padding: "8px" }}
        >
          Already have an account? Sign in
        </button>
      </motion.div>
    </motion.div>
  );
}

function Slide2({ onNext }: { onNext: () => void }) {
  const problems = [
    { icon: <Globe size={22} />, title: "English Only", desc: "Most translations are in English, alienating 90% of potential seekers", color: SAFFRON },
    { icon: <FileX size={22} />, title: "Unreadable PDFs", desc: "Scripture PDFs are scanned, unsearchable, and without context", color: GOLD },
    { icon: <Search size={22} />, title: "No Real Answers", desc: "Search engines return Wikipedia, not actual verse citations", color: EMERALD },
  ];
  return (
    <motion.div
      key="slide2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col h-full px-8 pt-12"
    >
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 700, color: CREAM, lineHeight: 1.3, marginBottom: 8 }}>
        5,000 years of wisdom.
      </h2>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 600, color: GOLD, lineHeight: 1.3, marginBottom: 32, fontStyle: "italic" }}>
        Locked behind language.
      </h2>

      <div className="flex flex-col gap-4 flex-1">
        {problems.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            style={{ backgroundColor: SURFACE2, borderRadius: 14, border: `1px solid ${BORDER}`, padding: "20px 18px", display: "flex", alignItems: "flex-start", gap: 16 }}
          >
            <div style={{ color: p.color, marginTop: 2, flexShrink: 0 }}>{p.icon}</div>
            <div>
              <p style={{ color: CREAM, fontSize: 16, fontWeight: 500, marginBottom: 4 }}>{p.title}</p>
              <p style={{ color: ASH, fontSize: 13, lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 mb-4"
      >
        <button
          onClick={onNext}
          style={{ width: "100%", backgroundColor: SAFFRON, color: CREAM, borderRadius: 100, padding: "16px 32px", fontSize: 16, fontWeight: 500, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
        >
          See the Solution <ArrowRight size={18} />
        </button>
      </motion.div>
    </motion.div>
  );
}

function Slide3({ onEnter }: { onEnter: () => void }) {
  const [selectedLang, setSelectedLang] = useState("EN");
  const features = [
    { icon: <Mic size={24} />, title: "Speak in your language", desc: "Hindi, Marathi, Tamil, Telugu & more", color: SAFFRON },
    { icon: <BookOpen size={24} />, title: "Get exact verse citations", desc: "Sanskrit + transliteration + translation", color: GOLD },
    { icon: <WifiOff size={24} />, title: "Works fully offline", desc: "Gemma 4 runs locally on your device", color: EMERALD },
  ];
  return (
    <motion.div
      key="slide3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col h-full px-8 pt-12"
    >
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 700, color: CREAM, marginBottom: 28, lineHeight: 1.3 }}>
        Ask. Listen.<br />Understand.
      </h2>

      <div className="flex flex-col gap-4 mb-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.12 }}
            style={{ backgroundColor: SURFACE2, borderRadius: 14, border: `1px solid ${BORDER}`, padding: "18px 16px", display: "flex", alignItems: "flex-start", gap: 14, position: "relative", overflow: "hidden" }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, backgroundColor: f.color }} />
            <div style={{ color: f.color, marginTop: 2, flexShrink: 0 }}>{f.icon}</div>
            <div>
              <p style={{ color: CREAM, fontSize: 15, fontWeight: 500, marginBottom: 3 }}>{f.title}</p>
              <p style={{ color: ASH, fontSize: 13 }}>{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mb-8">
        <p style={{ color: ASH, fontSize: 13, marginBottom: 10 }}>Choose your language:</p>
        <div className="flex gap-2 flex-wrap">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              style={{
                borderRadius: 100, padding: "8px 16px", fontSize: 14,
                border: `1px solid ${selectedLang === lang ? SAFFRON : BORDER}`,
                backgroundColor: selectedLang === lang ? `${SAFFRON}22` : "transparent",
                color: selectedLang === lang ? SAFFRON : ASH,
                cursor: "pointer", fontFamily: "'Noto Serif Devanagari', serif",
              }}
            >{lang}</button>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        <button
          onClick={onEnter}
          style={{ width: "100%", backgroundColor: SAFFRON, color: CREAM, borderRadius: 100, padding: "18px 32px", fontSize: 17, fontWeight: 500, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 0 32px ${SAFFRON}44` }}
        >
          <span style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>तत्त्व</span> Enter Tatva
        </button>
      </motion.div>
    </motion.div>
  );
}

export function Onboarding() {
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: VOID, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
      {/* Radial glow */}
      <div style={{ position: "fixed", inset: 0, background: `radial-gradient(circle at 50% 50%, ${SAFFRON}08 0%, transparent 60%)`, pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 420, height: "100vh", maxHeight: 844, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Progress dots */}
        <div className="absolute top-6 left-0 right-0 flex justify-center gap-2 z-20">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: i === slide ? 24 : 8, height: 8,
                borderRadius: 100,
                backgroundColor: i === slide ? SAFFRON : BORDER,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Back button */}
        {slide > 0 && (
          <button
            onClick={() => setSlide(slide - 1)}
            className="absolute top-5 left-5 z-20"
            style={{ color: ASH, background: "none", border: "none", cursor: "pointer", fontSize: 13 }}
          >
            ← Back
          </button>
        )}

        {/* Slides */}
        <div className="flex-1 relative overflow-hidden" style={{ paddingTop: 48 }}>
          <AnimatePresence mode="wait">
            {slide === 0 && <Slide1 key="s1" onNext={() => setSlide(1)} />}
            {slide === 1 && <Slide2 key="s2" onNext={() => setSlide(2)} />}
            {slide === 2 && <Slide3 key="s3" onEnter={() => navigate("/app")} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
