import { NextRequest, NextResponse } from "next/server";
import { translateSanskrit } from "@/lib/ai/gemma";
import {
  DEFAULT_TRANSLATION_LANGUAGE,
  resolveTranslationLanguage,
  TRANSLATION_LANGUAGES,
} from "@/lib/ai/translation-languages";

/**
 * API Route for Sanskrit Translation
 *
 * Translates Indic scripture text into English and major Indian languages
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
    supportedLanguages: TRANSLATION_LANGUAGES,
  });
}

export async function OPTIONS() {
  return NextResponse.json({ ok: true, methods: ["GET", "POST", "OPTIONS"] });
}

export async function POST(request: NextRequest) {
  try {
    const { sanskrit, text, targetLang = DEFAULT_TRANSLATION_LANGUAGE } = await request.json();
    const sourceText =
      typeof text === "string" && text.trim().length > 0
        ? text.trim()
        : typeof sanskrit === "string"
          ? sanskrit.trim()
          : "";
    const resolvedTargetLang = resolveTranslationLanguage(targetLang);

    if (!sourceText) {
      return NextResponse.json({ error: "Text is required for translation" }, { status: 400 });
    }

    const result = await translateSanskrit(sourceText, resolvedTargetLang);

    return NextResponse.json({
      sanskrit: sourceText,
      text: sourceText,
      translation: result.translation,
      targetLang: resolvedTargetLang,
      transliteration: result.transliteration,
    });
  } catch (error) {
    console.error("Translation Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Translation failed" },
      { status: 503 }
    );
  }
}
