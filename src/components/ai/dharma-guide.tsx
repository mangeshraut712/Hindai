"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, BookOpen, Copy, Check, Loader2, RefreshCw, Heart, Calendar, Clock, Sun, Moon } from "lucide-react";
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

const QUICK_GUIDES = [
  "What should I include in my daily spiritual practice?",
  "How can I observe Ekadashi properly?",
  "What are the benefits of Sandhya Vandana?",
  "Explain the significance of Sattvic diet",
  "How do I start a meditation practice?",
  "What are the key principles of Dharma?",
];

const PRACTICE_CATEGORIES = [
  { name: "Daily Rituals", icon: Sun, color: "from-orange-500 to-amber-500" },
  { name: "Meditation", icon: Moon, color: "from-blue-500 to-indigo-500" },
  { name: "Fasting", icon: Calendar, color: "from-green-500 to-emerald-500" },
  { name: "Mantra Practice", icon: BookOpen, color: "from-purple-500 to-pink-500" },
  { name: "Pilgrimage", icon: Heart, color: "from-red-500 to-rose-500" },
  { name: "Festivals", icon: Clock, color: "from-yellow-500 to-orange-500" },
];

export function DharmaGuide() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showQuickGuides, setShowQuickGuides] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
    setShowQuickGuides(false);

    try {
      const response = await fetch("/api/ai/dharma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: input.trim(),
          context: selectedCategory ? `User is interested in ${selectedCategory}` : undefined,
          preferences: {
            category: selectedCategory,
          },
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

  const handleQuickGuide = (guide: string) => {
    setInput(guide);
    setShowQuickGuides(false);
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
    setShowQuickGuides(true);
    setSelectedCategory(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
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
                  <Heart className="size-6" />
                </div>
              </motion.div>
              <div>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Sparkles className="size-5 text-primary" />
                  Dharma Guide
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Personalized spiritual guidance powered by Gemma 4
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
          {/* Practice Categories */}
          <div className="mb-6 flex flex-wrap gap-2">
            {PRACTICE_CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.name}
                  onClick={() => {
                    triggerHapticOnPress();
                    setSelectedCategory(category.name === selectedCategory ? null : category.name);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium transition-all",
                    selectedCategory === category.name
                      ? `border-transparent bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : "border-border/60 bg-background/50 hover:border-primary/50"
                  )}
                >
                  <Icon className="size-4" />
                  {category.name}
                </motion.button>
              );
            })}
          </div>

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
                      <Heart className="size-12 text-primary" />
                    </div>
                  </div>
                </motion.div>
                <h3 className="mb-2 text-xl font-semibold">Your Personal Dharma Guide</h3>
                <p className="mb-6 max-w-md text-muted-foreground">
                  Receive personalized guidance on spiritual practices, rituals, meditation, and living a dharmic life. Ask about daily practices, fasting, festivals, or any aspect of Hindu spiritual life.
                </p>

                <AnimatePresence>
                  {showQuickGuides && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="w-full"
                    >
                      <p className="mb-3 text-sm font-medium text-muted-foreground">Quick guides:</p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {QUICK_GUIDES.map((guide, index) => (
                          <motion.button
                            key={guide}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleQuickGuide(guide)}
                            className="rounded-lg border border-border/60 bg-card/50 p-3 text-left text-sm text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-md"
                          >
                            {guide}
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
                        <Heart className="size-4" />
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
                      <Heart className="size-4" />
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl bg-muted p-4">
                      <Loader2 className="size-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">Seeking guidance...</span>
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
              placeholder={selectedCategory ? `Ask about ${selectedCategory}...` : "Ask about spiritual practices, rituals, or dharma..."}
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
            Press Enter to send, Shift+Enter for new line • Select a category for focused guidance
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
