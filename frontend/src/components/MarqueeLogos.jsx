import { amcs } from "@/constants/amc";
import FundLogo from "@/features/mutual-fund/components/FundLogo";
import { cn } from "@/lib/utils";

function MarqueeLogos({ classNames, reverse = false }) {
  return (
    <div
      className={cn(
        "group flex w-full overflow-hidden mask-x-from-70% mask-x-to-95% p-2 [--duration:250s] [--gap:3rem] sm:mask-x-from-70% sm:mask-x-to-90% sm:[--duration:250s] sm:[--gap:10rem]",
        classNames,
      )}
    >
      <div
        className={cn(
          "animate-marquee mr-[3rem] flex gap-[3rem] will-change-transform sm:mr-[10rem] sm:gap-[10rem]",
          {
            "[animation-direction:reverse]": reverse,
          },
        )}
      >
        {amcs.map((amc) => (
          <div
            key={amc.id}
            className="flex items-center gap-3 rounded-2xl sm:gap-4"
          >
            <FundLogo
              fundHouseDomain={amc.detail_info}
              className="size-9.5 rounded-lg sm:size-13 sm:rounded-2xl"
            />
            <p className="text-foreground/80 text-sm whitespace-nowrap sm:text-xl sm:font-medium sm:italic">
              {amc.amc_name}
            </p>
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "animate-marquee flex gap-[3rem] will-change-transform sm:gap-[10rem]",
          {
            "[animation-direction:reverse]": reverse,
          },
        )}
      >
        {amcs.map((amc) => (
          <div
            key={amc.id}
            className="flex items-center gap-3 rounded-2xl sm:gap-4"
          >
            <FundLogo
              fundHouseDomain={amc.detail_info}
              className="size-9.5 rounded-lg sm:size-13 sm:rounded-2xl"
            />
            <p className="text-foreground/80 text-sm whitespace-nowrap sm:text-xl sm:font-medium sm:italic">
              {amc.amc_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarqueeLogos;
