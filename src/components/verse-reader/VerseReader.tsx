"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VerseWithLayers } from "@/lib/database/schema";
import { ScriptureVerse } from "@/types/scripture";

interface VerseReaderProps {
  verse: VerseWithLayers | ScriptureVerse;
  onNext?: () => void;
  onPrevious?: () => void;
}

type TabType = "sanskrit" | "word-by-word" | "translation" | "commentary" | "anvaya";

// Helper to normalize verse properties for both types
const normalizeVerse = (verse: VerseWithLayers | ScriptureVerse) => {
  // Check if it's ScriptureVerse (has direct properties)
  if ("sanskrit" in verse && "transliteration" in verse) {
    const scriptureVerse = verse as ScriptureVerse;
    return {
      chapter: scriptureVerse.chapter,
      verse_num: scriptureVerse.verse,
      pada: scriptureVerse.sukta, // Use sukta as pada for Vedas
      sanskrit: scriptureVerse.sanskrit,
      transliteration: scriptureVerse.transliteration,
      wordByWord: scriptureVerse.wordByWord || scriptureVerse.padaArtha,
      anvaya: scriptureVerse.translation?.sa,
      translation: scriptureVerse.translation?.en,
      commentary: scriptureVerse.commentary,
      audio: undefined, // ScriptureVerse doesn't have audio
    };
  }
  // VerseWithLayers
  const verseWithLayers = verse as VerseWithLayers;
  return {
    chapter: verseWithLayers.chapter,
    verse_num: verseWithLayers.verse_num,
    pada: verseWithLayers.pada,
    sanskrit: verseWithLayers.text_devanagari,
    transliteration: verseWithLayers.text_iast,
    wordByWord: verseWithLayers.word_analysis,
    anvaya: verseWithLayers.anvaya,
    translation: verseWithLayers.translations?.[0]?.text,
    commentary: verseWithLayers.commentaries?.[0]?.text_en,
    audio: verseWithLayers.audio,
  };
};

export default function VerseReader({ verse, onNext, onPrevious }: VerseReaderProps) {
  const [activeTab, setActiveTab] = useState<TabType>("sanskrit");
  const [audioSpeed, setAudioSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const normalizedVerse = normalizeVerse(verse);

  const tabs: { id: TabType; label: string }[] = [
    { id: "sanskrit", label: "Sanskrit" },
    { id: "word-by-word", label: "Word-by-word" },
    { id: "anvaya", label: "Anvaya" },
    { id: "translation", label: "Translation" },
    { id: "commentary", label: "Commentary" },
  ];

  const handleSpeedChange = (speed: number) => {
    setAudioSpeed(speed);
    const audioElement = document.getElementById("verse-audio") as HTMLAudioElement;
    if (audioElement) {
      audioElement.playbackRate = speed;
    }
  };

  const togglePlay = () => {
    const audioElement = document.getElementById("verse-audio") as HTMLAudioElement;
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="surface-panel p-6 md:p-8">
      {/* Header with navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Button variant="outline" onClick={onPrevious} disabled={!onPrevious}>
          ← Previous
        </Button>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Chapter {normalizedVerse.chapter}, Verse {normalizedVerse.verse_num}
          </p>
          {normalizedVerse.pada && (
            <p className="text-xs text-muted-foreground">Pāda {normalizedVerse.pada}</p>
          )}
        </div>
        <Button variant="outline" onClick={onNext} disabled={!onNext}>
          Next →
        </Button>
      </div>

      {/* Audio Player */}
      {normalizedVerse.audio && normalizedVerse.audio.length > 0 && (
        <div className="mb-6 rounded-lg border border-border/60 bg-background/75 p-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button onClick={togglePlay} variant={isPlaying ? "secondary" : "default"}>
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </Button>
            <div className="flex gap-2">
              {[0.5, 0.75, 1, 1.5].map((speed) => (
                <Button
                  key={speed}
                  variant={audioSpeed === speed ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSpeedChange(speed)}
                >
                  {speed}×
                </Button>
              ))}
            </div>
            {normalizedVerse.audio.some((a) => a.vedic_accents) && (
              <span className="rounded bg-primary/10 px-2 py-1 text-xs text-primary">
                Vedic Accents
              </span>
            )}
          </div>
          <audio
            id="verse-audio"
            src={normalizedVerse.audio[0].url}
            onEnded={() => setIsPlaying(false)}
            className="mt-4 w-full"
          />
        </div>
      )}

      {/* Tab Navigation */}
      <div className="mb-6 flex border-b border-border/60">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === "sanskrit" && (
          <div className="space-y-6">
            <div className="rounded-lg border border-amber-200/40 bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-rose-50/30 p-6 text-center dark:border-amber-800/20 dark:from-amber-950/25 dark:via-orange-950/15 dark:to-rose-950/10">
              <p className="font-devanagari text-2xl leading-relaxed text-foreground drop-shadow-sm">
                {normalizedVerse.sanskrit}
              </p>
            </div>
            <div className="rounded-lg border border-border/60 bg-background/75 p-4 text-center">
              <p className="text-lg text-muted-foreground">{normalizedVerse.transliteration}</p>
            </div>
          </div>
        )}

        {activeTab === "word-by-word" && (
          <div className="space-y-3">
            {normalizedVerse.wordByWord?.map((word: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-lg border border-border/60 bg-background/75 p-4 transition-colors hover:bg-background/90"
              >
                <span className="text-lg font-bold text-primary">{index + 1}.</span>
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <span className="font-devanagari text-xl">
                      {word.sanskrit || word.word_devanagari || word.word}
                    </span>
                    <span className="text-muted-foreground">{word.iast || word.word_iast}</span>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {word.meaning || word.meaning_en}
                  </div>
                </div>
                <span className="font-medium text-primary">{word.meaning || word.meaning_en}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "anvaya" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-border/60 bg-background/75 p-6">
              <h3 className="mb-3 font-semibold text-primary">Prose Word Order (Anvaya)</h3>
              <p className="text-lg leading-relaxed">
                {normalizedVerse.anvaya || "Anvaya analysis not available"}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              The Anvaya layer shows the prose word order, which helps understand how Sanskrit
              poetry inverts word order for meter and emphasis.
            </p>
          </div>
        )}

        {activeTab === "translation" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-border/60 bg-background/75 p-6">
              <h3 className="mb-3 font-semibold text-primary">English Translation</h3>
              <p className="text-lg leading-relaxed">
                {normalizedVerse.translation || "Translation not available"}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Translation helps understand the meaning of the Sanskrit verse in modern language.
            </p>
          </div>
        )}

        {activeTab === "commentary" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-border/60 bg-background/75 p-6">
              <h3 className="mb-3 font-semibold text-primary">Commentary</h3>
              <p className="text-lg leading-relaxed">
                {normalizedVerse.commentary || "Commentary not available"}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Traditional commentary provides deeper insights and explanations from ancient
              scholars.
            </p>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-6">
        <Button variant="ghost" size="sm">
          📝 Add Notes
        </Button>
        <Button variant="ghost" size="sm">
          🔖 Bookmark
        </Button>
        <Button variant="ghost" size="sm">
          🔗 Share
        </Button>
      </div>
    </div>
  );
}
