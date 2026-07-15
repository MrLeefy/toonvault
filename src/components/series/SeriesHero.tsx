"use client";

import Link from "next/link";
import { Check, ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import { ComicCover } from "@/components/ui/ComicCover";
import { useLibraryStore } from "@/lib/store/library";
import type { Series } from "@/lib/types";

interface SeriesHeroProps {
  series: Series;
}

export function SeriesHero({ series }: SeriesHeroProps) {
  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);
  const isSubscribed = useLibraryStore((state) => state.isSubscribed(series.slug));
  const toggleSubscribe = useLibraryStore((state) => state.toggleSubscribe);
  const progressEpisodeId = useLibraryStore(
    (state) => state.getProgress(series.slug)?.episodeId,
  );
  const firstEpisode = series.episodes[0];
  const progressEpisode = series.episodes.find(
    (episode) => episode.id === progressEpisodeId,
  );
  const startEpisode = progressEpisode ?? firstEpisode;

  return (
    <section className="bg-white">
      <div className="relative aspect-[5/4] overflow-hidden bg-black">
        <ComicCover
          title={series.title}
          seed={`${series.slug}-banner`}
          size="hero"
          showTitle={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[12px] font-semibold text-white/80">{series.author}</p>
          <h1 className="mt-1 text-[26px] font-black leading-tight tracking-tight text-white">
            {series.title}
          </h1>
          <p className="mt-2 text-[12px] font-medium text-white/75">
            {series.genres.join(" · ")} · {series.ageRating}
          </p>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => toggleSubscribe(series.slug)}
            className={`flex h-11 flex-1 items-center justify-center gap-1.5 text-sm font-extrabold ${
              isSubscribed
                ? "bg-[#00dc64] text-black"
                : "border border-[#00dc64] bg-white text-[#00dc64]"
            }`}
          >
            {isSubscribed ? <Check size={17} aria-hidden /> : <Plus size={17} aria-hidden />}
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
          {startEpisode && (
            <Link
              href={`/series/${series.slug}/read/${startEpisode.id}`}
              className="flex h-11 flex-[1.2] items-center justify-center bg-[#111] text-sm font-extrabold text-white"
            >
              {progressEpisode ? "Continue" : "First episode"}
            </Link>
          )}
        </div>

        <div className="mt-4 flex gap-4 text-[12px] font-semibold text-[#777]">
          <span>♥ {series.subscribers}</span>
          <span>{series.views} views</span>
          <span>★ {series.rating.toFixed(1)}</span>
        </div>

        <div className="mt-4">
          <p
            className={`text-[13px] leading-5 text-[#555] ${
              isSynopsisExpanded ? "" : "line-clamp-3"
            }`}
          >
            {series.synopsis}
          </p>
          <button
            type="button"
            onClick={() => setIsSynopsisExpanded((expanded) => !expanded)}
            className="mt-1 inline-flex items-center gap-0.5 text-[12px] font-bold text-[#999]"
            aria-expanded={isSynopsisExpanded}
          >
            {isSynopsisExpanded ? "Show less" : "More"}
            <ChevronDown
              size={14}
              className={isSynopsisExpanded ? "rotate-180" : ""}
              aria-hidden
            />
          </button>
        </div>
      </div>
    </section>
  );
}
