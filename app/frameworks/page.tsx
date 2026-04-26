import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FrameworkExplorer } from "@/components/frameworks/framework-explorer";

export const metadata: Metadata = {
  title: "Hindu Frameworks",
  description:
    "Core Hindu frameworks including Purushartha (4 aims of life), Pancha Kosha (5 layers of self), Ashtanga Yoga (8 limbs), and other foundational concepts.",
};

export default function FrameworksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="eyebrow">Core Frameworks • मूल संरचनाएँ</span>
              <h1 className="section-title mt-6">Foundational Hindu Concepts</h1>
              <p className="section-copy mt-5">
                Explore the fundamental frameworks that structure Hindu philosophy and practice.
                From the four aims of life (Purushartha) to the eight limbs of yoga (Ashtanga),
                these concepts provide the architecture for understanding human purpose, spiritual
                growth, and the nature of reality.
              </p>
            </div>
          </div>
        </section>

        <FrameworkExplorer />
      </main>

      <Footer />
    </div>
  );
}