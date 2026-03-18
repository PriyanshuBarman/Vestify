import { motion } from "motion/react";

import { useGetScreenshots } from "@/hooks/useGetScreenshots";
import { Marquee } from "@/components/ui/marquee";

import SectionHeading from "./SectionHeading";

function UiShowcase() {
  return (
    <section id="demo" className="w-full py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <SectionHeading
          subheading="The Interface"
          heading="Designed to feel like a real investing app."
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: 0.4 },
          }}
          viewport={{ once: true }}
          className="text-muted-foreground mt-4 mb-12 max-w-2xl text-base md:text-lg"
        >
          Featuring{" "}
          <span className="text-landing italic">Groww App inspired UI</span> for
          realistic investing experience.
        </motion.p>
      </div>

      <ScreenshotMarquee />
    </section>
  );
}

export default UiShowcase;

function ScreenshotMarquee() {
  const { data: screenshots } = useGetScreenshots();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      <Marquee className="mx-auto mask-x-from-95% p-0 [--duration:80s] sm:max-w-7xl sm:mask-x-from-95% sm:py-10 sm:[--duration:100s]">
        {screenshots?.light?.map((_, index) => (
          <div
            key={index}
            className="h-98 w-fit shrink-0 overflow-hidden rounded-3xl border px-1 sm:mx-4 sm:h-116 sm:w-auto sm:rounded-3xl sm:px-2 sm:shadow-lg"
          >
            <img
              src={screenshots.light[index]}
              alt="screenshot"
              height="462"
              width="208"
              className="h-full w-full shrink-0 dark:hidden"
              draggable={false}
              loading="lazy"
            />
            <img
              src={screenshots.dark[index]}
              alt="screenshot"
              height="462"
              width="208"
              className="hidden h-full w-full shrink-0 dark:block"
              draggable={false}
              loading="lazy"
            />
          </div>
        ))}
      </Marquee>
    </motion.div>
  );
}
