import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/ai/ai-chat";

export const metadata: Metadata = {
  title: "AI Scripture Guide",
  description:
    "Ask questions about ancient Indian scriptures and get AI-powered explanations from Gemma 4.",
};

const guidePoints = [
  {
    title: "Ask in plain language",
    body: "Start with a question the way you would ask a teacher, not the way you would query a database.",
  },
  {
    title: "Request context",
    body: "Ask for historical framing, key Sanskrit terms, and parallels across texts when the concept feels dense.",
  },
  {
    title: "Stay grounded",
    body: "Use the catalog for shelves and use Guru AI for explanation, comparison, and guided reading.",
  },
];

type AIGuidePageProps = {
  searchParams?: Promise<{
    prompt?: string;
    mode?: "explain" | "compare";
    compare?: string;
    audience?: "general" | "student" | "teacher";
  }>;
};

export default async function AIGuidePage({ searchParams }: AIGuidePageProps) {
  const resolvedSearchParams = (await searchParams) || {};
  const compareScriptureIds = resolvedSearchParams.compare
    ? resolvedSearchParams.compare
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div
            className="grain-mask absolute inset-0 opacity-45"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="eyebrow">Guru AI • Gemma 4</span>
              <h1 className="section-title mt-6">
                Ask scripture questions like a living conversation.
              </h1>
              <p className="section-copy mt-5">
                This surface is now aligned with the rest of the site: cleaner
                hierarchy, calmer color, better typography, and enough
                atmosphere to still feel rooted in the source traditions.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <AIChat
              initialPrompt={resolvedSearchParams.prompt || ""}
              initialMode={resolvedSearchParams.mode || "explain"}
              initialCompareScriptureIds={compareScriptureIds}
              initialAudience={resolvedSearchParams.audience || "general"}
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {guidePoints.map((point) => (
                <div key={point.title} className="surface-panel p-6">
                  <div className="relative z-10">
                    <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Sparkles className="size-5" />
                    </div>
                    <h2 className="mt-5 text-2xl font-semibold text-foreground">
                      {point.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {point.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
