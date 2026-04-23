import { NextRequest, NextResponse } from "next/server";
import { generateExplanation, getAIStatus } from "@/lib/ai/gemma";

export const runtime = "nodejs";

/**
 * API Route for Gemma 4 AI Generation
 *
 * This endpoint uses Gemma 4 models for AI-powered scripture analysis.
 * Part of the Gemma 4 Good Hackathon submission.
 */

export async function GET() {
  const aiStatus = await getAIStatus();
  return NextResponse.json({
    ok: true,
    endpoint: "/api/ai/generate/",
    methods: ["POST", "OPTIONS"],
    model: aiStatus.model,
    usage: {
      body: {
        prompt: "Explain Bhagavad Gita 2.47 in simple English",
        scriptureId: "optional",
        compareScriptureIds: ["optional", "for compare mode"],
        chapter: "optional",
        verse: "optional",
        language: "optional",
        mode: "optional: explain | compare",
        audience: "optional: general | student | teacher",
      },
    },
  });
}

export async function OPTIONS() {
  return NextResponse.json({ ok: true, methods: ["GET", "POST", "OPTIONS"] });
}

export async function POST(request: NextRequest) {
  try {
    const {
      prompt,
      scriptureId,
      compareScriptureIds,
      chapter,
      verse,
      language,
      mode,
      audience,
    } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    const userId =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    const result = await generateExplanation(
      {
        query: prompt.trim(),
        scriptureId,
        compareScriptureIds,
        chapter,
        verse,
        language,
        mode,
        audience,
      },
      userId,
    );

    const aiStatus = await getAIStatus();

    return NextResponse.json({
      response: result.response,
      cached: result.cached,
      grounding: result.grounding,
      model: aiStatus.model,
      mock: false,
      rateLimit: result.rateLimit,
    });
  } catch (error) {
    console.error("AI Generation Error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "AI service is currently unavailable. Please try again later.",
      },
      { status: 503 },
    );
  }
}
