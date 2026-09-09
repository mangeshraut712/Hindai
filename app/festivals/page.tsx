import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FestivalHome } from "@/components/utsav/festival-home";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Festivals — Hindu utsav calendar with origin, temple life, do and don’t",
  description:
    "Deep Hind AI festival encyclopedia for 2026: Makar Sankranti through Kartik Purnima with Puranic katha labelled as tradition, living custom, temple etiquette, and sources.",
  alternates: { canonical: `${SITE_URL}/festivals` },
};

export default function FestivalsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <FestivalHome />
      </main>
      <Footer />
    </div>
  );
}
