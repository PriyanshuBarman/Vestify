import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const CONFIG = {
  "mutual-fund": {
    descSelf: "Add funds to your watchlist to see them here.",
    descOther: "User has not added any funds to their watchlist.",
    link: "/mutual-funds/all-funds",
    buttonText: "Add Funds",
  },
  stock: {
    descSelf: "Add stocks to your watchlist to see them here.",
    descOther: "User has not added any stocks to their watchlist.",
    link: "/stocks#explore",
    buttonText: "Explore Stocks",
  },
};

function NoWatchlist({ type = "mutual-fund", isOtherUserProfile }) {
  const content = CONFIG[type] || CONFIG["mutual-fund"];

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <img
            src="/empty-folder2.svg"
            alt="No Watchlist"
            loading="lazy"
            draggable="false"
            className="size-60 sm:size-90"
          />
        </EmptyMedia>
        <EmptyTitle>Watchlist is empty</EmptyTitle>
        <EmptyDescription>
          {isOtherUserProfile ? content.descOther : content.descSelf}
        </EmptyDescription>
      </EmptyHeader>
      {!isOtherUserProfile && type !== "stock" && (
        <EmptyContent>
          <Button asChild className="rounded-full text-xs font-normal">
            <Link to={content.link}>{content.buttonText}</Link>
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}

export default NoWatchlist;
