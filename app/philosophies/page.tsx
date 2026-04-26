import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PhilosophyExplorer } from "@/components/philosophy/philosophy-explorer";

export const metadata: Metadata = {
  title: "Six Schools of Hindu Philosophy",
  description:
    "Explore the Shad Darshana: Nyaya (logic), Vaisheshika (atomism), Samkhya (enumeration), Yoga (practice), Mimamsa (interpretation), and Vedanta (conclusion) - the six classical schools of Hindu philosophy.",
};

export default function PhilosophiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="eyebrow">Shad Darshana • षड्दर्शन</span>
              <h1 className="section-title mt-6">Six Schools of Hindu Philosophy</h1>
              <p className="section-copy mt-5">
                Journey through the six classical darshanas that form the foundation of Hindu
                philosophical thought: Nyaya (logic), Vaisheshika (atomism), Samkhya (enumeration),
                Yoga (practice), Mimamsa (interpretation), and Vedanta (conclusion). Each school
                offers unique insights into reality, knowledge, and liberation.
              </p>
            </div>
          </div>
        </section>

        <PhilosophyExplorer />
      </main>

      <Footer />
    </div>
  );
}
