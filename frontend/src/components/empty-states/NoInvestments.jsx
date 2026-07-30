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
    titleSelf: "You haven't invested yet.",
    titleOther: "No investments yet",
    descSelf: "Start investing in a fund to see your portfolio grow here.",
    descOther: "This user has no investments.",
    link: "/mutual-funds/all-funds",
    buttonText: "Start Investing",
  },
  stock: {
    titleSelf: "You haven't invested in stocks yet.",
    titleOther: "No stock holdings yet",
    descSelf: "Start investing in stocks to build your portfolio here.",
    descOther: "This user has no stock holdings.",
    link: "/stocks",
    buttonText: "Explore Stocks",
  },
};

function NoInvestments({ type = "mutual-fund", isOtherUserProfile }) {
  const content = CONFIG[type] || CONFIG["mutual-fund"];

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
          {isOtherUserProfile ? content.titleOther : content.titleSelf}
        </EmptyTitle>
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

export default NoInvestments;
