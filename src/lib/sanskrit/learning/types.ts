// Sanskrit Learning Module with Spaced Repetition Types

export interface Flashcard {
  id: string;
  category: string;
  sanskrit: string;
  transliteration: string;
  meaning: string;
  example?: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface LearningProgress {
  userId: string;
  flashcardId: string;
  lastReviewed: Date;
  nextReview: Date;
  interval: number; // days until next review
  easeFactor: number; // SM-2 algorithm ease factor
  repetitions: number;
  quality: number; // 0-5 rating from last review
}

export interface Quiz {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizResult {
  quizId: string;
  userId: string;
  answer: string;
  isCorrect: boolean;
  timestamp: Date;
}
