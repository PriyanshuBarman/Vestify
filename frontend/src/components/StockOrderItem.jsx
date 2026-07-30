import { formatDate } from "date-fns";
import { useNavigate } from "react-router";

import { cn } from "@/lib/utils";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { formatToINR } from "@/utils/formatters";

const COLOR_CONFIG = {
  UNSUCCESSFUL: "bg-negative",
  CANCELLED: "bg-negative",
  OPEN: "bg-yellow-500",
  SUCCESSFUL: "bg-positive",
};

function StockOrderItem({ index, length, order, onOrderClick }) {
  const navigate = useNavigate();

  const isBuy = order.action === "BUY";
  const isTriggerOrder = order.type === "GTT";
  const isCompleted = order.status === "SUCCESSFUL";

  const handleClick = () => {
    if (onOrderClick) {
      onOrderClick(order);
    } else {
      navigate(`/stocks/orders/${order.id}`);
    }
  };

  const avgPrice =
    order.price ??
    (order.amount && order.quantity
      ? Number(order.amount) / order.quantity
      : null);

  const rightDescription = isCompleted
    ? avgPrice
      ? `Avg. ${formatToINR(avgPrice)}`
      : "Executed"
    : isTriggerOrder
      ? `Price reaches ${formatToINR(order.triggerPrice)}`
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
        onClick={handleClick}
      >
        <ItemContent>
          <ItemDescription>
            {order.createdAt ? formatDate(new Date(order.createdAt), "p") : ""}
          </ItemDescription>
          <ItemTitle>{order.name || order.shortName || order.symbol}</ItemTitle>
          <ItemDescription className="capitalize">
            {order.productType?.toLowerCase() || "delivery"}
          </ItemDescription>
        </ItemContent>
        <ItemContent className="items-end">
          <ItemDescription
            className={cn(
              "font-medium",
              isBuy ? "text-positive" : "text-negative",
            )}
          >
            {order.action}
          </ItemDescription>
          <ItemTitle className="flex items-center gap-2">
            <div
              className={`size-2 rounded-full ${COLOR_CONFIG[order.status] || "bg-muted-foreground"}`}
            />
            <span>{order.quantity}</span>
          </ItemTitle>
          <ItemDescription>{rightDescription}</ItemDescription>
        </ItemContent>
      </Item>
      {index !== length - 1 && <ItemSeparator />}
    </>
  );
}

export default StockOrderItem;
