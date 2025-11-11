import GoBackBar from "@/components/GoBackBar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ChevronsLeftRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import SortByButton from "../components/filters/SortByButton";
import TableLG from "../components/tables/TableLG";
import TableSM from "../components/tables/TableSM";
import { DEFAULT_COLUMNS, sortOptions } from "../constants/collection";
import { useGetFundsByFilter } from "../hooks/useGetFundsByFilter";
import {
  columnsConfig,
  getNewOrder,
  getNextColumn,
  sortPeersBy,
} from "../utils/collectionsUtils";

function CollectionPage() {
  const isMobile = useIsMobile();
  const [peers, setPeers] = useState();
  const [activeColumn, setActiveColumn] = useState("popularity"); // default active column (popularity)
  const [activeSortBy, setActiveSortBy] = useState("popularity");
  const [orderBy, setOrderBy] = useState("desc");
  const [visibleColumns, setVisibleColumns] = useState(DEFAULT_COLUMNS);

  const { label, filters, description, img } = useLocation().state ?? {};
  const { data, isPending } = useGetFundsByFilter(filters);

  useEffect(() => {
    if (data) setPeers(data);
  }, [data]);

  // Desktop table callback
  const handleDesktopClick = (clicked) => {
    const newOrder = getNewOrder(clicked, activeColumn, orderBy);
    setOrderBy(newOrder);
    setPeers((prevPeers) => sortPeersBy(prevPeers, clicked, newOrder));
    setActiveColumn(clicked);
  };

  // Mobile table callbacks
  const handleColumnClick = () => {
    setActiveColumn((prev) => getNextColumn(prev));
  };

  const handleSortChange = (columnKey) => {
    if (columnKey === "popularity") {
      setActiveSortBy("popularity");
      setPeers(data);
      return;
    }

    setPeers((prevPeers) =>
      sortPeersBy(
        prevPeers,
        columnKey,
        columnKey === "expense_ratio" ? "asc" : orderBy,
      ),
    );
    setActiveSortBy(columnKey);
    setActiveColumn(columnKey);
  };

  const handleOrderChange = () => {
    const newOrder = orderBy === "asc" ? "desc" : "asc";
    setOrderBy(newOrder);
    setPeers((prevPeers) => sortPeersBy(prevPeers, activeColumn, newOrder));
  };

  return (
    <div className="relative">
      <section className="bg-background sticky top-0 z-10 pb-1">
        <GoBackBar />
        <div className="mb-4 flex items-center gap-8 px-4 sm:mb-10">
          <div className="space-y-2 sm:space-y-4">
            <h2 className="text-lg font-semibold sm:text-2xl">{label} </h2>
            <p className="text-muted-foreground text-sm">{description || ""}</p>
          </div>
          {img && (
            <Avatar className="size-18 rounded-lg border p-2 sm:h-24 sm:w-34 dark:mix-blend-hard-light">
              <AvatarImage src={img} />
            </Avatar>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between px-4 text-xs font-semibold sm:hidden">
          <SortByButton
            defaultSortBy="popularity"
            sortOptions={sortOptions}
            activeSortBy={activeSortBy}
            onSortChange={handleSortChange}
            columnsConfig={columnsConfig}
          />
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
          funds={peers}
          isPending={isPending}
          activeColumn={activeColumn}
          onColumnClick={handleColumnClick}
          columnsConfig={columnsConfig}
        />
      ) : (
        <TableLG
          funds={peers}
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

export default CollectionPage;
