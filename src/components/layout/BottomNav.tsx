"use client";

import {
  Bookmark,
  Compass,
  Home,
  Menu,
  Search,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive: (pathname: string) => boolean;
};

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Home",
    icon: Home,
    isActive: (pathname) => pathname === "/",
  },
  {
    href: "/genres",
    label: "Discover",
    icon: Compass,
    isActive: (pathname) => pathname === "/genres" || pathname.startsWith("/genres/"),
  },
  {
    href: "/search",
    label: "Search",
    icon: Search,
    isActive: (pathname) => pathname === "/search",
  },
  {
    href: "/library",
    label: "My",
    icon: Bookmark,
    isActive: (pathname) => pathname === "/library" || pathname.startsWith("/library/"),
  },
  {
    href: "/profile",
    label: "More",
    icon: Menu,
    isActive: (pathname) => pathname === "/profile" || pathname.startsWith("/profile/"),
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto flex h-[calc(var(--nav-height)+var(--safe-bottom))] w-full max-w-[480px] border-t border-tv-line bg-white pb-[var(--safe-bottom)]"
    >
      {navItems.map(({ href, label, icon: Icon, isActive }) => {
        const active = isActive(pathname);

        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors ${
              active ? "text-tv-green" : "text-tv-muted hover:text-tv-ink"
            }`}
            aria-current={active ? "page" : undefined}
          >
            <Icon aria-hidden="true" size={21} strokeWidth={active ? 2.5 : 2} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
