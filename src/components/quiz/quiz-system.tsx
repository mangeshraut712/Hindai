"use client";

import { useState } from "react";
import { CheckCircle, XCircle, ArrowRight, Trophy, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  scripture: string;
  difficulty: "easy" | "medium" | "hard";
}

const sampleQuizQuestions: Question[] = [
  {
    id: "1",
    question: "What is the main teaching of Bhagavad Gita Chapter 2, Verse 47?",
    options: [
      "Meditation is the only path to salvation",
      "One should perform duty without attachment to results",
      "Renounce all actions completely",
      "Knowledge is superior to action",
    ],
    correctAnswer: 1,
    explanation:
      "This verse teaches Karma Yoga - the path of selfless action. Krishna tells Arjuna: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.'",
    scripture: "Bhagavad Gita 2.47",
    difficulty: "easy",
  },
  {
    id: "2",
    question: "According to Patanjali's Yoga Sutras, what is Yoga?",
    options: [
      "Physical exercise and stretching",
      "Cessation of the fluctuations of the mind",
      "Union with God through devotion",
      "Control of breath and senses",
    ],
    correctAnswer: 1,
    explanation:
      "Yoga Sutra 1.2 defines Yoga as 'Yogas chitta vritti nirodha' - Yoga is the cessation of the fluctuations/modifications of the mind.",
    scripture: "Yoga Sutras 1.2",
    difficulty: "medium",
  },
  {
    id: "3",
    question: "What are the three qualities (Gunas) described in the Bhagavad Gita?",
    options: [
      "Sattva, Rajas, and Tamas",
      "Good, Bad, and Neutral",
      "Body, Mind, and Soul",
      "Brahma, Vishnu, and Shiva",
    ],
    correctAnswer: 0,
    explanation:
      "The three Gunas are Sattva (purity/harmony), Rajas (activity/passion), and Tamas (inertia/darkness). These qualities bind the soul to the material world.",
    scripture: "Bhagavad Gita Chapter 14",
    difficulty: "medium",
  },
  {
    id: "4",
    question: "What does 'Ahimsa' mean in Indian philosophy?",
    options: [
      "Vegetarianism",
      "Non-violence in thought, word, and action",
      "Meditation practice",
      "Charity and donation",
    ],
    correctAnswer: 1,
    explanation:
      "Ahimsa means non-violence or non-harming in thought, word, and action. It's the first of the Yamas in Patanjali's Yoga Sutras and a fundamental principle in Hinduism, Buddhism, and Jainism.",
    scripture: "Yoga Sutras 2.35",
    difficulty: "easy",
  },
  {
    id: "5",
    question: "What is the ultimate goal of life according to the Upanishads?",
    options: [
      "Wealth and prosperity",
      "Moksha (liberation from the cycle of rebirth)",
      "Fame and recognition",
      "Pleasure and enjoyment",
    ],
    correctAnswer: 1,
    explanation:
      "The Upanishads teach that the ultimate goal of human life is Moksha - liberation from the cycle of birth and death (samsara) and realization of one's true nature as Atman (soul) which is one with Brahman (universal consciousness).",
    scripture: "Mundaka Upanishad 3.2.9",
    difficulty: "hard",
  },
];

