// Vedic Heritage Portal Audio Integration
// Provides access to authentic Vedic recitations from the Ministry of Culture, India

export interface VedicAudio {
  id: string;
  verse_id: string;
  scripture: string;
  chapter: number;
  verse_num: number;
  audio_url: string;
  source: "vedic-heritage-portal" | "archive-org" | "namami";
  quality: "high" | "medium" | "low";
  duration?: number;
  vedic_accents: boolean;
  reciter?: string;
  sampradaya?: string; // Tradition of recitation
}

export class VedicHeritagePortal {
  private static BASE_URL = "https://vedicheritage.gov.in";
  private static ARCHIVE_ORG_BASE = "https://archive.org";
  private static NAMAMI_BASE = "https://namami.org";

  /**
   * Get audio URL for a specific verse from Vedic Heritage Portal
   */
  static async getAudioForVerse(
    scripture: string,
    chapter: number,
    verse_num: number
  ): Promise<VedicAudio | null> {
    // Vedic Heritage Portal API structure (this is a placeholder)
    // Actual implementation would need to match their actual API
    try {
      const url = `${this.BASE_URL}/api/audio/${scripture}/${chapter}/${verse_num}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        return {
          id: data.id,
          verse_id: `${scripture}-${chapter}-${verse_num}`,
          scripture,
          chapter,
          verse_num,
          audio_url: data.audio_url,
          source: "vedic-heritage-portal",
          quality: "high",
          duration: data.duration,
          vedic_accents: true,
          reciter: data.reciter,
          sampradaya: data.sampradaya,
        };
      }
    } catch (error) {
      console.warn("Vedic Heritage Portal API not available");
    }

    // Fallback to Archive.org
    return this.getArchiveOrgAudio(scripture, chapter, verse_num);
  }

  /**
   * Get audio from Archive.org
   */
  private static async getArchiveOrgAudio(
    scripture: string,
    chapter: number,
    verse_num: number
  ): Promise<VedicAudio | null> {
    try {
      // Archive.org has various Vedic chanting collections
      const collection = this.getArchiveOrgCollection(scripture);
      const url = `${this.ARCHIVE_ORG_BASE}/metadata/${collection}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        const audioFile = this.findAudioFile(data, chapter, verse_num);

        if (audioFile) {
          return {
            id: `archive-${scripture}-${chapter}-${verse_num}`,
            verse_id: `${scripture}-${chapter}-${verse_num}`,
            scripture,
            chapter,
            verse_num,
            audio_url: audioFile,
            source: "archive-org",
            quality: "high",
            vedic_accents: true,
          };
        }
      }
    } catch (error) {
      console.warn("Archive.org API not available");
    }

    // Fallback to Namami.org
    return this.getNamamiAudio(scripture, chapter, verse_num);
  }

  /**
   * Get audio from Namami.org
   */
  private static async getNamamiAudio(
    scripture: string,
    chapter: number,
    verse_num: number
  ): Promise<VedicAudio | null> {
    try {
      const url = `${this.NAMAMI_BASE}/api/recitations/${scripture}/${chapter}/${verse_num}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        return {
          id: `namami-${scripture}-${chapter}-${verse_num}`,
          verse_id: `${scripture}-${chapter}-${verse_num}`,
          scripture,
          chapter,
          verse_num,
          audio_url: data.audio_url,
          source: "namami",
          quality: "medium",
          vedic_accents: data.vedic_accents || false,
          reciter: data.reciter,
        };
      }
    } catch (error) {
      console.warn("Namami.org API not available");
    }

    return null;
  }

  /**
   * Get Archive.org collection name for a scripture
   */
  private static getArchiveOrgCollection(scripture: string): string {
    const collections: Record<string, string> = {
      rigveda: "rigveda-chanting",
      samaveda: "samaveda-chanting",
      yajurveda: "yajurveda-chanting",
      atharvaveda: "atharvaveda-chanting",
      gita: "bhagavad-gita-recitation",
      upanishads: "upanishad-chanting",
    };
    return collections[scripture.toLowerCase()] || "vedic-chanting";
  }

  /**
   * Find specific audio file in Archive.org metadata
   */
  private static findAudioFile(metadata: any, chapter: number, verse_num: number): string | null {
    if (!metadata.files) return null;

    // Look for files matching the verse pattern
    const pattern = new RegExp(`.*${chapter}\\.${verse_num}.*\\.(mp3|wav|ogg)`, "i");

    for (const file of Object.values(metadata.files) as any[]) {
      if (file.name && pattern.test(file.name)) {
        return `https://archive.org/download/${metadata.metadata.identifier}/${file.name}`;
      }
    }

    return null;
  }

  /**
   * Batch get audio for multiple verses
   */
  static async batchGetAudio(
    verses: { scripture: string; chapter: number; verse_num: number }[]
  ): Promise<Map<string, VedicAudio>> {
    const results = new Map<string, VedicAudio>();

    for (const verse of verses) {
      const key = `${verse.scripture}-${verse.chapter}-${verse.verse_num}`;
      const audio = await this.getAudioForVerse(verse.scripture, verse.chapter, verse.verse_num);
      if (audio) {
        results.set(key, audio);
      }
    }

    return results;
  }

  /**
   * Get available reciters for a scripture
   */
  static async getReciters(scripture: string): Promise<string[]> {
    try {
      const url = `${this.BASE_URL}/api/reciters/${scripture}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        return data.reciters || [];
      }
    } catch (error) {
      console.warn("Could not fetch reciters");
    }

    return [];
  }

  /**
   * Get available sampradayas (recitation traditions)
   */
  static async getSampradayas(scripture: string): Promise<string[]> {
    const commonSampradayas = [
      "Gujarat",
      "South India",
      "North India",
      "Orissa",
      "Maharashtra",
      "Kerala",
    ];

    try {
      const url = `${this.BASE_URL}/api/sampradayas/${scripture}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        return data.sampradayas || commonSampradayas;
      }
    } catch (error) {
      console.warn("Could not fetch sampradayas");
    }

    return commonSampradayas;
  }

  /**
   * Check if a scripture has Vedic accent recordings
   */
  static hasVedicAccents(scripture: string): boolean {
    const vedicScriptures = ["rigveda", "samaveda", "yajurveda", "atharvaveda"];
    return vedicScriptures.includes(scripture.toLowerCase());
  }

  /**
   * Get audio with specific reciter and sampradaya
   */
  static async getAudioWithPreferences(
    scripture: string,
    chapter: number,
    verse_num: number,
    reciter?: string,
    sampradaya?: string
  ): Promise<VedicAudio | null> {
    try {
      const params = new URLSearchParams();
      if (reciter) params.append("reciter", reciter);
      if (sampradaya) params.append("sampradaya", sampradaya);

      const url = `${this.BASE_URL}/api/audio/${scripture}/${chapter}/${verse_num}?${params}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        return {
          id: data.id,
          verse_id: `${scripture}-${chapter}-${verse_num}`,
          scripture,
          chapter,
          verse_num,
          audio_url: data.audio_url,
          source: "vedic-heritage-portal",
          quality: "high",
          duration: data.duration,
          vedic_accents: true,
          reciter: data.reciter,
          sampradaya: data.sampradaya,
        };
      }
    } catch (error) {
      console.warn("Could not fetch audio with preferences");
    }

    // Fallback to regular audio
    return this.getAudioForVerse(scripture, chapter, verse_num);
  }
}
