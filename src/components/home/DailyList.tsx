"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Series, Weekday } from "@/lib/types";
import { ComicCover } from "@/components/ui/ComicCover";
import { WeekdayTabs } from "./WeekdayTabs";

const days: Weekday[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN", "COMPLETED"];

const getToday = (): Weekday => {
  const today = new Date().getDay();
  return days[today === 0 ? 6 : today - 1];
};

function formatLikes(subscribers: string): string {
  return subscribers.replace(/K|M/, (m) => m);
}

type DailyListProps = {
  series: Series[];
};

export function DailyList({ series }: DailyListProps) {
  const [selectedDay, setSelectedDay] = useState<Weekday>(getToday);
  const dailySeries = useMemo(
    () => series.filter((item) => item.weekday === selectedDay),
    [selectedDay, series],
  );

  return (
    <section aria-label="Daily series" className="bg-white">
      <WeekdayTabs initialDay={selectedDay} onChange={setSelectedDay} />

      {dailySeries.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-2 gap-y-5 px-3 pb-5 pt-3">
          {dailySeries.map((item) => {
            const hasNew = item.episodes.some((ep) => ep.isNew);
            return (
              <Link key={item.id} href={`/series/${item.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-[#111]">
                  <ComicCover
                    title={item.title}
                    seed={item.slug}
                    genre={item.genres[0]}
                    size="lg"
                  />
                  {hasNew && (
                    <span className="absolute right-1.5 top-1.5 rounded-[2px] bg-[#00dc64] px-1.5 py-[2px] text-[10px] font-black leading-none text-black">
                      UP
                    </span>
                  )}
                </div>
                <h3 className="mt-2 line-clamp-2 text-[13px] font-bold leading-[1.25] text-[#111] group-active:opacity-70">
                  {item.title}
                </h3>
                <p className="mt-0.5 truncate text-[11px] text-[#888]">
                  {item.genres.slice(0, 2).join(" · ")}
                </p>
                <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-[#999]">
                  <span className="text-[#00dc64]" aria-hidden>
                    ♥
                  </span>
                  {formatLikes(item.subscribers)}
                </p>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="px-4 py-12 text-center text-sm text-[#999]">
          No series scheduled for this day.
        </p>
      )}
    </section>
  );
}
