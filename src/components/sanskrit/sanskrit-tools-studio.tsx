"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { triggerHapticOnPress, triggerHapticOnSuccess, triggerHapticOnError } from "@/lib/haptics";

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
  {
    id: "transliterate" as ToolTab,
    label: "Transliteration",
    icon: Languages,
    desc: "Convert between Devanagari, IAST, SLP1, HK, ITRANS",
  },
  {
    id: "sandhi" as ToolTab,
    label: "Sandhi Analysis",
    icon: Sparkles,
    desc: "Split compounds into individual words",
  },
  {
    id: "vibhakti" as ToolTab,
    label: "Vibhakti",
    icon: GitBranch,
    desc: "Grammatical case analysis and declensions",
  },
  {
    id: "vedic-accents" as ToolTab,
    label: "Vedic Accents",
    icon: Music,
    desc: "Pitch accent analysis for Vedic chanting",
  },
  {
    id: "anvaya" as ToolTab,
    label: "Anvaya",
    icon: Layers,
    desc: "Prose word order for Sanskrit verses",
  },
  {
    id: "dhatu" as ToolTab,
    label: "Dhatu",
    icon: BookOpen,
    desc: "Verb root dictionary with derivatives",
  },
  {
    id: "samasa" as ToolTab,
    label: "Samasa",
    icon: Type,
    desc: "Compound word analysis (tatpurusha, dvandva, etc.)",
  },
  {
    id: "scripts" as ToolTab,
    label: "Script Conversion",
    icon: Hash,
    desc: "Convert between Grantha, Sharada, Bengali, etc.",
  },
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
    triggerHapticOnPress();
    setIsLoading(true);
    setCopied(false);

    // Simulate processing for better UX feedback
    await new Promise((resolve) => setTimeout(resolve, 800));

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
      triggerHapticOnSuccess();
    } catch (error) {
      setOutput(error instanceof Error ? error.message : "An error occurred");
      triggerHapticOnError();
    } finally {
      setIsLoading(false);
    }
  };

  const copyOutput = async () => {
    if (!output) return;
    triggerHapticOnPress();
    await navigator.clipboard.writeText(output);
    setCopied(true);
    triggerHapticOnSuccess();
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
        {tools.map((tool, index) => (
          <motion.button
            key={tool.id}
            type="button"
            onClick={() => {
              triggerHapticOnPress();
              setActiveTool(tool.id);
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            whileFocus={{ scale: 1.02, outline: "2px solid var(--primary)" }}
            aria-label={`Select ${tool.label} tool: ${tool.desc}`}
            aria-pressed={activeTool === tool.id}
            role="tab"
            tabIndex={0}
            className={cn(
              "group relative flex flex-col items-center gap-3 rounded-2xl border p-6 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              activeTool === tool.id
                ? "border-primary/50 bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/10"
                : "border-border/60 bg-card/75 hover:border-primary/30 hover:bg-secondary/70 hover:shadow-md"
            )}
          >
            <motion.div
              className={cn(
                "rounded-full p-3 transition-colors duration-300",
                activeTool === tool.id ? "bg-primary/20" : "bg-muted/50 group-hover:bg-primary/10"
              )}
            >
              <tool.icon
                className={cn(
                  "size-6 transition-colors duration-300",
                  activeTool === tool.id
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-primary"
                )}
              />
            </motion.div>
            <span className="font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
              {tool.label}
            </span>
            <span className="text-center text-xs text-muted-foreground">{tool.desc}</span>
            {activeTool === tool.id && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute -bottom-1 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Tool Interface */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTool}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="surface-panel overflow-hidden"
        >
          <div className="border-b border-border/60 bg-gradient-to-r from-background/55 to-background/30 px-6 py-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <motion.div
                key={activeTool}
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {(() => {
                  const Icon = activeToolData!.icon;
                  return <Icon className="size-6 text-primary" />;
                })()}
              </motion.div>
              <div>
                <motion.h2
                  key={activeToolData!.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xl font-semibold text-foreground"
                >
                  {activeToolData!.label}
                </motion.h2>
                <motion.p
                  key={activeToolData!.desc}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-sm text-muted-foreground"
                >
                  {activeToolData!.desc}
                </motion.p>
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
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="premium"
                  onClick={handleProcess}
                  disabled={!input.trim() || isLoading}
                  className="gap-2"
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                      >
                        <Loader2 className="size-4 animate-spin" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="sparkles"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                      >
                        <Zap className="size-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {isLoading ? "Processing..." : "Process"}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" onClick={copyOutput} disabled={!output} className="gap-2">
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                      >
                        <Check className="size-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                      >
                        <Copy className="size-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {copied ? "Copied" : "Copy"}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="ghost" onClick={clearAll} className="gap-2">
                  <RotateCcw className="size-4" />
                  Clear
                </Button>
              </motion.div>
            </div>

            {/* Output */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Output</label>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="min-h-[200px] rounded-2xl border border-border/60 bg-card/75 p-4 transition-all duration-300"
              >
                <AnimatePresence mode="wait">
                  {output ? (
                    <motion.pre
                      key="output"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="whitespace-pre-wrap text-sm text-foreground"
                    >
                      {output}
                    </motion.pre>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex h-[200px] items-center justify-center text-muted-foreground"
                    >
                      <div className="text-center">
                        <Sparkles className="mx-auto mb-2 size-8 opacity-50" />
                        <p className="text-sm">Output will appear here after processing</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Educational Note */}
            <motion.div
              key={activeTool}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/20 p-2">
                  <BookOpen className="size-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary">Traditional Context</h3>
                  <motion.p
                    key={activeTool}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mt-2 text-sm leading-relaxed text-muted-foreground"
                  >
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
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
