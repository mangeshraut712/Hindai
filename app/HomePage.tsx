"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Bot, Languages, Library, ScanSearch } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { featuredScriptures, scriptureSections } from "@/lib/scripture-catalog";

const studyModes = [
  {
    icon: Library,
    title: "Read by shelf",
    body: "Move through Vedas, epics, Puranas, and philosophy with clear structure rather than scattered links.",
  },
  {
    icon: ScanSearch,
    title: "Read by meaning",
    body: "Browse with context, transliteration, and modern summaries instead of raw verse fragments.",
  },
  {
    icon: Bot,
    title: "Ask by intent",
    body: "Use Guru AI when you need an explanation, comparison, or grounded entry point into a difficult idea.",
  },
];

const sampleQuestions = [
  "What does Bhagavad Gita 2.47 teach about action?",
  "Explain dharma without technical jargon.",
  "How do the Upanishads describe the self?",
  "Give me a meditation idea from Yoga texts.",
];

const stats = [
  { value: "4", label: "Vedas" },
  { value: "108+", label: "Upanishads" },
  { value: "18", label: "Mahapuranas" },
  { value: "2", label: "Itihasas" },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -52]);
  const panelY = useTransform(scrollYProgress, [0, 0.25], [0, 36]);

  return (
    <div ref={containerRef} className="relative flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div
            className="grain-mask absolute inset-0 opacity-45"
            aria-hidden="true"
          />
          <div
            className="hero-sun right-[-10rem] top-[-6rem] size-[26rem]"
            aria-hidden="true"
          />
          <div
            className="hero-sun bottom-[-8rem] left-[-8rem] size-[20rem] opacity-70"
            aria-hidden="true"
          />
          <div
            className="temple-grid absolute inset-y-0 right-0 hidden w-[42%] opacity-25 lg:block"
            aria-hidden="true"
          />

          <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-end gap-14 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.9fr)] lg:px-8">
            <motion.div
              style={{ y: heroY }}
              className="relative z-10 max-w-3xl"
            >
              <span className="eyebrow">
                Digital Gurukul • Gemma 4 • हिंदी · English · संस्कृत
              </span>
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
                    Hind AI turns the first screen into a calm invitation:
                    browse sacred literature, ask difficult questions, and study
                    Sanskrit ideas without losing atmosphere, typography, or
                    cultural texture.
                  </p>
                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                    Hindu scripture is not a closed shelf with a fixed count. It
                    is a vast tradition built over millennia, broadly organized
                    into <strong>Shruti</strong> (revealed scripture) and{" "}
                    <strong>Smriti</strong> (remembered tradition), with the
                    Bhagavad Gita, Upanishads, Puranas, and epics all occupying
                    distinct but connected places.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button variant="premium" size="xl" asChild>
                    <Link href="/contents/">
                      Explore the library
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="xl" asChild>
                    <Link href="/ai-guide/">Ask Guru AI</Link>
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
                  <strong className="text-foreground">Reading map:</strong>{" "}
                  Shruti includes the 4 Vedas and their Upanishadic culmination.
                  Smriti includes the 2 Itihasas, 18 Major Puranas, 18
                  Upa-Puranas, and the wider world of Shastras and Sutras.
                </div>

                <Button variant="outline" size="lg" asChild>
                  <Link href="/study-paths/">Open guided study paths</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              style={{ y: panelY }}
              className="relative z-10 pb-6 lg:pb-0"
            >
              <div className="surface-panel p-8 md:p-10">
                <div className="relative z-10">
                  <span className="eyebrow">Opening invocation</span>
                  <div className="mt-8 space-y-4">
                    <p className="font-devanagari text-4xl leading-tight text-foreground sm:text-5xl">
                      असतो मा सद्गमय
                    </p>
                    <p className="max-w-md text-base leading-7 text-muted-foreground">
                      Lead me from the unreal to the real, from darkness to
                      light, from death to the deathless.
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
                  <div className="bg-primary/12 flex size-11 items-center justify-center rounded-full text-primary">
                    <Languages className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Language-aware study
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Hindi boot presence, Sanskrit detail, and readable English
                      explanations all inside one theme-aware surface.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="eyebrow">How the interface works</span>
              <h2 className="section-title mt-6">
                Modern restraint, ancient atmosphere.
              </h2>
              <p className="section-copy mt-5">
                The interface is intentionally quieter: stronger typography,
                fewer decorative boxes, gentler backgrounds, and clearer routes
                into reading, discovery, and AI guidance.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {studyModes.map((mode) => (
                <div key={mode.title} className="surface-panel p-7">
                  <div className="relative z-10 space-y-5">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <mode.icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground">
                        {mode.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {mode.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <span className="eyebrow">Scripture shelves</span>
                <h2 className="section-title mt-6">
                  Browse by shelf, not by broken route.
                </h2>
                <p className="section-copy mt-5">
                  The library now points to real sections instead of dead
                  scripture pages. Every shelf gives you a clear entry into the
                  catalog and then onward into AI-guided study.
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/contents/">Open full library</Link>
              </Button>
            </div>

            <div className="surface-panel mt-12">
              <div className="relative z-10">
                {featuredScriptures.map((scripture) => (
                  <Link
                    key={scripture.slug}
                    href={scripture.href}
                    className="scripture-row group"
                  >
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                        {scripture.category}
                      </p>
                    </div>
                    <div>
                      <p className="font-devanagari text-xl text-primary">
                        {scripture.sanskrit}
                      </p>
                      <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-foreground">
                        {scripture.name}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                        {scripture.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4 md:justify-end">
                      <span className="text-sm text-muted-foreground">
                        {scripture.highlight}
                      </span>
                      <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="surface-panel overflow-hidden bg-[linear-gradient(135deg,hsl(var(--foreground)),hsl(28_18%_18%))] text-background">
              <div className="grid gap-10 px-6 py-10 md:px-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
                <div className="relative z-10 max-w-xl space-y-5">
                  <span className="eyebrow border-white/15 bg-white/10 text-white/70">
                    Guru AI
                  </span>
                  <h2 className="font-serif text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                    Ask the text what it means, not just where it sits.
                  </h2>
                  <p className="text-white/72 text-base leading-7">
                    Use Gemma 4 to explain karma, compare commentarial ideas, or
                    translate a Sanskrit line into a reading voice that feels
                    thoughtful instead of synthetic.
                  </p>
                  <Button variant="premium" asChild>
                    <Link href="/ai-guide/">
                      Open Guru AI
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>

                <div className="relative z-10 grid gap-4 sm:grid-cols-2">
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
                      <p className="mt-3 text-sm leading-6 text-white/65">
                        {section.description}
                      </p>
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
                  <span className="eyebrow">Guided journeys</span>
                  <h2 className="section-title mt-6">
                    Turn scripture into a learning path, not just a page.
                  </h2>
                  <p className="section-copy mt-5">
                    Students need orientation. Teachers need reusable flows.
                    Hind AI now saves guided reading paths that connect
                    structure, scripture pages, and Gemma-powered study prompts
                    in one place.
                  </p>
                </div>
                <Button variant="premium" size="lg" asChild>
                  <Link href="/study-paths/">
                    Explore study paths
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
