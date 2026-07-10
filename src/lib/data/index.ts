import type { BannerSlide, Episode, Genre, Series, Weekday } from "@/lib/types";
import { BANNERS } from "./banners";
import { SERIES } from "./series";

export function getAllSeries(): Series[] {
  return SERIES;
}

export function getSeriesBySlug(slug: string): Series | undefined {
  return SERIES.find((series) => series.slug === slug);
}

export function getSeriesByWeekday(day: Weekday): Series[] {
  return SERIES.filter((series) => series.weekday === day);
}

export function getSeriesByGenre(genre: Genre): Series[] {
  return SERIES.filter((series) => series.genres.includes(genre));
}

export function getFeaturedSeries(): Series[] {
  return SERIES.filter((series) => series.featured);
}

export function getOriginals(): Series[] {
  return SERIES.filter((series) => series.isOriginal);
}

export function getCanvas(): Series[] {
  return SERIES.filter((series) => series.isCanvas);
}

function viewsToNumber(views: string): number {
  const match = /^([\d.]+)\s*([MK])?$/i.exec(views.trim());

  if (!match) {
    return 0;
  }

  const value = Number.parseFloat(match[1]);
  const suffix = match[2]?.toUpperCase();

  if (suffix === "M") {
    return value * 1_000_000;
  }

  if (suffix === "K") {
    return value * 1_000;
  }

  return value;
}

export function getPopular(): Series[] {
  return [...SERIES].sort((a, b) => viewsToNumber(b.views) - viewsToNumber(a.views));
}

export function getBanners(): BannerSlide[] {
  return BANNERS;
}

export function searchSeries(query: string): Series[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return SERIES;
  }

  return SERIES.filter((series) =>
    [series.title, series.author, series.synopsis, ...series.genres].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    ),
  );
}

export function getGenres(): Genre[] {
  return [...new Set(SERIES.flatMap((series) => series.genres))];
}

export function getEpisodes(slug: string): Episode[] {
  return getSeriesBySlug(slug)?.episodes ?? [];
}

export function getEpisode(
  slug: string,
  episodeId: string,
):
  | {
      series: Series;
      episode: Episode;
      prev?: Episode;
      next?: Episode;
    }
  | undefined {
  const series = getSeriesBySlug(slug);

  if (!series) {
    return undefined;
  }

  const index = series.episodes.findIndex((episode) => episode.id === episodeId);

  if (index === -1) {
    return undefined;
  }

  return {
    series,
    episode: series.episodes[index],
    prev: series.episodes[index - 1],
    next: series.episodes[index + 1],
  };
}
