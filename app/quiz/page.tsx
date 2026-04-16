import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuizSystem } from "@/components/quiz/quiz-system";

export const metadata: Metadata = {
  title: "Scripture Quiz",
  description:
    "Test your knowledge of ancient Indian scriptures with interactive quizzes on the Bhagavad Gita, Yoga Sutras, and more.",
};

export default function QuizPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-2xl">
            <h1 className="mb-4 text-center text-3xl font-bold">Test Your Knowledge</h1>
            <p className="mb-8 text-center text-muted-foreground">
              Challenge yourself with questions from the Bhagavad Gita, Yoga Sutras, and other sacred
              texts. Learn as you play!
            </p>

            <QuizSystem />

            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>Topics covered:</p>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <span className="rounded-full bg-primary/10 px-2 py-1">Bhagavad Gita</span>
                <span className="rounded-full bg-primary/10 px-2 py-1">Yoga Sutras</span>
                <span className="rounded-full bg-primary/10 px-2 py-1">Upanishads</span>
                <span className="rounded-full bg-primary/10 px-2 py-1">Indian Philosophy</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
