import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DeviHome } from "@/components/devi/devi-home";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Devi — Shakti Peethas and honest yatras",
  description:
    "Sourced Devi geography: common and disputed Shakti Peethas with coordinates, plus major yatras such as Vaishno Devi that this catalog will not fake as Puranic peethas.",
  alternates: { canonical: `${SITE_URL}/devi` },
};

export default function DeviPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <DeviHome />
      </main>
      <Footer />
    </div>
  );
}
