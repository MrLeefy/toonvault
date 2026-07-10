"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown, Eye, Play, Plus, Users } from "lucide-react";
import { useState } from "react";
import { useLibraryStore } from "@/lib/store/library";
import type { Series } from "@/lib/types";

interface SeriesHeroProps {
  series: Series;
}

export function SeriesHero({ series }: SeriesHeroProps) {
  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);
  const isSubscribed = useLibraryStore((state) =>
    state.isSubscribed(series.slug),
  );
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
      <div className="relative h-56 overflow-hidden bg-zinc-900">
        <Image
          src={series.banner}
          alt=""
          fill
          priority
          unoptimized
          sizes="(max-width: 480px) 100vw, 480px"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />
        <div className="absolute -bottom-8 left-5 size-28 overflow-hidden rounded-xl border-4 border-white bg-zinc-200 shadow-lg">
          <Image
            src={series.cover}
            alt={`${series.title} cover`}
            fill
            unoptimized
            sizes="112px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="px-5 pb-6 pt-11">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-tv-ink">
              {series.title}
            </h1>
            <p className="mt-1 text-sm text-tv-muted">by {series.author}</p>
          </div>
          <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-bold text-zinc-600">
            {series.ageRating}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {series.genres.map((genre) => (
            <span
              key={genre}
              className="rounded-full bg-tv-green-soft px-2.5 py-1 text-xs font-semibold text-tv-green-dark"
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="mt-4 flex gap-4 text-xs text-tv-muted">
          <span className="flex items-center gap-1">
            <Eye size={14} aria-hidden /> {series.views}
          </span>
          <span className="flex items-center gap-1">
            <Users size={14} aria-hidden /> {series.subscribers}
          </span>
        </div>

        <button
          type="button"
          onClick={() => toggleSubscribe(series.slug)}
          className={`mt-5 flex h-11 w-full items-center justify-center gap-1.5 rounded-lg text-sm font-bold transition-colors ${
            isSubscribed
              ? "bg-tv-green text-white"
              : "border border-tv-green bg-white text-tv-green"
          }`}
        >
          {isSubscribed ? <Check size={17} aria-hidden /> : <Plus size={17} aria-hidden />}
          {isSubscribed ? "Subscribed" : "Subscribe"}
        </button>

        <div className="mt-5">
          <p
            className={`text-sm leading-6 text-zinc-600 ${
              isSynopsisExpanded ? "" : "line-clamp-3"
            }`}
          >
            {series.synopsis}
          </p>
          <button
            type="button"
            onClick={() => setIsSynopsisExpanded((expanded) => !expanded)}
            className="mt-1 inline-flex items-center gap-0.5 text-sm font-semibold text-tv-muted"
            aria-expanded={isSynopsisExpanded}
          >
            {isSynopsisExpanded ? "Show less" : "Read more"}
            <ChevronDown
              size={15}
              className={isSynopsisExpanded ? "rotate-180" : ""}
              aria-hidden
            />
          </button>
        </div>

        {startEpisode && (
          <Link
            href={`/series/${series.slug}/read/${startEpisode.id}`}
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-tv-green text-sm font-extrabold text-white transition-colors hover:bg-tv-green-dark"
          >
            <Play size={17} fill="currentColor" aria-hidden />
            {progressEpisode ? "Continue" : "First episode"}
          </Link>
        )}
      </div>
    </section>
  );
}
