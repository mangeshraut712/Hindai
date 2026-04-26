// Spaced Repetition Algorithm (SM-2) for Sanskrit Learning

import { LearningProgress } from "./types";

export class SpacedRepetitionSystem {
  /**
   * Calculate next review date using SM-2 algorithm
   * Based on SuperMemo SM-2 algorithm
   */
  static calculateNextReview(
    currentProgress: LearningProgress,
    quality: number // 0-5 rating: 0=complete failure, 5=perfect response
  ): LearningProgress {
    let { interval, easeFactor, repetitions } = currentProgress;

    // Update ease factor
    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;

    // Update repetitions and interval
    if (quality < 3) {
      // Failed - reset
      repetitions = 0;
      interval = 1;
    } else {
      // Success - increase
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions++;
    }

    // Calculate next review date
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    return {
      ...currentProgress,
      lastReviewed: new Date(),
      nextReview,
      interval,
      easeFactor,
      repetitions,
      quality,
    };
  }

  /**
   * Initialize a new learning progress entry
   */
  static initializeProgress(userId: string, flashcardId: string): LearningProgress {
    const now = new Date();
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + 1); // First review in 1 day

    return {
      userId,
      flashcardId,
      lastReviewed: now,
      nextReview,
      interval: 1,
      easeFactor: 2.5, // Default ease factor
      repetitions: 0,
      quality: 0,
    };
  }

  /**
   * Get cards due for review
   */
  static getDueCards(allProgress: LearningProgress[], userId: string): string[] {
    const now = new Date();
    return allProgress
      .filter((progress) => progress.userId === userId && progress.nextReview <= now)
      .map((progress) => progress.flashcardId);
  }

  /**
   * Calculate retention rate
   */
  static calculateRetentionRate(allProgress: LearningProgress[]): number {
    if (allProgress.length === 0) return 0;

    const successfulReviews = allProgress.filter((p) => p.quality >= 3).length;
    return (successfulReviews / allProgress.length) * 100;
  }
}
