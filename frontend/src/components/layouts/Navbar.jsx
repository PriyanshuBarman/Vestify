import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-togle";
import { useIsMobile } from "@/hooks/useIsMobile";
import { SearchIcon } from "lucide-react";
import { lazy, useState } from "react";
import MediaQuery from "react-responsive";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
const ProfileAvatar = lazy(() => import("../ProfileAvatar"));
const ProfileSheet = lazy(() => import("../ProfileSheet"));
const DesktopSearch = lazy(
  () => import("../../features/search/components/DesktopSearch"),
);

const allowedRoutes = new Set([
  "/mutual-funds",
  "/mutual-funds/",
  "/wallet",
  "/stocks",
  "/gold",
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

  const prefetchPage = () => {
    import("@/pages/SettingsPage");
    import("@/pages/AccountDetailsPage");
    import("@/pages/ReferAndEarnPage");
  };

  return (
    <nav className="bg-background z-50 flex items-center justify-between gap-8 px-4 pt-4 pb-2 sm:sticky sm:top-0 sm:px-6 sm:pt-2 sm:pb-6">
      <Link
        to="mutual-funds#explore"
        className="flex items-center gap-2 sm:gap-4"
      >
        <Logo />
        <NavLinks />
      </Link>

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

        {!isMobile && <ModeToggle />}
        <Button
          onClick={handleAvatarClick}
          onMouseEnter={prefetchPage}
          onTouchStart={prefetchPage}
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
  return (
    <div className="flex sm:text-lg">
      <NavLink
        to="/stocks"
        className={({ isActive }) =>
          `${isActive ? "sm:text-foreground" : "text-muted-foreground hidden"} shrink-0 rounded-md p-2 font-medium`
        }
      >
        Stocks
      </NavLink>

      <NavLink
        to="/mutual-funds#explore"
        className={({ isActive }) =>
          `${isActive ? "sm:text-foreground" : "text-muted-foreground hidden sm:inline-block"} shrink-0 rounded-md p-2 font-medium`
        }
      >
        Mutual Funds
      </NavLink>
      <NavLink
        to="/wallet"
        className={({ isActive }) =>
          `${isActive ? "sm:text-foreground" : "text-muted-foreground hidden sm:inline-block"} shrink-0 rounded-md p-2 font-medium`
        }
      >
        Wallet
      </NavLink>
    </div>
  );
}
