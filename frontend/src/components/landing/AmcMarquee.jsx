import { cn } from "@/lib/utils";
import { motion } from "motion/react";
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
        delay: 1,
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
        className="flex flex-col text-center text-3xl font-semibold sm:text-[3.5rem]"
        variants={itemVarients}
      >
        Invest in India's top
        <span className="text-[#00b35c] italic">Mutual Funds</span>
      </motion.h2>
      <motion.p
        className="text-md text-muted-foreground mt-4 text-center sm:mt-8 sm:text-2xl"
        variants={itemVarients}
      >
        Learn real investing with virtual investing
      </motion.p>
      <motion.div
        className="mt-10 space-y-2 sm:mt-18 sm:space-y-8"
        variants={marqueeVarients}
      >
        <MarqueeLogos />
        <MarqueeLogos reverse />
      </motion.div>
    </motion.section>
  );
}
export default AmcMarquee;
