import GoBackBar from "@/components/GoBackBar";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link } from "react-router";

function NoTransactions() {
  return (
    <div className="mx-auto sm:w-xl">
      <GoBackBar title="All Transactions" showSearchIcon={false} />

      <Empty className="mt-10 sm:mx-auto">
        <EmptyHeader>
          <EmptyMedia>
            <img
              src="/No data-cuate.svg"
              alt="No transactions found"
              className="size-80 sm:size-100"
            />
          </EmptyMedia>
          <EmptyTitle>No transactions found</EmptyTitle>
          <EmptyDescription>
            Start investing to see your recent transactions here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link to="/mutual-funds/all-funds">Start investing</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

export default NoTransactions;
