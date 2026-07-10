"use client";

import { useState } from "react";
import type { Weekday } from "@/lib/types";

const days: { value: Weekday; label: string }[] = [
  { value: "MON", label: "MON" },
  { value: "TUE", label: "TUE" },
  { value: "WED", label: "WED" },
  { value: "THU", label: "THU" },
  { value: "FRI", label: "FRI" },
  { value: "SAT", label: "SAT" },
  { value: "SUN", label: "SUN" },
  { value: "COMPLETED", label: "FIN" },
];

const weekdayFromDate = (): Weekday => {
  const currentDay = new Date().getDay();
  return days[currentDay === 0 ? 6 : currentDay - 1].value;
};

type WeekdayTabsProps = {
  initialDay?: Weekday;
  onChange: (day: Weekday) => void;
};

export function WeekdayTabs({ initialDay, onChange }: WeekdayTabsProps) {
  const [activeDay, setActiveDay] = useState<Weekday>(initialDay ?? weekdayFromDate);

  const selectDay = (day: Weekday) => {
    setActiveDay(day);
    onChange(day);
  };

  return (
    <div className="sticky top-0 z-20 border-b border-tv-line bg-white">
      <div className="no-scrollbar flex min-w-max overflow-x-auto px-2">
        {days.map((day) => (
          <button
            key={day.value}
            type="button"
            onClick={() => selectDay(day.value)}
            className={`relative flex h-11 shrink-0 items-center px-3 text-[11px] font-extrabold tracking-wide transition-colors ${
              activeDay === day.value ? "text-black" : "text-tv-muted"
            }`}
          >
            {day.label}
            {activeDay === day.value && (
              <span className="absolute inset-x-2 bottom-0 h-0.5 bg-[#00d66f]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
