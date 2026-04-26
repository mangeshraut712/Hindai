"use client";

import { useState } from "react";
import { Eye, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import VerseReader from "@/components/verse-reader/VerseReader";
import { ScriptureVerse } from "@/types/scripture";

interface VerseReaderWrapperProps {
  verses: ScriptureVerse[];
}

export function VerseReaderWrapper({ verses }: VerseReaderWrapperProps) {
  const [viewMode, setViewMode] = useState<"explorer" | "reader">("explorer");
  const [currentIndex, setCurrentIndex] = useState(0);

  if (verses.length === 0) {
    return null;
  }

  const currentVerse = verses[currentIndex];

  const handleNext = () => {
    if (currentIndex < verses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant={viewMode === "explorer" ? "default" : "outline"}
          onClick={() => setViewMode("explorer")}
          className="flex items-center gap-2"
        >
          <Eye className="size-4" />
          Study Explorer
        </Button>
        <Button
          variant={viewMode === "reader" ? "default" : "outline"}
          onClick={() => setViewMode("reader")}
          className="flex items-center gap-2"
        >
          <Book className="size-4" />
          Verse Reader
        </Button>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        {viewMode === "explorer"
          ? "Browse verses with navigation and study tools"
          : "Read verses with tabbed layers (Sanskrit, Word-by-word, Translation, Commentary)"}
      </p>

      {viewMode === "reader" && (
        <div className="mx-auto max-w-4xl">
          <VerseReader verse={currentVerse} onNext={handleNext} onPrevious={handlePrevious} />
        </div>
      )}
    </div>
  );
}
