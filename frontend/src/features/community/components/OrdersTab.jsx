import { lazy } from "react";

import { ItemGroup } from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import LoadingState from "@/components/LoadingState";
import MfOrderItem from "@/components/MfOrderItem";
import { useGetOrders } from "@/features/mutual-fund/hooks/useGetOrders";

const NoOrders = lazy(() => import("@/components/empty-states/NoOrders"));

function OrdersTab({ username }) {
  const { data: orders, isPending } = useGetOrders(username);
  const isOtherUserProfile = Boolean(username);

  if (isPending) return <LoadingState />;
  if (!orders?.length)
    return <NoOrders isOtherUserProfile={isOtherUserProfile} />;

  return (
    <ScrollArea>
      <div className="pb-20">
        <ItemGroup>
          {orders?.map((order, index) => (
            <MfOrderItem
              key={order.id}
              order={order}
              username={username}
              isOtherUserProfile={isOtherUserProfile}
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
