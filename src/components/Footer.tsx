"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const footerGroups = [
  {
    title: "Learning",
    links: [
      { label: "Sanskrit Studio", href: "/sanskrit-nova" },
      { label: "Sanskrit Tools", href: "/sanskrit-tools" },
      { label: "Learning Hub", href: "/learning" },
      { label: "Study Paths", href: "/study-paths" },
    ],
  },
  {
    title: "AI",
    links: [
      { label: "Guru AI", href: "/ai-guide" },
      { label: "Vision", href: "/vision" },
      { label: "Dharma", href: "/dharma" },
    ],
  },
  {
    title: "Culture",
    links: [
      { label: "Daily Sadhana", href: "/sadhana" },
      { label: "Philosophies", href: "/philosophies" },
      { label: "Frameworks", href: "/frameworks" },
      { label: "Stotras", href: "/stotras" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Library", href: "/contents" },
      { label: "Panchanga", href: "/panchanga" },
      { label: "Pilgrimage", href: "/pilgrimage" },
      { label: "Audio", href: "/audio" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Guide", href: "/guide" },
      { label: "Daily", href: "/daily" },
      { label: "Quiz", href: "/quiz" },
      { label: "Community", href: "/community" },
      { label: "Structure", href: "/structure" },
      { label: "Preface", href: "/preface" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-background/90">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,hsl(var(--primary)/0.1),transparent_32%),radial-gradient(circle_at_80%_0%,hsl(var(--accent)/0.1),transparent_34%)]" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_repeat(5,minmax(0,1fr))] lg:px-8 xl:gap-12">
        <div className="space-y-6 sm:col-span-2 md:col-span-3 lg:col-span-1">
          <div>
            <p className="font-devanagari text-sm tracking-[0.28em] text-primary">
              सत्यमेव जयते · नमस्ते · ॐ
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.025em] text-foreground">
              A calmer way to study ancient Indian thought.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">
            Hind AI brings scriptures, SanskritNova learning tools, daily sadhana, reflection, and
            AI-guided learning into one theme-aware reading experience shaped for modern seekers.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/75 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/35 hover:bg-secondary/80"
            >
              How Hind AI works
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <span className="eyebrow">Gemma 4 powered</span>
          </div>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title} className="space-y-4">
            <h3 className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
              {group.title}
            </h3>
            <div className="grid gap-3">
              {group.links.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="rounded-sm text-sm text-muted-foreground transition-colors duration-300 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col px-4 py-5 text-xs text-muted-foreground sm:items-center sm:justify-center sm:px-6 lg:px-8">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Hind AI. Designed for
            reflection, reading, and inquiry.
          </p>
        </div>
      </div>
    </footer>
  );
}
