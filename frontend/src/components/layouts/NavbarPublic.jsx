import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-togle";
import { useGoogleAuth } from "@/features/auth/hooks/useGoogleAuth";
import { lazy, useState } from "react";
import { NavLink } from "react-router";
import { Spinner } from "../ui/spinner";
const ProfileSheet = lazy(() => import("../ProfileSheet"));

function NavbarPublic({ googleLogin, isPending }) {
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 flex w-full max-w-7xl items-center justify-between gap-8 px-5 py-4 sm:p-6">
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <Logo />
        <span className="font-[550] sm:text-2xl">Vestify</span>
      </div>

      <div className="flex items-center justify-start gap-3 xl:gap-6">
        <NavLinks />
        <ModeToggle />
        <Button
          disabled={isPending}
          onClick={googleLogin}
          className="rounded-full bg-gradient-to-r from-[#00b35c91] via-[#00b35ce3] to-[#00b35c] transition-colors ease-linear hover:bg-transparent hover:from-[#00b35ce3] hover:to-[#00b35c91] max-sm:text-xs sm:p-5"
        >
          {isPending && <Spinner />} SignUp
        </Button>
      </div>
      <ProfileSheet
        open={isProfileSheetOpen}
        onOpenChange={setIsProfileSheetOpen}
      />
    </nav>
  );
}

export default NavbarPublic;

function NavLinks() {
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Terms",
      path: "/terms-and-conditions",
    },
    {
      name: "Privacy",
      path: "/privacy-policy",
    },
  ];
  return (
    <div className="flex max-sm:hidden">
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          className={({ isActive }) =>
            `${isActive ? "text-primary" : ""} hover:text-primary text-md shrink-0 rounded-full px-4 py-2 font-medium`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
}
