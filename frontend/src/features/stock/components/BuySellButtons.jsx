import { useNavigate } from "react-router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function BuySellButtons({ symbol, isPending = false, className }) {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "bg-background gap-2 sticky bottom-0 flex flex-col w-full border-t p-4",
        className,
      )}
    >
      <div className="flex gap-4 w-full justify-evenly">
        <Button
          size="lg"
          variant="secondary"
          disabled={isPending || !symbol}
          onClick={() =>
            navigate("/stocks/sip", {
              state: { symbol },
            })
          }
        >
          SIP
        </Button>
        <Button
          size="lg"
          variant="destructive"
          disabled={isPending || !symbol}
          onClick={() =>
            navigate("/stocks/buysell", {
              state: { symbol, action: "SELL" },
            })
          }
          className="flex-1 bg-destructive/75 dark:bg-destructive "
        >
          Sell
        </Button>

        <Button
          size="lg"
          disabled={isPending || !symbol}
          onClick={() =>
            navigate("/stocks/buysell", {
              state: { symbol, action: "BUY" },
            })
          }
          className="flex-1 dark:text-foreground"
        >
          Buy
        </Button>
      </div>
    </div>
  );
}

export default BuySellButtons;
