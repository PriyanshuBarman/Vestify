import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon, SparklesIcon } from "lucide-react";
import { motion } from "motion/react";
import Mockup from "./Mockup";
import { Link, useSearchParams } from "react-router";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

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
      className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 pt-40 sm:px-6 md:flex-row md:px-8 md:py-24 xl:pt-24 2xl:min-h-svh"
    >
      <div className="flex flex-col max-sm:items-center max-sm:text-center">
        <Badge />
        <motion.h1
          variants={itemVariants}
          className="mt-6 text-4xl leading-[1.1] font-medium tracking-[-0.03em] text-balance md:mt-10 md:text-5xl md:leading-[1] lg:text-7xl"
        >
          Virtually invest in{" "}
          <span className="text-landing whitespace-nowrap">Mutual Funds</span>{" "}
          with zero financial risk.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground text-md mt-8 max-w-xl leading-relaxed md:mt-10 md:text-xl lg:max-w-2xl"
        >
          Invest, redeem, start SIPs, track portfolio — all in a fully virtual
          environment with a Groww app inspired UI.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex gap-4 md:mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-landing hover:bg-landing h-9 gap-2 rounded-full leading-0 hover:scale-105 active:scale-95 max-sm:font-normal md:h-10 md:px-8 md:py-3"
          >
            <Link
              to={{
                pathname: "/auth",
                search: referralCode && `?referralCode=${referralCode}`,
              }}
            >
              Get Started <ArrowUpRightIcon size={16} />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleDemoClick}
            className="max-sm:font-normalmd:py-3 h-9 rounded-full leading-0 hover:scale-105 hover:bg-transparent active:scale-95 md:h-10 md:px-8"
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
  return (
    <motion.div
      variants={itemVariants}
      className="bg-muted inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 md:px-3.5 md:py-1.5"
    >
      <SparklesIcon size={12} />
      <span className="text-2xs tracking-wide md:text-xs">
        A Virtual MF Investing App
      </span>
    </motion.div>
  );
}
