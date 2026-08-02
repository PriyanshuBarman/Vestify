import { lazy, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import LoadingState from "@/components/LoadingState";
import { formatToINR } from "@/utils/formatters";

import { useGetLiveData } from "../../hooks/useGetLiveData";
import { useGetOpenOrders } from "../../hooks/useGetOpenOrders";
import { useGetTodayOrders } from "../../hooks/useGetTodayOrders";
import { useSubscribeStock } from "../../hooks/useSubscribeStock";
import { partitionOpenOrders } from "../../utils/orderUtils";
import OrderModal from "../overlays/OrderModal";

const NoOrders = lazy(() => import("@/components/empty-states/NoOrders"));

function OrdersTab({ username, isActive }) {
  const isOtherUserProfile = Boolean(username);
  const navigate = useNavigate();

  const { data: pendingOrders = [], isLoading: isLoadingPending } =
    useGetOpenOrders(username);
  const { data: todayOrders = [], isLoading: isLoadingToday } =
    useGetTodayOrders(username);

  const isLoading = isLoadingPending || isLoadingToday;

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Partition pending orders into GTT orders and Regular/SL open orders
  const { gttOrders, openOrders } = useMemo(
    () => partitionOpenOrders(pendingOrders),
    [pendingOrders],
  );

  const orderSymbols = useMemo(() => {
    return [
      ...gttOrders.map((o) => o.symbol),
      ...openOrders.map((o) => o.symbol),
      ...todayOrders.map((o) => o.symbol),
    ].filter(Boolean);
  }, [gttOrders, openOrders, todayOrders]);

  useSubscribeStock(orderSymbols, { enabled: isActive });

  const handleOrderClick = (order) => {
    if (username) {
      navigate(`/stocks/orders/${order.id}?username=${username}`, {
        state: { order },
      });
      return;
    }
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  const hasNoOrders =
    gttOrders.length === 0 &&
    openOrders.length === 0 &&
    todayOrders.length === 0;

  if (hasNoOrders) {
    return (
      <NoOrders
        showAllOrdersButton={true}
        type="stock"
        isOtherUserProfile={Boolean(username)}
      />
    );
  }

  const defaultValues = openOrders.length > 0 ? ["open"] : [];

  return (
    <>
      <Accordion
        type="multiple"
        defaultValue={defaultValues}
        className="max-w-2xl mx-auto"
      >
        {/* GTT / Trigger Orders */}
        {gttOrders.length > 0 && (
          <AccordionItem value="gtt" className="px-4">
            <AccordionTrigger className="pt-0 text-base sm:text-lg">
              Trigger Orders ({gttOrders.length})
            </AccordionTrigger>
            <AccordionContent>
              <ItemGroup>
                {gttOrders.map((order, index) => (
                  <OrderItem
                    key={order.id}
                    index={index}
                    length={gttOrders.length}
                    order={order}
                    onOrderClick={handleOrderClick}
                  />
                ))}
              </ItemGroup>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Open Orders (REGULAR / SL) */}
        {openOrders.length > 0 && (
          <AccordionItem value="open" className="px-4">
            <AccordionTrigger className="text-base sm:text-lg">
              Open Orders ({openOrders.length})
            </AccordionTrigger>
            <AccordionContent>
              <ItemGroup>
                {openOrders.map((order, index) => (
                  <OrderItem
                    key={order.id}
                    index={index}
                    length={openOrders.length}
                    order={order}
                    onOrderClick={handleOrderClick}
                  />
                ))}
              </ItemGroup>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Today's Executed Orders */}
        {todayOrders.length > 0 && (
          <AccordionItem value="today" className="px-4">
            <AccordionTrigger className="text-base sm:text-lg">
              Today&apos;s Orders ({todayOrders.length})
            </AccordionTrigger>
            <AccordionContent>
              <ItemGroup>
                {todayOrders.map((order, index) => (
                  <OrderItem
                    key={order.id}
                    index={index}
                    length={todayOrders.length}
                    order={order}
                    onOrderClick={handleOrderClick}
                  />
                ))}
              </ItemGroup>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>

      {!isOtherUserProfile && (
        <div className="w-full flex mt-4 justify-center">
          <Button asChild variant="ghost" className="text-primary ">
            <Link to="/orders">All orders</Link>
          </Button>
        </div>
      )}

      <OrderModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}

export default OrdersTab;

function OrderItem({ index, length, order, onOrderClick }) {
  const { price: livePrice } = useGetLiveData(order.symbol);

  const isBuy = order.action === "BUY";
  const isGTTOrder = order.type === "GTT";

  const leftDescription = isGTTOrder
    ? `Price reaches ${formatToINR(order.triggerPrice)}`
    : `Mkt ${formatToINR(livePrice)}`;

  const rightDescription = isGTTOrder
    ? `Mkt ${formatToINR(livePrice)}`
    : order.limitPrice
      ? `Limit at ${formatToINR(order.limitPrice)}`
      : order.triggerPrice
        ? `Trigger at ${formatToINR(order.triggerPrice)}`
        : "At Market";

  return (
    <>
      <Item
        size="sm"
        className="tabular-nums px-0 cursor-pointer"
        onClick={() => onOrderClick(order)}
      >
        <ItemContent>
          <ItemDescription
            className={isBuy ? "text-positive" : "text-negative"}
          >
            {order.action}
          </ItemDescription>
          <ItemTitle>{order.name}</ItemTitle>
          <ItemDescription>{leftDescription}</ItemDescription>
        </ItemContent>
        <ItemContent className="items-end">
          <ItemDescription className="capitalize">
            {order.productType?.toLowerCase()}
          </ItemDescription>
          <ItemTitle>{order.quantity}</ItemTitle>
          <ItemDescription>{rightDescription}</ItemDescription>
        </ItemContent>
      </Item>
      {index !== length - 1 && <ItemSeparator />}
    </>
  );
}
