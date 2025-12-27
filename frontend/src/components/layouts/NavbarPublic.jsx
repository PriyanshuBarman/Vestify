import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import { ModeToggle } from "../ui/mode-togle";
import SidebarSheet from "./SidebarSheet";

function NavbarPublic() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const isMobile = useIsMobile();

  return (
    <nav className="sticky top-0 z-50 flex w-full max-w-7xl items-center justify-between gap-8 px-5 py-4 sm:p-6">
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <Logo className="size-8" />
        <span className="font-[550] sm:text-2xl">Vestify</span>
      </div>

      <div className="flex items-center justify-start gap-2 xl:gap-6">
        <NavLinks />
        {!isMobile && <ModeToggle />}

        {isMobile && (
          <>
            <Button variant="ghost" onClick={() => setOpenSidebar(true)}>
              <MenuIcon className="size-6.6" />
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
  const navs = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Terms",
      link: "/terms-and-conditions",
    },
    {
      name: "Privacy",
      link: "/privacy-policy",
    },
  ];
  return (
    <div className="flex max-sm:hidden">
      {navs.map((nav) => (
        <NavLink
          key={nav.name}
          to={nav.link}
          className={({ isActive }) =>
            `${isActive ? "text-primary" : ""} hover:text-primary text-md shrink-0 rounded-full px-4 py-2 font-medium`
          }
        >
          {nav.name}
        </NavLink>
      ))}
    </div>
  );
}
