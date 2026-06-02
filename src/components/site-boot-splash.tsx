"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { AppleHelloEffectHindi } from "@/components/apple-hello-effect-hindi";

export function SiteBootSplash() {
  const pathname = usePathname();
  // Always start with `false` so SSR and the first client render agree.
  // The real value is computed in an effect (client-only) to avoid a
  // hydration mismatch from `window.sessionStorage`.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setVisible(false);
      return;
    }
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    if (window.sessionStorage.getItem("hindai.bootSplash.seen") === "true") {
      return;
    }
    window.sessionStorage.setItem("hindai.bootSplash.seen", "true");
    setVisible(true);
  }, [pathname]);

  useEffect(() => {
    if (!visible) return;

    const fallbackTimer = window.setTimeout(() => {
      setVisible(false);
    }, 2400);

    return () => window.clearTimeout(fallbackTimer);
  }, [visible]);

  const handleAnimationComplete = () => {
    window.setTimeout(() => setVisible(false), 380);
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {visible ? (
          <m.div
            key="boot-splash"
            className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-background"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
          >
            <div className="boot-splash-backdrop" aria-hidden="true" />
            <m.div
              className="relative z-10 flex flex-col items-center gap-6 px-6 text-center text-foreground"
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <AppleHelloEffectHindi
                className="h-auto w-[min(72vw,28rem)] md:w-[min(56vw,34rem)]"
                durationScale={0.3}
                onAnimationComplete={handleAnimationComplete}
              />
              <div className="space-y-2">
                <p className="font-devanagari text-sm tracking-[0.28em] text-foreground/55">
                  डिजिटल गुरुकुल
                </p>
                <p className="text-[11px] uppercase tracking-[0.42em] text-muted-foreground">
                  Hind AI
                </p>
              </div>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}
