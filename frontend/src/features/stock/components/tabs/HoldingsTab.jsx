import { lazy, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import ScrollToTop from "@/components/layouts/ScrollToTop";
import LoadingState from "@/components/LoadingState";
import PortfolioSummary from "@/components/PortfolioSummary";

import { useGetMultipleLiveData } from "../../hooks/useGetLiveData";
import { useGetPortfolio } from "../../hooks/useGetPortfolio";
import { useSubscribeStock } from "../../hooks/useSubscribeStock";
import {
  calculateStockPortfolioSummary,
  enrichStockPortfolio,
  sortStockPortfolio,
} from "../../utils/stockPortfolioUtils";
import HoldingModal from "../overlays/HoldingModal";
import PortfolioTable from "../tables/PortfolioTable";

const NoInvestments = lazy(
  () => import("@/components/empty-states/NoInvestments"),
);

const sortOptions = {
  current: "Current",
  invested: "Invested",
  pnl: "P&L",
  returnPercent: "Return",
  dayChangeValue: "Day Change (₹)",
  dayChangePercent: "Day Change (%)",
};

function HoldingsTab({ username, isActive }) {
  const isOtherUserProfile = Boolean(username);
  const navigate = useNavigate();

  const { data: rawPortfolio = [], isPending } = useGetPortfolio(username);
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("current");
  const [orderBy, setOrderBy] = useState("desc");

  const portfolioSymbols = useMemo(
    () => rawPortfolio.map((item) => item.symbol).filter(Boolean),
    [rawPortfolio],
  );

  useSubscribeStock(portfolioSymbols, { enabled: isActive });

  const liveStocksMap = useGetMultipleLiveData(portfolioSymbols);
  const enrichedPortfolio = useMemo(() => {
    return enrichStockPortfolio(rawPortfolio, liveStocksMap);
  }, [rawPortfolio, liveStocksMap]);

  const summary = useMemo(() => {
    return calculateStockPortfolioSummary(enrichedPortfolio);
  }, [enrichedPortfolio]);

  const sortedPortfolio = useMemo(() => {
    return sortStockPortfolio(enrichedPortfolio, sortBy, orderBy);
  }, [enrichedPortfolio, sortBy, orderBy]);

  const handleSortChange = (columnKey) => {
    setSortBy(columnKey);
  };

  const handleOrderChange = () => {
    setOrderBy((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleHoldingClick = (order) => {
    if (isOtherUserProfile) {
      navigate(`/community/stocks/holding-details?username=${username}`, {
        state: { holding: order },
      });
      return;
    }
    setSelectedHolding(order);
    setIsModalOpen(true);
  };

  if (isPending) return <LoadingState />;

  return (
    <div className="space-y-6 mt-4 sm:mx-auto sm:max-w-xl sm:pb-12">
      <ScrollToTop />

      {!rawPortfolio?.length ? (
        <NoInvestments type="stock" isOtherUserProfile={isOtherUserProfile} />
      ) : (
        <>
          <PortfolioSummary
            count={rawPortfolio.length}
            summary={summary}
            type="stock"
          />

          <PortfolioTable
            portfolio={sortedPortfolio}
            sortOptions={sortOptions}
            activeSortBy={sortBy}
            onSortChange={handleSortChange}
            onOrderChange={handleOrderChange}
            order={orderBy}
            onStockClick={handleHoldingClick}
          />
        </>
      )}

      {!isOtherUserProfile && (
        <HoldingModal
          holding={selectedHolding}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </div>
  );
}

export default HoldingsTab;
