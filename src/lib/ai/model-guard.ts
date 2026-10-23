/**
 * Shared guards for model routes and the Gemma worker.
 * Caps input, rate-limits callers, and keeps upstream error bodies off the client.
 */

export const MODEL_LIMITS = {
  maxUserChars: 4000,
  maxMessages: 12,
  maxMessageChars: 4000,
  maxTokens: 1600,
  requestsPerMinute: 10,
  maxImageBytes: 4 * 1024 * 1024,
} as const;

const SAFE_ERROR_PREFIXES = [
  "Rate limit exceeded",
  "Upstream model request failed",
  "Gemma 4 is not configured",
  "OPENROUTER_API_KEY",
  "Text is required",
  "A user message is required",
  "Image file is required",
  "Uploaded file must be an image",
  "Image must be 4MB or smaller",
];

export type ChatRole = "system" | "user" | "assistant";

export type ChatTurn = {
  role: ChatRole;
  content: string;
};

type RateBucket = {
  count: number;
  reset: number;
};

const rateBuckets = new Map<string, RateBucket>();

export function resetRateLimitForTests(): void {
  rateBuckets.clear();
}

export function clampPlainText(value: unknown, max: number = MODEL_LIMITS.maxUserChars): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, " ")
    .trim()
    .slice(0, max);
}

export function clampLabel(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const clean = value
    .replace(/[^\p{L}\p{N} .-]/gu, "")
    .trim()
    .slice(0, 40);
  return clean || fallback;
}

export function clampTemperature(value: unknown): number {
  const numeric = typeof value === "number" && Number.isFinite(value) ? value : 0.7;
  return Math.min(1, Math.max(0, numeric));
}

export function clampMaxTokens(value: unknown): number {
  const numeric =
    typeof value === "number" && Number.isFinite(value)
      ? Math.floor(value)
      : MODEL_LIMITS.maxTokens;
  return Math.min(MODEL_LIMITS.maxTokens, Math.max(1, numeric));
}

export function sanitizeChatTurns(input: unknown, systemPrompt: string): ChatTurn[] {
  const messages = Array.isArray(input) ? input : [];
  const turns: ChatTurn[] = [{ role: "system", content: systemPrompt }];

  for (const message of messages) {
    if (!message || typeof message !== "object") continue;
    const record = message as { role?: unknown; content?: unknown };
    if (record.role !== "user" && record.role !== "assistant") continue;
    if (typeof record.content !== "string") continue;
    const content = clampPlainText(record.content, MODEL_LIMITS.maxMessageChars);
    if (!content) continue;
    turns.push({ role: record.role, content });
    if (turns.length > MODEL_LIMITS.maxMessages) break;
  }

  return turns;
}

export function publicModelError(status: number): string {
  return `Upstream model request failed (${status}).`;
}

export function clientSafeError(error: unknown, fallback: string): string {
  if (!(error instanceof Error)) return fallback;
  if (SAFE_ERROR_PREFIXES.some((prefix) => error.message.startsWith(prefix))) {
    return error.message;
  }
  return fallback;
}

export function imageUploadError(file: { type: string; size: number } | null): string | null {
  if (!file) return "Image file is required";
  if (!file.type.startsWith("image/")) return "Uploaded file must be an image";
  if (file.size > MODEL_LIMITS.maxImageBytes) return "Image must be 4MB or smaller";
  return null;
}

export function imageUploadStatus(message: string): number {
  if (message.startsWith("Image must be 4MB")) return 413;
  if (message.startsWith("Uploaded file must be an image")) return 415;
  return 400;
}

function readBucket(
  key: string,
  now: number
): { success: boolean; limit: number; remaining: number; reset: number } {
  const limit = MODEL_LIMITS.requestsPerMinute;
  const existing = rateBuckets.get(key);
  if (!existing || existing.reset <= now) {
    return { success: true, limit, remaining: limit, reset: now + 60_000 };
  }
  return {
    success: existing.count < limit,
    limit,
    remaining: Math.max(0, limit - existing.count),
    reset: existing.reset,
  };
}

export function peekRateLimit(
  key: string,
  now = Date.now()
): { limit: number; remaining: number; reset: number } {
  const bucket = readBucket(key, now);
  return { limit: bucket.limit, remaining: bucket.remaining, reset: bucket.reset };
}

export function consumeRateLimit(
  key: string,
  now = Date.now()
): { success: boolean; limit: number; remaining: number; reset: number } {
  const limit = MODEL_LIMITS.requestsPerMinute;
  const existing = rateBuckets.get(key);

  if (!existing || existing.reset <= now) {
    const reset = now + 60_000;
    rateBuckets.set(key, { count: 1, reset });
    return { success: true, limit, remaining: limit - 1, reset };
  }

  existing.count += 1;
  rateBuckets.set(key, existing);
  return {
    success: existing.count <= limit,
    limit,
    remaining: Math.max(0, limit - existing.count),
    reset: existing.reset,
  };
}

export function requestClientKey(request: {
  headers: { get(name: string): string | null };
}): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    forwarded ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

export function takeCompleteLines(
  buffer: string,
  chunk: string
): { rest: string; lines: string[] } {
  const merged = buffer + chunk;
  const parts = merged.split("\n");
  const rest = parts.pop() ?? "";
  return { rest, lines: parts };
}

export function deltaFromModelLine(line: string): string {
  const trimmed = line.trim();
  const payload = trimmed.startsWith("data:") ? trimmed.slice(5).trim() : trimmed;
  if (!payload || payload === "[DONE]") return "";
  try {
    const parsed = JSON.parse(payload) as {
      response?: unknown;
      content?: unknown;
      choices?: Array<{ delta?: { content?: unknown } }>;
    };
    const choice = parsed.choices?.[0]?.delta?.content;
    if (typeof choice === "string") return choice;
    if (typeof parsed.response === "string") return parsed.response;
    if (typeof parsed.content === "string") return parsed.content;
    return "";
  } catch {
    return "";
  }
}

export async function* readSseContent(stream: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let rest = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const taken = takeCompleteLines(rest, decoder.decode(value, { stream: true }));
      rest = taken.rest;
      for (const line of taken.lines) {
        const content = deltaFromModelLine(line);
        if (content) yield content;
      }
    }

    const flushed = takeCompleteLines(rest, `${decoder.decode()}\n`);
    for (const line of flushed.lines) {
      const content = deltaFromModelLine(line);
      if (content) yield content;
    }
  } finally {
    reader.releaseLock();
  }
}
