import LoadingState from "@/components/LoadingState";
import { ItemGroup } from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import OrderItem from "@/features/mutual-fund/components/OrderItem";
import { useGetOrders } from "@/features/mutual-fund/hooks/useGetOrders";
import { lazy } from "react";

const NoOrders = lazy(
  () => import("@/features/mutual-fund/components/empty-states/NoOrders"),
);

function OrdersTab({ username }) {
  const { data: orders, isPending } = useGetOrders(username);

  if (isPending) return <LoadingState />;
  if (!orders?.length) return <NoOrders />;

  return (
    <ScrollArea>
      <div className="pb-20">
        <ItemGroup>
          {orders?.map((order, index) => (
            <OrderItem
              key={order.id}
              order={order}
              username={username}
              isOtherUserProfile={!!username}
              index={index}
              length={orders.length}
            />
          ))}
        </ItemGroup>
      </div>
    </ScrollArea>
  );
}

export default OrdersTab;
