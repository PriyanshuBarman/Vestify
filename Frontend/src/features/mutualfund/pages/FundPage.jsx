import GoBackBar from "@/components/GoBackBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { setIsSearchOpen } from "@/store/slices/searchSlice";
import { Bookmark, LockKeyholeIcon, Search } from "lucide-react";
import { lazy } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Chart from "../components/chart/Chart";
import FundDescription from "../components/FundDescription";
import FundLogo from "../components/FundLogo";
import FundPageAccordions from "../components/FundPageAccordions.jsx";
import FundPortfolioPreview from "../components/fundPortfolioPreview";
import RecentlyViewedFunds from "../components/RecentlyViewedFunds";
import { useAddToWatchlist } from "../hooks/useAddToWatchlist";
import { useGetFundData } from "../hooks/useGetFundData";
import { useGetIsInWatchlist } from "../hooks/useGetIsInWatchlist";
import { useRemoveFromWatchlist } from "../hooks/useRemoveFromWatchlist";
import { formatFundCategory } from "../utils/formaters";

const PurchaseBtns = lazy(() => import("../components/PurchaseBtns"));
const DesktopPaymentCard = lazy(
  () => import("../components/DesktopPaymentCard"),
);

function FundPage() {
  const { scheme_code } = useParams();
  const { data: fund = {}, isPending } = useGetFundData(scheme_code);
  const { data: isInWatchlist } = useGetIsInWatchlist(scheme_code);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { mutate: addToWatchlist } = useAddToWatchlist();
  const { mutate: removeFromWatchlist } = useRemoveFromWatchlist();

  const handleWatchlistClick = () => {
    if (isInWatchlist) {
      removeFromWatchlist({ schemeCode: scheme_code });
    } else {
      addToWatchlist({
        schemeCode: scheme_code,
        fundName: fund.name,
        shortName: fund.short_name,
        fundHouseDomain: fund.detail_info,
      });
    }
  };

  const handleSearchClick = () => {
    isMobile ? navigate("/search") : dispatch(setIsSearchOpen(true));
  };

  return (
    <div className="mt-4 sm:flex sm:gap-6">
      <GoBackBar />

      <div className="h-full w-full space-y-4 text-inherit sm:space-y-6 lg:w-[67%]">
        <div className="px-4 max-sm:pr-6">
          <div className="flex items-center justify-between">
            <FundLogo
              fundHouseDomain={fund?.detail_info}
              className="border sm:size-13"
            />
            <div className="icons flex items-center gap-4">
              <Button
                disabled={isPending}
                onClick={handleSearchClick}
                size="icon"
                variant="ghost"
                className="bg-accent rounded-full p-5 sm:bg-transparent sm:p-6"
              >
                <Search className="size-5 sm:size-6" />
              </Button>

              <Button
                disabled={isPending}
                onClick={handleWatchlistClick}
                size="icon"
                variant="ghost"
                className="bg-accent rounded-full p-5 sm:bg-transparent sm:p-6"
              >
                <Bookmark
                  className={`${isInWatchlist && "fill-primary text-primary stroke-primary"} size-5 sm:size-6`}
                />
              </Button>
            </div>
          </div>

          <h2 className="Fund-name mt-4 min-h-[1.5rem] text-lg font-medium sm:text-2xl sm:font-semibold">
            {fund.name}
          </h2>

          {/* Fund Category, Risk Level Badges */}
          <div className="text-muted-foreground/90 sm:text-foreground flex items-center sm:mt-4 sm:space-x-2">
            <Badge variant="mutualFund" className="pl-0">
              {fund.fund_type}
            </Badge>
            <Badge variant="mutualFund">
              {formatFundCategory(fund.fund_category)}
            </Badge>
            <Badge variant="mutualFund">{fund.crisil_rating}</Badge>
            {fund.lock_in_period > 0 && (
              <Badge
                variant="mutualFund"
                className="text-primary border-primary"
              >
                <div>
                  <LockKeyholeIcon className="size-5" />
                </div>
                <span className="ml-1.5 text-sm leading-0">
                  {fund.lock_in_period}Y Lock in
                </span>
              </Badge>
            )}
          </div>
        </div>

        <Chart fund={fund} />
        <FundPortfolioPreview schemeCode={scheme_code} />
        <FundDescription fund={fund} />
        <FundPageAccordions fund={fund} />
        <RecentlyViewedFunds />
        {isMobile && <PurchaseBtns fund={fund} isPending={isPending} />}
      </div>

      <DesktopPaymentCard fund={fund} />
    </div>
  );
}

export default FundPage;
