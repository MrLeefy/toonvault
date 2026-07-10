"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useMemo, useState } from "react";
import { useLibraryStore } from "@/lib/store/library";
import type { Episode, Series } from "@/lib/types";

interface EpisodeListProps {
  series: Series;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function EpisodeRow({
  episode,
  seriesSlug,
}: {
  episode: Episode;
  seriesSlug: string;
}) {
  const isLiked = useLibraryStore((state) => state.isLiked(episode.id));
  const toggleLikeEpisode = useLibraryStore((state) => state.toggleLikeEpisode);

  return (
    <li className="border-b border-tv-line last:border-b-0">
      <div className="flex min-h-24 items-center gap-3 px-5 py-3">
        <Link
          href={`/series/${seriesSlug}/read/${episode.id}`}
          className="relative size-16 shrink-0 overflow-hidden rounded-md bg-zinc-100"
          aria-label={`Read episode ${episode.number}: ${episode.title}`}
        >
          <Image
            src={episode.thumbnail}
            alt=""
            fill
            unoptimized
            sizes="64px"
            className="object-cover"
          />
        </Link>
        <Link
          href={`/series/${seriesSlug}/read/${episode.id}`}
          className="min-w-0 flex-1 self-stretch py-0.5"
        >
          <div className="flex items-center gap-1.5">
            <p className="truncate text-sm font-bold text-tv-ink">
              #{episode.number} {episode.title}
            </p>
            {episode.isNew && (
              <span className="rounded bg-tv-green px-1 py-0.5 text-[9px] font-extrabold text-white">
                NEW
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-tv-muted">{formatDate(episode.publishedAt)}</p>
          <p className="mt-1 text-xs text-tv-muted">{episode.likes.toLocaleString()} likes</p>
        </Link>
        <button
          type="button"
          onClick={() => toggleLikeEpisode(episode.id)}
          className={`grid size-9 shrink-0 place-items-center rounded-full transition-colors ${
            isLiked ? "text-tv-danger" : "text-zinc-400"
          }`}
          aria-label={isLiked ? "Unlike episode" : "Like episode"}
          aria-pressed={isLiked}
        >
          <Heart size={20} fill={isLiked ? "currentColor" : "none"} aria-hidden />
        </button>
      </div>
    </li>
  );
}

export function EpisodeList({ series }: EpisodeListProps) {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const episodes = useMemo(
    () =>
      [...series.episodes].sort((a, b) =>
        sortOrder === "newest" ? b.number - a.number : a.number - b.number,
      ),
    [series.episodes, sortOrder],
  );

  return (
    <section className="mt-2 bg-white">
      <div className="flex items-center justify-between border-b border-tv-line px-5 py-4">
        <h2 className="text-base font-extrabold text-tv-ink">
          Episodes <span className="text-tv-muted">({series.episodes.length})</span>
        </h2>
        <div className="rounded-md bg-zinc-100 p-0.5 text-xs font-bold">
          <button
            type="button"
            onClick={() => setSortOrder("newest")}
            className={`rounded px-2.5 py-1.5 ${
              sortOrder === "newest" ? "bg-white text-tv-ink shadow-sm" : "text-tv-muted"
            }`}
          >
            Newest
          </button>
          <button
            type="button"
            onClick={() => setSortOrder("oldest")}
            className={`rounded px-2.5 py-1.5 ${
              sortOrder === "oldest" ? "bg-white text-tv-ink shadow-sm" : "text-tv-muted"
            }`}
          >
            Oldest
          </button>
        </div>
      </div>
      <ul>
        {episodes.map((episode) => (
          <EpisodeRow key={episode.id} episode={episode} seriesSlug={series.slug} />
        ))}
      </ul>
    </section>
  );
}
