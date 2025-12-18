import CopyrightFooter from "@/components/CopyrightFooter";
import InstallAppCard from "@/components/InstallAppCard";
import { lazy, Suspense } from "react";
import { useMediaQuery } from "react-responsive";
const CollectionsSection = lazy(() => import("../sections/CollectionsSection"));
const FundHousesSection = lazy(() => import("../sections/FundHousesSection"));
const IndexFundsSection = lazy(() => import("../sections/IndexFundsSection"));
const PopularFundsSection = lazy(
  () => import("../sections/PopularFundsSection"),
);
const QuickAccessSection = lazy(() => import("../sections/QuickAccessSection"));
const AllFundsSection = lazy(() => import("../sections/AllFundsSection"));
const RecentlyViewedSection = lazy(
  () => import("../sections/RecentlyViewedSection"),
);
const StartSipCard = lazy(() => import("../StartSipCard"));
const YourInvestments = lazy(() => import("../YourInvestments"));

function ExploreTab() {
  const showInvestmentCard = useMediaQuery({ minWidth: 1125 });

  return (
    <div className="flex justify-between sm:gap-6">
      <div className="flex w-full max-w-[820px] flex-col space-y-10 lg:space-y-14">
        <InstallAppCard />
        <StartSipCard />
        <PopularFundsSection />
        <CollectionsSection />
        <FundHousesSection />
        <Suspense>
          <RecentlyViewedSection />
        </Suspense>
        <Suspense>
          <IndexFundsSection />
        </Suspense>
        <Suspense>
          <QuickAccessSection />
        </Suspense>
        <Suspense>
          <AllFundsSection />
        </Suspense>
        <CopyrightFooter className="mt-6 mb-20 sm:hidden" />
      </div>
      {showInvestmentCard && <YourInvestments />}
    </div>
  );
}

export default ExploreTab;
