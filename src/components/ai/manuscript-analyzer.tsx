"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// Using a simple label alternative since Label component may not be available
import { Sparkles, Upload, Loader2 } from "lucide-react";

interface MultimodalResponse {
  response: {
    explanation: string;
    summary?: string;
    keyTerms?: Array<{
      term: string;
      meaning: string;
      sanskrit?: string;
    }>;
  };
  grounded: any;
  model: string;
  multimodal: boolean;
}

export function ManuscriptAnalyzer() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [query, setQuery] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<MultimodalResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setError(null);
    } else {
      setError("Please select a valid image file");
    }
  };

  const analyzeManuscript = async () => {
    if (!selectedImage || !query.trim()) {
      setError("Please select an image and enter a query");
      return;
    }

    setAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("query", query);

      const response = await fetch("/api/ai/multimodal/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Failed to analyze manuscript. Please try again.");
      // Multimodal analysis error tracked
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Sanskrit Manuscript Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <label htmlFor="manuscript-image" className="text-sm font-medium">
              Upload Sanskrit Manuscript Image
            </label>
            <div
              className="cursor-pointer rounded-lg border-2 border-dashed border-border p-6 text-center transition-colors hover:border-primary/50"
              onClick={() => fileInputRef.current?.click()}
            >
              {selectedImage ? (
                <div className="space-y-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected manuscript"
                    className="mx-auto max-h-48 max-w-full rounded"
                  />
                  <p className="text-sm text-muted-foreground">{selectedImage.name}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload a Sanskrit manuscript image
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports: JPG, PNG, WebP (max 10MB)
                  </p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>

          {/* Query Input */}
          <div className="space-y-2">
            <label htmlFor="analysis-query" className="text-sm font-medium">
              Analysis Query
            </label>
            <Input
              id="analysis-query"
              placeholder="e.g., What Sanskrit verses can you identify in this manuscript?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Analyze Button */}
          <Button
            onClick={analyzeManuscript}
            disabled={analyzing || !selectedImage || !query.trim()}
            className="w-full"
          >
            {analyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Manuscript with Gemma 4...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Analyze with Gemma 4 Vision
              </>
            )}
          </Button>

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.response.summary && (
              <div className="rounded-lg bg-primary/5 p-4">
                <h4 className="mb-2 font-medium">Summary</h4>
                <p className="text-sm">{result.response.summary}</p>
              </div>
            )}

            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h4 className="mb-2 font-medium">Detailed Analysis</h4>
              <p className="text-sm leading-7">{result.response.explanation}</p>
            </div>

            {result.response.keyTerms && result.response.keyTerms.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Identified Terms</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  {result.response.keyTerms.map((term, index) => (
                    <div key={index} className="rounded-lg bg-muted/50 p-3">
                      <p className="text-sm font-medium">{term.term}</p>
                      {term.sanskrit && (
                        <p className="font-devanagari text-sm text-primary">{term.sanskrit}</p>
                      )}
                      <p className="mt-1 text-xs text-muted-foreground">{term.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              Analyzed using Gemma 4 Vision • Model: {result.model}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
