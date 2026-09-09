import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AshtavinayakArticle } from "@/components/ganesha/ashtavinayak-article";
import { getAshtavinayakBySlug, listAshtavinayakSlugs } from "@/lib/data/ashtavinayak";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listAshtavinayakSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const shrine = getAshtavinayakBySlug(slug);
  if (!shrine) {
    return { title: "Ashtavinayak" };
  }
  return {
    title: `${shrine.name} — Ashtavinayak ${shrine.circuitOrder}`,
    description: shrine.location,
    alternates: { canonical: `${SITE_URL}/ganesha/${shrine.slug}` },
  };
}

export default async function GaneshaPlacePage({ params }: PageProps) {
  const { slug } = await params;
  const shrine = getAshtavinayakBySlug(slug);
  if (!shrine) {
    notFound();
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AshtavinayakArticle shrine={shrine} />
      </main>
      <Footer />
    </div>
  );
}
