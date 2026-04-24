import { NextRequest, NextResponse } from "next/server";
import { generateExplanation } from "@/lib/ai/gemma";

export const runtime = "nodejs";

/**
 * Deep Verse Analysis API
 *
 * Provides contextual interpretation, cross-scriptural connections,
 * and linguistic breakdown using Gemma 4's advanced reasoning.
 */

export async function POST(request: NextRequest) {
  try {
    const {
      sanskrit,
      translation,
      scriptureId,
      chapter,
      verse,
      mode = "contextual",
    } = await request.json();

    if (!sanskrit) {
      return NextResponse.json({ error: "Sanskrit text is required" }, { status: 400 });
    }

    let prompt = "";

    switch (mode) {
      case "contextual":
        prompt = `Analyze this Vedic verse in its philosophical and historical context:

Sanskrit: ${sanskrit}
Translation: ${translation || "Not provided"}
Source: ${scriptureId || "Unknown"} ${chapter ? `Chapter ${chapter}` : ""} ${verse ? `Verse ${verse}` : ""}

Provide:
1. Philosophical meaning and significance
2. Historical/cultural context
3. Connection to broader Vedic thought
4. Practical application for modern readers

Format as JSON with fields: philosophicalMeaning, historicalContext, broaderConnections, practicalApplication`;

        break;

      case "cross-scriptural":
        prompt = `Find connections between this verse and other Hindu scriptures:

Sanskrit: ${sanskrit}
Translation: ${translation || "Not provided"}
Source: ${scriptureId || "Unknown"}

Identify:
1. Similar concepts in Bhagavad Gita
2. Related teachings in Upanishads
3. Parallels in other Vedas
4. Thematic connections in Puranas

Format as JSON with fields: bhagavadGitaConnections, upanishadConnections, vedaParallels, puranaThemes`;

        break;

      case "linguistic":
        prompt = `Provide grammatical and etymological analysis of this Sanskrit verse:

Sanskrit: ${sanskrit}

For each word, provide:
1. Word in Devanagari
2. IAST transliteration
3. Grammatical breakdown (case, number, gender, verb form)
4. Etymological root (if applicable)
5. Meaning in context

Format as JSON with field: wordAnalysis (array of objects with: sanskrit, iast, grammar, etymology, meaning)`;

        break;

      default:
        return NextResponse.json(
          { error: "Invalid mode. Use: contextual, cross-scriptural, or linguistic" },
          { status: 400 }
        );
    }

    const response = await generateExplanation({
      query: prompt,
      scriptureId,
      chapter,
      verse,
      mode: "explain",
    });

    return NextResponse.json({
      mode,
      scriptureId,
      chapter,
      verse,
      analysis: response,
    });
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Analysis generation failed.",
      },
      { status: 503 }
    );
  }
}
