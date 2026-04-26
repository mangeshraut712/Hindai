import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = process.env.OPENROUTER_URL || "https://openrouter.ai/api/v1";
const MODEL = process.env.OPENROUTER_MODEL || "google/gemma-4-31b-it:free";

export const runtime = "edge";

const VISION_SYSTEM_PROMPT = `You are an expert in Hindu iconography, Sanskrit manuscripts, and ancient Indian art. Your expertise includes:

- Identifying deities, symbols, and sacred iconography in images
- Reading and transliterating Sanskrit text from manuscripts
- Understanding the philosophical and religious significance of visual elements
- Recognizing different artistic styles and periods of Hindu art
- Interpreting ritual objects, yantras, mandalas, and sacred geometry
- Providing context about temple architecture and sculpture

When analyzing images:
1. Describe what you see in detail
2. Identify any Sanskrit text and provide transliteration and translation
3. Explain the religious or philosophical significance
4. Note the artistic style and period if identifiable
5. Provide relevant scriptural references when applicable
6. Be respectful of the sacred nature of the imagery`;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File;
    const query = formData.get("query") as string || "Analyze this image";

    if (!image) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "OpenRouter API key is not configured" },
        { status: 500 }
      );
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const dataUrl = `data:${image.type};base64,${base64}`;

    const response = await fetch(`${OPENROUTER_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://hindai.dev",
        "X-Title": "Hind AI - Vision Analysis",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: VISION_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: query,
              },
              {
                type: "image_url",
                image_url: {
                  url: dataUrl,
                },
              },
            ],
          },
        ],
        stream: false,
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

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content;

    return NextResponse.json({
      analysis,
      query,
      imageType: image.type,
      imageSize: image.size,
    });
  } catch (error) {
    console.error("Vision API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
