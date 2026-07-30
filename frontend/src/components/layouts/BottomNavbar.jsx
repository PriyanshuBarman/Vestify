import {
  ChartPieIcon,
  UsersThreeIcon,
  WalletIcon,
} from "@phosphor-icons/react";
import { ChartNoAxesCombinedIcon } from "lucide-react";
import { motion } from "motion/react";
import { NavLink, useLocation } from "react-router";

import { useIsMobile } from "@/hooks/useIsMobile";

const TABS = [
  {
    id: 1,
    name: "Stocks",
    icon: ChartNoAxesCombinedIcon,
    link: "/stocks#explore",
    basePath: "/stocks",
  },
  {
    id: 2,
    name: "Mutual Funds",
    icon: ChartPieIcon,
    link: "/mutual-funds#explore",
    basePath: "/mutual-funds",
  },
  {
    id: 3,
    name: "Community",
    icon: UsersThreeIcon,
    link: "/community",
    basePath: "/community",
  },
  {
    id: 4,
    name: "Wallet",
    icon: WalletIcon,
    link: "/wallet",
    basePath: "/wallet",
  },
];

const allowedRoutes = [
  "/mutual-funds",
  "/mutual-funds/",
  "/stocks",
  "/stocks/",
  "/wallet",
  "/community",
];

function BottomNavbar() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const currentPath = location.pathname;

  if (!allowedRoutes.includes(currentPath)) return null;
  if (!isMobile) return null;

  return (
    <nav className="bg-background fixed inset-x-0 bottom-0 z-10 border-t">
      <div className="flex  justify-between gap-4 px-4 pb-1">
        {TABS.map((tab) => {
          const isActive = tab.basePath
            ? currentPath.startsWith(tab.basePath)
            : tab.link.includes(currentPath);

          return (
            <NavLink
              to={tab.link}
              key={tab.id}
              className={`relative flex-1 flex flex-col pt-2 items-center gap-1 text-[0.65rem] font-medium tracking-tighter transition-colors duration-150 sm:text-xs ${
                isActive
                  ? "text-primary dark:text-foreground"
                  : "text-zinc-500 dark:text-muted-foreground"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="bg-primary dark:bg-foreground  absolute top-0 left-1/2 h-1 w-full -translate-x-1/2 rounded-b-full"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}
              <tab.icon
                weight={isActive ? "fill" : "regular"}
                className="size-6"
              />
              {tab.name}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNavbar;
