import { Button } from "@/components/ui/button";
import { VITE_DAILY_REWARD_AMOUNT } from "@/config/env";
import { useClaimDailyReward } from "@/hooks/useClaimDailyReward";
import { formatToINR } from "@/utils/formatters";
import { isToday } from "date-fns";
import { useEffect, useState } from "react";
import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "../ui/responsive-modal";

function DailyRewardModal() {
  const { mutate, isSuccess } = useClaimDailyReward();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Prevent api call if already claim daily reward today
  useEffect(() => {
    const lastRewardedAt = localStorage.getItem("lastRewardedAt");
    if (!isToday(new Date(lastRewardedAt))) {
      mutate();
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setDialogOpen(true);
    }
  }, [isSuccess]);

  const dailyRewardAmount = formatToINR(VITE_DAILY_REWARD_AMOUNT);

  return (
    <ResponsiveModal open={dialogOpen} onOpenChange={setDialogOpen}>
      <ResponsiveModalContent>
        <ResponsiveModalHeader className="items-center gap-2 tabular-nums">
          <div className="mx-auto">
            <img src="/piggy-bank.svg" className="size-50" />
          </div>
          <ResponsiveModalTitle className="text-center text-lg">
            {dailyRewardAmount} Added!
          </ResponsiveModalTitle>

          <ResponsiveModalDescription className="text-center text-sm whitespace-pre-line">
            {`Your daily reward of ${dailyRewardAmount} has been credited! 
            Visit every day to earn ${dailyRewardAmount} daily.`}
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>

        <ResponsiveModalFooter>
          <ResponsiveModalClose asChild>
            <Button size="lg" className="w-full">
              Close
            </Button>
          </ResponsiveModalClose>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export default DailyRewardModal;
