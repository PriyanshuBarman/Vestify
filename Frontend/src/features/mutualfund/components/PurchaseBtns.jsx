import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";
import { useGetFundData } from "../hooks/useGetFundData";

function PurchaseBtns({ schemeCode, isPending = false, className }) {
  const navigate = useNavigate();
  const { data: fund = {} } = useGetFundData(schemeCode);

  return (
    <div
      className={cn(
        "bg-background sticky bottom-0 flex w-full justify-evenly py-4",
        className,
      )}
    >
      <Button
        className="text-primary bg-primary/15 w-[42%] shadow-xs"
        size="lg"
        variant="ghost"
        disabled={isPending || fund.lump_available === "N"}
        onClick={() =>
          navigate("/mutual-funds/invest", {
            state: { orderType: "oneTime", schemeCode },
          })
        }
      >
        One-time
      </Button>

      <Button
        size="lg"
        disabled={isPending || fund.sip_available === "N"}
        onClick={() =>
          navigate(`/mutual-funds/invest`, {
            state: { orderType: "sip", schemeCode },
          })
        }
        className="w-[42%]"
      >
        Monthly SIP
      </Button>
    </div>
  );
}

export default PurchaseBtns;
