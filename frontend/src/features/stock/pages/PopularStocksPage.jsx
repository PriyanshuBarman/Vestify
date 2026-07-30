import { useState } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";
import GoBackButton from "@/components/GoBackButton";

import TableLG from "../components/tables/TableLG";
import TableSM from "../components/tables/TableSM";
import TableSMHeader from "../components/tables/TableSMHeader";
import { STOCK_COLUMNS_SM } from "../constants/table";
import { useGetPopularStocks } from "../hooks/useGetPopularStocks";

function PopularStocksPage() {
  const isMobile = useIsMobile();
  const [activeColumnIndex, setActiveColumnIndex] = useState(0);

  const { data, isLoading } = useGetPopularStocks();
  const stocks = data?.slice(0, 30); // show max 30 stoxks
  const activeColumn = STOCK_COLUMNS_SM[activeColumnIndex];

  const handleColumnClick = () => {
    setActiveColumnIndex((prev) => (prev + 1) % STOCK_COLUMNS_SM.length);
  };

  return (
    <section className="sm:py-6">
      <div className="bg-background sticky top-0 z-10 w-full border-b sm:border-none">
        <div className="flex items-center py-4">
          <GoBackButton className="sm:hidden" />
          <h1 className="font-medium sm:font-semibold  sm:text-2xl">
            Popular / BSE Sensex Stocks
          </h1>
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
            maxItems={30}
            activeColumnKey={activeColumn.key}
            onColumnClick={handleColumnClick}
          />
        ) : (
          <TableLG stocks={stocks} isPending={isLoading} maxItems={30} />
        )}
      </div>
    </section>
  );
}

export default PopularStocksPage;
