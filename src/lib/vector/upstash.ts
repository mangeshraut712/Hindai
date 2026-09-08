// Upstash Vector Database Integration
// Handles semantic search with vector embeddings for Sanskrit verses

// Note: @upstash/vector package needs to be installed
// For now, we'll create a mock implementation
// In production: npm install @upstash/vector

type VectorRecord = {
  id: string;
  vector: number[];
  metadata?: VectorData;
};

type QueryOptions = {
  vector: number[];
  topK?: number;
  includeMetadata?: boolean;
  includeVector?: boolean;
  filter?: Record<string, string | number | undefined>;
};

interface MockIndex {
  upsert: (data: VectorRecord | VectorRecord[]) => Promise<void>;
  query: (options: QueryOptions) => Promise<
    Array<{
      id: string;
      score: number;
      metadata?: VectorData;
      vector?: number[];
    }>
  >;
  delete: (id: string) => Promise<void>;
}

const index: MockIndex = {
  upsert: async (data) => {
    console.log("Mock upsert:", data);
  },
  query: async (options) => {
    console.log("Mock query:", options);
    return [];
  },
  delete: async (id) => {
    console.log("Mock delete:", id);
  },
};

export interface VectorData {
  id: string;
  verse_id: string;
  scripture_id: string;
  chapter: number;
  verse_num: number;
  text_devanagari: string;
  text_iast: string;
  translation?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface SearchResult {
  id: string;
  score: number;
  metadata: VectorData;
}

/**
 * Local lexical embedding used when no vector service is configured.
 * This is not a neural embedding and must not be labeled as one in the UI.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  return simpleHashEmbedding(text);
}

/**
 * Simple hash-based embedding as fallback
 * This is not production-quality but provides basic functionality
 */
function simpleHashEmbedding(text: string): number[] {
  const size = 1536; // Standard embedding size
  const embedding = new Array(size).fill(0);

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const index = charCode % size;
    embedding[index] = (embedding[index] + charCode) / 2;
  }

  // Normalize
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return embedding.map((val) => val / magnitude);
}

/**
 * Index a verse in the vector database
 */
export async function indexVerse(data: VectorData): Promise<void> {
  const embedding = await generateEmbedding(
    `${data.text_devanagari} ${data.text_iast} ${data.translation || ""}`
  );

  await index.upsert({
    id: data.id,
    vector: embedding,
    metadata: data,
  });
}

/**
 * Batch index multiple verses
 */
export async function batchIndexVerses(verses: VectorData[]): Promise<void> {
  const vectors = await Promise.all(
    verses.map(async (verse) => {
      const embedding = await generateEmbedding(
        `${verse.text_devanagari} ${verse.text_iast} ${verse.translation || ""}`
      );
      return {
        id: verse.id,
        vector: embedding,
        metadata: verse,
      };
    })
  );

  await index.upsert(vectors);
}

/**
 * Search for similar verses
 */
export async function searchVerses(
  query: string,
  topK: number = 10,
  filter?: { scripture_id?: string; chapter?: number }
): Promise<SearchResult[]> {
  const embedding = await generateEmbedding(query);

  const results = await index.query({
    vector: embedding,
    topK,
    includeMetadata: true,
    filter,
  });

  return results.map((result) => ({
    id: result.id,
    score: result.score,
    metadata: result.metadata as VectorData,
  }));
}

/**
 * Delete a verse from the vector index
 */
export async function deleteVerse(id: string): Promise<void> {
  await index.delete(id);
}

/**
 * Update a verse in the vector index
 */
export async function updateVerse(data: VectorData): Promise<void> {
  await deleteVerse(data.id);
  await indexVerse(data);
}

/**
 * Search within a specific scripture
 */
export async function searchWithinScripture(
  scriptureId: string,
  query: string,
  topK: number = 10
): Promise<SearchResult[]> {
  return searchVerses(query, topK, { scripture_id: scriptureId });
}

/**
 * Search within a specific chapter
 */
export async function searchWithinChapter(
  scriptureId: string,
  chapter: number,
  query: string,
  topK: number = 10
): Promise<SearchResult[]> {
  return searchVerses(query, topK, { scripture_id: scriptureId, chapter });
}

/**
 * Get semantic similarity between two verses
 */
export async function getSimilarity(verseId1: string, verseId2: string): Promise<number> {
  const result1 = await index.query({
    vector: new Array(1536).fill(0), // Placeholder
    topK: 1,
    filter: { id: verseId1 },
    includeVector: true,
  });

  const result2 = await index.query({
    vector: new Array(1536).fill(0), // Placeholder
    topK: 1,
    filter: { id: verseId2 },
    includeVector: true,
  });

  const vector1 = result1[0]?.vector;
  const vector2 = result2[0]?.vector;
  if (!vector1 || !vector2) {
    return 0;
  }

  const dotProduct = vector1.reduce((sum, val, i) => sum + val * (vector2[i] ?? 0), 0);
  const magnitude1 = Math.sqrt(vector1.reduce((sum, val) => sum + val * val, 0));
  const magnitude2 = Math.sqrt(vector2.reduce((sum, val) => sum + val * val, 0));

  return dotProduct / (magnitude1 * magnitude2);
}

/**
 * Rebuild the entire index
 * Use with caution - this is expensive
 */
export async function rebuildIndex(verses: VectorData[]): Promise<void> {
  // Delete all existing vectors
  // Note: Upstash doesn't have a clear all operation, so we'd need to track IDs
  // For now, we'll just upsert all verses
  await batchIndexVerses(verses);
}

/**
 * Get index statistics
 */
export async function getIndexStats(): Promise<{ count: number }> {
  // Upstash doesn't provide a direct stats API
  // This would need to be tracked separately
  return { count: 0 };
}
