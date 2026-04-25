"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Heart,
  Sparkles,
  Bell,
  BellOff,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeditationTimer } from "@/components/meditation-timer";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { track } from "@vercel/analytics";

const dailyWisdom = [
  {
    id: 1,
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
    transliteration: "Karmanye vadhikaraste ma phaleshu kadachana",
    translation:
      "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.",
    source: "Bhagavad Gita 2.47",
    context: "The essence of Karma Yoga — focus on your duty without attachment to results.",
    theme: "Karma",
  },
  {
    id: 2,
    sanskrit: "योगस्थः कुरु कर्माणि",
    transliteration: "Yogasthah kuru karmani",
    translation:
      "Perform your duties being established in Yoga, abandon attachment to success and failure.",
    source: "Bhagavad Gita 2.48",
    context: "Equanimity in action is the mark of a wise person established in Yoga.",
    theme: "Yoga",
  },
  {
    id: 3,
    sanskrit: "तमसो मा ज्योतिर्गमय",
    transliteration: "Tamaso ma jyotir gamaya",
    translation: "Lead me from darkness to light, from ignorance to knowledge.",
    source: "Brihadaranyaka Upanishad 1.3.28",
    context:
      "One of the most beloved prayers in Vedic literature, seeking illumination of the soul.",
    theme: "Jnana",
  },
  {
    id: 4,
    sanskrit: "ओं असतो मा सद्गमय",
    transliteration: "Om asato ma sad gamaya",
    translation:
      "Lead me from the unreal to the real, from darkness to light, from death to immortality.",
    source: "Shanti Mantra",
    context:
      "The Pavamana Mantra — a universal prayer for the soul's journey toward ultimate truth.",
    theme: "Moksha",
  },
  {
    id: 5,
    sanskrit: "अयं निजः परो वेति गणना लघुचेतसाम्",
    transliteration: "Ayam nijah paro veti ganana laghuchetasam",
    translation:
      "This is mine, that is his — such calculations are for the narrow-minded. For the generous, the entire world is one family.",
    source: "Maha Upanishad 6.71-72",
    context: "The concept of Vasudhaiva Kutumbakam — the world is one family.",
    theme: "Dharma",
  },
  {
    id: 6,
    sanskrit: "मन एव मनुष्याणां कारणं बन्धमोक्षयोः",
    transliteration: "Mana eva manushyanam karanam bandha mokshayoh",
    translation: "The mind alone is the cause of bondage and liberation for humans.",
    source: "Amritabindu Upanishad",
    context: "The Upanishadic insight that all spiritual progress begins with mastering the mind.",
    theme: "Dhyana",
  },
  {
    id: 7,
    sanskrit: "सत्यमेव जयते",
    transliteration: "Satyameva jayate",
    translation: "Truth alone triumphs, not falsehood.",
    source: "Mundaka Upanishad 3.1.6",
    context:
      "India's national motto — a declaration that truth is the ultimate victor in all things.",
    theme: "Satya",
  },
];

