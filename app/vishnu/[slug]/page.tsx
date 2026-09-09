import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CharDhamArticle } from "@/components/vishnu/char-dham-article";
import { getCharDhamBySlug, listCharDhamSlugs } from "@/lib/data/char-dham";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listCharDhamSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const shrine = getCharDhamBySlug(slug);
  if (!shrine) {
    return { title: "Char Dham" };
  }
  return {
    title: `${shrine.name} — Char Dham`,
    description: shrine.circuitNote,
    alternates: { canonical: `${SITE_URL}/vishnu/${shrine.slug}` },
  };
}

export default async function VishnuPlacePage({ params }: PageProps) {
  const { slug } = await params;
  const shrine = getCharDhamBySlug(slug);
  if (!shrine) {
    notFound();
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <CharDhamArticle shrine={shrine} />
      </main>
      <Footer />
    </div>
  );
}
