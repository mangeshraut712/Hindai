"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Target, Eye, Brain, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PhilosophySchool {
  id: string;
  name: string;
  sanskrit: string;
  founder: string;
  keyText: string;
  icon: React.ReactNode;
  description: string;
  principles: string[];
  apiAvailable: boolean;
  href?: string;
}

const philosophySchools: PhilosophySchool[] = [
  {
    id: "nyaya",
    name: "Nyaya",
    sanskrit: "न्याय",
    founder: "Gautama Akshapada",
    keyText: "Nyaya Sutras",
    icon: <Brain className="size-6" />,
    description:
      "The school of logic and epistemology, focusing on valid means of knowledge (pramana) and systematic reasoning.",
    principles: ["Logic", "Epistemology", "Debate", "Pramana"],
    apiAvailable: true,
    href: "/nyaya-sutras",
  },
  {
    id: "vaisheshika",
    name: "Vaisheshika",
    sanskrit: "वैशेषिक",
    founder: "Kanada Kashyapa",
    keyText: "Vaisheshika Sutras",
    icon: <Target className="size-6" />,
    description:
      "The atomic theory school, analyzing the fundamental categories of reality and the nature of substances.",
    principles: ["Atomism", "Categories", "Substances", "Ontology"],
    apiAvailable: false,
  },
  {
    id: "samkhya",
    name: "Samkhya",
    sanskrit: "सांख्य",
    founder: "Kapila",
    keyText: "Samkhya Sutras",
    icon: <Users className="size-6" />,
    description:
      "The school of enumeration, distinguishing between consciousness (Purusha) and matter (Prakriti).",
    principles: ["Dualism", "Evolution", "Purusha", "Prakriti"],
    apiAvailable: false,
  },
  {
    id: "yoga",
    name: "Yoga",
    sanskrit: "योग",
    founder: "Patanjali",
    keyText: "Yoga Sutras",
    icon: <Heart className="size-6" />,
    description:
      "The practical school of discipline, providing the eight-fold path (Ashtanga Yoga) to enlightenment.",
    principles: ["Ashtanga Yoga", "Meditation", "Discipline", "Liberation"],
    apiAvailable: true,
    href: "/yoga-sutras",
  },
  {
    id: "mimamsa",
    name: "Mimamsa",
    sanskrit: "मीमांसा",
    founder: "Jaimini",
    keyText: "Mimamsa Sutras",
    icon: <BookOpen className="size-6" />,
    description: "The school of interpretation, focusing on Vedic ritual and hermeneutics.",
    principles: ["Ritual", "Hermeneutics", "Dharma", "Exegesis"],
    apiAvailable: false,
  },
  {
    id: "vedanta",
    name: "Vedanta",
    sanskrit: "वेदान्त",
    founder: "Vyasa (Brahma Sutras)",
    keyText: "Brahma Sutras",
    icon: <Eye className="size-6" />,
    description:
      "The school of conclusion, exploring the ultimate reality (Brahman) and liberation through knowledge.",
    principles: ["Brahman", "Maya", "Jnana", "Moksha"],
    apiAvailable: true,
    href: "/brahma-sutras",
  },
];

export function PhilosophyExplorer() {
  const [selectedSchool, setSelectedSchool] = useState<PhilosophySchool | null>(null);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-8">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle>The Six Classical Darshanas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">
                The Shad Darshana (six visions) represent the major philosophical traditions of
                Hinduism, each offering a unique perspective on reality, knowledge, and liberation.
                While they differ in emphasis and methodology, they share the common goal of
                understanding ultimate truth.
              </p>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Philosophy schools">
                {philosophySchools.map((school, index) => (
                  <motion.div
                    key={school.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    whileFocus={{ scale: 1.02, outline: "2px solid var(--primary)" }}
                  >
                    <Card
                      className={`cursor-pointer transition-all hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                        selectedSchool?.id === school.id ? "ring-2 ring-primary shadow-md" : ""
                      }`}
                      onClick={() => setSelectedSchool(school)}
                      role="listitem"
                      tabIndex={0}
                      aria-label={`${school.name} (${school.sanskrit}) - ${school.description}`}
                      aria-pressed={selectedSchool?.id === school.id}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedSchool(school);
                        }
                      }}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-primary">{school.icon}</div>
                          <div>
                            <CardTitle className="text-base sm:text-lg">{school.name}</CardTitle>
                            <p className="font-devanagari text-sm sm:text-base text-primary">{school.sanskrit}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-3 text-xs sm:text-sm text-muted-foreground line-clamp-2">{school.description}</p>
                        <div className="mb-3 flex flex-wrap gap-1">
                          {school.principles.slice(0, 2).map((principle) => (
                            <span
                              key={principle}
                              className="rounded bg-primary/10 px-2 py-1 text-xs text-primary"
                            >
                              {principle}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {school.founder}
                          </span>
                          {school.apiAvailable ? (
                            <span className="rounded bg-green-100 dark:bg-green-900/30 px-2 py-1 text-xs text-green-800 dark:text-green-400">
                              Available
                            </span>
                          ) : (
                            <span className="rounded bg-orange-100 dark:bg-orange-900/30 px-2 py-1 text-xs text-orange-800 dark:text-orange-400">
                              Coming Soon
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed View */}
          {selectedSchool && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-primary">{selectedSchool.icon}</div>
                    <div>
                      <CardTitle className="text-2xl">{selectedSchool.name}</CardTitle>
                      <p className="font-devanagari text-lg text-primary">
                        {selectedSchool.sanskrit}
                      </p>
                    </div>
                  </div>
                  {selectedSchool.apiAvailable && selectedSchool.href && (
                    <Button asChild>
                      <a href={selectedSchool.href}>Explore {selectedSchool.keyText}</a>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold">Founder</h3>
                  <p className="text-muted-foreground">{selectedSchool.founder}</p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">Key Text</h3>
                  <p className="text-muted-foreground">{selectedSchool.keyText}</p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">Core Principles</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSchool.principles.map((principle) => (
                      <span
                        key={principle}
                        className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                      >
                        {principle}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">Description</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {selectedSchool.description}
                  </p>
                </div>

                {!selectedSchool.apiAvailable && (
                  <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                    <p className="text-sm text-orange-800">
                      <strong>Coming Soon:</strong> Detailed exploration of {selectedSchool.name}{" "}
                      philosophy with original texts, commentaries, and interactive study tools.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Comparative View */}
          <Card>
            <CardHeader>
              <CardTitle>Comparative Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left">School</th>
                      <th className="py-2 text-left">Founder</th>
                      <th className="py-2 text-left">Focus</th>
                      <th className="py-2 text-left">Key Text</th>
                      <th className="py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {philosophySchools.map((school) => (
                      <tr key={school.id} className="border-b border-border/50">
                        <td className="py-3 font-medium">{school.name}</td>
                        <td className="py-3 text-muted-foreground">{school.founder}</td>
                        <td className="py-3 text-muted-foreground">{school.principles[0]}</td>
                        <td className="py-3 text-muted-foreground">{school.keyText}</td>
                        <td className="py-3">
                          {school.apiAvailable ? (
                            <span className="text-green-600">✓ Available</span>
                          ) : (
                            <span className="text-orange-600">⏳ Coming Soon</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
