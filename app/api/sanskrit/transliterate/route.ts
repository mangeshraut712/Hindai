import { NextRequest, NextResponse } from "next/server";
import { transliterateToIast } from "@/lib/sanskrit/transliteration";

const MAX_TRANSLITERATION_LENGTH = 2_000;

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "Text is required." }, { status: 400 });
    }

    if (text.length > MAX_TRANSLITERATION_LENGTH) {
      return NextResponse.json(
        { error: `Text must be ${MAX_TRANSLITERATION_LENGTH} characters or fewer.` },
        { status: 413 }
      );
    }

    return NextResponse.json({
      devanagari: text,
      iast: transliterateToIast(text),
    });
  } catch {
    return NextResponse.json({ error: "Invalid transliteration request." }, { status: 400 });
  }
}
