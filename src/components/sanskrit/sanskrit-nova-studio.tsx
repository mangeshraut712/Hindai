"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  Copy,
  GraduationCap,
  Languages,
  Loader2,
  RotateCcw,
  Send,
  Sparkles,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sanskritTracks } from "@/lib/sanskrit/tracks";
import { runSanskritTool } from "@/lib/sanskrit/run-tool";
import { ServerFeatureNotice } from "@/components/ai/server-feature-notice";
import { appFetch } from "@/lib/runtime/app-fetch";

type StudioMode = "learn" | "translate" | "analyze" | "grounded" | "agentic";
type StudioTab = "tutor" | "transliterate" | "tracks";
type StudioLanguage = "en" | "hi";

type TutorMessage = {
  id: string;
  role: "learner" | "gemma";
  content: string;
  model?: string;
  transliteration?: string;
};

const modeLabels: Array<{
  id: StudioMode;
  label: string;
  labelHi: string;
  helper: string;
  helperHi: string;
}> = [
  {
    id: "learn",
    label: "Tutor",
    labelHi: "अध्ययन",
    helper: "Clear teaching with examples",
    helperHi: "उदाहरणों के साथ सरल शिक्षा",
  },
  {
    id: "translate",
    label: "Translate",
    labelHi: "अनुवाद",
    helper: "Meaning, nuance, transliteration",
    helperHi: "अर्थ, भाव, और लिप्यंतरण",
  },
  {
    id: "analyze",
    label: "Analyze",
    labelHi: "विश्लेषण",
    helper: "Grammar and context",
    helperHi: "व्याकरण और संदर्भ",
  },
  {
    id: "grounded",
    label: "Grounded",
    labelHi: "संदर्भित",
    helper: "Scripture-aware explanation",
    helperHi: "ग्रन्थ-संदर्भ के साथ उत्तर",
  },
  {
    id: "agentic",
    label: "Agentic",
    labelHi: "योजनाबद्ध",
    helper: "Plan, answer, and next practice",
    helperHi: "योजना, उत्तर, और अगला अभ्यास",
  },
];

const promptSuggestionsEn = [
  "Explain dharma with one Sanskrit example",
  "Translate योगश्चित्तवृत्तिनिरोधः",
  "Analyze रामो वनं गच्छति",
  "Give me a 7-day Sanskrit foundations plan",
];

const promptSuggestionsHi = [
  "धर्म को एक संस्कृत उदाहरण के साथ समझाइए",
  "योगश्चित्तवृत्तिनिरोधः का हिंदी अनुवाद करें",
  "रामो वनं गच्छति का व्याकरण विश्लेषण करें",
  "मुझे 7 दिन की संस्कृत आधार योजना दें",
];

