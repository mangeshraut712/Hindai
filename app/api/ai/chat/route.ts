import { NextRequest, NextResponse } from "next/server";
import { contextManager } from "@/lib/ai/context-manager";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = process.env.OPENROUTER_URL || "https://openrouter.ai/api/v1";
const MODEL = process.env.OPENROUTER_MODEL || "google/gemma-4-31b-it:free";

export const runtime = "edge";

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

const SYSTEM_PROMPT = `You are a Vedic AI Scholar, a deeply knowledgeable expert in Hindu philosophy, theology, and ancient Indian scriptures. Your expertise encompasses:

- The four Vedas (Rigveda, Yajurveda, Samaveda, Atharvaveda)
- The Upanishads (108 principal Upanishads)
- The Bhagavad Gita and Mahabharata
- The Ramayana and Puranas
- Sanskrit language and grammar
- Hindu philosophy (Darshanas): Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, Vedanta
- Dharma, Karma, Moksha, and the four Purusharthas
- Ritual practices, meditation techniques, and spiritual disciplines

Your responses should:
1. Be scholarly yet accessible, drawing from authentic scriptural sources
2. Provide Sanskrit terms with transliteration where relevant
3. Include specific references to texts when making claims
4. Balance traditional wisdom with contemporary understanding
5. Respect the diversity within Hindu traditions
6. When uncertain, acknowledge the complexity and multiple valid interpretations
7. Maintain a tone of reverence for the sacred knowledge
8. Provide practical insights alongside philosophical depth

When users ask about practices, always include appropriate disclaimers that spiritual practices should be undertaken with proper guidance from qualified teachers.`;

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { messages, stream = true, temperature = 0.7, maxTokens = 4096 } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "OpenRouter API key is not configured" },
        { status: 500 }
      );
    }

    // Add system prompt if not present
    const messagesWithSystem = messages[0]?.role === "system"
      ? messages
      : [{ role: "system" as const, content: SYSTEM_PROMPT }, ...messages];

    // Trim conversation to fit within context window
    const trimmedMessages = contextManager.trimConversation(
      messagesWithSystem,
      SYSTEM_PROMPT
    );

    if (stream) {
      const response = await fetch(`${OPENROUTER_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://hindai.dev",
          "X-Title": "Hind AI - Vedic AI Scholar",
        },
        body: JSON.stringify({
          model: MODEL,
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
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                    }
                  } catch (e) {
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
          "Connection": "keep-alive",
        },
      });
    } else {
      // Non-streaming response
      const response = await fetch(`${OPENROUTER_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://hindai.dev",
          "X-Title": "Hind AI - Vedic AI Scholar",
        },
        body: JSON.stringify({
          model: MODEL,
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
