import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SanskritToolsStudio } from "@/components/sanskrit/sanskrit-tools-studio";

export const metadata: Metadata = {
  title: "Sanskrit Linguistic Tools",
  description:
    "Comprehensive Sanskrit linguistic tools including transliteration, sandhi analysis, vibhakti, vedic accents, anvaya, dhatu, samasa, and script conversion.",
};

export default function SanskritToolsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="eyebrow">Sanskrit Linguistic Tools • संस्कृत भाषा उपकरण</span>
              <h1 className="section-title mt-6">Master Sanskrit Grammar & Analysis</h1>
              <p className="section-copy mt-5">
                Explore 8 powerful linguistic tools for Sanskrit: transliteration, sandhi splitting,
                vibhakti analysis, Vedic accents, anvaya (prose word order), dhatu (verb roots),
                samasa (compounds), and script conversion. Built with traditional Paninian grammar
                principles and modern AI.
              </p>
            </div>
          </div>
        </section>

        <SanskritToolsStudio />
      </main>

      <Footer />
    </div>
  );
}
