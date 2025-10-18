import AllFunds from "./AllFunds";
import Collections from "./Collections";
import FundHouses from "./FundHouses";
import IndexFunds from "./IndexFunds";
import PopularFunds from "./PopularFunds";
import QuickAccess from "./QuickAccess";
import RecentlyViewedSection from "./RecentlyViewedSection";
import StartSip from "./StartSip";
import YourInvestments from "./YourInvestments";

function ExploreTab() {
  return (
    <div className="flex justify-between sm:gap-6">
      <div className="flex w-full max-w-[820px] flex-col space-y-10 lg:space-y-14">
        <StartSip />
        <PopularFunds />
        <Collections />
        <FundHouses/>
        {/* <IndexFunds /> */}
        <RecentlyViewedSection />
        <QuickAccess />
        <AllFunds />
      </div>
      <YourInvestments />
    </div>
  );
}

export default ExploreTab;
