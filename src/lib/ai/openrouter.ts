/**
 * OpenRouter AI Integration for Hind AI
 *
 * This module uses Google Gemma 4 via OpenRouter for AI inference.
 */

export const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "google/gemma-4-31b-it:free";
const OPENROUTER_BASE_URL = process.env.OPENROUTER_URL || "https://openrouter.ai/api/v1";
export const OPENROUTER_URL = resolveOpenRouterChatUrl(OPENROUTER_BASE_URL);

export interface AIStatus {
  available: boolean;
  type: string;
  model: string;
  cacheBackend?: string;
  error?: string;
}

type OpenRouterResponse = {
  model?: string;
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
};

function resolveOpenRouterChatUrl(url: string): string {
  const normalized = url.trim().replace(/\/+$/, "");
  return normalized.endsWith("/chat/completions") ? normalized : `${normalized}/chat/completions`;
}

export function getOpenRouterApiKey(): string {
  return (process.env.OPENROUTER_API_KEY || "").trim().replace(/^Bearer\s+/i, "");
}

export function openRouterHeaders(apiKey: string, title = "Hind AI Scripture Platform") {
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "https://hindai-nine.vercel.app",
    "X-Title": title,
  };
}

async function readOpenRouterJson(response: Response): Promise<OpenRouterResponse> {
  const responseText = await response.text();
  let data: OpenRouterResponse | null = null;

  try {
    data = responseText ? JSON.parse(responseText) : null;
  } catch {
    throw new Error(`OpenRouter returned non-JSON response (${response.status}).`);
  }

  if (!response.ok) {
    const message = data?.error?.message || response.statusText || "OpenRouter request failed";
    throw new Error(`OpenRouter error ${response.status}: ${message}`);
  }

  return data || {};
}

function unavailableExplanation(reason: string): string {
  return [
    "AI service is currently unavailable.",
    `Reason: ${reason}`,
    "Check OPENROUTER_API_KEY, OPENROUTER_URL, and OPENROUTER_MODEL before retrying live AI generation.",
  ].join(" ");
}

/**
 * Check OpenRouter API availability
 */
export async function checkOpenRouterAvailability(): Promise<AIStatus> {
  const apiKey = getOpenRouterApiKey();
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
        ...openRouterHeaders(apiKey),
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
      const data = await readOpenRouterJson(response);
      return {
        available: true,
        type: "openrouter",
        model: data.model || model,
        cacheBackend: "openrouter",
      };
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
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
 * Generate AI explanation for Sanskrit learning
 */
export async function generateExplanation(
  params: {
    query: string;
    scriptureId?: string;
    compareScriptureIds?: string[];
    chapter?: number;
    verse?: number;
    language?: string;
    mode?: string;
    audience?: string;
  },
  userId?: string
) {
  const apiKey = getOpenRouterApiKey();
  const model = OPENROUTER_MODEL;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured.");
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        ...openRouterHeaders(apiKey),
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "user",
            content: params.query,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    const data = await readOpenRouterJson(response);
    return {
      response: {
        explanation: data.choices?.[0]?.message?.content || "No response generated",
      },
      cached: false,
      grounding: false,
      rateLimit: false,
    };
  } catch (error) {
    console.error("OpenRouter API error:", error);
    throw error;
  }
}

/**
 * Generate AI explanation stream for Sanskrit learning
 */
export async function* generateExplanationStream(
  params: {
    query: string;
    scriptureId?: string;
    compareScriptureIds?: string[];
    chapter?: number;
    verse?: number;
    language?: string;
    mode?: string;
    audience?: string;
  },
  userId?: string
) {
  const apiKey = getOpenRouterApiKey();
  const model = OPENROUTER_MODEL;

  if (!apiKey) {
    yield unavailableExplanation("OPENROUTER_API_KEY is not configured.");
    return;
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        ...openRouterHeaders(apiKey),
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "user",
            content: params.query,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!response.ok || !response.body) {
      const responseText = await response.text().catch(() => "");
      throw new Error(
        `OpenRouter error ${response.status}: ${responseText || response.statusText}`
      );
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield decoder.decode(value);
    }
  } catch (error) {
    yield unavailableExplanation(error instanceof Error ? error.message : "Unknown error");
  }
}

/**
 * Get AI service status
 */
export const getAIStatus = checkOpenRouterAvailability;
