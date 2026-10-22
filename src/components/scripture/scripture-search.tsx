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
        <div className="text-primary flex items-center justify-center gap-2">
          <Search className="size-6" />
          <h2 className="text-2xl font-semibold">Scripture Search</h2>
        </div>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Discover ancient wisdom across Vedas, Epics, Upanishads, and more.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 transform" />
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
          <p className="text-muted-foreground text-sm">
            {filteredScriptures.length} scripture{filteredScriptures.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredScriptures.map((scripture) => (
            <Link key={scripture.slug} href={`/${scripture.slug}`} className="group block">
              <div className="surface-panel group-hover:border-primary/30 h-full p-6 transition-all duration-200">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="group-hover:text-primary text-lg font-semibold transition-colors">
                        {scripture.name}
                      </h3>
                      <p className="font-devanagari text-primary text-sm">{scripture.sanskrit}</p>
                    </div>
                    <Book className="text-muted-foreground group-hover:text-primary size-5 transition-colors" />
                  </div>

                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {scripture.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">
                      {scripture.category}
                    </span>
                    {scripture.language && (
                      <span className="border-border flex items-center gap-1 rounded-full border px-2 py-1 text-xs">
                        <Languages className="size-3" />
                        {scripture.language}
                      </span>
                    )}
                  </div>

                  {scripture.keyConcepts && scripture.keyConcepts.length > 0 && (
                    <div className="border-border/50 border-t pt-2">
                      <p className="text-muted-foreground mb-2 text-xs">Key concepts:</p>
                      <div className="flex flex-wrap gap-1">
                        {scripture.keyConcepts.slice(0, 3).map((concept) => (
                          <span
                            key={concept}
                            className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs"
                          >
                            {concept}
                          </span>
                        ))}
                        {scripture.keyConcepts.length > 3 && (
                          <span className="text-muted-foreground text-xs">
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
            <Search className="text-muted-foreground mx-auto mb-4 size-12" />
            <h3 className="mb-2 text-lg font-medium">No scriptures found</h3>
            <p className="text-muted-foreground mb-4">Try different search terms</p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="border-border bg-background hover:bg-accent rounded-md border px-4 py-2 text-sm"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
