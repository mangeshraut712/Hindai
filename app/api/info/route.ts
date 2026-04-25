import { NextResponse } from "next/server";
import { getAIStatus } from "@/lib/ai/gemma";

export async function GET() {
  const aiStatus = await getAIStatus();

  return NextResponse.json({
    name: "SanskritNova inside HindAI",
    provider: "hindai-gemma4",
    model: aiStatus.model,
    available: aiStatus.available,
    chat_modes: ["learn", "translate", "analyze", "grounded", "agentic"],
    transliteration: true,
    tracks: true,
  });
}
