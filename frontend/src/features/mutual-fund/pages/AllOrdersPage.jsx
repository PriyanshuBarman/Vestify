import { lazy } from "react";

import { ItemGroup } from "@/components/ui/item";
import GoBackBar from "@/components/GoBackBar";
import LoadingState from "@/components/LoadingState";

import OrderItem from "../components/OrderItem";
import { useGetOrders } from "../hooks/useGetOrders";

const NoOrders = lazy(() => import("../components/empty-states/NoOrders"));

function AllOrdersPage() {
  const { data: orders, isPending } = useGetOrders();

  if (isPending) return <LoadingState fullPage />;
  if (!orders?.length) return <NoOrders />;

  return (
    <div className="sm:mx-auto sm:max-w-xl">
      <GoBackBar title="All Orders" showSearchIcon={false} />
      <ItemGroup>
        {orders?.map((order, index) => (
          <OrderItem
            key={order.id}
            order={order}
            index={index}
            length={orders.length}
          />
        ))}
      </ItemGroup>
    </div>
  );
}
export default AllOrdersPage;
