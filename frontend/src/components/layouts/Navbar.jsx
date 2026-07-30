import { lazy, useState } from "react";
import { SearchIcon } from "lucide-react";
import MediaQuery from "react-responsive";
import { Link, NavLink, useLocation, useNavigate } from "react-router";

import { useIsMobile } from "@/hooks/useIsMobile";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

import ThemeToggle from "../ThemeToggle";

const ProfileAvatar = lazy(() => import("../ProfileAvatar"));
const ProfileSheet = lazy(() => import("../ProfileSheet"));
const DesktopSearch = lazy(
  () => import("../../features/search/components/DesktopSearch"),
);

const allowedRoutes = new Set([
  "/mutual-funds",
  "/mutual-funds/",
  "/stocks",
  "/stocks/",
  "/wallet",
]);

function Navbar() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false);

  if (!allowedRoutes.has(location.pathname) && isMobile) return;

  const handleAvatarClick = () => {
    if (isMobile) {
      navigate("/profile");
      return;
    }
    setIsProfileSheetOpen(true);
  };

  return (
    <nav
      className="bg-background z-50 max-w-[1300px]  mx-auto
     flex items-center justify-between gap-8 px-4 pt-4 pb-2 sm:sticky sm:top-0 sm:px-6 sm:pt-4 sm:pb-6"
    >
      <div className="flex items-center gap-2 sm:gap-4">
        <Link to="/stocks#explore" className="flex items-center gap-2 sm:gap-4">
          <Logo />
        </Link>
        <NavLinks />
      </div>

      <MediaQuery minWidth={1100}>
        <DesktopSearch />
      </MediaQuery>

      {/* ========= Right side buttons ============ */}
      <div className="flex items-center justify-start gap-3 xl:gap-6">
        <Button
          aria-label="search"
          variant="ghost"
          onClick={() => navigate("/search")}
          size="icon"
          className="min-[1100px]:hidden"
        >
          <SearchIcon className="size-5.5" />
        </Button>

        {!isMobile && <ThemeToggle enableHotKey className="rounded-full" />}
        <Button
          onClick={handleAvatarClick}
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <ProfileAvatar className="size-8.5" fallbackClassName="text-sm" />
        </Button>
      </div>
      <ProfileSheet
        open={isProfileSheetOpen}
        onOpenChange={setIsProfileSheetOpen}
      />
    </nav>
  );
}

export default Navbar;

function NavLinks() {
  const links = [
    { to: "/stocks#explore", label: "Stocks" },
    { to: "/mutual-funds#explore", label: "Mutual Funds" },
    { to: "/community", label: "Community" },
    { to: "/wallet", label: "Wallet" },
  ];

  return (
    <div className="flex space-x-1 font-medium sm:text-[1.1rem] sm:font-[550]">
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `${
              isActive
                ? "sm:text-foreground font-semibold"
                : "text-muted-foreground hidden sm:inline-block"
            } shrink-0 rounded-md p-2`
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
}
