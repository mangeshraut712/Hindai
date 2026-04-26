import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AudioExplorer } from "@/components/audio/audio-explorer";

export const metadata: Metadata = {
  title: "Vedic Audio Library",
  description:
    "Browse Vedic recitations with accent visualization, audio playback, and multiple reciters from traditional sources like Vedic Heritage Portal and IIT Bombay.",
};

export default function AudioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="eyebrow">Audio Library • आडियो संग्रह</span>
              <h1 className="section-title mt-6">Vedic Recitations with Accent Visualization</h1>
              <p className="section-copy mt-5">
                Experience authentic Vedic chanting with visual accent markers. Listen to
                traditional reciters from IIT Bombay's Vedic Accent Engine, Vedic Heritage Portal,
                and Archive.org collections. Perfect your pronunciation with speed controls and
                accent guides.
              </p>
            </div>
          </div>
        </section>

        <AudioExplorer />
      </main>

      <Footer />
    </div>
  );
}
