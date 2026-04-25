import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const apiUrl = "https://openrouter.ai/api/v1/chat/completions";

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY not found in environment variables" },
      { status: 500 }
    );
  }

  try {
    // Test OpenRouter API with proper headers and model
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://hindai-nine.vercel.app",
        "X-Title": "Hind AI Scripture Platform",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || "google/gemma-4-31b-it:free",
        messages: [
          {
            role: "user",
            content:
              'Hello, this is a test message. Please respond with "OpenRouter API is working correctly."',
          },
        ],
        max_tokens: 50,
        temperature: 0.5,
      }),
    });

    // Get response as text first to debug
    const responseText = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "OpenRouter API request failed",
          status: response.status,
          statusText: response.statusText,
          details: responseText,
        },
        { status: response.status }
      );
    }

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      return NextResponse.json(
        {
          error: "Failed to parse OpenRouter response as JSON",
          status: response.status,
          responseText: responseText.substring(0, 500), // First 500 chars for debugging
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      model: data.model,
      response: data.choices?.[0]?.message?.content || "No response content",
      usage: data.usage,
      rawResponse: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to call OpenRouter API",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { model, messages, max_tokens = 100, temperature = 0.7 } = body;

    const apiKey = process.env.OPENROUTER_API_KEY;
    const apiUrl = "https://openrouter.ai/api/v1/chat/completions";

    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY not found in environment variables" },
        { status: 500 }
      );
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://hindai-nine.vercel.app",
        "X-Title": "Hind AI Scripture Platform",
      },
      body: JSON.stringify({
        model: model || process.env.OPENROUTER_MODEL || "google/gemma-4-31b-it:free",
        messages: messages || [
          {
            role: "user",
            content: "Hello, please introduce yourself.",
          },
        ],
        max_tokens,
        temperature,
      }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "OpenRouter API request failed",
          status: response.status,
          details: responseText,
        },
        { status: response.status }
      );
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      return NextResponse.json(
        {
          error: "Failed to parse OpenRouter response as JSON",
          responseText: responseText.substring(0, 500),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      model: data.model,
      response: data.choices?.[0]?.message?.content || "No response content",
      usage: data.usage,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
