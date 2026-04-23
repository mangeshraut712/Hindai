/**
 * Gemma 4 AI Integration for Hind AI
 *
 * Kaggle Competition: Gemma 4 - The Future of AI is Yours to Shape
 * Track: Future of Education + Digital Equity
 *
 * This module uses Gemma 4 via Ollama for local AI inference.
 * No external AI APIs (Gemini, OpenAI, etc.) are used.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import {
  getVerse,
  getVersesByScripture,
  scriptures as scriptureData,
  searchVerses,
} from "@/lib/data/scriptures";
import {
  getTranslationLanguageLabel,
  type TranslationLanguage,
} from "@/lib/ai/translation-languages";
import { scriptureCatalog } from "@/lib/scripture-catalog";

export const SUPPORTED_GEMMA_MODELS = [
  "gemma4:latest",
  "gemma4:31b-it-q4_K_M",
] as const;

export type GemmaModel = (typeof SUPPORTED_GEMMA_MODELS)[number];

export const DEFAULT_GEMMA_MODEL: GemmaModel = "gemma4:latest";
export const GEMMA_MODEL = DEFAULT_GEMMA_MODEL;

export function resolveGemmaModel(input: string | undefined): GemmaModel {
  return SUPPORTED_GEMMA_MODELS.includes(input as GemmaModel)
    ? (input as GemmaModel)
    : DEFAULT_GEMMA_MODEL;
}

// Configuration - Gemma 4 via Ollama (Kaggle Competition)
const OLLAMA_URL =
  process.env.OLLAMA_URL ||
  (process.env.VERCEL
    ? "https://ollama-cloud-service.vercel.app"
    : "http://localhost:11434");
const REQUESTED_OLLAMA_MODEL = resolveGemmaModel(process.env.OLLAMA_MODEL);
const USE_CLOUD_OLLAMA = process.env.VERCEL && process.env.OLLAMA_CLOUD_URL;
const CACHE_TTL = 60 * 60 * 24; // 24 hours in seconds

// Schema validation
export const AIResponseSchema = z.object({
  summary: z.string().optional(),
  explanation: z.string(),
  context: z.string().optional(),
  keyTerms: z
    .array(
      z.object({
        term: z.string(),
        meaning: z.string(),
        sanskrit: z.string().optional(),
      }),
    )
    .optional(),
  references: z
    .array(
      z.object({
        scripture: z.string(),
        chapter: z.number(),
        verse: z.number(),
      }),
    )
    .optional(),
  learningObjectives: z.array(z.string()).optional(),
  followUpQuestions: z.array(z.string()).optional(),
  practice: z.string().optional(),
  confidence: z.enum(["high", "medium", "low"]).optional(),
  caution: z.string().optional(),
  commonGround: z.array(z.string()).optional(),
  differences: z
    .array(
      z.object({
        topic: z.string(),
        insight: z.string(),
      }),
    )
    .optional(),
  classroomUse: z.array(z.string()).optional(),
  lessonPlan: z
    .object({
      audience: z.enum(["student", "teacher"]),
      title: z.string(),
      objectives: z.array(z.string()),
      steps: z.array(
        z.object({
          step: z.number(),
          title: z.string(),
          activity: z.string(),
          outcome: z.string(),
        }),
      ),
      assignment: z.string().optional(),
    })
    .optional(),
  recommendedReading: z
    .array(
      z.object({
        title: z.string(),
        reason: z.string(),
        href: z.string().optional(),
      }),
    )
    .optional(),
});

export type AIResponse = z.infer<typeof AIResponseSchema>;

export interface AIQuery {
  query: string;
  scriptureId?: string;
  compareScriptureIds?: string[];
  chapter?: number;
  verse?: number;
  language?: "en" | "hi" | "sa";
  mode?: "explain" | "compare";
  audience?: "general" | "student" | "teacher";
  stream?: boolean;
}

type MemoryRateLimitEntry = {
  count: number;
  reset: number;
};

export type GroundingVerse = {
  id: string;
  scriptureId: string;
  scripture: string;
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  translation: string;
  commentary?: string;
  whyRelevant: string;
};

export type GroundingScripture = {
  slug: string;
  title: string;
  category: string;
  href: string;
  description: string;
  whyRelevant: string;
};

export type GroundingPacket = {
  verses: GroundingVerse[];
  scriptures: GroundingScripture[];
};

const hasRedisConfig = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

const memoryState = globalThis as typeof globalThis & {
  __hindaiMemoryCache?: Map<string, { value: AIResponse; expiresAt: number }>;
  __hindaiMemoryRateLimit?: Map<string, MemoryRateLimitEntry>;
  __hindaiOllamaModels?: { names: string[]; checkedAt: number };
};

const memoryCache =
  memoryState.__hindaiMemoryCache ??
  (memoryState.__hindaiMemoryCache = new Map());
const memoryRateLimit =
  memoryState.__hindaiMemoryRateLimit ??
  (memoryState.__hindaiMemoryRateLimit = new Map());

// Initialize Redis for caching only when credentials are available.
const redis = hasRedisConfig
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

// Initialize rate limiter when Upstash is configured.
const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 requests per minute
      analytics: true,
    })
  : null;

// Gemma 4 is loaded via Ollama locally - no API keys needed
// To setup: ollama pull gemma4:4b

async function isOllamaAvailable(): Promise<boolean> {
  const availableModels = await getAvailableOllamaModels();
  return availableModels.length > 0;
}

async function getAvailableOllamaModels(): Promise<string[]> {
  const cached = memoryState.__hindaiOllamaModels;
  if (cached && Date.now() - cached.checkedAt < 10_000) {
    return cached.names;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch(`${OLLAMA_URL}/api/tags`, {
      method: "GET",
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as {
      models?: Array<{ name?: string; model?: string }>;
    };
    const names = (data.models || [])
      .flatMap((model) => [model.name, model.model])
      .filter((value): value is string => Boolean(value));

    memoryState.__hindaiOllamaModels = {
      names,
      checkedAt: Date.now(),
    };

    return names;
  } catch {
    return [];
  } finally {
    clearTimeout(timeoutId);
  }
}

async function resolveOllamaModel(): Promise<string> {
  const availableModels = await getAvailableOllamaModels();

  if (availableModels.includes(DEFAULT_GEMMA_MODEL)) {
    return DEFAULT_GEMMA_MODEL;
  }

  if (availableModels.includes(REQUESTED_OLLAMA_MODEL)) {
    return REQUESTED_OLLAMA_MODEL;
  }

  const supportedInstalledModel = SUPPORTED_GEMMA_MODELS.find((model) =>
    availableModels.includes(model),
  );

  return supportedInstalledModel || REQUESTED_OLLAMA_MODEL;
}

async function resolveGemmaBackend(): Promise<"local" | "cloud" | "none"> {
  // For Kaggle competition: Gemma 4 via Ollama (local or cloud)
  // No external AI APIs used - only Ollama instances allowed

  if (USE_CLOUD_OLLAMA) {
    // Vercel deployment: Use cloud Ollama service
    return (await isOllamaAvailable()) ? "cloud" : "none";
  } else {
    // Local development: Use local Ollama
    return (await isOllamaAvailable()) ? "local" : "none";
  }
}

export function getCacheBackend(): "upstash" | "memory" {
  return hasRedisConfig ? "upstash" : "memory";
}

/**
 * System prompt for scripture analysis - OPTIMIZED for speed
 */
