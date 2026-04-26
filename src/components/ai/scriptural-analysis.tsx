"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Image as ImageIcon,
  Loader2,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  X,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { triggerHapticOnPress, triggerHapticOnSuccess } from "@/lib/haptics";

interface AnalysisResult {
  analysis: string;
  query: string;
  imageType: string;
  imageSize: number;
}

const SAMPLE_QUERIES = [
  "Identify the deity and explain the iconography",
  "Read and translate any Sanskrit text visible",
  "Describe the artistic style and period",
  "Explain the religious significance of this image",
  "Analyze the sacred geometry or yantra patterns",
];

export function ScripturalAnalysis() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showSampleQueries, setShowSampleQueries] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      triggerHapticOnPress();
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      triggerHapticOnPress();
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image || !query.trim()) return;

    triggerHapticOnPress();
    setIsAnalyzing(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("query", query);

    try {
      const response = await fetch("/api/ai/vision", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
      triggerHapticOnSuccess();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = async () => {
    if (result?.analysis) {
      triggerHapticOnPress();
      await navigator.clipboard.writeText(result.analysis);
      setCopied(true);
      triggerHapticOnSuccess();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    triggerHapticOnPress();
    setImage(null);
    setPreview(null);
    setQuery("");
    setResult(null);
    setShowSampleQueries(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSampleQuery = (sampleQuery: string) => {
    setQuery(sampleQuery);
    setShowSampleQueries(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5">
        <CardHeader className="border-b border-border/50">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
              <div className="relative flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                <ImageIcon className="size-6" />
              </div>
            </motion.div>
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="size-5 text-primary" />
                Scriptural Vision Analysis
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Upload images of sacred texts, iconography, or artifacts for AI-powered analysis
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Upload Section */}
            <div className="space-y-4">
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className={cn(
                  "relative flex min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all",
                  preview
                    ? "border-primary/50 bg-primary/5"
                    : "border-border/60 bg-muted/30 hover:border-primary/30 hover:bg-muted/50"
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />

                {preview ? (
                  <div className="relative h-full w-full p-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-full w-full rounded-lg object-contain"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClear();
                      }}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 p-8 text-center">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Upload className="size-16 text-muted-foreground" />
                    </motion.div>
                    <div>
                      <p className="text-lg font-semibold">Drop an image here</p>
                      <p className="text-sm text-muted-foreground">or click to browse</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Supports: PNG, JPG, WEBP (Max 10MB)
                    </p>
                  </div>
                )}
              </div>

              {image && (
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="size-4 text-primary" />
                    <span className="text-sm font-medium">{image.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(image.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleClear}>
                    <X className="size-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Analysis Section */}
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Your Query</label>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What would you like to know about this image?"
                  className="min-h-[100px] w-full resize-none rounded-lg border-2 border-border/60 bg-background/50 p-4 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>

              <AnimatePresence>
                {showSampleQueries && !query && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-2"
                  >
                    <p className="text-xs font-medium text-muted-foreground">Sample queries:</p>
                    <div className="flex flex-wrap gap-2">
                      {SAMPLE_QUERIES.map((sampleQuery) => (
                        <button
                          key={sampleQuery}
                          onClick={() => handleSampleQuery(sampleQuery)}
                          className="rounded-full border border-border/60 bg-background/50 px-3 py-1.5 text-xs text-foreground transition-all hover:border-primary/50 hover:bg-primary/10"
                        >
                          {sampleQuery}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                onClick={handleAnalyze}
                disabled={!image || !query.trim() || isAnalyzing}
                className="w-full"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 size-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 size-5" />
                    Analyze Image
                  </>
                )}
              </Button>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background p-6"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="size-5 text-primary" />
                      <h3 className="font-semibold">Analysis Result</h3>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleCopy}>
                      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </Button>
                  </div>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {result.analysis.split("\n").map((paragraph, i) => (
                      <p key={i} className="mb-2 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-muted/30 p-4">
            <p className="text-center text-xs text-muted-foreground">
              <ZoomIn className="mr-1 inline size-3" />
              Powered by Gemma 4's multimodal capabilities • Upload sacred texts, yantras, deity
              images, or temple architecture for detailed analysis
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
