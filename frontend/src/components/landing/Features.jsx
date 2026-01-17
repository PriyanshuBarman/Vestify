import { features } from "@/constants/features";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

function Features({ className }) {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.section
      id="features"
      className={cn(
        "flex max-w-7xl flex-col items-center justify-center px-4 sm:px-8",
        className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.h2
        className="max-w-[20ch] text-center text-2xl leading-snug font-semibold sm:max-w-[24ch] sm:text-5xl sm:leading-tight sm:tracking-tight"
        variants={itemVariants}
      >
        Experience Real Investing,{" "}
        <span className="tracking-tight text-[#00b35c] italic">
          in a Virtual environment
        </span>
      </motion.h2>
      <motion.p
        className="text-muted-foreground text-md mt-4 text-center max-sm:tracking-tight sm:text-2xl"
        variants={itemVariants}
      >
        Learn investing by actually doing it, safely.
      </motion.p>
      <motion.div
        className="mx-auto mt-10 grid gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
        variants={itemVariants}
      >
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </motion.div>
    </motion.section>
  );
}

export default Features;

function FeatureCard({ feature, index }) {
  const isMobile = useIsMobile();

  const cardVariants = {
    hidden: { opacity: 0, scale: isMobile ? 1 : 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        delay: isMobile ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const floatingIconVariants = {
    hidden: {
      opacity: 0,
      rotate: isMobile ? 0 : 0,
    },
    visible: {
      opacity: isMobile ? 0.04 : 0.03,
      rotate: 0,
      transition: {
        duration: 0.3,
        delay: index * 0.08 + 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0 : 0.5,
        delay: isMobile ? 0 : index * 0.08 + 0.15,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      key={feature.title}
      className={cn(
        "group from-muted dark:border-t-muted-foreground/40 max-sm:border-b-muted-foreground/40 dark:border-l-muted-foreground/40 via-card relative overflow-hidden rounded-[2rem] border-[.1px] border-t-transparent border-l-transparent bg-linear-to-tl to-transparent p-6 shadow transition-all duration-500 hover:-translate-y-2 hover:scale-101 active:scale-95 sm:shadow-xs sm:hover:shadow-lg md:p-8 dark:border-l dark:bg-linear-to-br",
        feature.className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
    >
      {/* Floating Icon */}
      <motion.div
        className="pointer-events-none absolute -top-6 -right-6 p-8 transition-all duration-700 group-hover:scale-125 group-hover:-rotate-12 group-hover:opacity-100"
        variants={floatingIconVariants}
      >
        <feature.icon className="size-26 md:size-28" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col">
        <motion.div className="mb-6 inline-flex w-fit items-center justify-center rounded-2xl p-3.5 shadow transition-all duration-500 group-hover:rotate-[10deg] group-hover:shadow-md md:mb-8 md:p-4 dark:border-b">
          <feature.icon className="h-6 w-6 md:h-7 md:w-7" />
        </motion.div>
        <motion.h3
          className="mb-2 text-[1.05rem] font-semibold transition-colors md:text-[1.35rem]"
          variants={textVariants}
        >
          {feature.title}
        </motion.h3>
        <motion.p
          className="text-muted-foreground text-[0.9rem] transition-opacity group-hover:opacity-100 sm:opacity-80 md:text-[1.05rem]"
          variants={textVariants}
        >
          {feature.description}
        </motion.p>
      </div>
    </motion.div>
  );
}
