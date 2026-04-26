"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Type,
  Brain,
  FileText,
  Target,
  Award,
  Clock,
  Star,
  CheckCircle,
  Play,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LearningModule {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  lessons: number;
  progress?: number;
  features: string[];
  color: string;
}

const learningModules: LearningModule[] = [
  {
    id: "devanagari-script",
    name: "Devanagari Script",
    description:
      "Master the Devanagari alphabet, conjunct consonants, and script reading proficiency.",
    icon: <Type className="size-6" />,
    difficulty: "Beginner",
    duration: "2-3 weeks",
    lessons: 15,
    progress: 0,
    features: ["Alphabet recognition", "Writing practice", "Conjunct consonants", "Script reading"],
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: "basic-grammar",
    name: "Basic Sanskrit Grammar",
    description: "Learn fundamental grammar including nouns, verbs, cases, and sentence structure.",
    icon: <BookOpen className="size-6" />,
    difficulty: "Beginner",
    duration: "4-6 weeks",
    lessons: 25,
    progress: 0,
    features: ["Noun declensions", "Verb conjugations", "Case system", "Basic syntax"],
    color: "bg-green-50 border-green-200",
  },
  {
    id: "vocabulary-builder",
    name: "Vocabulary Builder",
    description:
      "Build comprehensive vocabulary with scripture-based examples and contextual learning.",
    icon: <Brain className="size-6" />,
    difficulty: "Intermediate",
    duration: "Ongoing",
    lessons: 50,
    progress: 0,
    features: [
      "Spaced repetition",
      "Contextual examples",
      "Thematic categories",
      "Pronunciation guide",
    ],
    color: "bg-purple-50 border-purple-200",
  },
  {
    id: "shloka-memorization",
    name: "Shloka Memorization",
    description:
      "Learn to memorize and recite Sanskrit verses using proven memorization techniques.",
    icon: <Target className="size-6" />,
    difficulty: "Intermediate",
    duration: "Ongoing",
    lessons: 30,
    progress: 0,
    features: ["Spaced repetition", "Audio recitation", "Meaning breakdown", "Progress tracking"],
    color: "bg-orange-50 border-orange-200",
  },
  {
    id: "literature-appreciation",
    name: "Literature Appreciation",
    description: "Explore Sanskrit literary forms including poetry, prose, and dramatic works.",
    icon: <FileText className="size-6" />,
    difficulty: "Advanced",
    duration: "8-12 weeks",
    lessons: 20,
    progress: 0,
    features: ["Poetic forms", "Rhetorical devices", "Literary analysis", "Author studies"],
    color: "bg-red-50 border-red-200",
  },
  {
    id: "advanced-grammar",
    name: "Advanced Grammar",
    description: "Deep dive into complex grammatical concepts and traditional Sanskrit analysis.",
    icon: <Award className="size-6" />,
    difficulty: "Advanced",
    duration: "12-16 weeks",
    lessons: 30,
    progress: 0,
    features: ["Compound words", "Sandhi rules", "Prosody", "Traditional commentaries"],
    color: "bg-indigo-50 border-indigo-200",
  },
];

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
}

const achievements: Achievement[] = [
  {
    id: "first-lesson",
    name: "First Steps",
    description: "Complete your first Sanskrit lesson",
    icon: <Play className="size-5" />,
    unlocked: false,
  },
  {
    id: "script-master",
    name: "Script Master",
    description: "Complete Devanagari Script module",
    icon: <Type className="size-5" />,
    unlocked: false,
  },
  {
    id: "vocabulary-500",
    name: "Word Collector",
    description: "Learn 500 Sanskrit words",
    icon: <Brain className="size-5" />,
    unlocked: false,
  },
  {
    id: "shloka-reciter",
    name: "Shloka Reciter",
    description: "Memorize and recite 10 shlokas",
    icon: <Target className="size-5" />,
    unlocked: false,
  },
];

