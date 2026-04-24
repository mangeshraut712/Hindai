import { NextRequest, NextResponse } from "next/server";
import { generateVerseWithGemma, getAIStatus } from "@/lib/ai/gemma";

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

    if (!chapter || typeof chapter !== "number") {
      return NextResponse.json({ error: "chapter is required (number)" }, { status: 400 });
    }

    if (!verse || typeof verse !== "number") {
      return NextResponse.json({ error: "verse is required (number)" }, { status: 400 });
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

    const aiStatus = await getAIStatus();

    return NextResponse.json({
      verse: result.verse,
      generated: true,
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
