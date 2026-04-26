import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SanskritLearningHub } from "@/components/learning/sanskrit-learning-hub";

export const metadata: Metadata = {
  title: "Sanskrit Learning Hub",
  description:
    "Advanced Sanskrit learning with Devanagari script, grammar, vocabulary, spaced repetition for shloka memorization, and structured curriculum from beginner to advanced levels.",
};

export default function LearningPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="eyebrow">Adhyayana • अध्ययन</span>
              <h1 className="section-title mt-6">Sanskrit Learning Hub</h1>
              <p className="section-copy mt-5">
                Master the divine language through structured learning paths. From Devanagari script basics to advanced
                Paninian grammar, from vocabulary building to shloka memorization with spaced repetition. Your journey to
                Sanskrit fluency starts here.
              </p>
            </div>
          </div>
        </section>

        <SanskritLearningHub />
      </main>

      <Footer />
    </div>
  );
}