export function SanskritLearningHub() {
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [userProgress] = useState({
    totalLessons: 45,
    completedLessons: 12,
    currentStreak: 7,
    longestStreak: 14,
  });

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-8">
          {/* Learning Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="size-5" />
                Your Learning Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary">{userProgress.totalLessons}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Total Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                    {userProgress.completedLessons}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {userProgress.currentStreak}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {Math.round((userProgress.completedLessons / userProgress.totalLessons) * 100)}%
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Progress</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="mb-2 flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>
                    {userProgress.completedLessons}/{userProgress.totalLessons} lessons
                  </span>
                </div>
                <Progress
                  value={(userProgress.completedLessons / userProgress.totalLessons) * 100}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Learning Modules */}
          <div>
            <h2 className="mb-6 text-xl sm:text-2xl font-bold">Learning Modules</h2>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Learning modules">
              {learningModules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  whileFocus={{ scale: 1.02, outline: "2px solid var(--primary)" }}
                >
                  <Card
                    className={`cursor-pointer border-2 transition-all hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      selectedModule?.id === module.id ? "border-primary ring-2 ring-primary shadow-md" : ""
                    } ${module.color}`}
                    onClick={() => setSelectedModule(module)}
                    role="listitem"
                    tabIndex={0}
                    aria-label={`${module.name} - ${module.description}`}
                    aria-pressed={selectedModule?.id === module.id}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedModule(module);
                      }
                    }}
                  >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="text-primary">{module.icon}</div>
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${
                          module.difficulty === "Beginner"
                            ? "bg-green-100 text-green-800"
                            : module.difficulty === "Intermediate"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {module.difficulty}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">{module.description}</p>

                    <div className="mb-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{module.progress || 0}%</span>
                      </div>
                      <Progress value={module.progress || 0} className="h-1" />
                    </div>

                    <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="size-4" />
                        {module.duration}
                      </span>
                      <span>{module.lessons} lessons</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {module.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="rounded bg-background/60 px-2 py-1 text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Detailed Module View */}
          {selectedModule && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-primary">{selectedModule.icon}</div>
                    <div>
                      <CardTitle className="text-xl">{selectedModule.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{selectedModule.description}</p>
                    </div>
                  </div>
                  <Button>
                    Start Learning
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg bg-background/50 p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{selectedModule.lessons}</div>
                    <div className="text-sm text-muted-foreground">Lessons</div>
                  </div>
                  <div className="rounded-lg bg-background/50 p-4 text-center">
                    <div className="text-lg font-bold text-primary">{selectedModule.duration}</div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                  </div>
                  <div className="rounded-lg bg-background/50 p-4 text-center">
                    <div className="text-lg font-bold text-primary">
                      {selectedModule.difficulty}
                    </div>
                    <div className="text-sm text-muted-foreground">Level</div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 font-semibold">What You'll Learn</h3>
                  <div className="grid gap-2 md:grid-cols-2">
                    {selectedModule.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="size-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedModule.progress !== undefined && selectedModule.progress > 0 && (
                  <div>
                    <h3 className="mb-3 font-semibold">Your Progress</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Module Progress</span>
                        <span>{selectedModule.progress}%</span>
                      </div>
                      <Progress value={selectedModule.progress} className="h-2" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="size-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`rounded-lg border p-4 text-center ${
                      achievement.unlocked
                        ? "border-primary/20 bg-primary/5"
                        : "border-muted bg-muted/50 opacity-60"
                    }`}
                  >
                    <div className="mb-2 flex justify-center">
                      <div
                        className={`rounded-full p-2 ${
                          achievement.unlocked ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {achievement.icon}
                      </div>
                    </div>
                    <h3 className="mb-1 text-sm font-semibold">{achievement.name}</h3>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Tips for Sanskrit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold">Study Techniques</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Practice daily for consistent progress</li>
                    <li>• Focus on pronunciation from the beginning</li>
                    <li>• Learn roots (dhatu) for vocabulary building</li>
                    <li>• Use spaced repetition for memorization</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Common Challenges</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Master conjunct consonants early</li>
                    <li>• Pay attention to sandhi rules</li>
                    <li>• Practice verb conjugations systematically</li>
                    <li>• Listen to traditional recitations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
