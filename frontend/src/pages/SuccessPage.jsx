import GoBackBar from "@/components/GoBackBar";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ArrowUpRightIcon,
  CheckIcon,
  MoveUpRightIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router";

function SuccessPage() {
  const location = useLocation();
  const {
    title,
    description,
    orderDetailsRoute,
    doneRoute,
    notice,
    icon = "check",
  } = location.state;

  return (
    <div className="flex h-dvh flex-col px-4 pb-4 sm:mx-auto sm:h-fit sm:max-w-lg">
      <GoBackBar className="px-0" showSearchIcon={false} />
      <div className="mt-20 flex flex-col items-center justify-center gap-8">
        <div className="bg-primary animate-in zoom-in ring-primary/50 w-fit rounded-full ring-6 duration-500 will-change-transform">
          {icon === "check" && (
            <CheckIcon className="text-background animate-in spin-in-90 zoom-in size-20 stroke-3 p-4 duration-500" />
          )}
          {icon === "arrow" && (
            <MoveUpRightIcon className="text-background animate-in spin-in-90 zoom-in size-20 stroke-3 p-5 duration-500" />
          )}
        </div>

        <div>
          <h2 className="text-center text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground mx-8 mt-2 text-center text-sm">
            {description}
          </p>
        </div>
      </div>

      {notice && (
        <div className="bg-accent mt-auto rounded-2xl p-4 sm:mt-12">
          <p className="text-muted-foreground text-sm">{notice}</p>
        </div>
      )}

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

export default SuccessPage;
