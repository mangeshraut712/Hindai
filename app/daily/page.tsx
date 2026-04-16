"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Share2,
  Heart,
  Sparkles,
  Bell,
  BellOff,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MeditationTimer } from "@/components/meditation-timer";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { track } from "@vercel/analytics";

// Daily wisdom verses from various scriptures
const dailyWisdom = [
  {
    id: 1,
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
    transliteration: "Karmanye vadhikaraste ma phaleshu kadachana",
    translation:
      "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.",
    source: "Bhagavad Gita 2.47",
    context:
      "The essence of Karma Yoga - focus on your duty without attachment to results.",
    theme: "duty",
  },
  {
    id: 2,
    sanskrit: "योगस्थः कुरु कर्माणि",
    transliteration: "Yogasthah kuru karmani",
    translation:
      "Perform your duties being established in Yoga, abandon attachment to success and failure.",
    source: "Bhagavad Gita 2.48",
    theme: "balance",
  },
  {
    id: 3,
    sanskrit: "तमसो मा ज्योतिर्गमय",
    transliteration: "Tamaso ma jyotir gamaya",
    translation: "Lead me from darkness to light, from ignorance to knowledge.",
    source: "Brihadaranyaka Upanishad",
    theme: "enlightenment",
  },
  {
    id: 4,
    sanskrit: "ओं असतो मा सद्गमय",
    transliteration: "Om asato ma sad gamaya",
    translation:
      "Lead me from the unreal to the real, from darkness to light, from death to immortality.",
    source: "Shanti Mantra",
    theme: "transformation",
  },
  {
    id: 5,
    sanskrit: "अयं निजः परो वेति गणना लघुचेतसाम्",
    transliteration: "Ayam nijah paro veti ganana laghuchetasam",
    translation:
      "This is mine, that is his - such calculations are for the narrow-minded. For the generous, the entire world is one family.",
    source: "Maha Upanishad 6.71-72",
    theme: "unity",
  },
  {
    id: 6,
    sanskrit: "मन एव मनुष्याणां कारणं बन्धमोक्षयोः",
    transliteration: "Mana eva manushyanam karanam bandha mokshayoh",
    translation:
      "The mind alone is the cause of bondage and liberation for humans.",
    source: "Amritabindu Upanishad",
    theme: "mind",
  },
  {
    id: 7,
    sanskrit: "सत्यमेव जयते",
    transliteration: "Satyameva jayate",
    translation: "Truth alone triumphs, not falsehood.",
    source: "Mundaka Upanishad 3.1.6",
    theme: "truth",
  },
];

