import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JyotirlingaArticle } from "@/components/mahadev/jyotirlinga-article";
import { getJyotirlingaBySlug, listJyotirlingaSlugs } from "@/lib/data/jyotirlingas";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listJyotirlingaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const shrine = getJyotirlingaBySlug(slug);
  if (!shrine) {
    return { title: "Jyotirlinga" };
  }
  return {
    title: `${shrine.name} Jyotirlinga — ${shrine.state}`,
    description: `${shrine.location}. ${shrine.significance}`,
    alternates: { canonical: `${SITE_URL}/mahadev/${shrine.slug}` },
  };
}

export default async function JyotirlingaPage({ params }: PageProps) {
  const { slug } = await params;
  const shrine = getJyotirlingaBySlug(slug);
  if (!shrine) {
    notFound();
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <JyotirlingaArticle shrine={shrine} />
      </main>
      <Footer />
    </div>
  );
}
