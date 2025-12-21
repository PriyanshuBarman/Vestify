import {
  Item,
  ItemContent,
  ItemDescription,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { formatToINR } from "@/utils/formatters";
import { Link } from "react-router";
import { orderStatusConfig, orderTypeConfig } from "../constants/order";
import { cn } from "@/lib/utils";

function OrderItem({ order, index, length, className }) {
  return (
    <>
      <Item asChild size="sm" className={cn("cursor-pointer", className)}>
        <Link
          to={`/mutual-funds/orders/${order.id}`}
          key={order.id}
          className="flex justify-between border-b py-4"
        >
          <ItemContent>
            <ItemTitle className="font-normal">{order.fundShortName}</ItemTitle>
            <ItemDescription className="text-xs">
              {orderTypeConfig[order.orderType]}
            </ItemDescription>
          </ItemContent>

          <div className="flex flex-col items-end justify-between gap-1">
            <span className="font-medium tabular-nums sm:text-base">
              {formatToINR(order.amount, 2)}
            </span>
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <div
                className={`size-2 rounded-full ${
                  order.status === "FAILED"
                    ? "bg-destructive"
                    : order.status === "PENDING"
                      ? "bg-yellow-500"
                      : "bg-primary"
                }`}
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
export default OrderItem;
