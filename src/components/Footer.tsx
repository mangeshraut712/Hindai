"use client";

import Link from "next/link";
import { EXPLORE_DESTINATIONS, SITE_NAV_GROUPS } from "@/lib/site-nav";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,hsl(var(--primary)/0.1),transparent_32%),radial-gradient(circle_at_80%_0%,hsl(var(--accent)/0.08),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-devanagari text-sm tracking-[0.28em] text-primary">
            सत्यमेव जयते · नमस्ते · ॐ
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-[-0.025em] text-foreground sm:text-4xl">
            Know where to go
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Library for texts, Places for tirthas, Practice for daily rites, Ask AI for questions,
            Learn for Sanskrit and paths.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {EXPLORE_DESTINATIONS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-border bg-card px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.hint}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <div className="min-w-0 space-y-4">
            <h3 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Library
            </h3>
            <div className="grid gap-3">
              <Link
                href="/contents"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Catalog
              </Link>
            </div>
          </div>
          {SITE_NAV_GROUPS.map((group) => (
            <div key={group.id} className="min-w-0 space-y-4">
              <h3 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {group.label}
              </h3>
              <div className="grid gap-3">
                {group.items.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary focus:outline-none focus-visible:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
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
