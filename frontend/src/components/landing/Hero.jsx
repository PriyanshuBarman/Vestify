import InstallAppButton from "@/components/InstallAppButton";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import ScrollDownIndicator from "../ScrollDownIndicator";

function Hero() {
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("referralCode");
  return (
    <section className="flex min-h-svh flex-col items-center justify-center">
      <div className="relative mt-4 flex max-w-5xl flex-col items-center justify-center px-4">
        <InstallAppButton alwaysVisible />
        <h1 className="mt-6 text-center text-[2.4rem] leading-[1.2] font-semibold sm:mt-8 sm:text-7xl sm:tracking-tight">
          Invest in Indian Mutual Funds with{" "}
          <span className="text-[#00b35c] italic">virtual money</span>
        </h1>
        <p className="text-muted-foreground/90 mt-6 max-w-[30ch] text-center text-base tracking-tight duration-700 sm:mt-10 sm:max-w-[42ch] sm:text-2xl">
          Invest, redeem, start SIPs, track portfolio{" "}
          <span className="max-sm:hidden">—</span> all in a fully virtual
          environment with a{" "}
          <a
            href="https://groww.in"
            target="_blank"
            tabIndex={-1}
            className="after:animate-underline active:text-primary relative mx-0.5 w-fit after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:-rotate-3 after:rounded-full after:bg-gradient-to-r after:from-green-600 after:via-green-300 after:to-transparent after:opacity-0 after:content-['']"
          >
            Groww.in
          </a>{" "}
          UI.
        </p>
      </div>

      <Button
        asChild
        size="lg"
        className="dark:text-foreground group mt-16 rounded-2xl bg-gradient-to-l from-[#00b35c91] via-[#00b35ce3] to-[#00b35c] !px-6 py-6 text-sm font-[450] shadow-lg transition-all duration-300 ease-linear hover:scale-105 hover:bg-transparent hover:from-[#00b35ce3] hover:to-[#00b35c91] active:scale-95 sm:mt-16 sm:w-fit sm:!px-8 sm:py-6.5 sm:text-base"
      >
        <Link
          to={{
            pathname: "/auth",
            search: referralCode && `?referralCode=${referralCode}`,
          }}
        >
          Start Investing{" "}
          <ArrowUpRightIcon className="size-4.5 transition-all duration-400 group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:scale-102 sm:size-5" />
        </Link>
      </Button>

      <ScrollDownIndicator />
    </section>
  );
}

export default Hero;
