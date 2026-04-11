"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { BookOpen, Sparkles, Search, Library, ArrowRight } from "lucide-react";
import Link from "next/link";

const scriptures = [
  { name: "Rigveda", category: "Veda", description: "The oldest sacred text" },
  { name: "Mahabharata", category: "Epic", description: "The great Indian epic" },
  { name: "Ramayana", category: "Epic", description: "The journey of Rama" },
  { name: "Bhagavad Gita", category: "Philosophy", description: "Song of the Divine" },
  { name: "Srimad Bhagavatam", category: "Purana", description: "Stories of Lord Krishna" },
  { name: "Yoga Vasishtha", category: "Philosophy", description: "Teachings of sage Vasishtha" },
];

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description: "Get intelligent explanations and interpretations of ancient texts",
  },
  {
    icon: Search,
    title: "Semantic Search",
    description: "Find exactly what you're looking for with AI-enhanced search",
  },
  {
    icon: Library,
    title: "Digital Library",
    description: "Access thousands of verses across multiple scriptures",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                Hind AI
              </h1>
              <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
                AI-Powered Digital Library of Ancient Indian Scriptures
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <Button size="lg" asChild>
                <Link href="/contents">
                  Explore Library <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/structure">Learn Structure</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-3xl font-bold tracking-tight">
              Discover Ancient Wisdom with AI
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <feature.icon className="h-10 w-10 text-primary" />
                      <CardTitle className="mt-4">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Scriptures Section */}
        <section className="bg-muted/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-3xl font-bold tracking-tight">
              Sacred Texts
            </h2>
            <p className="mt-4 text-center text-muted-foreground">
              Explore the vast collection of ancient Indian scriptures
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {scriptures.map((scripture, index) => (
                <motion.div
                  key={scripture.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={`/${scripture.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="group block"
                  >
                    <Card className="h-full transition-all hover:shadow-lg">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <BookOpen className="h-6 w-6 text-primary" />
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            {scripture.category}
                          </span>
                        </div>
                        <CardTitle className="mt-4 group-hover:text-primary">
                          {scripture.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {scripture.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
