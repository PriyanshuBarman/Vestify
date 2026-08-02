import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useIsMobile } from "@/hooks/useIsMobile";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import GoBackButton from "@/components/GoBackButton";
import {
  selectFiftyTwoWeekHighLowIndex,
  setFiftyTwoWeekHighLowIndex,
} from "@/store/slices/stockSlice";

import FilterIndices from "../components/overlays/FilterIndices";
import TableLG from "../components/tables/TableLG";
import TableSM from "../components/tables/TableSM";
import TableSMHeader from "../components/tables/TableSMHeader";
import { STOCK_COLUMNS_SM } from "../constants/table";
import { useGet52WeekHighLow } from "../hooks/useGet52WeekHighLow";

function FiftyTwoWeekHighLowPage() {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("highs");
  const selectedIndex = useSelector(selectFiftyTwoWeekHighLowIndex);
  const setSelectedIndex = (val) => dispatch(setFiftyTwoWeekHighLowIndex(val));
  const [activeColumnIndex, setActiveColumnIndex] = useState(0);

  const { data, isLoading } = useGet52WeekHighLow(selectedIndex);

  const isHighs = activeTab === "highs";
  // show max 30 stocks
  const stocks = isHighs
    ? data?.highs?.slice(0, 30) || []
    : data?.lows?.slice(0, 39) || [];

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
            52 Week high low
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 px-4 py-2 sm:px-0">
          {[
            { key: "highs", label: "52W High" },
            { key: "lows", label: "52W Low" },
          ].map((tab) => (
            <Button
              key={tab.key}
              variant="outline"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full capitalize max-sm:text-2xs max-sm:h-8 max-sm:px-3 shadow-none ${
                activeTab === tab.key ? "ring bg-accent" : ""
              }`}
            >
              {tab.label}
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

export default FiftyTwoWeekHighLowPage;
