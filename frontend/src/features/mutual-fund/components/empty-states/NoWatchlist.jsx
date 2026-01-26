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

function NoWatchlist({ readOnly }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <img
            src="/empty-folder.svg"
            alt="No Watchlist"
            className="size-60 sm:size-90"
          />
        </EmptyMedia>
        <EmptyTitle>Watchlist is empty</EmptyTitle>
        <EmptyDescription>
          {readOnly
            ? "This user hasn't added any funds to their watchlist yet."
            : "Add funds to your watchlist to see them here."}
        </EmptyDescription>
      </EmptyHeader>
      {!readOnly && (
        <EmptyContent>
          <Button asChild className="rounded-full text-xs font-normal">
            <Link to="/mutual-funds/all-funds">Add Funds</Link>
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}

export default NoWatchlist;
