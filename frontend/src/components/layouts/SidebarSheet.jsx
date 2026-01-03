import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { XIcon } from "lucide-react";
import { Link } from "react-router";
import ThemeChangeButton from "../ThemeChangeButton";
import { Button } from "../ui/button";

const navs = [
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
  {
    name: "Contact us",
    link: "/contact-us",
  },
];

function SidebarSheet({ open, onOpenChange }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[80%] [&>button]:hidden">
        <SheetHeader>
          <Button
            size="icon"
            className="animate-in zoom-in spin-in fade-in ml-auto rounded-full bg-[#00b35cc1] shadow-none delay-200 duration-300"
            onClick={() => onOpenChange(false)}
          >
            <XIcon className="size-6" />
          </Button>
        </SheetHeader>
        <div className="flex h-full flex-col gap-4 px-4">
          <a
            onClick={() => onOpenChange(false)}
            href="#"
            className="shrink-0 rounded-full px-4 py-1 text-lg font-medium"
          >
            Home
          </a>
          <a
            onClick={() => onOpenChange(false)}
            href="#features"
            className="shrink-0 rounded-full px-4 py-1 text-lg font-medium"
          >
            Features
          </a>
          {navs.map((nav) => (
            <Button
              variant="link"
              key={nav.link}
              asChild
              className="text-foreground flex w-full justify-start text-start text-lg"
            >
              <Link key={nav.link} to={nav.link}>
                {nav.name}
              </Link>
            </Button>
          ))}
          <div className="mt-auto mb-4 text-sm">
            <h6 className="text-muted-foreground text-2xs mb-2 tracking-wider">
              APPEARENCE
            </h6>

            <ThemeChangeButton />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default SidebarSheet;
