import { NextRequest, NextResponse } from "next/server";
import { generateExplanation, getAIStatus } from "@/lib/ai/gemma";

export const runtime = "nodejs";

// Multimodal endpoint for Sanskrit manuscript analysis
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const query = formData.get("query") as string;

    if (!image || !query) {
      return NextResponse.json(
        { error: "Image and query are required" },
        { status: 400 },
      );
    }

    // Convert image to base64 for Gemma 4 vision
    const imageBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    const multimodalQuery = {
      query: `${query}\n\n[IMAGE: ${base64Image}]\n\nPlease analyze this Sanskrit manuscript image and provide insights.`,
      language: "en" as const,
      mode: "explain" as const,
    };

    const result = await generateExplanation(
      multimodalQuery,
      "multimodal-user",
    );
    const aiStatus = await getAIStatus();

    return NextResponse.json({
      response: result.response,
      grounded: result.grounding,
      model: aiStatus.model,
      multimodal: true,
    });
  } catch (error) {
    console.error("Multimodal analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze manuscript image" },
      { status: 500 },
    );
  }
}
