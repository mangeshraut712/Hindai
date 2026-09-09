import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PeethaArticle } from "@/components/devi/peetha-article";
import { getShaktiPeethaBySlug, listShaktiPeethaSlugs } from "@/lib/data/shakti-peethas";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listShaktiPeethaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const shrine = getShaktiPeethaBySlug(slug);
  if (!shrine) {
    return { title: "Devi tirtha" };
  }
  return {
    title: `${shrine.name} — ${shrine.state}`,
    description: shrine.bodyPartNote,
    alternates: { canonical: `${SITE_URL}/devi/${shrine.slug}` },
  };
}

export default async function DeviPlacePage({ params }: PageProps) {
  const { slug } = await params;
  const shrine = getShaktiPeethaBySlug(slug);
  if (!shrine) {
    notFound();
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PeethaArticle shrine={shrine} />
      </main>
      <Footer />
    </div>
  );
}
