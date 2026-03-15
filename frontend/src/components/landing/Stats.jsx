import { amcs } from "@/constants/amc";
import { useUserCount } from "@/hooks/useGetUserCount";
import { motion } from "motion/react";
import { Marquee } from "../ui/marquee";
import FundLogo from "@/features/mutual-fund/components/FundLogo";

function Stats() {
  const { data: userCount = 99 } = useUserCount();

  const stats = [
    { value: `${userCount}+`, label: "Users" },
    { value: "41+", label: "Categories" },
    { value: "1550+", label: "Mutual Funds" },
  ];

  return (
    <section className="w-full py-12 md:py-24">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-6 md:gap-22 md:px-12">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="font-inter mb-2 text-2xl font-semibold tracking-wide tabular-nums sm:font-bold md:text-4xl lg:text-5xl">
              {stat.value}
            </h2>
            <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase [word-spacing:-4px] sm:text-sm">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
      <MarqueeLogos />
    </section>
  );
}

export default Stats;

function MarqueeLogos() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      <Marquee
        repeat={2}
        className="mx-auto mt-12 mask-x-from-80% [--duration:200s] sm:max-w-7xl sm:mask-x-from-95% sm:py-10 sm:[--duration:250s]"
      >
        {amcs.map((amc) => (
          <div
            key={amc.id}
            className="mx-4 flex items-center gap-3 rounded-2xl sm:mx-6 sm:gap-4"
          >
            <FundLogo
              fundHouseDomain={amc.detail_info}
              className="size-9 rounded-lg border sm:size-12 sm:rounded-xl"
            />
            <p className="text-foreground/80 text-sm whitespace-nowrap capitalize sm:text-lg">
              {amc.amc_name}
            </p>
          </div>
        ))}
      </Marquee>
    </motion.div>
  );
}
