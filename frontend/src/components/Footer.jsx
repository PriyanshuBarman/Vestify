import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  TwitterLogoIcon,
} from "@phosphor-icons/react";
import { Link, useLocation } from "react-router";
import LogoShapeOnly from "./LogoShapeOnly";
import { Separator } from "./ui/separator";
import { useIsMobile } from "@/hooks/useIsMobile";

function Footer() {
  const location = useLocation();
  const isMobile = useIsMobile();

  if (isMobile) return null;
  if (!location.hash) return null;

  return (
    <footer className="bg-accent border-t">
      <div className="mx-auto max-w-(--breakpoint-xl)">
        <div className="flex flex-col items-center justify-between gap-x-8 gap-y-10 px-6 py-6 sm:flex-row xl:px-0">
          <div>
            <div className="flex items-center">
              <LogoShapeOnly className="size-18" />
              <h6 className="text-xl font-semibold">Vestify</h6>
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/priyanshubarman"
                target="_blank"
              >
                <LinkedinLogoIcon weight="regular" className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/priyanshuwb" target="_blank">
                <TwitterLogoIcon weight="regular" className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/priyanshubarman/vestify"
                target="_blank"
              >
                <GithubLogoIcon weight="regular" className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Credits */}
          <div className="w-full max-w-xs">
            <h6 className="text-sm font-medium">Credits</h6>
            <div className="mt-2 flex flex-col text-xs">
              <a href="https://storyset.com">Illustrations by Storyset</a>
              <a href="https://logo.dev">Logos provided by Logo.dev</a>
            </div>
          </div>
        </div>
        <Separator />

        <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-8 sm:flex-row xl:px-0">
          {/* Copyright */}
          <span className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} <Link href="/">Vestify</Link>. All
            rights reserved.
          </span>

          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/in/priyanshubarman"
              target="_blank"
            >
              <LinkedinLogoIcon weight="fill" className="h-5 w-5" />
            </a>
            <a href="https://twitter.com/priyanshuwb" target="_blank">
              <TwitterLogoIcon weight="fill" className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/priyanshubarman/vestify"
              target="_blank"
            >
              <GithubLogoIcon weight="fill" className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
