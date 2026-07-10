"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLibraryStore } from "@/lib/store/library";
import type { Episode, Series } from "@/lib/types";

interface ReaderChromeProps {
  series: Series;
  episode: Episode;
  prev?: Episode;
  next?: Episode;
}

export function ReaderChrome({ series, episode, prev, next }: ReaderChromeProps) {
  const [isVisible, setIsVisible] = useState(true);
  const isLiked = useLibraryStore((state) => state.isLiked(episode.id));
  const toggleLikeEpisode = useLibraryStore((state) => state.toggleLikeEpisode);
  const setProgress = useLibraryStore((state) => state.setProgress);
  const addRecent = useLibraryStore((state) => state.addRecent);

  useEffect(() => {
    setProgress(series.slug, episode.id);
    addRecent(series.slug);
  }, [addRecent, episode.id, series.slug, setProgress]);

  useEffect(() => {
    const toggleChromeOnCenterTap = (event: MouseEvent) => {
      const isCenterX = event.clientX > window.innerWidth * 0.25 && event.clientX < window.innerWidth * 0.75;
      const isCenterY = event.clientY > window.innerHeight * 0.25 && event.clientY < window.innerHeight * 0.75;

      if (isCenterX && isCenterY) {
        setIsVisible((visible) => !visible);
      }
    };

    document.addEventListener("click", toggleChromeOnCenterTap);
    return () => document.removeEventListener("click", toggleChromeOnCenterTap);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-30 text-white transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden={!isVisible}
    >
      <header
        className={`flex items-center gap-3 bg-gradient-to-b from-black/85 to-transparent px-4 pb-8 pt-[calc(env(safe-area-inset-top)+12px)] ${
          isVisible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <Link
          href={`/series/${series.slug}`}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-black/30"
          aria-label="Back to series"
        >
          <X size={22} aria-hidden />
        </Link>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">{series.title}</p>
          <p className="truncate text-xs text-white/70">
            #{episode.number} {episode.title}
          </p>
        </div>
      </header>

      <nav
        className={`absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/90 to-transparent px-4 pb-[calc(env(safe-area-inset-bottom)+14px)] pt-10 ${
          isVisible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {prev ? (
          <Link
            href={`/series/${series.slug}/read/${prev.id}`}
            className="flex min-w-20 items-center gap-1 text-sm font-semibold"
          >
            <ChevronLeft size={18} aria-hidden /> Prev
          </Link>
        ) : (
          <span className="min-w-20 text-sm text-white/35">Prev</span>
        )}

        <span className="text-sm font-bold">Episode {episode.number}</span>

        <div className="flex min-w-20 items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => toggleLikeEpisode(episode.id)}
            className={`grid size-9 place-items-center rounded-full ${
              isLiked ? "bg-tv-danger text-white" : "bg-white/15 text-white"
            }`}
            aria-label={isLiked ? "Unlike episode" : "Like episode"}
            aria-pressed={isLiked}
          >
            <Heart size={17} fill={isLiked ? "currentColor" : "none"} aria-hidden />
          </button>
          {next ? (
            <Link
              href={`/series/${series.slug}/read/${next.id}`}
              className="flex items-center gap-1 text-sm font-semibold"
            >
              Next <ChevronRight size={18} aria-hidden />
            </Link>
          ) : (
            <span className="text-sm text-white/35">Next</span>
          )}
        </div>
      </nav>
    </div>
  );
}
