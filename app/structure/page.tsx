"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, BookText, LibraryBig, ScrollText, Sparkles, Trees } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const summaryStats = [
  { label: "Vedas", value: "4", note: "Rig, Yajur, Sama, Atharva" },
  {
    label: "Upanishads",
    value: "30",
    note: "documented philosophical texts",
  },
  { label: "Mahapuranas", value: "18", note: "major Puranas" },
  { label: "Itihasas", value: "2", note: "Ramayana and Mahabharata" },
];

const structureSections = [
  {
    title: "Shruti",
    subtitle: "Primary scripture",
    icon: Trees,
    description:
      "Shruti means “that which is heard.” It is regarded as divinely revealed and forms the primary scriptural foundation of Hindu thought.",
    points: [
      "The 4 Vedas: Rigveda, Yajurveda, Samaveda, and Atharvaveda.",
      "Each Veda contains Samhitas, Brahmanas, Aranyakas, and Upanishads.",
      "The Upanishads are the philosophical culmination of Vedic reflection and are central to Vedanta.",
    ],
  },
  {
    title: "Smriti",
    subtitle: "Remembered tradition",
    icon: ScrollText,
    description:
      "Smriti means “that which is remembered.” These texts preserve law, narrative, ethics, ritual, devotion, and philosophy through remembered and transmitted tradition.",
    points: [
      "18 Mahapuranas and 18 Upa-Puranas expand cosmology, mythology, genealogy, and devotion.",
      "The 2 major Itihasas are the Ramayana and the Mahabharata.",
      "Shastras and Sutras include Dharma Shastras, Yoga Sutras, Grihya Sutras, and many other disciplinary texts.",
    ],
  },
  {
    title: "Key Revered Texts",
    subtitle: "Cross-tradition anchors",
    icon: Sparkles,
    description:
      "Some texts hold a special place across many schools and communities because they synthesize philosophy, ethics, and practice.",
    points: [
      "The Bhagavad Gita, though part of the Mahabharata, is widely revered as a stand-alone spiritual guide.",
      "Upanishads are foundational for metaphysics, self-knowledge, and Brahman-Atman inquiry.",
      "Puranic and epic literature shape popular devotional life, sacred storytelling, and lived Hindu practice.",
    ],
  },
];

const vedaLayers = [
  {
    name: "Samhitas",
    description: "Collections of hymns and mantras used in praise, ritual, and invocation.",
  },
  {
    name: "Brahmanas",
    description:
      "Ritual expositions explaining sacrifice, ceremonial action, and liturgical meaning.",
  },
  {
    name: "Aranyakas",
    description:
      "Forest texts that begin shifting ritual attention toward contemplation and symbolism.",
  },
  {
    name: "Upanishads",
    description:
      "Philosophical teachings on self, reality, liberation, and the ultimate ground of existence.",
  },
];

export default function StructurePage() {
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
              <span className="eyebrow">Knowledge Structure • ज्ञान संरचना</span>
              <h1 className="section-title mt-6">
                Hindu scripture is a tradition, not a closed shelf.
              </h1>
              <p className="section-copy mt-5">
                Hinduism does not have a fixed number of scriptures. Its vast body of literature was
                compiled over thousands of years and is broadly organized into two major categories:{" "}
                <strong>Shruti</strong> and <strong>Smriti</strong>.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                The foundational body includes 4 Vedas, 30 documented Upanishads, 18 Major
                Puranas, and 2 major Epics. This page is the structural map for that world.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="surface-panel p-6"
            >
              <div className="relative z-10">
                <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                  At a glance
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {summaryStats.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                      className="rounded-[24px] border border-border/60 bg-background/70 p-4 transition-all duration-300 hover:scale-105 hover:border-primary/30"
                    >
                      <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="mt-2 font-serif text-3xl font-semibold text-foreground">
                        {item.value}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">{item.note}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-3">
              {structureSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="surface-panel group p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative z-10">
                    <motion.div
                      className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <section.icon className="size-5" />
                    </motion.div>
                    <p className="mt-5 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                      {section.subtitle}
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-foreground transition-colors duration-300 group-hover:text-primary">
                      {section.title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {section.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {section.points.map((point, pointIndex) => (
                        <motion.li
                          key={point}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: pointIndex * 0.05 }}
                          className="text-foreground/84 flex items-start gap-3 text-sm leading-7"
                        >
                          <BookOpen className="mt-1 size-4 shrink-0 text-primary" />
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="surface-panel p-8 md:p-10"
            >
              <div className="relative z-10">
                <div className="max-w-3xl">
                  <span className="eyebrow">Inside the Vedas • वेद भीतर</span>
                  <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-foreground">
                    Each Veda is layered, not singular.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    The Vedas are not single books in the modern sense. They are layered textual
                    traditions containing hymns, ritual exposition, meditative transition texts, and
                    philosophical teachings.
                  </p>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {vedaLayers.map((layer, index) => (
                    <motion.div
                      key={layer.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group rounded-[26px] border border-border/60 bg-background/75 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                    >
                      <motion.div
                        className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110"
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                      >
                        <LibraryBig className="size-5" />
                      </motion.div>
                      <h3 className="mt-4 text-2xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                        {layer.name}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {layer.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
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
            <div className="surface-panel overflow-hidden bg-[linear-gradient(135deg,hsl(var(--foreground)),hsl(28_18%_18%))] text-background">
              <div className="grid gap-8 px-6 py-10 md:px-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div className="relative z-10 max-w-3xl">
                  <span className="eyebrow border-white/15 bg-white/10 text-white/70">
                    Revered across traditions
                  </span>
                  <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                    The Bhagavad Gita sits inside the Mahabharata but stands on its own.
                  </h2>
                  <p className="text-white/72 mt-4 text-sm leading-7">
                    The Gita is part of the Mahabharata, yet it is widely revered as an independent
                    guide to action, devotion, knowledge, and liberation. That is why it often
                    functions as a gateway text for modern readers.
                  </p>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="premium" size="lg" asChild>
                    <Link href="/contents/#epics">
                      Explore the epics
                      <BookText className="size-4" />
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
