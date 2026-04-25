import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  const openrouterKey = process.env.OPENROUTER_API_KEY;
  const openrouterUrl = "https://openrouter.ai/api/v1/chat/completions";

  const results: {
    openrouter: { status: string; error: any; response: any };
  } = {
    openrouter: { status: "not_tested", error: null, response: null },
  };

  // NVIDIA API removed - OpenRouter is the official LLM API for this project

  // Test OpenRouter API
  if (openrouterKey) {
    try {
      const openrouterResponse = await fetch(openrouterUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openrouterKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://hindai-nine.vercel.app",
          "X-Title": "Hind AI Scripture Platform",
        },
        body: JSON.stringify({
          model: process.env.OPENROUTER_MODEL || "google/gemma-4-31b-it:free",
          messages: [
            {
              role: "user",
              content: 'Hello, please respond with "OpenRouter API is working correctly"',
            },
          ],
          max_tokens: 10,
          temperature: 0.1,
        }),
      });

      if (openrouterResponse.ok) {
        const openrouterData = await openrouterResponse.json();
        results.openrouter.status = "success";
        results.openrouter.response = {
          content: openrouterData.choices[0]?.message?.content,
          model: openrouterData.model,
          usage: openrouterData.usage,
        };
      } else {
        const errorData = await openrouterResponse.text();
        results.openrouter.status = "error";
        results.openrouter.error = {
          status: openrouterResponse.status,
          details: errorData,
        };
      }
    } catch (error) {
      results.openrouter.status = "error";
      results.openrouter.error = {
        message: error instanceof Error ? error.message : "Unknown error",
      };
    }
  } else {
    results.openrouter.status = "missing_key";
    results.openrouter.error = { message: "OPENROUTER_API_KEY not found" };
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "unknown",
    results,
  });
}
