import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";
import { useGetPendingOrders } from "../hooks/useGetPendingOrders";
import OrderItem from "./OrderItem";

function PendingOrders() {
  const { data: pendingOrders } = useGetPendingOrders();
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
              className="px-0"
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
