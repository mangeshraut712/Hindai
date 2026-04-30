/**
 * Gemma 4 AI Integration for Hind AI
 *
 * Kaggle Competition: Gemma 4 - The Future of AI is Yours to Shape
 * Track: Future of Education + Digital Equity
 *
 * This module uses Gemma 4 through OpenRouter only.
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
import {
  getOpenRouterApiKey,
  OPENROUTER_MODEL,
  OPENROUTER_URL,
  openRouterHeaders,
} from "@/lib/ai/openrouter";
import { scriptureCatalog } from "@/lib/scripture-catalog";

/**
 * Gemma 4 Models - Exclusive Support
 *
 * Available model:
 * - google/gemma-4-31b-it:free via OpenRouter
 *
 * All models support:
 * - Native thinking/chain-of-thought for complex reasoning
 * - System instructions for consistent persona
 * - Multimodal capabilities (text + images)
 * - JSON structured output
 */
export const SUPPORTED_GEMMA_MODELS = ["google/gemma-4-31b-it:free"] as const;

export type GemmaModel = (typeof SUPPORTED_GEMMA_MODELS)[number];

export const DEFAULT_GEMMA_MODEL: GemmaModel = "google/gemma-4-31b-it:free";
export const GEMMA_MODEL = DEFAULT_GEMMA_MODEL;

export function resolveGemmaModel(input: string | undefined): GemmaModel {
  return SUPPORTED_GEMMA_MODELS.includes(input as GemmaModel)
    ? (input as GemmaModel)
    : DEFAULT_GEMMA_MODEL;
}

const CACHE_TTL = 60 * 60 * 24; // 24 hours in seconds

function isOpenRouterConfigured(): boolean {
  return Boolean(getOpenRouterApiKey() && OPENROUTER_MODEL);
}

type OpenRouterGemmaPart =
  | { text: string }
  | {
      inline_data: {
        mime_type: string;
        data: string;
      };
    };