export default function DailyWisdomPage() {
  const [currentWisdom, setCurrentWisdom] = useState(dailyWisdom[0]);
  const [isLiked, setIsLiked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get today's wisdom based on date
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    setCurrentWisdom(dailyWisdom[dayOfYear % dailyWisdom.length]);

    // Check if notifications are supported and enabled
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
        // Schedule daily notification for 7 AM
        scheduleDailyNotification();
      }
    }
  };

  const scheduleDailyNotification = () => {
    if ("serviceWorker" in navigator && "Notification" in window) {
      // This would typically be handled by a service worker
      // For demo purposes, we'll show a notification immediately
      setTimeout(() => {
        new Notification("Daily Wisdom from Hind AI", {
          body: `"${currentWisdom.translation}" - ${currentWisdom.source}`,
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
        text: `"${currentWisdom.translation}" - ${currentWisdom.source}`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(
        `"${currentWisdom.translation}" - ${currentWisdom.source}\n\nDiscover more at Hind AI`,
      );
      alert("Copied to clipboard!");
    }
  };

  const handleNext = () => {
    const currentIndex = dailyWisdom.findIndex(
      (w) => w.id === currentWisdom.id,
    );
    const nextIndex = (currentIndex + 1) % dailyWisdom.length;
    setCurrentWisdom(dailyWisdom[nextIndex]);
    setIsLiked(false);
  };

  const handlePrevious = () => {
    const currentIndex = dailyWisdom.findIndex(
      (w) => w.id === currentWisdom.id,
    );
    const prevIndex =
      (currentIndex - 1 + dailyWisdom.length) % dailyWisdom.length;
    setCurrentWisdom(dailyWisdom[prevIndex]);
    setIsLiked(false);
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-800">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <div className="mb-4 flex items-center justify-center gap-2">
              <Sun className="h-8 w-8 text-orange-500" />
              <h1 className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-4xl font-bold text-transparent">
                दैनिक ज्ञान
              </h1>
              <Moon className="h-8 w-8 text-indigo-500" />
            </div>
            <p className="text-lg text-muted-foreground">
              Daily Wisdom from Ancient Scriptures
            </p>
            <p className="mt-2 text-sm text-orange-600">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>

          {/* Navigation Arrows */}
          <div className="mb-6 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              className="rounded-full"
              aria-label="Previous day"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-sm font-medium text-muted-foreground">
              {currentWisdom.source}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full"
              aria-label="Next day"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Wisdom Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWisdom.id}
              initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Card className="border-orange-200 bg-white/80 shadow-2xl backdrop-blur-sm dark:bg-stone-900/80">
                <CardContent className="p-8 md:p-12">
                  {/* Theme Badge */}
                  <div className="mb-8 flex justify-center">
                    <span className="rounded-full bg-orange-100 px-4 py-1 text-sm font-medium capitalize text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                      {currentWisdom.theme}
                    </span>
                  </div>

                  {/* Sanskrit */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4 text-center text-3xl font-bold leading-relaxed md:text-4xl"
                  >
                    <p className="font-serif">{currentWisdom.sanskrit}</p>
                  </motion.div>

                  {/* Transliteration */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8 text-center text-lg italic text-orange-600"
                  >
                    {currentWisdom.transliteration}
                  </motion.p>

                  {/* Translation */}
                  <motion.blockquote
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8 text-center text-xl leading-relaxed text-stone-800 dark:text-stone-200 md:text-2xl"
                  >
                    &ldquo;{currentWisdom.translation}&rdquo;
                  </motion.blockquote>

                  {/* Divider */}
                  <div className="my-8 flex items-center justify-center gap-4">
                    <div className="h-px max-w-[100px] flex-1 bg-orange-300" />
                    <Sparkles className="h-5 w-5 text-orange-400" />
                    <div className="h-px max-w-[100px] flex-1 bg-orange-300" />
                  </div>

                  {/* Context */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-6 text-center text-muted-foreground"
                  >
                    {currentWisdom.context}
                  </motion.p>

                  {/* Source */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-sm font-semibold text-orange-700 dark:text-orange-400"
                  >
                    — {currentWisdom.source}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Button
              variant="outline"
              onClick={() => setIsLiked(!isLiked)}
              className={`gap-2 ${
                isLiked
                  ? "border-red-300 bg-red-100 text-red-600"
                  : "hover:bg-red-50"
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              {isLiked ? "Loved" : "Love"}
            </Button>

            <Button variant="outline" onClick={handleShare} className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>

            <Button
              onClick={requestNotificationPermission}
              variant="outline"
              className={`gap-2 ${
                notificationsEnabled
                  ? "border-green-300 bg-green-100 text-green-600"
                  : "hover:bg-green-50"
              }`}
            >
              {notificationsEnabled ? (
                <Bell className="h-4 w-4" />
              ) : (
                <BellOff className="h-4 w-4" />
              )}
              {notificationsEnabled ? "Daily On" : "Daily Reminder"}
            </Button>

            <Button
              onClick={toggleMeditation}
              variant="outline"
              className="gap-2 hover:bg-purple-50"
            >
              🧘 Meditate
            </Button>

            <Button
              onClick={handlePrevious}
              variant="outline"
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              className="gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white"
            >
              Next
              <ChevronRight className="h-4 w-4" />
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

          {/* Subtle Quote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-12 text-center text-sm text-muted-foreground"
          >
            Start your day with ancient wisdom. New teaching every day.
          </motion.p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
