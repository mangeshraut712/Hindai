import { NextRequest, NextResponse } from "next/server";
import {
  FLASHCARDS,
  getFlashcardById,
  getFlashcardsByCategory,
  getFlashcardsByDifficulty,
  getRandomFlashcards,
  searchFlashcards,
} from "@/lib/sanskrit/learning/flashcards";
import { FEATURE_COVERAGE } from "@/lib/data/feature-coverage";
import { SpacedRepetitionSystem } from "@/lib/sanskrit/learning/spaced-repetition";
import { LearningProgress } from "@/lib/sanskrit/learning/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const category = searchParams.get("category");
    const difficulty = searchParams.get("difficulty");
    const random = searchParams.get("random");
    const query = searchParams.get("q");

    if (id) {
      const flashcard = getFlashcardById(id);
      if (!flashcard) {
        return NextResponse.json({ error: "Flashcard not found" }, { status: 404 });
      }
      return NextResponse.json({ flashcard });
    }

    if (category) {
      const flashcards = getFlashcardsByCategory(category);
      return NextResponse.json({ flashcards, total: flashcards.length });
    }

    if (difficulty) {
      const diff = difficulty as "easy" | "medium" | "hard";
      if (diff !== "easy" && diff !== "medium" && diff !== "hard") {
        return NextResponse.json(
          { error: "Invalid difficulty. Use 'easy', 'medium', or 'hard'" },
          { status: 400 }
        );
      }
      const flashcards = getFlashcardsByDifficulty(diff);
      return NextResponse.json({ flashcards, total: flashcards.length });
    }

    if (random) {
      const count = parseInt(random) || 5;
      const flashcards = getRandomFlashcards(count);
      return NextResponse.json({ flashcards, total: flashcards.length });
    }

    if (query) {
      const flashcards = searchFlashcards(query);
      return NextResponse.json({ flashcards, total: flashcards.length });
    }

    return NextResponse.json({
      flashcards: FLASHCARDS,
      total: FLASHCARDS.length,
      coverage: FEATURE_COVERAGE.learningFlashcards,
    });
  } catch (error) {
    console.error("Sanskrit Learning API error:", error);
    return NextResponse.json({ error: "Failed to fetch flashcards" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userId, flashcardId, quality, progress } = body;

    if (action === "review") {
      // Process a flashcard review with spaced repetition
      if (!userId || !flashcardId || quality === undefined) {
        return NextResponse.json(
          { error: "Missing required parameters: userId, flashcardId, quality" },
          { status: 400 }
        );
      }

      const currentProgress =
        progress || SpacedRepetitionSystem.initializeProgress(userId, flashcardId);
      const updatedProgress = SpacedRepetitionSystem.calculateNextReview(currentProgress, quality);

      return NextResponse.json({ progress: updatedProgress });
    }

    if (action === "initialize") {
      // Initialize a new flashcard for learning
      if (!userId || !flashcardId) {
        return NextResponse.json(
          { error: "Missing required parameters: userId, flashcardId" },
          { status: 400 }
        );
      }

      const newProgress = SpacedRepetitionSystem.initializeProgress(userId, flashcardId);
      return NextResponse.json({ progress: newProgress });
    }

    if (action === "due") {
      // Get cards due for review
      if (!userId || !progress) {
        return NextResponse.json(
          { error: "Missing required parameters: userId, progress" },
          { status: 400 }
        );
      }

      const dueCards = SpacedRepetitionSystem.getDueCards(progress, userId);
      return NextResponse.json({ dueCards, total: dueCards.length });
    }

    if (action === "retention") {
      // Calculate retention rate
      if (!progress) {
        return NextResponse.json(
          { error: "Missing required parameter: progress" },
          { status: 400 }
        );
      }

      const retentionRate = SpacedRepetitionSystem.calculateRetentionRate(progress);
      return NextResponse.json({ retentionRate });
    }

    return NextResponse.json(
      { error: "Invalid action. Use 'review', 'initialize', 'due', or 'retention'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Sanskrit Learning API error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
