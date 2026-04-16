"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { AppleHelloEffectHindi } from "@/components/apple-hello-effect-hindi";

export function SiteBootSplash() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hasShownThisLoad, setHasShownThisLoad] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || pathname !== "/") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (hasShownThisLoad) {
      return;
    }

    setVisible(true);
    setHasShownThisLoad(true);
    const fallbackTimer = window.setTimeout(() => {
      setVisible(false);
    }, 6200);

    return () => window.clearTimeout(fallbackTimer);
  }, [hasShownThisLoad, mounted, pathname]);

  if (!mounted) {
    return null;
  }

  const handleAnimationComplete = () => {
    window.setTimeout(() => setVisible(false), 380);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="boot-splash"
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-background"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          <div className="boot-splash-backdrop" aria-hidden="true" />
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6 px-6 text-center text-foreground"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <AppleHelloEffectHindi
              className="h-auto w-[min(72vw,28rem)] md:w-[min(56vw,34rem)]"
              durationScale={0.8}
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
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
