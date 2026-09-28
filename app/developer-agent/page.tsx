"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const DeveloperAgentStudio = dynamic(
  () => import("@/components/ai/developer-agent-studio").then((mod) => mod.DeveloperAgentStudio),
  {
    ssr: false,
    loading: () => <div className="surface-panel min-h-[420px] animate-pulse rounded-2xl p-6" />,
  }
);

const points = [
  {
    title: "Competition path",
    body: "Kaggle scores submission.zip (ADK agent.yaml on gemma-4-31b-it-qat-w4a16-ct), not this page.",
  },
  {
    title: "Same tools",
    body: "The studio runs the harness tool names against an in-memory bug so the loop is inspectable offline.",
  },
  {
    title: "Hind AI stays Hind AI",
    body: "Scripture, tirtha, and study routes are unchanged. This is the coding-agent surface for the Gemma 4 contest.",
  },
];

export default function DeveloperAgentPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <span className="eyebrow">Developer agent • Gemma 4</span>
              <h1 className="section-title mt-6">Navigate a repo, draft a patch, submit a diff.</h1>
              <p className="section-copy mt-5">
                Hind AI&apos;s Kaggle entry is an autonomous SWE agent: localize, edit, check, then
                <code className="mx-1 text-sm">submit_patch</code>. The live site uses a mock or
                optional Gemma 4 API. Official scoring uses the hosted QAT 31B checkpoint.
              </p>
            </motion.div>
          </div>
        </section>
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-10">
            <DeveloperAgentStudio />
            <div className="grid gap-5 lg:grid-cols-3">
              {points.map((point) => (
                <div key={point.title} className="surface-panel p-6">
                  <Wrench className="size-5 text-primary" />
                  <h2 className="mt-4 text-xl font-semibold">{point.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{point.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
