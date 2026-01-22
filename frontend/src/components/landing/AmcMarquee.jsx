import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import CountUp from "../CountUp";
import MarqueeLogos from "../MarqueeLogos";

function AmcMarquee({ className }) {
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

  const itemVarients = {
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

  const marqueeVarients = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.section
      className={cn("max-w-9xl w-full overflow-hidden px-4", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-muted- text-center text-2xl font-[550] sm:text-[2.95rem]"
        variants={itemVarients}
      >
        Virtually invest in{" "}
        <CountUp
          value={1550}
          startValue={1000}
          className="tracking-tight text-[#00b35c] tabular-nums"
        />
        <motion.span
          variants={{
            hidden: { opacity: 0, scale: 0, width: 0, marginLeft: 0 },
            visible: {
              opacity: 1,
              scale: 1,
              width: "auto",
              marginLeft: "0.125rem",
              transition: {
                delay: 4.5,
                type: "spring",
              },
            },
          }}
          className="inline-block overflow-hidden whitespace-nowrap text-[#00b35c]"
        >
          +
        </motion.span>{" "}
        mutual funds
      </motion.h2>

      <motion.div
        className="mt-10 space-y-4 sm:mt-18 sm:space-y-8"
        variants={marqueeVarients}
      >
        <MarqueeLogos />
        <MarqueeLogos reverse />
      </motion.div>
    </motion.section>
  );
}
export default AmcMarquee;
