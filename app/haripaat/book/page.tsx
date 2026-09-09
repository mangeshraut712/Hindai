import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HaripaatBookClient } from "@/components/haripaat/haripaat-book-client";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Haripaat reader",
  description: "Sequential Haripaat leaves with listen-through and bilingual text.",
  alternates: { canonical: `${SITE_URL}/haripaat/book` },
};

function BookFallback() {
  return <p className="p-8 text-center text-sm text-muted-foreground">Opening Haripaat…</p>;
}

export default function HaripaatBookPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<BookFallback />}>
          <HaripaatBookClient fallbackPage={1} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
