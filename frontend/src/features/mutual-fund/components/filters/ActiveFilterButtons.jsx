import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { selectFilters, setFilters } from "@/store/slices/mutualFundSlice";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredFunds } from "../../hooks/useGetFilteredFunds";
import { getActiveFilterButtons } from "../../utils/filterUtils";
import FundRating from "../FundRating";
import FilterCategoriesTab from "./FilterCategoriesTab";
import FilterFundHouseTab from "./FilterFundHouseTab";
import FilterRatingsTab from "./FilterRatingsTab";
import FilterRiskLevelTab from "./FilterRiskLevelTab";
import ViewFundsButton from "./ViewFundsButton";

// Component mapping for filter tabs
const filterComponents = {
  FilterCategoriesTab,
  FilterFundHouseTab,
  FilterRiskTab: FilterRiskLevelTab,
  FilterRatingsTab,
};

function ActiveFilterButtons() {
  const [openDrawerKey, setOpenDrawerKey] = useState(null);
  const [frozenButtons, setFrozenButtons] = useState([]);
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const { data, isFetching } = useGetFilteredFunds(filters);
  const totalCount = data?.pages[0].totalCount;

  const activeButtons = getActiveFilterButtons(filters);

  const handleClearFilter = (key) => {
    const newFilters = { ...filters };
    newFilters[key] = Array.isArray(filters[key]) ? [] : "";
    dispatch(setFilters(newFilters));
  };

  const handleToggleDrawer = (buttonKey, open) => {
    if (open) {
      setFrozenButtons(activeButtons);
    }
    setOpenDrawerKey(open ? buttonKey : null);
  };

  const buttonsToRender = openDrawerKey ? frozenButtons : activeButtons;

  if (buttonsToRender.length === 0) return null;

  return (
    <>
      {buttonsToRender.map((button) => {
        const FilterComponent = filterComponents[button.component];

        return (
          <Drawer
            key={button.key}
            open={openDrawerKey === button.key}
            onOpenChange={(open) => handleToggleDrawer(button.key, open)}
          >
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                className={`!border-foreground !bg-accent h-7.5 gap-1 rounded-full text-[0.65rem] sm:h-10 sm:text-xs`}
              >
                {button.key === "fund_rating_gte" ? (
                  <FundRating
                    rating={
                      filters.fund_rating_gte > 4
                        ? "5"
                        : `${filters.fund_rating_gte}+`
                    }
                  />
                ) : (
                  <span>{button.label}</span>
                )}
                <span>{button.count > 0 && `(${button.count})`}</span>
                <ChevronDownIcon className="size-3.5" />
              </Button>
            </DrawerTrigger>

            <DrawerContent className="h-full">
              <div className="h-full p-4 sm:px-29">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="sm:text-foreground-secondary text-lg font-semibold">
                    {button.label} {button.count && `(${button.count})`}
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleClearFilter(button.key)}
                    className="text-primary"
                  >
                    Clear
                  </Button>
                </div>
                <FilterComponent />
                <div className="bg-background sticky bottom-0 left-0 z-10 w-full pb-4">
                  <ViewFundsButton
                    isFetching={isFetching}
                    totalCount={totalCount}
                    onClick={() => setOpenDrawerKey(null)}
                  />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        );
      })}
    </>
  );
}

export default ActiveFilterButtons;
