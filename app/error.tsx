"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error page caught:", error);
  }, [error]);

  return (
    <div className="hero-mesh relative flex min-h-screen flex-col items-center justify-center px-4">
      <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="hero-sun top-20 -left-20 size-72 opacity-60" aria-hidden="true" />
      <div className="hero-sun -right-20 bottom-20 size-80 opacity-50" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 max-w-xl text-center"
        id="main-content"
      >
        <span className="eyebrow mx-auto">An unexpected interruption</span>

        <div className="mt-8 space-y-6">
          <p className="font-devanagari text-primary text-4xl sm:text-5xl">अहं ब्रह्मास्मि</p>
          <p className="text-muted-foreground text-sm italic">
            &ldquo;I am Brahman&rdquo; (Brihadaranyaka Upanishad 1.4.10)
          </p>
        </div>

        <h1 className="text-foreground mt-8 font-serif text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
          Even error is part of the cycle.
        </h1>

        <p className="text-muted-foreground mt-4 max-w-md text-base leading-7">
          An unexpected issue occurred while rendering this page. Like the turning of time, some
          interruptions are temporary.
        </p>

        {error.digest && (
          <div className="border-border/60 bg-background/75 text-muted-foreground mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs">
            <Sparkles className="text-primary size-3.5" />
            Reference: {error.digest}
          </div>
        )}

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={reset} variant="premium" className="gap-2">
            <RefreshCw className="size-4" />
            Try again
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link href="/">
              <Home className="size-4" />
              Return home
            </Link>
          </Button>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="surface-panel max-w-sm p-6 text-left">
            <div className="relative z-10">
              <p className="text-muted-foreground text-[11px] tracking-[0.28em] uppercase">
                From the Gita
              </p>
              <blockquote className="text-foreground mt-3 font-serif text-lg leading-relaxed">
                &ldquo;You have a right to perform your prescribed duty, but you are not entitled to
                the fruits of action.&rdquo;
              </blockquote>
              <p className="text-muted-foreground mt-2 text-xs">- Bhagavad Gita 2.47</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
