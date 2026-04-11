import type { Metadata } from "next";
import { AIChat } from "@/components/ai/ai-chat";

export const metadata: Metadata = {
  title: "AI Scripture Guide",
  description: "Ask questions about ancient Indian scriptures and get AI-powered explanations from Google Gemini.",
};

export default function AIGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">
          AI Scripture Guide
        </h1>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Ask any question about Indian scriptures - Vedas, Upanishads, Bhagavad Gita, Yoga Sutras, 
          and more. Powered by Google Gemini for accurate, contextual explanations.
        </p>
        
        <AIChat />
        
        <div className="mt-8 grid gap-4 md:grid-cols-3 text-center">
          <div className="p-4 rounded-lg bg-muted">
            <h3 className="font-medium mb-1">Ask Questions</h3>
            <p className="text-sm text-muted-foreground">
              Natural language queries about any scripture
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted">
            <h3 className="font-medium mb-1">Get Explanations</h3>
            <p className="text-sm text-muted-foreground">
              AI-generated contextual interpretations
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted">
            <h3 className="font-medium mb-1">Learn Sanskrit</h3>
            <p className="text-sm text-muted-foreground">
              Key terms with transliteration and meanings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
