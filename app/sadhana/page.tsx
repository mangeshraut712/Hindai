import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bell, BookOpen, CalendarDays, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MantraCounter } from "@/components/sadhana/mantra-counter";
import { PanchangaSuggestions } from "@/components/sadhana/panchanga-suggestions";
import { FestivalReminders } from "@/components/sadhana/festival-reminders";
import { SadhanaGenerator } from "@/components/sadhana/sadhana-generator";
import { Button } from "@/components/ui/button";
import { generateBreadcrumbStructuredData } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Daily Sadhana, Mantra Counter and Japa Tracker",
  description:
    "Use Hind AI's digital japa mala for mantra counting, sankalpa goals, daily Hindu sadhana tracking, and AI-guided spiritual study.",
  keywords: [
    "mantra counter",
    "japa counter",
    "digital japa mala",
    "daily sadhana",
    "Hindu prayer app",
    "Om Namah Shivaya counter",
    "Gayatri mantra counter",
    "Sanatan Dharma practice",
  ],
  alternates: {
    canonical: "https://hindai.dev/sadhana",
  },
  openGraph: {
    title: "Daily Sadhana, Mantra Counter and Japa Tracker | Hind AI",
    description:
      "A calm daily Hindu practice hub with mantra counting, sankalpa goals, session history, scripture links, and Gemma 4 guided study.",
    url: "https://hindai.dev/sadhana",
    siteName: "Hind AI",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/Home.png",
        width: 1200,
        height: 630,
        alt: "Hind AI daily sadhana and mantra counter",
      },
    ],
  },
};

const structuredData = [
  generateBreadcrumbStructuredData([
    { name: "Home", url: "https://hindai.dev" },
    { name: "Daily Sadhana", url: "https://hindai.dev/sadhana" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Hind AI Daily Sadhana",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    url: "https://hindai.dev/sadhana",
    description:
      "A digital japa mala and Hindu sadhana tracker for mantra counting, sankalpa goals, and daily spiritual practice.",
    inLanguage: ["en-IN", "hi-IN", "sa-IN"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  },
];

const practiceLinks = [
  {
    title: "Today’s panchanga",
    body: "Check tithi, nakshatra, and daily rhythm before choosing your sankalpa.",
    href: "/panchanga",
    icon: CalendarDays,
  },
  {
    title: "Stotras and mantras",
    body: "Browse devotional hymns and names for Shiva, Vishnu, Devi, Ganesha, and more.",
    href: "/stotras",
    icon: Sparkles,
  },
  {
    title: "Ask Guru AI",
    body: "Use Gemma 4 guidance for meanings, context, pronunciation help, and practice notes.",
    href: "/ai-guide?q=Create%20a%20simple%20daily%20sadhana%20routine",
    icon: BookOpen,
  },
];

export default function SadhanaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <section className="hero-mesh relative overflow-hidden border-b border-border/60 px-4 py-16 sm:px-6 lg:px-8">
          <div className="grain-mask absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="hero-sun right-[-10rem] top-[-7rem] size-[24rem]" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <span className="eyebrow">Daily sadhana • जप साधना • Digital mala</span>
              <h1 className="mt-7 font-serif text-5xl font-semibold tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
                A daily practice hub for mantra, reflection, and scripture.
              </h1>
              <p className="section-copy mt-6 max-w-3xl">
                Indian devotional apps win retention when they support real rituals, not only
                reading. This space brings japa counting, sankalpa goals, panchanga context, and
                Gemma 4 study prompts into one calm routine.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button variant="premium" size="xl" asChild>
                  <a href="#counter">
                    Start japa
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link href="/panchanga">Open panchanga</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Astrological Advice & Suggestions (Row 1) */}
        <section className="px-4 pt-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
            <PanchangaSuggestions />
            <FestivalReminders />
          </div>
        </section>

        {/* Japa Mala Counter (Row 2) */}
        <section id="counter" className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <MantraCounter />
          </div>
        </section>

        {/* Gemma 4 Routine Generator (Row 3) */}
        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SadhanaGenerator />
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-3xl">
              <span className="eyebrow">Practice journey • साधना मार्ग</span>
              <h2 className="section-title mt-5">Continue from counting into context.</h2>
              <p className="section-copy mt-4">
                A strong Hindu learning product should connect daily ritual, knowledge, calendar,
                and community. These next steps keep the user journey practical after the counter.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {practiceLinks.map((item) => (
                <Link key={item.href} href={item.href} className="surface-panel group p-6">
                  <div className="relative z-10">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-105">
                      <item.icon className="size-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Open
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[32px] border border-border/65 bg-card/70 p-6 shadow-[0_30px_80px_-54px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <span className="eyebrow">Retention design</span>
                <h2 className="mt-5 font-serif text-4xl font-semibold tracking-[-0.03em]">
                  Built for repeat use, not one-time browsing.
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["Habit loop", "Tap, save, return tomorrow."],
                  ["Local privacy", "History stays on this device."],
                  ["AI assist", "Use Gemma 4 for meanings and routines."],
                ].map(([title, body]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-border/70 bg-background/70 p-4"
                  >
                    <Bell className="mb-3 size-4 text-primary" />
                    <p className="font-semibold">{title}</p>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