export function SanskritNovaStudio() {
  const [activeTab, setActiveTab] = useState<StudioTab>("tutor");
  const [language, setLanguage] = useState<StudioLanguage>("en");
  const [mode, setMode] = useState<StudioMode>("learn");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [transliterationInput, setTransliterationInput] = useState("रामो गच्छति");
  const [transliterationResult, setTransliterationResult] = useState("");
  const [transliterationHistory, setTransliterationHistory] = useState<
    Array<{ input: string; output: string }>
  >([]);
  const [isTransliterating, setIsTransliterating] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeMode = useMemo(
    () => modeLabels.find((item) => item.id === mode) || modeLabels[0],
    [mode]
  );
  const promptSuggestions = language === "hi" ? promptSuggestionsHi : promptSuggestionsEn;
  const displayedTracks = sanskritTracks.map((track) => ({
    ...track,
    displayTitle: language === "hi" ? track.titleHi : track.title,
    displayLevel: language === "hi" ? track.levelHi : track.level,
    displayDuration: language === "hi" ? track.durationHi : track.duration,
    displayFocus: language === "hi" ? track.focusHi : track.focus,
    displayPlan: language === "hi" ? track.planHi : track.plan,
  }));

  const submitTutorMessage = async () => {
    const message = input.trim();
    if (!message || isLoading) return;

    const learnerMessage: TutorMessage = {
      id: crypto.randomUUID(),
      role: "learner",
      content: message,
    };

    setMessages((current) => [...current, learnerMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await appFetch("/api/sanskrit/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, mode, lang: language }),
      });
      const payload = (await response.json().catch(() => null)) as {
        reply?: string;
        model?: string;
        transliteration?: string;
        error?: string;
      } | null;

      if (!response.ok || !payload?.reply) {
        throw new Error(payload?.error || "Gemma 4 Sanskrit tutor failed.");
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "gemma",
          content: payload.reply || "",
          model: payload.model,
          transliteration: payload.transliteration,
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "gemma",
          content:
            error instanceof Error
              ? error.message
              : "Gemma 4 is unavailable. Check the OpenRouter configuration.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const transliterate = async () => {
    const text = transliterationInput.trim();
    if (!text || isTransliterating) return;

    setIsTransliterating(true);
    setCopied(false);

    try {
      const payload = runSanskritTool("transliterate", text) as {
        iast?: string;
      };

      if (!payload.iast) {
        throw new Error("Transliteration failed.");
      }

      setTransliterationResult(payload.iast);
      setTransliterationHistory((current) =>
        [
          { input: text, output: payload.iast || "" },
          ...current.filter((item) => item.input !== text),
        ].slice(0, 5)
      );
    } catch (error) {
      setTransliterationResult(
        error instanceof Error ? error.message : "Transliteration failed. Please try again."
      );
    } finally {
      setIsTransliterating(false);
    }
  };

  const copyTransliteration = async () => {
    if (!transliterationResult) return;
    await navigator.clipboard.writeText(transliterationResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const speakTransliteration = () => {
    if (!transliterationResult || typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(transliterationResult);
    utterance.lang = language === "hi" ? "hi-IN" : "en-IN";
    window.speechSynthesis.speak(utterance);
  };

  const clearTransliteration = () => {
    setTransliterationInput("");
    setTransliterationResult("");
    setCopied(false);
  };

  const useTransliterationInTutor = () => {
    const text = transliterationInput.trim();
    if (!text) return;
    setInput(`Analyze and explain this Sanskrit phrase: ${text}`);
    setMode("analyze");
    setActiveTab("tutor");
  };

  const handleTutorKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitTutorMessage();
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6">
        <ServerFeatureNotice feature="Gemma 4 Sanskrit tutor" />
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {[
          { id: "tutor" as const, label: "Tutor Studio", icon: Sparkles },
          { id: "transliterate" as const, label: "Transliteration Lab", icon: Languages },
          { id: "tracks" as const, label: "Guided Tracks", icon: GraduationCap },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "premium" : "outline"}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="size-4" />
            {tab.label}
          </Button>
        ))}
        <div className="border-border/70 bg-background/70 ml-auto flex rounded-full border p-1">
          {(["en", "hi"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLanguage(item)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                language === item
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary/70"
              )}
            >
              {item === "en" ? "English" : "हिंदी"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "tutor" ? (
        <section className="surface-panel grid min-h-[680px] overflow-hidden lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="border-border/60 bg-background/55 border-b p-6 backdrop-blur-xl lg:border-r lg:border-b-0">
            <p className="eyebrow">SanskritNova merged</p>
            <h2 className="text-foreground mt-5 font-serif text-4xl font-semibold tracking-[-0.03em]">
              {language === "hi"
                ? "HindAI Gemma 4 पर संस्कृत ट्यूटर।"
                : "Sanskrit tutor on HindAI Gemma 4."}
            </h2>
            <p className="text-muted-foreground mt-4 text-sm leading-7">
              {language === "hi"
                ? "SanskritNova के ट्यूटर मोड अब HindAI के Gemma 4 सेवा से चलते हैं, इसलिए अलग OpenRouter या Python API की जरूरत नहीं है।"
                : "The old SanskritNova tutor modes now run inside HindAI through the existing Gemma 4 service, so there is no separate OpenRouter or Python API to maintain."}
            </p>

            <div className="mt-6 space-y-3">
              {modeLabels.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMode(item.id)}
                  className={cn(
                    "w-full rounded-[22px] border px-4 py-3 text-left transition-colors",
                    mode === item.id
                      ? "border-primary/45 bg-primary/10 text-foreground"
                      : "border-border/60 bg-background/70 text-muted-foreground hover:bg-secondary/70"
                  )}
                >
                  <span className="block text-sm font-semibold">
                    {language === "hi" ? item.labelHi : item.label}
                  </span>
                  <span className="mt-1 block text-xs">
                    {language === "hi" ? item.helperHi : item.helper}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <div className="flex min-h-[680px] flex-col">
            <div className="border-border/60 bg-background/55 border-b px-6 py-4 backdrop-blur-xl">
              <p className="text-muted-foreground text-xs font-medium tracking-[0.24em] uppercase">
                Active mode
              </p>
              <p className="text-foreground mt-1 text-lg font-semibold">
                {language === "hi" ? activeMode.labelHi : activeMode.label}
              </p>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              {messages.length === 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {promptSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setInput(suggestion)}
                      className="border-border/60 bg-card/75 text-muted-foreground hover:bg-secondary/70 rounded-[24px] border p-5 text-left text-sm leading-7 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.role === "learner" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[86%] rounded-[24px] px-4 py-3 text-sm leading-7 shadow-[0_18px_48px_-36px_rgba(15,23,42,0.4)]",
                        message.role === "learner"
                          ? "bg-primary text-primary-foreground"
                          : "border-border/60 bg-card/80 text-foreground border"
                      )}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      {message.role === "gemma" && (message.model || message.transliteration) ? (
                        <div className="border-border/50 text-muted-foreground mt-3 flex flex-wrap gap-2 border-t pt-3 text-[11px]">
                          {message.model ? <span>Model: {message.model}</span> : null}
                          {message.transliteration ? (
                            <span>IAST: {message.transliteration}</span>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))
              )}

              {isLoading ? (
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Loader2 className="size-4 animate-spin" />
                  {language === "hi"
                    ? "Gemma 4 संस्कृत उत्तर तैयार कर रहा है..."
                    : "Gemma 4 is preparing the Sanskrit answer..."}
                </div>
              ) : null}
            </div>

            <div className="border-border/60 bg-background/55 border-t p-4 backdrop-blur-xl">
              <div className="flex gap-2">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleTutorKeyDown}
                  rows={3}
                  placeholder={
                    language === "hi"
                      ? "संस्कृत व्याख्या, अनुवाद, व्याकरण, या अध्ययन योजना पूछें..."
                      : "Ask for Sanskrit explanation, translation, grammar, or a learning plan..."
                  }
                  className="border-border/70 bg-background/80 text-foreground placeholder:text-muted-foreground focus-visible:ring-ring/40 min-h-[96px] flex-1 resize-none rounded-[24px] border px-4 py-3 text-sm outline-hidden transition-colors focus-visible:ring-2"
                />
                <Button
                  variant="premium"
                  onClick={submitTutorMessage}
                  disabled={!input.trim() || isLoading}
                  aria-label="Send Sanskrit tutor message"
                >
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}
                  {language === "hi" ? "भेजें" : "Send"}
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "transliterate" ? (
        <section className="surface-panel grid gap-0 overflow-hidden lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-border/60 border-b p-6 lg:border-r lg:border-b-0">
            <p className="eyebrow">Devanagari to IAST</p>
            <h2 className="text-foreground mt-5 font-serif text-4xl font-semibold tracking-[-0.03em]">
              {language === "hi"
                ? "SanskritNova से तेज़ लिप्यंतरण।"
                : "Fast transliteration from SanskritNova."}
            </h2>
            <p className="text-muted-foreground mt-4 text-sm leading-7">
              {language === "hi"
                ? "श्लोक, मंत्र, और छोटे अभ्यास वाक्यों के लिए SanskritNova का त्वरित रूपांतरण अब HindAI में है।"
                : "This keeps SanskritNova's quick conversion workflow inside HindAI for verses, mantras, and short study phrases."}
            </p>
          </div>

          <div className="space-y-4 p-6">
            <textarea
              aria-label="Text to transliterate"
              value={transliterationInput}
              onChange={(event) => setTransliterationInput(event.target.value)}
              rows={5}
              className="border-border/70 bg-background/80 font-devanagari text-foreground focus-visible:ring-ring/40 min-h-[150px] w-full resize-none rounded-[24px] border px-4 py-3 text-lg outline-hidden focus-visible:ring-2"
            />
            <div className="flex flex-wrap gap-2">
              <Button
                variant="premium"
                onClick={transliterate}
                disabled={!transliterationInput.trim() || isTransliterating}
              >
                {isTransliterating ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Languages className="size-4" />
                )}
                Transliterate
              </Button>
              <Button
                variant="outline"
                onClick={copyTransliteration}
                disabled={!transliterationResult}
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button
                variant="outline"
                onClick={speakTransliteration}
                disabled={!transliterationResult}
              >
                <Volume2 className="size-4" />
                Speak
              </Button>
              <Button variant="outline" onClick={useTransliterationInTutor}>
                <Sparkles className="size-4" />
                Ask Tutor
              </Button>
              <Button variant="ghost" onClick={clearTransliteration}>
                <RotateCcw className="size-4" />
                Clear
              </Button>
            </div>

            <div className="border-border/60 bg-card/75 min-h-[140px] rounded-[24px] border p-5">
              <p className="text-muted-foreground text-xs font-medium tracking-[0.24em] uppercase">
                IAST output
              </p>
              <p className="text-foreground mt-3 text-lg leading-8 wrap-break-word">
                {transliterationResult || "Press transliterate to convert the text."}
              </p>
            </div>
            <div className="border-border/60 bg-background/70 rounded-[24px] border p-5">
              <p className="text-muted-foreground text-xs font-medium tracking-[0.24em] uppercase">
                Recent examples
              </p>
              <div className="mt-3 grid gap-2">
                {(transliterationHistory.length
                  ? transliterationHistory
                  : [
                      { input: "रामो गच्छति", output: "rāmo gacchati" },
                      { input: "नमस्ते", output: "namaste" },
                    ]
                ).map((item) => (
                  <button
                    key={`${item.input}-${item.output}`}
                    type="button"
                    onClick={() => {
                      setTransliterationInput(item.input);
                      setTransliterationResult(item.output);
                    }}
                    className="border-border/60 bg-card/70 hover:bg-secondary/70 rounded-[16px] border px-4 py-3 text-left transition-colors"
                  >
                    <span className="font-devanagari text-foreground block text-sm">
                      {item.input}
                    </span>
                    <span className="text-muted-foreground mt-1 block text-sm">{item.output}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "tracks" ? (
        <section className="grid gap-5 lg:grid-cols-3">
          {displayedTracks.map((track) => (
            <article key={track.slug} className="surface-panel p-6">
              <div className="relative z-10">
                <div className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-full">
                  <BookOpen className="size-5" />
                </div>
                <p className="text-muted-foreground mt-5 text-xs font-medium tracking-[0.24em] uppercase">
                  {track.displayLevel} · {track.displayDuration}
                </p>
                <h2 className="text-foreground mt-3 text-2xl font-semibold">
                  {track.displayTitle}
                </h2>
                <p className="font-devanagari text-muted-foreground mt-1 text-base">
                  {track.titleHi}
                </p>
                <p className="text-muted-foreground mt-4 text-sm leading-7">{track.displayFocus}</p>
                <div className="border-border/60 bg-background/70 mt-5 rounded-[20px] border p-4">
                  <p className="text-foreground text-sm font-semibold">
                    {language === "hi" ? "अभ्यास क्रम" : "Practice loop"}
                  </p>
                  <ul className="text-muted-foreground mt-3 space-y-2 text-sm leading-6">
                    {track.displayPlan.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : null}
    </div>
  );
}
