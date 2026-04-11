import type { Metadata } from "next";
import { QuizSystem } from "@/components/quiz/quiz-system";

export const metadata: Metadata = {
  title: "Scripture Quiz",
  description: "Test your knowledge of ancient Indian scriptures with interactive quizzes on the Bhagavad Gita, Yoga Sutras, and more.",
};

export default function QuizPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">
          Test Your Knowledge
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Challenge yourself with questions from the Bhagavad Gita, Yoga Sutras, 
          and other sacred texts. Learn as you play!
        </p>
        
        <QuizSystem />
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Topics covered:</p>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <span className="px-2 py-1 bg-primary/10 rounded-full">Bhagavad Gita</span>
            <span className="px-2 py-1 bg-primary/10 rounded-full">Yoga Sutras</span>
            <span className="px-2 py-1 bg-primary/10 rounded-full">Upanishads</span>
            <span className="px-2 py-1 bg-primary/10 rounded-full">Indian Philosophy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
