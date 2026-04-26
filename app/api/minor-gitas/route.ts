import { NextRequest, NextResponse } from "next/server";
import { FEATURE_COVERAGE, STARTER_DATASET_NOTICE } from "@/lib/data/feature-coverage";
import {
  ASHTAVAKRA_GITA,
  AVADHUTA_GITA,
  GITA_DESCRIPTIONS,
  GITA_TITLES,
  RIBHU_GITA,
  getVerseById,
  getVersesByGita,
  searchVerses,
} from "@/lib/data/minor-gitas";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const gita = searchParams.get("gita");
    const query = searchParams.get("q");

    if (id) {
      const verse = getVerseById(id);
      if (!verse) {
        return NextResponse.json({ error: "Verse not found" }, { status: 404 });
      }
      return NextResponse.json({ verse });
    }

    if (gita) {
      const verses = getVersesByGita(gita);
      return NextResponse.json({
        gita,
        title: GITA_TITLES[gita as keyof typeof GITA_TITLES],
        description: GITA_DESCRIPTIONS[gita as keyof typeof GITA_DESCRIPTIONS],
        verses,
        total: verses.length,
      });
    }

    if (query) {
      const verses = searchVerses(query);
      return NextResponse.json({ verses, total: verses.length });
    }

    const verses = [...ASHTAVAKRA_GITA, ...AVADHUTA_GITA, ...RIBHU_GITA];
    return NextResponse.json({
      verses,
      total: verses.length,
      gitas: GITA_TITLES,
      coverage: FEATURE_COVERAGE.minorGitas,
      notice: STARTER_DATASET_NOTICE,
    });
  } catch (error) {
    console.error("Minor Gitas API error:", error);
    return NextResponse.json({ error: "Failed to fetch verses" }, { status: 500 });
  }
}
