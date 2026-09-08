import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AartiReader } from "@/components/aarti/aarti-reader";
import { GaneshaMurti } from "@/components/aarti/ganesha-murti";
import {
  aartiKindLabel,
  getGaneshAarti,
  listGaneshAartiSlugs,
} from "@/lib/data/ganesh-aarti-sangrah";
import { SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listGaneshAartiSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getGaneshAarti(slug);
  if (!item) {
    return { title: "Aarti not found | Hind AI" };
  }
  return {
    title: `${item.title} | Ganesh Aarti Sangrah`,
    description: item.summary,
    alternates: {
      canonical: `${SITE_URL}/ganesh-aarti/${item.slug}`,
    },
  };
}

export default async function GaneshAartiDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getGaneshAarti(slug);
  if (!item) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <Link
              href="/ganesh-aarti"
              className="text-sm text-primary underline-offset-4 hover:underline"
            >
              All Ganesh aartis
            </Link>
            <p className="eyebrow mt-6">
              {aartiKindLabel(item.kind)} · {item.deity}
            </p>
            <h1 className="section-title mt-4">{item.title}</h1>
            <p className="mt-3 font-devanagari text-2xl text-primary">{item.titleMr}</p>
            <p className="section-copy mt-5">{item.summary}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              {item.composer} · booklet page {item.bookletPages}
            </p>
          </div>
        </section>
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <aside className="space-y-6">
            <div className="surface-panel rounded-3xl p-6">
              <GaneshaMurti className="h-56 w-full" />
            </div>
            <div className="surface-panel rounded-2xl p-5">
              <h2 className="font-serif text-xl">Iconography</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.iconography}</p>
            </div>
          </aside>
          <AartiReader item={item} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
