import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EpisodeList } from "@/components/series/EpisodeList";
import { SeriesHero } from "@/components/series/SeriesHero";
import { getSeriesBySlug } from "@/lib/data";

interface SeriesPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  return {
    title: series ? `${series.title} | ToonVault` : "Series not found | ToonVault",
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  if (!series) {
    notFound();
  }

  return (
    <main className="tv-main bg-tv-bg">
      <SeriesHero series={series} />
      <EpisodeList series={series} />
    </main>
  );
}
