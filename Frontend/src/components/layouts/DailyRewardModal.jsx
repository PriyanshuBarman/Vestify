import { Button } from "@/components/ui/button";
import { useClaimDailyReward } from "@/hooks/useClaimDailyReward";
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

  return (
    <ResponsiveModal open={dialogOpen} onOpenChange={setDialogOpen}>
      <ResponsiveModalContent>
        <ResponsiveModalHeader className="items-center gap-2 tabular-nums">
          <div className="mx-auto">
            <img src="/Piggy bank-amico.svg" className="size-50" />
          </div>
          <ResponsiveModalTitle className="text-center text-lg">
            ₹1000 Added!
          </ResponsiveModalTitle>

          <ResponsiveModalDescription className="text-center text-sm whitespace-pre-line">
            {`Your daily reward of ₹1000 has been credited! 
            Visit every day to earn ₹1000 daily.`}
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
