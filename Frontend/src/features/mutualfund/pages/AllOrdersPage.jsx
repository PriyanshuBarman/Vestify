import GoBackBar from "@/components/GoBackBar";
import { formatToINR } from "@/utils/formatters";
import { Link } from "react-router";
import { useGetAllOrders } from "../hooks/useGetAllOrders";

const orderTypeConfig = {
  ONE_TIME: "One-Time",
  SIP_INSTALLMENT: "SIP Installment",
  NEW_SIP: "New SIP",
  REDEEM: "Redeem",
};

const statusConfig = {
  PENDING: "In Progress",
  COMPLETED: "Success",
  FAILED: "Failed",
};

function AllOrdersPage() {
  const { data: orders } = useGetAllOrders();

  if (!orders) return <NoOrders />;

  return (
    <div className="sm:mx-auto sm:max-w-xl">
      <GoBackBar title="All Orders" showSearchIcon={false} />
      <div className="px-4">
        {orders?.map((order) => (
          <Link
            to={`/mutual-funds/order/${order.id}`}
            key={order.id}
            className="flex justify-between border-b py-4"
          >
            <div className="max-w-[60%]">
              <h4 className="sm:text-md truncate text-sm sm:font-medium">
                {order.fundName}
              </h4>
              <p className="text-muted-foreground mt-2 text-xs">
                {orderTypeConfig[order.orderType]}
              </p>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-sm font-medium tabular-nums sm:text-base">
                {formatToINR(order.amount, 2)}
              </span>
              <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
                <div className="bg-primary size-2 rounded-full"></div>
                <span>{statusConfig[order.status]}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default AllOrdersPage;

function NoOrders() {
  return (
    <div className="mx-auto sm:w-xl">
      <GoBackBar title="All Orders" className="fixed" />
      <div className="flex h-dvh flex-col items-center justify-center gap-2">
        <img
          src="/No data-rafiki.svg"
          alt="sip"
          className="size-60 md:size-96"
        />
        <h3 className="text-foreground-secondary font-medium sm:text-lg">
          No Orders Found
        </h3>
        <p className="text-xs sm:text-sm">
          Start exploring funds to find the one that suits you best.
        </p>
      </div>
    </div>
  );
}
