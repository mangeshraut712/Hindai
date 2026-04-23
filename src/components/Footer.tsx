"use client";

import Link from "next/link";
import { Github, Sparkles } from "lucide-react";
import { headerScriptures } from "@/lib/scripture-catalog";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Library", href: "/contents/" },
      { label: "Guru AI", href: "/ai-guide/" },
      { label: "Daily", href: "/daily/" },
      { label: "Study Paths", href: "/study-paths/" },
      { label: "Quiz", href: "/quiz/" },
      { label: "Structure", href: "/structure/" },
    ],
  },
  {
    title: "Scriptures",
    links: headerScriptures.map((item) => ({
      label: item.name,
      href: item.href,
    })),
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-background/80">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--accent)/0.12),transparent_35%)]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-6">
          <div>
            <p className="font-devanagari text-sm tracking-[0.28em] text-primary">
              सत्यमेव जयते · नमस्ते · ॐ
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.04em] text-foreground">
              A calmer way to study ancient Indian thought.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">
            Hind AI brings scriptures, reflection, and AI-guided learning into one theme-aware
            reading experience shaped for modern seekers.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/mangeshraut712/Hindai"
              target="_blank"
              className="inline-flex size-11 items-center justify-center rounded-full border border-border/70 bg-background/70 text-foreground transition-colors hover:bg-secondary/80"
            >
              <Github className="size-5" />
            </Link>
            <span className="eyebrow">Gemma 4 powered</span>
          </div>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title} className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
              {group.title}
            </p>
            <div className="grid gap-3">
              {group.links.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="text-foreground/76 text-sm transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} Hind AI. Designed for reflection, reading, and inquiry.
          </p>
          <div className="flex items-center gap-2">
            <Sparkles className="size-3.5 text-primary" />
            <span>Hindi boot effect • Sanskrit-first details • Theme aware</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
