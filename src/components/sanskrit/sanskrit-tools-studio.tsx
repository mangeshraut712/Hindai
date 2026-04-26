"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Languages,
  Sparkles,
  Music,
  GitBranch,
  Type,
  Hash,
  Layers,
  RotateCcw,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ToolTab =
  | "transliterate"
  | "sandhi"
  | "vibhakti"
  | "vedic-accents"
  | "anvaya"
  | "dhatu"
  | "samasa"
  | "scripts";

const tools = [
  { id: "transliterate" as ToolTab, label: "Transliteration", icon: Languages, desc: "Convert between Devanagari, IAST, SLP1, HK, ITRANS" },
  { id: "sandhi" as ToolTab, label: "Sandhi Analysis", icon: Sparkles, desc: "Split compounds into individual words" },
  { id: "vibhakti" as ToolTab, label: "Vibhakti", icon: GitBranch, desc: "Grammatical case analysis and declensions" },
  { id: "vedic-accents" as ToolTab, label: "Vedic Accents", icon: Music, desc: "Pitch accent analysis for Vedic chanting" },
  { id: "anvaya" as ToolTab, label: "Anvaya", icon: Layers, desc: "Prose word order for Sanskrit verses" },
  { id: "dhatu" as ToolTab, label: "Dhatu", icon: BookOpen, desc: "Verb root dictionary with derivatives" },
  { id: "samasa" as ToolTab, label: "Samasa", icon: Type, desc: "Compound word analysis (tatpurusha, dvandva, etc.)" },
  { id: "scripts" as ToolTab, label: "Script Conversion", icon: Hash, desc: "Convert between Grantha, Sharada, Bengali, etc." },
];

export function SanskritToolsStudio() {
  const [activeTool, setActiveTool] = useState<ToolTab>("transliterate");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeToolData = tools.find((t) => t.id === activeTool);

  const handleProcess = async () => {
    if (!input.trim() || isLoading) return;
    setIsLoading(true);
    setCopied(false);

    try {
      const endpoint = `/api/sanskrit/${activeTool === "transliterate" ? "transliterate" : activeTool}`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        throw new Error("Processing failed");
      }

      const data = await response.json();
      setOutput(JSON.stringify(data, null, 2));
    } catch (error) {
      setOutput(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setCopied(false);
  };

  const getPlaceholder = () => {
    switch (activeTool) {
      case "transliterate":
        return "Enter Sanskrit text in Devanagari (e.g., रामो गच्छति)";
      case "sandhi":
        return "Enter Sanskrit compound (e.g., रामो गच्छति)";
      case "vibhakti":
        return "Enter Sanskrit word (e.g., रामः)";
      case "vedic-accents":
        return "Enter Vedic mantra (e.g., ॐ भूर्भुवः स्वः)";
      case "anvaya":
        return "Enter Sanskrit verse (e.g., कर्मण्येवाधिकारस्ते)";
      case "dhatu":
        return "Enter verb root (e.g., गम्)";
      case "samasa":
        return "Enter compound word (e.g., राजपुत्र)";
      case "scripts":
        return "Enter text to convert (e.g., राम)";
      default:
        return "Enter Sanskrit text";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Tool Selection */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool) => (
          <motion.button
            key={tool.id}
            type="button"
            onClick={() => setActiveTool(tool.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex flex-col items-center gap-3 rounded-2xl border p-6 transition-all",
              activeTool === tool.id
                ? "border-primary/50 bg-primary/10 shadow-lg"
                : "border-border/60 bg-card/75 hover:bg-secondary/70"
            )}
          >
            <tool.icon className={cn("size-8", activeTool === tool.id ? "text-primary" : "text-muted-foreground")} />
            <span className="font-semibold text-foreground">{tool.label}</span>
            <span className="text-center text-xs text-muted-foreground">{tool.desc}</span>
          </motion.button>
        ))}
      </div>

      {/* Tool Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="surface-panel overflow-hidden"
      >
        <div className="border-b border-border/60 bg-background/55 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            {(() => {
              const Icon = activeToolData!.icon;
              return <Icon className="size-6 text-primary" />;
            })()}
            <div>
              <h2 className="text-xl font-semibold text-foreground">{activeToolData!.label}</h2>
              <p className="text-sm text-muted-foreground">{activeToolData!.desc}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6">
          {/* Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              placeholder={getPlaceholder()}
              className="min-h-[120px] w-full resize-none rounded-2xl border border-border/70 bg-background/80 px-4 py-3 font-devanagari text-lg text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button variant="premium" onClick={handleProcess} disabled={!input.trim() || isLoading}>
              {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              {isLoading ? "Processing..." : "Process"}
            </Button>
            <Button variant="outline" onClick={copyOutput} disabled={!output}>
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="ghost" onClick={clearAll}>
              <RotateCcw className="size-4" />
              Clear
            </Button>
          </div>

          {/* Output */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Output</label>
            <div className="min-h-[200px] rounded-2xl border border-border/60 bg-card/75 p-4">
              <pre className="whitespace-pre-wrap text-sm text-foreground">{output || "Output will appear here after processing"}</pre>
            </div>
          </div>

          {/* Educational Note */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
            <h3 className="font-semibold text-primary">Traditional Context</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {activeTool === "transliterate" &&
                "Transliteration systems like IAST (International Alphabet of Sanskrit Transliteration) are essential for academic Sanskrit studies worldwide. IAST uses diacritics to represent Sanskrit sounds accurately in Roman script."}
              {activeTool === "sandhi" &&
                "Sandhi (संधि) is the phonological process where the final sound of one word merges with the initial sound of the next word. Understanding sandhi is crucial for reading Sanskrit poetry and scriptures correctly."}
              {activeTool === "vibhakti" &&
                "Vibhakti (विभक्ति) refers to the 8 grammatical cases in Sanskrit: Prathama (Nominative), Dvitiya (Accusative), Tritiya (Instrumental), Chaturthi (Dative), Panchami (Ablative), Shashthi (Genitive), Saptami (Locative), and Sambodhana (Vocative)."}
              {activeTool === "vedic-accents" &&
                "Vedic accents (स्वर) include Udatta (acute), Anudatta (grave), and Svarita (falling). These pitch accents are essential for correct Vedic chanting and preserving the oral tradition of the Vedas."}
              {activeTool === "anvaya" &&
                "Anvaya (अन्वय) is the prose word order analysis that reveals the grammatical structure of Sanskrit verses, which often invert word order for meter and poetic effect."}
              {activeTool === "dhatu" &&
                "Dhatus (धातु) are the verbal roots in Sanskrit. All Sanskrit verbs are derived from approximately 2000 dhatus listed in the Dhatupatha of Panini's Ashtadhyayi."}
              {activeTool === "samasa" &&
                "Samasa (समास) is compound word formation. Types include Tatpurusha (determinative), Dvandva (copulative), Bahuvrihi (possessive), Karmadharaya (adjectival), and Dvigu (numeral determinative)."}
              {activeTool === "scripts" &&
                "Sanskrit has been written in many scripts throughout history: Devanagari (most common), Grantha (South India), Sharada (Kashmir), Bengali, Gujarati, Telugu, Kannada, and others. Each script preserves the phonetic essence of Sanskrit."}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
