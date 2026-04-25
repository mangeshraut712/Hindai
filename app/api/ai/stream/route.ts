import { NextResponse } from "next/server";
import { generateExplanationStream, getAIStatus } from "@/lib/ai/openrouter";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function isResponseAbortedError(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const candidate = error as {
    name?: string;
    message?: string;
    constructor?: { name?: string };
  };

  return (
    candidate.name === "ResponseAborted" ||
    candidate.constructor?.name === "ResponseAborted" ||
    candidate.message?.includes("ResponseAborted") === true
  );
}

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
    const body = await req.json();
    const { messages, scripture, chapter, verse, compareScriptureIds, mode, audience } = body;
    const latestUserMessage = Array.isArray(messages)
      ? [...messages]
          .reverse()
          .find(
            (message: { role?: string; content?: string }) =>
              message?.role === "user" &&
              typeof message.content === "string" &&
              message.content.trim().length > 0
          )
      : null;

    if (!latestUserMessage) {
      return NextResponse.json(
        { error: "A user message is required for streaming." },
        { status: 400 }
      );
    }

    const userId =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous";
    const encoder = new TextEncoder();
    const { readable, writable } = new TransformStream<Uint8Array>();
    const writer = writable.getWriter();

    void (async () => {
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
          userId
        );

        for await (const chunk of streamGenerator) {
          if (!chunk) continue;
          await writer.write(encoder.encode(chunk));
        }
      } catch (error) {
        if (isResponseAbortedError(error)) {
          return;
        }
        console.error("Streaming controller error:", error);
        const fallbackMessage =
          error instanceof Error
            ? error.message
            : "I apologize, but I'm having trouble connecting to the AI service. Please try again in a moment.";
        await writer.write(encoder.encode(fallbackMessage)).catch(() => undefined);
      } finally {
        await writer.close().catch(() => undefined);
      }
    })();

    return new Response(readable, {
      headers: {
        "Cache-Control": "no-cache, no-transform",
        "Content-Type": "text/plain; charset=utf-8",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("Streaming error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "AI service unavailable" },
      { status: 503 }
    );
  }
}

// Use the default Node runtime in development for reliable local streaming.