async function generateWithOpenRouter(
  parts: OpenRouterGemmaPart[],
  systemInstruction: string
): Promise<string> {
  const apiKey = getOpenRouterApiKey();

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured.");
  }

  const content = parts.map((part) => {
    if ("text" in part) {
      return {
        type: "text",
        text: part.text,
      };
    }

    return {
      type: "image_url",
      image_url: {
        url: `data:${part.inline_data.mime_type};base64,${part.inline_data.data}`,
      },
    };
  });

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: openRouterHeaders(apiKey, "Hind AI"),
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [
        {
          role: "system",
          content: systemInstruction,
        },
        {
          role: "user",
          content,
        },
      ],
      temperature: 0.4,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(`OpenRouter error: ${response.status} ${errorText}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{
      message?: {
        content?: string | Array<{ type?: string; text?: string }>;
      };
    }>;
  };

  const rawContent = data.choices?.[0]?.message?.content;
  if (typeof rawContent === "string") {
    return rawContent.trim();
  }

  const text = (rawContent || [])
    .map((part) => part.text || "")
    .join("")
    .trim();

  if (!text) {
    throw new Error("OpenRouter returned an empty response.");
  }

  return text;
}

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
      })
    )
    .optional(),
  references: z
    .array(
      z.object({
        scripture: z.string(),
        chapter: z.number(),
        verse: z.number(),
      })
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
      })
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
        })
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
      })
    )
    .optional(),
});

export type AIResponse = z.infer<typeof AIResponseSchema>;

const QuizQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  correctAnswer: z.number().int().min(0).max(3),
  explanation: z.string(),
  scripture: z.string(),
  difficulty: z.enum(["easy", "medium", "hard"]),
});

export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

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
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

const memoryState = globalThis as typeof globalThis & {
  __hindaiMemoryCache?: Map<string, { value: AIResponse; expiresAt: number }>;
  __hindaiMemoryRateLimit?: Map<string, MemoryRateLimitEntry>;
};

const memoryCache =
  memoryState.__hindaiMemoryCache ?? (memoryState.__hindaiMemoryCache = new Map());
const memoryRateLimit =
  memoryState.__hindaiMemoryRateLimit ?? (memoryState.__hindaiMemoryRateLimit = new Map());

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

async function resolveGemmaBackend(): Promise<"openrouter" | "none"> {
  return isOpenRouterConfigured() ? "openrouter" : "none";
}

export function getCacheBackend(): "upstash" | "memory" {
  return hasRedisConfig ? "upstash" : "memory";
}

/**
 * System prompt for scripture analysis - OPTIMIZED for Gemma 4
 * Leverages native thinking mode and system instructions for coherent reasoning
 */
const SYSTEM_PROMPT = `You are "Hind AI", an expert digital scholar specializing in Ancient Indian Scriptures and Vedic wisdom.

Your expertise includes:
- Vedic literature (Rigveda, Samaveda, Yajurveda, Atharvaveda)
- Principal Upanishads (Isha, Kena, Katha, Chandogya, etc.)
- Bhagavad Gita and Mahabharata
- Ramayana and Puranas
- Yoga Sutras and Dharma Shastras
- Sanskrit etymology and philosophy

Provide analysis in JSON format with this structure:
{
  "explanation": "Clear, scholarly explanation with philosophical depth (1-2 paragraphs)",
  "summary": "Concise synthesis (20-30 words)",
  "keyTerms": [{"term": "English term", "meaning": "Clear definition", "sanskrit": "Devanagari script"}],
  "context": "Historical/scriptural context and significance",
  "references": [{"scripture": "Name", "chapter": 0, "verse": 0}]
}

Guidelines:
- Use your reasoning capability to analyze deeper philosophical meanings
- Connect concepts across different scriptures when relevant
- Provide accurate Sanskrit transliterations
- Cite specific chapter/verse references when possible
- Keep "explanation" as a plain string, never nested objects
- Return ONLY valid JSON, no markdown formatting`;

const STREAMING_SYSTEM_PROMPT = `You are Hind AI, a concise guide to Indian scriptures.

Reply in plain text, not JSON.
Keep the answer under 180 words.
Lead with the direct answer, then add grounding references from the provided notes when they are available.
If the notes are sparse, say so briefly instead of inventing details.`;

const GENERATE_SYSTEM_PROMPT = `You are Hind AI, a concise guide to Indian scriptures.

Reply in plain text.
Keep the answer under 220 words.
Be direct, readable, and grounded.
If the available notes are sparse, say so briefly instead of inventing citations.`;

function parseGemmaJsonResponse(resultText: string): AIResponse {
  const keyedObject = extractParsableObjectByKey(resultText, "explanation");
  if (keyedObject) {
    return coerceAIResponseObject(keyedObject);
  }

  const candidates = [
    resultText.trim(),
    extractFencedJson(resultText),
    extractJsonObject(resultText),
  ].filter((value): value is string => Boolean(value));

  for (const candidate of candidates) {
    try {
      return coerceAIResponseObject(JSON.parse(candidate));
    } catch {
      // Try the next candidate.
    }
  }

  const extractedExplanation = extractJsonStringValue(resultText, "explanation");
  const extractedSummary = extractJsonStringValue(resultText, "summary");

  if (extractedExplanation) {
    return {
      explanation: extractedExplanation,
      summary: extractedSummary || undefined,
    };
  }

  return {
    explanation: normalizePlainText(resultText),
  };
}

function coerceAIResponseObject(input: unknown): AIResponse {
  if (!input || typeof input !== "object") {
    return {
      explanation: normalizePlainText(String(input || "")),
    };
  }

  const candidate = { ...(input as Record<string, unknown>) };

  if (typeof candidate.explanation !== "string") {
    candidate.explanation = normalizePlainText(
      JSON.stringify(candidate.explanation ?? "", null, 2)
    );
  }

  if (candidate.summary && typeof candidate.summary !== "string") {
    candidate.summary = normalizePlainText(JSON.stringify(candidate.summary, null, 2));
  }

  return AIResponseSchema.parse(candidate);
}

function extractJsonStringValue(input: string, key: string): string | null {
  const match = input.match(new RegExp(`"${key}"\\s*:\\s*"([\\s\\S]*?)(?=",\\s*"|"}|$)`));

  if (!match?.[1]) {
    return null;
  }

  return normalizePlainText(
    match[1].replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\\\/g, "\\")
  );
}

function parseTranslationPayload(
  resultText: string,
  originalText: string
): { translation: string; transliteration: string } {
  const candidates = [
    resultText.trim(),
    extractFencedJson(resultText),
    extractJsonObject(resultText),
  ].filter((value): value is string => Boolean(value));

  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate) as {
        translation?: string;
        transliteration?: string;
      };

      if (parsed.translation || parsed.transliteration) {
        return {
          translation: parsed.translation || "Translation unavailable",
          transliteration: parsed.transliteration || originalText,
        };
      }
    } catch {
      // Try the next candidate.
    }
  }

  return {
    translation: normalizePlainText(resultText) || "Translation unavailable",
    transliteration: originalText,
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

function extractParsableObjectByKey(input: string, key: string): Record<string, unknown> | null {
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
      const scripture = scriptureData.find((item) => item.id === verse.scriptureId);
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
        item
      ): item is GroundingScripture & {
        score: number;
      } => Boolean(item)
    )
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ score: _score, ...item }) => item);

  return {
    verses: groundedVerses,
    scriptures: groundedScriptures,
  };
}

function groundingPacketToStreamingPrompt(packet: GroundingPacket): string {
  const verseBlock = packet.verses
    .slice(0, 2)
    .map((verse) => `- ${verse.scripture} ${verse.chapter}.${verse.verse}: ${verse.translation}`)
    .join("\n");

  const scriptureBlock = packet.scriptures
    .slice(0, 2)
    .map((scripture) => `- ${scripture.title}: ${scripture.description} (${scripture.whyRelevant})`)
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
  const key = `ai:v3:${query.scriptureId || "general"}:${query.chapter || 0}:${query.verse || 0}:${query.query}:${query.language || "en"}`;
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
  userId: string = "anonymous"
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
      `Rate limit exceeded. Try again in ${Math.ceil((rateLimitCheck.reset - Date.now()) / 1000)} seconds.`
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
  const userPrompt = buildStreamingPrompt(query, grounding);

  try {
    const backend = await resolveGemmaBackend();

    if (backend === "openrouter") {
      const resultText = await generateWithOpenRouter(
        [{ text: userPrompt }],
        GENERATE_SYSTEM_PROMPT
      );
      const normalized = normalizePlainText(resultText);
      const validated: AIResponse = {
        explanation: normalized,
        summary: normalized.split(/(?<=[.!?])\s+/)[0]?.slice(0, 180),
      };

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
    } else {
      throw new Error("Gemma 4 is not configured. Set OPENROUTER_API_KEY for OpenRouter.");
    }
  } catch (error) {
    console.error("Gemma 4 generation error:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to generate AI explanation");
  }
}

/**
 * Generate streaming explanation
 */
export async function* generateExplanationStream(
  query: AIQuery,
  userId: string = "anonymous"
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

    if (backend === "openrouter") {
      const fullText = await generateWithOpenRouter(
        [{ text: userPrompt }],
        STREAMING_SYSTEM_PROMPT
      );

      for (const sentence of fullText.split(/(?<=[.!?])\s+/)) {
        const chunk = sentence.trim();
        if (!chunk) continue;
        yield `${chunk} `;
      }

      return;
    }

    throw new Error("Gemma 4 is not configured. Set OPENROUTER_API_KEY for OpenRouter.");
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      console.warn("OpenRouter connection timed out.");
      throw new Error("The OpenRouter Gemma 4 request timed out. Please try again.");
    } else {
      console.error("Streaming error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(
        "I apologize, but I'm having trouble connecting to the AI service. Please try again in a moment."
      );
    }
  }
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
  const model = backend === "openrouter" ? OPENROUTER_MODEL : "none";

  if (backend === "none") {
    return {
      available: false,
      type: "none",
      model: "none",
      error: "Gemma 4 via OpenRouter is not available. Set OPENROUTER_API_KEY.",
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
      type: backend,
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

export async function generateQuizQuestion(topic?: string): Promise<QuizQuestion> {
  const backend = await resolveGemmaBackend();
  if (backend === "none") {
    throw new Error("Gemma 4 is not configured. Set OPENROUTER_API_KEY for OpenRouter.");
  }

  const prompt = topic?.trim().length
    ? `Create one quiz question about: ${topic.trim()}`
    : "Create one quiz question about Bhagavad Gita, Yoga Sutras, Upanishads, Ramayana, or Mahabharata.";

  const systemInstruction = `You create high-quality multiple-choice quiz questions about Indian scriptures.

