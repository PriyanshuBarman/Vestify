import { useIsMobile } from "@/hooks/useIsMobile";
import { useEffect, useState } from "react";
import { useGetPortfolio } from "../hooks/queries/internalQueries";
import SortByButton from "./filters/SortByButton";
import PortfolioTableLG from "./tables/PortfolioTableLG";
import PortfolioTableSM from "./tables/PortfolioTableSM";
import SectionCards from "./PortfolioSummary";
import { sortPortfolio } from "../utils/investmentTabHelper";
import ScrollToTop from "@/layouts/ScrollToTop";

const sortOptions = {
  current: "Current",
  invested: "Invested",
  pnl: "P&L",
  returnPercent: "Return",
  dayChangeValue: "Day Change (₹)",
  dayChangePercent: "Day Change (%)",
};

function InvestmentsTab() {
  const [portfolio, setPortfolio] = useState();
  const [sortBy, setSortBy] = useState("current");
  const [orderBy, setOrderBy] = useState("desc");

  const { data } = useGetPortfolio();
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

  return (
    <div className="space-y-4">
      <ScrollToTop />
      <SectionCards />

      <SortByButton
        sortOptions={sortOptions}
        activeSortBy={sortBy}
        onSortChange={handleSortChange}
        onOrderChange={handleOrderChange}
        order={orderBy}
      />

      {isMobile ? (
        <PortfolioTableSM portfolio={portfolio || []} />
      ) : (
        <PortfolioTableLG portfolio={portfolio || []} />
      )}
    </div>
  );
}

export default InvestmentsTab;
