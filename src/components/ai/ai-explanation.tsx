"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateExplanation } from "@/lib/ai/gemini";

interface AIExplanationProps {
  verseId: string;
  sanskrit: string;
  translation: string;
  scripture: string;
  chapter: number;
  verse: number;
}

export function AIExplanation({
  verseId: _verseId,
  sanskrit,
  translation,
  scripture,
  chapter,
  verse,
}: AIExplanationProps) {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExplanation = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await generateExplanation({
        query: `Explain this verse:\nSanskrit: ${sanskrit}\nTranslation: ${translation}`,
        scriptureId: scripture,
        chapter,
        verse,
      });

      setExplanation(result.response.explanation);
    } catch {
      setError("Failed to generate explanation. Please ensure Ollama is running with Gemma 4.");
    } finally {
      setLoading(false);
    }
  };

  if (explanation) {
    return (
      <Card className="mt-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            AI-Powered Explanation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {explanation.split("\n").map((line, i) => (
              <p key={i} className="mb-2">
                {line}
              </p>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExplanation(null)}
            className="w-full"
          >
            Get Another Explanation
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <CardContent className="p-6">
        {error ? (
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button
              onClick={fetchExplanation}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <Button
            onClick={fetchExplanation}
            disabled={loading}
            className="w-full gap-2"
          >
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
        <p className="mt-2 text-xs text-center text-muted-foreground">
          Powered by Gemma 4 - Local AI for privacy
        </p>
      </CardContent>
    </Card>
  );
}
