import { useMediaQuery } from "react-responsive";

import CopyrightFooter from "@/components/CopyrightFooter";
import InstallAppCard from "@/components/InstallAppCard";

import PopularStocksSection from "../sections/PopularStocksSection";
import RecentlyViewedSection from "../sections/RecentlyViewedSection";
import TopMoversSection from "../sections/TopMoversSection";

function ExploreTab() {
  const showInvestmentCard = useMediaQuery({ minWidth: 1125 });

  return (
    <div className="flex justify-between sm:gap-6">
      <div className="flex w-full max-w-[820px] flex-col space-y-10 lg:space-y-14">
        <InstallAppCard />
        <RecentlyViewedSection />
        <PopularStocksSection />
        <TopMoversSection />

        <CopyrightFooter className="mt-6 mb-20 sm:hidden" />
      </div>
      {showInvestmentCard && <div className="space-y-12"></div>}
    </div>
  );
}

export default ExploreTab;
