import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PilgrimageExplorer } from "@/components/pilgrimage/pilgrimage-explorer";

export const metadata: Metadata = {
  title: "Sacred Pilgrimage Sites",
  description:
    "Explore the sacred Tirtha Kshetras of Hindu tradition: 12 Jyotirlingas of Shiva, 51 Shakti Peethas of Devi, Char Dham, and other holy pilgrimage sites with stories, locations, and rituals.",
};

export default function PilgrimagePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="eyebrow">Tirtha Kshetra • तीर्थ क्षेत्र</span>
              <h1 className="section-title mt-6">Sacred Pilgrimage Sites</h1>
              <p className="section-copy mt-5">
                Journey through the holy lands of Bharat. Explore the 12 Jyotirlingas where Shiva
                appeared as infinite light, the 51 Shakti Peethas where Devi's grace manifested, and
                the Char Dham that liberate the soul. Discover the stories, locations, and rituals
                of these sacred tirthas.
              </p>
            </div>
          </div>
        </section>

        <PilgrimageExplorer />
      </main>

      <Footer />
    </div>
  );
}
