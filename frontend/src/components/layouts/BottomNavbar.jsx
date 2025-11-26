import { useIsMobile } from "@/hooks/useIsMobile";
import {
  ChartBarHorizontalIcon,
  ChartPieSliceIcon,
  WalletIcon,
} from "@phosphor-icons/react";
import { NavLink, useLocation } from "react-router";

const tabsMapping = [
  {
    id: 1,
    name: "Mutual Funds",
    icon: ChartPieSliceIcon,
    link: "/mutual-funds#explore",
  },
  {
    id: 2,
    name: "Stocks",
    icon: ChartBarHorizontalIcon,
    link: "/stocks",
  },
  {
    id: 3,
    name: "Wallet",
    icon: WalletIcon,
    link: "/wallet",
  },
];
const allowedRoutes = ["/mutual-funds", "/mutual-funds/", "/wallet", "/stocks"];

function BottomNavbar() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const currentPath = location.pathname;

  if (!allowedRoutes.includes(currentPath)) return;
  if (!isMobile) return;

  return (
    <nav className="bg-background fixed inset-x-0 bottom-0 z-10 flex w-full justify-around border-t pt-2 pb-1">
      {tabsMapping.map((tab) => (
        <NavLink
          to={tab.link}
          key={tab.id}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[0.65rem] font-medium tracking-tighter transition-all duration-100 ease-in-out sm:text-xs ${isActive ? "text-primary dark:text-white" : "text-zinc-500 dark:text-zinc-400"}`
          }
        >
          <tab.icon
            weight={tab.link.includes(currentPath) ? "fill" : "regular"}
            className="size-6"
          />
          {tab.name}
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNavbar;
