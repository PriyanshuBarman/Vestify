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

function NoInvestments() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <img
            src="/StartInvesting.svg"
            alt="Start Investing"
            className="size-50 sm:size-70"
          />
        </EmptyMedia>
        <EmptyTitle>You haven't invested yet.</EmptyTitle>
        <EmptyDescription>
          Start investing in a fund to see your portfolio grow here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link to="/mutual-funds/all-funds">Start Investing</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}

export default NoInvestments;
