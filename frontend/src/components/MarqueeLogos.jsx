import { amcs } from "@/constants/amc";
import FundLogo from "@/features/mutual-fund/components/FundLogo";

function MarqueeLogos() {
  return (
    <div className="group flex w-full overflow-hidden mask-x-from-70% mask-x-to-95% p-2 [--duration:70s] [--gap:2.5rem] sm:mask-x-from-70% sm:mask-x-to-90% sm:[--gap:3rem]">
      <div className="animate-marquee mr-[2.5rem] flex gap-[2.5rem] will-change-transform group-hover:[animation-play-state:paused] sm:mr-[3rem] sm:gap-[3rem]">
        {amcs.map((amc) => (
          <FundLogo
            key={amc.id}
            fundHouseDomain={amc.detail_info}
            className="size-11 flex-shrink-0 rounded-lg shadow-md sm:size-14"
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="animate-marquee flex gap-[2.5rem] will-change-transform group-hover:[animation-play-state:paused] sm:gap-[3rem]"
      >
        {amcs.map((amc) => (
          <FundLogo
            key={amc.id}
            fundHouseDomain={amc.detail_info}
            className="size-11 flex-shrink-0 rounded-lg shadow-md sm:size-14"
          />
        ))}
      </div>
    </div>
  );
}

export default MarqueeLogos;
