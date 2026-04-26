"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, MessageSquare, Calendar, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const communityFeatures = [
  {
    icon: MessageSquare,
    title: "Discussion Forums",
    description:
      "Engage in meaningful conversations about scriptures, philosophy, and spiritual practices with like-minded individuals.",
    bilingual: "चर्चा मंच",
  },
  {
    icon: Users,
    title: "Study Groups",
    description:
      "Form or join study circles to explore texts together, share insights, and support each other's learning journey.",
    bilingual: "अध्ययन समूह",
  },
  {
    icon: Calendar,
    title: "Live Events",
    description:
      "Participate in online satsangs, workshops, and guided meditation sessions led by experienced practitioners.",
    bilingual: "लाइव कार्यक्रम",
  },
  {
    icon: BookOpen,
    title: "Shared Resources",
    description:
      "Access and contribute to a growing library of study materials, commentaries, and learning resources.",
    bilingual: "साझा संसाधन",
  },
];

const upcomingEvents = [
  {
    title: "Bhagavad Gita Chapter 2 Study",
    date: "Every Sunday",
    time: "10:00 AM IST",
    description: "Weekly deep dive into the teachings of Karma Yoga with guided discussion.",
  },
  {
    title: "Upanishad Wisdom Circle",
    date: "Wednesdays",
    time: "7:00 PM IST",
    description: "Explore the philosophical foundations of Vedanta in a supportive group setting.",
  },
  {
    title: "Sanskrit for Beginners",
    date: "Saturdays",
    time: "11:00 AM IST",
    description: "Learn the basics of Sanskrit pronunciation and reading Devanagari script.",
  },
];

const guidelines = [
  "Respect all traditions and interpretations",
  "Share knowledge with humility and openness",
  "Support fellow seekers on their journey",
  "Maintain a spirit of inquiry and learning",
  "Honor the sacred nature of these teachings",
];

export default function CommunityPage() {
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <span className="eyebrow">Community • समुदाय</span>
              <h1 className="section-title mt-6">Learn together, grow together.</h1>
              <p className="section-copy mt-5">
                Join a vibrant community of seekers, scholars, and practitioners. Connect with
                others on the path of wisdom, share insights, and deepen your understanding through
                collective learning and meaningful dialogue.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                The journey of spiritual wisdom is enriched when walked together. Our community
                provides a space for respectful discussion, collaborative study, and mutual support
                as we explore the profound teachings of ancient Indian wisdom traditions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="eyebrow">Community Features • सुविधाएं</span>
              <h2 className="section-title mt-6">Ways to connect and learn.</h2>
              <p className="section-copy mt-5">
                Discover the various ways you can engage with our community and enhance your
                spiritual journey.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {communityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="surface-panel group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative z-10 space-y-4">
                    <motion.div
                      className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="size-5" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                        {feature.title}
                      </h3>
                      <p className="mt-2 font-devanagari text-xs text-muted-foreground">
                        {feature.bilingual}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Upcoming Events ── */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.9fr)]">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <span className="eyebrow">Upcoming Events • आगामी कार्यक्रम</span>
                <h2 className="section-title mt-6">Join our scheduled sessions.</h2>
                <p className="section-copy mt-5">
                  Participate in regularly scheduled study sessions, discussions, and events
                  designed to support your learning journey.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="surface-panel p-6"
              >
                <div className="relative z-10 space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <motion.div
                      key={event.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="rounded-2xl border border-border/60 bg-background/75 p-4 transition-all duration-300 hover:scale-105 hover:border-primary/30 hover:bg-primary/5"
                    >
                      <div className="flex items-start gap-3">
                        <motion.div
                          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                          whileHover={{ rotate: 15, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Calendar className="size-4" />
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-foreground">{event.title}</h4>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {event.date} • {event.time}
                          </p>
                          <p className="mt-2 text-xs leading-5 text-muted-foreground">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Guidelines ── */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="surface-panel p-8 md:p-10"
            >
              <div className="relative z-10 max-w-3xl">
                <span className="eyebrow">Community Guidelines • समुदाय निर्देश</span>
                <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-foreground">
                  Creating a sacred space for learning.
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Our community is built on mutual respect, open inquiry, and a shared commitment to
                  learning. Please honor these guidelines as you participate.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {guidelines.map((guideline, index) => (
                    <motion.div
                      key={guideline}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/75 px-4 py-3 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
                    >
                      <motion.div
                        className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                        whileHover={{ scale: 1.2, rotate: 45 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Sparkles className="size-2.5" />
                      </motion.div>
                      <p className="text-sm leading-6 text-foreground/90">{guideline}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <motion.section
          className="px-4 pb-20 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="surface-panel overflow-hidden bg-[linear-gradient(135deg,hsl(var(--foreground)),hsl(28_18%_18%))] text-background">
              <div className="grid gap-8 px-6 py-10 md:px-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div className="relative z-10 max-w-2xl">
                  <span className="eyebrow border-white/15 bg-white/10 text-white/70">
                    Join the Community
                  </span>
                  <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                    Begin your journey with others.
                  </h2>
                  <p className="text-white/72 mt-4 text-sm leading-7">
                    Connect with fellow seekers, participate in discussions, and deepen your
                    understanding through collective learning. The path of wisdom is better walked
                    together.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="premium" size="lg" asChild>
                      <Link href="/ai-guide">
                        Start Learning
                        <Sparkles className="size-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                      asChild
                    >
                      <Link href="/contents">
                        Browse Library
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
