import { motion } from "motion/react";
import { cn } from "@/lib/utils";

function Quote({ className }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const underlineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.section
      className={cn(
        "mt-28 flex max-w-6xl flex-col items-center justify-center px-4 sm:mt-34",
        className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div className="relative text-center">
        <motion.blockquote className="text-2xl leading-[1.15] font-semibold tracking-tight sm:text-5xl md:text-6xl md:leading-[1.1] lg:text-5xl xl:text-[4rem]">
          <motion.span
            className="from-foreground to-foreground/70 inline-block bg-linear-to-br bg-clip-text text-transparent"
            variants={wordVariants}
          >
            Learn
          </motion.span>{" "}
          <motion.span
            className="from-foreground to-foreground/70 inline-block bg-linear-to-br bg-clip-text text-transparent"
            variants={wordVariants}
          >
            investing
          </motion.span>{" "}
          <motion.span
            className="from-foreground to-foreground/70 inline-block bg-linear-to-br bg-clip-text text-transparent"
            variants={wordVariants}
          >
            by
          </motion.span>{" "}
          <motion.span
            className="from-foreground to-foreground/70 inline-block bg-linear-to-br bg-clip-text text-transparent"
            variants={wordVariants}
          >
            doing
          </motion.span>{" "}
          <motion.span
            className="from-foreground to-foreground/70 inline-block bg-linear-to-br bg-clip-text text-transparent"
            variants={wordVariants}
          >
            it
          </motion.span>
          <br className="hidden sm:block" />
          <motion.span className="relative inline-block">
            <motion.span
              className="relative mt-2 inline-block bg-linear-to-r from-[#00d66c] via-[#00b35c] to-[#00a352] bg-clip-text text-xl font-medium text-transparent italic sm:mt-4 sm:text-6xl"
              variants={wordVariants}
            >
              in a virtual environment
            </motion.span>
            <motion.span
              className="absolute right-0 -bottom-1 left-0 h-0.5 origin-left rounded-full bg-linear-to-r from-[#00d66c] via-[#00b35c] to-[#00a352] sm:-bottom-2 sm:h-1 md:-bottom-3"
              variants={underlineVariants}
            />
          </motion.span>
        </motion.blockquote>

        <motion.p
          className="text-muted-foreground mt-4 text-sm sm:mt-10 sm:text-lg sm:font-medium md:mt-12 md:text-xl lg:text-2xl"
          variants={wordVariants}
        >
          zero financial risk
        </motion.p>
      </motion.div>
    </motion.section>
  );
}

export default Quote;
