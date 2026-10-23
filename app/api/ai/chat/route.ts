import { NextRequest, NextResponse } from "next/server";
import { contextManager } from "@/lib/ai/context-manager";
import { buildHindAISystemPrompt } from "@/lib/ai/gemma-capabilities";
import {
  clampMaxTokens,
  clampTemperature,
  clientSafeError,
  consumeRateLimit,
  publicModelError,
  readSseContent,
  requestClientKey,
  sanitizeChatTurns,
} from "@/lib/ai/model-guard";
import {
  getOpenRouterApiKey,
  OPENROUTER_MODEL,
  OPENROUTER_URL,
  openRouterHeaders,
} from "@/lib/ai/openrouter";

export const runtime = "nodejs";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  stream?: boolean;
  temperature?: number;
  maxTokens?: number;
}

const SYSTEM_PROMPT = buildHindAISystemPrompt({
  mode: "vedic scholar chat",
  audience: "general learner",
  language: "user's language when clear, otherwise English",
});

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { messages, stream = true } = body;
    const temperature = clampTemperature(body.temperature);
    const maxTokens = clampMaxTokens(body.maxTokens);
    const turns = sanitizeChatTurns(messages, SYSTEM_PROMPT);

    if (!turns.some((message) => message.role === "user")) {
      return NextResponse.json({ error: "A user message is required." }, { status: 400 });
    }

    const rateLimit = consumeRateLimit(`model:${requestClientKey(req)}`);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again in a minute." },
        { status: 429 }
      );
    }

    const apiKey = getOpenRouterApiKey();

    if (!apiKey) {
      return NextResponse.json({ error: "OpenRouter API key is not configured" }, { status: 500 });
    }

    const trimmedMessages = contextManager.trimConversation(turns, SYSTEM_PROMPT);

    if (stream) {
      const response = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: openRouterHeaders(apiKey, "Hind AI - Vedic AI Scholar"),
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages: trimmedMessages,
          stream: true,
          temperature,
          max_tokens: maxTokens,
        }),
      });

      if (!response.ok || !response.body) {
        const error = await response.text().catch(() => "");
        console.error("Chat upstream failed", response.status, error.slice(0, 500));
        return NextResponse.json(
          { error: publicModelError(response.status) },
          { status: response.status || 502 }
        );
      }

      const encoder = new TextEncoder();
      const upstream = response.body;
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const content of readSseContent(upstream)) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          } catch (error) {
            controller.error(error);
          } finally {
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    } else {
      // Non-streaming response
      const response = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: openRouterHeaders(apiKey, "Hind AI - Vedic AI Scholar"),
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages: trimmedMessages,
          stream: false,
          temperature,
          max_tokens: maxTokens,
        }),
      });

      if (!response.ok) {
        const error = await response.text().catch(() => "");
        console.error("Chat upstream failed", response.status, error.slice(0, 500));
        return NextResponse.json(
          { error: publicModelError(response.status) },
          { status: response.status || 502 }
        );
      }

      const data = await response.json();
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: clientSafeError(error, "Internal server error") },
      { status: 500 }
    );
  }
}
