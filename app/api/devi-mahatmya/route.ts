import { NextRequest, NextResponse } from "next/server";
import { FEATURE_COVERAGE, STARTER_DATASET_NOTICE } from "@/lib/data/feature-coverage";
import {
  CHAPTER_TITLES,
  DEVI_MAHATMYA,
  getVerseById,
  getVersesByChapter,
  searchVerses,
} from "@/lib/data/devi-mahatmya";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const chapter = searchParams.get("chapter");
    const query = searchParams.get("q");

    if (id) {
      const verse = getVerseById(id);
      if (!verse) {
        return NextResponse.json({ error: "Verse not found" }, { status: 404 });
      }
      return NextResponse.json({ verse });
    }

    if (chapter) {
      const chapterNum = parseInt(chapter);
      if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > 13) {
        return NextResponse.json({ error: "Invalid chapter number" }, { status: 400 });
      }
      const verses = getVersesByChapter(chapterNum);
      return NextResponse.json({
        chapter: chapterNum,
        title: CHAPTER_TITLES[chapterNum as keyof typeof CHAPTER_TITLES],
        verses,
        total: verses.length,
      });
    }

    if (query) {
      const verses = searchVerses(query);
      return NextResponse.json({ verses, total: verses.length });
    }

    return NextResponse.json({
      verses: DEVI_MAHATMYA,
      total: DEVI_MAHATMYA.length,
      chapters: CHAPTER_TITLES,
      coverage: FEATURE_COVERAGE.deviMahatmya,
      notice: STARTER_DATASET_NOTICE,
    });
  } catch (error) {
    console.error("Devi Mahatmya API error:", error);
    return NextResponse.json({ error: "Failed to fetch verses" }, { status: 500 });
  }
}
