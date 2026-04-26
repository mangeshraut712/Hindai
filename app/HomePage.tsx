"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Languages, Library, ScanSearch } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CANONICAL_COUNTS } from "@/lib/data/canonical-counts";
import { featuredScriptures, scriptureSections } from "@/lib/scripture-catalog";

const studyModes = [
  {
    icon: Library,
    title: "Read by shelf",
    body: "Move through Vedas, epics, Puranas, and philosophy with clear structure rather than scattered links.",
    features: ["4 Vedas", "18 Puranas", "108 Upanishads", "2 Itihasas"],
    href: "/contents",
  },
  {
    icon: Bot,
    title: "Vedic AI Scholar",
    body: "Deep theological discourse with Gemma 4. Ask questions about Vedas, Upanishads, and philosophy.",
    features: [
      "Gemma 4 powered",
      "Streaming responses",
      "Scriptural references",
      "Context-aware answers",
    ],
    href: "/ai-guide",
  },
  {
    icon: ScanSearch,
    title: "Vision Analysis",
    body: "Upload images of sacred texts, iconography, or temples for AI-powered interpretation.",
    features: [
      "Image recognition",
      "Iconography analysis",
      "Temple architecture",
      "Yantra interpretation",
    ],
    href: "/vision",
  },
  {
    icon: Languages,
    title: "Smart Dharma Guide",
    body: "Personalized spiritual guidance for daily rituals, meditation, fasting, and festivals.",
    features: [
      "Category selection",
      "Streaming guidance",
      "Vratas & Samskaras",
      "Festival knowledge",
    ],
    href: "/dharma",
  },
];

const sampleQuestions = [
  "What does Bhagavad Gita 2.47 teach about action?",
  "Explain dharma without technical jargon.",
  "How do the Upanishads describe the self?",
  "Give me a meditation idea from Yoga texts.",
];

const featuredVerses = [
  {
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
    transliteration: "Karmanye vadhikaraste ma phaleshu kadachana",
    translation:
      "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.",
    source: "Bhagavad Gita 2.47",
  },
  {
    sanskrit: "तमसो मा ज्योतिर्गमय",
    transliteration: "Tamaso ma jyotir gamaya",
    translation: "Lead me from darkness to light, from ignorance to knowledge.",
    source: "Brihadaranyaka Upanishad 1.3.28",
  },
  {
    sanskrit: "अहं ब्रह्मास्मि",
    transliteration: "Aham Brahmasmi",
    translation: "I am Brahman - the ultimate reality.",
    source: "Brihadaranyaka Upanishad 1.4.10",
  },
];

