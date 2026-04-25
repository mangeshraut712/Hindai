"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  Copy,
  GraduationCap,
  Languages,
  Loader2,
  Send,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sanskritTracks } from "@/lib/sanskrit/tracks";

type StudioMode = "learn" | "translate" | "analyze" | "grounded";
type StudioTab = "tutor" | "transliterate" | "tracks";

type TutorMessage = {
  id: string;
  role: "learner" | "gemma";
  content: string;
  model?: string;
  transliteration?: string;
};

const modeLabels: Array<{ id: StudioMode; label: string; helper: string }> = [
  { id: "learn", label: "Tutor", helper: "Clear teaching with examples" },
  { id: "translate", label: "Translate", helper: "Meaning, nuance, transliteration" },
  { id: "analyze", label: "Analyze", helper: "Grammar and context" },
  { id: "grounded", label: "Grounded", helper: "Scripture-aware explanation" },
];

const promptSuggestions = [
  "Explain dharma with one Sanskrit example",
  "Translate योगश्चित्तवृत्तिनिरोधः",
  "Analyze रामो वनं गच्छति",
  "Give me a 7-day Sanskrit foundations plan",
];

export function SanskritNovaStudio() {
  const [activeTab, setActiveTab] = useState<StudioTab>("tutor");
  const [mode, setMode] = useState<StudioMode>("learn");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [transliterationInput, setTransliterationInput] = useState("रामो गच्छति");
  const [transliterationResult, setTransliterationResult] = useState("");
  const [isTransliterating, setIsTransliterating] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeMode = useMemo(
    () => modeLabels.find((item) => item.id === mode) || modeLabels[0],
    [mode]
  );

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
      const response = await fetch("/api/sanskrit/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, mode }),
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
              : "Gemma 4 is unavailable. Check Ollama or hosted Gemma configuration.",
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
      const response = await fetch("/api/sanskrit/transliterate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const payload = (await response.json().catch(() => null)) as {
        iast?: string;
        error?: string;
      } | null;

      if (!response.ok || !payload?.iast) {
        throw new Error(payload?.error || "Transliteration failed.");
      }

      setTransliterationResult(payload.iast);
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

  const handleTutorKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitTutorMessage();
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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
      </div>

      {activeTab === "tutor" ? (
        <section className="surface-panel grid min-h-[680px] overflow-hidden lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="border-b border-border/60 bg-background/55 p-6 backdrop-blur-xl lg:border-b-0 lg:border-r">
            <p className="eyebrow">SanskritNova merged</p>
            <h2 className="mt-5 font-serif text-4xl font-semibold tracking-[-0.03em] text-foreground">
              Sanskrit tutor on HindAI Gemma 4.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The old SanskritNova tutor modes now run inside HindAI through the existing Gemma 4
              service, so there is no separate OpenRouter or Python API to maintain.
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
                  <span className="block text-sm font-semibold">{item.label}</span>
                  <span className="mt-1 block text-xs">{item.helper}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="flex min-h-[680px] flex-col">
            <div className="border-b border-border/60 bg-background/55 px-6 py-4 backdrop-blur-xl">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Active mode
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">{activeMode.label}</p>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              {messages.length === 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {promptSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setInput(suggestion)}
                      className="rounded-[24px] border border-border/60 bg-card/75 p-5 text-left text-sm leading-7 text-muted-foreground transition-colors hover:bg-secondary/70"
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
                          : "border border-border/60 bg-card/80 text-foreground"
                      )}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      {message.role === "gemma" && (message.model || message.transliteration) ? (
                        <div className="mt-3 flex flex-wrap gap-2 border-t border-border/50 pt-3 text-[11px] text-muted-foreground">
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
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  Gemma 4 is preparing the Sanskrit answer...
                </div>
              ) : null}
            </div>

            <div className="border-t border-border/60 bg-background/55 p-4 backdrop-blur-xl">
              <div className="flex gap-2">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleTutorKeyDown}
                  rows={3}
                  placeholder="Ask for Sanskrit explanation, translation, grammar, or a learning plan..."
                  className="min-h-[96px] flex-1 resize-none rounded-[24px] border border-border/70 bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
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
                  Send
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "transliterate" ? (
        <section className="surface-panel grid gap-0 overflow-hidden lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-b border-border/60 p-6 lg:border-b-0 lg:border-r">
            <p className="eyebrow">Devanagari to IAST</p>
            <h2 className="mt-5 font-serif text-4xl font-semibold tracking-[-0.03em] text-foreground">
              Fast transliteration from SanskritNova.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              This keeps SanskritNova&apos;s quick conversion workflow inside HindAI for verses,
              mantras, and short study phrases.
            </p>
          </div>

          <div className="space-y-4 p-6">
            <textarea
              value={transliterationInput}
              onChange={(event) => setTransliterationInput(event.target.value)}
              rows={5}
              className="min-h-[150px] w-full resize-none rounded-[24px] border border-border/70 bg-background/80 px-4 py-3 font-devanagari text-lg text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
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
            </div>

            <div className="min-h-[140px] rounded-[24px] border border-border/60 bg-card/75 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                IAST output
              </p>
              <p className="mt-3 break-words text-lg leading-8 text-foreground">
                {transliterationResult || "Press transliterate to convert the text."}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "tracks" ? (
        <section className="grid gap-5 lg:grid-cols-3">
          {sanskritTracks.map((track) => (
            <article key={track.slug} className="surface-panel p-6">
              <div className="relative z-10">
                <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BookOpen className="size-5" />
                </div>
                <p className="mt-5 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  {track.level} · {track.duration}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-foreground">{track.title}</h2>
                <p className="mt-1 font-devanagari text-base text-muted-foreground">
                  {track.titleHi}
                </p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{track.focus}</p>
                <div className="mt-5 rounded-[20px] border border-border/60 bg-background/70 p-4">
                  <p className="text-sm font-semibold text-foreground">Practice loop</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                    {track.plan.map((step) => (
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
