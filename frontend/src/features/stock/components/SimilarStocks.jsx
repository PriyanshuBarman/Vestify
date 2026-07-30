import { useState } from "react";

import { STOCK_COLUMNS_SM } from "../constants/table";
import { useGetSimilarStocks } from "../hooks/useGetSimilarStocks";
import TableSM from "./tables/TableSM";
import TableSMHeader from "./tables/TableSMHeader";

function SimilarStocks({ symbol }) {
  const [activeColumnIndex, setActiveColumnIndex] = useState(0);
  const { data: stocks = [], isLoading } = useGetSimilarStocks(symbol);

  const activeColumn = STOCK_COLUMNS_SM[activeColumnIndex];

  const handleColumnClick = () => {
    setActiveColumnIndex((prev) => (prev + 1) % STOCK_COLUMNS_SM.length);
  };

  if (!isLoading && stocks.length === 0) {
    return (
      <div className="py-6 text-center text-sm font-medium text-muted-foreground">
        No Similar Stocks Found
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <TableSMHeader
        totalCount={stocks?.length}
        activeColumnLabel={activeColumn.label}
        onColumnClick={handleColumnClick}
      />
      <TableSM
        stocks={stocks}
        isPending={isLoading}
        activeColumnKey={activeColumn.key}
        onColumnClick={handleColumnClick}
      />
    </div>
  );
}

export default SimilarStocks;