const stats = [
  { value: "4", label: "Vedas" },
  { value: String(CANONICAL_COUNTS.upanishads), label: "Upanishads" },
  { value: "18", label: "Mahapuranas" },
  { value: "2", label: "Itihasas" },
];

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="hero-sun right-[-10rem] top-[-6rem] size-[26rem]" aria-hidden="true" />
          <div
            className="hero-sun bottom-[-8rem] left-[-8rem] size-[20rem] opacity-70"
            aria-hidden="true"
          />
          <div
            className="temple-grid absolute inset-y-0 right-0 hidden w-[42%] opacity-25 lg:block"
            aria-hidden="true"
          />

          <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-end gap-8 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.9fr)] lg:gap-14 lg:px-8">
            <div className="relative z-10 max-w-3xl">
              <span className="eyebrow">Digital Gurukul • Gemma 4 • English · हिंदी · संस्कृत</span>
              <div className="mt-8 space-y-6">
                <div className="space-y-4">
                  <p className="font-devanagari text-sm tracking-[0.32em] text-primary">
                    ज्ञान से मोक्ष तक
                  </p>
                  <p className="font-devanagari text-lg tracking-[0.18em] text-muted-foreground">
                    सत्यमेव जयते · नमस्ते · ॐ
                  </p>
                  <h1 className="font-serif text-5xl font-semibold tracking-[-0.05em] text-foreground sm:text-6xl lg:text-7xl">
                    Ancient wisdom,
                    <br />
                    rendered with
                    <span className="text-gradient"> modern clarity.</span>
                  </h1>
                  <p className="section-copy max-w-2xl">
                    Hind AI keeps scripture study calm and legible: browse sacred literature, ask
                    difficult questions, and move between Sanskrit, Hindi, and English without
                    losing atmosphere or context.
                  </p>
                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                    Hindu scripture is a vast tradition built over millennia, broadly organized into{" "}
                    <strong>Shruti</strong> (revealed scripture) and <strong>Smriti</strong>{" "}
                    (remembered tradition), with the Bhagavad Gita, Upanishads, Puranas, and epics
                    all occupying distinct but connected places.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button variant="premium" size="xl" asChild>
                    <Link href="/contents">
                      Explore the library
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="xl" asChild>
                    <Link href="/ai-guide">Ask Guru AI</Link>
                  </Button>
                </div>

                <dl className="flex flex-wrap gap-8 border-t border-border/60 pt-7">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                        {stat.label}
                      </dt>
                      <dd className="mt-2 font-serif text-3xl font-semibold text-foreground">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="bg-background/72 rounded-[24px] border border-border/60 p-4 text-sm leading-7 text-muted-foreground">
                  <strong className="text-foreground">Reading map:</strong> Shruti includes the 4
                  Vedas and the traditional 108 Upanishads. Smriti includes the 2 Itihasas, 18 Major
                  Puranas, 18 Upa-Puranas, and the wider world of Shastras and Sutras.
                </div>

                <Button variant="outline" size="lg" asChild>
                  <Link href="/study-paths">Open guided study paths</Link>
                </Button>
              </div>
            </div>

            <div className="relative z-10 pb-6 lg:pb-0">
              <div className="surface-panel p-8 md:p-10">
                <div className="relative z-10">
                  <span className="eyebrow">Opening invocation</span>
                  <div className="mt-8 space-y-4">
                    <p className="font-devanagari text-4xl leading-tight text-foreground sm:text-5xl">
                      असतो मा सद्गमय
                    </p>
                    <p className="max-w-md text-base leading-7 text-muted-foreground">
                      Lead me from the unreal to the real, from darkness to light, from death to the
                      deathless.
                    </p>
                  </div>

                  <div className="mt-10 space-y-3">
                    {sampleQuestions.map((question) => (
                      <div
                        key={question}
                        className="text-foreground/84 rounded-[24px] border border-border/60 bg-background/75 px-4 py-3 text-sm shadow-[0_20px_45px_-36px_rgba(15,23,42,0.4)]"
                      >
                        {question}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="surface-panel absolute -bottom-8 left-4 hidden w-[78%] p-5 lg:block">
                <div className="relative z-10 flex items-start gap-3">
                  <div className="bg-accent/12 flex size-11 items-center justify-center rounded-full text-accent">
                    <Languages className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Language-aware study</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Sanskrit detail, Hindi context, and readable English explanations in one
                      theme-aware surface.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="eyebrow">How the interface works • इंटरफ़ेस</span>
              <h2 className="section-title mt-6">Modern restraint, ancient atmosphere.</h2>
              <p className="section-copy mt-5">
                The interface uses stronger typography, quieter surfaces, balanced color, and
                clearer routes into reading, discovery, and AI guidance.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
              {studyModes.map((mode, index) => (
                <div
                  key={mode.title}
                  className="surface-panel group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <Link href={mode.href} className="relative z-10 space-y-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                      <mode.icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                        {mode.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{mode.body}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {mode.features.map((feature) => (
                          <span
                            key={feature}
                            className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary transition-all duration-300 hover:scale-105 hover:bg-primary/20"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <span className="eyebrow">Scripture shelves • ग्रन्थ शेल्फ</span>
                <h2 className="section-title mt-6">Browse by shelf, then open the text.</h2>
                <p className="section-copy mt-5">
                  Every shelf gives you a clear entry into the catalog and then onward into
                  AI-guided study, verse retrieval, and interpretation.
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/contents">Open full library</Link>
              </Button>
            </div>

            <div className="surface-panel mt-12">
              <div className="relative z-10">
                {featuredScriptures.map((scripture, index) => (
                  <div key={scripture.slug}>
                    <Link href={scripture.href} className="scripture-row group">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                          {scripture.category}
                        </p>
                      </div>
                      <div>
                        <p className="font-devanagari text-xl text-primary transition-transform duration-300 group-hover:scale-105">
                          {scripture.sanskrit}
                        </p>
                        <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-foreground transition-colors duration-300 group-hover:text-primary">
                          {scripture.name}
                        </h3>
                        <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                          {scripture.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-4 md:justify-end">
                        <span className="text-sm text-muted-foreground">{scripture.highlight}</span>
                        <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-2 group-hover:scale-110" />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="surface-panel overflow-hidden bg-[linear-gradient(135deg,hsl(var(--foreground)),hsl(var(--secondary-foreground)))] text-background">
              <div className="grid gap-10 px-6 py-10 md:px-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end xl:gap-12">
                <div className="relative z-10 max-w-xl space-y-5">
                  <span className="eyebrow border-white/15 bg-white/10 text-white/70">Guru AI</span>
                  <h2 className="font-serif text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                    Ask the text what it means, not just where it sits.
                  </h2>
                  <p className="text-white/72 text-base leading-7">
                    Use Gemma 4 to explain karma, compare commentarial ideas, or translate a
                    Sanskrit line into a reading voice that feels thoughtful instead of synthetic.
                  </p>
                  <Button variant="premium" asChild>
                    <Link href="/ai-guide">
                      Open Guru AI
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>

                <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                  {scriptureSections.map((section) => (
                    <div
                      key={section.id}
                      className="border-white/12 bg-white/6 rounded-[28px] border p-5 backdrop-blur-xl"
                    >
                      <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                        {section.title}
                      </p>
                      <p className="mt-3 text-lg font-semibold text-white">
                        {section.items.length} curated entries
                      </p>
                      <p className="mt-3 text-sm leading-6 text-white/65">{section.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="surface-panel p-8 md:p-10">
              <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-3xl">
                  <span className="eyebrow">Guided journeys • यात्रा</span>
                  <h2 className="section-title mt-6">
                    Turn scripture into a learning path, not just a page.
                  </h2>
                  <p className="section-copy mt-5">
                    Students need orientation. Teachers need reusable flows. Hind AI now saves
                    guided reading paths that connect structure, scripture pages, and Gemma-powered
                    study prompts in one place.
                  </p>
                </div>
                <Button variant="premium" size="lg" asChild>
                  <Link href="/study-paths">
                    Explore study paths
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="eyebrow">Sanskrit and calendar tools • विशेषताएं</span>
              <h2 className="section-title mt-6">
                Study grammar, time, and commentary in one flow.
              </h2>
              <p className="section-copy mt-5">
                Hind AI now connects Panchanga, Sanskrit analysis, script conversion, verse modes,
                and school-aware commentary without repeating the same library and chat entry
                points.
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
              <div className="surface-panel group p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative z-10 space-y-6">
                  <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-600 transition-all duration-300 group-hover:scale-110 group-hover:from-purple-500/30 group-hover:to-pink-500/30">
                    <Bot className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground transition-colors duration-300 group-hover:text-purple-600">
                      AI-Powered Learning
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      Get personalized explanations, comparative analysis, and contextual insights
                      powered by Google Gemma 4. Ask questions in natural language and receive
                      thoughtful, culturally-aware responses.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                      <div className="h-2 w-2 rounded-full bg-green-500 transition-transform duration-300 group-hover:scale-125"></div>
                      Real-time AI responses
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                      <div className="h-2 w-2 rounded-full bg-green-500 transition-transform duration-300 group-hover:scale-125"></div>
                      Multilingual support
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                      <div className="h-2 w-2 rounded-full bg-green-500 transition-transform duration-300 group-hover:scale-125"></div>
                      Contextual understanding
                    </div>
                  </div>
                </div>
              </div>

              <div className="surface-panel group p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative z-10 space-y-6">
                  <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:from-blue-500/30 group-hover:to-cyan-500/30">
                    <Languages className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground transition-colors duration-300 group-hover:text-blue-600">
                      Multilingual Experience
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      Study scriptures in their original Sanskrit, with transliteration, Hindi
                      translations, and clear English explanations. Switch between languages
                      seamlessly while maintaining context.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                      <div className="h-2 w-2 rounded-full bg-blue-500 transition-transform duration-300 group-hover:scale-125"></div>
                      Sanskrit (Devanagari)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                      <div className="h-2 w-2 rounded-full bg-blue-500 transition-transform duration-300 group-hover:scale-125"></div>
                      Hindi translations
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                      <div className="h-2 w-2 rounded-full bg-blue-500 transition-transform duration-300 group-hover:scale-125"></div>
                      English explanations
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="eyebrow">Featured Verses • श्लोक संग्रह</span>
              <h2 className="section-title mt-6">Timeless wisdom, daily inspiration.</h2>
              <p className="section-copy mt-5">
                Explore these foundational verses that have guided seekers for millennia. Each one
                carries profound meaning and practical wisdom for modern life.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {featuredVerses.map((verse, index) => (
                <div
                  key={verse.source}
                  className="surface-panel group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative z-10 space-y-4">
                    <p className="font-devanagari text-lg leading-relaxed text-primary transition-transform duration-300 group-hover:scale-105">
                      {verse.sanskrit}
                    </p>
                    <p className="text-xs italic text-muted-foreground">{verse.transliteration}</p>
                    <p className="text-sm leading-6 text-foreground/90">{verse.translation}</p>
                    <div className="border-t border-border/60 pt-3">
                      <p className="text-xs font-semibold text-primary">{verse.source}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="eyebrow">Your Learning Journey • आपकी यात्रा</span>
              <h2 className="section-title mt-6">Track your spiritual progress.</h2>
              <p className="section-copy mt-5">
                Monitor your learning journey with personalized progress tracking, achievements, and
                insights into your study habits.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
