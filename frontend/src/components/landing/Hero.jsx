import { ArrowUpRightIcon, SparklesIcon } from "lucide-react";
import { motion } from "motion/react";
import { Link, useSearchParams } from "react-router";

import { useInstallPWA } from "@/hooks/useInstallPWA";
import { Button } from "@/components/ui/button";
import { containerVariants, heroItemVariants } from "@/constants/animations";

import Mockup from "./Mockup";

function Hero() {
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("referralCode");

  const handleDemoClick = () => {
    const demoSection = document.getElementById("demo");
    demoSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 pt-42 sm:px-6 md:flex-row md:px-8 md:py-24 xl:pt-24 2xl:min-h-svh"
    >
      <div className="flex flex-col max-sm:items-center max-sm:text-center">
        <Badge />
        <motion.h1
          variants={heroItemVariants}
          className="mt-6 text-4xl leading-[1.1] font-medium tracking-[-0.03em] text-balance md:mt-10 md:text-5xl md:leading-[1] lg:text-7xl"
        >
          Virtually invest in{" "}
          <span className="text-landing whitespace-nowrap">Mutual Funds</span>{" "}
          with zero financial risk.
        </motion.h1>

        <motion.p
          variants={heroItemVariants}
          className="text-muted-foreground text-md mt-6 max-w-xl leading-relaxed md:mt-10 md:text-xl lg:max-w-2xl"
        >
          Invest, redeem, start SIPs, track portfolio — all in a fully virtual
          environment with a Groww app inspired UI.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={heroItemVariants}
          className="mt-8 flex gap-4 md:mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-landing hover:bg-landing h-9 gap-2 rounded-full leading-0 tracking-tight hover:scale-105 active:scale-95 max-sm:font-normal max-sm:tracking-tight md:h-11 md:px-6! md:py-3"
          >
            <Link
              to={{
                pathname: "/auth",
                search: referralCode && `?referralCode=${referralCode}`,
              }}
            >
              Create Account
              <ArrowUpRightIcon size={16} />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleDemoClick}
            className="h-9 rounded-full leading-0 hover:scale-105 hover:bg-transparent active:scale-95 max-sm:font-normal md:h-11 md:py-3"
          >
            See Demo
          </Button>
        </motion.div>
      </div>

      <Mockup />
    </motion.section>
  );
}

export default Hero;

function Badge() {
  const { isStandalone, isPwaSupported, handleInstallClick } = useInstallPWA();

  const handleClick = () => {
    if (isStandalone || !isPwaSupported) return;
    handleInstallClick();
  };

  return (
    <motion.div
      onClick={handleClick}
      variants={heroItemVariants}
      className="bg-muted inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 md:px-3.5 md:py-1.5"
    >
      <SparklesIcon size={12} />
      <span className="text-2xs tracking-wide md:text-xs">
        A Virtual MF Investing App
      </span>
    </motion.div>
  );
}
