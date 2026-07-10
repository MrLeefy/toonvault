import Image from "next/image";
import Link from "next/link";
import type { Series } from "@/lib/types";

type SeriesRowProps = {
  title: string;
  series: Series[];
  moreHref?: string;
};

export function SeriesRow({ title, series, moreHref }: SeriesRowProps) {
  if (series.length === 0) return null;

  return (
    <section className="border-t border-tv-line py-4">
      <div className="mb-3 flex items-center justify-between px-4">
        <h2 className="text-base font-bold tracking-tight">{title}</h2>
        {moreHref && (
          <Link href={moreHref} className="text-xs font-semibold text-tv-muted">
            More
          </Link>
        )}
      </div>
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-0.5">
        {series.map((item) => (
          <Link
            key={item.id}
            href={`/series/${item.slug}`}
            className="w-[110px] shrink-0"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-tv-bg-soft">
              <Image
                src={item.cover}
                alt={`${item.title} cover`}
                fill
                sizes="110px"
                className="object-cover"
              />
            </div>
            <h3 className="mt-2 line-clamp-2 text-[13px] font-bold leading-[1.25]">
              {item.title}
            </h3>
            <p className="mt-1 truncate text-[11px] text-tv-muted">{item.author}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
