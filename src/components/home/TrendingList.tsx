import Link from "next/link";
import type { Series } from "@/lib/types";
import { ComicCover } from "@/components/ui/ComicCover";

type TrendingListProps = {
  series: Series[];
};

export function TrendingList({ series }: TrendingListProps) {
  const top = series.slice(0, 10);

  return (
    <section className="border-t border-[#eee] bg-white px-3 py-4">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-[17px] font-black tracking-tight text-[#111]">
          Trending &amp; Popular
        </h2>
        <Link href="/genres" className="text-[12px] font-semibold text-[#999]">
          more ›
        </Link>
      </div>

      <div className="space-y-0">
        {top.map((item, index) => {
          const hasNew = item.episodes.some((ep) => ep.isNew);
          return (
            <Link
              key={item.id}
              href={`/series/${item.slug}`}
              className="flex items-center gap-3 border-b border-[#f3f3f3] py-2.5 last:border-b-0 active:bg-[#fafafa]"
            >
              <span
                className={`w-5 shrink-0 text-center text-[15px] font-black ${
                  index < 3 ? "text-[#00dc64]" : "text-[#bbb]"
                }`}
              >
                {index + 1}
              </span>
              <div className="relative h-[72px] w-[54px] shrink-0 overflow-hidden rounded-[2px]">
                <ComicCover
                  title={item.title}
                  seed={item.slug}
                  showTitle={false}
                  size="sm"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  {hasNew && (
                    <span className="rounded-[2px] bg-[#00dc64] px-1 py-[1px] text-[9px] font-black text-black">
                      UP
                    </span>
                  )}
                  <h3 className="truncate text-[14px] font-bold text-[#111]">{item.title}</h3>
                </div>
                <p className="mt-0.5 truncate text-[12px] text-[#999]">
                  {item.genres[0]}
                  {item.genres[1] ? ` · ${item.genres[1]}` : ""}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