const SYSTEM_PROMPT = `You are "Hind AI", a digital scholar of Ancient Indian Scriptures.

Provide concise analysis in JSON format with this structure:
{
  "explanation": "Main explanation (1-2 paragraphs)",
  "summary": "Brief summary (20-30 words)",
  "keyTerms": [{"term": "English", "meaning": "Definition", "sanskrit": "Sanskrit"}]
}

Keep responses focused and under 400 words.`;

const STREAMING_SYSTEM_PROMPT = `You are Hind AI, a concise guide to Indian scriptures.

Reply in plain text, not JSON.
Keep the answer under 180 words.
Lead with the direct answer, then add grounding references from the provided notes when they are available.
If the notes are sparse, say so briefly instead of inventing details.`;

function parseGemmaJsonResponse(resultText: string): AIResponse {
  const keyedObject = extractParsableObjectByKey(resultText, "explanation");
  if (keyedObject) {
    return AIResponseSchema.parse(keyedObject);
  }

  const candidates = [
    resultText.trim(),
    extractFencedJson(resultText),
    extractJsonObject(resultText),
  ].filter((value): value is string => Boolean(value));

  for (const candidate of candidates) {
    try {
      return AIResponseSchema.parse(JSON.parse(candidate));
    } catch {
      // Try the next candidate.
    }
  }

  return {
    explanation: normalizePlainText(resultText),
  };
}

