import { NextRequest, NextResponse } from "next/server";
import { translateSanskrit } from "@/lib/ai/gemma";

/**
 * API Route for Sanskrit Translation
 *
 * Translates Sanskrit verses to English or Hindi
 */

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/ai/translate/",
    methods: ["POST", "OPTIONS"],
    usage: {
      body: {
        sanskrit: "कर्मण्येवाधिकारस्ते",
        targetLang: "en",
      },
    },
  });
}

export async function OPTIONS() {
  return NextResponse.json({ ok: true, methods: ["GET", "POST", "OPTIONS"] });
}

export async function POST(request: NextRequest) {
  try {
    const { sanskrit, targetLang = "en" } = await request.json();

    if (!sanskrit) {
      return NextResponse.json(
        { error: "Sanskrit text is required" },
        { status: 400 },
      );
    }

    const result = await translateSanskrit(
      sanskrit,
      targetLang === "hi" ? "hi" : "en",
    );

    return NextResponse.json({
      sanskrit,
      translation: result.translation,
      targetLang,
      transliteration: result.transliteration,
    });
  } catch (error) {
    console.error("Translation Error:", error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
