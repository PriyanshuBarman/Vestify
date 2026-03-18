import { SparklesIcon } from "lucide-react";
import { motion } from "motion/react";

import { containerVariants, itemVariants } from "@/constants/animations";

function SectionHeading({ heading, subheading }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {subheading && (
        <motion.div
          variants={itemVariants}
          className="text-landing flex items-center gap-2"
        >
          <SparklesIcon className="size-4 md:size-5" />
          <span className="text-xs font-medium tracking-wide md:text-lg">
            {subheading}
          </span>
        </motion.div>
      )}
      <motion.h2
        variants={itemVariants}
        className="mt-4 max-w-5xl text-2xl leading-tight font-medium tracking-[-0.02em] md:text-4xl lg:text-5xl"
      >
        {heading}
      </motion.h2>
    </motion.div>
  );
}

export default SectionHeading;
