import { NextResponse } from "next/server";
import { getAIStatus } from "@/lib/ai/openrouter";

/**
 * Health Check API
 *
 * Returns API status and configuration info.
 */
export async function GET() {
  const aiStatus = await getAIStatus();

  return NextResponse.json({
    status: aiStatus.available ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    deployment: process.env.VERCEL ? "vercel" : "local",
    ai: {
      available: aiStatus.available,
      backend: aiStatus.type,
      model: aiStatus.model,
      cache: aiStatus.cacheBackend || "memory",
    },
    message: "Hind AI Gemma 4 Hackathon Project - All Systems Operational",
  });
}
