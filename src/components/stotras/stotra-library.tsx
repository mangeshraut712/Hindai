"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Music, Star, BookOpen, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LALITA_SAHASRANAMA, SHIVA_SAHASRANAMA } from "@/lib/data/sahasranama-collection";
import { VISHNU_SAHASRANAMA } from "@/lib/data/vishnu-sahasranama";

interface StotraItem {
  id: string;
  name: string;
  sanskrit: string;
  deity: string;
  description: string;
  type: "sahasranama" | "stotra" | "mantra";
  count?: number;
  sampleNames?: Array<{ sanskrit: string; meaning: string }>;
  href?: string;
  audioAvailable?: boolean;
}

const stotraItems: StotraItem[] = [
  {
    id: "vishnu-sahasranama",
    name: "Vishnu Sahasranama",
    sanskrit: "विष्णुसहस्रनाम",
    deity: "Vishnu",
    description:
      "The thousand sacred names of Vishnu from the Mahabharata, each revealing a divine aspect of the preserver.",
    type: "sahasranama",
    count: 1000,
    sampleNames: VISHNU_SAHASRANAMA.slice(0, 5).map((name) => ({
      sanskrit: name.sanskrit,
      meaning: name.meaning,
    })),
    href: "/vishnu-sahasranama",
    audioAvailable: true,
  },
  {
    id: "lalita-sahasranama",
    name: "Lalita Sahasranama",
    sanskrit: "ललितासहस्रनाम",
    deity: "Lalita Tripurasundari",
    description:
      "The thousand names of the Divine Mother Lalita, celebrating the beauty and power of the supreme goddess.",
    type: "sahasranama",
    count: 1000,
    sampleNames: LALITA_SAHASRANAMA.slice(0, 5).map((name) => ({
      sanskrit: name.sanskrit,
      meaning: name.meaning,
    })),
    audioAvailable: false,
  },
  {
    id: "shiva-sahasranama",
    name: "Shiva Sahasranama",
    sanskrit: "शिवसहस्रनाम",
    deity: "Shiva",
    description:
      "The thousand names of Lord Shiva, encompassing his roles as destroyer, ascetic, and divine consciousness.",
    type: "sahasranama",
    count: 1000,
    sampleNames: SHIVA_SAHASRANAMA.slice(0, 5).map((name) => ({
      sanskrit: name.sanskrit,
      meaning: name.meaning,
    })),
    audioAvailable: false,
  },
  {
    id: "sahasranama-collection",
    name: "Complete Sahasranama Collection",
    sanskrit: "सहस्रनाम संग्रह",
    deity: "Multiple Deities",
    description:
      "Comprehensive collection of thousand-name hymns for Vishnu, Shiva, Devi, and other deities.",
    type: "sahasranama",
    href: "/sahasranama",
    audioAvailable: false,
  },
  {
    id: "hanuman-chalisa",
    name: "Hanuman Chalisa",
    sanskrit: "हनुमान चालीसा",
    deity: "Hanuman",
    description:
      "The 40-verse hymn praising Lord Hanuman, composed by Tulsidas, beloved for its devotional power.",
    type: "stotra",
    count: 40,
    audioAvailable: true,
  },
  {
    id: "ramaraksha-stotra",
    name: "Ramaraksha Stotra",
    sanskrit: "रामरक्षा स्तोत्र",
    deity: "Rama",
    description:
      "The protective hymn of Lord Rama, traditionally recited for divine protection and blessings.",
    type: "stotra",
    audioAvailable: true,
  },
  {
    id: "soundaryalahari",
    name: "Soundaryalahari",
    sanskrit: "सौन्दर्यलहरी",
    deity: "Shakti",
    description:
      "Waves of beauty - 100 verses by Adi Shankaracharya praising the divine beauty and power of the goddess.",
    type: "stotra",
    count: 100,
    audioAvailable: false,
  },
  {
    id: "gayatri-mantra",
    name: "Gayatri Mantra",
    sanskrit: "गायत्री मन्त्र",
    deity: "Savitr (Solar Deity)",
    description:
      "The sacred Gayatri mantra, considered the essence of the Vedas and chanted for wisdom and enlightenment.",
    type: "mantra",
    audioAvailable: true,
  },
];

