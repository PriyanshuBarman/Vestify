import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import { ModeToggle } from "../ui/mode-togle";
import SidebarSheet from "./SidebarSheet";
import { navs } from "@/constants/nav";

function NavbarPublic() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const isMobile = useIsMobile();

  return (
    <nav className="bg-backgroun fixed top-0 z-50 flex w-full max-w-7xl items-center justify-between gap-8 mask-b-from-70% px-5 py-4 sm:p-4">
      <Link to="/" className="flex items-center justify-center gap-2 sm:gap-4">
        <Logo className="size-8" />
        <span className="font-[550] sm:text-2xl">Vestify</span>
      </Link>

      <div className="flex items-center justify-start gap-2 xl:gap-6">
        <NavLinks />
        {!isMobile && <ModeToggle />}

        {isMobile && (
          <>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setOpenSidebar(true)}
            >
              <MenuIcon className="size-6" />
            </Button>
            <SidebarSheet open={openSidebar} onOpenChange={setOpenSidebar} />
          </>
        )}
      </div>
    </nav>
  );
}

export default NavbarPublic;

function NavLinks() {
  return (
    <div className="flex max-sm:hidden">
      {navs.map((nav) =>
        nav.isSection ? (
          <a
            key={nav.name}
            href={nav.link}
            className="hover:text-primary text-md shrink-0 rounded-full px-4 py-2 font-normal"
          >
            {nav.name}
          </a>
        ) : (
          <NavLink
            key={nav.name}
            to={nav.link}
            className={({ isActive }) =>
              `${isActive ? "text-primary" : ""} hover:text-primary text-md shrink-0 rounded-full px-4 py-2 font-normal`
            }
          >
            {nav.name}
          </NavLink>
        ),
      )}
    </div>
  );
}
