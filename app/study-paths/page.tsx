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
          <div
            className="grain-mask absolute inset-0 opacity-45"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="eyebrow">Guided Study Paths</span>
              <h1 className="section-title mt-6">
                Saved reading journeys for students and teachers.
              </h1>
              <p className="section-copy mt-5">
                This is where Hind AI starts to behave like a real learning
                product: structured paths, persistent progress, and direct
                handoff into scripture pages and Gemma 4 guidance.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <StudyPathBoard />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
