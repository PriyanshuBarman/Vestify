import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useIsMobile } from "@/hooks/useIsMobile";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import GoBackButton from "@/components/GoBackButton";
import {
  selectTopMoversIndex,
  setTopMoversIndex,
} from "@/store/slices/stockSlice";

import FilterIndices from "../components/overlays/FilterIndices";
import TableLG from "../components/tables/TableLG";
import TableSM from "../components/tables/TableSM";
import TableSMHeader from "../components/tables/TableSMHeader";
import { STOCK_COLUMNS_SM } from "../constants/table";
import { useGetGainers } from "../hooks/useGetGainers";
import { useGetLosers } from "../hooks/useGetLosers";

function TopMoversPage() {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("gainers");
  const selectedIndex = useSelector(selectTopMoversIndex);
  const setSelectedIndex = (val) => dispatch(setTopMoversIndex(val));
  const [activeColumnIndex, setActiveColumnIndex] = useState(0);

  const { data: gainers = [], isLoading: isGainersLoading } =
    useGetGainers(selectedIndex);
  const { data: losers = [], isLoading: isLosersLoading } =
    useGetLosers(selectedIndex);

  const isGainers = activeTab === "gainers";
  const stocks = isGainers ? gainers.slice(0, 30) : losers.slice(0, 30); // show max 30 stocks
  const isLoading = isGainers ? isGainersLoading : isLosersLoading;

  const activeColumn = STOCK_COLUMNS_SM[activeColumnIndex];

  const handleColumnClick = () => {
    setActiveColumnIndex((prev) => (prev + 1) % STOCK_COLUMNS_SM.length);
  };

  return (
    <div>
      <div className="bg-background sticky top-0 z-10 w-full border-b sm:border-none">
        <div className="flex items-center py-4">
          <GoBackButton className="sm:hidden" />
          <h1 className="font-medium sm:font-semibold  sm:text-2xl">
            Top Movers Today
          </h1>
        </div>

        <div className="flex flex-wrap mt- items-center gap-3 px-4 py-2 sm:px-0">
          {["gainers", "losers"].map((tab) => (
            <Button
              key={tab}
              variant="outline"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full capitalize max-sm:text-2xs max-sm:h-8 max-sm:px-3 shadow-none ${
                activeTab === tab ? "ring bg-accent" : ""
              }`}
            >
              {tab}
            </Button>
          ))}

          <Separator orientation="vertical" className="h-6!" />
          <FilterIndices value={selectedIndex} onChange={setSelectedIndex} />
        </div>

        <TableSMHeader
          totalCount={stocks?.length}
          activeColumnLabel={activeColumn.label}
          onColumnClick={handleColumnClick}
        />
      </div>

      <div className="mt-2 sm:mt-4">
        {isMobile ? (
          <TableSM
            stocks={stocks}
            isPending={isLoading}
            activeColumnKey={activeColumn.key}
            onColumnClick={handleColumnClick}
          />
        ) : (
          <TableLG stocks={stocks} isPending={isLoading} />
        )}
      </div>
    </div>
  );
}

export default TopMoversPage;
