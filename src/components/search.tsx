"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, X, BookOpen, Loader2 } from "lucide-react";
import { Command } from "cmdk";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { track } from "@vercel/analytics";
import { scriptureCatalog } from "@/lib/scripture-catalog";
import { sampleVerses, scriptures as scriptureMeta, searchVerses } from "@/lib/data/scriptures";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  sanskrit?: string;
  type: "text" | "verse";
}

const scriptureData: SearchResult[] = scriptureCatalog.map((item, index) => ({
  id: String(index + 1),
  title: item.name,
  description: item.description,
  category: item.category,
  href: item.href,
  sanskrit: item.sanskrit,
  type: "text",
}));

const verseData: SearchResult[] = sampleVerses.map((verse) => {
  const scripture = scriptureMeta.find((item) => item.id === verse.scriptureId);
  const scriptureHref = scriptureCatalog.find((item) => item.slug === verse.scriptureId)?.href;

  return {
    id: verse.id,
    title: `${scripture?.name || verse.scriptureId} ${verse.chapter}.${verse.verse}`,
    description: verse.translation.en,
    category: "Verse",
    href: scriptureHref ? `${scriptureHref}#${verse.id}` : "/contents/",
    sanskrit: verse.sanskrit,
    type: "verse",
  };
});

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    setIsLoading(true);

    // Track search queries (only if meaningful length)
    if (searchQuery.trim().length > 2) {
      track("search_query", {
        query: searchQuery.trim(),
        query_length: searchQuery.trim().length,
      });
    }

    // Simulate search with debounce
    const timeout = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setResults([]);
      } else {
        const filtered = scriptureData.filter(
          (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.sanskrit?.includes(searchQuery)
        );
        const verseMatches = searchVerses(searchQuery)
          .map((verse) => verseData.find((item) => item.id === verse.id))
          .filter((item): item is SearchResult => Boolean(item));

        const merged = [...filtered, ...verseMatches].slice(0, 8);
        setResults(merged);

        // Track search results
        track("search_results", {
          query: searchQuery.trim(),
          results_count: merged.length,
          has_results: merged.length > 0,
        });
      }
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timeout);
  }, []);

  const handleSelect = (href: string) => {
    track("search_result_selected", {
      destination: href,
      query: query.trim(),
    });

    onOpenChange(false);
    setQuery("");
    router.push(href);
  };

  // Track dialog state changes
  useEffect(() => {
    if (open) {
      track("search_dialog_opened");
    }
  }, [open]);

  // Keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        track("search_keyboard_shortcut");
        onOpenChange(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden rounded-[28px] border-border/60 bg-background/95 p-0 shadow-[0_36px_90px_-52px_rgba(15,23,42,0.42)] backdrop-blur-2xl sm:max-w-[580px]">
        <DialogHeader className="border-b border-border/60 px-5 py-4">
          <DialogTitle className="flex items-center gap-2.5 text-base font-semibold">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
              <SearchIcon className="h-4 w-4 text-primary" />
            </div>
            Search Scriptures
          </DialogTitle>
        </DialogHeader>
        <div className="p-5">
          <div className="relative">
            <SearchIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, description, Sanskrit, or category..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="rounded-2xl border-border/60 bg-background/75 py-5 pl-11 pr-10 text-base placeholder:text-muted-foreground/60 focus-visible:ring-primary/30"
              autoFocus
            />
            {query ? (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full hover:bg-muted"
                onClick={() => {
                  setQuery("");
                  setResults([]);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            ) : null}
          </div>

          <div className="mt-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-10">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <p className="text-xs text-muted-foreground">Searching scriptures...</p>
                </div>
              </div>
            ) : results.length > 0 ? (
              <Command>
                <Command.List className="max-h-[340px] overflow-auto">
                  {results.map((result) => (
                    <Command.Item
                      key={result.id}
                      onSelect={() => handleSelect(result.href)}
                      className="group flex cursor-pointer items-start gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-secondary/50"
                    >
                      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground">{result.title}</p>
                        {result.sanskrit ? (
                          <p className="font-devanagari text-sm text-primary">{result.sanskrit}</p>
                        ) : null}
                        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {result.description}
                        </p>
                      </div>
                      <span className="mt-0.5 shrink-0 rounded-full border border-border/60 bg-background/75 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                        {result.category}
                      </span>
                    </Command.Item>
                  ))}
                </Command.List>
              </Command>
            ) : query ? (
              <div className="py-10 text-center">
                <p className="font-devanagari text-2xl text-muted-foreground/50">खोज प्रयत्नः</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  No results found for &quot;{query}&quot;
                </p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  Try searching with Sanskrit names, English titles, or themes
                </p>
              </div>
            ) : (
              <div className="py-10 text-center">
                <p className="text-sm text-muted-foreground">
                  Start typing to search across all scriptures
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/75 px-3 py-1.5 text-xs text-muted-foreground">
                  Press <kbd className="rounded-md bg-muted px-1.5 py-0.5 font-mono">⌘</kbd> +{" "}
                  <kbd className="rounded-md bg-muted px-1.5 py-0.5 font-mono">K</kbd> anywhere
                </div>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {["Rigveda", "Bhagavad Gita", "Upanishads", "Karma"].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSearch(suggestion)}
                      className="rounded-full border border-border/60 bg-background/75 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
