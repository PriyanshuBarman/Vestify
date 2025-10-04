import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useRecentlyViewedFunds } from "../hooks/useRecentlyViewedFunds";
import CardLG from "./CardLG";
import CardSM from "./CardSM";
import SectionHeading from "./SectionHeading";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import FundLogo from "./FundLogo";
import { Link } from "react-router";

function RecentlyViewedSection() {
  const recentlyViewedFunds = useRecentlyViewedFunds();

  if (!recentlyViewedFunds.length) return null;

  return (
    <section className="swiper-no-swiping">
      <SectionHeading heading={"Recently viewed"} />
      <div className="flex flex-wrap justify-between gap-x-2 gap-y-4 px-4 sm:px-0">
        {recentlyViewedFunds?.map((fund) => (
          <Link
            key={fund.scheme_code}
            to={`/mutual-funds/${fund.scheme_code}`}
            className="flex w-[48%] cursor-pointer items-center gap-2 rounded-2xl border px-3 py-3 duration-200 hover:scale-101 sm:m-0.5"
          >
            <FundLogo fundHouseDomain={fund.detail_info} className="size-8" />
            <p className="sm:text-foreground line-clamp-2 text-xs sm:text-sm sm:font-medium">
              {fund.short_name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RecentlyViewedSection;