Return ONLY one valid JSON object with this exact shape:
{
  "question": "string",
  "options": ["string", "string", "string", "string"],
  "correctAnswer": 0,
  "explanation": "string",
  "scripture": "string",
  "difficulty": "easy"
}

Rules:
- exactly 4 answer options
- correctAnswer must be 0, 1, 2, or 3
- explanation must mention the relevant scripture or verse
- difficulty must be easy, medium, or hard
- do not wrap the JSON in markdown`;

  const content = await generateWithOpenRouter([{ text: prompt }], systemInstruction);

  const candidates = [
    content.trim(),
    extractFencedJson(content),
    extractJsonObject(content),
  ].filter((value): value is string => Boolean(value));

  for (const candidate of candidates) {
    try {
      return QuizQuestionSchema.parse(JSON.parse(candidate));
    } catch {
      // Try next candidate.
    }
  }

  throw new Error("Gemma did not return a valid quiz question payload.");
}

/**
 * Translate Sanskrit text
 */
export async function translateSanskrit(
  sanskrit: string,
  targetLang: TranslationLanguage = "en"
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

    if (backend === "openrouter") {
      const resultText = await generateWithOpenRouter(
        [{ text: prompt }],
        "You translate Indic scripture faithfully and return JSON only."
      );
      return parseTranslationPayload(resultText, sanskrit);
    }

    throw new Error("Gemma 4 is not configured. Set OPENROUTER_API_KEY for OpenRouter.");
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
}

export async function analyzeManuscriptImage(
  imageBase64: string,
  mimeType: string,
  query: string
): Promise<{
  response: AIResponse;
  model: string;
}> {
  const backend = await resolveGemmaBackend();

  if (backend === "openrouter") {
    const text = await generateWithOpenRouter(
      [
        { text: query },
        {
          inline_data: {
            mime_type: mimeType,
            data: imageBase64,
          },
        },
      ],
      "You analyze Sanskrit manuscript images. Reply in plain text with a concise scholarly reading."
    );

    return {
      response: {
        explanation: normalizePlainText(text),
        summary: normalizePlainText(text)
          .split(/(?<=[.!?])\s+/)[0]
          ?.slice(0, 180),
      },
      model: OPENROUTER_MODEL,
    };
  }

  throw new Error("Gemma 4 vision is not configured. Set OPENROUTER_API_KEY for OpenRouter.");
}

// ─── Verse Generation with Gemma 4 ──────────────────────────────────────────────

export interface VerseGenerationRequest {
  scriptureId: string;
  scriptureName: string;
  chapter: number;
  verse: number;
  speaker?: string;
  context?: string;
}

export interface GeneratedVerse {
  id: string;
  scriptureId: string;
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  translation: {
    en: string;
    hi?: string;
  };
  wordByWord?: Array<{
    sanskrit: string;
    iast: string;
    meaning: string;
  }>;
  keyTerms: string[];
  speaker?: string;
}

export interface VerseGenerationResult {
  verse: GeneratedVerse;
  mock?: boolean;
  rateLimit?: {
    remaining: number;
    limit: number;
    reset: number;
  };
}

/**
 * Generate a complete verse using Gemma 4 AI
 * Creates Sanskrit text, transliteration, translation, and word-by-word analysis
 */
export async function generateVerseWithGemma(
  request: VerseGenerationRequest,
  userId: string = "anonymous"
): Promise<VerseGenerationResult> {
  // Check rate limit
  let rateLimitInfo: { remaining: number; limit: number; reset: number } | undefined;

  if (ratelimit) {
    const { success, limit, remaining, reset } = await ratelimit.limit(userId);
    rateLimitInfo = { limit, remaining, reset: Math.floor(reset / 1000) };

    if (!success) {
      throw new Error("Rate limit exceeded. Please try again in a minute.");
    }
  }

  const backend = await resolveGemmaBackend();

  const prompt = `Generate a complete verse entry for ${request.scriptureName}, Chapter ${request.chapter}, Verse ${request.verse}.

