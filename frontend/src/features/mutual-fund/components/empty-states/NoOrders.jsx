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
import GoBackBar from "@/components/GoBackBar";

function NoOrders() {
  return (
    <div className="sm:mx-auto sm:max-w-xl">
      <GoBackBar title="All Orders" showSearchIcon={false} />
      <Empty className="mt-20">
        <EmptyHeader>
          <EmptyMedia>
            <img
              src="/no-data-rafiki.svg"
              alt="No orders found"
              className="size-50 sm:size-70"
            />
          </EmptyMedia>
          <EmptyTitle>No orders found</EmptyTitle>
          <EmptyDescription>
            Start exploring funds to find the one that suits you best.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild className="rounded-full">
            <Link to="/mutual-funds/all-funds">Explore Funds</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
export default NoOrders;
