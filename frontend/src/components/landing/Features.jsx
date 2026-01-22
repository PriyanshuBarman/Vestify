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
        className="max-w-[20ch] text-center text-2xl leading-snug font-[550] sm:max-w-[24ch] sm:text-5xl sm:leading-tight sm:font-semibold sm:tracking-tight"
        variants={itemVariants}
      >
        Experience Real Investing,{" "}
        <span className="tracking-tight text-[#00b35c] italic">
          in a Virtual environment
        </span>
      </motion.h2>
      <motion.div className="mx-auto mt-10 grid gap-6 sm:mt-18 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
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
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: isMobile ? 0.3 : 0.3 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={cn(
        "from-muted/40 dark:from-muted dark:border-t-muted-foreground/40 dark:border-l-muted-foreground/40 via-card rounded-3xl border bg-linear-to-b p-6 shadow-xs transition-all duration-500 hover:-translate-y-2 hover:scale-101 active:scale-95 sm:from-transparent sm:shadow-xs sm:hover:shadow-lg md:p-8 dark:bg-linear-to-br",
        feature.className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-150px" }}
      variants={cardVariants}
    >
      <div className="relative z-10 flex h-full flex-col">
        <feature.icon className="mb-5 size-12.5 rounded-xl p-3.5 shadow md:size-14 dark:border" />
        <h3 className="mb-2 text-[1.05rem] font-semibold transition-colors md:text-[1.35rem]">
          {feature.title}
        </h3>
        <motion.p className="text-muted-foreground text-[0.9rem] transition-opacity group-hover:opacity-100 sm:opacity-80 md:text-[1.05rem]">
          {feature.description}
        </motion.p>
      </div>
    </motion.div>
  );
}
