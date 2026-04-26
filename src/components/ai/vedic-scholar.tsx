"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, BookOpen, Copy, Check, Loader2, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { triggerHapticOnPress, triggerHapticOnSuccess } from "@/lib/haptics";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  "What is the concept of Dharma in Hinduism?",
  "Explain the four Purusharthas",
  "What are the main teachings of the Bhagavad Gita?",
  "Describe the different paths to liberation (Moksha)",
  "What is the significance of Om (ॐ)?",
  "Explain the concept of Karma",
];

export function VedicScholar() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    triggerHapticOnPress();
    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setShowQuickQuestions(false);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      const assistantMessage: Message = {
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.content;
                if (content) {
                  assistantContent += content;
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                      ...updated[updated.length - 1],
                      content: assistantContent,
                    };
                    return updated;
                  });
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }

      triggerHapticOnSuccess();
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I encountered an error. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setShowQuickQuestions(false);
    setTimeout(() => handleSend(), 100);
  };

  const copyMessage = async (content: string, index: number) => {
    triggerHapticOnPress();
    await navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    triggerHapticOnSuccess();
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const clearConversation = () => {
    triggerHapticOnPress();
    setMessages([]);
    setShowQuickQuestions(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5">
        <CardHeader className="border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
                <div className="relative flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                  <BookOpen className="size-6" />
                </div>
              </motion.div>
              <div>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Sparkles className="size-5 text-primary" />
                  Vedic AI Scholar
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Powered by Gemma 4 • Deep insights into ancient wisdom
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={clearConversation}
              disabled={messages.length === 0}
            >
              <RefreshCw className="mr-2 size-4" />
              Clear
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="mb-4 flex min-h-[400px] max-h-[600px] flex-col gap-4 overflow-y-auto rounded-lg border border-border/50 bg-background/50 p-4">
            {messages.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mb-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
                    <div className="relative flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                      <BookOpen className="size-12 text-primary" />
                    </div>
                  </div>
                </motion.div>
                <h3 className="mb-2 text-xl font-semibold">Welcome, Seeker of Wisdom</h3>
                <p className="mb-6 max-w-md text-muted-foreground">
                  Ask me anything about Hindu philosophy, scriptures, rituals, or spiritual practices. I draw from the Vedas, Upanishads, Bhagavad Gita, and other sacred texts.
                </p>

                <AnimatePresence>
                  {showQuickQuestions && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="w-full"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowQuickQuestions(false)}
                        className="mb-4"
                      >
                        {showQuickQuestions ? <ChevronUp className="mr-2 size-4" /> : <ChevronDown className="mr-2 size-4" />}
                        {showQuickQuestions ? "Hide" : "Show"} Quick Questions
                      </Button>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {QUICK_QUESTIONS.map((question, index) => (
                          <motion.button
                            key={question}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleQuickQuestion(question)}
                            className="rounded-lg border border-border/60 bg-card/50 p-3 text-left text-sm text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-md"
                          >
                            {question}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex gap-3",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <BookOpen className="size-4" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl p-4",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {message.content.split("\n").map((paragraph, i) => (
                          <p key={i} className="mb-2 last:mb-0">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <span className="text-xs opacity-60">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.role === "assistant" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2"
                            onClick={() => copyMessage(message.content, index)}
                          >
                            {copiedIndex === index ? (
                              <Check className="size-3" />
                            ) : (
                              <Copy className="size-3" />
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <BookOpen className="size-4" />
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl bg-muted p-4">
                      <Loader2 className="size-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">Seeking wisdom...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Hindu philosophy, scriptures, or spiritual practices..."
              className="min-h-[80px] resize-none border-2 border-border/60 focus:border-primary/50"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="h-[80px] min-w-[80px] px-4"
              size="lg"
            >
              {isLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Send className="size-5" />
              )}
            </Button>
          </div>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Press Enter to send, Shift+Enter for new line • Responses powered by Gemma 4 via OpenRouter
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
