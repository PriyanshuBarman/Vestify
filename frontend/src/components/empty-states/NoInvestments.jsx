import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const CONFIG = {
  "mutual-fund": {
    titleSelf: "No investments.",
    titleOther: "User has no investments",
    descSelf: "Start investing in a fund to see your portfolio grow here.",
    link: "/mutual-funds/all-funds",
    buttonText: "Start Investing",
  },
  stock: {
    titleSelf: "You have no holdings",
    titleOther: "User has no holdings",
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
