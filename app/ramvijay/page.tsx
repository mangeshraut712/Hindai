import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RamvijayHome } from "@/components/ramvijay/ramvijay-home";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Ramvijay — श्रीरामविजय digital pothi",
  description:
    "Read Sant Shridhar Swami’s Ramvijay Rama grantha arc with original Hind AI katha-sar — sister pothi to Harivijay and Shivlilamrit.",
  alternates: { canonical: `${SITE_URL}/ramvijay` },
};

export default function RamvijayIndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <RamvijayHome />
      </main>
      <Footer />
    </div>
  );
}
