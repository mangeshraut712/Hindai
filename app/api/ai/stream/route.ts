import { NextResponse } from "next/server";
import { generateExplanationStream, getAIStatus } from "@/lib/ai/gemma";

export const dynamic = "force-dynamic";

/**
 * Streaming AI Route - Next.js 15 + React 19
 * Real-time AI responses with Server Streaming
 */

export async function GET() {
  const aiStatus = await getAIStatus();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ai/stream/",
    methods: ["POST", "OPTIONS"],
    backend: aiStatus.type,
    model: aiStatus.model,
  });
}

export async function OPTIONS() {
  return NextResponse.json({ ok: true, methods: ["GET", "POST", "OPTIONS"] });
}

export async function POST(req: Request) {
  try {
    const {
      messages,
      scripture,
      chapter,
      verse,
      compareScriptureIds,
      mode,
      audience,
    } = await req.json();
    const aiStatus = await getAIStatus();

    const latestUserMessage = Array.isArray(messages)
      ? [...messages]
          .reverse()
          .find(
            (message: { role?: string; content?: string }) =>
              message?.role === "user" &&
              typeof message.content === "string" &&
              message.content.trim().length > 0,
          )
      : null;

    if (!latestUserMessage) {
      return NextResponse.json(
        { error: "A user message is required for streaming." },
        { status: 400 },
      );
    }

    if (!aiStatus.available) {
      return NextResponse.json(
        {
          error:
            "Gemma is not configured. Accepting access on Kaggle is not enough by itself. Set GEMMA_API_KEY for hosted access, or run Ollama locally.",
          backend: aiStatus.type,
          model: aiStatus.model,
        },
        { status: 503 },
      );
    }

    const userId =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous";
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const streamGenerator = generateExplanationStream(
            {
              query: latestUserMessage.content.trim(),
              scriptureId: scripture,
              compareScriptureIds,
              chapter,
              verse,
              language: "en",
              mode,
              audience,
            },
            userId,
          );

          for await (const chunk of streamGenerator) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        } catch (error) {
          console.error("Streaming controller error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Cache-Control": "no-cache, no-transform",
        "Content-Type": "text/plain; charset=utf-8",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("Streaming error:", error);
    return NextResponse.json(
      { error: "AI service unavailable" },
      { status: 503 },
    );
  }
}

// Use the default Node runtime in development for reliable local streaming.
