import { Button } from "@/components/ui/button";
import {
  ResponsiveModal,
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
import { useState } from "react";
import { useSkipSip } from "../../hooks/useSkipSip";

function SkipSipButton({ sipId, nextInstallmentDate }) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: skipSip, isPending } = useSkipSip();

  if (!sipId || !nextInstallmentDate) {
    return null;
  }
  const handleSkipSip = () => {
    skipSip({ sipId });
    setIsOpen(false);
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
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <ResponsiveModalTrigger asChild>
        <Button variant="ghost" disabled={isPending}>
          <span className="border-foreground border-b border-dashed">Skip</span>
        </Button>
      </ResponsiveModalTrigger>

      <ResponsiveModalContent className="gap-4">
        <ResponsiveModalHeader className="items-center">
          <SkipForwardIcon className="text-primary size-12" />
        </ResponsiveModalHeader>

        <ResponsiveModalTitle className="text-center text-lg font-medium">
          Are you sure you want to skip{" "}
          {format(nextInstallmentDate, "dd MMM yy")} installment?
        </ResponsiveModalTitle>

        <ResponsiveModalDescription className="bg-accent mx-4 rounded-lg p-4 text-center text-sm">
          Your next due date will be {getNextInstallmentDate()}
        </ResponsiveModalDescription>

        <ResponsiveModalFooter>
          <Button
            size="lg"
            onClick={handleSkipSip}
            disabled={isPending}
            className="w-full"
          >
            {isPending && <Spinner />} Skip SIP
          </Button>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export default SkipSipButton;
