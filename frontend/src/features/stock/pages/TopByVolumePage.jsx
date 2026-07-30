import { useState } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";
import GoBackButton from "@/components/GoBackButton";

import FilterIndices from "../components/overlays/FilterIndices";
import TableLG from "../components/tables/TableLG";
import TableSM from "../components/tables/TableSM";
import TableSMHeader from "../components/tables/TableSMHeader";
import { BSE_INDICES } from "../constants/bseIndices";
import { STOCK_COLUMNS_SM } from "../constants/table";
import { useGetTopByVolume } from "../hooks/useGetTopByVolume";

function TopByVolumePage() {
  const isMobile = useIsMobile();
  const [selectedIndex, setSelectedIndex] = useState(BSE_INDICES[1].value);
  const [activeColumnIndex, setActiveColumnIndex] = useState(0);

  const { data, isLoading } = useGetTopByVolume(selectedIndex);
  const stocks = data?.slice(0, 30); // show max 30 stocks
  const activeColumn = STOCK_COLUMNS_SM[activeColumnIndex];

  const handleColumnClick = () => {
    setActiveColumnIndex((prev) => (prev + 1) % STOCK_COLUMNS_SM.length);
  };

  return (
    <div>
      <div className="bg-background sticky top-0 z-10 w-full border-b sm:border-none">
        <div className="flex items-center py-4">
          <GoBackButton className="sm:hidden" />
          <h1 className="font-medium sm:font-semibold sm:text-2xl">
            Top by Volume
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 px-4 py-2 sm:px-0">
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

export default TopByVolumePage;
