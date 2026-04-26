// Google Cloud TTS Integration for Sanskrit Audio Generation
// Generates Sanskrit audio using neural TTS when pre-recorded audio is unavailable

export interface TTSConfig {
  languageCode: string;
  voiceName: string;
  speakingRate: number;
  pitch: number;
  volumeGainDb: number;
}

export interface TTSResult {
  audioUrl: string;
  duration: number;
  config: TTSConfig;
}

export class SanskritTTS {
  private static API_URL = "https://texttospeech.googleapis.com/v1/text:synthesize";
  private static API_KEY = process.env.GOOGLE_CLOUD_API_KEY || "";

  // Recommended voices for Sanskrit
  private static SANSKRIT_VOICES = {
    // Hindi voices work well for Sanskrit
    "hi-IN-Wavenet-A": "Hindi Wavenet A (Female)",
    "hi-IN-Wavenet-B": "Hindi Wavenet B (Male)",
    "hi-IN-Wavenet-C": "Hindi Wavenet C (Female)",
    "hi-IN-Wavenet-D": "Hindi Wavenet D (Male)",
    "hi-IN-Standard-A": "Hindi Standard A (Female)",
    "hi-IN-Standard-B": "Hindi Standard B (Male)",
    // Neural voices (higher quality)
    "hi-IN-Neural2-A": "Hindi Neural2 A (Female)",
    "hi-IN-Neural2-B": "Hindi Neural2 B (Male)",
    "hi-IN-Neural2-C": "Hindi Neural2 C (Female)",
  };

  private static DEFAULT_CONFIG: TTSConfig = {
    languageCode: "hi-IN",
    voiceName: "hi-IN-Neural2-A",
    speakingRate: 0.9, // Slightly slower for Sanskrit
    pitch: 0,
    volumeGainDb: 0,
  };

  /**
   * Generate audio for Sanskrit text using Google Cloud TTS
   */
  static async generateAudio(text: string, config: Partial<TTSConfig> = {}): Promise<TTSResult> {
    const finalConfig = { ...this.DEFAULT_CONFIG, ...config };

    try {
      const response = await fetch(`${this.API_URL}?key=${this.API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode: finalConfig.languageCode,
            name: finalConfig.voiceName,
          },
          audioConfig: {
            speakingRate: finalConfig.speakingRate,
            pitch: finalConfig.pitch,
            volumeGainDb: finalConfig.volumeGainDb,
            audioEncoding: "MP3",
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Google Cloud TTS error: ${response.statusText}`);
      }

      const data = await response.json();

      // In production, upload to Supabase Storage and return URL
      // For now, return base64 audio as data URL
      const audioUrl = `data:audio/mp3;base64,${data.audioContent}`;

      // Estimate duration (rough estimate: 0.1s per character at normal speed)
      const duration = (text.length / 10) * (1 / finalConfig.speakingRate);

      return {
        audioUrl,
        duration,
        config: finalConfig,
      };
    } catch (error) {
      console.error("Failed to generate TTS audio:", error);
      throw error;
    }
  }

  /**
   * Generate audio for a verse
   */
  static async generateVerseAudio(
    sanskritText: string,
    transliteration?: string
  ): Promise<TTSResult> {
    // Prefer Sanskrit (Devanagari) as it's better supported
    const textToSpeak = sanskritText || transliteration || "";
    return this.generateAudio(textToSpeak);
  }

  /**
   * Batch generate audio for multiple verses
   */
  static async batchGenerateAudio(
    texts: string[],
    config?: Partial<TTSConfig>
  ): Promise<TTSResult[]> {
    const results: TTSResult[] = [];

    for (const text of texts) {
      try {
        const result = await this.generateAudio(text, config);
        results.push(result);
      } catch (error) {
        console.error(`Failed to generate audio for text: ${text}`);
      }
    }

    return results;
  }

  /**
   * Get available voices
   */
  static getAvailableVoices(): Record<string, string> {
    return this.SANSKRIT_VOICES;
  }

  /**
   * Get recommended voice for Sanskrit
   */
  static getRecommendedVoice(): string {
    return this.DEFAULT_CONFIG.voiceName;
  }

  /**
   * Cache audio in Supabase Storage
   */
  static async cacheAudio(verseId: string, audioData: string, config: TTSConfig): Promise<string> {
    // In production, upload to Supabase Storage
    // For now, return a mock URL
    return `https://storage.example.com/audio/${verseId}.mp3`;
  }

  /**
   * Check if cached audio exists
   */
  static async getCachedAudio(verseId: string): Promise<string | null> {
    // In production, check Supabase Storage
    // For now, return null
    return null;
  }

  /**
   * Generate or retrieve cached audio
   */
  static async getOrGenerateAudio(
    verseId: string,
    text: string,
    config?: Partial<TTSConfig>
  ): Promise<TTSResult> {
    // Check cache first
    const cached = await this.getCachedAudio(verseId);
    if (cached) {
      return {
        audioUrl: cached,
        duration: 0, // Would need to be stored
        config: { ...this.DEFAULT_CONFIG, ...config },
      };
    }

    // Generate new audio
    const result = await this.generateAudio(text, config);

    // Cache it
    await this.cacheAudio(verseId, result.audioUrl, result.config);

    return result;
  }

  /**
   * Generate audio with specific speaking rate
   */
  static async generateWithSpeed(text: string, speed: number): Promise<TTSResult> {
    return this.generateAudio(text, { speakingRate: speed });
  }

  /**
   * Generate audio for slow mode (for learning)
   */
  static async generateSlowMode(text: string): Promise<TTSResult> {
    return this.generateAudio(text, { speakingRate: 0.5 });
  }

  /**
   * Generate audio for fast mode
   */
  static async generateFastMode(text: string): Promise<TTSResult> {
    return this.generateAudio(text, { speakingRate: 1.25 });
  }
}
