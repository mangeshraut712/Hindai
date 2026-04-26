"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CANONICAL_COUNTS } from "@/lib/data/canonical-counts";
import { scriptureSections } from "@/lib/scripture-catalog";

export default function ContentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.7fr)] lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <span className="eyebrow">Granthalaya • ग्रन्थालय</span>
              <h1 className="section-title mt-6">A cleaner catalog for timeless texts.</h1>
              <p className="section-copy mt-5">
                Every shelf is now visible, readable, and anchor-linked. Use the catalog for
                structure, then open Guru AI whenever you want commentary, translation, or a guided
                explanation.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                Hinduism does not have a fixed number of scriptures. This catalog is a practical
                reading map through the better-known shelves: Shruti foundations such as the 4 Vedas
                and the traditional {CANONICAL_COUNTS.upanishads} Upanishads, and Smriti traditions
                such as the 18 Major Puranas, 18 Upa-Puranas, and the 2 great epics.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="surface-panel p-6"
            >
              <div className="relative z-10 space-y-4">
                <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                  Jump to
                </p>
                <div className="flex flex-wrap gap-3">
                  {scriptureSections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    >
                      <Button
                        variant="outline"
                        asChild
                        className="transition-all duration-300 hover:scale-105 hover:border-primary/50"
                      >
                        <Link href={`#${section.id}`}>{section.title}</Link>
                      </Button>
                    </motion.div>
                  ))}
                </div>
                <div className="rounded-[24px] border border-border/60 bg-background/75 p-4 text-sm leading-6 text-muted-foreground">
                  Use this page as the site map for scripture reading. For interpretation and
                  question answering, jump straight into Guru AI. For the full hierarchy behind
                  these shelves, visit the Structure page.
                </div>
                <Button
                  variant="outline"
                  asChild
                  className="transition-all duration-300 hover:scale-105"
                >
                  <Link href="/structure">View scripture structure</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-16">
            {scriptureSections.map((section, sectionIndex) => (
              <motion.section
                key={section.id}
                id={section.id}
                className="scroll-mt-28"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              >
                <div className="mb-8 max-w-3xl">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                    Shelf
                  </p>
                  <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-foreground">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {section.description}
                  </p>
                </div>

                <div className="surface-panel">
                  <div className="relative z-10">
                    {section.items.map((item, index) => (
                      <motion.article
                        key={item.slug}
                        id={item.slug}
                        className="scripture-row group"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                      >
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                            {item.category}
                          </p>
                        </div>
                        <div>
                          <p className="font-devanagari text-xl text-primary transition-transform duration-300 group-hover:scale-105">
                            {item.sanskrit}
                          </p>
                          <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-foreground transition-colors duration-300 group-hover:text-primary">
                            {item.name}
                          </h3>
                          <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex flex-col gap-3 md:items-end">
                          <span className="text-sm text-muted-foreground">{item.highlight}</span>
                          <Button
                            variant="outline"
                            asChild
                            className="transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:bg-primary/5"
                          >
                            <Link href={item.href}>
                              Read text
                              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            asChild
                            className="transition-all duration-300 hover:scale-105 hover:bg-primary/10"
                          >
                            <Link href="/ai-guide">
                              Ask in Guru AI
                              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </motion.section>
            ))}
          </div>
        </section>

        <motion.section
          className="px-4 pb-20 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="surface-panel p-8 md:p-10">
              <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <span className="eyebrow">Need interpretation? • व्याख्या</span>
                  <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-foreground">
                    Move from catalog to conversation.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    When the shelf gives you the text, Guru AI gives you the entry point:
                    explanation, comparison, and a modern reading line.
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="premium" size="lg" asChild>
                    <Link href="/ai-guide">
                      Open Guru AI
                      <Sparkles className="size-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
