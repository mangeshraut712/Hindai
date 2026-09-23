import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Clock3, Languages, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getVersesByScripture, scriptures } from "@/lib/data/scriptures";
import { getScriptureCatalogItem, scriptureCatalog } from "@/lib/scripture-catalog";

function ScriptureStudyExplorerFallback() {
  return <div className="surface-panel min-h-[400px] animate-pulse rounded-2xl" />;
}

const ScriptureStudyExplorer = dynamic(
  async () => {
    const mod = await import("@/components/scripture/scripture-study-explorer");
    return mod.ScriptureStudyExplorer;
  },
  { loading: ScriptureStudyExplorerFallback }
);

const VerseReaderWrapper = dynamic(
  async () => {
    const mod = await import("@/components/scripture/verse-reader-wrapper");
    return mod.VerseReaderWrapper;
  },
  { loading: () => <div className="surface-panel min-h-[400px] animate-pulse rounded-2xl" /> }
);

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return scriptureCatalog.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const item = getScriptureCatalogItem(slug);
  if (!item) {
    return {
      title: "Scripture Not Found | Hind AI",
    };
  }
  const storedVerses = getVersesByScripture(slug).length;
  return {
    title: `${item.name} (${item.sanskrit}) | Hind AI`,
    description: storedVerses
      ? `Read ${storedVerses} locally stored verses from ${item.name}; available translation layers vary by verse.`
      : `${item.name} catalog overview. Its full original text is not stored in Hind AI yet.`,
  };
}

const guidedPrompts = (title: string) => [
  `Give me a beginner-friendly introduction to ${title}.`,
  `What are the most important ideas to understand before reading ${title}?`,
  `How should a modern learner approach ${title} without losing context?`,
];

export default async function ScripturePage({ params }: PageProps) {
  const { slug } = await params;
  const item = getScriptureCatalogItem(slug);

  if (!item) {
    notFound();
  }

  const detailed = scriptures.find((scripture) => scripture.id === slug);
  const verses = getVersesByScripture(slug);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main id="main-content" className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:px-8">
            <div className="max-w-4xl">
              <Link
                href="/contents"
                className="eyebrow transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <ArrowLeft className="size-4" />
                Back to library
              </Link>

              <div className="mt-8 space-y-4">
                <p className="font-devanagari text-sm tracking-[0.3em] text-primary">
                  {item.sanskrit}
                </p>
                <h1 className="font-serif text-5xl font-semibold tracking-[-0.05em] text-foreground sm:text-6xl">
                  {item.name}
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="eyebrow">{item.category}</span>
                {item.language ? (
                  <span className="eyebrow">
                    <Languages className="size-4" />
                    {item.language}
                  </span>
                ) : null}
                {item.approximateDate ? (
                  <span className="eyebrow">
                    <Clock3 className="size-4" />
                    {item.approximateDate}
                  </span>
                ) : null}
                {detailed?.totalChapters ? (
                  <span className="eyebrow">
                    <BookOpen className="size-4" />
                    {detailed.totalChapters} chapters
                  </span>
                ) : null}
                <span className="eyebrow">{verses.length} original verses stored offline</span>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                Devanagari is the script. The source language here is {item.language ?? "Sanskrit"};
                Marathi and Hindi meanings are separate translations and appear only where they are
                actually stored. A catalog entry is not a complete book.
              </p>

              {item.keyConcepts?.length ? (
                <div className="mt-8">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                    Key concepts
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.keyConcepts.map((concept) => (
                      <span
                        key={concept}
                        className="text-foreground/84 rounded-full border border-border/60 bg-background/75 px-3 py-1 text-sm"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="surface-panel p-6">
              <div className="relative z-10">
                <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                  Guided entry
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-foreground">
                  Start with orientation, then ask Gemma 4.
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {item.readingLens ||
                    "Use this page for direct reading context, then move into Guru AI for comparison, explanation, and guided interpretation."}
                </p>
                <div className="mt-6 space-y-3">
                  {guidedPrompts(item.name).map((prompt) => (
                    <div
                      key={prompt}
                      className="text-foreground/84 rounded-[22px] border border-border/60 bg-background/75 px-4 py-3 text-sm leading-6"
                    >
                      {prompt}
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button variant="premium" asChild>
                    <Link href="/ai-guide">
                      Open Guru AI
                      <Sparkles className="size-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/structure">View scripture structure</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {verses.length > 0 ? (
              <div className="space-y-10">
                <div className="max-w-3xl">
                  <span className="eyebrow">Verse study • श्लोक अध्ययन</span>
                  <h2 className="section-title mt-6">Read the locally stored verses</h2>
                  <p className="section-copy mt-5">
                    This page has {verses.length} original-language verses stored in the offline
                    export. The complete work may contain more; translation layers vary by verse.
                  </p>
                </div>

                <ScriptureStudyExplorer
                  verses={verses}
                  scriptureSlug={slug}
                  scriptureHighlight={item.highlight}
                />

                <VerseReaderWrapper verses={verses} />
              </div>
            ) : (
              <div className="space-y-10">
                <div className="surface-panel p-8 md:p-10">
                  <div className="relative z-10 max-w-3xl">
                    <span className="eyebrow">Catalog entry • ग्रंथसूची</span>
                    <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-foreground">
                      The complete text is not stored here yet.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      This page introduces {item.name} but does not contain its verses for offline
                      reading. Hind AI will mark it as a complete book only after a checked edition
                      and its full text are stored locally.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Button variant="outline" asChild>
                        <Link href="/contents">Browse the offline reading room</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
