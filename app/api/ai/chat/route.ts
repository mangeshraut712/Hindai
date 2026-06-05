import { NextRequest, NextResponse } from "next/server";
import { contextManager } from "@/lib/ai/context-manager";
import { buildHindAISystemPrompt } from "@/lib/ai/gemma-capabilities";
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
    const { messages, stream = true, temperature = 0.7, maxTokens = 4096 } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const apiKey = getOpenRouterApiKey();

    if (!apiKey) {
      return NextResponse.json({ error: "OpenRouter API key is not configured" }, { status: 500 });
    }

    // Add system prompt if not present
    const messagesWithSystem =
      messages[0]?.role === "system"
        ? messages
        : [{ role: "system" as const, content: SYSTEM_PROMPT }, ...messages];

    // Trim conversation to fit within context window
    const trimmedMessages = contextManager.trimConversation(messagesWithSystem, SYSTEM_PROMPT);

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

      if (!response.ok) {
        const error = await response.text();
        return NextResponse.json(
          { error: `OpenRouter API error: ${error}` },
          { status: response.status }
        );
      }

      // Create a readable stream
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      const stream = new ReadableStream({
        async start(controller) {
          const reader = response.body?.getReader();
          if (!reader) {
            controller.close();
            return;
          }

          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value);
              const lines = chunk.split("\n");

              for (const line of lines) {
                if (line.startsWith("data: ")) {
                  const data = line.slice(6);
                  if (data === "[DONE]") {
                    controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                    break;
                  }

                  try {
                    const parsed = JSON.parse(data);
                    const content = parsed.choices?.[0]?.delta?.content;
                    if (content) {
                      controller.enqueue(
                        encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                      );
                    }
                  } catch {
                    // Skip invalid JSON
                  }
                }
              }
            }
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
        const error = await response.text();
        return NextResponse.json(
          { error: `OpenRouter API error: ${error}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
