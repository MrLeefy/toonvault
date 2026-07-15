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
  { value: "COMPLETED", label: "COMPLETED" },
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
    <div className="border-b border-[#eaeaea] bg-white">
      <div className="grid grid-cols-8">
        {days.map((day) => {
          const active = activeDay === day.value;
          return (
            <button
              key={day.value}
              type="button"
              onClick={() => selectDay(day.value)}
              className={`relative flex h-10 items-center justify-center text-[11px] font-bold tracking-tight transition-colors ${
                active ? "text-[#111]" : "text-[#b0b0b0]"
              }`}
            >
              <span className={day.value === "COMPLETED" ? "text-[9px] tracking-tighter" : ""}>
                {day.label === "COMPLETED" ? "FIN" : day.label}
              </span>
              {active && (
                <span className="absolute inset-x-[18%] bottom-0 h-[3px] rounded-t-full bg-[#00dc64]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
