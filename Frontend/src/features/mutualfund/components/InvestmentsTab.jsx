import ScrollToTop from "@/components/layouts/ScrollToTop";
import LoadingState from "@/components/LoadingState";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useGetPortfolio } from "../hooks/useGetPortfolio";
import { sortPortfolio } from "../utils/investmentTabHelper";
import SortByButton from "./filters/SortByButton";
import PendingOrders from "./PendingOrders";
import PortfolioSummary from "./PortfolioSummary";
import PortfolioTableLG from "./tables/PortfolioTableLG";
import PortfolioTableSM from "./tables/PortfolioTableSM";

const sortOptions = {
  current: "Current",
  invested: "Invested",
  pnl: "P&L",
  returnPercent: "Return",
  dayChangeValue: "Day Change (₹)",
  dayChangePercent: "Day Change (%)",
};

function InvestmentsTab() {
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("current");
  const [orderBy, setOrderBy] = useState("desc");

  const { data, isPending } = useGetPortfolio();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (data) setPortfolio(data);
  }, [data]);

  const handleSortChange = (columnKey) => {
    setSortBy(columnKey);
    setPortfolio((prev) => sortPortfolio(prev, columnKey, orderBy));
  };

  const handleOrderChange = () => {
    const newOrder = orderBy === "asc" ? "desc" : "asc";
    setOrderBy(newOrder);
    setPortfolio((prev) => sortPortfolio(prev, sortBy, newOrder));
  };

  if (isPending) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      <ScrollToTop />
      <PendingOrders />

      {!portfolio.length ? (
        <NoInvestments />
      ) : (
        <>
          <PortfolioSummary count={portfolio.length} />

          <SortByButton
            defaultSortBy="current"
            portfolio={portfolio}
            sortOptions={sortOptions}
            activeSortBy={sortBy}
            onSortChange={handleSortChange}
            onOrderChange={handleOrderChange}
            order={orderBy}
            className="text-sm max-sm:hidden"
          />
          {isMobile ? (
            <PortfolioTableSM
              portfolio={portfolio}
              sortOptions={sortOptions}
              activeSortBy={sortBy}
              onSortChange={handleSortChange}
              onOrderChange={handleOrderChange}
              order={orderBy}
            />
          ) : (
            <PortfolioTableLG portfolio={portfolio} />
          )}
        </>
      )}
    </div>
  );
}

export default InvestmentsTab;

function NoInvestments() {
  return (
    <div className="mt-20 flex flex-col items-center justify-center px-8 sm:mt-0">
      <img
        src="/StartInvesting.svg"
        alt="Start Investing"
        className="size-50 md:size-70"
      />
      <h3 className="mt-4 text-center font-medium sm:text-lg">
        You haven't invested yet.
      </h3>
      <p className="text-muted-foreground mt-2 text-xs sm:text-sm">
        Start investing in a fund to see your portfolio grow here.
      </p>

      <Button asChild className="mt-6">
        <Link to="/mutual-funds/all-funds">Start Investing</Link>
      </Button>
    </div>
  );
}
