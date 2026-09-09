import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SacredMap } from "@/components/tirtha/sacred-map";
import { auditMapMarkers } from "@/lib/data/tirtha-map";
import { CANONICAL_COUNTS } from "@/lib/data/canonical-counts";
import { SHAKTI_PEETHAS } from "@/lib/data/shakti-peethas";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const audit = auditMapMarkers();

export const metadata: Metadata = {
  title: "Tirtha map — gods, places, and sourced pins",
  description:
    "One South Asia map for Jyotirlingas, indexed Shakti Peethas, Char Dham, and Ashtavinayak. Katha is labelled as tradition; coordinates are living temples.",
  alternates: { canonical: `${SITE_URL}/pilgrimage` },
};

export default function PilgrimagePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="hero-mesh border-b border-border/60">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <span className="eyebrow">Tirtha · तीर्थ</span>
            <h1 className="section-title mt-6">One map, four traditions, no invented pins</h1>
            <p className="section-copy mt-5 max-w-3xl">
              Filter by Shiva, Devi, Vishnu, or Ganesha. Story trails number the pins in a readable
              journey. Canonical Devi lists name {CANONICAL_COUNTS.shaktiPeethas} peethas; this
              index holds {SHAKTI_PEETHAS.length} located places and refuses to pad the rest.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <Link href="/mahadev" className="font-semibold text-primary">
                Mahadeva
              </Link>
              <Link href="/devi" className="font-semibold text-primary">
                Devi
              </Link>
              <Link href="/vishnu" className="font-semibold text-primary">
                Vishnu
              </Link>
              <Link href="/ganesha" className="font-semibold text-primary">
                Ganesha
              </Link>
            </div>
            {audit.length > 0 ? (
              <p className="mt-4 text-sm text-destructive">Map audit: {audit.join("; ")}</p>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                Real South Asia coastline (Natural Earth) with living-temple GPS — Hinglaj west to
                Kamakhya east, Kedarnath north to Rameswaram south.
              </p>
            )}
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <SacredMap tradition="all" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
