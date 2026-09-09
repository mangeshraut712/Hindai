import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FestivalArticle } from "@/components/utsav/festival-article";
import { getUtsavBySlug, utsavSlugs } from "@/lib/data/utsav";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return utsavSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const festival = getUtsavBySlug(slug);
  if (!festival) {
    return { title: "Festival" };
  }
  return {
    title: `${festival.name} — ${festival.tagline}`,
    description: festival.summary,
    alternates: { canonical: `${SITE_URL}/festivals/${festival.slug}` },
  };
}

export default async function FestivalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const festival = getUtsavBySlug(slug);
  if (!festival) {
    notFound();
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <FestivalArticle festival={festival} />
      </main>
      <Footer />
    </div>
  );
}
