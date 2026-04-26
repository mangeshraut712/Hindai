import { NextRequest, NextResponse } from "next/server";
import { FEATURE_COVERAGE, STARTER_DATASET_NOTICE } from "@/lib/data/feature-coverage";
import {
  KANDA_DESCRIPTIONS,
  KANDA_TITLES,
  RAMAYANA,
  getVerseById,
  getVersesByKanda,
  searchVerses,
} from "@/lib/data/ramayana";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const kanda = searchParams.get("kanda");
    const query = searchParams.get("q");

    if (id) {
      const verse = getVerseById(id);
      if (!verse) {
        return NextResponse.json({ error: "Verse not found" }, { status: 404 });
      }
      return NextResponse.json({ verse });
    }

    if (kanda) {
      const kandaNum = parseInt(kanda);
      if (isNaN(kandaNum) || kandaNum < 1 || kandaNum > 7) {
        return NextResponse.json({ error: "Invalid kanda number" }, { status: 400 });
      }
      const verses = getVersesByKanda(kandaNum);
      return NextResponse.json({
        kanda: kandaNum,
        title: KANDA_TITLES[kandaNum as keyof typeof KANDA_TITLES],
        description: KANDA_DESCRIPTIONS[kandaNum as keyof typeof KANDA_DESCRIPTIONS],
        verses,
        total: verses.length,
      });
    }

    if (query) {
      const verses = searchVerses(query);
      return NextResponse.json({ verses, total: verses.length });
    }

    return NextResponse.json({
      verses: RAMAYANA,
      total: RAMAYANA.length,
      kandas: KANDA_TITLES,
      coverage: FEATURE_COVERAGE.ramayana,
      notice: STARTER_DATASET_NOTICE,
    });
  } catch (error) {
    console.error("Ramayana API error:", error);
    return NextResponse.json({ error: "Failed to fetch verses" }, { status: 500 });
  }
}
