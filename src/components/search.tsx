"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, X, BookOpen, Loader2 } from "lucide-react";
import { Command } from "cmdk";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { track } from "@vercel/analytics";
import { retrieveSitePages } from "@/lib/ai/site-knowledge";
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
        const libraryHits: SearchResult[] = retrieveSitePages(searchQuery).hits.map((hit) => ({
          id: hit.href,
          title: hit.title,
          description: hit.snippet,
          category: hit.kind,
          href: hit.href,
          sanskrit: hit.titleSa,
          type: "text",
        }));
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

        const seen = new Set<string>();
        const merged = [...libraryHits, ...filtered, ...verseMatches]
          .filter((item) => {
            if (seen.has(item.href)) return false;
            seen.add(item.href);
            return true;
          })
          .slice(0, 8);
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
      <DialogContent className="border-border/60 bg-background/95 gap-0 overflow-hidden rounded-[28px] p-0 shadow-[0_36px_90px_-52px_rgba(15,23,42,0.42)] backdrop-blur-2xl sm:max-w-[580px]">
        <DialogHeader className="border-border/60 border-b px-5 py-4">
          <DialogTitle className="flex items-center gap-2.5 text-base font-semibold">
            <div className="bg-primary/10 flex size-8 items-center justify-center rounded-full">
              <SearchIcon className="text-primary size-4" />
            </div>
            Search Scriptures
          </DialogTitle>
          <DialogDescription>
            Search the library and open a page: Hanuman Chalisa, Shiv Puran, katha, or a book
          </DialogDescription>
        </DialogHeader>
        <div className="p-5">
          <div className="relative">
            <SearchIcon className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
            <Input
              placeholder="Open Hanuman Chalisa, Shiv Puran, katha..."
              onKeyDown={(event) => {
                if (event.key !== "Enter") return;
                const found = retrieveSitePages(query);
                if (found.shouldOpen && found.best) {
                  event.preventDefault();
                  handleSelect(found.best.href);
                }
              }}
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="border-border/60 bg-background/75 placeholder:text-muted-foreground/60 focus-visible:ring-primary/30 rounded-2xl py-5 pr-10 pl-11 text-base"
              autoFocus
            />
            {query ? (
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-muted absolute top-1/2 right-2 size-7 -translate-y-1/2 rounded-full"
                onClick={() => {
                  setQuery("");
                  setResults([]);
                }}
              >
                <X className="size-4" />
              </Button>
            ) : null}
          </div>

          <div className="mt-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-10">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="text-primary size-6 animate-spin" />
                  <p className="text-muted-foreground text-xs">Searching scriptures...</p>
                </div>
              </div>
            ) : results.length > 0 ? (
              <Command>
                <Command.List className="max-h-[340px] overflow-auto">
                  {results.map((result) => (
                    <Command.Item
                      key={result.id}
                      onSelect={() => handleSelect(result.href)}
                      className="group hover:bg-secondary/50 flex cursor-pointer items-start gap-3 rounded-2xl px-3 py-3 transition-colors"
                    >
                      <div className="bg-primary/10 text-primary mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full">
                        <BookOpen className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-foreground font-medium">{result.title}</p>
                        {result.sanskrit ? (
                          <p className="font-devanagari text-primary text-sm">{result.sanskrit}</p>
                        ) : null}
                        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                          {result.description}
                        </p>
                      </div>
                      <span className="border-border/60 bg-background/75 text-muted-foreground mt-0.5 shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium">
                        {result.category}
                      </span>
                    </Command.Item>
                  ))}
                </Command.List>
              </Command>
            ) : query ? (
              <div className="py-10 text-center">
                <p className="font-devanagari text-muted-foreground/50 text-2xl">खोज प्रयत्नः</p>
                <p className="text-muted-foreground mt-3 text-sm">
                  No results found for &quot;{query}&quot;
                </p>
                <p className="text-muted-foreground/70 mt-1 text-xs">
                  Try searching with Sanskrit names, English titles, or themes
                </p>
              </div>
            ) : (
              <div className="py-10 text-center">
                <p className="text-muted-foreground text-sm">
                  Start typing to search across all scriptures
                </p>
                <div className="border-border/60 bg-background/75 text-muted-foreground mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs">
                  Press <kbd className="bg-muted rounded-md px-1.5 py-0.5 font-mono">⌘</kbd> +{" "}
                  <kbd className="bg-muted rounded-md px-1.5 py-0.5 font-mono">K</kbd> anywhere
                </div>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {["Hanuman Chalisa", "Shiv Puran", "Katha", "Bhagavad Gita"].map((suggestion) => (
                    <button
                      type="button"
                      key={suggestion}
                      onClick={() => handleSearch(suggestion)}
                      className="border-border/60 bg-background/75 text-muted-foreground hover:bg-secondary/50 hover:text-foreground rounded-full border px-3 py-1.5 text-xs transition-colors"
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
