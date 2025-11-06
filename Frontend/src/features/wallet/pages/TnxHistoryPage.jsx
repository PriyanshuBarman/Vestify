import GoBackBar from "@/components/GoBackBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatToINR } from "@/utils/formatters";
import { formatDate } from "date-fns";
import { Fragment, lazy } from "react";
import { useGetAllTnx } from "../hooks/useGetAllTnx";
import { assetConfig } from "../utils/constants";
import TransactionItem from "../components/TransactionItem";
import { ItemSeparator } from "@/components/ui/item";
const NoTransactions = lazy(
  () => import("../components/empty-states/NoTransactions"),
);

function TnxHistoryPage() {
  const { data } = useGetAllTnx();

  if (!data?.length) return <NoTransactions />;

  return (
    <div className="mx-auto sm:w-xl">
      <GoBackBar title="All Transactions" showSearchIcon={false} />
      <ul className="space-y-2">
        {data?.map((monthGroup) => (
          <li key={monthGroup.month}>
            {/* Month Header */}
            <div className="bg-accent/50 flex justify-between px-4 py-4 text-sm font-medium">
              <span>{monthGroup.month}</span>
              <span>
                <span className="mr-0.5">
                  {monthGroup.summary > 0 ? "+" : "-"}
                </span>
                {formatToINR(monthGroup.summary)}
              </span>
            </div>

            {/* Transactions */}
            <ul className="px-4">
              {monthGroup.transactions.map((tnx, index, array) => (
                <Fragment key={tnx.id}>
                  <TransactionItem tnx={tnx} />
                  {index !== array.length - 1 && <ItemSeparator />}
                </Fragment>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TnxHistoryPage;
