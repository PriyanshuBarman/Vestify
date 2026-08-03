import { lazy, Suspense } from "react";
import { useMediaQuery } from "react-responsive";

import CopyrightFooter from "@/components/CopyrightFooter";
import InstallAppCard from "@/components/InstallAppCard";

import MarketHolidayBanner from "../MarketHolidayBanner";
import FiftyTwoWeekHighLowSection from "../sections/FiftyTwoWeekHighLowSection";
import PopularStocksSection from "../sections/PopularStocksSection";
import RecentlyViewedSection from "../sections/RecentlyViewedSection";
import TopByVolumeSection from "../sections/TopByVolumeSection";
import TopMoversSection from "../sections/TopMoversSection";

const YourInvestments = lazy(() => import("../YourInvestments"));
const YourWatchlist = lazy(() => import("../YourWatchlist"));

function ExploreTab() {
  const showInvestmentCard = useMediaQuery({ minWidth: 1125 });

  return (
    <div className="flex justify-between sm:pb-12 sm:gap-6">
      <div className=" w-full max-w-[820px] flex flex-col gap-10 sm:gap-14">
        <MarketHolidayBanner />
        <InstallAppCard />
        <RecentlyViewedSection showLivePrice />
        <PopularStocksSection />
        <TopMoversSection />
        <TopByVolumeSection />
        <FiftyTwoWeekHighLowSection />
        <CopyrightFooter className="mt-6 sm:hidden" />
      </div>

      {showInvestmentCard && (
        <div className="space-y-12">
          <Suspense fallback={null}>
            <YourInvestments />
            <YourWatchlist />
          </Suspense>
        </div>
      )}
    </div>
  );
}

export default ExploreTab;
