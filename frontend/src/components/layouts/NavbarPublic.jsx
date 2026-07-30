import { useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";

import { useIsMobile } from "@/hooks/useIsMobile";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { navs } from "@/constants/nav";

import ThemeToggle from "../ThemeToggle";
import SidebarSheet from "./SidebarSheet";

function NavbarPublic() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("referralCode");
  const [openSidebar, setOpenSidebar] = useState(false);
  const isMobile = useIsMobile();

  return (
    <nav className="font-poppins fixed top-0 left-1/2 z-50 flex w-full max-w-7xl -translate-x-1/2 items-center justify-between gap-8 mask-b-from-70% px-4 pt-3 pb-4 backdrop-blur-xs sm:p-4 sm:px-6 md:px-8">
      <Link to="/" className="flex items-center justify-center gap-2 sm:gap-4">
        <Logo className="size-8" />
        <span className="font-medium sm:text-2xl">Vestify</span>
      </Link>

      <div className="flex items-center justify-start gap-2 xl:gap-6">
        <NavLinks />
        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setOpenSidebar(true)}
              className="p-6 rounded-full bg-background"
            >
              <div className="flex flex-col items-end gap-1.5">
                <span className="bg-foreground h-0.5 w-7"></span>
                <span className="bg-foreground h-0.5 w-5"></span>
              </div>
            </Button>
            <SidebarSheet open={openSidebar} onOpenChange={setOpenSidebar} />
          </>
        ) : (
          <div className="flex items-center justify-center gap-4 lg:gap-6">
            <ThemeToggle enableHotKey className="rounded-full" />
            <Button
              onClick={() =>
                navigate(
                  referralCode ? `/auth?referralCode=${referralCode}` : "/auth",
                )
              }
              size="lg"
              className="bg-landing hover:bg-landing rounded-full font-normal transition-transform hover:scale-105 max-sm:text-xs"
            >
              SignUp
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavbarPublic;

function NavLinks() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate("/");
  };

  return (
    <div className="flex max-sm:hidden">
      <Button
        variant="ghost"
        onClick={handleHomeClick}
        className=" text-md shrink-0 px-4 py-2 "
      >
        Home
      </Button>

      {navs.map((nav) => (
        <Button key={nav.name} asChild variant="ghost">
          <NavLink
            to={nav.link}
            className={({ isActive }) =>
              `${isActive ? "text-primary" : ""}  text-md shrink-0 rounded-full px-4 py-2 `
            }
          >
            {nav.name}
          </NavLink>
        </Button>
      ))}
    </div>
  );
}
