import GoBackBar from "@/components/GoBackBar";
import { formatToINR } from "@/utils/formatters";
import { lazy } from "react";
import TransactionItem from "../components/TransactionItem";
import { useGetAllTnx } from "../hooks/useGetAllTnx";
import { ItemGroup } from "@/components/ui/item";
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

            <ItemGroup className="px-4">
              {monthGroup.transactions.map((tnx, index) => (
                <TransactionItem
                  key={tnx.id}
                  tnx={tnx}
                  length={monthGroup.transactions.length}
                />
              ))}
            </ItemGroup>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TnxHistoryPage;
