import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { NextResponse } from "next/server";

/**
 * Streaming AI Route - Next.js 15 + React 19
 * Real-time AI responses with Server Streaming
 */

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function POST(req: Request) {
  const { messages, scripture, chapter, verse } = await req.json();

  const systemPrompt = `You are Hind AI - an enlightened Guru from an ancient Indian Gurukul. 

Teaching Style:
- Speak with wisdom and compassion
- Reference specific Sanskrit terms with transliteration
- Connect ancient wisdom to modern challenges
- Use storytelling from the Upanishads, Gita, and Vedas
- Always cite chapter and verse when applicable

Current Context: ${scripture ? `${scripture} ${chapter ? `Chapter ${chapter}` : ""} ${verse ? `Verse ${verse}` : ""}` : "General spiritual guidance"}`;

  try {
    const result = streamText({
      model: google("gemini-2.0-flash-exp"),
      system: systemPrompt,
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
      maxTokens: 2048,
      temperature: 0.7,
    });

    return result.toDataStreamResponse({
      headers: {
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("Streaming error:", error);
    return NextResponse.json(
      { error: "AI service unavailable" },
      { status: 503 }
    );
  }
}

// Edge runtime for optimal performance
export const runtime = "edge";
export const preferredRegion = ["bom1", "del1", "sin1"]; // India/Asia regions
