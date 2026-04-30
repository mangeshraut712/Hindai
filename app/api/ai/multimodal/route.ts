import { NextRequest, NextResponse } from "next/server";
import { analyzeManuscriptImage } from "@/lib/ai/gemma";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE_BYTES = 4 * 1024 * 1024;

// Multimodal endpoint for Sanskrit manuscript analysis
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const query = formData.get("query") as string;

    if (!image || !query) {
      return NextResponse.json({ error: "Image and query are required" }, { status: 400 });
    }

    if (!image.type.startsWith("image/")) {
      return NextResponse.json({ error: "Uploaded file must be an image" }, { status: 415 });
    }

    if (image.size > MAX_IMAGE_SIZE_BYTES) {
      return NextResponse.json({ error: "Image must be 4MB or smaller" }, { status: 413 });
    }

    // Convert image to base64 for Gemma 4 vision
    const imageBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    const result = await analyzeManuscriptImage(base64Image, image.type || "image/png", query);

    return NextResponse.json({
      response: result.response,
      grounded: { verses: [], scriptures: [] },
      model: result.model,
      multimodal: true,
    });
  } catch (error) {
    console.error("Multimodal analysis error:", error);
    return NextResponse.json(
      {
        multimodal: true,
        available: false,
        error: error instanceof Error ? error.message : "Failed to analyze manuscript image",
      },
      { status: 503 }
    );
  }
}
