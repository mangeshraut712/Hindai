"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { QuizSystem } from "@/components/quiz/quiz-system";

const quizTopics = [
  { label: "Bhagavad Gita", emoji: "📖" },
  { label: "Yoga Sutras", emoji: "🧘" },
  { label: "Upanishads", emoji: "🔱" },
  { label: "Indian Philosophy", emoji: "🪷" },
  { label: "Ramayana", emoji: "🏹" },
  { label: "Mahabharata", emoji: "⚔️" },
];

export default function QuizPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="hero-sun -left-20 top-10 size-56 opacity-80" aria-hidden="true" />
          <div className="hero-sun right-0 top-20 size-72 opacity-60" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-3xl"
              >
                <span className="eyebrow">Pariksha • परीक्षा</span>
                <h1 className="section-title mt-6">Test your knowledge of ancient wisdom.</h1>
                <p className="section-copy mt-5">
                  AI-generated questions from the Bhagavad Gita, Yoga Sutras, Upanishads, and the
                  great epics. Each answer deepens your understanding of the tradition.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="surface-panel max-w-md p-6 lg:ml-auto transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative z-10 space-y-4">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                    Topics covered
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {quizTopics.map((topic, index) => (
                      <motion.div
                        key={topic.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                        className="group rounded-[20px] border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground/80 transition-all duration-300 hover:bg-primary/10 hover:border-primary/30 hover:scale-105"
                      >
                        <span className="mr-2">{topic.emoji}</span>
                        {topic.label}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Quiz System ── */}
        <motion.section
          className="px-4 py-16 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto max-w-3xl">
            <QuizSystem />
          </div>
        </motion.section>

        {/* ── CTA ── */}
        <motion.section
          className="px-4 pb-20 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="surface-panel p-8 md:p-10">
              <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <span className="eyebrow">Deepen your study • गहरा अध्ययन</span>
                  <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-foreground">
                    From quiz to guided learning.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    Found a topic that interests you? Continue with Guru AI for deeper explanations
                    or explore guided study paths through the scripture library.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="premium" size="lg" asChild>
                      <Link href="/ai-guide/">
                        Ask Guru AI
                        <Sparkles className="size-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="lg" asChild>
                      <Link href="/study-paths/">
                        Study paths
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
