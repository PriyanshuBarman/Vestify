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
import { tz } from "@date-fns/tz";
import { addMonths, differenceInDays, format } from "date-fns";
import { SkipForwardIcon } from "lucide-react";
import { useSkipSip } from "../../hooks/useSkipSip";
import IconWrapper from "@/components/IconWrapper";

function SkipSipButton({ sipId, nextInstallmentDate }) {
  const { mutate: skipSip, isPending } = useSkipSip();

  if (!sipId || !nextInstallmentDate) {
    return null;
  }
  const handleSkipSip = () => {
    skipSip({ sipId });
  };

  const getNextInstallmentDate = () => {
    const diff = differenceInDays(nextInstallmentDate, new Date(), {
      in: tz("Asia/Kolkata"),
    });

    const newNextInstallmentDate = addMonths(
      nextInstallmentDate,
      diff > 2 ? 1 : 2,
    );

    return format(newNextInstallmentDate, "dd MMM yy");
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

        <ResponsiveModalTitle className="text-center">
          Are you sure you want to skip{" "}
          {format(nextInstallmentDate, "dd MMM yy")} installment?
        </ResponsiveModalTitle>

        <ResponsiveModalDescription className="bg-accent mx-4 my-2 rounded-lg p-4 text-center text-sm">
          Your next due date will be {getNextInstallmentDate()}
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
