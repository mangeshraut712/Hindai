import { NextRequest, NextResponse } from "next/server";
import { generateExplanation, getAIStatus } from "@/lib/ai/gemma";
import { transliterateToIast } from "@/lib/sanskrit/transliteration";

export const runtime = "nodejs";

const MODE_INSTRUCTIONS = {
  learn:
    "Teach as a Sanskrit tutor. Keep the answer practical, show a short example, and include the next exercise.",
  translate:
    "Translate clearly. Preserve nuance, include transliteration when the source is Devanagari, and explain one important word.",
  analyze:
    "Analyze grammar, meaning, and context. Mention case, number, root, compound, or sandhi only when you can do so responsibly.",
  grounded:
    "Give a grounded Sanskrit learning answer using Hind AI scripture context when relevant. If sources are uncertain, say so plainly.",
} as const;

type SanskritChatMode = keyof typeof MODE_INSTRUCTIONS;

function resolveMode(mode: unknown): SanskritChatMode {
  return typeof mode === "string" && mode in MODE_INSTRUCTIONS
    ? (mode as SanskritChatMode)
    : "learn";
}

export async function POST(request: NextRequest) {
  try {
    const { message, mode, lang } = await request.json();

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const resolvedMode = resolveMode(mode);
    const prompt = [
      "You are SanskritNova inside Hind AI, powered only by Hind AI's Gemma 4 runtime.",
      MODE_INSTRUCTIONS[resolvedMode],
      lang === "hi" ? "Respond primarily in Hindi when it remains clear." : "Respond in English.",
      "Avoid OpenRouter, Gemini-branded, or non-Gemma claims. Be concise and useful.",
      `Input transliteration: ${transliterateToIast(message.trim())}`,
      `Learner request: ${message.trim()}`,
    ].join("\n");

    const userId =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    const result = await generateExplanation(
      {
        query: prompt,
        mode: "explain",
        audience: "student",
      },
      userId
    );
    const aiStatus = await getAIStatus();

    return NextResponse.json({
      reply: result.response.explanation,
      mode: resolvedMode,
      model: aiStatus.model,
      cached: result.cached,
      transliteration: transliterateToIast(message.trim()),
      grounding: result.grounding,
      rateLimit: result.rateLimit,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Sanskrit tutor is currently unavailable.",
      },
      { status: 503 }
    );
  }
}
