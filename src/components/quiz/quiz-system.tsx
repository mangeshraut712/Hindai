"use client";

import { useState } from "react";
import { CheckCircle, XCircle, ArrowRight, Trophy, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt:
            "Generate a multiple choice quiz question about ancient Indian scriptures. Format exactly as: Question: [question text] Options: 1. [option1] 2. [option2] 3. [option3] 4. [option4] Correct Answer: [number 0-3] Explanation: [detailed explanation with scripture reference]",
        }),
      });
      const data = await response.json();
      if (data.response?.explanation) {
        // Parse the AI response
        const content = data.response.explanation;
        const questionMatch = content.match(/Question:\s*([\s\S]+?)(?=Options:|$)/);
        const optionsMatch = content.match(/Options:\s*([\s\S]+?)(?=Correct Answer:|$)/);
        const correctMatch = content.match(/Correct Answer:\s*(\d)/);
        const explanationMatch = content.match(/Explanation:\s*([\s\S]+)$/);

        if (questionMatch && optionsMatch && correctMatch && explanationMatch) {
          const questionText = questionMatch[1].trim();
          const optionsText = optionsMatch[1].trim();
          const options = optionsText
            .split(/\d+\.\s*/)
            .filter(Boolean)
            .map((opt: string) => opt.trim());
          const correctAnswer = parseInt(correctMatch[1]) - 1; // 0-based
          const explanation = explanationMatch[1].trim();

          const newQuestion: Question = {
            id: Date.now().toString(),
            question: questionText,
            options,
            correctAnswer,
            explanation,
            scripture: "AI Generated",
            difficulty: "medium",
          };

          setQuizQuestions([newQuestion]);
          setCurrentQuestion(0);
          setSelectedAnswer(null);
          setShowExplanation(false);
          setScore(0);
          setCompleted(false);
          setAnswers([]);
        }
      }
    } catch (error) {
      console.error("Failed to generate quiz:", error);
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
    let emoji = "";

    if (percentage >= 80) {
      message = "Excellent! You have deep knowledge of Indian scriptures!";
      emoji = "🏆";
    } else if (percentage >= 60) {
      message = "Good job! Keep learning and exploring these ancient wisdom texts.";
      emoji = "📚";
    } else {
      message = "Keep studying! These sacred texts have profound wisdom to share.";
      emoji = "🙏";
    }

    return (
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="text-4xl font-bold">
            {score} / {quizQuestions.length}
          </div>
          <Progress value={percentage} className="w-full" />
          <p className="text-lg">
            {emoji} {message}
          </p>
          <div className="text-sm text-muted-foreground">
            You scored {percentage}% - {score} correct out of {quizQuestions.length} questions
          </div>
          <Button onClick={handleRestart} className="mt-4">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="mb-4 flex justify-center">
        <Button onClick={generateAIQuiz} disabled={isGenerating} variant="outline">
          <Sparkles className="mr-2 h-4 w-4" />
          {isGenerating ? "Generating..." : "Generate AI Quiz Question"}
        </Button>
      </div>
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span
              className={cn(
                "rounded-full px-2 py-1 text-xs",
                question.difficulty === "easy" && "bg-green-100 text-green-800",
                question.difficulty === "medium" && "bg-yellow-100 text-yellow-800",
                question.difficulty === "hard" && "bg-red-100 text-red-800"
              )}
            >
              {question.difficulty}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
          <CardTitle className="mt-4 text-xl">{question.question}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className={cn(
                  "h-auto w-full justify-start px-4 py-3 text-left",
                  showExplanation &&
                    index === question.correctAnswer &&
                    "border-green-500 bg-green-100 hover:bg-green-100",
                  showExplanation &&
                    selectedAnswer === index &&
                    index !== question.correctAnswer &&
                    "border-red-500 bg-red-100 hover:bg-red-100"
                )}
                onClick={() => handleSelect(index)}
                disabled={showExplanation}
              >
                <span className="mr-3 font-medium">{String.fromCharCode(65 + index)}.</span>
                {option}
                {showExplanation && index === question.correctAnswer && (
                  <CheckCircle className="ml-auto h-5 w-5 text-green-600" />
                )}
                {showExplanation &&
                  selectedAnswer === index &&
                  index !== question.correctAnswer && (
                    <XCircle className="ml-auto h-5 w-5 text-red-600" />
                  )}
              </Button>
            ))}
          </div>

          {showExplanation && (
            <div className="space-y-2 rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <BookOpen className="h-4 w-4" />
                {question.scripture}
              </div>
              <p className="text-sm">{question.explanation}</p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            {!showExplanation ? (
              <Button onClick={handleSubmit} disabled={selectedAnswer === null} className="flex-1">
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNext} className="flex-1">
                {currentQuestion < quizQuestions.length - 1 ? (
                  <>
                    Next Question <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  "See Results"
                )}
              </Button>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Score: {score} / {currentQuestion + (showExplanation ? 1 : 0)}
          </p>
        </CardContent>
      </Card>
    </>
  );
}
