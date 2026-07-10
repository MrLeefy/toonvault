"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, List } from "lucide-react";
import { ReaderChrome } from "@/components/reader/ReaderChrome";
import type { Episode, Series } from "@/lib/types";

interface VerticalReaderProps {
  series: Series;
  episode: Episode;
  prev?: Episode;
  next?: Episode;
}

export function VerticalReader({
  series,
  episode,
  prev,
  next,
}: VerticalReaderProps) {
  return (
    <main className="min-h-dvh bg-black">
      <ReaderChrome series={series} episode={episode} prev={prev} next={next} />

      <article className="mx-auto w-full max-w-[480px] bg-black">
        {episode.panels.map((panel, index) => (
          <Image
            key={`${episode.id}-${index}`}
            src={panel}
            alt=""
            width={960}
            height={1440}
            unoptimized
            priority={index < 2}
            sizes="(max-width: 480px) 100vw, 480px"
            className="block h-auto w-full"
          />
        ))}

        <div className="flex min-h-64 flex-col items-center justify-center gap-3 px-6 text-center text-white">
          <p className="text-sm text-white/60">End of episode {episode.number}</p>
          {next ? (
            <Link
              href={`/series/${series.slug}/read/${next.id}`}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-tv-green px-6 text-sm font-extrabold text-white"
            >
              Next episode <ChevronRight size={18} aria-hidden />
            </Link>
          ) : (
            <Link
              href={`/series/${series.slug}`}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-extrabold text-black"
            >
              <List size={18} aria-hidden /> Back to series
            </Link>
          )}
        </div>
      </article>
    </main>
  );
}
