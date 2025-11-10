import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { resetFilters, selectFilters } from "@/store/slices/mutualFundSlice";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useGetFilteredFunds } from "../../hooks/useGetFilteredFunds";
import { getActiveFilterCount } from "../../utils/filterUtils";
import FilterCategoriesTab from "./FilterCategoriesTab";
import FilterFundHouseTab from "./FilterFundHouseTab";
import FilterRatingsTab from "./FilterRatingsTab";
import FilterRiskLevelTab from "./FilterRiskLevelTab";
import FilterSortByTab from "./FilterSortByTab";
import ViewFundsButton from "./ViewFundsButton";

const FILTER_TABS = [
  { label: "Sort by", key: "sort_by" },
  { label: "Categories", key: "fund_category" },
  { label: "Risk", key: "crisil_rating" },
  { label: "Ratings", key: "fund_rating_gte" },
  { label: "Fund House", key: "amc_name" },
];

function FilterSheet({ onClose }) {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const activeFilterCount = getActiveFilterCount(filters);
  const [activeTab, setActiveTab] = useState("Sort by");

  const { data, isFetching } = useGetFilteredFunds(filters);
  const totalCount = data?.pages[0].totalCount;

  const handleClose = () => {
    if (isMobile) {
      if (location.pathname === "/mutual-funds/all-funds") {
        onClose();
      } else {
        navigate("/mutual-funds/all-funds");
      }
    } else {
      onClose();
    }
  };

  const isActive = (key) => {
    if (key === "sort_by") {
      return filters[key] && filters[key] !== "popularity";
    }
    if (key === "fund_rating_gte") {
      return filters[key] !== "";
    }
    return filters[key].length > 0;
  };

  return (
    <div className="flex h-full flex-col sm:pr-4">
      <div className="sm:text-foreground-secondary flex items-center justify-between py-4 sm:py-6 sm:pr-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={handleClose}>
            <XIcon className="size-5" />
          </Button>
          <span className="font-medium">Filters</span>
        </div>

        <Button
          variant="ghost"
          disabled={activeFilterCount < 1}
          onClick={() => dispatch(resetFilters())}
        >
          <span className="border-foreground border-b border-dashed">
            Clear all
          </span>
        </Button>
      </div>

      <div className="flex min-h-0 flex-1 border-t">
        {/* Vertical Tabs */}
        <nav className="flex w-32 flex-col border-r">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              className={`relative flex justify-between border-b px-4 py-4 text-left text-sm font-medium transition-all sm:px-6 sm:py-6 sm:font-semibold ${
                activeTab === tab.label
                  ? "before:bg-primary sm:text-foreground-secondary before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:rounded-r-4xl before:content-[''] sm:before:w-[5px]"
                  : "text-muted-foreground sm:text-foreground hover:bg-muted"
              }`}
              onClick={() => setActiveTab(tab.label)}
            >
              <span>{tab.label}</span>
              <span className="indicator text-primary">
                {isActive(tab.key) ? "•" : ""}
              </span>
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {activeTab === "Sort by" && <FilterSortByTab />}
          {activeTab === "Categories" && <FilterCategoriesTab />}
          {activeTab === "Risk" && <FilterRiskLevelTab />}
          {activeTab === "Ratings" && <FilterRatingsTab />}
          {activeTab === "Fund House" && <FilterFundHouseTab />}
        </div>
      </div>

      {/* Sticky footer button */}
      <div className="bg-background sticky bottom-0 left-0 z-50 w-full border-t p-4">
        <ViewFundsButton
          isFetching={isFetching}
          totalCount={totalCount}
          onClick={handleClose}
        />
      </div>
    </div>
  );
}

export default FilterSheet;
