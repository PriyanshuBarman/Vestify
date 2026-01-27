import GoBackBar from "@/components/GoBackBar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { formatToINR } from "@/utils/formatters";
import { ChevronsLeftRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import FilterCategoryButton from "../components/filters/FilterCategoryButton";
import FundLogo from "../components/FundLogo";
import TableLG from "../components/tables/TableLG";
import TableSM from "../components/tables/TableSM";
import { DEFAULT_COLUMNS, sortOptions } from "../constants/collection";
import { useGetAmcFunds } from "../hooks/useGetAmcFunds";
import { useGetAMCs } from "../hooks/useGetAMCs";
import {
  columnsConfig,
  getNewOrder,
  getNextColumn,
  sortPeersBy,
} from "../utils/collectionsUtils";

function AmcFundsPage() {
  const isMobile = useIsMobile();
  const { amcCode } = useParams();
  const { data: amcs } = useGetAMCs();
  const amc = amcs?.find((amc) => amc.amc_code === amcCode) || {};

  const { data, isPending } = useGetAmcFunds(amcCode);
  const [funds, setFunds] = useState([]);
  const [activeColumn, setActiveColumn] = useState("popularity"); // default active column (popularity)
  const [activeSortBy, setActiveSortBy] = useState("popularity");
  const [orderBy, setOrderBy] = useState("desc");
  const [visibleColumns, setVisibleColumns] = useState(DEFAULT_COLUMNS);
  const [activeCategory, setActiveCategory] = useState("Equity");

  useEffect(() => {
    if (data) setFunds(data[activeCategory]);
  }, [data, activeCategory]);

  // Desktop table callback
  const handleDesktopClick = (clicked) => {
    const newOrder = getNewOrder(clicked, activeColumn, orderBy);
    setFunds((prevPeers) => sortPeersBy(prevPeers, clicked, newOrder));
    setActiveColumn(clicked);
    setOrderBy(newOrder);
  };

  // Mobile table callbacks
  const handleColumnClick = () => {
    setActiveColumn((prev) => getNextColumn(prev));
  };

  const handleSortChange = (columnKey) => {
    if (columnKey === "popularity") {
      setActiveSortBy("popularity");
      setFunds(data);
      return;
    }
    setActiveSortBy(columnKey);
    setActiveColumn(columnKey);
    setFunds((prevPeers) => sortPeersBy(prevPeers, columnKey, orderBy));
  };

  const handleOrderChange = () => {
    const newOrder = orderBy === "asc" ? "desc" : "asc";
    setOrderBy(newOrder);
    setFunds((prevPeers) => sortPeersBy(prevPeers, activeColumn, newOrder));
  };

  const categories = data ? Object.keys(data) : [];

  return (
    <div className="relative sm:py-6">
      <section className="bg-background sticky top-0 z-10 sm:relative">
        <GoBackBar />
        <div className="flex items-center justify-between gap-8 px-4 sm:mb-10 sm:justify-start sm:gap-12">
          <div>
            <h2 className="text-lg font-semibold sm:text-2xl">
              {amc.amc_name}{" "}
            </h2>
            <p className="text-muted-foreground sm:text-md mt-2 space-x-2 text-xs whitespace-pre-line">
              Rank(total asset):
              <b>#{amc.rank} in India</b>
            </p>
            <p className="text-muted-foreground sm:text-md mt-2 space-x-2 text-xs">
              Total AUM <b>{formatToINR(amc.totalAum / 10)}Cr</b>
            </p>
          </div>
          <FundLogo
            fundHouseDomain={amc.detail_info}
            className="size-16 rounded-2xl border sm:size-24"
          />
        </div>
        <FilterCategoryButton
          isPending={isPending}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="flex w-full items-center justify-between px-4 py-2 sm:hidden">
          <span className="text-xs font-semibold tabular-nums">
            {funds.length.toLocaleString()} funds
          </span>
          <Button
            variant="ghost"
            onClick={handleColumnClick}
            className="border-muted-foreground flex h-auto items-center justify-end gap-1 rounded-xl !px-0 text-right text-xs font-semibold"
          >
            <ChevronsLeftRightIcon className="size-4 shrink-0" />
            <span className="border-muted-foreground border-b border-dashed">
              {
                columnsConfig[
                  activeColumn === "popularity" ? "return_3y" : activeColumn
                ].name
              }
            </span>
          </Button>
        </div>
      </section>

      {isMobile ? (
        <TableSM
          funds={funds}
          isPending={isPending}
          activeColumn={activeColumn}
          activeSortBy={activeSortBy}
          order={orderBy}
          onColumnClick={handleColumnClick}
          onSortChange={handleSortChange}
          onOrderChange={handleOrderChange}
          sortOptions={sortOptions}
          columnsConfig={columnsConfig}
          show="sortByBtn"
        />
      ) : (
        <TableLG
          funds={funds}
          isPending={isPending}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          activeColumn={activeColumn}
          sortOrder={orderBy}
          onClick={handleDesktopClick}
          columnsConfig={columnsConfig}
        />
      )}
    </div>
  );
}

export default AmcFundsPage;
