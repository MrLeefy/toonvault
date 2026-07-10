"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Series, Weekday } from "@/lib/types";
import { WeekdayTabs } from "./WeekdayTabs";

const days: Weekday[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN", "COMPLETED"];

const getToday = (): Weekday => {
  const today = new Date().getDay();
  return days[today === 0 ? 6 : today - 1];
};

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
    <section aria-label="Daily series">
      <WeekdayTabs initialDay={selectedDay} onChange={setSelectedDay} />
      <div className="px-4 py-3">
        <h2 className="mb-2 text-base font-bold tracking-tight">Daily</h2>
        {dailySeries.length > 0 ? (
          <div className="divide-y divide-tv-line">
            {dailySeries.map((item) => (
              <Link
                key={item.id}
                href={`/series/${item.slug}`}
                className="flex gap-3 py-3 first:pt-1"
              >
                <div className="relative h-[86px] w-[115px] shrink-0 overflow-hidden bg-tv-bg-soft">
                  <Image
                    src={item.cover}
                    alt={`${item.title} cover`}
                    fill
                    sizes="115px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 py-0.5">
                  <h3 className="truncate text-sm font-bold">{item.title}</h3>
                  <p className="mt-0.5 truncate text-xs text-tv-muted">{item.author}</p>
                  <div className="mt-2 flex gap-1 overflow-hidden">
                    {item.genres.slice(0, 2).map((genre) => (
                      <span
                        key={genre}
                        className="truncate rounded-sm bg-tv-bg-soft px-1.5 py-0.5 text-[10px] font-medium text-zinc-600"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <p className="mt-1.5 text-[10px] font-medium text-tv-muted">
                    ♥ {item.subscribers} · {item.views} views
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-tv-muted">No series update today.</p>
        )}
      </div>
    </section>
  );
}
