/**
 * OpenRouter AI Integration for Hind AI
 *
 * This module uses Google Gemma 4 via OpenRouter for AI inference.
 */

import { z } from "zod";

export const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "google/gemma-4-31b-it:free";
export const OPENROUTER_URL = process.env.OPENROUTER_URL || "https://openrouter.ai/api/v1/chat/completions";

export interface AIStatus {
  available: boolean;
  type: string;
  model: string;
  cacheBackend?: string;
  error?: string;
}

/**
 * Check OpenRouter API availability
 */
export async function checkOpenRouterAvailability(): Promise<AIStatus> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = OPENROUTER_MODEL;

  if (!apiKey) {
    return {
      available: false,
      type: "openrouter",
      model,
      error: "OPENROUTER_API_KEY not configured",
    };
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://hindai-nine.vercel.app",
        "X-Title": "Hind AI Scripture Platform",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "user",
            content: "Hello, this is a health check. Please respond with 'OK'.",
          },
        ],
        max_tokens: 5,
        temperature: 0.1,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return {
        available: true,
        type: "openrouter",
        model: data.model || model,
        cacheBackend: "openrouter",
      };
    } else {
      return {
        available: false,
        type: "openrouter",
        model,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }
  } catch (error) {
    return {
      available: false,
      type: "openrouter",
      model,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get AI service status
 */
export const getAIStatus = checkOpenRouterAvailability;
