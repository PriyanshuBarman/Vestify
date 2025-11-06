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
import OrderItem from "./OrderItem";

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
        <AccordionTrigger className="pt-0 text-base sm:text-lg">
          Orders ({pendingOrders?.length})
        </AccordionTrigger>

        <AccordionContent>
          {pendingOrders?.map((order, index) => (
            <OrderItem
              key={order.id}
              order={order}
              index={index}
              length={pendingOrders.length}
            />
          ))}

          <Link
            to="/orders"
            className="sm:text-md flex items-center justify-between gap-1 border-y py-4 text-sm font-medium sm:justify-start"
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