export default function DailyWisdomClient() {
  const [currentWisdom, setCurrentWisdom] = useState(dailyWisdom[0]);
  const [isLiked, setIsLiked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);

  useEffect(() => {
    setMounted(true);
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    setCurrentWisdom(dailyWisdom[dayOfYear % dailyWisdom.length]);

    if ("Notification" in window) {
      setNotificationsEnabled(Notification.permission === "granted");
    }
  }, []);

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === "granted");
      track("notification_permission_requested", {
        granted: permission === "granted",
      });

      if (permission === "granted") {
        scheduleDailyNotification();
      }
    }
  };

  const scheduleDailyNotification = () => {
    if ("serviceWorker" in navigator && "Notification" in window) {
      setTimeout(() => {
        new Notification("Daily Wisdom from Hind AI", {
          body: `"${currentWisdom.translation}" — ${currentWisdom.source}`,
          icon: "/favicon.ico",
          tag: "daily-wisdom",
        });
      }, 2000);
    }
  };

  const toggleMeditation = () => {
    setShowMeditation(!showMeditation);
    track("meditation_timer_toggled", { shown: !showMeditation });
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Daily Wisdom from Hind AI",
        text: `"${currentWisdom.translation}" — ${currentWisdom.source}`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(
        `"${currentWisdom.translation}" — ${currentWisdom.source}\n\nDiscover more at Hind AI`
      );
      alert("Copied to clipboard!");
    }
  };

  const handleNext = () => {
    const currentIndex = dailyWisdom.findIndex((w) => w.id === currentWisdom.id);
    const nextIndex = (currentIndex + 1) % dailyWisdom.length;
    setCurrentWisdom(dailyWisdom[nextIndex]);
    setIsLiked(false);
  };

  const handlePrevious = () => {
    const currentIndex = dailyWisdom.findIndex((w) => w.id === currentWisdom.id);
    const prevIndex = (currentIndex - 1 + dailyWisdom.length) % dailyWisdom.length;
    setCurrentWisdom(dailyWisdom[prevIndex]);
    setIsLiked(false);
  };

  if (!mounted) return null;

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
              <div className="max-w-3xl">
                <span className="eyebrow">Dainik Sadhana • दैनिक साधना</span>
                <h1 className="section-title mt-6">Begin each day with timeless wisdom.</h1>
                <p className="section-copy mt-5">
                  A new Sanskrit verse, its meaning, and a meditation prompt drawn from the Vedas,
                  Upanishads, and Bhagavad Gita — every day.
                </p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {new Date().toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="surface-panel max-w-md p-6 lg:ml-auto transition-all duration-300 hover:shadow-xl">
                <div className="relative z-10 space-y-4">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                    Today&apos;s practice
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Sanskrit verse & transliteration",
                      "English meaning & context",
                      "Guided meditation timer",
                      "Share & notification support",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-[20px] border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground/80 transition-all duration-300 hover:bg-primary/10 hover:border-primary/30"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Wisdom Card ── */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Navigation */}
            <div className="mb-8 flex items-center justify-between">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                aria-label="Previous verse"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <div className="flex items-center gap-3">
                <span className="eyebrow">{currentWisdom.theme}</span>
                <span className="text-sm font-medium text-muted-foreground">
                  {currentWisdom.source}
                </span>
              </div>
              <Button variant="outline" size="icon" onClick={handleNext} aria-label="Next verse">
                <ChevronRight className="size-5" />
              </Button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentWisdom.id}
                initial={{ opacity: 0, scale: 0.97, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -16 }}
                transition={{ duration: 0.45, type: "spring", bounce: 0.2 }}
              >
                <div className="surface-panel p-8 md:p-12">
                  <div className="relative z-10 space-y-8 text-center">
                    {/* Sanskrit */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="font-devanagari text-3xl leading-relaxed text-foreground sm:text-4xl md:text-5xl"
                    >
                      {currentWisdom.sanskrit}
                    </motion.p>

                    {/* Transliteration */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25 }}
                      className="text-lg italic text-primary"
                    >
                      {currentWisdom.transliteration}
                    </motion.p>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="h-px w-20 bg-border/80" />
                      <Sparkles className="size-4 text-accent" />
                      <div className="h-px w-20 bg-border/80" />
                    </div>

                    {/* Translation */}
                    <motion.blockquote
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 }}
                      className="font-serif text-xl leading-relaxed text-foreground sm:text-2xl"
                    >
                      &ldquo;{currentWisdom.translation}&rdquo;
                    </motion.blockquote>

                    {/* Context */}
                    {currentWisdom.context && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.45 }}
                        className="mx-auto max-w-xl text-sm leading-7 text-muted-foreground"
                      >
                        {currentWisdom.context}
                      </motion.p>
                    )}

                    {/* Source */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-sm font-semibold tracking-[0.08em] text-primary"
                    >
                      — {currentWisdom.source}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              <Button
                variant="outline"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "border-primary/40 bg-primary/10 text-primary" : ""}
              >
                <Heart className={`size-4 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Loved" : "Love"}
              </Button>

              <Button variant="outline" onClick={handleShare}>
                <Share2 className="size-4" />
                Share
              </Button>

              <Button
                variant="outline"
                onClick={requestNotificationPermission}
                className={
                  notificationsEnabled ? "border-primary/40 bg-primary/10 text-primary" : ""
                }
              >
                {notificationsEnabled ? (
                  <Bell className="size-4" />
                ) : (
                  <BellOff className="size-4" />
                )}
                {notificationsEnabled ? "Daily On" : "Daily Reminder"}
              </Button>

              <Button variant="outline" onClick={toggleMeditation}>
                🧘 Meditate
              </Button>
            </motion.div>

            {/* Meditation Timer */}
            <AnimatePresence>
              {showMeditation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8"
                >
                  <MeditationTimer />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="surface-panel p-8 md:p-10">
              <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <span className="eyebrow">Go deeper • गहराई में</span>
                  <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-foreground">
                    Ask Guru AI to explain today&apos;s verse.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    Use the conversational guide for commentary, cross-references, and practical
                    applications from Indian philosophical traditions.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button variant="premium" size="lg" asChild>
                    <Link
                      href={`/ai-guide/?prompt=${encodeURIComponent(`Explain ${currentWisdom.source} — "${currentWisdom.transliteration}"`)}`}
                    >
                      Ask Guru AI
                      <Sparkles className="size-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contents/">
                      <BookOpen className="size-4" />
                      Browse library
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
