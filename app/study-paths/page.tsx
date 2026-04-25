import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StudyPathBoard } from "@/components/study-paths/study-path-board";

export const metadata: Metadata = {
  title: "Study Paths",
  description:
    "Saved guided study paths for students and teachers across scripture, structure, and Gemma 4 learning flows.",
};

export default function StudyPathsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="eyebrow">Guided Study Paths • मार्गिका</span>
              <h1 className="section-title mt-6">
                Saved reading journeys for students and teachers.
              </h1>
              <p className="section-copy mt-5">
                This is where Hind AI starts to behave like a real learning product: structured
                paths, persistent progress, and direct handoff into scripture pages and Gemma 4
                guidance.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="surface-panel p-8 md:p-10">
              <div className="relative z-10 max-w-3xl">
                <span className="eyebrow">Learning Infrastructure</span>
                <h2 className="section-title mt-6">
                  Structured paths for consistent learning.
                </h2>
                <p className="section-copy mt-5">
                  Study paths connect scripture structure, AI guidance, and progress tracking into
                  reusable learning flows that work for both individual study and classroom teaching.
                </p>
              </div>
            </div>
            <div className="mt-12">
              <StudyPathBoard />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
