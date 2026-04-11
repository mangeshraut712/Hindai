"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Share2, Heart, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Daily wisdom verses from various scriptures
const dailyWisdom = [
  {
    id: 1,
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
    transliteration: "Karmanye vadhikaraste ma phaleshu kadachana",
    translation: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.",
    source: "Bhagavad Gita 2.47",
    context: "The essence of Karma Yoga - focus on your duty without attachment to results.",
    theme: "duty",
  },
  {
    id: 2,
    sanskrit: "योगस्थः कुरु कर्माणि",
    transliteration: "Yogasthah kuru karmani",
    translation: "Perform your duties being established in Yoga, abandon attachment to success and failure.",
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
    translation: "Lead me from the unreal to the real, from darkness to light, from death to immortality.",
    source: "Shanti Mantra",
    theme: "transformation",
  },
  {
    id: 5,
    sanskrit: "अयं निजः परो वेति गणना लघुचेतसाम्",
    transliteration: "Ayam nijah paro veti ganana laghuchetasam",
    translation: "This is mine, that is his - such calculations are for the narrow-minded. For the generous, the entire world is one family.",
    source: "Maha Upanishad 6.71-72",
    theme: "unity",
  },
  {
    id: 6,
    sanskrit: "मन एव मनुष्याणां कारणं बन्धमोक्षयोः",
    transliteration: "Mana eva manushyanam karanam bandha mokshayoh",
    translation: "The mind alone is the cause of bondage and liberation for humans.",
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

  useEffect(() => {
    setMounted(true);
    // Get today's wisdom based on date
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    setCurrentWisdom(dailyWisdom[dayOfYear % dailyWisdom.length]);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Daily Wisdom from Hind AI",
        text: `"${currentWisdom.translation}" - ${currentWisdom.source}`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(
        `"${currentWisdom.translation}" - ${currentWisdom.source}\n\nDiscover more at Hind AI`
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

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sun className="h-8 w-8 text-orange-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent">
              दैनिक ज्ञान
            </h1>
            <Moon className="h-8 w-8 text-indigo-500" />
          </div>
          <p className="text-lg text-muted-foreground">
            Daily Wisdom from Ancient Scriptures
          </p>
          <p className="text-sm text-orange-600 mt-2">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>

        {/* Wisdom Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWisdom.id}
            initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-2xl dark:bg-stone-900/80">
              <CardContent className="p-8 md:p-12">
                {/* Theme Badge */}
                <div className="flex justify-center mb-8">
                  <span className="px-4 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-medium capitalize dark:bg-orange-900/30 dark:text-orange-300">
                    {currentWisdom.theme}
                  </span>
                </div>

                {/* Sanskrit */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl font-bold text-center mb-4 leading-relaxed"
                >
                  <p className="font-serif">{currentWisdom.sanskrit}</p>
                </motion.div>

                {/* Transliteration */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-center text-orange-600 mb-8 italic"
                >
                  {currentWisdom.transliteration}
                </motion.p>

                {/* Translation */}
                <motion.blockquote
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-center text-stone-800 dark:text-stone-200 mb-8 leading-relaxed"
                >
                  &ldquo;{currentWisdom.translation}&rdquo;
                </motion.blockquote>

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 my-8">
                  <div className="h-px bg-orange-300 flex-1 max-w-[100px]" />
                  <Sparkles className="h-5 w-5 text-orange-400" />
                  <div className="h-px bg-orange-300 flex-1 max-w-[100px]" />
                </div>

                {/* Context */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center text-muted-foreground mb-6"
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
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <Button
            variant="outline"
            onClick={() => setIsLiked(!isLiked)}
            className={`gap-2 ${
              isLiked
                ? "bg-red-100 text-red-600 border-red-300"
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
            onClick={handleNext}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white gap-2"
          >
            <Sparkles className="h-4 w-4" />
            More Wisdom
          </Button>
        </motion.div>

        {/* Subtle Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          Start your day with ancient wisdom. New teaching every day.
        </motion.p>
      </div>
    </div>
  );
}
