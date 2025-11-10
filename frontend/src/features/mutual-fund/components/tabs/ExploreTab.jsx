import CopyrightFooter from "@/components/CopyrightFooter";
import AllFundsSection from "../sections/AllFundsSection";
import CollectionsSection from "../sections/CollectionsSection";
import FundHousesSection from "../sections/FundHousesSection";
// import IndexFundsSection from "./sections/IndexFundsSection";
import PopularFundsSection from "../sections/PopularFundsSection";
import QuickAccessSection from "../sections/QuickAccessSection";
import RecentlyViewedSection from "../sections/RecentlyViewedSection";
import StartSipCard from "../StartSipCard";
import YourInvestments from "../YourInvestments";

function ExploreTab() {
  return (
    <div className="flex justify-between pb-20 sm:gap-6">
      <div className="flex w-full max-w-[820px] flex-col space-y-10 lg:space-y-14">
        <StartSipCard />
        <PopularFundsSection />
        <CollectionsSection />
        <FundHousesSection />
        {/* <IndexFundsSection /> */}
        <RecentlyViewedSection />
        <QuickAccessSection />
        <AllFundsSection />
        <CopyrightFooter className="mt-6 sm:hidden" />
      </div>
      <YourInvestments />
    </div>
  );
}

export default ExploreTab;
