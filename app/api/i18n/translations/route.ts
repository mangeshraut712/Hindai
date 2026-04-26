import { NextRequest, NextResponse } from "next/server";
import {
  getTranslation,
  getTranslationsByLanguage,
  getTranslationsById,
  searchTranslations,
} from "@/lib/i18n/translations";
import { Language } from "@/lib/i18n/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const language = searchParams.get("language");
    const query = searchParams.get("q");

    if (id && language) {
      const translation = getTranslation(id, language as Language);
      if (!translation) {
        return NextResponse.json({ error: "Translation not found" }, { status: 404 });
      }
      return NextResponse.json({ translation });
    }

    if (id) {
      const translations = getTranslationsById(id);
      return NextResponse.json({ translations, total: translations.length });
    }

    if (language) {
      const translations = getTranslationsByLanguage(language as Language);
      return NextResponse.json({ language, translations, total: translations.length });
    }

    if (query) {
      const lang = searchParams.get("lang") as Language | undefined;
      const translations = searchTranslations(query, lang);
      return NextResponse.json({ translations, total: translations.length });
    }

    return NextResponse.json(
      { error: "Please specify id, language, or query parameter" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Translations API error:", error);
    return NextResponse.json({ error: "Failed to fetch translations" }, { status: 500 });
  }
}
