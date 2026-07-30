import { lazy, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import ScrollToTop from "@/components/layouts/ScrollToTop";
import LoadingState from "@/components/LoadingState";

import { useGetPortfolio } from "../../hooks/useGetPortfolio";
import { useSubscribeStock } from "../../hooks/useSubscribeStock";
import {
  calculateStockPortfolioSummary,
  enrichStockPortfolio,
  sortStockPortfolio,
} from "../../utils/stockPortfolioUtils";
import HoldingModal from "../overlays/HoldingModal";
import StockPortfolioSummary from "../StockPortfolioSummary";
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
  const liveStocks = useSelector((state) => state.stock.liveStocks || {});
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("current");
  const [orderBy, setOrderBy] = useState("desc");

  // Extract all portfolio symbols for real-time socket price subscription
  const portfolioSymbols = useMemo(
    () => rawPortfolio.map((item) => item.symbol).filter(Boolean),
    [rawPortfolio],
  );

  // Subscribe to live market updates for all stocks in user's portfolio
  useSubscribeStock(portfolioSymbols, { enabled: isActive });

  // Enrich portfolio with real-time calculated prices, PnL, 1D returns
  const enrichedPortfolio = useMemo(() => {
    return enrichStockPortfolio(rawPortfolio, liveStocks);
  }, [rawPortfolio, liveStocks]);

  // Calculate overall portfolio summary
  const summary = useMemo(() => {
    return calculateStockPortfolioSummary(enrichedPortfolio);
  }, [enrichedPortfolio]);

  // Sorted portfolio list
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
    if (username) {
      navigate(`/stocks/holding-details?username=${username}`, {
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
          <StockPortfolioSummary
            count={rawPortfolio.length}
            summary={summary}
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

      <HoldingModal
        holding={selectedHolding}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        isOtherUserProfile={isOtherUserProfile}
        username={username}
      />
    </div>
  );
}

export default HoldingsTab;
