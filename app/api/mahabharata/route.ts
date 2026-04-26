import { NextRequest, NextResponse } from "next/server";
import { FEATURE_COVERAGE, STARTER_DATASET_NOTICE } from "@/lib/data/feature-coverage";
import {
  MAHABHARATA,
  PARVA_DESCRIPTIONS,
  PARVA_TITLES,
  getVerseById,
  getVersesByParva,
  searchVerses,
} from "@/lib/data/mahabharata";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const parva = searchParams.get("parva");
    const query = searchParams.get("q");

    if (id) {
      const verse = getVerseById(id);
      if (!verse) {
        return NextResponse.json({ error: "Verse not found" }, { status: 404 });
      }
      return NextResponse.json({ verse });
    }

    if (parva) {
      const parvaNum = parseInt(parva);
      if (isNaN(parvaNum) || parvaNum < 1 || parvaNum > 18) {
        return NextResponse.json({ error: "Invalid parva number" }, { status: 400 });
      }
      const verses = getVersesByParva(parvaNum);
      return NextResponse.json({
        parva: parvaNum,
        title: PARVA_TITLES[parvaNum as keyof typeof PARVA_TITLES],
        description: PARVA_DESCRIPTIONS[parvaNum as keyof typeof PARVA_DESCRIPTIONS],
        verses,
        total: verses.length,
      });
    }

    if (query) {
      const verses = searchVerses(query);
      return NextResponse.json({ verses, total: verses.length });
    }

    return NextResponse.json({
      verses: MAHABHARATA,
      total: MAHABHARATA.length,
      parvas: PARVA_TITLES,
      coverage: FEATURE_COVERAGE.mahabharata,
      notice: STARTER_DATASET_NOTICE,
    });
  } catch (error) {
    console.error("Mahabharata API error:", error);
    return NextResponse.json({ error: "Failed to fetch verses" }, { status: 500 });
  }
}
