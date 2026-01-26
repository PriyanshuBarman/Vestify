import CopyButton from "@/components/CopyButton";
import GoBackBar from "@/components/GoBackBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { formatToINR } from "@/utils/formatters";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ChevronRightIcon } from "lucide-react";
import { Link, useLocation, useParams } from "react-router";
import OrderStatusIcon from "../components/OrderStatusIcon";
import OrderStatusTimeline from "../components/OrderStatusTimeline";
import { orderStatusConfig, orderTypeConfig } from "../constants/order";
import { useGetOrderDetail } from "../hooks/useGetOrderDetail";

function OrderDetailsPage() {
  const { orderId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");

  const orderFromState = location.state;
  const queryClient = useQueryClient();

  // If navigated with state & there is no cache, set it in the query cache
  if (orderFromState && !queryClient.getQueryData(["order", orderId, userId])) {
    queryClient.setQueryData(["order", orderId, userId], orderFromState);
  }

  const { data: order = {} } = useGetOrderDetail(orderId, userId);

  return (
    <div className="sm:mx-auto sm:max-w-xl">
      <GoBackBar title="Order Details" />
      <div className="px-4">
        <div className="space-y-4">
          <OrderStatusIcon status={order.status} className="size-16" />
          <div>
            <h2 className="flex items-center gap-4 text-2xl font-semibold">
              {formatToINR(order.amount, 2)}
              {order?.units && order.status === "PENDING" && (
                <Badge variant="secondary">Approx</Badge>
              )}
            </h2>
            <span className="text-muted-foreground mt-2 space-x-6 text-xs">
              {orderTypeConfig[order.orderType]} •{" "}
              {orderStatusConfig[order.status]}
            </span>
          </div>

          {!userId ? (
            <Link
              to={`/mutual-funds/${order.schemeCode}`}
              className="text-md text-muted-foreground flex items-center gap-4"
            >
              <span className="text-sm">{order.fundName}</span>
              <ChevronRightIcon className="size-5" />
            </Link>
          ) : (
            <div className="text-md text-muted-foreground flex items-center gap-4">
              <span className="text-sm">{order.fundName}</span>
            </div>
          )}

          <div className="flex justify-between border-y py-4">
            <div>
              <span className="text-muted-foreground text-xs">
                Completion By
              </span>
              <h4 className="text-sm font-medium">
                {order.processDate &&
                  format(new Date(order.processDate), "dd MMM yy")}
              </h4>
            </div>

            <div className="w-1/2 border-l pl-6">
              <span className="text-muted-foreground text-xs">
                {order.status === "PENDING" && "Expected"} NAV Date
              </span>
              <h4 className="text-sm font-medium">
                {order.navDate && format(new Date(order.navDate), "dd MMM yy")}
              </h4>
            </div>
          </div>
        </div>

        <OrderStatusTimeline order={order} />

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-md">Details</AccordionTrigger>

            <AccordionContent className="text-muted-foreground space-y-4">
              <div className="space-x-8">
                <span>Placed on:</span>
                <span>
                  {order.createdAt &&
                    format(new Date(order.createdAt), "dd MMM yy, h:mm a")}
                </span>
              </div>
              <div className="space-x-10">
                <span>Paid Via:</span>
                <span>Vestify Wallet (Virtual Money)</span>
              </div>
              <div className="flex space-x-10">
                <span className="shrink-0">Order Id:</span>
                <div className="flex items-start gap-2 break-all">
                  <span>{order.id}</span>
                  <CopyButton text={order.id} className="text-foreground" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
export default OrderDetailsPage;
