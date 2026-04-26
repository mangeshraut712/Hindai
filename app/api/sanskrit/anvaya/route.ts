import { NextRequest, NextResponse } from "next/server";
import { AnvayaAnalyzer } from "@/lib/sanskrit/anvaya/analyzer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { verse, batch } = body;

    if (!verse && !batch) {
      return NextResponse.json(
        { error: "Either 'verse' or 'batch' parameter is required" },
        { status: 400 }
      );
    }

    if (batch && Array.isArray(batch)) {
      const results = AnvayaAnalyzer.analyzeBatch(batch);
      return NextResponse.json({ results });
    }

    if (verse) {
      const result = AnvayaAnalyzer.analyze(verse);
      return NextResponse.json({ result });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Anvaya API error:", error);
    return NextResponse.json({ error: "Failed to analyze anvaya" }, { status: 500 });
  }
}
