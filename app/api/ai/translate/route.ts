import { NextRequest, NextResponse } from "next/server";

/**
 * API Route for Sanskrit Translation
 * 
 * Translates Sanskrit verses to English or Hindi
 */

export async function POST(request: NextRequest) {
  try {
    const { sanskrit, targetLang = "en" } = await request.json();

    if (!sanskrit) {
      return NextResponse.json(
        { error: "Sanskrit text is required" },
        { status: 400 }
      );
    }

    // Mock translation for demo
    const translations: Record<string, Record<string, string>> = {
      "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन": {
        en: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.",
        hi: "कर्म करने मात्र में तुम्हारा अधिकार है, फलों में कभी नहीं।",
      },
      "योगस्थः कुरु कर्माणि": {
        en: "Perform your duties while established in Yoga (union with the Divine).",
        hi: "योग में स्थित होकर कर्म करो।",
      },
    };

    const translation = translations[sanskrit]?.[targetLang] || 
      `[Translation to ${targetLang === "hi" ? "Hindi" : "English"}: ${sanskrit}]\n\n[Connect to Ollama for AI-powered translation with cultural context]`;

    return NextResponse.json({
      sanskrit,
      translation,
      targetLang,
      transliteration: `[${sanskrit}]`,
    });
  } catch (error) {
    console.error("Translation Error:", error);
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    );
  }
}
