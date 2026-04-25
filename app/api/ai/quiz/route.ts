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
    return NextResponse.json({
      question: {
        question: "Which concept is central to Karma Yoga in the Bhagavad Gita?",
        options: [
          "Acting with dedication without attachment to results",
          "Avoiding all action completely",
          "Seeking only ritual reward",
          "Rejecting duty in daily life",
        ],
        correctAnswer: 0,
        explanation:
          "The Bhagavad Gita teaches disciplined action without attachment to the fruits of action.",
        scripture: "Bhagavad Gita",
        difficulty: "easy",
      },
      model: "fallback-reference",
      available: false,
      error: error instanceof Error ? error.message : "Quiz generation failed.",
    });
  }
}
