import { Search } from "lucide-react";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-12 items-center justify-between bg-white px-3 shadow-[0_1px_0_#eee]">
      <Link href="/" className="flex items-center" aria-label="ToonVault home">
        <span className="text-[22px] font-black italic tracking-tighter text-[#00dc64]">
          TOONVAULT
        </span>
      </Link>

      <div className="flex items-center gap-1">
        <Link
          href="/search"
          className="grid h-9 w-9 place-items-center text-[#222]"
          aria-label="Search"
        >
          <Search aria-hidden size={22} strokeWidth={2.25} />
        </Link>
      </div>
    </header>
  );
}
