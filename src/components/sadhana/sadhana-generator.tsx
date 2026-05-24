"use client";

import React, { useState } from "react";
import { Sparkles, Play, Check, Copy, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";

type DeityOption = {
  id: string;
  name: string;
  sanskrit: string;
  mantraId: string;
  mantraName: string;
};

const deities: DeityOption[] = [
  {
    id: "shiva",
    name: "Lord Shiva",
    sanskrit: "भगवान शिव",
    mantraId: "om-namah-shivaya",
    mantraName: "Om Namah Shivaya",
  },
  {
    id: "krishna",
    name: "Lord Krishna",
    sanskrit: "भगवान कृष्ण",
    mantraId: "hare-krishna",
    mantraName: "Hare Krishna Mahamantra",
  },
  {
    id: "durga",
    name: "Goddess Durga / Devi",
    sanskrit: "माँ दुर्गा",
    mantraId: "gayatri",
    mantraName: "Gayatri Mantra",
  },
  {
    id: "ganesha",
    name: "Lord Ganesha",
    sanskrit: "भगवान गणेश",
    mantraId: "gayatri",
    mantraName: "Gayatri Mantra",
  },
  {
    id: "rama",
    name: "Lord Rama",
    sanskrit: "भगवान राम",
    mantraId: "hare-krishna",
    mantraName: "Hare Krishna Mahamantra",
  },
  {
    id: "hanuman",
    name: "Lord Hanuman",
    sanskrit: "हनुमान जी",
    mantraId: "mahamrityunjaya",
    mantraName: "Mahamrityunjaya Mantra",
  },
  {
    id: "surya",
    name: "Sun God (Surya)",
    sanskrit: "सूर्य देव",
    mantraId: "gayatri",
    mantraName: "Gayatri Mantra",
  },
];

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi (हिन्दी)" },
  { code: "sa", label: "Sanskrit (संस्कृतम्)" },
];

const timesOfDay = [
  { id: "morning", label: "Morning (Pratah Sandhya)", sanskrit: "प्रातः संध्या" },
  { id: "noon", label: "Noon (Madhyahna)", sanskrit: "मध्याह्न" },
  { id: "evening", label: "Evening (Sayam Sandhya)", sanskrit: "सायं संध्या" },
  { id: "night", label: "Night (Nisha)", sanskrit: "निशा" },
];

const durations = [
  { id: "15", label: "15 Minutes" },
  { id: "30", label: "30 Minutes" },
  { id: "60", label: "60 Minutes (1 Hour)" },
];

