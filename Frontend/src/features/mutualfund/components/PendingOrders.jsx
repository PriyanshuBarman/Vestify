import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import { useGetAllOrders } from "../hooks/useGetAllOrders";
import { formatToINR } from "@/utils/formatters";
import { Link, useNavigate } from "react-router";
import { ChevronRightIcon } from "lucide-react";

const OrderTypeConfig = {
  ONE_TIME: "One-Time",
  SIP_INSTALLMENT: "SIP Installment",
  NEW_SIP: "New SIP",
  REDEEM: "Redeem",
};

function PendingOrders() {
  const navigate = useNavigate();
  const { data } = useGetAllOrders();
  const pendingOrders = data?.filter((order) => order.status === "PENDING");

  if (!pendingOrders?.length) return null;

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={
        pendingOrders.length > 0 && pendingOrders.length < 4 ? "item-1" : null
      }
    >
      <AccordionItem value="item-1" className="px-4">
        <AccordionTrigger className="pt-0 text-base sm:text-lg sm:font-semibold">
          Orders ({pendingOrders?.length})
        </AccordionTrigger>

        <AccordionContent>
          {pendingOrders?.map((order) => (
            <div
              onClick={() => navigate(`/mutual-funds/orders/${order.id}`)}
              key={order.id}
              className="flex justify-between border-b py-4"
            >
              <div className="max-w-[60%]">
                <h4 className="sm:text-md truncate sm:font-medium">
                  {order.fundName}
                </h4>
                <p className="text-muted-foreground mt-2 text-sm">
                  {OrderTypeConfig[order.orderType]}
                </p>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-[14px] font-medium tabular-nums sm:text-base">
                  {formatToINR(order.amount, 2)}
                </span>
                <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
                  <div className="bg-primary size-2 rounded-full"></div>
                  <span>In progress</span>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/orders"
            className="sm:text-md flex items-center justify-between gap-1 border-b py-4 text-sm font-medium sm:justify-start"
          >
            <span>All Orders</span>
            <ChevronRightIcon size={20} />
          </Link>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default PendingOrders;
