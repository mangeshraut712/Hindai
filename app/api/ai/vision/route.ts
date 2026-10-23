import { NextRequest, NextResponse } from "next/server";
import {
  clampPlainText,
  consumeRateLimit,
  imageUploadError,
  imageUploadStatus,
  publicModelError,
  requestClientKey,
} from "@/lib/ai/model-guard";
import {
  getOpenRouterApiKey,
  OPENROUTER_MODEL,
  OPENROUTER_URL,
  openRouterHeaders,
} from "@/lib/ai/openrouter";

export const runtime = "nodejs";

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
    const imageEntry = formData.get("image");
    const image = imageEntry instanceof File ? imageEntry : null;
    const uploadError = imageUploadError(image ? { type: image.type, size: image.size } : null);
    if (uploadError || !image) {
      const message = uploadError || "Image file is required";
      return NextResponse.json({ error: message }, { status: imageUploadStatus(message) });
    }

    const rateLimit = consumeRateLimit(`model:${requestClientKey(req)}`);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again in a minute." },
        { status: 429 }
      );
    }

    const query = clampPlainText(formData.get("query"), 1000) || "Analyze this image";

    const apiKey = getOpenRouterApiKey();

    if (!apiKey) {
      return NextResponse.json({ error: "OpenRouter API key is not configured" }, { status: 500 });
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const dataUrl = `data:${image.type};base64,${base64}`;

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: openRouterHeaders(apiKey, "Hind AI - Vision Analysis"),
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
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
        max_tokens: 1600,
      }),
    });

    if (!response.ok) {
      const error = await response.text().catch(() => "");
      console.error("Vision upstream failed", response.status, error.slice(0, 500));
      return NextResponse.json(
        { error: publicModelError(response.status) },
        { status: response.status || 502 }
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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
