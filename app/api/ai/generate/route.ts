import { NextRequest, NextResponse } from "next/server";

/**
 * API Route for Gemma 4 AI Generation
 * 
 * This endpoint proxies requests to the local Ollama instance
 * running Gemma 4 for AI-powered scripture analysis.
 */

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const MODEL_NAME = process.env.GEMMA_MODEL || "gemma-4-4b-it";

export async function POST(request: NextRequest) {
  try {
    const { prompt, type = "general" } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
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

    // Call Ollama/Gemma 4
    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        prompt: `${systemPrompt}\n\nUser Query: ${prompt}\n\nResponse:`,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 1024,
          top_k: 40,
          top_p: 0.9,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Ollama API error:", error);
      
      // Return mock response for demo purposes if AI is unavailable
      return NextResponse.json({
        response: generateMockResponse(prompt, type),
        mock: true,
      });
    }

    const data = await response.json();
    
    return NextResponse.json({
      response: data.response,
      model: MODEL_NAME,
      mock: false,
    });
  } catch (error) {
    console.error("AI Generation Error:", error);
    
    // Return fallback response
    return NextResponse.json({
      response: "I apologize, but the AI service is currently unavailable. Please ensure Ollama is running locally with Gemma 4 installed.\n\nTo set up:\n1. Install Ollama from ollama.com\n2. Run: ollama pull gemma-4-4b-it\n3. Start Ollama server",
      error: true,
    });
  }
}

/**
 * Generate mock response for demo when AI is unavailable
 */
function generateMockResponse(prompt: string, _type: string): string {
  const responses: Record<string, string> = {
    "karma yoga": `**Karma Yoga** (कर्म योग) - The Yoga of Action

Karma Yoga is the path of selfless action described in the Bhagavad Gita (Chapter 3). It teaches performing one's duty without attachment to results.

**Key Teachings:**
- "Karmanye vadhikaraste ma phaleshu kadachana" (BG 2.47)
- You have a right to perform your prescribed duty, but not to the fruits of action
- Act with dedication but without attachment

**Modern Application:**
This philosophy helps reduce anxiety about outcomes and focuses on doing one's best in any endeavor - work, relationships, or personal growth.`,
    
    "dharma": `**Dharma** (धर्म) - Righteous Duty

Dharma is one of the four purusharthas (goals of human life) in Hindu philosophy. It refers to moral duty, righteousness, and cosmic order.

**Types of Dharma:**
1. Sanatana Dharma - Eternal duties (truth, non-violence)
2. Varna Dharma - Duties according to one's nature
3. Ashrama Dharma - Duties by life stage
4. Svadharma - One's personal duty

**From Bhagavad Gita:**
"It is better to do one's own duty imperfectly than to do another's duty perfectly." (BG 3.35)

Dharma is about living in harmony with the universe and fulfilling one's unique role.`,
    
    "meditation": `**Meditation in Indian Scriptures**

The practice of meditation (Dhyana) is extensively covered in:

**Yoga Sutras of Patanjali:**
- "Yogas chitta vritti nirodha" (Yoga is the cessation of mind fluctuations)
- Eight-limbed path includes Dharana (concentration) and Dhyana (meditation)

**Bhagavad Gita:**
- Krishna describes meditation as sitting in a clean place, with steady posture, focusing mind on a single point (BG 6.11-12)
- Benefits include peace, self-realization, and liberation

**Types:**
1. Focused attention (Samatha)
2. Open monitoring (Vipassana)
3. Loving-kindness (Metta)
4. Transcendental meditation

**Benefits:** Reduced stress, improved concentration, spiritual growth.`,
    
    "default": `Based on ancient Indian scriptures, this concept represents profound wisdom that has guided seekers for millennia.

**Sanskrit Term:** [Term with transliteration]

**Scriptural Reference:**
Found in the Vedas/Upanishads/Gita with specific philosophical context.

**Core Meaning:**
This teaching emphasizes the importance of self-discipline, knowledge, and righteous action as paths to fulfillment.

**Modern Relevance:**
In today's fast-paced world, this ancient wisdom offers timeless guidance for maintaining balance, peace, and purpose in life.

For detailed study, refer to:
- Bhagavad Gita (Chapters 2-6)
- Upanishads (Katha, Chandogya)
- Yoga Sutras of Patanjali`,
  };

  // Find matching keyword
  const lowerPrompt = prompt.toLowerCase();
  for (const [keyword, response] of Object.entries(responses)) {
    if (lowerPrompt.includes(keyword)) {
      return response + "\n\n*[Demo Mode - Connect Ollama for full AI responses]*";
    }
  }
  
  return responses.default + "\n\n*[Demo Mode - Connect Ollama for full AI responses]*";
}
