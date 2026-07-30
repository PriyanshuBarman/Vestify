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
import GoBackBar from "@/components/GoBackBar";

const CONFIG = {
  "mutual-fund": {
    desc: "Start investing to see your recent transactions here.",
    link: "/mutual-funds/all-funds",
    buttonText: "Start investing",
  },
  stock: {
    desc: "Start investing in stocks to see your recent transactions here.",
    link: "/stocks#explore",
    buttonText: "Explore Stocks",
  },
};

function NoTransactions({ type = "mutual-fund" }) {
  const content = CONFIG[type] || CONFIG["mutual-fund"];

  return (
    <div className="mx-auto sm:w-xl">
      <GoBackBar title="All Transactions" showSearchIcon={false} />

      <Empty className="mt-10 sm:mx-auto">
        <EmptyHeader>
          <EmptyMedia>
            <img
              src="/empty-folder2.svg"
              alt="No transactions found"
              loading="lazy"
              draggable="false"
              className="size-80 sm:size-100"
            />
          </EmptyMedia>
          <EmptyTitle>No transactions found</EmptyTitle>
          <EmptyDescription>{content.desc}</EmptyDescription>
        </EmptyHeader>
        {type !== "stock" && (
          <EmptyContent>
            <Button asChild>
              <Link to={content.link}>{content.buttonText}</Link>
            </Button>
          </EmptyContent>
        )}
      </Empty>
    </div>
  );
}

export default NoTransactions;
