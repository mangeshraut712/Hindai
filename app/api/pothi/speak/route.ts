import { NextResponse } from "next/server";
import { synthesizePothiSpeech } from "@/lib/audio/sarvam-tts";
import { sarvamLanguage, sarvamSpeaker } from "@/lib/data/shivlilamrit/recitation";
import type { ReaderLocale } from "@/lib/data/shivlilamrit/catalog";

function isLocale(value: unknown): value is ReaderLocale {
  return value === "mr" || value === "hi" || value === "en" || value === "roman";
}

export async function POST(request: Request) {
  const apiKey = process.env.SARVAM_API_KEY;
  const body = (await request.json().catch(() => ({}))) as { text?: string; locale?: string };
  const text = typeof body.text === "string" ? body.text.trim() : "";
  const locale = isLocale(body.locale) ? body.locale : "mr";
  if (!text) {
    return NextResponse.json({ error: "Text is required." }, { status: 400 });
  }
  if (!apiKey) {
    return NextResponse.json({ engine: "browser", fallback: true }, { status: 200 });
  }
  try {
    const audio = await synthesizePothiSpeech({
      text,
      language: sarvamLanguage(locale),
      speaker: sarvamSpeaker(locale),
      apiKey,
    });
    return NextResponse.json(audio);
  } catch (error) {
    return NextResponse.json(
      {
        engine: "browser",
        fallback: true,
        error: error instanceof Error ? error.message : "Sarvam unavailable",
      },
      { status: 200 }
    );
  }
}
