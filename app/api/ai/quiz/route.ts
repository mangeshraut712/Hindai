import { NextRequest, NextResponse } from "next/server";
import { generateQuizQuestion, getAIStatus } from "@/lib/ai/gemma";

export const runtime = "nodejs";

export async function GET() {
  const aiStatus = await getAIStatus();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ai/quiz/",
    methods: ["POST", "OPTIONS"],
    model: aiStatus.model,
    usage: {
      body: {
        topic: "optional topic for the generated quiz question",
      },
    },
  });
}

export async function OPTIONS() {
  return NextResponse.json({ ok: true, methods: ["GET", "POST", "OPTIONS"] });
}

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json().catch(() => ({ topic: undefined }));
    const question = await generateQuizQuestion(topic);
    const aiStatus = await getAIStatus();

    return NextResponse.json({
      question,
      model: aiStatus.model,
    });
  } catch (error) {
    console.error("AI Quiz Generation Error:", error);
    return NextResponse.json(
      {
        available: false,
        error: error instanceof Error ? error.message : "Quiz generation failed.",
      },
      { status: 503 }
    );
  }
}
