import { motion } from "motion/react";

import { useGetUserCount } from "@/hooks/useGetUserCount";
import StockLogo from "@/components/StockLogo";
import { stocks } from "@/constants/stocks";

import { Marquee } from "../ui/marquee";

function Stats() {
  const { data: userCount = 100 } = useGetUserCount();

  const STATS = [
    { value: `${userCount}+`, label: "Users" },
    { value: "41+", label: "Fund Categories" },
    { value: "1550+", label: "Mutual Funds" },
    { value: "4500+", label: "Stocks" },
  ];

  return (
    <section className="w-full py-12 md:pb-24 md:pt-6">
      <div className="mx-auto grid sm:grid-cols-4 sm:max-w-7xl grid-cols-2 mask-x-from-80% sm:mask-x-from-95% mask-y-from-80% max-w-2xl px-6 md:px-12">
        {STATS.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="flex flex-col border-ring/50 sm:nth-2:border-r sm:px-20 p-6 nth-2:border-b first:border-b nth-3:border-r first:border-r items-center text-center"
          >
            <h2 className="font-inter text-2xl font-semibold tracking-wide tabular-nums sm:font-bold md:text-4xl lg:text-5xl">
              {stat.value}
            </h2>
            <p className="text-muted-foreground  text-nowrap text-xs mt-2 lg:mt-4  md:text-base lg:text-lg">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-4 sm:gap-8 sm:mt-20">
        <StockMarqueeLogos />
      </div>
    </section>
  );
}

export default Stats;

function StockMarqueeLogos() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      <Marquee
        repeat={2}
        className="mx-auto mask-x-from-80% [--duration:100s] sm:max-w-7xl sm:mask-x-from-95% sm:py-2 sm:[--duration:100s]"
      >
        {stocks.map((stock) => (
          <div
            key={stock.id}
            className="mx-4 flex items-center gap-3 rounded-2xl sm:mx-6 sm:gap-4"
          >
            <StockLogo
              symbol={stock.symbol}
              className="size-9 rounded-lg border sm:size-12 sm:rounded-xl"
            />
            <p className="text-foreground/80 text-sm whitespace-nowrap capitalize sm:text-lg">
              {stock.name}
            </p>
          </div>
        ))}
      </Marquee>
    </motion.div>
  );
}
