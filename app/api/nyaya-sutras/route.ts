import { NextRequest, NextResponse } from "next/server";
import { FEATURE_COVERAGE, STARTER_DATASET_NOTICE } from "@/lib/data/feature-coverage";
import {
  CHAPTER_TITLES,
  NYAYA_SUTRAS,
  getSutraById,
  getSutrasByChapter,
  searchSutras,
} from "@/lib/data/nyaya-sutras";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const chapter = searchParams.get("chapter");
    const query = searchParams.get("q");

    if (id) {
      const sutra = getSutraById(id);
      if (!sutra) {
        return NextResponse.json({ error: "Sutra not found" }, { status: 404 });
      }
      return NextResponse.json({ sutra });
    }

    if (chapter) {
      const chapterNum = parseInt(chapter);
      if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > 5) {
        return NextResponse.json({ error: "Invalid chapter number" }, { status: 400 });
      }
      const sutras = getSutrasByChapter(chapterNum);
      return NextResponse.json({
        chapter: chapterNum,
        title: CHAPTER_TITLES[chapterNum as keyof typeof CHAPTER_TITLES],
        sutras,
        total: sutras.length,
      });
    }

    if (query) {
      const sutras = searchSutras(query);
      return NextResponse.json({ sutras, total: sutras.length });
    }

    return NextResponse.json({
      sutras: NYAYA_SUTRAS,
      total: NYAYA_SUTRAS.length,
      chapters: CHAPTER_TITLES,
      coverage: FEATURE_COVERAGE.nyayaSutras,
      notice: STARTER_DATASET_NOTICE,
    });
  } catch (error) {
    console.error("Nyaya Sutras API error:", error);
    return NextResponse.json({ error: "Failed to fetch sutras" }, { status: 500 });
  }
}
