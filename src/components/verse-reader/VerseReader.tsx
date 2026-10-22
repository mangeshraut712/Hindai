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
      translations: {
        mr: scriptureVerse.translation?.mr,
        hi: scriptureVerse.translation?.hi,
        en: scriptureVerse.translation?.en,
      },
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
    translations: {
      mr: verseWithLayers.translations?.find((entry) => entry.lang === "mr")?.text,
      hi: verseWithLayers.translations?.find((entry) => entry.lang === "hi")?.text,
      en: verseWithLayers.translations?.find((entry) => entry.lang === "en")?.text,
    },
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
    { id: "sanskrit", label: "Original · देवनागरी" },
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
          <p className="text-muted-foreground text-sm">
            Chapter {normalizedVerse.chapter}, Verse {normalizedVerse.verse_num}
          </p>
          {normalizedVerse.pada && (
            <p className="text-muted-foreground text-xs">Pāda {normalizedVerse.pada}</p>
          )}
        </div>
        <Button variant="outline" onClick={onNext} disabled={!onNext}>
          Next →
        </Button>
      </div>

      {/* Audio Player */}
      {normalizedVerse.audio && normalizedVerse.audio.length > 0 && (
        <div className="border-border/60 bg-background/75 mb-6 rounded-lg border p-4">
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
              <span className="bg-primary/10 text-primary rounded px-2 py-1 text-xs">
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
      <div className="border-border/60 mb-6 flex border-b">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === tab.id
                ? "border-primary text-primary border-b-2"
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
            <div className="rounded-lg border border-amber-200/40 bg-linear-to-br from-amber-50/60 via-orange-50/40 to-rose-50/30 p-6 text-center dark:border-amber-800/20 dark:from-amber-950/25 dark:via-orange-950/15 dark:to-rose-950/10">
              <p className="font-devanagari text-foreground text-2xl leading-relaxed drop-shadow-xs">
                {normalizedVerse.sanskrit}
              </p>
            </div>
            <div className="border-border/60 bg-background/75 rounded-lg border p-4 text-center">
              <p className="text-muted-foreground text-lg">{normalizedVerse.transliteration}</p>
            </div>
          </div>
        )}

        {activeTab === "word-by-word" && (
          <div className="space-y-3">
            {normalizedVerse.wordByWord?.map((word: any, index: number) => (
              <div
                key={index}
                className="border-border/60 bg-background/75 hover:bg-background/90 flex items-center gap-4 rounded-lg border p-4 transition-colors"
              >
                <span className="text-primary text-lg font-bold">{index + 1}.</span>
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <span className="font-devanagari text-xl">
                      {word.sanskrit || word.word_devanagari || word.word}
                    </span>
                    <span className="text-muted-foreground">{word.iast || word.word_iast}</span>
                  </div>
                  <div className="text-muted-foreground mt-1 text-sm">
                    {word.meaning || word.meaning_en}
                  </div>
                </div>
                <span className="text-primary font-medium">{word.meaning || word.meaning_en}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "anvaya" && (
          <div className="space-y-4">
            <div className="border-border/60 bg-background/75 rounded-lg border p-6">
              <h3 className="text-primary mb-3 font-semibold">Prose Word Order (Anvaya)</h3>
              <p className="text-lg leading-relaxed">
                {normalizedVerse.anvaya || "Anvaya analysis not available"}
              </p>
            </div>
            <p className="text-muted-foreground text-sm">
              The Anvaya layer shows the prose word order, which helps understand how Sanskrit
              poetry inverts word order for meter and emphasis.
            </p>
          </div>
        )}

        {activeTab === "translation" && (
          <div className="space-y-4">
            <div className="border-border/60 bg-background/75 rounded-lg border p-6">
              <h3 className="text-primary mb-3 font-semibold">Stored meanings · उपलब्ध अर्थ</h3>
              {(["mr", "hi", "en"] as const).map((lang) =>
                normalizedVerse.translations[lang] ? (
                  <div key={lang} className="mb-4 last:mb-0">
                    <p className="text-primary text-xs font-bold tracking-widest uppercase">
                      {lang === "mr" ? "मराठी" : lang === "hi" ? "हिन्दी" : "English"}
                    </p>
                    <p
                      className={
                        lang === "en"
                          ? "mt-1 text-lg leading-relaxed"
                          : "font-devanagari mt-1 text-lg leading-relaxed"
                      }
                    >
                      {normalizedVerse.translations[lang]}
                    </p>
                  </div>
                ) : null
              )}
              {!Object.values(normalizedVerse.translations).some(Boolean) ? (
                <p className="text-lg leading-relaxed">
                  No checked translation is stored for this verse.
                </p>
              ) : null}
            </div>
            <p className="text-muted-foreground text-sm">
              These are study meanings stored with this verse. The original text remains on the
              first tab.
            </p>
          </div>
        )}

        {activeTab === "commentary" && (
          <div className="space-y-4">
            <div className="border-border/60 bg-background/75 rounded-lg border p-6">
              <h3 className="text-primary mb-3 font-semibold">Commentary</h3>
              <p className="text-lg leading-relaxed">
                {normalizedVerse.commentary || "Commentary not available"}
              </p>
            </div>
            <p className="text-muted-foreground text-sm">
              Traditional commentary provides deeper insights and explanations from ancient
              scholars.
            </p>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="border-border/60 mt-8 flex items-center justify-between border-t pt-6">
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
