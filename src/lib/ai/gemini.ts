/**
 * Google Gemini API Integration for Hind AI
 * 
 * Production-ready implementation using @google/genai SDK
 * Features: streaming, rate limiting, caching, structured output
 * 
 * @author Hind AI Team
 * @version 1.0.0
 */

import { GoogleGenAI, GenerateContentConfig } from "@google/genai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";

// Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const CACHE_TTL = 60 * 60 * 24; // 24 hours in seconds

// Schema validation
export const AIResponseSchema = z.object({
  explanation: z.string(),
  context: z.string().optional(),
  keyTerms: z.array(
    z.object({
      term: z.string(),
      meaning: z.string(),
      sanskrit: z.string().optional(),
    })
  ).optional(),
  references: z
    .array(
      z.object({
        scripture: z.string(),
        chapter: z.number(),
        verse: z.number(),
      })
    )
    .optional(),
});

export type AIResponse = z.infer<typeof AIResponseSchema>;

export interface AIQuery {
  query: string;
  scriptureId?: string;
  chapter?: number;
  verse?: number;
  language?: "en" | "hi" | "sa";
  stream?: boolean;
}

// Initialize Redis for caching
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

// Initialize rate limiter
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 requests per minute
  analytics: true,
});

// Initialize Gemini AI
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

/**
 * System prompt for scripture analysis
 */
const SYSTEM_PROMPT = `You are Hind AI, an expert scholar of ancient Indian scriptures with deep knowledge of:
- Vedas (Rigveda, Yajurveda, Samaveda, Atharvaveda)
- Upanishads (108 principal texts including Isha, Kena, Katha, Mundaka, Mandukya, Taittiriya, Aitareya, Chandogya, Brihadaranyaka, etc.)
- Epics (Mahabharata, Ramayana)
- Bhagavad Gita (700 verses of spiritual wisdom)
- Puranas (18 major texts including Vishnu Purana, Bhagavata Purana, Shiva Purana, etc.)
- Dharma Shastras (Manu Smriti, Parashara Smriti, Yajnavalkya Smriti)
- Yoga Philosophy (Yoga Sutras, Yoga Vasishtha, Hatha Yoga Pradipika)
- Vedanta Philosophy (Advaita, Dvaita, Vishishtadvaita)

Your responses must be:
1. Accurate and well-researched
2. Respectful of all spiritual traditions
3. Educational and accessible to modern readers
4. Rich with Sanskrit terms (provide transliteration)
5. Connected to practical modern applications

Response format (JSON):
{
  "explanation": "Detailed explanation of the verse/concept (2-3 paragraphs)",
  "context": "Historical and philosophical context",
  "keyTerms": [
    {"term": "English term", "meaning": "Definition", "sanskrit": "Sanskrit word"}
  ],
  "references": [
    {"scripture": "Scripture name", "chapter": 2, "verse": 47}
  ]
}`;

/**
 * Generate cache key for query
 */
function generateCacheKey(query: AIQuery): string {
  const key = `ai:${query.scriptureId || "general"}:${query.chapter || 0}:${query.verse || 0}:${query.query}:${query.language || "en"}`;
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
  const { success, limit, remaining, reset } = await ratelimit.limit(userId);
  return { success, limit, remaining, reset };
}

/**
 * Get cached response
 */
async function getCachedResponse(key: string): Promise<AIResponse | null> {
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
): Promise<{ response: AIResponse; cached: boolean; rateLimit: { remaining: number; reset: number } }> {
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
  if (cached) {
    return {
      response: cached,
      cached: true,
      rateLimit: {
        remaining: rateLimitCheck.remaining,
        reset: rateLimitCheck.reset,
      },
    };
  }

  // Build prompt
  const userPrompt = buildPrompt(query);

  try {
    const config: GenerateContentConfig = {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.7,
      maxOutputTokens: 2048,
      responseMimeType: "application/json",
    };

    const result = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: userPrompt,
      config,
    });

    const text = result.text || "{}";
    const parsed = JSON.parse(text);
    const validated = AIResponseSchema.parse(parsed);

    // Cache the response
    await cacheResponse(cacheKey, validated);

    return {
      response: validated,
      cached: false,
      rateLimit: {
        remaining: rateLimitCheck.remaining,
        reset: rateLimitCheck.reset,
      },
    };
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to generate AI explanation"
    );
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

  const userPrompt = buildPrompt(query);

  try {
    const config: GenerateContentConfig = {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.7,
      maxOutputTokens: 2048,
    };

    const stream = await ai.models.generateContentStream({
      model: MODEL_NAME,
      contents: userPrompt,
      config,
    });

    for await (const chunk of stream) {
      yield chunk.text || "";
    }
  } catch (error) {
    console.error("Streaming error:", error);
    throw new Error("Streaming failed");
  }
}

/**
 * Build prompt from query
 */
function buildPrompt(query: AIQuery): string {
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

  return prompt;
}

/**
 * Get AI service status
 */
export async function getAIStatus(): Promise<{
  available: boolean;
  model: string;
  rateLimitRemaining?: number;
}> {
  try {
    const { remaining } = await ratelimit.limit("healthcheck");
    return {
      available: !!GEMINI_API_KEY,
      model: MODEL_NAME,
      rateLimitRemaining: remaining,
    };
  } catch {
    return {
      available: false,
      model: MODEL_NAME,
    };
  }
}

/**
 * Translate Sanskrit text
 */
export async function translateSanskrit(
  sanskrit: string,
  targetLang: "en" | "hi" = "en"
): Promise<{ translation: string; transliteration: string }> {
  const prompt = `Translate this Sanskrit text to ${targetLang === "hi" ? "Hindi" : "English"}.
Provide:
1. Translation
2. Transliteration (romanized Sanskrit)

Sanskrit: ${sanskrit}

Response format (JSON):
{
  "translation": "Translated text",
  "transliteration": "Romanized Sanskrit"
}`;

  try {
    const result = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(result.text || "{}");
    return {
      translation: parsed.translation || "Translation unavailable",
      transliteration: parsed.transliteration || sanskrit,
    };
  } catch (error) {
    console.error("Translation error:", error);
    return {
      translation: "[Translation failed - please try again]",
      transliteration: sanskrit,
    };
  }
}
