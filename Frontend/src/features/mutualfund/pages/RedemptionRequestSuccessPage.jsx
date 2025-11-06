import GoBackBar from "@/components/GoBackBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatToINR } from "@/utils/formatters";
import { formatDate } from "date-fns";
import { CheckIcon } from "lucide-react";
import { Link, useLocation } from "react-router";

function RedemptionRequestSuccessPage() {
  const location = useLocation();
  const order = location.state;

  return (
    <div className="flex h-dvh flex-col px-4 pb-4 sm:mx-auto sm:h-fit sm:max-w-lg">
      <GoBackBar showSearchIcon={false} className="px-0" />
      <div className="mt-20 flex flex-col items-center justify-center gap-8">
        <div className="bg-primary animate-in zoom-in ring-primary/50 w-fit rounded-full ring-6 duration-500">
          <CheckIcon className="text-background animate-in spin-in-90 zoom-in size-20 stroke-3 p-4 duration-500" />
        </div>

        <div>
          <h2 className="text-center text-xl font-medium">
            Redeem Order Placed
          </h2>
        </div>
        <Card className="w-full">
          <CardContent className="space-y-6 px-8 text-sm">
            <CardHeader>
              <CardTitle className="text-center">{order.fundName} </CardTitle>
            </CardHeader>
            <div className="flex items-center justify-between">
              <span>Amount (Approx) </span>
              <span className="font-medium">{formatToINR(order.amount)}</span>
            </div>
            {order.units && (
              <div className="flex items-center justify-between">
                <span>Units redeemed </span>
                <span className="font-medium">{order.units}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                Applicable NAV date
              </span>
              <span className="font-medium">
                {formatDate(order.navDate, "dd MMM yy")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                Expected completion by
              </span>
              <span className="font-medium">
                {formatDate(order.processDate, "dd MMM yy")}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-auto flex w-full flex-col items-center justify-end gap-4 sm:mt-16">
        <Button asChild size="lg" className="w-full">
          <Link to="/mutual-funds#investments" replace>
            Done
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="ghost"
          className="text-primary w-full"
        >
          <Link to={`/mutual-funds/orders/${order.id}`} replace>
            Order Details
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default RedemptionRequestSuccessPage;
