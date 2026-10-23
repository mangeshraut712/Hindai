import { NextRequest, NextResponse } from "next/server";
import {
  clampPlainText,
  consumeRateLimit,
  publicModelError,
  readSseContent,
  requestClientKey,
} from "@/lib/ai/model-guard";
import {
  getOpenRouterApiKey,
  OPENROUTER_MODEL,
  OPENROUTER_URL,
  openRouterHeaders,
} from "@/lib/ai/openrouter";

export const runtime = "nodejs";

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
    const queryText = clampPlainText(query);
    if (!queryText) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
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

    // Build context-aware prompt
    const contextText = clampPlainText(context, 1000);
    const preferenceText = clampPlainText(preferences ? JSON.stringify(preferences) : "", 500);
    let enhancedQuery = contextText ? `Context: ${contextText}\n\nQuery: ${queryText}` : queryText;
    if (preferenceText) {
      enhancedQuery += `\n\nUser Preferences: ${preferenceText}`;
    }

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: openRouterHeaders(apiKey, "Hind AI - Dharma Guide"),
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
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
        max_tokens: 1600,
      }),
    });

    if (!response.ok || !response.body) {
      const error = await response.text().catch(() => "");
      console.error("Dharma upstream failed", response.status, error.slice(0, 500));
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
  } catch (error) {
    console.error("Dharma Guide API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
