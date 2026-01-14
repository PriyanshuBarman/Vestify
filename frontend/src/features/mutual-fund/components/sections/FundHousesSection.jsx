import { Link } from "react-router";
import { useGetAMCs } from "../../hooks/useGetAMCs";
import FundLogo from "../FundLogo";
import SectionHeading from "../SectionHeading";
import { useIsMobile } from "@/hooks/useIsMobile";

function FundHousesSection() {
  const isMobile = useIsMobile();
  const { data: amcs } = useGetAMCs();

  return (
    <section className="swiper-no-swiping">
      <SectionHeading
        heading={"Fund Houses"}
        subHeading={"View all"}
        navigateTo="/mutual-funds/fund-houses"
      />

      <div className="scrollbar-none grid auto-cols-[49%] grid-flow-col grid-rows-2 gap-3 px-4 max-sm:overflow-auto sm:m-0.5 sm:auto-cols-fr sm:gap-x-4 sm:px-0">
        {/* Cards */}
        {amcs?.slice(0, isMobile ? 8 : 6).map((amc, index) => (
          <Link
            key={index}
            to={`/mutual-funds/amc-funds/${amc.amc_code}`}
            className="bg-card cursor-pointer space-y-2 rounded-2xl border p-3 duration-200 hover:scale-101 sm:m-0.5 sm:space-y-5 sm:rounded-[1.5rem] sm:p-4"
          >
            <div className="flex items-end gap-2 sm:gap-4">
              <FundLogo fundHouseDomain={amc.detail_info} />
              <p className="text-2xs sm:text-[0.9rem] sm:font-[450]">
                {amc.fundCount}
                <span className="ml-0.5 text-[85%] sm:ml-1">Funds</span>
              </p>
            </div>
            <p className="line-clamp-1  sm:text-[0.9rem] text-xs font-[450] sm:text-sm sm:font-medium">
              {amc.amc_name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
export default FundHousesSection;
