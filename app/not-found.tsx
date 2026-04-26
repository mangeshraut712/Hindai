"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Compass, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scriptureSections } from "@/lib/scripture-catalog";

export default function NotFound() {
  const featuredRoutes = scriptureSections.slice(0, 3).flatMap((section) =>
    section.items.slice(0, 2).map((item) => ({
      label: item.name,
      href: item.href,
      sanskrit: item.sanskrit,
      category: section.title,
    }))
  );

  return (
    <div className="hero-mesh relative flex min-h-screen flex-col items-center justify-center px-4">
      <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="hero-sun -left-24 top-16 size-80 opacity-50" aria-hidden="true" />
      <div className="hero-sun -right-20 bottom-16 size-72 opacity-40" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 max-w-2xl text-center"
      >
        <span className="eyebrow mx-auto">404 — Path not found</span>

        <div className="mt-8 space-y-4">
          <p className="font-devanagari text-4xl text-primary sm:text-5xl">नासदासीन्नो सदासीत्</p>
          <p className="text-sm italic text-muted-foreground">
            &ldquo;Then even nothingness was not, nor existence.&rdquo; — Nasadiya Sukta, Rigveda
            10.129
          </p>
        </div>

        <h1 className="mt-8 font-serif text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
          This path exists not yet.
        </h1>

        <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
          The page you seek is not among the known routes. Like the unmanifest before creation,
          perhaps it will appear in time. For now, return to the library.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="premium" asChild className="gap-2">
            <Link href="/">
              <Home className="size-4" />
              Return home
            </Link>
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link href="/contents">
              <Compass className="size-4" />
              Explore library
            </Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {featuredRoutes.slice(0, 6).map((route, i) => (
            <motion.div
              key={route.href + route.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
            >
              <Link
                href={route.href}
                className="surface-panel group flex flex-col items-start gap-2 p-5 text-left transition-colors hover:bg-secondary/30"
              >
                <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  {route.category}
                </span>
                <span className="font-devanagari text-lg text-primary">{route.sanskrit}</span>
                <span className="text-sm font-semibold text-foreground">{route.label}</span>
                <BookOpen className="mt-1 size-4 text-muted-foreground transition-colors group-hover:text-primary" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
