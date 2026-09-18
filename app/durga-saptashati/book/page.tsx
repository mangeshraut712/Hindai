import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DurgaSaptashatiBookClient } from "@/components/durga-saptashati/durga-saptashati-book-client";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Durga Saptashati pothi",
  description:
    "Sequential folio reader for Durga Saptashati katha-sar, with listen-through and bilingual leaves.",
  alternates: { canonical: `${SITE_URL}/durga-saptashati/book` },
};

function BookFallback() {
  return <p className="p-8 text-center text-sm text-muted-foreground">Opening Chandi patha…</p>;
}

export default function DurgaSaptashatiBookPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<BookFallback />}>
          <DurgaSaptashatiBookClient fallbackPage={1} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
