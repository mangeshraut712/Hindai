import { NextRequest, NextResponse } from "next/server";
import { generateExplanation, getAIStatus } from "@/lib/ai/gemma";

export const runtime = "nodejs";

const MAX_AGENTIC_MESSAGE_LENGTH = 4_000;

export async function POST(request: NextRequest) {
  try {
    const { message, lang } = await request.json();

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    if (message.length > MAX_AGENTIC_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message must be ${MAX_AGENTIC_MESSAGE_LENGTH} characters or fewer.` },
        { status: 413 }
      );
    }

    const result = await generateExplanation(
      {
        query: [
          "Answer as SanskritNova agentic mode inside HindAI.",
          "Use this structure: Goal, Analysis, Answer, Next practice.",
          lang === "hi" ? "Respond primarily in Hindi." : "Respond in English.",
          "Use Gemma 4 reasoning through HindAI only.",
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
      steps: ["Parsed learner goal", "Generated Gemma 4 study response", "Prepared next practice"],
      attempts: 1,
      quality: "gemma4",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Agentic answer failed." },
      { status: 503 }
    );
  }
}