function extractFencedJson(input: string): string | null {
  const match = input.match(/```json\s*([\s\S]*?)```/i);
  return match?.[1]?.trim() || null;
}

function extractJsonObject(input: string): string | null {
  const start = input.indexOf("{");
  const end = input.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    return null;
  }

  return input.slice(start, end + 1).trim();
}

function extractParsableObjectByKey(
  input: string,
  key: string,
): Record<string, unknown> | null {
  const keyToken = `"${key}"`;
  let keyIndex = input.lastIndexOf(keyToken);

  while (keyIndex !== -1) {
    let start = input.lastIndexOf("{", keyIndex);

    while (start !== -1) {
      const candidate = input.slice(start).trim();

      try {
        const parsed = JSON.parse(candidate);
        if (parsed && typeof parsed === "object" && key in parsed) {
          return parsed as Record<string, unknown>;
        }
      } catch {
        // Try an earlier object boundary.
      }

      start = input.lastIndexOf("{", start - 1);
    }

    keyIndex = input.lastIndexOf(keyToken, keyIndex - 1);
  }

  return null;
}

function normalizePlainText(input: string): string {
  return input
    .replace(/```json|```/gi, "")
    .replace(/^\s*\*\s+/gm, "")
    .trim();
}

function parseOllamaStreamLine(line: string): string | null {
  const parsed = JSON.parse(line) as {
    error?: unknown;
    response?: unknown;
    message?: { content?: unknown };
  };

  if (typeof parsed.error === "string" && parsed.error.trim()) {
    throw new Error(parsed.error);
  }

  if (typeof parsed.response === "string") {
    return parsed.response;
  }

  if (parsed.message && typeof parsed.message.content === "string") {
    return parsed.message.content;
  }

  return null;
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]+/gu, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);
}

