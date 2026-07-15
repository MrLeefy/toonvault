import Link from "next/link";
import type { Series } from "@/lib/types";
import { ComicCover } from "@/components/ui/ComicCover";

interface GenreSeriesListProps {
  series: Series[];
  emptyMessage?: string;
}

export function GenreSeriesList({
  series,
  emptyMessage = "No series in this genre yet.",
}: GenreSeriesListProps) {
  if (!series.length) {
    return <p className="px-4 py-12 text-center text-sm text-[#999]">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-5 px-3 pb-4">
      {series.map((item) => (
        <Link key={item.id} href={`/series/${item.slug}`} className="min-w-0">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-[#111]">
            <ComicCover
              title={item.title}
              seed={item.slug}
              genre={item.genres[0]}
              size="lg"
            />
          </div>
          <h2 className="mt-2 line-clamp-2 text-[13px] font-bold leading-tight">{item.title}</h2>
          <p className="mt-0.5 truncate text-[11px] text-[#999]">{item.author}</p>
        </Link>
      ))}
    </div>
  );
}
