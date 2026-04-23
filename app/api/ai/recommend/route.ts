import { NextRequest, NextResponse } from "next/server";
import { getAIStatus } from "@/lib/ai/gemma";
import {
  searchVerses,
  scriptures as scriptureData,
} from "@/lib/data/scriptures";
import { scriptureCatalog } from "@/lib/scripture-catalog";

export const runtime = "nodejs";

/**
 * AI Recommendations API
 *
 * Returns contextual recommendations based on what the user is currently reading.
 * Provides: related verses, related scriptures, and AI-generated exploration prompts.
 */

export async function GET() {
  const aiStatus = await getAIStatus();
  return NextResponse.json({
    ok: true,
    endpoint: "/api/ai/recommend/",
    methods: ["POST", "OPTIONS"],
    model: aiStatus.model,
    usage: {
      body: {
        currentScriptureId: "e.g. bhagavad-gita",
        currentVerseTopic: "e.g. karma yoga",
        limit: "optional, default 5",
      },
    },
  });
}

export async function OPTIONS() {
  return NextResponse.json({ ok: true, methods: ["GET", "POST", "OPTIONS"] });
}

export async function POST(request: NextRequest) {
  try {
    const { currentScriptureId, currentVerseTopic, limit = 5 } = await request.json();

    // 1. Find related verses using text search
    const searchQuery = currentVerseTopic || currentScriptureId || "dharma karma yoga";
    const relatedVerses = searchVerses(searchQuery)
      .filter((v) => v.scriptureId !== currentScriptureId)
      .slice(0, limit)
      .map((verse) => {
        const scripture = scriptureData.find((s) => s.id === verse.scriptureId);
        return {
          id: verse.id,
          scriptureId: verse.scriptureId,
          scriptureName: scripture?.name || verse.scriptureId,
          chapter: verse.chapter,
          verse: verse.verse,
          sanskrit: verse.sanskrit,
          translation: verse.translation.en,
          relevance: `Related to: ${searchQuery}`,
        };
      });

    // 2. Find related scriptures from the catalog
    const tokens = searchQuery
      .toLowerCase()
      .split(/\s+/)
      .filter((t: string) => t.length > 2);

    const relatedScriptures = scriptureCatalog
      .filter((item) => item.slug !== currentScriptureId)
      .map((item) => {
        const haystack =
          `${item.name} ${item.sanskrit} ${item.description} ${item.highlight} ${(item.keyConcepts || []).join(" ")}`.toLowerCase();
        let score = 0;
        for (const token of tokens) {
          if (haystack.includes(token)) score++;
        }
        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ score: _s, ...item }) => ({
        slug: item.slug,
        name: item.name,
        sanskrit: item.sanskrit,
        category: item.category,
        href: item.href,
        description: item.description,
      }));

    // 3. Generate AI exploration prompts
    const explorationPrompts = [
      `What is the connection between ${currentScriptureId || "this text"} and the concept of ${currentVerseTopic || "dharma"}?`,
      `Compare the teaching on ${currentVerseTopic || "karma"} across the Bhagavad Gita and the Upanishads.`,
      `How can a modern reader apply the wisdom of ${currentScriptureId || "this scripture"} in daily life?`,
    ];

    return NextResponse.json({
      relatedVerses,
      relatedScriptures,
      explorationPrompts,
      basedOn: {
        scriptureId: currentScriptureId,
        topic: currentVerseTopic,
      },
    });
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Recommendation generation failed.",
      },
      { status: 503 }
    );
  }
}
