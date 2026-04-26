"use client";

import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VedicAccentEngine, VedicAccentResult } from "@/lib/audio/vedic-accent";
import { VedicHeritagePortal, VedicAudio } from "@/lib/audio/vedic-heritage";
import { scriptureCatalog } from "@/lib/scripture-catalog";

interface AudioVerse {
  scripture: string;
  chapter: number;
  verse: number;
  text: string;
  audio?: VedicAudio;
  accents?: VedicAccentResult;
}

export function AudioExplorer() {
  const [selectedScripture, setSelectedScripture] = useState<string>("rigveda");
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [selectedVerse, setSelectedVerse] = useState<number>(1);
  const [currentVerse, setCurrentVerse] = useState<AudioVerse | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1);
  const [selectedReciter, setSelectedReciter] = useState<string>("");
  const [availableReciters, setAvailableReciters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter scriptures that have audio support
  const audioSupportedScriptures = scriptureCatalog.filter((item) =>
    ["rigveda", "samaveda", "yajurveda", "atharvaveda", "bhagavad-gita"].includes(item.slug)
  );

  useEffect(() => {
    loadVerse();
  }, [selectedScripture, selectedChapter, selectedVerse]);

  useEffect(() => {
    loadAvailableReciters();
  }, [selectedScripture]);

  const loadAvailableReciters = async () => {
    try {
      const reciters = await VedicAccentEngine.getReciters(
        selectedScripture as "rigveda" | "samaveda"
      );
      setAvailableReciters(reciters);
      if (reciters.length > 0 && !selectedReciter) {
        setSelectedReciter(reciters[0]);
      }
    } catch (error) {
      console.error("Failed to load reciters:", error);
    }
  };

  const loadVerse = async () => {
    setIsLoading(true);
    try {
      // For now, we'll use placeholder text. In a real implementation,
      // you'd fetch the actual verse text from your database
      const placeholderTexts: Record<string, string> = {
        rigveda: "ॐ अग्निमीळे पुरोहितं यज्ञस्य देवं रत्विजम्। होता रत्न धातमम्॥",
        samaveda: "ॐ अग्न आयाहि वीतये गृणानो हव्यदातये। नि होता सत्सि बर्हिषि॥",
        "bhagavad-gita":
          "धृतराष्ट्र उवाच धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः। मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥",
      };

      const text = placeholderTexts[selectedScripture] || "Sample Sanskrit verse text";

      const verse: AudioVerse = {
        scripture: selectedScripture,
        chapter: selectedChapter,
        verse: selectedVerse,
        text,
      };

      // Load audio
      const audio = await VedicHeritagePortal.getAudioForVerse(
        selectedScripture,
        selectedChapter,
        selectedVerse
      );
      verse.audio = audio || undefined;

      // Load accent analysis
      if (["rigveda", "samaveda"].includes(selectedScripture)) {
        const accents = await VedicAccentEngine.analyzeAccents(
          text,
          selectedScripture as "rigveda" | "samaveda"
        );
        verse.accents = accents;
      }

      setCurrentVerse(verse);
    } catch (error) {
      console.error("Failed to load verse:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayback = () => {
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

  const changeSpeed = (speed: number) => {
    setAudioSpeed(speed);
    const audioElement = document.getElementById("verse-audio") as HTMLAudioElement;
    if (audioElement) {
      audioElement.playbackRate = speed;
    }
  };

  const renderAccentText = (result: VedicAccentResult) => {
    // Color-code accent marks
    const coloredText = VedicAccentEngine.getColoredText(result.markedText);

    return (
      <div className="space-y-2">
        <div
          className="font-devanagari text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: coloredText }}
        />
        <div className="text-sm text-muted-foreground">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <span className="text-red-600">´</span> Udatta (Rising)
            </span>
            <span className="flex items-center gap-1">
              <span className="text-green-600">`</span> Anudatta (Falling)
            </span>
            <span className="flex items-center gap-1">
              <span className="text-blue-600">^</span> Svarita (Circumflex)
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-8">
          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="size-5" />
                Audio Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <label className="text-sm font-medium">Scripture</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {audioSupportedScriptures.find(s => s.slug === selectedScripture)?.name || "Select"}
                        <ChevronDown className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {audioSupportedScriptures.map((scripture) => (
                        <DropdownMenuItem key={scripture.slug} onClick={() => setSelectedScripture(scripture.slug)}>
                          {scripture.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div>
                  <label className="text-sm font-medium">Chapter</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        Chapter {selectedChapter}
                        <ChevronDown className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((chapter) => (
                        <DropdownMenuItem key={chapter} onClick={() => setSelectedChapter(chapter)}>
                          Chapter {chapter}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div>
                  <label className="text-sm font-medium">Verse</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        Verse {selectedVerse}
                        <ChevronDown className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {Array.from({ length: 20 }, (_, i) => i + 1).map((verse) => (
                        <DropdownMenuItem key={verse} onClick={() => setSelectedVerse(verse)}>
                          Verse {verse}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {availableReciters.length > 0 && (
                  <div>
                    <label className="text-sm font-medium">Reciter</label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          {selectedReciter || "Select"}
                          <ChevronDown className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {availableReciters.map((reciter) => (
                        <DropdownMenuItem key={reciter} onClick={() => setSelectedReciter(reciter)}>
                          {reciter}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Audio Player */}
          {currentVerse && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="size-5" />
                  Audio Player
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Verse Text with Accents */}
                {currentVerse.accents && (
                  <div>
                    <h3 className="mb-2 font-semibold">Vedic Text with Accent Marks</h3>
                    {renderAccentText(currentVerse.accents)}
                  </div>
                )}

                {/* Plain Text */}
                <div>
                  <h3 className="mb-2 font-semibold">Sanskrit Text</h3>
                  <p className="font-devanagari text-lg">{currentVerse.text}</p>
                </div>

                {/* Audio Controls */}
                {currentVerse.audio && (
                  <div className="space-y-4">
                    <audio
                      id="verse-audio"
                      src={currentVerse.audio.audio_url}
                      preload="metadata"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                    />

                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSelectedVerse(Math.max(1, selectedVerse - 1))}
                      >
                        <SkipBack className="size-4" />
                      </Button>

                      <Button
                        variant="default"
                        size="icon"
                        onClick={togglePlayback}
                        disabled={!currentVerse.audio}
                      >
                        {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSelectedVerse(selectedVerse + 1)}
                      >
                        <SkipForward className="size-4" />
                      </Button>
                    </div>

                    {/* Speed Control */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Playback Speed: {audioSpeed}x</label>
                      <Slider
                        value={[audioSpeed]}
                        onValueChange={(value) => changeSpeed(value[0])}
                        min={0.5}
                        max={2}
                        step={0.25}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {/* Audio Source Info */}
                {currentVerse.audio && (
                  <div className="text-sm text-muted-foreground">
                    <p>
                      <strong>Source:</strong> {currentVerse.audio.source}
                    </p>
                    <p>
                      <strong>Quality:</strong> {currentVerse.audio.quality}
                    </p>
                    {currentVerse.audio.reciter && (
                      <p>
                        <strong>Reciter:</strong> {currentVerse.audio.reciter}
                      </p>
                    )}
                    {currentVerse.audio.sampradaya && (
                      <p>
                        <strong>Tradition:</strong> {currentVerse.audio.sampradaya}
                      </p>
                    )}
                    <p>
                      <strong>Vedic Accents:</strong>{" "}
                      {currentVerse.audio.vedic_accents ? "Yes" : "No"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Loading State */}
          {isLoading && (
            <Card>
              <CardContent className="py-8">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
                  <p>Loading audio and accent analysis...</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
