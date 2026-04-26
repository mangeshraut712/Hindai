"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Sparkles, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const learningPaths = [
  {
    id: "devanagari",
    name: "Devanagari Script",
    sanskrit: "देवनागरी लिपि",
    level: "Beginner",
    duration: "2-3 weeks",
    lessons: 15,
    description: "Learn to read and write the Devanagari script. Master all 52 characters (13 vowels and 39 consonants) with proper stroke order and pronunciation.",
    topics: ["Vowels (Swaras)", "Consonants (Vyanjanas)", "Conjuncts (Sanyuktaksharas)", "Matras (Vowel signs)", "Reading practice"],
  },
  {
    id: "grammar-basics",
    name: "Sanskrit Grammar Basics",
    sanskrit: "संस्कृत व्याकरण",
    level: "Beginner",
    duration: "4-6 weeks",
    lessons: 25,
    description: "Understand the fundamentals of Sanskrit grammar including sandhi, vibhakti, samasa, and sentence structure based on Panini's Ashtadhyayi.",
    topics: ["Sandhi (word joining)", "Vibhakti (cases)", "Samasa (compounds)", "Karakas (relations)", "Sentence structure"],
  },
  {
    id: "vocabulary",
    name: "Vocabulary Building",
    sanskrit: "शब्द संग्रह",
    level: "Intermediate",
    duration: "Ongoing",
    lessons: 50,
    description: "Build a strong Sanskrit vocabulary with 1000+ essential words organized by category. Learn word roots (dhatus) and word formation.",
    topics: ["Common words", "Dhatu (verb roots)", "Upasarga (prefixes)", "Synonyms", "Antonyms"],
  },
  {
    id: "shloka-memorization",
    name: "Shloka Memorization",
    sanskrit: "श्लोक स्मरण",
    level: "All Levels",
    duration: "Ongoing",
    lessons: 100,
    description: "Memorize important shlokas from scriptures using spaced repetition. Includes Bhagavad Gita, Vishnu Sahasranama, and more.",
    topics: ["Bhagavad Gita verses", "Stotras", "Mantras", "Daily practice", "Recitation techniques"],
  },
  {
    id: "advanced-grammar",
    name: "Advanced Grammar",
    sanskrit: "उन्नत व्याकरण",
    level: "Advanced",
    duration: "8-12 weeks",
    lessons: 30,
    description: "Deep dive into Paninian grammar with complex rules, kaarakas, and advanced sentence analysis. Learn to compose original Sanskrit.",
    topics: ["Panini's sutras", "Kaarakas", "Avyayas (indeclinables)", "Composition", "Poetry analysis"],
  },
  {
    id: "vedic-sanskrit",
    name: "Vedic Sanskrit",
    sanskrit: "वैदिक संस्कृत",
    level: "Advanced",
    duration: "6-8 weeks",
    lessons: 20,
    description: "Study the older form of Sanskrit used in the Vedas. Learn Vedic accents (svaras), meters (chandas), and Vedic-specific grammar.",
    topics: ["Vedic accents", "Chandas (meters)", "Vedic grammar", "Rigveda study", "Chanting techniques"],
  },
];

export function SanskritLearningHub() {
  const [selectedPath, setSelectedPath] = useState<typeof learningPaths[0] | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Introduction */}
      <div className="mb-12 surface-panel p-6">
        <h2 className="text-2xl font-semibold text-foreground">Structured Learning Paths</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Choose your learning path based on your current level and goals. Each path is designed with clear
          objectives, structured lessons, and practical exercises. Progress at your own pace with interactive
          content and spaced repetition for memorization.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {learningPaths.map((path, index) => (
          <motion.article
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="surface-panel cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => setSelectedPath(path)}
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BookOpen className="size-6" />
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    path.level === "Beginner"
                      ? "bg-green-500/10 text-green-600"
                      : path.level === "Intermediate"
                        ? "bg-yellow-500/10 text-yellow-600"
                        : "bg-red-500/10 text-red-600"
                  )}
                >
                  {path.level}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-foreground">{path.name}</h3>
              <p className="font-devanagari text-lg text-primary">{path.sanskrit}</p>
              <p className="mt-2 text-sm text-muted-foreground">{path.duration} • {path.lessons} lessons</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {path.topics.slice(0, 2).map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-border/60 bg-background/75 px-2 py-1 text-xs text-muted-foreground"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedPath && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedPath(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="surface-panel max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-foreground">{selectedPath.name}</h2>
                <p className="font-devanagari text-2xl text-primary">{selectedPath.sanskrit}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {selectedPath.level} • {selectedPath.duration} • {selectedPath.lessons} lessons
                </p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedPath(null)}>
                ✕
              </Button>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold text-foreground">Description</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{selectedPath.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Topics Covered</h3>
                <div className="mt-2 space-y-2">
                  {selectedPath.topics.map((topic) => (
                    <div
                      key={topic}
                      className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/75 px-4 py-2 text-sm text-foreground"
                    >
                      <CheckCircle className="size-4 text-primary" />
                      {topic}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <Button variant="premium" className="w-full">
                  Start Learning
                  <Play className="size-4" />
                </Button>
                <Button variant="outline" className="w-full">
                  <Sparkles className="size-4" />
                  View Sample Lesson
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
