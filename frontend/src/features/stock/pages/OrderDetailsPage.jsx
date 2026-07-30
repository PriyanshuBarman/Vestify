import { useQueryClient } from "@tanstack/react-query";
import { ChevronRightIcon } from "lucide-react";
import { Link, useLocation, useParams, useSearchParams } from "react-router";

import CopyButton from "@/components/CopyButton";
import GoBackBar from "@/components/GoBackBar";
import OrderStatusIcon from "@/components/OrderStatusIcon";

import OrderActionButtons from "../components/OrderActionButtons";
import OrderStatusTimeline from "../components/OrderStatusTimeline";
import { useGetOrderDetail } from "../hooks/useGetOrderDetail";
import { getOrderDetailsItems } from "../utils/orderUtils";

function OrderDetailsPage() {
  const queryClient = useQueryClient();
  const { orderId } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");
  const isOtherUserProfile = Boolean(username);
  const { data: order = {} } = useGetOrderDetail(orderId, username);
  const userKey = isOtherUserProfile ? username : "self";
  const initialOrderData = location.state?.order || location.state;

  // If navigated with state & there is no cache, set it in the query cache
  if (
    initialOrderData &&
    !queryClient.getQueryData([userKey, "stocks", "order", orderId])
  ) {
    queryClient.setQueryData(
      [userKey, "stocks", "order", orderId],
      initialOrderData,
    );
  }

  const items = getOrderDetailsItems(order);

  return (
    <div className="sm:mx-auto px-4 sm:px-6 h-svh md:px-8 sm:border-x pb-4 flex flex-col tabular-nums sm:max-w-2xl">
      <GoBackBar title="Order Details" className="px-0" />

      <div className="space-y-4">
        <OrderStatusIcon status={order.status} className="size-16" />
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold">
            {order.quantity}
            <span className="text-sm text-muted-foreground font-medium">
              qty
            </span>
          </h1>
        </div>

        <Link
          to={`/stocks/${order.symbol}`}
          className="flex  items-center gap-4"
        >
          <span className="text-md font-medium">{order.name}</span>
          <ChevronRightIcon className="size-5" />
        </Link>

        <div className="space-y-4 border-y py-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex justify-between font-medium items-center"
            >
              <span className="text-muted-foreground text-xs">
                {item.title}
              </span>
              <span className="text-sm capitalize ">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <OrderStatusTimeline order={order} />

      {!isOtherUserProfile && (
        <div className="flex text-sm items-center font-medium justify-center my-4 gap-2 text-primary">
          {/* Copy Order Id */}
          <CopyButton label="Copy Order Id" text={order.id} className="" />
        </div>
      )}

      {order.status === "OPEN" && !isOtherUserProfile && (
        <OrderActionButtons order={order} className="mt-auto" />
      )}
    </div>
  );
}

export default OrderDetailsPage;
