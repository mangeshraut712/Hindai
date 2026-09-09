import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MahadevHome } from "@/components/mahadev/mahadev-home";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Mahadeva — Shiva, the twelve Jyotirlingas",
  description:
    "A sourced Mahadeva page: Shaiva names, the twelve Jyotirlingas with Puranic katha labelled as tradition and geography labelled as history, plus Shridhar’s Shivlilamrit.",
  alternates: { canonical: `${SITE_URL}/mahadev` },
};

export default function MahadevPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <MahadevHome />
      </main>
      <Footer />
    </div>
  );
}