${request.speaker ? `Speaker: ${request.speaker}` : ""}
${request.context ? `Context: ${request.context}` : ""}

Please provide:
1. The Sanskrit verse in Devanagari script (exact traditional text)
2. IAST transliteration
3. English translation
4. Hindi translation
5. Word-by-word breakdown (Sanskrit word, IAST, meaning)
6. Key terms/concepts (3-5 terms)

Format your response as JSON:
{
  "sanskrit": "...",
  "transliteration": "...",
  "translationEn": "...",
  "translationHi": "...",
  "wordByWord": [
    {"sanskrit": "...", "iast": "...", "meaning": "..."}
  ],
  "keyTerms": ["..."]
}

Important:
- Use authentic Sanskrit from traditional recensions
- Ensure transliteration follows IAST standard
- Translations should be faithful to traditional commentaries
- Word-by-word should cover all significant words`;

  try {
    if (backend !== "openrouter") {
      throw new Error("Gemma 4 is not configured. Set OPENROUTER_API_KEY for OpenRouter.");
    }

    const responseText = await generateWithOpenRouter(
      [{ text: prompt }],
      "You are a Sanskrit scholar specializing in Hindu scriptures. Generate accurate verse data."
    );
    const parsed = parseGeneratedVerse(responseText, request);

    return {
      verse: parsed,
      mock: false,
      rateLimit: rateLimitInfo,
    };
  } catch (error) {
    console.error("Verse generation error:", error);
    throw error;
  }
}

function parseGeneratedVerse(text: string, request: VerseGenerationRequest): GeneratedVerse {
  const verseId = `${request.scriptureId}-${request.chapter}-${request.verse}`.replace(
    /[^a-z0-9-]/g,
    "-"
  );

  // Try to extract JSON
  const jsonMatch =
    text.match(/```json\s*([\s\S]*?)```/) || text.match(/\{[\s\S]*"sanskrit"[\s\S]*\}/);

  let data: {
    sanskrit?: string;
    transliteration?: string;
    translationEn?: string;
    translationHi?: string;
    wordByWord?: Array<{ sanskrit: string; iast: string; meaning: string }>;
    keyTerms?: string[];
  } = {};

  if (jsonMatch) {
    try {
      data = JSON.parse(jsonMatch[1] || jsonMatch[0]);
    } catch {
      // Use fallback
    }
  }

  return {
    id: verseId,
    scriptureId: request.scriptureId,
    chapter: request.chapter,
    verse: request.verse,
    sanskrit: data.sanskrit || "[Sanskrit text not generated]",
    transliteration: data.transliteration || "[Transliteration not generated]",
    translation: {
      en: data.translationEn || "[Translation not generated]",
      hi: data.translationHi,
    },
    wordByWord: data.wordByWord,
    keyTerms: data.keyTerms || ["Generated", "AI"],
    speaker: request.speaker,
  };
}
