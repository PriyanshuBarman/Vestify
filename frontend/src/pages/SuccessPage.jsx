import { CheckIcon } from "lucide-react";
import { Link, Navigate, useLocation } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GoBackBar from "@/components/GoBackBar";

function SuccessPage() {
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return <Navigate to="/error" />;
  }

  return (
    <div className="flex h-dvh flex-col px-4 pb-4 sm:mx-auto sm:h-fit sm:max-w-lg">
      <GoBackBar showSearchIcon={false} className="px-0" />
      <div className="mt-20 flex flex-col items-center justify-center gap-8">
        <div className="bg-primary animate-in zoom-in ring-primary/50 w-fit rounded-full ring-6 duration-500">
          <CheckIcon className="text-background animate-in spin-in-90 zoom-in size-20 stroke-3 p-4 duration-500" />
        </div>

        <div>
          <h1 className="text-center text-xl font-medium">{data.title}</h1>
          <p className="text-muted-foreground mx-8 mt-2 text-center text-sm">
            {data?.description}
          </p>
        </div>

        {data.cardTitle && data.items && (
          <Card className="w-full pb-2">
            <CardContent className="text-sm">
              <CardHeader>
                <CardTitle className="text-center">{data.cardTitle} </CardTitle>
              </CardHeader>

              <div className="border-t space-y-6 mt-6 pt-6 ">
                {data.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {item.label}
                    </span>
                    <span className="font-medium capitalize ">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter className=" border-t pt-2! ">
              {data.orderDetailsLink && (
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="text-primary w-full"
                >
                  <Link to={data.orderDetailsLink} replace>
                    Order Details
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        )}
      </div>

      {data.notice && (
        <div className="bg-accent mt-auto rounded-2xl p-4 sm:mt-12">
          <p className="text-muted-foreground text-sm">{data.notice}</p>
        </div>
      )}
      <div className="mt-auto flex w-full flex-col items-center justify-end gap-4 sm:mt-16">
        <Button asChild size="lg" className="w-full">
          <Link to={data.doneLink} replace>
            Done
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default SuccessPage;
