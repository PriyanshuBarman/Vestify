import ScrollToTop from "@/components/layouts/ScrollToTop";
import LoadingState from "@/components/LoadingState";
import { lazy, useEffect, useState } from "react";
import { useGetPortfolio } from "../../hooks/useGetPortfolio";
import { sortPortfolio } from "../../utils/investmentTabUtils";
const PortfolioModal = lazy(() => import("../overlays/PortfolioModal"));
const PendingOrders = lazy(() => import("../PendingOrders"));
const PortfolioSummary = lazy(() => import("../PortfolioSummary"));
const PortfolioTable = lazy(() => import("../tables/PortfolioTable"));
const NoInvestments = lazy(() => import("../empty-states/NoInvestments"));

const sortOptions = {
  current: "Current",
  invested: "Invested",
  pnl: "P&L",
  returnPercent: "Return",
  dayChangeValue: "Day Change (₹)",
  dayChangePercent: "Day Change (%)",
};

import { useNavigate } from "react-router";

function InvestmentsTab({ username }) {
  const isOtherUserProfile = !!username;
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("current");
  const [orderBy, setOrderBy] = useState("desc");
  const [selectedFund, setSelectedFund] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isPending } = useGetPortfolio(username);

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

  const handleFundClick = (fund) => {
    if (username) {
      navigate(`/mutual-funds/investment-details?username=${username}`, {
        state: fund,
      });
      return;
    }
    setSelectedFund(fund);
    setIsModalOpen(true);
  };

  if (isPending) return <LoadingState />;

  return (
    <div className="space-y-6 pb-20 sm:mx-auto sm:max-w-xl">
      {!isOtherUserProfile && <ScrollToTop />}
      {!isOtherUserProfile && <PendingOrders />}

      {!data?.length ? (
        <NoInvestments isOtherUserProfile={isOtherUserProfile} />
      ) : (
        <>
          <PortfolioSummary username={username} count={portfolio.length} />
          <PortfolioTable
            portfolio={portfolio}
            sortOptions={sortOptions}
            activeSortBy={sortBy}
            onSortChange={handleSortChange}
            onOrderChange={handleOrderChange}
            order={orderBy}
            onFundClick={handleFundClick}
            isOtherUserProfile={isOtherUserProfile}
          />
        </>
      )}
      {selectedFund && (
        <PortfolioModal
          fund={selectedFund}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </div>
  );
}

export default InvestmentsTab;
