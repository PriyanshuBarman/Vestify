import { amcs } from "@/constants/amc";
import FundLogo from "@/features/mutual-fund/components/FundLogo";
import { cn } from "@/lib/utils";

function MarqueeLogos({ classNames }) {
  return (
    <div
      className={cn(
        "group flex w-full overflow-hidden mask-x-from-70% mask-x-to-95% p-2 [--duration:120s] [--gap:4rem] sm:mask-x-from-70% sm:mask-x-to-90% sm:[--duration:150s] sm:[--gap:8rem]",
        classNames,
      )}
    >
      <div className="animate-marquee mr-[4rem] flex gap-[4rem] will-change-transform group-hover:[animation-play-state:paused] sm:mr-[8rem] sm:gap-[8rem]">
        {amcs.map((amc) => (
          <a
            key={amc.id}
            href={amc.detail_info}
            target="_blank"
            tabIndex={-1}
            aria-label={`Visit ${amc.amc_name}'s website`}
          >
            <FundLogo
              fundHouseDomain={amc.detail_info}
              className="animate-in fade-in size-10.5 flex-shrink-0 rounded-lg duration-900 sm:size-16 sm:rounded-2xl sm:drop-shadow-xs"
            />
          </a>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="animate-marquee flex gap-[4rem] will-change-transform group-hover:[animation-play-state:paused] sm:gap-[8rem]"
      >
        {amcs.map((amc) => (
          <a
            key={amc.id}
            href={amc.detail_info}
            target="_blank"
            tabIndex={-1}
            aria-label={`Visit ${amc.amc_name}'s website`}
          >
            <FundLogo
              fundHouseDomain={amc.detail_info}
              className="animate-in fade-in size-10.5 flex-shrink-0 rounded-lg duration-900 sm:size-16 sm:rounded-2xl sm:drop-shadow-xs"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default MarqueeLogos;
