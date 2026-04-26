import { NextRequest, NextResponse } from "next/server";
import { VibhaktiAnalyzer } from "@/lib/sanskrit/vibhakti/analyzer";

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
      const results = VibhaktiAnalyzer.analyzeBatch(batch);
      return NextResponse.json({ results });
    }

    if (word) {
      const result = VibhaktiAnalyzer.analyze(word);
      return NextResponse.json({ result });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Vibhakti API error:", error);
    return NextResponse.json({ error: "Failed to analyze vibhakti" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const gender = searchParams.get("gender");
    const number = searchParams.get("number");

    if (gender && number) {
      const table = VibhaktiAnalyzer.getCaseTable(
        gender as "Masculine" | "Feminine" | "Neuter",
        number as "Singular" | "Dual" | "Plural"
      );
      return NextResponse.json({ gender, number, table });
    }

    return NextResponse.json({
      supportedGenders: ["Masculine", "Feminine", "Neuter"],
      supportedNumbers: ["Singular", "Dual", "Plural"],
      example: "/api/sanskrit/vibhakti?gender=Masculine&number=Singular",
    });
  } catch (error) {
    console.error("Vibhakti API error:", error);
    return NextResponse.json({ error: "Failed to fetch case table" }, { status: 500 });
  }
}
