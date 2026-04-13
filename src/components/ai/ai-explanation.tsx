"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AIExplanationProps {
  verseId: string;
  sanskrit: string;
  translation: string;
  scripture: string;
  chapter: number;
  verse: number;
  audience?: "general" | "student" | "teacher";
}

type ExplanationResponse = {
  summary?: string;
  explanation: string;
  context?: string;
  keyTerms?: Array<{
    term: string;
    meaning: string;
    sanskrit?: string;
  }>;
  learningObjectives?: string[];
  followUpQuestions?: string[];
  practice?: string;
  confidence?: "high" | "medium" | "low";
  caution?: string;
  recommendedReading?: Array<{
    title: string;
    reason: string;
    href?: string;
  }>;
  lessonPlan?: {
    audience: "student" | "teacher";
    title: string;
    objectives: string[];
    steps: Array<{
      step: number;
      title: string;
      activity: string;
      outcome: string;
    }>;
    assignment?: string;
  };
  references?: Array<{
    scripture: string;
    chapter: number;
    verse: number;
  }>;
};

type GroundingResponse = {
  verses: Array<{
    id: string;
    scripture: string;
    chapter: number;
    verse: number;
    translation: string;
    whyRelevant: string;
  }>;
  scriptures: Array<{
    slug: string;
    title: string;
    category: string;
    href: string;
    description: string;
    whyRelevant: string;
  }>;
};

export function AIExplanation({
  verseId: _verseId,
  sanskrit,
  translation,
  scripture,
  chapter,
  verse,
  audience = "student",
}: AIExplanationProps) {
  const [studyPack, setStudyPack] = useState<ExplanationResponse | null>(null);
  const [grounding, setGrounding] = useState<GroundingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExplanation = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/generate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Explain this verse:\nSanskrit: ${sanskrit}\nTranslation: ${translation}`,
          scriptureId: scripture,
          chapter,
          verse,
          audience,
        }),
      });

      if (!response.ok) {
        throw new Error("Generation request failed");
      }

      const result = await response.json();
      setStudyPack(result.response ?? null);
      setGrounding(result.grounding ?? null);
    } catch {
      setError(
        "Failed to generate explanation. Please check the Gemma 4 API configuration and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (studyPack) {
    return (
      <Card className="mt-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            AI-Powered Study Pack
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {studyPack.summary ? (
            <div className="rounded-lg border border-border/60 bg-background/70 p-4">
              <p className="text-sm font-medium text-muted-foreground">Quick takeaway</p>
              <p className="mt-2 text-sm leading-7">{studyPack.summary}</p>
            </div>
          ) : null}

          <div className="prose prose-sm dark:prose-invert max-w-none">
            {(studyPack.explanation || "Explanation unavailable.").split("\n").map((line, i) => (
              <p key={i} className="mb-2">
                {line}
              </p>
            ))}
          </div>

          {studyPack.context ? (
            <div className="rounded-lg border border-border/60 bg-background/70 p-4">
              <p className="text-sm font-medium text-muted-foreground">Context</p>
              <p className="mt-2 text-sm leading-7">{studyPack.context}</p>
            </div>
          ) : null}

          {studyPack.keyTerms?.length ? (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Key terms</p>
              <div className="grid gap-3 md:grid-cols-2">
                {studyPack.keyTerms.map((term) => (
                  <div
                    key={term.term}
                    className="rounded-lg border border-border/60 bg-background/70 p-3"
                  >
                    <p className="text-sm font-medium">{term.term}</p>
                    {term.sanskrit ? (
                      <p className="mt-1 font-devanagari text-sm text-primary">{term.sanskrit}</p>
                    ) : null}
                    <p className="mt-2 text-xs leading-6 text-muted-foreground">{term.meaning}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {studyPack.learningObjectives?.length ? (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Learning objectives</p>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                {studyPack.learningObjectives.map((objective) => (
                  <li key={objective}>• {objective}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {studyPack.followUpQuestions?.length ? (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Follow-up questions</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {studyPack.followUpQuestions.map((question) => (
                  <span
                    key={question}
                    className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs text-foreground/80"
                  >
                    {question}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {studyPack.lessonPlan ? (
            <div className="space-y-3 rounded-lg border border-border/60 bg-background/70 p-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {studyPack.lessonPlan.audience === "teacher"
                    ? "Teacher lesson plan"
                    : "Student lesson plan"}
                </p>
                <p className="mt-2 text-sm font-medium">{studyPack.lessonPlan.title}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Objectives
                </p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {studyPack.lessonPlan.objectives.map((objective) => (
                    <li key={objective}>• {objective}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Steps</p>
                <div className="mt-2 space-y-3">
                  {studyPack.lessonPlan.steps.map((step) => (
                    <div
                      key={`${step.step}-${step.title}`}
                      className="rounded-lg border border-border/60 bg-background/70 p-3"
                    >
                      <p className="text-sm font-medium">
                        {step.step}. {step.title}
                      </p>
                      <p className="mt-2 text-xs leading-6 text-muted-foreground">
                        <strong>Activity:</strong> {step.activity}
                      </p>
                      <p className="mt-1 text-xs leading-6 text-muted-foreground">
                        <strong>Outcome:</strong> {step.outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {studyPack.lessonPlan.assignment ? (
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Assignment
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {studyPack.lessonPlan.assignment}
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}

          {studyPack.practice ? (
            <div className="rounded-lg border border-border/60 bg-background/70 p-4">
              <p className="text-sm font-medium text-muted-foreground">Practice</p>
              <p className="mt-2 text-sm leading-7">{studyPack.practice}</p>
            </div>
          ) : null}

          {studyPack.references?.length ? (
            <div>
              <p className="text-sm font-medium text-muted-foreground">References</p>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                {studyPack.references.map((reference) => (
                  <li key={`${reference.scripture}-${reference.chapter}-${reference.verse}`}>
                    • {reference.scripture} {reference.chapter}.{reference.verse}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {grounding?.verses?.length ? (
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Grounded with local verses
              </p>
              <div className="mt-2 space-y-3">
                {grounding.verses.map((verse) => (
                  <div
                    key={verse.id}
                    className="rounded-lg border border-border/60 bg-background/70 p-3"
                  >
                    <p className="text-sm font-medium">
                      {verse.scripture} {verse.chapter}.{verse.verse}
                    </p>
                    <p className="mt-2 text-xs leading-6 text-muted-foreground">
                      {verse.translation}
                    </p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-primary">
                      {verse.whyRelevant}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {studyPack.caution ? (
            <p className="text-xs text-muted-foreground">
              <strong>Caution:</strong> {studyPack.caution}
            </p>
          ) : null}

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setStudyPack(null);
              setGrounding(null);
            }}
            className="w-full"
          >
            Generate Another Study Pack
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <CardContent className="p-6">
        {error ? (
          <div className="space-y-4 text-center">
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button onClick={fetchExplanation} variant="outline" size="sm" className="w-full">
              Try Again
            </Button>
          </div>
        ) : (
          <Button onClick={fetchExplanation} disabled={loading} className="w-full gap-2">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating with Gemma 4...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Get AI Explanation
              </>
            )}
          </Button>
        )}
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Powered by Gemma 4 via Ollama
        </p>
      </CardContent>
    </Card>
  );
}
