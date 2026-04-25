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
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Grounded answer failed." },
      { status: 503 }
    );
  }
}
