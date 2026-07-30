import { useMemo, useState } from "react";
import { format, isToday, isYesterday } from "date-fns";

import { ItemGroup } from "@/components/ui/item";
import NoOrders from "@/components/empty-states/NoOrders";
import GoBackBar from "@/components/GoBackBar";
import LoadingState from "@/components/LoadingState";
import MfOrderItem from "@/components/MfOrderItem";
import StockOrderItem from "@/components/StockOrderItem";
import { useGetOrders as useGetMfOrders } from "@/features/mutual-fund/hooks/useGetOrders";
import { useGetAllOrders as useGetStockOrders } from "@/features/stock/hooks/useGetAllOrders";

const TABS = [
  { id: "stocks", label: "Stocks" },
  { id: "mutual-funds", label: "Mutual Funds" },
];

const groupOrdersByDate = (orders = []) => {
  const groups = {};

  orders.forEach((order) => {
    const rawDate = order.createdAt || order.updatedAt;
    if (!rawDate) return;

    const dateObj = new Date(rawDate);
    let label = format(dateObj, "dd MMM yyyy");
    if (isToday(dateObj)) label = "Today";
    else if (isYesterday(dateObj)) label = "Yesterday";

    if (!groups[label]) groups[label] = [];
    groups[label].push(order);
  });

  return groups;
};

function AllOrdersPage() {
  const [activeTab, setActiveTab] = useState("stocks");

  const { data: stockOrders, isPending: isStockPending } = useGetStockOrders();
  const { data: mfOrders, isPending: isMfPending } = useGetMfOrders();

  const isPending = activeTab === "stocks" ? isStockPending : isMfPending;
  const currentOrders = activeTab === "stocks" ? stockOrders : mfOrders;

  const groupedOrders = useMemo(
    () => groupOrdersByDate(currentOrders || []),
    [currentOrders],
  );

  return (
    <div className="sm:mx-auto sm:max-w-xl pb-10 px-4 sm:px-0">
      <GoBackBar title="All Orders" showSearchIcon={false} className="px-0" />

      <div className="bg-background scrollbar-none sticky top-16 sm:top-20.5 z-10 flex space-x-2 overflow-x-auto border-b sm:pl-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`text-md relative p-2.5 font-[550] transition-all ease-in-out sm:p-3 sm:text-[1.05rem] sm:font-semibold ${
              activeTab === tab.id
                ? "text-foreground after:bg-foreground after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-t-2xl after:content-[''] sm:after:h-1"
                : "text-muted-foreground"
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Orders List Grouped by Date */}
      {isPending ? (
        <LoadingState fullPage />
      ) : !currentOrders?.length ? (
        <NoOrders
          type={activeTab === "stocks" ? "stock" : "mutual-fund"}
          showGoBackBar={false}
        />
      ) : (
        <div className="pt-4">
          {Object.entries(groupedOrders).map(([dateLabel, group]) => (
            <div key={dateLabel}>
              <div className="bg-accent/50 flex justify-between px-3 py-2 text-xs font-medium text-muted-foreground  ">
                <span>{dateLabel}</span>
              </div>

              <ItemGroup>
                {group.map((order, index) =>
                  activeTab === "stocks" ? (
                    <StockOrderItem
                      key={order.id}
                      order={order}
                      index={index}
                      length={group.length}
                    />
                  ) : (
                    <MfOrderItem
                      key={order.id}
                      order={order}
                      index={index}
                      length={group.length}
                      className="px-0"
                    />
                  ),
                )}
              </ItemGroup>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllOrdersPage;
