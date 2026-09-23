import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RecitationReader } from "@/components/recitations/recitation-reader";
import {
  getRecitation,
  listRecitationSlugs,
  recitationVerseCount,
} from "@/lib/data/recitations/catalog";
import { SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listRecitationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getRecitation(slug);
  if (!item) {
    return { title: "Recitation not found | Hind AI" };
  }
  return {
    title: `${item.title} | Recitation`,
    description: `${item.occasion}. ${item.summary}`,
    alternates: { canonical: `${SITE_URL}/recite/${item.slug}` },
  };
}

export default async function RecitationPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getRecitation(slug);
  if (!item) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <section className="border-b border-border/60">
          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
            <Link href="/recite" className="text-sm text-primary underline-offset-4 hover:underline">
              All recitations
            </Link>
            <p className="eyebrow mt-6">
              {item.deity} · {item.occasion}
            </p>
            <h1 className="section-title mt-4">{item.title}</h1>
            <p className="mt-3 font-devanagari text-2xl text-primary">{item.titleSa}</p>
            <p className="section-copy mt-5">{item.summary}</p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {recitationVerseCount(item)} verses across {item.sections.length}{" "}
              {item.sections.length === 1 ? "section" : "sections"}. {item.sourceNote}
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <RecitationReader key={item.slug} recitation={item} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