export function StotraLibrary() {
  const [selectedStotra, setSelectedStotra] = useState<StotraItem | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "sahasranama":
        return <Star className="size-5" />;
      case "stotra":
        return <BookOpen className="size-5" />;
      case "mantra":
        return <Music className="size-5" />;
      default:
        return <Heart className="size-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "sahasranama":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "stotra":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "mantra":
        return "text-purple-600 bg-purple-50 border-purple-200";
      default:
        return "text-red-600 bg-red-50 border-red-200";
    }
  };

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-8">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Devotional Literature Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">
                Stotras are sacred hymns of praise, mantras are potent sound formulas, and
                sahasranamas are thousand-name litanies that systematically enumerate divine
                qualities. These texts form the core of Hindu devotional practice, used for worship,
                meditation, and spiritual growth.
              </p>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Stotras and mantras">
                {stotraItems.map((stotra, index) => (
                  <motion.div
                    key={stotra.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    whileFocus={{ scale: 1.02, outline: "2px solid var(--primary)" }}
                  >
                    <Card
                      className={`cursor-pointer transition-all hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                        selectedStotra?.id === stotra.id ? "ring-2 ring-primary shadow-md" : ""
                      }`}
                      onClick={() => setSelectedStotra(stotra)}
                      role="listitem"
                      tabIndex={0}
                      aria-label={`${stotra.name} (${stotra.sanskrit}) - ${stotra.deity}`}
                      aria-pressed={selectedStotra?.id === stotra.id}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedStotra(stotra);
                        }
                      }}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`rounded-lg p-2 ${getTypeColor(stotra.type)}`}>
                              {getTypeIcon(stotra.type)}
                            </div>
                            <div>
                              <CardTitle className="text-base sm:text-lg">{stotra.name}</CardTitle>
                              <p className="font-devanagari text-sm sm:text-base text-primary">
                                {stotra.sanskrit}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-3 text-xs sm:text-sm text-muted-foreground line-clamp-2">
                          <strong>{stotra.deity}</strong> • {stotra.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="rounded bg-secondary px-2 py-1 text-xs capitalize">
                            {stotra.type}
                            {stotra.count && ` (${stotra.count})`}
                          </span>
                          {stotra.audioAvailable && (
                            <span className="flex items-center gap-1 rounded bg-green-100 dark:bg-green-900/30 px-2 py-1 text-xs text-green-800 dark:text-green-400">
                              <Play className="size-3" />
                              <span className="hidden sm:inline">Audio</span>
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed View */}
          {selectedStotra && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-3 ${getTypeColor(selectedStotra.type)}`}>
                      {getTypeIcon(selectedStotra.type)}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{selectedStotra.name}</CardTitle>
                      <p className="font-devanagari text-lg text-primary">
                        {selectedStotra.sanskrit}
                      </p>
                    </div>
                  </div>
                  {selectedStotra.href && (
                    <Button asChild>
                      <a href={selectedStotra.href}>Read Full Text</a>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold">Deity</h3>
                  <p className="text-muted-foreground">{selectedStotra.deity}</p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">Description</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {selectedStotra.description}
                  </p>
                </div>

                {selectedStotra.count && (
                  <div>
                    <h3 className="mb-2 font-semibold">Verses/Names</h3>
                    <p className="text-muted-foreground">
                      {selectedStotra.count} sacred names/verses
                    </p>
                  </div>
                )}

                {selectedStotra.sampleNames && selectedStotra.sampleNames.length > 0 && (
                  <div>
                    <h3 className="mb-3 font-semibold">Sample Names</h3>
                    <div className="space-y-2">
                      {selectedStotra.sampleNames.map((name, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 rounded-lg bg-background/50 p-3"
                        >
                          <span className="min-w-[3rem] font-mono text-sm text-primary">
                            {index + 1}.
                          </span>
                          <div className="flex-1">
                            <p className="font-devanagari text-lg">{name.sanskrit}</p>
                            <p className="text-sm text-muted-foreground">{name.meaning}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${getTypeColor(selectedStotra.type)}`}
                  >
                    {selectedStotra.type.charAt(0).toUpperCase() + selectedStotra.type.slice(1)}
                  </span>
                  {selectedStotra.audioAvailable && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                      Audio Available
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Practice Guide */}
          <Card>
            <CardHeader>
              <CardTitle>How to Use Stotras & Mantras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold">Devotional Practice</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Chant daily for spiritual merit and divine connection</li>
                    <li>• Use during puja ceremonies and worship</li>
                    <li>• Memorize key verses for meditation</li>
                    <li>• Recite with proper pronunciation and devotion</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Benefits</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Develops concentration and mental focus</li>
                    <li>• Invokes divine qualities through sacred sound</li>
                    <li>• Creates positive vibrations and peace</li>
                    <li>• Preserves ancient wisdom traditions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
