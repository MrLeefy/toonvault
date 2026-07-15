"use client";

import Link from "next/link";
import { Bookmark, Download, History } from "lucide-react";
import { useMemo, useState } from "react";
import { ComicCover } from "@/components/ui/ComicCover";
import { getAllSeries } from "@/lib/data";
import { useLibraryStore } from "@/lib/store/library";
import type { Series } from "@/lib/types";

type Tab = "subscribed" | "recent" | "downloads";

const tabs: { id: Tab; label: string }[] = [
  { id: "subscribed", label: "Subscribed" },
  { id: "recent", label: "Recent" },
  { id: "downloads", label: "Downloads" },
];

function EmptyLibrary({ icon: Icon, title, message }: { icon: typeof Bookmark; title: string; message: string }) {
  return (
    <div className="px-8 py-20 text-center">
      <Icon size={34} className="mx-auto mb-4 text-tv-muted" />
      <h2 className="font-bold">{title}</h2>
      <p className="mx-auto mt-2 max-w-60 text-sm leading-5 text-tv-muted">{message}</p>
      <Link href="/" className="mt-5 inline-flex rounded-full bg-tv-green px-5 py-2.5 text-sm font-bold text-white">
        Explore series
      </Link>
    </div>
  );
}

export function LibraryView() {
  const [activeTab, setActiveTab] = useState<Tab>("subscribed");
  const { subscribedSlugs, recentlyViewed, readingProgress } = useLibraryStore();
  const allSeries = getAllSeries();

  const subscribed = useMemo(
    () => allSeries.filter((series) => subscribedSlugs.includes(series.slug)),
    [allSeries, subscribedSlugs],
  );
  const recent = useMemo(() => {
    return recentlyViewed
      .map((slug) => allSeries.find((series) => series.slug === slug))
      .filter((series): series is Series => Boolean(series));
  }, [allSeries, recentlyViewed]);

  const entries = activeTab === "subscribed" ? subscribed : recent;

  return (
    <section>
      <header className="px-5 pb-3 pt-6">
        <h1 className="text-2xl font-bold tracking-tight">My</h1>
      </header>
      <div role="tablist" aria-label="Library" className="flex border-b border-tv-line px-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-3 py-3 text-sm font-semibold first:pl-0 ${
              activeTab === tab.id ? "text-tv-ink" : "text-tv-muted"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-tv-green" />}
          </button>
        ))}
      </div>

      {activeTab === "downloads" ? (
        <EmptyLibrary icon={Download} title="No downloads yet" message="Downloaded episodes will be available here." />
      ) : !entries.length ? (
        <EmptyLibrary
          icon={activeTab === "subscribed" ? Bookmark : History}
          title={activeTab === "subscribed" ? "No subscriptions yet" : "Nothing read recently"}
          message={activeTab === "subscribed" ? "Subscribe to series and never miss an episode." : "Series you read will appear here."}
        />
      ) : (
        <ul className="divide-y divide-tv-line">
          {entries.map((series) => {
            const progress = readingProgress[series.slug];
            const episode = progress
              ? series.episodes.find((item) => item.id === progress.episodeId)
              : undefined;
            return (
              <li key={series.id}>
                <Link href={`/series/${series.slug}`} className="flex gap-3 px-5 py-3">
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
                    {activeTab === "recent" && episode && (
                      <p className="mt-2 text-xs font-medium text-tv-green-dark">
                        Continue from Episode {episode.number}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
