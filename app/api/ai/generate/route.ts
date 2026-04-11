import { NextRequest, NextResponse } from "next/server";
import { GEMMA_MODEL, generateExplanation } from "@/lib/ai/gemma";

/**
 * API Route for Gemma 4 AI Generation
 *
 * This endpoint uses Gemma 4 models for AI-powered scripture analysis.
 * Part of the Gemma 4 Good Hackathon submission.
 */

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/ai/generate/",
    methods: ["POST", "OPTIONS"],
    model: GEMMA_MODEL,
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
    const { prompt, scriptureId, compareScriptureIds, chapter, verse, language, mode, audience } =
      await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
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
      userId
    );

    return NextResponse.json({
      response: result.response,
      cached: result.cached,
      grounding: result.grounding,
      model: GEMMA_MODEL,
      mock: false,
      rateLimit: result.rateLimit,
    });
  } catch (error) {
    console.error("AI Generation Error:", error);

    // Return fallback response
    return NextResponse.json(
      {
        response: {
          explanation: getFallbackResponse(),
        },
        mock: true,
        model: GEMMA_MODEL,
        error: error instanceof Error ? error.message : "AI service unavailable",
      },
      { status: 200 }
    );
  }
}

/**
 * Fallback response when AI is unavailable
 */
function getFallbackResponse(): string {
  return `Welcome to Hind AI! 🙏

I'm here to help you explore ancient Indian scriptures. Currently, I'm running in demo mode while the AI service is being configured.

**What I can help with:**
- Explaining verses from the Bhagavad Gita
- Understanding concepts like Karma, Dharma, and Moksha
- Exploring the Yoga Sutras of Patanjali
- Learning about meditation and spiritual practices

**Why this is still in demo mode:**
Accepting Gemma access on Kaggle does not configure this app by itself.

**To enable full AI features, choose one backend:**
1. Hosted API: set the GEMMA_API_KEY environment variable with your Google AI Studio key.
2. Local runtime: run Ollama locally with a Gemma model available at ${process.env.OLLAMA_URL || "http://localhost:11434"}.

**Sample Questions to Try:**
- "What is Karma Yoga?"
- "Explain Bhagavad Gita 2.47"
- "What are the four goals of life in Hinduism?"
- "How do I start meditation?"`;
}
