"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const DharmaGuide = dynamic(
  () => import("@/components/ai/dharma-guide").then((m) => m.DharmaGuide),
  {
    ssr: false,
    loading: () => (
      <div className="surface-panel min-h-[500px] animate-pulse rounded-2xl p-6">
        <div className="bg-muted/60 h-8 w-48 rounded-lg" />
        <div className="mt-6 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="bg-muted/60 size-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="bg-muted/60 h-4 w-3/4 rounded" />
                <div className="bg-muted/60 h-4 w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  }
);

const guidePoints = [
  {
    title: "Personalized Practices",
    body: "Receive tailored spiritual practices based on your goals, capacity, and current life circumstances.",
  },
  {
    title: "Ritual Guidance",
    body: "Learn proper observance of daily rituals, fasting, festivals, and sacred ceremonies.",
  },
  {
    title: "Living Dharma",
    body: "Understand how to apply dharmic principles in modern life for spiritual growth.",
  },
];

export default function DharmaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main id="main-content" className="flex-1">
        <section className="hero-mesh border-border/60 relative overflow-hidden border-b">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="hero-sun top-10 -left-20 size-56 opacity-80" aria-hidden="true" />
          <div className="hero-sun top-20 right-0 size-72 opacity-60" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-3xl"
              >
                <span className="eyebrow">Dharma Guide • Gemma 4</span>
                <h1 className="section-title mt-6">Your personal guide to living dharmically.</h1>
                <p className="section-copy mt-5">
                  Receive personalized spiritual guidance for daily practices, rituals, meditation,
                  and living a life aligned with Dharma. Powered by Gemma 4&apos;s advanced
                  reasoning capabilities.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="surface-panel max-w-xl p-6 lg:ml-auto"
              >
                <p className="text-muted-foreground text-[11px] tracking-[0.32em] uppercase">
                  Personalized Guidance
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Daily ritual suggestions",
                    "Fasting guidance",
                    "Meditation techniques",
                    "Festival observance",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                      className="border-border/60 bg-background/70 text-foreground/80 hover:border-primary/30 rounded-[20px] border px-4 py-3 text-sm transition-all duration-300 hover:scale-105"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <DharmaGuide />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 grid gap-5 lg:grid-cols-3"
            >
              {guidePoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="surface-panel group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative z-10">
                    <motion.div
                      className="bg-primary/10 text-primary group-hover:bg-primary/20 flex size-11 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Sparkles className="size-5" />
                    </motion.div>
                    <h2 className="text-foreground group-hover:text-primary mt-5 text-2xl font-semibold transition-colors duration-300">
                      {point.title}
                    </h2>
                    <p className="text-muted-foreground mt-3 text-sm leading-7">{point.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
