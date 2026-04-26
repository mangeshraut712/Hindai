import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SanskritLearningHub } from "@/components/learning/sanskrit-learning-hub";

export const metadata: Metadata = {
  title: "Sanskrit Learning Hub",
  description:
    "Comprehensive Sanskrit learning with Devanagari script, grammar curriculum, spaced repetition, vocabulary building, and scripture-based examples.",
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
              <span className="eyebrow">Learning Hub • अधिगम केंद्र</span>
              <h1 className="section-title mt-6">Master Sanskrit Language & Literature</h1>
              <p className="section-copy mt-5">
                Embark on a comprehensive journey to learn Sanskrit through structured courses,
                interactive exercises, and authentic scripture study. From basic Devanagari script
                to advanced grammar and literature appreciation, build a solid foundation in the
                language of ancient wisdom.
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
