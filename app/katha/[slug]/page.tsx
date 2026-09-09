import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { KathaReader } from "@/components/katha/katha-reader";
import { getKathaBySlug, kathaSlugs } from "@/lib/data/katha-grantha";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return kathaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const grantha = getKathaBySlug(slug);
  if (!grantha) {
    return { title: "Katha" };
  }
  return {
    title: `${grantha.title} — ${grantha.tagline}`,
    description: grantha.note,
    alternates: { canonical: `${SITE_URL}/katha/${grantha.slug}` },
  };
}

export default async function KathaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const grantha = getKathaBySlug(slug);
  if (!grantha) {
    notFound();
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <KathaReader grantha={grantha} />
      </main>
      <Footer />
    </div>
  );
}
