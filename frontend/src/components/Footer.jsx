import { footerLinks } from "@/constants/footer";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  RedditLogoIcon,
  TwitterLogoIcon,
} from "@phosphor-icons/react";
import { Link, useLocation } from "react-router";
import ButtonAnimatedLink from "./ButtonAnimatedLink";
import LogoShapeOnly from "./LogoShapeOnly";
import { Separator } from "./ui/separator";
import { credits } from "@/constants/credits";

const socialLinks = [
  {
    label: "Go to vestify reddit comunity",
    href: "https://www.reddit.com/r/Vestify",
    Icon: RedditLogoIcon,
  },
  {
    label: "Go to creators twitter profile",
    href: "https://twitter.com/priyanshuwb",
    Icon: TwitterLogoIcon,
  },
  {
    label: "Go to creators github profile",
    href: "https://github.com/priyanshubarman/vestify",
    Icon: GithubLogoIcon,
  },
  {
    label: "Go to creators linkedin profile",
    href: "https://www.linkedin.com/in/priyanshubarman",
    Icon: LinkedinLogoIcon,
  },
];

function Footer({ className }) {
  const location = useLocation();
  const isMobile = useIsMobile();

  if (isMobile && location.pathname !== "/") return null;
  if (!location.hash && location.pathname !== "/") return null;

  return (
    <footer className={cn("w-full border-t", className)}>
      <div className="mx-auto max-w-(--breakpoint-xl)">
        <div className="flex flex-col justify-between gap-x-8 gap-y-4 py-6 sm:flex-row sm:gap-y-10 sm:px-6 xl:px-0">
          <div>
            <div className="flex items-center">
              <LogoShapeOnly className="size-18" />
              <span className="relative right-2 text-xl font-semibold">
                Vestify
              </span>
            </div>
            <ul className="flex flex-wrap items-center px-2">
              {footerLinks.map(({ title, href, isSection }) => (
                <li key={title}>
                  {isSection ? (
                    <a
                      href={href}
                      className="text-foreground sm:text-md px-2 text-sm font-normal"
                    >
                      {title}
                    </a>
                  ) : (
                    <ButtonAnimatedLink className="text-foreground sm:text-md font-normal max-sm:px-2">
                      <Link to={href}>{title}</Link>
                    </ButtonAnimatedLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Credits */}
          <div className="my-auto ml-4 w-full max-w-xs">
            <span className="sm:text-md text-sm font-medium">Credits</span>
            <div className="mt-2 flex flex-col gap-2 text-xs sm:text-sm">
              {credits.map((item) => (
                <a
                  key={item.label}
                  href={item.link}
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
