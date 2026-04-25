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
    body: "Use Guru AI the way you would speak to a teacher: direct questions, context when needed, and clear learning goals.",
  },
  {
    title: "Translate with Gemma 4",
    body: "Move between Devanagari, transliteration, English, Hindi, Marathi, Bengali, Tamil, Telugu, Kannada, Malayalam, Gujarati, and Punjabi without leaving the study surface.",
  },
  {
    title: "Stay grounded",
    body: "Use the scripture catalog for navigation and Guru AI for explanation, comparison, translation, and guided reading.",
  },
];

type AIGuidePageProps = {
  searchParams?: Promise<{
    prompt?: string;
    mode?: "explain" | "compare" | "translate";
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
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="hero-sun -left-20 top-10 h-56 w-56 opacity-80" aria-hidden="true" />
          <div className="hero-sun right-0 top-20 h-72 w-72 opacity-60" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="max-w-3xl">
                <span className="eyebrow">Guru AI • गुरु एआई</span>
                <h1 className="section-title mt-6">
                  Ask, compare, and translate Indian scripture with local AI.
                </h1>
                <p className="section-copy mt-5">
                  Guru AI now combines grounded study prompts with an Indian-language translation
                  tool, making it easier to move from Sanskrit or Devanagari lines into readable
                  English or Indian-language explanations for many more learners.
                </p>
              </div>

              <div className="surface-panel max-w-xl p-6 lg:ml-auto">
                <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                  Built for study
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Real-time Gemma 4 answers",
                    "Compare mode for parallel reading",
                    "Translate Sanskrit and Devanagari",
                    "Cleaner light and dark surfaces",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[20px] border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground/80"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
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
              {guidePoints.map((point, index) => (
                <div key={point.title} className="surface-panel group p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="relative z-10">
                    <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                      <Sparkles className="size-5" />
                    </div>
                    <h2 className="mt-5 text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{point.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{point.body}</p>
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
