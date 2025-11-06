import GoBackBar from "@/components/GoBackBar";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ChevronsLeftRightIcon, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import TableLG from "../components/tables/TableLG";
import TableSM from "../components/tables/TableSM";
import { DEFAULT_COLUMNS, sortOptions } from "../constants/collectionConstants";
import { useGetManagerFunds } from "../hooks/useGetManagerFunds";
import {
  columnsConfig,
  getNewOrder,
  getNextColumn,
  sortPeersBy,
} from "../utils/collectionsHelper";

function ManagerFundsPage() {
  const isMobile = useIsMobile();
  const { managerName } = useParams();
  const { data, isPending } = useGetManagerFunds(managerName);

  const [managedFunds, setManagedFunds] = useState([]);
  const [activeColumn, setActiveColumn] = useState("popularity"); // default active column (popularity)
  const [activeSortBy, setActiveSortBy] = useState("popularity");
  const [orderBy, setOrderBy] = useState("desc");
  const [visibleColumns, setVisibleColumns] = useState(DEFAULT_COLUMNS);

  useEffect(() => {
    if (data) setManagedFunds(data);
  }, [data]);

  // Desktop table callback
  const handleDesktopClick = (clicked) => {
    const newOrder = getNewOrder(clicked, activeColumn, orderBy);
    setManagedFunds((prevPeers) => sortPeersBy(prevPeers, clicked, newOrder));
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
      setManagedFunds(data);
      return;
    }
    setActiveSortBy(columnKey);
    setActiveColumn(columnKey);
    setManagedFunds((prevPeers) => sortPeersBy(prevPeers, columnKey, orderBy));
  };

  const handleOrderChange = () => {
    const newOrder = orderBy === "asc" ? "desc" : "asc";
    setOrderBy(newOrder);
    setManagedFunds((prevPeers) =>
      sortPeersBy(prevPeers, activeColumn, newOrder),
    );
  };

  return (
    <div className="relative">
      <section className="bg-background sticky top-0 z-10 sm:relative">
        <GoBackBar />
        <div className="space-y-4 px-4 sm:mb-10">
          <div className="flex items-center gap-4">
            <Avatar className="size-10 border sm:size-14">
              <UserIcon className="text-muted-foreground m-auto size-full stroke-1 p-1.5 sm:p-2" />
            </Avatar>
            <h2 className="text-lg font-medium sm:text-2xl sm:font-semibold">
              {managerName}{" "}
            </h2>
          </div>
          <p className="text-sm sm:text-base">
            Funds Managed By{" "}
            <span className="font-semibold">{managerName}</span>
          </p>
        </div>

        <div className="flex w-full items-center justify-between px-4 py-2 sm:hidden">
          <span className="text-xs font-semibold tabular-nums">
            {managedFunds.length.toLocaleString()} funds
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
        // ----------- MOBILE TABLE -----------
        <TableSM
          funds={managedFunds}
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
        // ----------- LARGE SCREEN TABLE -----------
        <TableLG
          funds={managedFunds}
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

export default ManagerFundsPage;
