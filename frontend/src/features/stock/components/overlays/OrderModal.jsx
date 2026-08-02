import { ChevronRightIcon, LogsIcon } from "lucide-react";
import { Link } from "react-router";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-modal";
import { formatToINR } from "@/utils/formatters";

import { useGetLiveData } from "../../hooks/useGetLiveData";
import OrderActionButtons from "../OrderActionButtons";

function OrderModal({ isOpen, onOpenChange, order }) {
  const { price: livePrice } = useGetLiveData(order?.symbol);

  if (!order) return null;

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
    <ResponsiveModal open={isOpen} onOpenChange={onOpenChange}>
      <ResponsiveModalContent>
        <ResponsiveModalHeader className="sr-only">
          <ResponsiveModalTitle>Order Details Modal</ResponsiveModalTitle>
          <ResponsiveModalDescription aria-hidden="true" />
        </ResponsiveModalHeader>

        <Item size="sm" className="tabular-nums">
          <ItemContent>
            <ItemDescription
              className={
                order.action === "BUY" ? "text-positive" : "text-negative"
              }
            >
              {order.action}
            </ItemDescription>
            <ItemTitle>
              <Link
                to={`/stocks/${order.symbol}`}
                className="flex gap-1 items-center"
              >
                <span>{order.name}</span>
                <ChevronRightIcon className="size-5 text-muted-foreground " />
              </Link>
            </ItemTitle>
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

        <Link
          to={`/stocks/orders/${order.id}`}
          state={{ order }}
          className="flex border-y items-center pl-4"
        >
          <LogsIcon className="text-muted-foreground size-5" />
          <span className="text-md p-4">Order details</span>
        </Link>

        {order.status === "OPEN" && (
          <ResponsiveModalFooter className="mt-4">
            <OrderActionButtons order={order} />
          </ResponsiveModalFooter>
        )}
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export default OrderModal;
