import { NextRequest, NextResponse } from "next/server";
import { SandhiAnalyzer } from "@/lib/sanskrit/sandhi/analyzer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, batch } = body;

    if (!text && !batch) {
      return NextResponse.json(
        { error: "Either 'text' or 'batch' parameter is required" },
        { status: 400 }
      );
    }

    if (batch && Array.isArray(batch)) {
      const results = SandhiAnalyzer.analyzeBatch(batch);
      return NextResponse.json({ results });
    }

    if (text) {
      const result = SandhiAnalyzer.analyze(text);
      return NextResponse.json({ result });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Sandhi API error:", error);
    return NextResponse.json({ error: "Failed to analyze sandhi" }, { status: 500 });
  }
}
