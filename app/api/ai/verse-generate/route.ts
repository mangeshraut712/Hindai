import { NextRequest, NextResponse } from "next/server";
import { generateVerseWithGemma, getAIStatus } from "@/lib/ai/gemma";
import { getVerse } from "@/lib/data/scriptures";

export const runtime = "nodejs";

/**
 * API Route for Gemma 4 Verse Generation
 *
 * Generates complete verse data (Sanskrit, transliteration, translation, word-by-word)
 * for any scripture verse using Gemma 4 AI.
 */

export async function GET() {
  const aiStatus = await getAIStatus();
  return NextResponse.json({
    ok: true,
    endpoint: "/api/ai/verse-generate/",
    methods: ["POST", "OPTIONS"],
    model: aiStatus.model,
    usage: {
      body: {
        scriptureId: "bhagavad-gita",
        scriptureName: "Bhagavad Gita",
        chapter: 2,
        verse: 47,
        speaker: "Krishna", // optional
        context: "Karma Yoga teaching", // optional
      },
    },
  });
}

export async function OPTIONS() {
  return NextResponse.json({ ok: true, methods: ["GET", "POST", "OPTIONS"] });
}

export async function POST(request: NextRequest) {
  try {
    const { scriptureId, scriptureName, chapter, verse, speaker, context } = await request.json();

    if (!scriptureId || typeof scriptureId !== "string") {
      return NextResponse.json({ error: "scriptureId is required" }, { status: 400 });
    }

    if (!Number.isInteger(chapter) || chapter < 1) {
      return NextResponse.json(
        { error: "chapter is required as a positive integer" },
        { status: 400 }
      );
    }

    if (!Number.isInteger(verse) || verse < 1) {
      return NextResponse.json(
        { error: "verse is required as a positive integer" },
        { status: 400 }
      );
    }

    const existingVerse = getVerse(scriptureId, chapter, verse);
    const aiStatus = await getAIStatus();

    if (existingVerse) {
      return NextResponse.json({
        verse: existingVerse,
        generated: false,
        source: "local-index",
        model: aiStatus.model,
        mock: false,
      });
    }

    const userId =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    const result = await generateVerseWithGemma(
      {
        scriptureId,
        scriptureName: scriptureName || scriptureId,
        chapter,
        verse,
        speaker,
        context,
      },
      userId
    );

    return NextResponse.json({
      verse: result.verse,
      generated: true,
      source: "gemma",
      model: aiStatus.model,
      mock: result.mock || false,
      rateLimit: result.rateLimit,
    });
  } catch (error) {
    console.error("Verse Generation Error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "AI verse generation is currently unavailable. Please try again later.",
      },
      { status: 503 }
    );
  }
}
