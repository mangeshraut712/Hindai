"use client";

import { useState, useMemo } from "react";
import { Search, Book, Languages } from "lucide-react";
import { Input } from "@/components/ui/input";
import { scriptureCatalog } from "@/lib/scripture-catalog";
import Link from "next/link";

export function ScriptureSearch() {
  const [query, setQuery] = useState("");

  const filteredScriptures = useMemo(() => {
    return scriptureCatalog.filter((scripture) => {
      const matchesQuery =
        scripture.name.toLowerCase().includes(query.toLowerCase()) ||
        scripture.description.toLowerCase().includes(query.toLowerCase()) ||
        scripture.keyConcepts?.some((concept) =>
          concept.toLowerCase().includes(query.toLowerCase())
        );

      return matchesQuery;
    });
  }, [query]);

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Search className="size-6" />
          <h2 className="text-2xl font-semibold">Scripture Search</h2>
        </div>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Discover ancient wisdom across Vedas, Epics, Upanishads, and more.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 transform text-muted-foreground" />
        <Input
          placeholder="Search scriptures by name or concepts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 pl-10 text-base"
        />
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredScriptures.length} scripture{filteredScriptures.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredScriptures.map((scripture) => (
            <Link key={scripture.slug} href={`/${scripture.slug}`} className="group block">
              <div className="surface-panel h-full p-6 transition-all duration-200 group-hover:border-primary/30">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
                        {scripture.name}
                      </h3>
                      <p className="font-devanagari text-sm text-primary">{scripture.sanskrit}</p>
                    </div>
                    <Book className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>

                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {scripture.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                      {scripture.category}
                    </span>
                    {scripture.language && (
                      <span className="flex items-center gap-1 rounded-full border border-border px-2 py-1 text-xs">
                        <Languages className="size-3" />
                        {scripture.language}
                      </span>
                    )}
                  </div>

                  {scripture.keyConcepts && scripture.keyConcepts.length > 0 && (
                    <div className="border-t border-border/50 pt-2">
                      <p className="mb-2 text-xs text-muted-foreground">Key concepts:</p>
                      <div className="flex flex-wrap gap-1">
                        {scripture.keyConcepts.slice(0, 3).map((concept) => (
                          <span
                            key={concept}
                            className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                          >
                            {concept}
                          </span>
                        ))}
                        {scripture.keyConcepts.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{scripture.keyConcepts.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredScriptures.length === 0 && query && (
          <div className="py-12 text-center">
            <Search className="mx-auto mb-4 size-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-medium">No scriptures found</h3>
            <p className="mb-4 text-muted-foreground">Try different search terms</p>
            <button
              onClick={() => setQuery("")}
              className="rounded-md border border-border bg-background px-4 py-2 text-sm hover:bg-accent"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
