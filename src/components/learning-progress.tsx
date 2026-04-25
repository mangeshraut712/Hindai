"use client";

import { useState, useEffect } from "react";
import { ProgressRing } from "@/components/ui/progress-ring";
import { BookOpen, Clock, Trophy, Zap } from "lucide-react";

interface LearningStats {
  versesRead: number;
  totalVerses: number;
  studyStreak: number;
  achievements: number;
  timeSpent: number;
}

export function LearningProgress() {
  const [stats, setStats] = useState<LearningStats>({
    versesRead: 0,
    totalVerses: 10000,
    studyStreak: 0,
    achievements: 0,
    timeSpent: 0,
  });

  useEffect(() => {
    // Simulate loading user progress
    const savedStats = localStorage.getItem("hindai-learning-stats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    } else {
      // Initialize with demo data
      const demoStats: LearningStats = {
        versesRead: 234,
        totalVerses: 10000,
        studyStreak: 7,
        achievements: 5,
        timeSpent: 120,
      };
      setStats(demoStats);
      localStorage.setItem("hindai-learning-stats", JSON.stringify(demoStats));
    }
  }, []);

  const progressPercentage = (stats.versesRead / stats.totalVerses) * 100;

  return (
    <div className="surface-panel p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Your Learning Journey</h3>
          <p className="text-sm text-muted-foreground">Track your spiritual progress</p>
        </div>
        <Trophy className="size-5 text-primary" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-4">
        <div className="text-center">
          <ProgressRing progress={progressPercentage}>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {Math.round(progressPercentage)}%
              </div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </ProgressRing>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
              <BookOpen className="size-5 text-primary" />
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">
                {stats.versesRead.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Verses Read</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-orange-500/10">
              <Clock className="size-5 text-orange-500" />
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">{stats.timeSpent}h</div>
              <div className="text-xs text-muted-foreground">Time Spent</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-green-500/10">
              <Zap className="size-5 text-green-500" />
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">{stats.studyStreak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-purple-500/10">
              <Trophy className="size-5 text-purple-500" />
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">{stats.achievements}</div>
              <div className="text-xs text-muted-foreground">Achievements</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium text-foreground">Recent Activity</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              Completed Bhagavad Gita Chapter 2
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              Started Yoga Sutras study
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              7-day study streak achieved!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
