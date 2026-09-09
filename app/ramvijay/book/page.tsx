import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RamvijayBookClient } from "@/components/ramvijay/ramvijay-book-client";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Ramvijay pothi",
  description: "Sequential folio reader for Ramvijay katha-sar leaves.",
  alternates: { canonical: `${SITE_URL}/ramvijay/book` },
};

function BookFallback() {
  return <p className="p-8 text-center text-sm text-muted-foreground">Opening pothi…</p>;
}

export default function RamvijayBookPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<BookFallback />}>
          <RamvijayBookClient fallbackPage={1} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
