import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SanskritNovaStudio } from "@/components/sanskrit/sanskrit-nova-studio";

export const metadata: Metadata = {
  title: "Sanskrit Studio",
  description:
    "SanskritNova learning tools merged into HindAI with Gemma 4 tutor, transliteration, and guided tracks.",
};

export default function SanskritNovaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="eyebrow">SanskritNova inside HindAI</span>
              <h1 className="section-title mt-6">Learn Sanskrit with Gemma 4.</h1>
              <p className="section-copy mt-5">
                Tutor chat, transliteration, and guided Sanskrit tracks from SanskritNova now live
                in HindAI, using HindAI&apos;s Gemma 4 integration as the single AI runtime.
              </p>
            </div>
          </div>
        </section>

        <SanskritNovaStudio />
      </main>

      <Footer />
    </div>
  );
}
