import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HarivijayBookClient } from "@/components/harivijay/harivijay-book-client";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Harivijay pothi",
  description:
    "Sequential folio reader for Harivijay katha-sar, with listen-through and bilingual leaves.",
  alternates: { canonical: `${SITE_URL}/harivijay/book` },
};

function BookFallback() {
  return <p className="p-8 text-center text-sm text-muted-foreground">Opening pothi…</p>;
}

export default function HarivijayBookPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<BookFallback />}>
          <HarivijayBookClient fallbackPage={1} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
