import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import GoBackBar from "@/components/GoBackBar";

const CONFIG = {
  "mutual-fund": {
    titleSelf: "No orders found",
    titleOther: "User has no orders",
    link: "/mutual-funds/all-funds",
    buttonText: "Explore Funds",
  },
  stock: {
    titleSelf: "You have no open orders",
    titleOther: "User has no orders",
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
              src="/empty-folder.svg"
              alt="No orders found"
              className="size-60 sm:size-90"
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
        {!isOtherUserProfile && showAllOrdersButton && (
          <Button asChild variant="ghost" className="text-primary ">
            <Link to="/orders">All orders</Link>
          </Button>
        )}
      </Empty>
    </div>
  );
}

export default NoOrders;
