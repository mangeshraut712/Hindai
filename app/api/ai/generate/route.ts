import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * API Route for Gemma 4 AI Generation
 *
 * This endpoint uses Gemma 4 models for AI-powered scripture analysis.
 * Part of the Gemma 4 Good Hackathon submission.
 */

const GEMMA_API_KEY = process.env.GEMMA_API_KEY || process.env.GEMINI_API_KEY; // Fallback for compatibility
const MODEL_NAME = process.env.GEMMA_MODEL || "gemma-4-27b-it"; // Gemma 4 instruction-tuned model

// Initialize Gemma 4 AI
const ai = GEMMA_API_KEY ? new GoogleGenerativeAI(GEMMA_API_KEY) : null;

export async function POST(request: NextRequest) {
  // Check if API key is configured
  if (!GEMMA_API_KEY || !ai) {
    console.warn("GEMINI_API_KEY not configured");
    return NextResponse.json(
      {
        response: getFallbackResponse(),
        mock: true,
        error: "AI service not configured. Set GEMMA_API_KEY environment variable.",
      },
      { status: 200 }
    );
  }

  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Enhanced system prompt for scripture analysis
    const systemPrompt = `You are Hind AI, an expert scholar of ancient Indian scriptures.

Your expertise includes:
- Vedas (Rigveda, Samaveda, Yajurveda, Atharvaveda)
- Upanishads (108 principal texts)
- Epics (Mahabharata, Ramayana)
- Bhagavad Gita (700 verses of spiritual wisdom)
- Puranas (18 major texts)
- Dharma Shastras (Manu Smriti, etc.)
- Yoga Philosophy (Yoga Sutras, Yoga Vasishtha)

Guidelines:
1. Provide accurate, well-researched explanations
2. Include Sanskrit transliteration for key terms
3. Offer historical and cultural context
4. Connect ancient wisdom to modern life
5. Cite specific chapter and verse numbers
6. Respect all spiritual traditions

Response should be clear, educational, and accessible to modern readers.`;

    // Call Google Gemini API
    const model = ai.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nUser Query: ${prompt}\n\nResponse:` }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    });

    const response = result.response.text() || getFallbackResponse();

    return NextResponse.json({
      response: response,
      model: MODEL_NAME,
      mock: false,
    });
  } catch (error) {
    console.error("AI Generation Error:", error);

    // Return fallback response
    return NextResponse.json(
      {
        response: getFallbackResponse(),
        mock: true,
        error: error instanceof Error ? error.message : "AI service unavailable",
      },
      { status: 200 }
    );
  }
}

/**
 * Fallback response when AI is unavailable
 */
function getFallbackResponse(): string {
  return `Welcome to Hind AI! 🙏

I'm here to help you explore ancient Indian scriptures. Currently, I'm running in demo mode while the AI service is being configured.

**What I can help with:**
- Explaining verses from the Bhagavad Gita
- Understanding concepts like Karma, Dharma, and Moksha
- Exploring the Yoga Sutras of Patanjali
- Learning about meditation and spiritual practices

**To enable full AI features:**
Set the GEMMA_API_KEY environment variable with your Gemma 4 API key.

Get your key at: https://aistudio.google.com/app/apikey

**Sample Questions to Try:**
- "What is Karma Yoga?"
- "Explain Bhagavad Gita 2.47"
- "What are the four goals of life in Hinduism?"
- "How do I start meditation?"`;
}
