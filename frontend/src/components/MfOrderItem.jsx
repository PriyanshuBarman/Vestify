import { Link } from "react-router";

import { cn } from "@/lib/utils";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { formatToINR } from "@/utils/formatters";

import {
  orderStatusConfig,
  orderTypeConfig,
} from "../features/mutual-fund/constants/order";

const COLOR_CONFIG = {
  FAILED: "bg-negative",
  PENDING: "bg-yellow-500",
  COMPLETED: "bg-positive",
};

function MfOrderItem({ order, username, index, length, className }) {
  return (
    <>
      <Item asChild size="sm" className={cn("cursor-pointer", className)}>
        <Link
          key={order.id}
          to={
            username
              ? `/mutual-funds/orders/${order.id}?username=${username}`
              : `/mutual-funds/orders/${order.id}`
          }
          className="flex justify-between border-b py-4"
        >
          <ItemContent>
            <ItemTitle className="font-normal">{order.fundShortName}</ItemTitle>
            <ItemDescription className="text-xs">
              {orderTypeConfig[order.type]}
            </ItemDescription>
          </ItemContent>

          <div className="flex flex-col items-end justify-between gap-1">
            <span className="font-medium tabular-nums sm:text-base">
              {formatToINR(order.amount, 2)}
            </span>
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <div
                className={`size-2 rounded-full ${COLOR_CONFIG[order.status]}`}
              />
              <span>{orderStatusConfig[order.status]}</span>
            </div>
          </div>
        </Link>
      </Item>
      {index !== length - 1 && <ItemSeparator />}
    </>
  );
}
export default MfOrderItem;
