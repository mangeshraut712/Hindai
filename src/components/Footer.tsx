"use client";

import Link from "next/link";
import { Github, Sparkles } from "lucide-react";
import { headerScriptures } from "@/lib/scripture-catalog";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Library", href: "/contents" },
      { label: "Guru AI", href: "/ai-guide" },
      { label: "Sanskrit Studio", href: "/sanskrit-nova" },
      { label: "Panchanga", href: "/panchanga" },
      { label: "Daily", href: "/daily" },
      { label: "Study Paths", href: "/study-paths" },
      { label: "Quiz", href: "/quiz" },
      { label: "Structure", href: "/structure" },
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
    <footer className="bg-background/88 relative overflow-hidden border-t border-border/60">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,hsl(var(--primary)/0.1),transparent_32%),radial-gradient(circle_at_80%_0%,hsl(var(--accent)/0.1),transparent_34%)]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-6">
          <div>
            <p className="font-devanagari text-sm tracking-[0.28em] text-primary">
              सत्यमेव जयते · नमस्ते · ॐ
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.025em] text-foreground">
              A calmer way to study ancient Indian thought.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">
            Hind AI brings scriptures, SanskritNova learning tools, reflection, and AI-guided
            learning into one theme-aware reading experience shaped for modern seekers.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/mangeshraut712/Hindai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source code on GitHub"
              className="inline-flex size-11 items-center justify-center rounded-full border border-border/70 bg-background/75 text-foreground transition-colors hover:border-primary/35 hover:bg-secondary/80"
            >
              <Github className="size-5" aria-hidden="true" />
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
                  className="text-foreground/72 rounded-sm text-sm transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
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
          <div className="flex items-center gap-2" aria-label="Features">
            <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
            <span>Hindi splash • Sanskrit Studio • Theme aware</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
