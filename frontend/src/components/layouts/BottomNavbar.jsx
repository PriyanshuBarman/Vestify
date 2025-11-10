import { useIsMobile } from "@/hooks/useIsMobile";
import {
  ChartNoAxesCombined,
  HandCoins,
  PieChartIcon,
  Wallet2Icon,
} from "lucide-react";
import { NavLink, useLocation } from "react-router";

const tabsMapping = [
  {
    id: 1,
    name: "Mutual Funds",
    icon: PieChartIcon,
    link: "/mutual-funds#explore",
  },
  {
    id: 2,
    name: "Stocks",
    icon: ChartNoAxesCombined,
    link: "/stocks",
  },
  // {
  //   id: 3,
  //   name: "Gold",
  //   icon: HandCoins,
  //   link: "/gold",
  // },
  {
    id: 4,
    name: "Wallet",
    icon: Wallet2Icon,
    link: "/wallet",
  },
];
const allowedRoutes = [
  "/mutual-funds",
  "/mutual-funds/",
  "/wallet",
  "/stocks",
  "/gold",
];

function BottomNavbar() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const currentPath = location.pathname;

  if (!allowedRoutes.includes(currentPath)) return;
  if (!isMobile) return;

  return (
    <nav className="bg-background fixed inset-x-0 bottom-0 z-10 flex w-full justify-around border-t py-2">
      {tabsMapping.map((tab) => (
        <NavLink
          to={tab.link}
          key={tab.id}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[0.65rem] font-medium transition-all duration-200 hover:scale-105 sm:text-xs ${isActive ? "text-primary font-semibold dark:text-white" : "text-zinc-500 dark:text-zinc-400"}`
          }
        >
          <tab.icon
            className={`size-5 ${tab.link.includes(currentPath) && "stroke-[2.5]"}`}
          />
          {tab.name}
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNavbar;
