import { useNavigate } from "react-router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function BuySellButtons({ symbol, isPending = false, className }) {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "bg-background gap-4  sticky bottom-0 flex w-full justify-evenly border-t p-4",
        className,
      )}
    >
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
  );
}

export default BuySellButtons;
