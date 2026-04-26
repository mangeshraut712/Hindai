"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const frameworks = [
  {
    id: "purushartha",
    name: "Purushartha",
    sanskrit: "पुरुषार्थ",
    description: "The four aims of human life: Dharma (righteousness), Artha (prosperity), Kama (pleasure), and Moksha (liberation). A balanced life pursues all four in harmony.",
    components: ["Dharma (धर्म) - Righteousness", "Artha (अर्थ) - Prosperity", "Kama (काम) - Pleasure", "Moksha (मोक्ष) - Liberation"],
    application: "Use this framework to evaluate life choices and ensure balance between material and spiritual goals.",
  },
  {
    id: "pancha-kosha",
    name: "Pancha Kosha",
    sanskrit: "पञ्च कोश",
    description: "The five layers of the self according to Taittiriya Upanishad: Annamaya (physical), Pranamaya (vital), Manomaya (mental), Vijnanamaya (intellectual), and Anandamaya (bliss).",
    components: [
      "Annamaya (अन्नमय) - Physical body",
      "Pranamaya (प्राणमय) - Vital energy",
      "Manomaya (मनोमय) - Mental sheath",
      "Vijnanamaya (विज्ञानमय) - Intellectual sheath",
      "Anandamaya (आनन्दमय) - Bliss sheath",
    ],
    application: "Understand your multi-dimensional nature and progress from outer to inner layers through spiritual practice.",
  },
  {
    id: "ashrama-dharma",
    name: "Ashrama Dharma",
    sanskrit: "आश्रम धर्म",
    description: "The four stages of life: Brahmacharya (student), Grihastha (householder), Vanaprastha (forest dweller), and Sannyasa (renunciate). Each stage has specific duties.",
    components: [
      "Brahmacharya (ब्रह्मचर्य) - Student life",
      "Grihastha (गृहस्थ) - Householder",
      "Vanaprastha (वानप्रस्थ) - Forest dweller",
      "Sannyasa (संन्यास) - Renunciation",
    ],
    application: "Navigate life transitions with awareness of changing responsibilities and spiritual focus at each stage.",
  },
  {
    id: "navavidha-bhakti",
    name: "Navavidha Bhakti",
    sanskrit: "नवविधा भक्ति",
    description: "The nine forms of devotion from Srimad Bhagavatam: Shravana (listening), Kirtana (singing), Smarana (remembering), Padasevana (serving), Archana (worship), Vandana (praying), Dasya (servitude), Sakhya (friendship), and Atmanivedana (surrender).",
    components: [
      "Shravana (श्रवण) - Listening",
      "Kirtana (कीर्तन) - Singing",
      "Smarana (स्मरण) - Remembering",
      "Padasevana (पादसेवन) - Serving",
      "Archana (अर्चन) - Worship",
      "Vandana (वन्दन) - Praying",
      "Dasya (दास्य) - Servitude",
      "Sakhya (साख्य) - Friendship",
      "Atmanivedana (आत्मनिवेदन) - Surrender",
    ],
    application: "Choose the form of devotion that resonates with your temperament and practice it sincerely.",
  },
  {
    id: "ashtanga-yoga",
    name: "Ashtanga Yoga",
    sanskrit: "अष्टाङ्ग योग",
    description: "The eight limbs of Yoga from Patanjali's Yoga Sutras: Yama (restraints), Niyama (observances), Asana (posture), Pranayama (breath control), Pratyahara (withdrawal), Dharana (concentration), Dhyana (meditation), and Samadhi (absorption).",
    components: [
      "Yama (यम) - Social restraints",
      "Niyama (नियम) - Personal observances",
      "Asana (आसन) - Physical postures",
      "Pranayama (प्राणायाम) - Breath control",
      "Pratyahara (प्रत्याहार) - Sense withdrawal",
      "Dharana (धारणा) - Concentration",
      "Dhyana (ध्यान) - Meditation",
      "Samadhi (समाधि) - Absorption",
    ],
    application: "Follow the systematic path from ethical foundations to spiritual absorption through consistent practice.",
  },
  {
    id: "shadripu",
    name: "Shadripu",
    sanskrit: "षड्रिपु",
    description: "The six enemies of the mind: Kama (desire), Krodha (anger), Lobha (greed), Mada (pride), Moha (attachment), and Matsarya (jealousy). Overcoming these is essential for spiritual progress.",
    components: [
      "Kama (काम) - Desire",
      "Krodha (क्रोध) - Anger",
      "Lobha (लोभ) - Greed",
      "Mada (मद) - Pride",
      "Moha (मोह) - Attachment",
      "Matsarya (मात्सर्य) - Jealousy",
    ],
    application: "Identify and work on these inner enemies through self-awareness, discipline, and spiritual practice.",
  },
];

export function FrameworkExplorer() {
  const [selectedFramework, setSelectedFramework] = useState<typeof frameworks[0] | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Introduction */}
      <div className="mb-12 surface-panel p-6">
        <h2 className="text-2xl font-semibold text-foreground">Foundational Frameworks</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          These frameworks provide the structural foundation for Hindu thought and practice. They offer comprehensive
          maps for understanding human existence, spiritual growth, and the path to liberation. Each framework can be
          applied to daily life for self-improvement and spiritual development.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {frameworks.map((framework, index) => (
          <motion.article
            key={framework.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="surface-panel cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => setSelectedFramework(framework)}
          >
            <div className="relative z-10">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BookOpen className="size-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-foreground">{framework.name}</h3>
              <p className="font-devanagari text-lg text-primary">{framework.sanskrit}</p>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{framework.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {framework.components.slice(0, 2).map((component) => (
                  <span
                    key={component}
                    className="rounded-full border border-border/60 bg-background/75 px-2 py-1 text-xs text-muted-foreground"
                  >
                    {component.split(" - ")[0]}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedFramework && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedFramework(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="surface-panel max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-foreground">{selectedFramework.name}</h2>
                <p className="font-devanagari text-2xl text-primary">{selectedFramework.sanskrit}</p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedFramework(null)}>
                ✕
              </Button>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold text-foreground">Description</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{selectedFramework.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Components</h3>
                <div className="mt-2 space-y-2">
                  {selectedFramework.components.map((component) => (
                    <div
                      key={component}
                      className="rounded-lg border border-border/60 bg-background/75 px-4 py-2 text-sm text-foreground"
                    >
                      {component}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Practical Application</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{selectedFramework.application}</p>
              </div>

              <Button variant="premium" className="w-full">
                Study {selectedFramework.name} in Depth
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
