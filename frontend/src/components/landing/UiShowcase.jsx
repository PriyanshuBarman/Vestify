import { Marquee } from "@/components/ui/marquee";
import { useGetScreenshots } from "@/hooks/useGetScreenshots";
import { selectTheme } from "@/store/slices/themeSlice";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
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
          className="text-muted-foreground mt-4 mb-12 max-w-2xl text-base leading-relaxed md:text-lg"
        >
          Featuring{" "}
          <span className="text-landing italic">Groww.in inspired UI</span> for
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
  const theme = useSelector(selectTheme);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      <Marquee className="mx-auto mask-x-from-95% p-0 [--duration:80s] sm:max-w-7xl sm:mask-x-from-95% sm:py-10 sm:[--duration:100s]">
        {screenshots?.[theme]?.map((img, index) => (
          <div
            key={index}
            className="h-98 w-fit shrink-0 overflow-hidden rounded-3xl border px-1 sm:mx-4 sm:h-116 sm:w-auto sm:rounded-3xl sm:px-2 sm:shadow-lg"
          >
            <img
              src={img}
              alt="screenshot"
              className="h-full w-full shrink-0"
              draggable={false}
              loading="lazy"
            />
          </div>
        ))}
      </Marquee>
    </motion.div>
  );
}
function AMCLogoItem({ amc }) {
  return (
    <div key={amc.id} className="flex items-center gap-3 rounded-2xl sm:gap-4">
      <FundLogo
        fundHouseDomain={amc.detail_info}
        className="size-9 rounded-lg sm:size-10 sm:rounded-xl"
      />
      <p className="text-foreground/80 text-sm whitespace-nowrap sm:text-base">
        {amc.amc_name}
      </p>
    </div>
  );
}