export function SadhanaGenerator() {
  const [selectedDeity, setSelectedDeity] = useState(deities[0].id);
  const [selectedLang, setSelectedLang] = useState(languages[0].code);
  const [selectedTime, setSelectedTime] = useState(timesOfDay[0].id);
  const [selectedDuration, setSelectedDuration] = useState(durations[1].id);
  const [level, setLevel] = useState("beginner");

  const [isLoading, setIsLoading] = useState(false);
  const [routine, setRoutine] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentDeity = deities.find((d) => d.id === selectedDeity) || deities[0];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    setRoutine("");

    const deityName = deities.find((d) => d.id === selectedDeity)?.name || selectedDeity;
    const langLabel = languages.find((l) => l.code === selectedLang)?.label || selectedLang;
    const timeLabel = timesOfDay.find((t) => t.id === selectedTime)?.label || selectedTime;
    const durationLabel =
      durations.find((d) => d.id === selectedDuration)?.label || selectedDuration;

    trackEvent("sadhana_mantra_selected", {
      mantra_id: `generate-${selectedDeity}`,
    });

    const userPrompt = `Generate a personalized daily Hindu Sadhana routine in ${langLabel} for a ${level} practitioner focusing on ${deityName}. 
The routine is specifically designed for ${timeLabel} practice and should last approximately ${durationLabel}.
Include the following structured details:
1. **Sankalpa (Spiritual Intention)**: A concise devotional statement.
2. **Pranayama & Preparation**: Posture and breath-work recommendations.
3. **Mantra Chanting (Japa)**: Recommend using the "${currentDeity.mantraName}" mantra (${currentDeity.sanskrit}), explain its significance briefly, and specify the suggested chant count.
4. **Step-by-Step Flow**: A clear timeline (e.g. 5m breathing, 15m chanting, 10m silent reflection).
5. **Practical Integration**: One practical tip to maintain this spiritual focus in a busy modern day.

Provide the response in a beautiful, readable format. Do not add metadata or conversational fluff at the beginning or end. Keep the tone respectful, authentic, and scholarly.`;

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: userPrompt,
            },
          ],
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(
          "Failed to connect to Gemma 4 AI API. Please check your OpenRouter API key configuration."
        );
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let textBuffer = "";
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
                  textBuffer += content;
                  setRoutine(textBuffer);
                }
              } catch {
                // Ignore parsing errors
              }
            }
          }
        }
      }
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!routine) return;
    try {
      await navigator.clipboard.writeText(routine);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleImportMantra = () => {
    const event = new CustomEvent("set-active-mantra", {
      detail: { mantraId: currentDeity.mantraId },
    });
    window.dispatchEvent(event);

    // Scroll to the counter section
    const counterEl = document.getElementById("counter");
    if (counterEl) {
      counterEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Card className="overflow-hidden border-border/70 shadow-lg">
      <CardHeader className="border-b border-border/60 bg-gradient-to-r from-primary/5 to-accent/5 py-6">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 animate-pulse text-primary" />
          <CardTitle className="font-serif text-2xl tracking-[-0.02em]">
            Guru AI Daily Routine Generator
          </CardTitle>
        </div>
        <CardDescription>
          Generate a custom, structured Hindu sadhana workflow aligned with your deity, time of day,
          and duration preference, powered by Gemma 4.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleGenerate} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {/* Deity selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Deity / Focus
            </label>
            <select
              value={selectedDeity}
              onChange={(e) => setSelectedDeity(e.target.value)}
              className="w-full rounded-xl border border-border/70 bg-background/80 px-3 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
            >
              {deities.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.sanskrit.split(" ")[1] || d.name})
                </option>
              ))}
            </select>
          </div>

          {/* Time of Day */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Time of Day
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full rounded-xl border border-border/70 bg-background/80 px-3 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
            >
              {timesOfDay.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Duration
            </label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full rounded-xl border border-border/70 bg-background/80 px-3 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
            >
              {durations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* Level */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Experience Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full rounded-xl border border-border/70 bg-background/80 px-3 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
            >
              <option value="beginner">Beginner (Sarala)</option>
              <option value="intermediate">Intermediate (Madhyama)</option>
              <option value="advanced">Advanced (Praudha)</option>
            </select>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Language
            </label>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="w-full rounded-xl border border-border/70 bg-background/80 px-3 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* Generate Button */}
          <div className="flex justify-end sm:col-span-2 lg:col-span-5">
            <Button
              type="submit"
              variant="premium"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 size-4 animate-spin" />
                  Streaming Routine...
                </>
              ) : (
                <>
                  <Play className="mr-2 size-4 fill-current" />
                  Generate Custom Routine
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Error State */}
        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 p-4">
            <AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
            <div className="text-sm font-medium text-destructive">
              <p className="font-semibold">Generation Failed</p>
              <p className="mt-1 text-xs opacity-90">{error}</p>
            </div>
          </div>
        )}

        {/* Generated Content Output */}
        {routine && (
          <div className="group relative mt-8 rounded-3xl border border-border/80 bg-background/60 p-6 shadow-inner">
            <div className="absolute right-4 top-4 flex gap-2 opacity-100 transition-opacity group-hover:opacity-100 sm:opacity-0">
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-xl bg-background"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="size-3.5 text-green-500" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span className="ml-1 text-xs">{copied ? "Copied" : "Copy"}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-xl border-primary/20 bg-background text-primary hover:bg-primary/5"
                onClick={handleImportMantra}
              >
                <Sparkles className="size-3.5" />
                <span className="ml-1 text-xs">Use Mantra</span>
              </Button>
            </div>

            <div className="prose prose-sm dark:prose-invert max-w-none space-y-4 text-foreground/90">
              <h3 className="mb-4 border-b border-border/60 pb-2 font-serif text-xl text-primary">
                Your Guided {currentDeity.name} Sadhana
              </h3>

              {/* Parse routine segments dynamically for basic visual styling */}
              {routine.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("1.") || paragraph.toLowerCase().includes("sankalpa")) {
                  return (
                    <div
                      key={index}
                      className="my-4 rounded-r-2xl border-l-4 border-primary bg-primary/5 p-4 italic text-foreground/80"
                    >
                      {paragraph}
                    </div>
                  );
                }
                if (paragraph.startsWith("2.") || paragraph.toLowerCase().includes("pranayama")) {
                  return (
                    <div key={index} className="my-4 rounded-2xl bg-secondary/20 p-4">
                      {paragraph}
                    </div>
                  );
                }

                return (
                  <p key={index} className="whitespace-pre-line text-sm leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
