"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ComicCover } from "@/components/ui/ComicCover";
import { searchSeries } from "@/lib/data";
import type { Series } from "@/lib/types";

const RECENT_SEARCHES_KEY = "toonvault-recent-searches";

export function SearchView() {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      window.queueMicrotask(() => setRecentSearches(JSON.parse(stored) as string[]));
    }
  }, []);

  const results = useMemo<Series[]>(
    () => (query.trim() ? searchSeries(query.trim()) : []),
    [query],
  );

  function saveSearch(value: string) {
    const term = value.trim();
    if (!term) return;
    const next = [term, ...recentSearches.filter((item) => item !== term)].slice(0, 6);
    setRecentSearches(next);
    window.sessionStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
  }

  return (
    <section className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 border-b border-tv-line bg-white px-4 py-3">
        <label className="flex h-11 items-center gap-2 rounded-full bg-tv-bg-soft px-4">
          <Search size={20} className="text-tv-muted" aria-hidden />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && saveSearch(query)}
            placeholder="Search by title, author, or genre"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-tv-muted"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
              <X size={18} className="text-tv-muted" />
            </button>
          )}
        </label>
      </div>

      {!query ? (
        <div className="px-5 py-6">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-lg font-bold">Recent searches</h1>
            {recentSearches.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setRecentSearches([]);
                  window.sessionStorage.removeItem(RECENT_SEARCHES_KEY);
                }}
                className="text-xs text-tv-muted"
              >
                Clear
              </button>
            )}
          </div>
          {recentSearches.length ? (
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="rounded-full bg-tv-green-soft px-3 py-2 text-sm font-medium text-tv-green-dark"
                >
                  {term}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-tv-muted">Your recent searches will appear here.</p>
          )}
        </div>
      ) : results.length ? (
        <div>
          <p className="px-5 py-4 text-sm text-tv-muted">{results.length} results</p>
          <ul className="divide-y divide-tv-line">
            {results.map((series) => (
              <li key={series.id}>
                <Link
                  href={`/series/${series.slug}`}
                  onClick={() => saveSearch(query)}
                  className="flex gap-3 px-5 py-3"
                >
                  <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-[2px] bg-[#111]">
                    <ComicCover
                      title={series.title}
                      seed={series.slug}
                      showTitle={false}
                      size="sm"
                    />
                  </div>
                  <div className="min-w-0 py-1">
                    <h2 className="truncate font-semibold">{series.title}</h2>
                    <p className="mt-1 text-sm text-tv-muted">{series.author}</p>
                    <p className="mt-2 truncate text-xs text-tv-green-dark">
                      {series.genres.join(" · ")}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="px-8 py-24 text-center">
          <Search size={32} className="mx-auto mb-4 text-tv-muted" />
          <h1 className="font-bold">No series found</h1>
          <p className="mt-2 text-sm text-tv-muted">Try a different title, author, or genre.</p>
        </div>
      )}
    </section>
  );
}
