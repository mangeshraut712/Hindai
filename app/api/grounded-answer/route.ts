import { NextRequest, NextResponse } from "next/server";
import { generateExplanation, getAIStatus } from "@/lib/ai/gemma";

export const runtime = "nodejs";

const MAX_GROUNDED_MESSAGE_LENGTH = 4_000;

export async function POST(request: NextRequest) {
  try {
    const { message, lang } = await request.json();

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    if (message.length > MAX_GROUNDED_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message must be ${MAX_GROUNDED_MESSAGE_LENGTH} characters or fewer.` },
        { status: 413 }
      );
    }

    const result = await generateExplanation(
      {
        query: [
          "Answer as SanskritNova grounded mode inside HindAI.",
          lang === "hi" ? "Respond primarily in Hindi." : "Respond in English.",
          "Use HindAI scripture context when relevant and state uncertainty plainly.",
          message.trim(),
        ].join("\n"),
        mode: "explain",
        audience: "student",
      },
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous"
    );
    const aiStatus = await getAIStatus();

    return NextResponse.json({
      reply: result.response.explanation,
      model: aiStatus.model,
      sources: [...result.grounding.verses, ...result.grounding.scriptures],
      grounding: result.grounding,
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Grounded answer failed.";
    return NextResponse.json({
      reply:
        "Grounded mode received the request, but live Gemma/OpenRouter generation is unavailable. Use HindAI scripture pages and local verse data for reading context, then retry grounded AI after credentials are fixed.",
      model: "fallback-reference",
      sources: [],
      grounding: { verses: [], scriptures: [] },
      available: false,
      error: reason,
    });
  }
}
