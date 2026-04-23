import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { scriptureSections } from "@/lib/scripture-catalog";

export const metadata: Metadata = {
  title: "Library Contents",
  description: "Browse the curated shelves of ancient Indian scriptures available on Hind AI.",
};

export default function ContentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.7fr)] lg:px-8">
            <div className="max-w-3xl">
              <span className="eyebrow">Granthalaya</span>
              <h1 className="section-title mt-6">A cleaner catalog for timeless texts.</h1>
              <p className="section-copy mt-5">
                Every shelf is now visible, readable, and anchor-linked. Use the catalog for
                structure, then open Guru AI whenever you want commentary, translation, or a guided
                explanation.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                Hinduism does not have a fixed number of scriptures. This catalog is a practical
                reading map through the better-known shelves: Shruti foundations such as the 4 Vedas
                and 108+ Upanishads, and Smriti traditions such as the 18 Major Puranas, 18
                Upa-Puranas, and the 2 great epics.
              </p>
            </div>

            <div className="surface-panel p-6">
              <div className="relative z-10 space-y-4">
                <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                  Jump to
                </p>
                <div className="flex flex-wrap gap-3">
                  {scriptureSections.map((section) => (
                    <Button key={section.id} variant="outline" asChild>
                      <Link href={`#${section.id}`}>{section.title}</Link>
                    </Button>
                  ))}
                </div>
                <div className="rounded-[24px] border border-border/60 bg-background/75 p-4 text-sm leading-6 text-muted-foreground">
                  Use this page as the site map for scripture reading. For interpretation and
                  question answering, jump straight into Guru AI. For the full hierarchy behind
                  these shelves, visit the Structure page.
                </div>
                <Button variant="outline" asChild>
                  <Link href="/structure/">View scripture structure</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-16">
            {scriptureSections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
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
                    {section.items.map((item) => (
                      <article key={item.slug} id={item.slug} className="scripture-row">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                            {item.category}
                          </p>
                        </div>
                        <div>
                          <p className="font-devanagari text-xl text-primary">{item.sanskrit}</p>
                          <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-foreground">
                            {item.name}
                          </h3>
                          <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex flex-col gap-3 md:items-end">
                          <span className="text-sm text-muted-foreground">{item.highlight}</span>
                          <Button variant="outline" asChild>
                            <Link href={item.href}>
                              Read text
                              <ArrowRight className="size-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" asChild>
                            <Link href="/ai-guide/">
                              Ask in Guru AI
                              <ArrowRight className="size-4" />
                            </Link>
                          </Button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="surface-panel p-8 md:p-10">
              <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <span className="eyebrow">Need interpretation?</span>
                  <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-foreground">
                    Move from catalog to conversation.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    When the shelf gives you the text, Guru AI gives you the entry point:
                    explanation, comparison, and a modern reading line.
                  </p>
                </div>
                <Button variant="premium" size="lg" asChild>
                  <Link href="/ai-guide/">
                    Open Guru AI
                    <Sparkles className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
