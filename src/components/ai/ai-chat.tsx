"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Send, Loader2, Sparkles, User, Bot, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
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
}

interface AIChatProps {
  initialPrompt?: string;
  initialMode?: "explain" | "compare";
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Namaste! 🙏 I'm your AI guide to ancient Indian scriptures. Ask me about any verse, concept, or teaching from the Vedas, Upanishads, Bhagavad Gita, or other sacred texts.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState(initialPrompt);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"explain" | "compare">(initialMode);
  const [audience, setAudience] = useState<"general" | "student" | "teacher">(initialAudience);
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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    const nextConversation = [...messages, userMessage];
    setMessages(nextConversation);
    setInput("");
    setIsLoading(true);

    // Add placeholder for AI response
    const aiMessageId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: aiMessageId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
      },
    ]);

    try {
      const response = await fetch("/api/ai/stream/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextConversation.map(({ role, content }) => ({
            role,
            content,
          })),
          mode,
          audience,
          compareScriptureIds,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Streaming request failed");
      }

      const compareHeader = response.headers.get("x-hindai-compare-card");
      const compareCard = compareHeader ? JSON.parse(compareHeader) : null;

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
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId ? { ...msg, content: fullContent, compareCard } : msg
          )
        );
      }

      if (!fullContent.trim()) {
        throw new Error("Empty streaming response");
      }
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? {
                ...msg,
                content:
                  "I apologize, but I'm having trouble connecting to the AI service. Please try again in a moment.",
              }
            : msg
        )
      );
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

  const suggestedQuestions = [
    "What is Karma Yoga?",
    "Explain Dharma in simple terms",
    "What does Bhagavad Gita 2.47 mean?",
    "Teach me about meditation from Yoga Sutras",
    "Compare Buddhism and Hinduism",
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
    <Card className="surface-panel mx-auto flex h-[680px] w-full max-w-5xl flex-col overflow-hidden border-border/60">
      <CardHeader className="border-b border-border/60 px-6 py-5">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          AI Scripture Guide
          <span className="ml-auto text-xs font-normal text-muted-foreground">
            Powered by Gemma 4
          </span>
        </CardTitle>
      </CardHeader>

      <ScrollArea ref={scrollRef} className="flex-1 px-6 py-6">
        <div className="mb-6 space-y-4 rounded-[24px] border border-border/60 bg-background/65 p-4">
          <div className="flex flex-wrap gap-2">
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
          </div>

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
              Ask for explanations, guided reading, study packs, and grounded references from the
              current scripture corpus.
            </p>
          )}
        </div>

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
                  "flex size-9 shrink-0 select-none items-center justify-center rounded-full border border-border/60",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/80 text-foreground"
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
                  "prose prose-sm max-w-[82%] rounded-[24px] px-4 py-3 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.4)]",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-secondary/72 border border-border/60"
                )}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                {message.compareCard &&
                (message.compareCard.commonGround?.length ||
                  message.compareCard.differences?.length) ? (
                  <div className="mt-4 space-y-3 rounded-[18px] border border-border/60 bg-background/75 p-4 text-foreground">
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                      Compare summary
                    </p>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-[16px] border border-border/60 bg-background/70 p-3">
                        <p className="text-sm font-medium">Common ground</p>
                        <ul className="mt-2 space-y-2 text-xs leading-6 text-muted-foreground">
                          {(message.compareCard.commonGround || []).map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-[16px] border border-border/60 bg-background/70 p-3">
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
              AI is thinking...
            </div>
          )}
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="mt-8">
            <p className="mb-3 text-sm text-muted-foreground">Try asking:</p>
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
        )}
      </ScrollArea>

      <CardContent className="border-t border-border/60 p-4">
        <div className="flex gap-2">
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
            className="h-12 flex-1 rounded-full border-border/70 bg-background/75"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            variant="premium"
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Press Enter to send • Compare mode is grounded in the selected texts • AI responses are
          generated in real-time
        </p>
      </CardContent>
    </Card>
  );
}
