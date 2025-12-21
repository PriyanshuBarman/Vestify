import IconWrapper from "@/components/IconWrapper";
import { Button } from "@/components/ui/button";
import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-modal";
import { Spinner } from "@/components/ui/spinner";
import { differenceInCalendarDays, format } from "date-fns";
import { SkipForwardIcon } from "lucide-react";
import { useSkipSip } from "../../hooks/useSkipSip";
import { getNextInstallmentDateAfterSkip } from "../../utils/sip";
import { tz } from "@date-fns/tz";

function SkipSipButton({ sipId, nextInstallmentDate }) {
  const { mutate: skipSip, isPending } = useSkipSip();

  if (!sipId || !nextInstallmentDate) {
    return null;
  }
  const diff = differenceInCalendarDays(nextInstallmentDate, new Date(), {
    in: tz("Asia/Kolkata"),
  });

  const handleSkipSip = () => {
    skipSip({ sipId, diff });
  };

  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>
        <Button variant="ghost" disabled={isPending}>
          <span className="border-foreground flex items-center gap-2 border-b border-dashed">
            {isPending && <Spinner className="text-primary" />} Skip SIP
          </span>
        </Button>
      </ResponsiveModalTrigger>

      <ResponsiveModalContent>
        <ResponsiveModalHeader className="items-center">
          <IconWrapper>
            <SkipForwardIcon className="sm:size-8" />
          </IconWrapper>
        </ResponsiveModalHeader>

        <ResponsiveModalTitle className="pb-2 text-center font-medium">
          Are you sure you want to skip{" "}
          {format(nextInstallmentDate, "dd MMM yy")} installment?
        </ResponsiveModalTitle>

        {diff <= 2 && (
          <ResponsiveModalDescription className="bg-accent mx-4 my-2 rounded-lg p-4 text-center text-sm">
            Your next SIP installment is within the next 2 days, so it can’t be
            skipped. The following installment will be skipped instead.
          </ResponsiveModalDescription>
        )}
        <ResponsiveModalDescription className="bg-accent mx-4 my-2 rounded-lg p-4 text-center text-sm">
          Your next due date will be{" "}
          {getNextInstallmentDateAfterSkip(nextInstallmentDate, diff)}
        </ResponsiveModalDescription>

        <ResponsiveModalFooter>
          <ResponsiveModalClose asChild>
            <Button
              size="lg"
              onClick={handleSkipSip}
              disabled={isPending}
              className="w-full"
            >
              {isPending && <Spinner />} Yes, Skip SIP
            </Button>
          </ResponsiveModalClose>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export default SkipSipButton;
