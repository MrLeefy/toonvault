import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { GenreSeriesList } from "@/components/genres/GenreSeriesList";
import { getSeriesByGenre } from "@/lib/data";
import type { Genre } from "@/lib/types";

export default async function GenrePage({
  params,
}: {
  params: Promise<{ genre: string }>;
}) {
  const { genre: encodedGenre } = await params;
  const genre = decodeURIComponent(encodedGenre) as Genre;
  const series = getSeriesByGenre(genre);

  return (
    <section className="pb-8">
      <header className="flex items-center gap-3 px-4 py-4">
        <Link href="/genres" aria-label="Back to discover" className="rounded-full p-1.5">
          <ChevronLeft size={22} />
        </Link>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-tv-green-dark">Genre</p>
          <h1 className="text-xl font-bold">{genre}</h1>
        </div>
      </header>
      <GenreSeriesList series={series} emptyMessage={`No ${genre} series yet.`} />
    </section>
  );
}
