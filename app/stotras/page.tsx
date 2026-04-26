import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StotraLibrary } from "@/components/stotras/stotra-library";

export const metadata: Metadata = {
  title: "Stotras & Mantras",
  description:
    "Sacred hymns and devotional chants including Vishnu Sahasranama, Lalita Sahasranama, Shiva Sahasranama, and other traditional stotras for spiritual practice.",
};

export default function StotrasPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="eyebrow">Stotras & Mantras • स्तोत्र मन्त्र</span>
              <h1 className="section-title mt-6">Sacred Hymns & Devotional Chants</h1>
              <p className="section-copy mt-5">
                Immerse yourself in the devotional poetry of Hindu tradition. Explore the thousand
                names of deities (Sahasranamas), ancient hymns, and sacred mantras that have been
                chanted by millions for centuries. Each stotra carries the essence of divine
                qualities and serves as a bridge between devotee and divinity.
              </p>
            </div>
          </div>
        </section>

        <StotraLibrary />
      </main>

      <Footer />
    </div>
  );
}
