import { amcs } from "@/constants/amc";
import FundLogo from "@/features/mutual-fund/components/FundLogo";
import { motion } from "motion/react";

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

function Mockup() {
  return (
    <motion.div
      variants={itemVariants}
      className="relative mx-auto h-full w-54 rounded-2xl md:top-6 md:right-16 md:w-96 lg:w-146"
    >
      <FundLogo
        fundHouseDomain={amcs[6].detail_info}
        className="absolute top-6 -left-8 size-9 rounded-lg shadow-xl md:size-11"
      />
      <FundLogo
        fundHouseDomain={amcs[3].detail_info}
        className="absolute top-20 -right-12 size-9 rounded-lg shadow-xl md:size-11"
      />
      <FundLogo
        fundHouseDomain={amcs[2].detail_info}
        className="absolute bottom-40 -left-12 size-9 rounded-lg shadow-xl md:size-11"
      />
      <FundLogo
        fundHouseDomain={amcs[12].detail_info}
        className="absolute -right-10 bottom-28 size-9 rounded-lg shadow-xl md:size-11"
      />
      <img
        src="./mockup.png"
        alt="screenshot"
        className="size-full object-contain dark:hidden"
        draggable={false}
      />
      <img
        src="./mockup-dark.png"
        alt="screenshot"
        draggable={false}
        className="hidden size-full object-contain dark:block"
      />
    </motion.div>
  );
}

export default Mockup;
