"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Bot, Languages, Loader2, Send, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DEFAULT_TRANSLATION_LANGUAGE,
  getTranslationLanguageLabel,
  TRANSLATION_LANGUAGES,
  type TranslationLanguage,
} from "@/lib/ai/translation-languages";
import { cn } from "@/lib/utils";
import { scriptureCatalog } from "@/lib/scripture-catalog";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  citations?: string[];
  compareCard?: {
    commonGround?: string[];
    differences?: Array<{
      topic: string;
      insight: string;
    }>;
    classroomUse?: string[];
  };
  translationCard?: {
    targetLang: TranslationLanguage;
    transliteration?: string;
  };
}

interface AIChatProps {
  initialPrompt?: string;
  initialMode?: "explain" | "compare" | "translate";
  initialCompareScriptureIds?: string[];
  initialAudience?: "general" | "student" | "teacher";
}

const compareOptions = scriptureCatalog
  .filter((item) =>
    [
      "bhagavad-gita",
      "yoga-sutras",
      "yoga-vasishtha",
      "rigveda",
      "ramayana",
      "srimad-bhagavatam",
    ].includes(item.slug)
  )
  .map((item) => ({
    id: item.slug,
    label: item.name,
  }));

export function AIChat({
  initialPrompt = "",
  initialMode = "explain",
  initialCompareScriptureIds = [],
  initialAudience = "general",
}: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(initialPrompt);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"explain" | "compare" | "translate">(initialMode);
  const [audience, setAudience] = useState<"general" | "student" | "teacher">(initialAudience);
  const [targetLang, setTargetLang] = useState<TranslationLanguage>(DEFAULT_TRANSLATION_LANGUAGE);
  const [compareScriptureIds, setCompareScriptureIds] = useState<string[]>(
    initialCompareScriptureIds.slice(0, 2)
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  const comparisonSummary = useMemo(
    () =>
      compareScriptureIds
        .map((id) => scriptureCatalog.find((item) => item.slug === id)?.name)
        .filter(Boolean)
        .join(" • "),
    [compareScriptureIds]
  );

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const updateAssistantMessage = (
    aiMessageId: string,
    updates: Pick<Message, "content"> & Partial<Pick<Message, "compareCard" | "translationCard">>
  ) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === aiMessageId
          ? {
              ...msg,
              ...updates,
              compareCard: updates.compareCard ?? msg.compareCard,
              translationCard: updates.translationCard ?? msg.translationCard,
            }
          : msg
      )
    );
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (mode === "translate") {
      await handleTranslate();
      return;
    }

    const prompt = input.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: prompt,
      timestamp: new Date(),
    };

    const aiMessageId = `${Date.now() + 1}`;
    const nextConversation: Message[] = [
      ...messages,
      userMessage,
      {
        id: aiMessageId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
      },
    ];

    setMessages(nextConversation);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextConversation
            .filter((message) => message.role === "user")
            .map(({ role, content }) => ({
              role,
              content,
            })),
          mode,
          audience,
          compareScriptureIds,
        }),
      });

      const compareHeader = response.headers.get("x-hindai-compare-card");
      const compareCard = compareHeader ? JSON.parse(compareHeader) : null;

      if (!response.ok) {
        let errorMessage = "Streaming request failed";
        try {
          const errorData = await response.json();
          if (errorData.error) errorMessage = errorData.error;
        } catch {
          try {
            const errorText = await response.text();
            if (errorText) errorMessage = errorText;
          } catch {
            // ignore
          }
        }
        throw new Error(errorMessage);
      }

      if (!response.body) {
        throw new Error("The AI service returned no response body.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          fullContent += decoder.decode();
          break;
        }

        fullContent += decoder.decode(value, { stream: true });
        updateAssistantMessage(aiMessageId, {
          content: fullContent,
          compareCard,
        });
      }

      if (!fullContent.trim()) {
        throw new Error(
          "Gemma 4 did not return any text. Ensure the OpenRouter backend is configured."
        );
      }

      updateAssistantMessage(aiMessageId, {
        content: fullContent,
        compareCard,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error && error.message.trim().length > 0
          ? error.message
          : "I apologize, but I'm having trouble connecting to the AI service. Please try again in a moment.";

      updateAssistantMessage(aiMessageId, { content: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslate = async () => {
    const sourceText = input.trim();
    if (!sourceText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: sourceText,
      timestamp: new Date(),
    };

    const aiMessageId = `${Date.now() + 1}`;
    const nextConversation: Message[] = [
      ...messages,
      userMessage,
      {
        id: aiMessageId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
      },
    ];

    setMessages(nextConversation);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: sourceText,
          sanskrit: sourceText,
          targetLang,
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        translation?: string;
        transliteration?: string;
      } | null;

      if (!response.ok) {
        throw new Error(payload?.error || "Translation request failed.");
      }

      const translation = payload?.translation?.trim();
      if (!translation) {
        throw new Error("Gemma did not return a translation.");
      }

      updateAssistantMessage(aiMessageId, {
        content: translation,
        translationCard: {
          targetLang,
          transliteration: payload?.transliteration?.trim() || undefined,
        },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error && error.message.trim().length > 0
          ? error.message
          : "I apologize, but the translation service is unavailable right now.";

      updateAssistantMessage(aiMessageId, { content: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions =
    mode === "translate"
      ? ["कर्मण्येवाधिकारस्ते", "असतो मा सद्गमय", "योगश्चित्तवृत्तिनिरोधः", "धर्मो रक्षति रक्षितः"]
      : mode === "compare"
        ? [
            "Compare Bhagavad Gita and Yoga Sutras on discipline",
            "Compare Ramayana and Srimad Bhagavatam on devotion",
            "Compare karma and detachment across two scriptures",
          ]
        : [
            "What is Karma Yoga?",
            "Explain Dharma in simple terms",
            "What does Bhagavad Gita 2.47 mean?",
            "Teach me about meditation from Yoga Sutras",
            "How should a beginner read the Gita?",
          ];

  const toggleCompareScripture = (id: string) => {
    setCompareScriptureIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      if (current.length >= 2) {
        return [current[1], id];
      }

      return [...current, id];
    });
  };

  return (
    <Card className="surface-panel mx-auto flex min-h-[760px] w-full max-w-6xl flex-col overflow-hidden border-border/60">
      <CardHeader className="border-b border-border/60 bg-background/55 px-6 py-5 backdrop-blur-xl">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span>AI Scripture Guide</span>
            <span className="mt-1 text-xs font-normal uppercase tracking-[0.24em] text-muted-foreground">
              Explain, compare, and translate with Gemma 4 via OpenRouter
            </span>
          </div>
          <span className="ml-auto rounded-full border border-border/70 bg-background/65 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Local model
          </span>
        </CardTitle>
      </CardHeader>

      <ScrollArea ref={scrollRef} className="flex-1 px-6 py-6">
        <div className="mb-6 space-y-5 rounded-[28px] border border-border/60 bg-background/70 p-5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={mode === "explain" ? "premium" : "outline"}
              size="sm"
              onClick={() => setMode("explain")}
            >
              Explain mode
            </Button>
            <Button
              variant={mode === "compare" ? "premium" : "outline"}
              size="sm"
              onClick={() => setMode("compare")}
            >
              Compare texts
            </Button>
            <Button
              variant={mode === "translate" ? "premium" : "outline"}
              size="sm"
              onClick={() => setMode("translate")}
            >
              <Languages className="size-4" />
              Translate
            </Button>
          </div>

          {mode === "translate" ? (
            <div className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
              <div className="bg-card/72 rounded-[22px] border border-border/60 p-4">
                <p className="text-sm font-medium text-foreground">Indian language translation</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Paste a Sanskrit or Devanagari line and let Gemma 4 turn it into an accessible
                  reading voice across English and major Indian languages, with transliteration when
                  useful.
                </p>
              </div>
              <div className="bg-card/72 rounded-[22px] border border-border/60 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  Output language
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TRANSLATION_LANGUAGES.map((language) => (
                    <Button
                      key={language.id}
                      variant={targetLang === language.id ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setTargetLang(language.id)}
                    >
                      {language.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                {(["general", "student", "teacher"] as const).map((persona) => (
                  <Button
                    key={persona}
                    variant={audience === persona ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setAudience(persona)}
                  >
                    {persona}
                  </Button>
                ))}
              </div>

              {mode === "compare" ? (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    Choose up to two texts to compare
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {compareOptions.map((option) => (
                      <Button
                        key={option.id}
                        variant={compareScriptureIds.includes(option.id) ? "premium" : "outline"}
                        size="sm"
                        onClick={() => toggleCompareScripture(option.id)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                  {comparisonSummary ? (
                    <p className="text-xs text-muted-foreground">
                      Active comparison: {comparisonSummary}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Pick two texts to unlock grounded comparison mode.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Ask for explanations, guided reading, study packs, and grounded references from
                  the current scripture corpus.
                </p>
              )}
            </>
          )}
        </div>

        {messages.length === 0 ? (
          <div className="mb-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="bg-card/72 rounded-[28px] border border-border/60 p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                {mode === "translate" ? "Gemma 4 language desk" : "Gemma 4 study flow"}
              </p>
              <h3 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.04em] text-foreground">
                {mode === "translate"
                  ? "Move between script, sound, and meaning."
                  : mode === "compare"
                    ? "Compare traditions without losing the throughline."
                    : "Turn scripture questions into grounded, readable answers."}
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {(mode === "translate"
                  ? [
                      "Transliteration for pronunciation",
                      "English plus major Indian languages",
                      "Useful for mantras, verses, and short passages",
                      "Powered entirely by Gemma 4 via OpenRouter",
                    ]
                  : [
                      "Beginner-friendly explanations",
                      "Grounded references from the local corpus",
                      "Teacher and student-oriented framing",
                      "Compare mode for thematic study",
                    ]
                ).map((item) => (
                  <div
                    key={item}
                    className="bg-background/72 rounded-[20px] border border-border/60 px-4 py-3 text-sm text-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card/72 rounded-[28px] border border-border/60 p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Try first
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {suggestedQuestions.map((question) => (
                  <Button
                    key={question}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInput(question);
                    }}
                    className="justify-start whitespace-normal text-left text-xs"
                  >
                    {question}
                  </Button>
                ))}
              </div>
              <div className="bg-background/68 mt-6 rounded-[22px] border border-dashed border-border/70 p-4">
                <p className="text-sm font-medium text-foreground">
                  {mode === "translate"
                    ? "Tip: paste a full verse or even a short mantra."
                    : "Tip: the best results come from precise questions."}
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {mode === "translate"
                    ? "For example, translate a Devanagari line into Marathi, Bengali, Tamil, Telugu, Kannada, Malayalam, Gujarati, or Punjabi for broader regional access."
                    : "Mention the scripture, concept, or audience. Guru AI will stay shorter and more grounded when the question is specific."}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div
                  className={cn(
                    "flex size-9 shrink-0 select-none items-center justify-center rounded-full border border-border/60 shadow-[0_18px_36px_-32px_rgba(15,23,42,0.42)]",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background/85 text-foreground"
                  )}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>

                <div
                  className={cn(
                    "prose prose-sm max-w-[86%] rounded-[24px] px-4 py-3 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.4)]",
                    message.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-card/82 border border-border/60 text-foreground backdrop-blur-xl"
                  )}
                >
                  <div className="whitespace-pre-wrap leading-7">{message.content}</div>
                  {message.translationCard ? (
                    <div className="mt-4 rounded-[18px] border border-border/60 bg-background/75 p-4 text-foreground">
                      <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                        {getTranslationLanguageLabel(message.translationCard.targetLang)}{" "}
                        translation
                      </p>
                      {message.translationCard.transliteration ? (
                        <div className="bg-card/78 mt-3 rounded-[14px] border border-border/60 px-3 py-2">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                            Transliteration
                          </p>
                          <p className="mt-1 text-sm leading-7 text-foreground">
                            {message.translationCard.transliteration}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  {message.compareCard &&
                  (message.compareCard.commonGround?.length ||
                    message.compareCard.differences?.length) ? (
                    <div className="mt-4 space-y-3 rounded-[18px] border border-border/60 bg-background/75 p-4 text-foreground">
                      <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                        Compare summary
                      </p>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="bg-card/78 rounded-[16px] border border-border/60 p-3">
                          <p className="text-sm font-medium">Common ground</p>
                          <ul className="mt-2 space-y-2 text-xs leading-6 text-muted-foreground">
                            {(message.compareCard.commonGround || []).map((item) => (
                              <li key={item}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-card/78 rounded-[16px] border border-border/60 p-3">
                          <p className="text-sm font-medium">Differences</p>
                          <ul className="mt-2 space-y-2 text-xs leading-6 text-muted-foreground">
                            {(message.compareCard.differences || []).map((difference) => (
                              <li key={`${difference.topic}-${difference.insight}`}>
                                <strong>{difference.topic}:</strong> {difference.insight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {message.citations && message.citations.length > 0 && (
                    <div className="mt-2 border-t border-border/50 pt-2 text-xs">
                      <span className="font-medium">Sources:</span>
                      <ul className="mt-1 space-y-0.5">
                        {message.citations.map((cite, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {cite}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                {mode === "translate" ? "Gemma 4 is translating..." : "Gemma 4 is thinking..."}
              </div>
            )}
          </div>
        )}

        {messages.length > 0 && !isLoading ? (
          <div className="mt-8">
            <p className="mb-3 text-sm text-muted-foreground">
              {mode === "translate" ? "Translate another:" : "Try another:"}
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInput(question);
                  }}
                  className="justify-start text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        ) : null}
      </ScrollArea>

      <CardContent className="border-t border-border/60 bg-background/55 p-4 backdrop-blur-xl">
        <div className="flex gap-2">
          {mode === "translate" ? (
            <textarea
              placeholder="Paste a Sanskrit or Devanagari line to translate..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              rows={3}
              className="bg-background/78 min-h-[92px] flex-1 resize-none rounded-[24px] border border-border/70 px-4 py-3 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          ) : (
            <Input
              placeholder={
                mode === "compare"
                  ? "Compare two texts, themes, or teaching styles..."
                  : "Ask about scriptures..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="bg-background/78 h-12 flex-1 rounded-full border-border/70"
            />
          )}
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size={mode === "translate" ? "default" : "icon"}
            variant="premium"
            aria-label={mode === "translate" ? "Translate text" : "Send message"}
            className={cn(mode === "translate" ? "px-5" : "")}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                {mode === "translate" ? (
                  <>
                    <Languages className="h-4 w-4" />
                    Translate
                  </>
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </>
            )}
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {mode === "translate"
            ? "Press Enter to translate • Shift+Enter for a new line • Powered by Gemma 4"
            : "Press Enter to send • Compare mode is grounded in the selected texts • AI responses are generated in real-time"}
        </p>
      </CardContent>
    </Card>
  );
}
