"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, X, BookOpen, Loader2 } from "lucide-react";
import { Command } from "cmdk";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { track } from "@vercel/analytics";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
}

const scriptureData: SearchResult[] = [
  {
    id: "1",
    title: "Rigveda",
    description: "The oldest sacred text of Hinduism",
    category: "Veda",
    href: "/rigveda",
  },
  {
    id: "2",
    title: "Mahabharata",
    description: "The great Indian epic",
    category: "Epic",
    href: "/mahabharata",
  },
  {
    id: "3",
    title: "Ramayana",
    description: "The journey of Lord Rama",
    category: "Epic",
    href: "/ramayana",
  },
  {
    id: "4",
    title: "Bhagavad Gita",
    description: "The Song of God",
    category: "Philosophy",
    href: "/bhagavad-gita",
  },
  {
    id: "5",
    title: "Srimad Bhagavatam",
    description: "Stories of Lord Krishna",
    category: "Purana",
    href: "/srimad-bhagavatam",
  },
  {
    id: "6",
    title: "Markandeya Purana",
    description: "Including Devi Mahatmyam",
    category: "Purana",
    href: "/markandeya-purana",
  },
  {
    id: "7",
    title: "Devi Mahatmyam",
    description: "Glory of the Divine Mother",
    category: "Purana",
    href: "/devi-mahatmyam",
  },
  {
    id: "8",
    title: "Manu Smriti",
    description: "Ancient legal and moral codes",
    category: "Dharma Shastra",
    href: "/manu-smriti",
  },
  {
    id: "9",
    title: "Parashara Smriti",
    description: "Vedic guidance for daily life",
    category: "Dharma Shastra",
    href: "/parashara",
  },
  {
    id: "10",
    title: "Yoga Vasishtha",
    description: "Spiritual instruction of Lord Rama",
    category: "Philosophy",
    href: "/yoga-vasishtha",
  },
];

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
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResults(filtered);

        // Track search results
        track("search_results", {
          query: searchQuery.trim(),
          results_count: filtered.length,
          has_results: filtered.length > 0,
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
      <DialogContent className="gap-0 p-0 sm:max-w-[550px]">
        <DialogHeader className="border-b px-4 py-3">
          <DialogTitle className="flex items-center gap-2">
            <SearchIcon className="h-4 w-4" />
            Search Scriptures
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, description, or category..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                onClick={() => {
                  setQuery("");
                  setResults([]);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="mt-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : results.length > 0 ? (
              <Command>
                <Command.List className="max-h-[300px] overflow-auto">
                  {results.map((result) => (
                    <Command.Item
                      key={result.id}
                      onSelect={() => handleSelect(result.href)}
                      className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground"
                    >
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">{result.title}</p>
                        <p className="text-sm text-muted-foreground">{result.description}</p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                        {result.category}
                      </span>
                    </Command.Item>
                  ))}
                </Command.List>
              </Command>
            ) : query ? (
              <div className="py-8 text-center text-muted-foreground">
                No results found for &quot;{query}&quot;
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <p className="mb-2">Start typing to search scriptures</p>
                <p className="text-sm">
                  Press <kbd className="rounded bg-muted px-1.5 py-0.5">⌘</kbd> +{" "}
                  <kbd className="rounded bg-muted px-1.5 py-0.5">K</kbd> to open search anytime
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
