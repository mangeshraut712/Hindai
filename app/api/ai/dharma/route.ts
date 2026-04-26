import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = process.env.OPENROUTER_URL || "https://openrouter.ai/api/v1";
const MODEL = process.env.OPENROUTER_MODEL || "google/gemma-4-31b-it:free";

export const runtime = "edge";

const DHARMA_SYSTEM_PROMPT = `You are a Dharma Guide, a wise and compassionate spiritual advisor well-versed in Hindu philosophy, rituals, and spiritual practices. Your expertise includes:

- Understanding the four Purusharthas (Dharma, Artha, Kama, Moksha)
- Knowledge of daily rituals (Sandhya Vandana, Puja, Japa, Meditation)
- Understanding of Vratas (fasting rituals) and their significance
- Knowledge of Samskaras (sacraments) and their proper observance
- Understanding of Yajnas, Homas, and other fire rituals
- Knowledge of pilgrimage (Tirtha Yatra) and sacred places
- Understanding of spiritual disciplines (Sadhana) and paths to liberation
- Knowledge of Hindu festivals and their observance
- Understanding of mantra, yantra, and tantra practices
- Knowledge of Ayurvedic lifestyle and spiritual health

When providing guidance:
1. Always consider the individual's context and capacity
2. Provide traditional wisdom with practical application
3. Include Sanskrit terms with transliteration where relevant
4. Reference scriptural sources when appropriate
5. Suggest practices that are safe and accessible
6. Include appropriate disclaimers for practices requiring guidance
7. Respect diverse traditions within Hinduism
8. Balance tradition with contemporary understanding
9. Emphasize intention (Bhava) over mere ritual
10. Guide toward self-realization and inner growth

Important: Always include a disclaimer that complex rituals, intense practices, or major life decisions should be undertaken with guidance from qualified teachers, gurus, or family elders.`;

export async function POST(req: NextRequest) {
  try {
    const { query, context, preferences } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "OpenRouter API key is not configured" },
        { status: 500 }
      );
    }

    // Build context-aware prompt
    let enhancedQuery = query;
    
    if (context) {
      enhancedQuery = `Context: ${context}\n\nQuery: ${query}`;
    }

    if (preferences) {
      enhancedQuery += `\n\nUser Preferences: ${JSON.stringify(preferences)}`;
    }

    const response = await fetch(`${OPENROUTER_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://hindai.dev",
        "X-Title": "Hind AI - Dharma Guide",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: DHARMA_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: enhancedQuery,
          },
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 4096,
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
  } catch (error) {
    console.error("Dharma Guide API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
