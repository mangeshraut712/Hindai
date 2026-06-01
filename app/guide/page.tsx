import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  CalendarDays,
  Languages,
  Library,
  Sparkles,
  TimerReset,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  gemmaCapabilityPillars,
  hindAIUseCases,
  hindAIWorkflow,
} from "@/lib/ai/gemma-capabilities";

export const metadata: Metadata = {
  title: "How Hind AI Works",
  description:
    "Learn what Hind AI is, how to use it, where it helps, and how Gemma 4 via OpenRouter powers scripture study, Sanskrit learning, daily sadhana, and cultural guidance.",
};

const routeCards = [
  {
    title: "Library",
    body: "Browse Vedas, Upanishads, Gita, Itihasas, Puranas, Sutras, Stotras, and structured scripture shelves.",
    href: "/contents",
    icon: Library,
  },
  {
    title: "Guru AI",
    body: "Ask Gemma 4 for explanations, comparisons, translations, teaching notes, and practical study prompts.",
    href: "/ai-guide",
    icon: Bot,
  },
  {
    title: "Daily Sadhana",
    body: "Use mantra counters, sankalpa goals, routine generation, and gentle daily practice support.",
    href: "/sadhana",
    icon: TimerReset,
  },
  {
    title: "SanskritNova",
    body: "Study transliteration, scripts, grammar, anvaya, roots, sandhi, samasa, and example practice.",
    href: "/sanskrit-nova",
    icon: Languages,
  },
  {
    title: "Panchanga",
    body: "Connect calendar, festivals, timing, and cultural context to everyday study and observance.",
    href: "/panchanga",
    icon: CalendarDays,
  },
  {
    title: "Study Paths",
    body: "Turn broad topics into guided sequences for self-study, classes, and long-term learning.",
    href: "/study-paths",
    icon: BookOpen,
  },
];

export default function GuidePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60 px-4 py-16 sm:px-6 lg:px-8">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="hero-sun right-[-8rem] top-[-8rem] size-[28rem]" aria-hidden="true" />
          <div className="hero-sun bottom-[-10rem] left-[-9rem] size-[22rem]" aria-hidden="true" />
          <div className="temple-grid absolute inset-0 opacity-20" aria-hidden="true" />

          <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.8fr)] lg:items-center">
            <div className="max-w-3xl">
              <span className="eyebrow">Hind AI guide • मार्गदर्शन</span>
              <p className="mt-8 font-devanagari text-sm tracking-[0.28em] text-primary">
                ज्ञानम् अभ्यासः सेवा
              </p>
              <h1 className="mt-4 font-serif text-5xl font-semibold tracking-[-0.05em] text-foreground sm:text-6xl lg:text-7xl">
                What Hind AI is,
                <br />
                and how to use it
                <span className="text-gradient"> every day.</span>
              </h1>
              <p className="section-copy mt-6">
                Hind AI is a digital gurukul for scripture study, Sanskrit learning, cultural
                context, and daily sadhana. Gemma 4 via OpenRouter helps explain, compare,
                translate, summarize, and guide practice while the app keeps the source catalog,
                tools, and learning routes organized.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button variant="premium" size="xl" asChild>
                  <Link href="/ai-guide">
                    Ask Guru AI
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link href="/contents">Open library</Link>
                </Button>
              </div>
            </div>

            <div className="surface-panel p-6 md:p-8">
              <div className="relative z-10">
                <span className="eyebrow">Single AI runtime</span>
                <h2 className="mt-6 font-serif text-4xl font-semibold text-foreground">
                  Gemma 4 through OpenRouter.
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  The product experience is centered on one model contract: Hind AI&apos;s Gemma 4
                  runtime. That keeps chat, translation, Sanskrit help, dharma guidance, sadhana,
                  quiz generation, verse support, and vision analysis consistent.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Streaming answers",
                    "Indian-language help",
                    "Scripture-aware prompts",
                    "Daily-use guidance",
                  ].map((item) => (
                    <div
                      key={item}
                      className="text-foreground/82 rounded-[20px] border border-border/60 bg-background/70 px-4 py-3 text-sm font-semibold"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="eyebrow">Start here</span>
              <h2 className="section-title mt-6">Use the right route for the task.</h2>
              <p className="section-copy mt-5">
                Hind AI is not one chat box. It is a set of focused study rooms, each connected to
                scripture, Sanskrit, daily practice, and Gemma 4 assistance.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {routeCards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="surface-panel group p-6 transition-all hover:-translate-y-1"
                >
                  <div className="relative z-10">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <card.icon className="size-5" />
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold text-foreground group-hover:text-primary">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.body}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="eyebrow">Gemma 4 capabilities</span>
              <h2 className="section-title mt-6">What the model helps with.</h2>
              <p className="section-copy mt-5">
                These capabilities are applied through the app&apos;s pages instead of being hidden
                as generic AI prompts.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {gemmaCapabilityPillars.map((pillar) => (
                <div key={pillar.title} className="surface-panel p-5">
                  <div className="relative z-10">
                    <Sparkles className="size-5 text-primary" />
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{pillar.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="surface-panel p-8 md:p-10">
              <div className="relative z-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <span className="eyebrow">Daily use</span>
                  <h2 className="section-title mt-6">Where Hind AI fits.</h2>
                  <p className="section-copy mt-5">
                    Use it for reading, language study, teaching preparation, personal routine
                    design, cultural exploration, and careful interpretation of visual material.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {hindAIUseCases.map((useCase) => (
                    <div
                      key={useCase.title}
                      className="rounded-[22px] border border-border/60 bg-background/70 p-4"
                    >
                      <h3 className="text-base font-semibold text-foreground">{useCase.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{useCase.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="eyebrow">How to ask well</span>
              <h2 className="section-title mt-6">A simple workflow for better answers.</h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-4">
              {hindAIWorkflow.map((step, index) => (
                <div key={step} className="surface-panel p-5">
                  <div className="relative z-10">
                    <p className="font-serif text-3xl font-semibold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
