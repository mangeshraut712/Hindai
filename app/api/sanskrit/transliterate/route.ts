import { NextRequest, NextResponse } from "next/server";
import { transliterateToIast } from "@/lib/sanskrit/transliteration";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "Text is required." }, { status: 400 });
    }

    return NextResponse.json({
      devanagari: text,
      iast: transliterateToIast(text),
    });
  } catch {
    return NextResponse.json({ error: "Invalid transliteration request." }, { status: 400 });
  }
}
