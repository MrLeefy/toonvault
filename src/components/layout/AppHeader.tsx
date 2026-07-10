import { Search } from "lucide-react";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-[var(--header-height)] items-center justify-between border-b border-tv-line bg-white px-4">
      <Link
        href="/"
        className="flex items-center gap-1 text-lg font-extrabold tracking-tight text-tv-ink"
        aria-label="ToonVault home"
      >
        <span className="inline-flex h-5 w-1 rounded-full bg-tv-green" aria-hidden="true" />
        <span>
          <span className="text-tv-green">Toon</span>Vault
        </span>
      </Link>

      <Link
        href="/search"
        className="grid h-9 w-9 place-items-center rounded-full text-tv-ink transition-colors hover:bg-tv-bg-soft"
        aria-label="Search"
      >
        <Search aria-hidden="true" size={21} />
      </Link>
    </header>
  );
}
