import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ChevronsUpDown, StarIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useRecentlyViewedFunds } from "../hooks/useRecentlyViewedFunds";
import CardLG from "./CardLG";
import FundLogo from "./FundLogo";
import FundRating from "@/features/mutualfund/components/FundRating";

const labelArr = [
  { key: "return_1y", label: "1Y Returns" },
  { key: "return_3y", label: "3Y Returns" },
  { key: "return_5y", label: "5Y Returns" },
  { key: "expense_ratio", label: "Expense Ratio" },
];

function RecentlyViewedFunds() {
  const isMobile = useIsMobile();
  const [activeLabelIdx, setActiveLabelIdx] = useState(0);
  const funds = useRecentlyViewedFunds(isMobile ? 5 : 4, false);

  // Loop ♾️
  const handleClick = () => {
    const nextIndex = (activeLabelIdx + 1) % labelArr.length;
    setActiveLabelIdx(nextIndex);
  };

  if (!funds?.length) return null;

  return (
    <section>
      <h2 className="pl-4 font-medium sm:pl-0 sm:text-xl sm:font-semibold">
        Recently Viewed
      </h2>

      <div className="mt-6 flex items-center justify-between pl-4 sm:hidden sm:px-0">
        <h4 className="text-muted-foreground text-[0.8rem] font-medium sm:text-base">
          Fund Name
        </h4>
        <Button
          onClick={handleClick}
          variant="ghost"
          className="flex gap-1 text-[0.8rem]"
        >
          <ChevronsUpDown strokeWidth={2.5} />
          {labelArr[activeLabelIdx].label}
        </Button>
      </div>

      <ScrollArea>
        <div className="mt-4 w-full gap-4 space-y-5 px-4 sm:my-8 sm:flex sm:space-y-0 sm:px-0">
          {funds?.map((fund) =>
            isMobile ? (
              <Row
                key={fund.id}
                fund={fund}
                activeLabelIdx={activeLabelIdx}
                handleChange={handleClick}
              />
            ) : (
              <CardLG key={fund.id} fund={fund} />
            ),
          )}
        </div>

        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </section>
  );
}

export default RecentlyViewedFunds;

function Row({ fund, activeLabelIdx, handleChange }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/mutual-funds/${fund?.scheme_code}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChangeClick = (e) => {
    e.stopPropagation();
    handleChange();
  };

  const key = labelArr[activeLabelIdx].key;
  const value = fund[key] ? fund[key] + "%" : "NA";

  return (
    <div
      onClick={handleClick}
      className="flex min-w-full items-center border-b pb-4 sm:hidden"
    >
      <FundLogo fundHouseDomain={fund.detail_info} />

      <div className="ml-4">
        <h3 className="text-sm">{fund.short_name}</h3>
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <span className="capitalize">{fund.fund_category}</span>
          <FundRating rating={fund.fund_rating} />
        </div>
      </div>
      <div onClick={handleChangeClick} className="ml-auto">
        <span className="text-sm font-medium">{value}</span>
      </div>
    </div>
  );
}
