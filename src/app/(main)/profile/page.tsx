"use client";

import {
  Bell,
  ChevronRight,
  CircleHelp,
  Download,
  Info,
  Settings,
  Trash2,
} from "lucide-react";
import { useLibraryStore } from "@/lib/store/library";

const menuItems = [
  { label: "Notifications", icon: Bell },
  { label: "Downloads", icon: Download },
  { label: "Settings", icon: Settings },
  { label: "Help", icon: CircleHelp },
  { label: "About ToonVault", icon: Info },
];

export default function ProfilePage() {
  const clearLibrary = useLibraryStore((state) => state.clearLibrary);

  return (
    <section className="min-h-screen pb-10">
      <header className="px-5 pb-6 pt-6">
        <h1 className="text-2xl font-bold tracking-tight">More</h1>
      </header>

      <div className="flex items-center gap-4 border-y border-tv-line px-5 py-5">
        <div className="flex size-14 items-center justify-center rounded-full bg-tv-green text-xl font-extrabold text-white">
          T
        </div>
        <div>
          <h2 className="font-bold">Guest</h2>
          <p className="mt-0.5 text-sm text-tv-muted">Welcome to ToonVault</p>
        </div>
      </div>

      <nav aria-label="Profile menu" className="mt-3">
        {menuItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className="flex w-full items-center gap-4 px-5 py-4 text-left active:bg-tv-bg-soft"
          >
            <Icon size={21} className="text-tv-muted" />
            <span className="flex-1 text-sm font-medium">{label}</span>
            <ChevronRight size={19} className="text-tv-muted" />
          </button>
        ))}
      </nav>

      <div className="mx-5 mt-4 border-t border-tv-line pt-2">
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Clear all subscriptions and reading history?")) clearLibrary();
          }}
          className="flex w-full items-center gap-4 py-4 text-left text-tv-danger active:opacity-70"
        >
          <Trash2 size={21} />
          <span className="text-sm font-medium">Clear library data</span>
        </button>
      </div>

      <p className="mt-10 text-center text-xs text-tv-muted">ToonVault version 0.1.0</p>
    </section>
  );
}
