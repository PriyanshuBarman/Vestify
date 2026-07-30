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
    title: "No orders found",
    descSelf: "Start exploring funds to find the one that suits you best.",
    descOther: "User has no orders.",
    link: "/mutual-funds/all-funds",
    buttonText: "Explore Funds",
  },
  stock: {
    title: "You have no open orders",
    descSelf: "",
    descOther: "User has no orders.",
    link: "/stocks#explore",
    buttonText: "Explore Stocks",
  },
};

function NoOrders({
  type = "mutual-fund",
  isOtherUserProfile,
  showGoBackBar = false,
  showAllOrdersButton = false,
}) {
  const content = CONFIG[type] || CONFIG["mutual-fund"];

  return (
    <div className="sm:mx-auto sm:max-w-xl">
      {showGoBackBar && !isOtherUserProfile && (
        <GoBackBar title="All Orders" showSearchIcon={false} />
      )}
      <Empty className={showGoBackBar ? "mt-20" : ""}>
        <EmptyHeader>
          <EmptyMedia>
            <img
              src="/no-data-rafiki.svg"
              alt="No orders found"
              className="size-50 sm:size-70"
            />
          </EmptyMedia>
          <EmptyTitle>{content.title}</EmptyTitle>
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
        {showAllOrdersButton && (
          <Button asChild variant="ghost" className="text-primary ">
            <Link to="/orders">All orders</Link>
          </Button>
        )}
      </Empty>
    </div>
  );
}

export default NoOrders;
