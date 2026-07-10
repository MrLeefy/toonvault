import type { ReactNode } from "react";

import { AppHeader } from "./AppHeader";
import { BottomNav } from "./BottomNav";

type MobileShellProps = {
  children: ReactNode;
  showNav?: boolean;
  showHeader?: boolean;
};

export function MobileShell({
  children,
  showNav = true,
  showHeader = true,
}: MobileShellProps) {
  return (
    <div className="tv-shell">
      {showHeader ? <AppHeader /> : null}
      <main className={showNav ? "tv-main" : "tv-main !pb-0"}>{children}</main>
      {showNav ? <BottomNav /> : null}
    </div>
  );
}
