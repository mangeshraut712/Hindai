import { NextRequest, NextResponse } from "next/server";
import { VedicAccentAnalyzer } from "@/lib/sanskrit/vedic-accents/analyzer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { word, batch } = body;

    if (!word && !batch) {
      return NextResponse.json(
        { error: "Either 'word' or 'batch' parameter is required" },
        { status: 400 }
      );
    }

    if (batch && Array.isArray(batch)) {
      const results = VedicAccentAnalyzer.analyzeBatch(batch);
      return NextResponse.json({ results });
    }

    if (word) {
      const result = VedicAccentAnalyzer.analyze(word);
      return NextResponse.json({ result });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Vedic Accents API error:", error);
    return NextResponse.json({ error: "Failed to analyze accents" }, { status: 500 });
  }
}