function buildGroundingPacket(query: AIQuery): GroundingPacket {
  const tokens = tokenize(query.query);
  const verseCandidates = new Map<
    string,
    {
      score: number;
      whyRelevant: string[];
      verse: ReturnType<typeof searchVerses>[number];
    }
  >();

  if (query.scriptureId) {
    for (const verse of getVersesByScripture(query.scriptureId)) {
      verseCandidates.set(verse.id, {
        verse,
        score: 6,
        whyRelevant: ["Matches the selected scripture"],
      });
    }
  }

  for (const compareId of query.compareScriptureIds || []) {
    for (const verse of getVersesByScripture(compareId)) {
      const entry = verseCandidates.get(verse.id) || {
        verse,
        score: 0,
        whyRelevant: [],
      };

      entry.score += 10;
      entry.whyRelevant.push(`Selected for compare mode: ${compareId}`);
      verseCandidates.set(verse.id, entry);
    }
  }

  if (query.chapter && query.verse && query.scriptureId) {
    const exactVerse = getVerse(query.scriptureId, query.chapter, query.verse);
    if (exactVerse) {
      verseCandidates.set(exactVerse.id, {
        verse: exactVerse,
        score: 20,
        whyRelevant: ["Exact chapter and verse match"],
      });
    }
  }

  for (const verse of searchVerses(query.query)) {
    const entry = verseCandidates.get(verse.id) || {
      verse,
      score: 0,
      whyRelevant: [],
    };

    entry.score += 8;
    entry.whyRelevant.push("Text or key terms matched the user query");
    verseCandidates.set(verse.id, entry);
  }

  for (const entry of verseCandidates.values()) {
    const haystack = [
      entry.verse.translation.en,
      entry.verse.transliteration,
      entry.verse.sanskrit,
      entry.verse.commentary || "",
      entry.verse.keyTerms.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    for (const token of tokens) {
      if (haystack.includes(token)) {
        entry.score += 1;
      }
    }
  }

  const groundedVerses = [...verseCandidates.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ verse, whyRelevant }) => {
      const scripture = scriptureData.find(
        (item) => item.id === verse.scriptureId,
      );
      return {
        id: verse.id,
        scriptureId: verse.scriptureId,
        scripture: scripture?.name || verse.scriptureId,
        chapter: verse.chapter,
        verse: verse.verse,
        sanskrit: verse.sanskrit,
        transliteration: verse.transliteration,
        translation: verse.translation.en,
        commentary: verse.commentary,
        whyRelevant: whyRelevant[0] || "Relevant to the query",
      };
    });

  const groundedScriptures = scriptureCatalog
    .map((item) => {
      const haystack =
        `${item.name} ${item.sanskrit} ${item.description} ${item.highlight} ${(item.keyConcepts || []).join(" ")}`.toLowerCase();
      const isPrimary = query.scriptureId === item.slug;
      const isCompare = (query.compareScriptureIds || []).includes(item.slug);
      let score = isPrimary ? 10 : isCompare ? 12 : 0;
      const reasons: string[] = [];

      if (isPrimary) {
        reasons.push("Matches the selected scripture");
      } else if (isCompare) {
        reasons.push("Selected for compare mode");
      }

      for (const token of tokens) {
        if (haystack.includes(token)) {
          score += 1;
        }
      }

      if (score === 0) {
        return null;
      }

      if (!reasons.length) {
        reasons.push("Concepts in this text overlap with the query");
      }

      return {
        slug: item.slug,
        title: item.name,
        category: item.category,
        href: item.href,
        description: item.description,
        whyRelevant: reasons[0],
        score,
      };
    })
    .filter(
      (
        item,
      ): item is GroundingScripture & {
        score: number;
      } => Boolean(item),
    )
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ score: _score, ...item }) => item);

  return {
    verses: groundedVerses,
    scriptures: groundedScriptures,
  };
}

function groundingPacketToPrompt(packet: GroundingPacket): string {
  if (!packet.verses.length && !packet.scriptures.length) {
    return "No local grounding packet was found for this query.";
  }

  const verseBlock = packet.verses
    .map(
      (verse) => `- ${verse.scripture} ${verse.chapter}.${verse.verse}
  Why relevant: ${verse.whyRelevant}
  Sanskrit: ${verse.sanskrit}
  Transliteration: ${verse.transliteration}
  Translation: ${verse.translation}
  Commentary: ${verse.commentary || "None"}`,
    )
    .join("\n");

  const scriptureBlock = packet.scriptures
    .map(
      (scripture) => `- ${scripture.title} (${scripture.category})
  Why relevant: ${scripture.whyRelevant}
  Description: ${scripture.description}
  Href: ${scripture.href}`,
    )
    .join("\n");

  return `Grounding packet:
Relevant verses:
${verseBlock || "- None"}

Relevant scripture shelves:
${scriptureBlock || "- None"}

Rules:
- Prefer references from the grounding packet or explicit verse input.
- Do not invent exact chapter/verse citations beyond the packet unless the user explicitly provided them.
- If the grounding packet is sparse, set confidence to medium or low and explain the limitation in caution.`;
}

function groundingPacketToStreamingPrompt(packet: GroundingPacket): string {
  const verseBlock = packet.verses
    .slice(0, 2)
    .map(
      (verse) => `- ${verse.scripture} ${verse.chapter}.${verse.verse}: ${verse.translation}`,
    )
    .join("\n");

  const scriptureBlock = packet.scriptures
    .slice(0, 2)
    .map(
      (scripture) =>
        `- ${scripture.title}: ${scripture.description} (${scripture.whyRelevant})`,
    )
    .join("\n");

  return `Grounding notes:
Verses:
${verseBlock || "- None"}

Scriptures:
${scriptureBlock || "- None"}`;
}

/**
 * Generate cache key for query
 */
function generateCacheKey(query: AIQuery): string {
  const key = `ai:v2:${query.scriptureId || "general"}:${query.chapter || 0}:${query.verse || 0}:${query.query}:${query.language || "en"}`;
  return key.replace(/\s+/g, "_").slice(0, 200);
}

