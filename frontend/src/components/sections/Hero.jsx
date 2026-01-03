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
      <div className="relative mt-4 flex max-w-5xl flex-col items-center justify-center px-4 sm:mt-0">
        <InstallAppButton alwaysVisible />
        <Heading />
        <p className="text-foreground/80 mt-6 max-w-[32ch] text-center tracking-tight duration-700 sm:mt-10 sm:max-w-[52ch] sm:text-xl">
          Invest, start SIPs, track portfolio, send virtual money to others —
          all virtually with a{" "}
          <span className="after:animate-underline active:text-primary relative mx-0.5 w-fit after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:-rotate-3 after:rounded-full after:bg-gradient-to-r after:from-green-600 after:via-green-300 after:to-transparent after:opacity-0 after:content-['']">
            Groww.in
          </span>{" "}
          UI.
        </p>
      </div>

      <Button
        asChild
        size="lg"
        className="dark:text-foreground sm:text-md group mt-16 rounded-2xl bg-gradient-to-l from-[#00b35c91] via-[#00b35ce3] to-[#00b35c] !px-6 py-6 text-[0.84rem] font-[450] transition-colors ease-linear hover:bg-transparent hover:from-[#00b35ce3] hover:to-[#00b35c91] active:scale-95 sm:mt-16 sm:w-fit sm:!px-8 sm:py-6"
      >
        <Link
          to={{
            pathname: "/auth",
            search: referralCode && `?referralCode=${referralCode}`,
          }}
        >
          Start Investing{" "}
          <ArrowUpRightIcon className="size-5 transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:scale-102 sm:size-5" />
        </Link>
      </Button>

      <ScrollDownIndicator />
    </section>
  );
}

export default Hero;

function Heading() {
  return (
    <h2 className="mt-6 text-center text-[2.37rem] leading-tight font-[550] sm:text-7xl sm:tracking-tight">
      <span>Virtually</span> Invest in Mutual funds with{" "}
      <span className="text-[2.37rem] sm:text-7xl">zero financial risk</span>
    </h2>
  );
}
