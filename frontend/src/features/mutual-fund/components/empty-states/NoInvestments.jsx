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

function NoInvestments({ readOnly }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <img
            src="/start.svg"
            alt="No Investments"
            className="size-50 sm:size-70"
          />
        </EmptyMedia>
        <EmptyTitle>
          {readOnly ? "No investments yet" : "You haven't invested yet."}
        </EmptyTitle>
        <EmptyDescription>
          {readOnly
            ? "This user has no active investments in mutual funds."
            : "Start investing in a fund to see your portfolio grow here."}
        </EmptyDescription>
      </EmptyHeader>
      {!readOnly && (
        <EmptyContent>
          <Button asChild className="rounded-full text-xs font-normal">
            <Link to="/mutual-funds/all-funds">Start Investing</Link>
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}

export default NoInvestments;
