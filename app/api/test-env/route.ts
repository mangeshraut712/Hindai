import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  const envVars = {
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY ? "SET" : "NOT_SET",
    OPENROUTER_URL: process.env.OPENROUTER_URL || "NOT_SET",
    OPENROUTER_MODEL: process.env.OPENROUTER_MODEL || "NOT_SET",
    NODE_ENV: process.env.NODE_ENV || "NOT_SET",
    VERCEL_ENV: process.env.VERCEL_ENV || "NOT_SET",
  };

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV || "unknown",
    message: "Environment variable check",
    variables: envVars,
  });
}
