import { NextRequest, NextResponse } from "next/server";
import { SamasaAnalyzer } from "@/lib/sanskrit/samasa/analyzer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { compound, batch } = body;

    if (!compound && !batch) {
      return NextResponse.json(
        { error: "Either 'compound' or 'batch' parameter is required" },
        { status: 400 }
      );
    }

    if (batch && Array.isArray(batch)) {
      const results = SamasaAnalyzer.analyzeBatch(batch);
      return NextResponse.json({ results });
    }

    if (compound) {
      const result = SamasaAnalyzer.analyze(compound);
      return NextResponse.json({ result });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Samasa API error:", error);
    return NextResponse.json({ error: "Failed to analyze samasa" }, { status: 500 });
  }
}
