import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VishnuHome } from "@/components/vishnu/vishnu-home";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Vishnu — Char Dham",
  description:
    "Badrinath, Puri, Dwarka, and Rameswaram as four located temples, with the Uttarakhand Char Dham named as a different circuit.",
  alternates: { canonical: `${SITE_URL}/vishnu` },
};

export default function VishnuPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <VishnuHome />
      </main>
      <Footer />
    </div>
  );
}