/**
 * Check rate limit for user
 */
async function checkRateLimit(userId: string): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  if (!ratelimit) {
    const now = Date.now();
    const existing = memoryRateLimit.get(userId);

    if (!existing || existing.reset <= now) {
      const reset = now + 60_000;
      memoryRateLimit.set(userId, { count: 1, reset });
      return {
        success: true,
        limit: 10,
        remaining: 9,
        reset,
      };
    }

    existing.count += 1;
    memoryRateLimit.set(userId, existing);

    return {
      success: existing.count <= 10,
      limit: 10,
      remaining: Math.max(0, 10 - existing.count),
      reset: existing.reset,
    };
  }

  const { success, limit, remaining, reset } = await ratelimit.limit(userId);
  return { success, limit, remaining, reset };
}

/**
 * Get cached response
 */
async function getCachedResponse(key: string): Promise<AIResponse | null> {
  if (!redis) {
    const cached = memoryCache.get(key);
    if (!cached) {
      return null;
    }

    if (cached.expiresAt <= Date.now()) {
      memoryCache.delete(key);
      return null;
    }

    return cached.value;
  }

  try {
    const cached = await redis.get<string>(key);
    if (cached) {
      return JSON.parse(cached);
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Cache response
 */
async function cacheResponse(key: string, response: AIResponse): Promise<void> {
  if (!redis) {
    memoryCache.set(key, {
      value: response,
      expiresAt: Date.now() + CACHE_TTL * 1000,
    });
    return;
  }

  try {
    await redis.setex(key, CACHE_TTL, JSON.stringify(response));
  } catch (error) {
    console.error("Cache error:", error);
  }
}

/**
 * Generate AI explanation with caching and rate limiting
 */
export async function generateExplanation(
  query: AIQuery,
  userId: string = "anonymous",
): Promise<{
  response: AIResponse;
  cached: boolean;
  grounding: GroundingPacket;
  rateLimit: { remaining: number; reset: number };
}> {
  // Check rate limit
  const rateLimitCheck = await checkRateLimit(userId);
  if (!rateLimitCheck.success) {
    throw new Error(
      `Rate limit exceeded. Try again in ${Math.ceil((rateLimitCheck.reset - Date.now()) / 1000)} seconds.`,
    );
  }

  // Check cache
  const cacheKey = generateCacheKey(query);
  const cached = await getCachedResponse(cacheKey);
  const grounding = buildGroundingPacket(query);
  if (cached) {
    return {
      response: cached,
      cached: true,
      grounding,
      rateLimit: {
        remaining: rateLimitCheck.remaining,
        reset: rateLimitCheck.reset,
      },
    };
  }

  // Build prompt
  const userPrompt = buildPrompt(query, grounding);

  try {
    let resultText = "";
    const backend = await resolveGemmaBackend();

    if (backend === "local" || backend === "cloud") {
      resultText = await generateWithOllama(userPrompt);
    } else {
      throw new Error(
        "Gemma 4 via Ollama is not available. For local development, run: ollama pull gemma4:latest && ollama serve",
      );
    }

    const validated = parseGemmaJsonResponse(resultText);

    // Cache the response
    await cacheResponse(cacheKey, validated);

    return {
      response: validated,
      cached: false,
      grounding,
      rateLimit: {
        remaining: rateLimitCheck.remaining,
        reset: rateLimitCheck.reset,
      },
    };
  } catch (error) {
    console.error("Gemma 4 generation error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to generate AI explanation",
    );
  }
}

/**
 * Generate streaming explanation
 */
export async function* generateExplanationStream(
  query: AIQuery,
  userId: string = "anonymous",
): AsyncGenerator<string, void, unknown> {
  // Check rate limit
  const rateLimitCheck = await checkRateLimit(userId);
  if (!rateLimitCheck.success) {
    throw new Error("Rate limit exceeded");
  }

  try {
    const backend = await resolveGemmaBackend();
    const grounding = buildGroundingPacket(query);
    const userPrompt = buildStreamingPrompt(query, grounding);
    const model = await resolveOllamaModel();

    if (backend === "local" || backend === "cloud") {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120_000); // 120s for local model load

      try {
        const response = await fetch(`${OLLAMA_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            model,
            think: false,
            stream: true,
            messages: [
              {
                role: "system",
                content: STREAMING_SYSTEM_PROMPT,
              },
              {
                role: "user",
                content: userPrompt,
              },
            ],
            options: {
              num_predict: 160,
              temperature: 0.5,
              top_k: 40,
              top_p: 0.9,
              repeat_penalty: 1.0, // Prevent repetition
            },
          }),
        });

        if (!response.ok) {
          const errorText = await response.text().catch(() => "Unknown error");
          console.error(
            "Ollama streaming failure:",
            response.status,
            errorText,
          );
          throw new Error(`Ollama streaming failed: ${response.status}`);
        }

        if (!response.body) throw new Error("No response body from Ollama");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let hasYieldedText = false;

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            // Flush any remaining buffer content
            if (buffer.trim()) {
              try {
                const chunk = parseOllamaStreamLine(buffer.trim());
                if (chunk !== null) {
                  hasYieldedText ||= chunk.trim().length > 0;
                  yield chunk;
                }
              } catch (error) {
                if (error instanceof SyntaxError) {
                // ignore incomplete final chunk
                  break;
                }
                throw error;
              }
            }
            break;
          }

          if (value) {
            buffer += decoder.decode(value, { stream: true });
            const parts = buffer.split("\n");
            buffer = parts.pop() ?? "";

            for (const line of parts) {
              const trimmed = line.trim();
              if (!trimmed) continue;
              try {
                const chunk = parseOllamaStreamLine(trimmed);
                if (chunk !== null) {
                  hasYieldedText ||= chunk.trim().length > 0;
                  yield chunk;
                }
              } catch (error) {
                if (error instanceof SyntaxError) {
                // Ignore partial JSON parsing errors
                  continue;
                }
                throw error;
              }
            }
          }
        }

        if (!hasYieldedText) {
          const fallbackText = await generateWithOllama(userPrompt);
          const fallbackResponse = parseGemmaJsonResponse(fallbackText);
          yield fallbackResponse.explanation || normalizePlainText(fallbackText);
        }
      } finally {
        clearTimeout(timeoutId);
      }
    } else {
      throw new Error(
        "Gemma 4 via Ollama is not available. Please run: ollama pull gemma4:latest && ollama serve",
      );
    }
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      console.warn("Model connection timed out after 120s.");
      throw new Error("The scholarly analysis is taking longer than usual. Please ensure your local server has enough resources for the model.");
    } else {
      console.error("Streaming error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("I apologize, but I'm having trouble connecting to the AI service. Please try again in a moment.");
    }
  }
}

/**
 * Build prompt from query
 */
function buildPrompt(query: AIQuery, grounding: GroundingPacket): string {
  let prompt = query.query;

  if (query.scriptureId) {
    prompt += `\n\nScripture: ${query.scriptureId}`;
  }
  if (query.chapter) {
    prompt += `\nChapter: ${query.chapter}`;
  }
  if (query.verse) {
    prompt += `\nVerse: ${query.verse}`;
  }
  if (query.language && query.language !== "en") {
    prompt += `\n\nPlease provide the response in ${query.language === "hi" ? "Hindi" : "Sanskrit/English"}.`;
  }

  if (query.mode === "compare" && query.compareScriptureIds?.length) {
    prompt += `\n\nCompare mode is enabled. Compare these scripture shelves: ${query.compareScriptureIds.join(", ")}.`;
    prompt +=
      "\nFocus on shared themes, key differences, and where a student or teacher should begin reading.";
  }

  if (query.audience && query.audience !== "general") {
    prompt += `\n\nAudience: ${query.audience}. Tailor the response for ${query.audience} use.`;
    prompt +=
      "\nInclude a concrete lessonPlan object for that audience with clear objectives, 3-4 steps, and an assignment when useful.";
  }

  return `${prompt}\n\n${groundingPacketToPrompt(grounding)}`;
}

function buildStreamingPrompt(query: AIQuery, grounding: GroundingPacket): string {
  let prompt = `User request: ${query.query}`;

  if (query.scriptureId) {
    prompt += `\nSelected scripture: ${query.scriptureId}`;
  }
  if (query.chapter) {
    prompt += `\nChapter: ${query.chapter}`;
  }
  if (query.verse) {
    prompt += `\nVerse: ${query.verse}`;
  }
  if (query.mode === "compare" && query.compareScriptureIds?.length) {
    prompt += `\nCompare these scriptures: ${query.compareScriptureIds.join(", ")}`;
  }
  if (query.audience && query.audience !== "general") {
    prompt += `\nAudience: ${query.audience}`;
  }

  return `${prompt}\n\n${groundingPacketToStreamingPrompt(grounding)}`;
}

/**
 * Get AI service status
 */
export const getAIStatus = checkGemmaAvailability;

export async function checkGemmaAvailability(): Promise<{
  available: boolean;
  type: string;
  model: string;
  cacheBackend?: string;
  rateLimitRemaining?: number;
  error?: string;
}> {
  const backend = await resolveGemmaBackend();
  const model = backend === "none" ? "none" : await resolveOllamaModel();

  if (backend === "none") {
    return {
      available: false,
      type: "none",
      model: "none",
      error:
        "Gemma 4 via Ollama is not available. Please run: ollama pull gemma4:latest",
    };
  }

  try {
    if (ratelimit) {
      const { remaining } = await ratelimit.limit("healthcheck");
      return {
        available: true,
        type: backend,
        model,
        cacheBackend: getCacheBackend(),
        rateLimitRemaining: remaining,
      };
    }
    return {
      available: true,
      type: "ollama",
      model,
      cacheBackend: getCacheBackend(),
    };
  } catch {
    return {
      available: false,
      type: "none",
      model,
      cacheBackend: getCacheBackend(),
    };
  }
}

/**
 * Helper for Ollama generation
 */
async function generateWithOllama(prompt: string): Promise<string> {
  const model = await resolveOllamaModel();
  const response = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      think: false,
      stream: false,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      options: {
        num_predict: 220,
        temperature: 0.55,
        top_k: 40,
        top_p: 0.9,
      },
    }),
  });

  if (!response.ok) throw new Error(`Ollama error: ${response.statusText}`);
  const data = await response.json();
  return data?.message?.content || data?.response || "";
}

/**
 * Translate Sanskrit text
 */
export async function translateSanskrit(
  sanskrit: string,
  targetLang: TranslationLanguage = "en",
): Promise<{ translation: string; transliteration: string }> {
  const targetLanguageLabel = getTranslationLanguageLabel(targetLang);
  const prompt = `Translate this Indic scripture text to natural ${targetLanguageLabel}.
Keep the translation faithful, readable, and culturally respectful for modern readers of ${targetLanguageLabel}.
If the target language is an Indian language, write it in that language's standard script.
Provide:
1. Translation
2. Transliteration in Latin script when the source is written in Devanagari or Sanskrit script

Source text: ${sanskrit}

Response format (JSON):
{
  "translation": "Translated text",
  "transliteration": "Romanized form or the original text when transliteration is not needed"
}`;

  try {
    const backend = await resolveGemmaBackend();

    if (backend === "local" || backend === "cloud") {
      const model = await resolveOllamaModel();
      const response = await fetch(`${OLLAMA_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          prompt,
          stream: false,
          format: "json",
          options: {
            num_predict: 220,
            temperature: 0.35,
            top_k: 40,
            top_p: 0.9,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama error: ${response.statusText}`);
      }

      const data = (await response.json()) as { response?: string };
      const resultText = data.response || "";

      return {
        ...(() => {
          try {
            const parsed = JSON.parse(resultText);
            return {
              translation: parsed.translation || "Translation unavailable",
              transliteration: parsed.transliteration || sanskrit,
            };
          } catch {
            return {
              translation:
                normalizePlainText(resultText) || "Translation unavailable",
              transliteration: sanskrit,
            };
          }
        })(),
      };
    } else {
      throw new Error(
        "Gemma 4 via Ollama is not available. For local development: ollama pull gemma4:latest && ollama serve",
      );
    }
  } catch (error) {
    console.error("Translation error:", error);
    return {
      translation: "[Translation failed - please try again]",
      transliteration: sanskrit,
    };
  }
}
