import Image from "next/image";
import Link from "next/link";
import type { Series } from "@/lib/types";

interface GenreSeriesListProps {
  series: Series[];
  emptyMessage?: string;
}

export function GenreSeriesList({
  series,
  emptyMessage = "No series in this genre yet.",
}: GenreSeriesListProps) {
  if (!series.length) {
    return <p className="px-5 py-12 text-center text-sm text-tv-muted">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-6 px-5">
      {series.map((item) => (
        <Link key={item.id} href={`/series/${item.slug}`} className="min-w-0">
          <div className="relative aspect-[.7] overflow-hidden rounded-lg bg-tv-bg-soft">
            <Image src={item.cover} alt={item.title} fill sizes="(max-width: 480px) 45vw, 200px" className="object-cover" />
          </div>
          <h2 className="mt-2 truncate text-sm font-bold">{item.title}</h2>
          <p className="mt-0.5 truncate text-xs text-tv-muted">{item.author}</p>
        </Link>
      ))}
    </div>
  );
}
