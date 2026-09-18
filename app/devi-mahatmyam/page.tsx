import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Devi Mahatmyam → Durga Saptashati",
  description: "Devi Mahatmyam on Hind AI lives as the Durga Saptashati Chandi patha.",
  alternates: { canonical: `${SITE_URL}/durga-saptashati` },
};

/** Legacy scripture-catalog URL kept for bookmarks. */
export default function DeviMahatmyamAliasPage() {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm text-muted-foreground">
        Devi Mahatmyam is published as the Durga Saptashati patha.
      </p>
      <Link href="/durga-saptashati" className="text-sm font-semibold text-primary">
        Continue to दुर्गा सप्तशती →
      </Link>
    </main>
  );
}
