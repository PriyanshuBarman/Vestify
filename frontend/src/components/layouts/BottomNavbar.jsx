import {
  ChartPieSliceIcon,
  UsersThreeIcon,
  WalletIcon,
} from "@phosphor-icons/react";
import { NavLink, useLocation } from "react-router";

import { useIsMobile } from "@/hooks/useIsMobile";

const TABS = [
  {
    id: 1,
    name: "Mutual Funds",
    icon: ChartPieSliceIcon,
    link: "/mutual-funds#explore",
  },
  {
    id: 4,
    name: "Community",
    icon: UsersThreeIcon,
    link: "/community",
  },
  {
    id: 3,
    name: "Wallet",
    icon: WalletIcon,
    link: "/wallet",
  },
];

const allowedRoutes = [
  "/mutual-funds",
  "/mutual-funds/",
  "/wallet",
  "/community",
];

function BottomNavbar() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const currentPath = location.pathname;
  const activeIndex = TABS.findIndex((tab) => tab.link.startsWith(currentPath));
  if (!allowedRoutes.includes(currentPath)) return;
  if (!isMobile) return;

  return (
    <nav className="bg-background fixed inset-x-0 bottom-0 z-10 border-t">
      <div className="grid grid-cols-3 pt-2 pb-1">
        {TABS.map((tab) => (
          <NavLink
            to={tab.link}
            key={tab.id}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[0.65rem] font-medium tracking-tighter transition-all duration-100 ease-in-out sm:text-xs ${isActive ? "text-primary dark:text-foreground" : "dark:text-muted-foreground text-zinc-500"}`
            }
          >
            <tab.icon
              weight={tab.link.includes(currentPath) ? "fill" : "regular"}
              className="size-6"
            />
            {tab.name}
          </NavLink>
        ))}
      </div>
      {/* Active Tab Indicator */}
      <div
        className="absolute top-0 left-0 w-1/3 transition-transform duration-200 ease-out"
        style={{ transform: `translateX(${Math.max(activeIndex, 0) * 100}%)` }}
      >
        <div className="bg-primary dark:bg-foreground mx-auto h-1 w-2/3 rounded-b-2xl" />
      </div>
    </nav>
  );
}

export default BottomNavbar;
