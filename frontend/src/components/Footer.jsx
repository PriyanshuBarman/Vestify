import { credits } from "@/constants/credits";
import { footerLinks, socialLinks } from "@/constants/footer";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router";
import ButtonAnimatedLink from "./ButtonAnimatedLink";
import LogoShapeOnly from "./LogoShapeOnly";
import { Separator } from "./ui/separator";

function Footer({ className }) {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  if (isMobile && location.pathname !== "/") return null;
  if (!location.hash && location.pathname !== "/") return null;
  if (location.hash && location.hash !== "#explore") return null;

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      console.log("scroll to top");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate("/");
  };

  return (
    <footer className={cn("w-full border-t", className)}>
      <div className="mx-auto max-w-(--breakpoint-xl)">
        <div className="flex flex-col justify-between gap-x-8 gap-y-4 py-6 sm:flex-row sm:gap-y-10 sm:px-6 xl:px-0">
          <div>
            <Link to="/" className="flex items-center">
              <LogoShapeOnly className="size-18" />
              <span className="relative right-2 text-xl font-semibold">
                Vestify
              </span>
            </Link>
            <ul className="flex flex-wrap items-center px-2">
              <ButtonAnimatedLink
                onClick={handleHomeClick}
                className="text-foreground sm:text-md font-normal max-sm:px-2"
              >
                <div>Home</div>
              </ButtonAnimatedLink>

              {footerLinks.map(({ title, href }) => (
                <li key={title}>
                  <ButtonAnimatedLink className="text-foreground sm:text-md font-normal max-sm:px-2">
                    <Link to={href}>{title}</Link>
                  </ButtonAnimatedLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Credits */}
          <div className="my-auto ml-4 w-full max-w-xs">
            <span className="sm:text-md text-sm font-semibold">Credits</span>
            <div className="mt-2 flex flex-col gap-2 text-xs sm:text-sm">
              {credits.map((item) => (
                <a
                  key={item.label}
                  href={item.link}
                  target="_blank"
                  className="hover:underline"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <Separator />

        <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-8 sm:flex-row xl:px-0">
          {/* Copyright */}
          <span className="text-muted-foreground sm:text-md text-sm">
            &copy; {new Date().getFullYear()} <Link href="/">Vestify</Link>. All
            rights reserved.
          </span>

          <div className="flex items-center gap-5">
            {socialLinks.map(({ label, href, Icon }) => (
              <a key={label} aria-label={label} href={href} target="_blank">
                <Icon weight="fill" className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
