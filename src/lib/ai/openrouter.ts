/**
 * OpenRouter AI Integration for Hind AI
 *
 * This module uses Google Gemma 4 via OpenRouter for AI inference.
 */

import { buildHindAISystemPrompt, HINDAI_GEMMA_MODEL } from "@/lib/ai/gemma-capabilities";

function resolveOpenRouterModel() {
  const configured = (process.env.OPENROUTER_MODEL || "").trim();
  return configured.startsWith("google/gemma") ? configured : HINDAI_GEMMA_MODEL;
}

export const OPENROUTER_MODEL = resolveOpenRouterModel();
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

type OpenRouterMessage = {
  role: "system" | "user" | "assistant";
  content: string;
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

function buildStudyMessages(params: {
  query: string;
  scriptureId?: string;
  compareScriptureIds?: string[];
  chapter?: number;
  verse?: number;
  language?: string;
  mode?: string;
  audience?: string;
}): OpenRouterMessage[] {
  const contextLines = [
    params.scriptureId ? `Current scripture: ${params.scriptureId}` : null,
    params.chapter ? `Chapter: ${params.chapter}` : null,
    params.verse ? `Verse: ${params.verse}` : null,
    params.compareScriptureIds?.length
      ? `Compare with: ${params.compareScriptureIds.join(", ")}`
      : null,
  ].filter(Boolean);

  return [
    {
      role: "system",
      content: buildHindAISystemPrompt({
        mode: params.mode,
        audience: params.audience,
        language: params.language,
      }),
    },
    {
      role: "user",
      content: [
        contextLines.length ? `Study context:\n${contextLines.join("\n")}` : null,
        "User request:",
        params.query,
      ]
        .filter(Boolean)
        .join("\n\n"),
    },
  ];
}

function extractStreamText(buffer: string): { text: string; rest: string; done: boolean } {
  const events = buffer.split("\n\n");
  const rest = events.pop() ?? "";
  let text = "";
  let done = false;

  for (const event of events) {
    const lines = event.split("\n");
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;

      const data = line.slice(6).trim();
      if (!data) continue;
      if (data === "[DONE]") {
        done = true;
        continue;
      }

      try {
        const parsed = JSON.parse(data) as {
          choices?: Array<{
            delta?: { content?: string };
            message?: { content?: string };
          }>;
        };
        text += parsed.choices?.[0]?.delta?.content ?? parsed.choices?.[0]?.message?.content ?? "";
      } catch {
        text += data;
      }
    }
  }

  return { text, rest, done };
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

  return {
    available: true,
    type: "openrouter",
    model,
    cacheBackend: "openrouter",
  };
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
  _userId?: string
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
        messages: buildStudyMessages(params),
        max_tokens: 1600,
        temperature: 0.55,
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
  _userId?: string
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
        messages: buildStudyMessages(params),
        max_tokens: 1600,
        temperature: 0.55,
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
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const parsed = extractStreamText(buffer);
      buffer = parsed.rest;
      if (parsed.text) {
        yield parsed.text;
      }
      if (parsed.done) {
        return;
      }
    }

    buffer += decoder.decode();
    if (buffer.trim()) {
      const parsed = extractStreamText(`${buffer}\n\n`);
      if (parsed.text) {
        yield parsed.text;
      }
    }
  } catch (error) {
    yield unavailableExplanation(error instanceof Error ? error.message : "Unknown error");
  }
}

/**
 * Get AI service status
 */
export const getAIStatus = checkOpenRouterAvailability;
