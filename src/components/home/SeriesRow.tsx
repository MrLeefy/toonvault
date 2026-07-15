import Link from "next/link";
import type { Series } from "@/lib/types";
import { ComicCover } from "@/components/ui/ComicCover";

type SeriesRowProps = {
  title: string;
  series: Series[];
  moreHref?: string;
  showRank?: boolean;
};

export function SeriesRow({ title, series, moreHref, showRank = false }: SeriesRowProps) {
  if (series.length === 0) return null;

  return (
    <section className="border-t border-[#eee] bg-white py-4">
      <div className="mb-3 flex items-end justify-between px-3">
        <h2 className="text-[17px] font-black tracking-tight text-[#111]">{title}</h2>
        {moreHref && (
          <Link href={moreHref} className="text-[12px] font-semibold text-[#999]">
            more ›
          </Link>
        )}
      </div>
      <div className="no-scrollbar flex gap-2.5 overflow-x-auto px-3 pb-1">
        {series.map((item, index) => {
          const hasNew = item.episodes.some((ep) => ep.isNew);
          return (
            <Link
              key={item.id}
              href={`/series/${item.slug}`}
              className="w-[118px] shrink-0 active:opacity-80"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-[#111]">
                <ComicCover
                  title={item.title}
                  seed={item.slug}
                  genre={item.genres[0]}
                  size="md"
                />
                {showRank && (
                  <span className="absolute left-0 top-0 flex h-6 min-w-6 items-center justify-center bg-black/75 px-1.5 text-[12px] font-black text-white">
                    {index + 1}
                  </span>
                )}
                {hasNew && (
                  <span className="absolute right-1 top-1 rounded-[2px] bg-[#00dc64] px-1 py-[1px] text-[9px] font-black text-black">
                    UP
                  </span>
                )}
              </div>
              <h3 className="mt-1.5 line-clamp-2 text-[12px] font-bold leading-[1.25] text-[#222]">
                {item.title}
              </h3>
              <p className="mt-0.5 truncate text-[11px] text-[#999]">{item.genres[0]}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
