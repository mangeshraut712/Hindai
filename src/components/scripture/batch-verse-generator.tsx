"use client";

import { useState } from "react";
import { Sparkles, Loader2, CheckCircle, AlertCircle, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface BatchVerseGeneratorProps {
  scriptureId: string;
  scriptureName: string;
  chapters: Array<{
    chapter: number;
    verses: number;
    speaker?: string;
  }>;
  onBatchComplete?: (verses: GeneratedVerseData[]) => void;
  className?: string;
}

interface GeneratedVerseData {
  id: string;
  scriptureId: string;
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  translation: {
    en: string;
    hi?: string;
  };
  keyTerms: string[];
  speaker?: string;
}

type GenerationStatus = "idle" | "running" | "paused" | "completed" | "error";

export function BatchVerseGenerator({
  scriptureId,
  scriptureName,
  chapters,
  onBatchComplete,
  className,
}: BatchVerseGeneratorProps) {
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [currentVerse, setCurrentVerse] = useState("");
  const [generatedCount, setGeneratedCount] = useState(0);
  const [totalCount] = useState(() => chapters.reduce((acc, ch) => acc + ch.verses, 0));
  const [error, setError] = useState<string | null>(null);
  const [generatedVerses, setGeneratedVerses] = useState<GeneratedVerseData[]>([]);

  const generateVerse = async (
    chapter: number,
    verse: number,
    speaker?: string
  ): Promise<GeneratedVerseData | null> => {
    try {
      const response = await fetch("/api/ai/verse-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scriptureId,
          scriptureName,
          chapter,
          verse,
          speaker,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate ${scriptureName} ${chapter}.${verse}`);
      }

      const data = await response.json();
      return data.verse || null;
    } catch (err) {
      console.error(`Error generating verse ${chapter}.${verse}:`, err);
      return null;
    }
  };

  const startGeneration = async () => {
    setStatus("running");
    setError(null);
    setGeneratedVerses([]);
    setGeneratedCount(0);
    setProgress(0);

    const allVerses: GeneratedVerseData[] = [];
    let processed = 0;

    for (const chapter of chapters) {
      for (let verse = 1; verse <= chapter.verses; verse++) {
        if (status === "paused") {
          // Wait until resumed
          while (status === "paused") {
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        }

        if (status === "idle") {
          // Cancelled
          return;
        }

        setCurrentVerse(`${scriptureName} ${chapter.chapter}.${verse}`);

        const generated = await generateVerse(chapter.chapter, verse, chapter.speaker);

        if (generated) {
          allVerses.push(generated);
          setGeneratedVerses([...allVerses]);
        }

        processed++;
        setGeneratedCount(processed);
        setProgress((processed / totalCount) * 100);

        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    setStatus("completed");
    onBatchComplete?.(allVerses);
  };

  const pauseGeneration = () => {
    setStatus("paused");
  };

  const resumeGeneration = () => {
    setStatus("running");
  };

  const cancelGeneration = () => {
    setStatus("idle");
    setCurrentVerse("");
  };

  if (status === "completed") {
    return (
      <div className={cn("surface-panel p-6", className)}>
        <div className="mb-4 flex items-center gap-3">
          <CheckCircle className="h-6 w-6 text-emerald-500" />
          <div>
            <h3 className="font-semibold text-foreground">Generation Complete</h3>
            <p className="text-sm text-muted-foreground">
              {generatedCount} verses generated from {scriptureName}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-lg bg-secondary/50 p-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Chapters</p>
            <p className="font-semibold text-foreground">{chapters.length}</p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Verses</p>
            <p className="font-semibold text-foreground">{generatedCount}</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setStatus("idle");
            setProgress(0);
            setGeneratedCount(0);
          }}
          className="mt-4 w-full"
        >
          Generate More
        </Button>
      </div>
    );
  }

  if (status === "running" || status === "paused") {
    return (
      <div className={cn("surface-panel p-6", className)}>
        <div className="mb-4 flex items-center gap-3">
          <Loader2 className={cn("h-6 w-6 text-primary", status === "running" && "animate-spin")} />
          <div>
            <h3 className="font-semibold text-foreground">
              {status === "paused" ? "Paused" : "Generating Verses..."}
            </h3>
            <p className="text-sm text-muted-foreground">{currentVerse}</p>
          </div>
        </div>

        <Progress value={progress} className="mb-4 h-2" />

        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {generatedCount} of {totalCount} verses
          </span>
          <span className="font-medium text-foreground">{Math.round(progress)}%</span>
        </div>

        <div className="flex gap-2">
          {status === "running" ? (
            <Button variant="outline" size="sm" onClick={pauseGeneration} className="flex-1 gap-2">
              <Pause className="h-4 w-4" />
              Pause
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={resumeGeneration} className="flex-1 gap-2">
              <Play className="h-4 w-4" />
              Resume
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={cancelGeneration} className="flex-1">
            Cancel
          </Button>
        </div>

        {generatedVerses.length > 0 && (
          <div className="mt-4 border-t border-border/60 pt-4">
            <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
              Recently Generated
            </p>
            <div className="max-h-32 space-y-1 overflow-y-auto">
              {generatedVerses.slice(-5).map((v) => (
                <div key={v.id} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 shrink-0 text-emerald-500" />
                  <span className="text-muted-foreground">
                    {scriptureName} {v.chapter}.{v.verse}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("surface-panel p-6", className)}>
      <div className="mb-4 flex items-center gap-3">
        <Sparkles className="h-6 w-6 text-primary" />
        <div>
          <h3 className="font-semibold text-foreground">Batch Verse Generation</h3>
          <p className="text-sm text-muted-foreground">
            Generate {totalCount} verses from {chapters.length} chapters of {scriptureName}
          </p>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-lg bg-secondary/50 p-3">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Chapters</p>
          <p className="font-semibold text-foreground">{chapters.length}</p>
        </div>
        <div className="rounded-lg bg-secondary/50 p-3">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Total Verses</p>
          <p className="font-semibold text-foreground">{totalCount}</p>
        </div>
      </div>

      <Button onClick={startGeneration} variant="premium" className="w-full gap-2">
        <Sparkles className="h-4 w-4" />
        Start Generation
      </Button>

      {error && (
        <div className="mt-3 flex items-start gap-2 text-sm text-red-600">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Powered by Gemma 4 AI • Rate limited to 10 requests/minute
      </p>
    </div>
  );
}
