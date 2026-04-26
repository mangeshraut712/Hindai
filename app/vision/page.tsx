"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ScripturalAnalysis = dynamic(
  () => import("@/components/ai/scriptural-analysis").then((m) => m.ScripturalAnalysis),
  {
    ssr: false,
    loading: () => (
      <div className="surface-panel min-h-[500px] animate-pulse rounded-2xl p-6">
        <div className="h-8 w-48 rounded-lg bg-muted/60" />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="h-64 rounded-lg bg-muted/60" />
          <div className="space-y-4">
            <div className="h-24 rounded-lg bg-muted/60" />
            <div className="h-12 rounded-lg bg-muted/60" />
          </div>
        </div>
      </div>
    ),
  }
);

const features = [
  {
    title: "Sacred Text Analysis",
    body: "Upload images of Sanskrit manuscripts, ancient texts, or scriptures for AI-powered reading and translation.",
  },
  {
    title: "Iconography Recognition",
    body: "Identify deities, symbols, and sacred imagery with detailed explanations of their significance.",
  },
  {
    title: "Temple Architecture",
    body: "Analyze temple structures, sculptures, and architectural elements with historical context.",
  },
];

export default function VisionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="hero-sun -left-20 top-10 h-56 w-56 opacity-80" aria-hidden="true" />
          <div className="hero-sun right-0 top-20 h-72 w-72 opacity-60" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-3xl"
              >
                <span className="eyebrow">Vision Analysis • दृश्य विश्लेषण</span>
                <h1 className="section-title mt-6">
                  See ancient wisdom through AI-powered vision.
                </h1>
                <p className="section-copy mt-5">
                  Upload images of sacred texts, iconography, temple architecture, or ritual objects
                  for intelligent analysis. Gemma 4's multimodal capabilities provide deep insights
                  into Hindu visual heritage.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="surface-panel max-w-xl p-6 lg:ml-auto"
              >
                <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                  Powered by Gemma 4
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Multimodal image analysis",
                    "Sanskrit text recognition",
                    "Iconography interpretation",
                    "Temple architecture insights",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                      className="rounded-[20px] border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground/80 transition-all duration-300 hover:scale-105 hover:border-primary/30"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ScripturalAnalysis />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 grid gap-5 lg:grid-cols-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="surface-panel group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative z-10">
                    <motion.div
                      className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Sparkles className="size-5" />
                    </motion.div>
                    <h2 className="mt-5 text-2xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                      {feature.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{feature.body}</p>
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
