import GoBackBar from "@/components/GoBackBar";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { Link, useLocation } from "react-router";

function PaymentSuccessPage() {
  const location = useLocation();
  const { title, description, orderDetailsRoute, doneRoute } = location.state;

  return (
    <div className="flex h-dvh flex-col px-4 pb-4 sm:mx-auto sm:h-fit sm:max-w-lg">
      <GoBackBar className="px-0" />
      <div className="mt-20 flex flex-col items-center justify-center gap-8">
        <div className="bg-primary animate-in zoom-in ring-primary/50 w-fit rounded-full ring-6 duration-500">
          <CheckIcon className="text-background animate-in spin-in-90 zoom-in size-20 stroke-3 p-4 duration-500" />
        </div>

        <div>
          <h2 className="text-center text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground mx-8 mt-2 text-center text-sm">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-auto flex w-full flex-col items-center justify-end gap-4 sm:mt-16">
        <Button asChild size="lg" className="w-full">
          <Link to={doneRoute || "/"} replace>
            Done
          </Link>
        </Button>
        {orderDetailsRoute && (
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="text-primary w-full"
          >
            <Link to={orderDetailsRoute} replace>
              Order Details
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
