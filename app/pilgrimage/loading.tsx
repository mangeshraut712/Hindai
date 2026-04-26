"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b border-border/60 bg-background/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <motion.div
              className="size-11 rounded-full bg-gradient-to-br from-primary/20 to-primary/10"
              animate={{
                background: [
                  "linear-gradient(to bottom right, rgba(var(--primary-rgb), 0.2), rgba(var(--primary-rgb), 0.1))",
                  "linear-gradient(to bottom right, rgba(var(--primary-rgb), 0.3), rgba(var(--primary-rgb), 0.15))",
                  "linear-gradient(to bottom right, rgba(var(--primary-rgb), 0.2), rgba(var(--primary-rgb), 0.1))",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="h-6 w-24 rounded-full bg-gradient-to-r from-primary/20 to-primary/10"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="h-8 w-16 rounded-full bg-gradient-to-r from-primary/20 to-primary/10"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1">
        <section className="border-b border-border/60">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <motion.div
              className="h-8 w-48 rounded-full bg-gradient-to-r from-primary/20 to-primary/10"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="mt-6 h-12 w-96 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
            />
            <motion.div
              className="mt-5 h-6 w-full max-w-2xl rounded-full bg-gradient-to-r from-primary/20 to-primary/10"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
            />
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex gap-4">
              {[1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-12 w-48 rounded-full bg-gradient-to-r from-primary/20 to-primary/10"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                />
              ))}
            </div>
            <motion.div
              className="h-32 rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 to-primary/5"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  className="h-48 rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 to-primary/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: [0.3, 0.6, 0.3], y: 0 }}
                  transition={{
                    opacity: { duration: 2, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" },
                    y: { duration: 0.5, delay: i * 0.05 },
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <motion.div
            className="h-32 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