export function QuizSystem() {
  const [quizQuestions, setQuizQuestions] = useState<Question[]>(sampleQuizQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAIQuiz = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: "Bhagavad Gita, Yoga Sutras, Upanishads, Ramayana, or Mahabharata",
        }),
      });
      const data = await response.json();
      if (data.question) {
        const newQuestion: Question = {
          id: Date.now().toString(),
          question: data.question.question,
          options: data.question.options,
          correctAnswer: data.question.correctAnswer,
          explanation: data.question.explanation,
          scripture: data.question.scripture,
          difficulty: data.question.difficulty,
        };

        setQuizQuestions([newQuestion]);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setScore(0);
        setCompleted(false);
        setAnswers([]);
      } else {
        throw new Error(data.error || "Quiz generation failed");
      }
    } catch (error) {
      // Quiz generation error tracked
    } finally {
      setIsGenerating(false);
    }
  };

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setShowExplanation(true);
    setAnswers([...answers, selectedAnswer]);

    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
    setAnswers([]);
  };

  if (completed) {
    const percentage = (score / quizQuestions.length) * 100;
    let message = "";
    let sanskritMessage = "";

    if (percentage >= 80) {
      message = "Excellent! You have deep knowledge of Indian scriptures.";
      sanskritMessage = "सर्वज्ञः";
    } else if (percentage >= 60) {
      message = "Good progress. Keep learning and exploring these ancient wisdom texts.";
      sanskritMessage = "अभ्यासः";
    } else {
      message = "Every question is a step toward understanding. Continue your study.";
      sanskritMessage = "श्रद्धा";
    }

    return (
      <div className="surface-panel mx-auto w-full max-w-2xl p-8 md:p-10">
        <div className="relative z-10 text-center">
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-primary/10">
            <Trophy className="size-8 text-primary" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
            Pariksha Complete
          </p>
          <p className="mt-2 font-devanagari text-3xl text-primary">{sanskritMessage}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">
            Quiz Completed
          </h2>

          <div className="mt-6 text-5xl font-semibold tracking-[-0.04em] text-foreground">
            {score} <span className="text-muted-foreground">/ {quizQuestions.length}</span>
          </div>
          <div className="mt-5">
            <Progress value={percentage} className="h-2 w-full" />
          </div>
          <p className="mt-5 text-base text-muted-foreground">{message}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            You scored {Math.round(percentage)}% — {score} correct out of {quizQuestions.length}{" "}
            questions
          </p>
          <Button onClick={handleRestart} variant="premium" className="mt-7 gap-2">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-5 flex justify-center">
        <Button
          onClick={generateAIQuiz}
          disabled={isGenerating}
          variant="outline"
          className="gap-2"
        >
          <Sparkles className="size-4" />
          {isGenerating ? "Generating with Gemma 4..." : "Generate AI Quiz Question"}
        </Button>
      </div>
      <div className="surface-panel mx-auto w-full max-w-2xl overflow-hidden">
        <div className="relative z-10">
          {/* Header */}
          <div className="border-b border-border/60 px-6 py-5 md:px-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider",
                  question.difficulty === "easy" &&
                    "border border-emerald-200/60 bg-emerald-50/60 text-emerald-800 dark:border-emerald-800/40 dark:bg-emerald-950/30 dark:text-emerald-300",
                  question.difficulty === "medium" &&
                    "border border-amber-200/60 bg-amber-50/60 text-amber-800 dark:border-amber-800/40 dark:bg-amber-950/30 dark:text-amber-300",
                  question.difficulty === "hard" &&
                    "border border-red-200/60 bg-red-50/60 text-red-800 dark:border-red-800/40 dark:bg-red-950/30 dark:text-red-300"
                )}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    question.difficulty === "easy"
                      ? "bg-emerald-500"
                      : question.difficulty === "medium"
                        ? "bg-amber-400"
                        : "bg-red-500"
                  }`}
                />
                {question.difficulty}
              </span>
            </div>
            <Progress value={progress} className="h-1.5 w-full" />
            <h3 className="mt-4 text-xl font-semibold leading-relaxed text-foreground">
              {question.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2 px-6 py-5 md:px-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm transition-all",
                  selectedAnswer === index && !showExplanation
                    ? "border-primary/50 bg-primary/5 text-foreground"
                    : "border-border/60 bg-background/40 text-foreground/80 hover:border-primary/30 hover:bg-secondary/30",
                  showExplanation &&
                    index === question.correctAnswer &&
                    "border-emerald-300/60 bg-emerald-50/40 dark:border-emerald-800/40 dark:bg-emerald-950/20",
                  showExplanation &&
                    selectedAnswer === index &&
                    index !== question.correctAnswer &&
                    "border-red-300/60 bg-red-50/40 dark:border-red-800/40 dark:bg-red-950/20",
                  showExplanation && "cursor-default"
                )}
                onClick={() => handleSelect(index)}
                disabled={showExplanation}
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                    selectedAnswer === index && !showExplanation
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                    showExplanation &&
                      index === question.correctAnswer &&
                      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
                    showExplanation &&
                      selectedAnswer === index &&
                      index !== question.correctAnswer &&
                      "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                  )}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {showExplanation && index === question.correctAnswer && (
                  <CheckCircle className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                )}
                {showExplanation &&
                  selectedAnswer === index &&
                  index !== question.correctAnswer && (
                    <XCircle className="size-5 shrink-0 text-red-600 dark:text-red-400" />
                  )}
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mx-6 mb-5 space-y-3 rounded-2xl border border-border/60 bg-background/60 p-5 md:mx-8">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <BookOpen className="size-4 text-primary" />
                {question.scripture}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {question.explanation}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="border-t border-border/60 px-6 py-5 md:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {!showExplanation ? (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  variant="premium"
                  className="w-full sm:w-auto"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNext} variant="premium" className="w-full gap-2 sm:w-auto">
                  {currentQuestion < quizQuestions.length - 1 ? (
                    <>
                      Next Question <ArrowRight className="size-4" />
                    </>
                  ) : (
                    "See Results"
                  )}
                </Button>
              )}

              <span className="text-center text-xs text-muted-foreground sm:text-right">
                Score: {score} / {currentQuestion + (showExplanation ? 1 : 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
