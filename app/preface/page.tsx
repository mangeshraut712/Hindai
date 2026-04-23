import Link from "next/link";
import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Heart, Lightbulb, ArrowRight, ScrollText, Bot } from "lucide-react";

export const metadata: Metadata = {
  title: "Preface",
  description:
    "Welcome to Hind AI — your AI-powered companion for exploring Vedas, Upanishads, Puranas, and ancient Indian scriptures.",
  openGraph: {
    title: "Preface | Hind AI",
    description:
      "🕉️ Understand the mission, architecture, and spiritual intent behind Hind AI — a digital Gurukul for the modern seeker.",
  },
};

const features = [
  {
    icon: BookOpen,
    title: "Sacred Texts",
    body: "Access the Vedas, Epics, Puranas, and philosophical treatises with accurate translations and transliterations.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    body: "Get contextual explanations and discover connections between different texts through intelligent analysis.",
  },
  {
    icon: Heart,
    title: "Spiritual Guidance",
    body: "Find practical wisdom for daily life from the timeless teachings of the sages and enlightened beings.",
  },
  {
    icon: Lightbulb,
    title: "Knowledge Structure",
    body: "Understand Shruti, Smriti, Vedas, Upanishads, Puranas, and Itihasa as an interconnected knowledge map.",
  },
];

const steps = [
  {
    icon: ScrollText,
    step: "1",
    title: "Explore the Library",
    body: "Browse through our collection of scriptures. Each text includes a brief introduction to help you understand its significance and context.",
    href: "/contents/",
  },
  {
    icon: Lightbulb,
    step: "2",
    title: "Understand the Structure",
    body: "Learn how the tradition branches into Shruti, Smriti, Vedangas, epics, Puranas, and the philosophical texts that sit behind them.",
    href: "/structure/",
  },
  {
    icon: Bot,
    step: "3",
    title: "Use AI Features",
    body: "Ask questions about verses, request explanations of complex concepts, or explore thematic connections across different texts.",
    href: "/ai-guide/",
  },
  {
    icon: BookOpen,
    step: "4",
    title: "Deep Dive",
    body: "Start with texts that resonate with you — the Bhagavad Gita's practical wisdom, the Upanishads' philosophical depth, or the Ramayana's timeless story.",
    href: "/study-paths/",
  },
];

export default function PrefacePage() {
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
            <div className="max-w-3xl">
              <span className="eyebrow">Prastavana</span>
              <h1 className="section-title mt-6">Welcome to Hind AI.</h1>
              <p className="section-copy mt-5">
                Your companion in exploring the timeless wisdom of ancient India. More than a
                digital library — a bridge between ancient revelation and the modern seeker.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                Our mission is to preserve, present, and make accessible the vast ocean of spiritual
                and philosophical literature that has guided humanity for thousands of years.
              </p>
            </div>
          </div>
        </section>

        {/* ── Scripture organization ── */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="surface-panel p-8 md:p-10">
              <div className="relative z-10">
                <span className="eyebrow">Understanding the tradition</span>
                <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-foreground">
                  How Hindu scripture is organized
                </h2>
                <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">
                  Hinduism does not have a fixed number of scriptures. Its literature grew across
                  thousands of years and is broadly classified into two streams:
                  <strong> Shruti</strong>, the revealed foundation, and <strong>Smriti</strong>,
                  the remembered and transmitted tradition.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      title: "Shruti",
                      body: "The 4 Vedas, including their Samhitas, Brahmanas, Aranyakas, and Upanishads.",
                    },
                    {
                      title: "Smriti",
                      body: "The 18 Mahapuranas, 18 Upa-Puranas, the 2 Itihasas, and the wider worlds of Shastras and Sutras.",
                    },
                    {
                      title: "Bhagavad Gita",
                      body: "Part of the Mahabharata, but widely revered as an independent spiritual guide.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[24px] border border-border/60 bg-background/75 p-5"
                    >
                      <p className="text-lg font-semibold text-foreground">{item.title}</p>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="eyebrow">What you&apos;ll find here</span>
              <h2 className="section-title mt-6">Four pillars of the experience.</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="surface-panel p-7">
                  <div className="relative z-10 space-y-5">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <feature.icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground">{feature.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{feature.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How to begin ── */}
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="eyebrow">Your journey</span>
              <h2 className="section-title mt-6">How to begin.</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {steps.map((step) => (
                <Link key={step.step} href={step.href} className="group">
                  <div className="surface-panel p-7 transition-shadow hover:shadow-[0_42px_100px_-52px_rgba(15,23,42,0.5)]">
                    <div className="relative z-10 flex items-start gap-5">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <step.icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                          Step {step.step}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold text-foreground group-hover:text-primary">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.body}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Note on interpretation ── */}
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="surface-panel p-8 md:p-10">
              <div className="relative z-10 max-w-3xl">
                <span className="eyebrow">A note on interpretation</span>
                <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-foreground">
                  Multiple perspectives, not definitive answers.
                </h2>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  These ancient texts have been interpreted in countless ways over millennia. Hind
                  AI presents multiple perspectives and encourages you to contemplate the teachings
                  and find what resonates with your own understanding. The goal is not to provide
                  definitive answers, but to facilitate your own exploration of these profound
                  wisdom traditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Closing ── */}
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="surface-panel overflow-hidden bg-[linear-gradient(135deg,hsl(var(--foreground)),hsl(28_18%_18%))] text-background">
              <div className="grid gap-8 px-6 py-10 md:px-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div className="relative z-10 max-w-3xl space-y-5">
                  <span className="eyebrow border-white/15 bg-white/10 text-white/70">
                    ॐ शान्तिः शान्तिः शान्तिः
                  </span>
                  <h2 className="font-serif text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                    May your journey through these sacred texts bring wisdom, peace, and
                    enlightenment.
                  </h2>
                  <p className="text-white/72 text-base leading-7">
                    Om Shanti Shanti Shanti — Peace in body, mind, and spirit.
                  </p>
                </div>
                <Button variant="premium" size="lg" asChild>
                  <Link href="/contents/">
                    Begin exploring
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
