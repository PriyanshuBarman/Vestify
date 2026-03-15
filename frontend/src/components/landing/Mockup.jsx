import { amcs } from "@/constants/amc";
import { heroItemVariants } from "@/constants/animations";
import FundLogo from "@/features/mutual-fund/components/FundLogo";
import { motion } from "motion/react";

function Mockup() {
  return (
    <motion.div
      variants={heroItemVariants}
      className="relative mx-auto aspect-[9/19] w-54 rounded-2xl md:top-6 md:right-12 md:w-96 lg:w-146 xl:right-0"
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
        className="absolute inset-0 size-full object-contain dark:hidden"
        draggable={false}
      />
      <img
        src="./mockup-dark.png"
        alt="screenshot"
        draggable={false}
        className="absolute inset-0 hidden size-full object-contain dark:block"
      />
    </motion.div>
  );
}

export default Mockup;
