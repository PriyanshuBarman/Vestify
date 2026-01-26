import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { useGetSips } from "../hooks/useGetSips";

function StartSipCard() {
  const navigate = useNavigate();
  const { data: sips } = useGetSips();

  if (sips) return null;

  return (
    <Card className="text-foreground relative mx-auto w-[90%] min-w-xs flex-row items-center overflow-hidden rounded-3xl p-4 sm:w-full sm:px-6 sm:py-8">
      <div className="w-[70%] space-y-4">
        <CardTitle>
          <p className="text-sm font-medium sm:text-base">
            Invest every month and grow your wealth with SIP
          </p>
        </CardTitle>

        <Button
          size="sm"
          onClick={() =>
            navigate("/mutual-funds/collections", {
              state: {
                label: "Pick a fund",
                filters: { limit: 20, fund_type: "Equity" },
                description:
                  "Funds that invest in india's top and trustworthy companies",
              },
            })
          }
          className="text-xs font-normal"
        >
          Start SIP
        </Button>
      </div>

      <img
        src="sip.svg"
        alt="start sip"
        className="absolute right-0 size-46 sm:size-58 dark:mix-blend-hard-light"
      />
    </Card>
  );
}

export default StartSipCard;
