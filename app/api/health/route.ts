import { NextResponse } from "next/server";
import { getAIStatus } from "@/lib/ai/gemma";

/**
 * Health Check API
 *
 * Returns API status and configuration info.
 */
export async function GET() {
  const aiStatus = await getAIStatus();
  const hostedKeyConfigured = Boolean(
    process.env.GEMMA_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
  );

  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: process.env.NODE_ENV,
    model: aiStatus.model,
    backend: aiStatus.type,
    cache_backend: aiStatus.cacheBackend,
    services: {
      gemma: aiStatus.available ? "configured" : "not_configured",
      hosted_api: hostedKeyConfigured ? "configured" : "not_configured",
      local_ollama: aiStatus.type === "local" ? "configured" : "not_configured",
      redis: aiStatus.cacheBackend === "upstash" ? "configured" : "fallback_memory",
    },
  });
}
