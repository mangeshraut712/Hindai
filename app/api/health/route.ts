import { NextResponse } from "next/server";

/**
 * Health Check API
 * 
 * Returns API status and configuration info
 * Useful for monitoring and debugging
 */
export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: process.env.NODE_ENV,
    services: {
      gemini: !!process.env.GEMINI_API_KEY ? "configured" : "not_configured",
      redis: !!process.env.UPSTASH_REDIS_REST_URL ? "configured" : "not_configured",
    },
  });
}
