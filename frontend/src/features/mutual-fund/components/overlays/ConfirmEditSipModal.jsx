import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-modal";
import { formatToINR } from "@/utils/formatters";
import { tz } from "@date-fns/tz";
import { differenceInCalendarDays, formatDate } from "date-fns";
import { getNextInstallmentDateAfterEdit } from "../../utils/sip";

function ConfirmEditSipModal({
  isOpen,
  onOpenChange,
  onConfirm,
  sipDetail,
  amount,
  selectedDate,
}) {
  const newNextInstallmentDate = selectedDate
    ? getNextInstallmentDateAfterEdit(
        selectedDate,
        sipDetail.nextInstallmentDate,
      )
    : sipDetail.nextInstallmentDate;

  const diffDays = differenceInCalendarDays(sipDetail.nextInstallmentDate, new Date(), {
    in: tz("Asia/Kolkata"),
  });

  return (
    <ResponsiveModal open={isOpen} onOpenChange={onOpenChange}>
      <ResponsiveModalContent className="gap-4">
        <ResponsiveModalHeader className="items-start gap-2">
          <ResponsiveModalTitle>
            Confirm new amount and date
          </ResponsiveModalTitle>

          {diffDays <= 2 && (
            <ResponsiveModalDescription className="bg-accent rounded-2xl p-4 text-start">
              Changes will apply from the 2nd next installment, Your next SIP
              installment on{" "}
              {formatDate(sipDetail.nextInstallmentDate, "dd MMM yyyy")} will
              remain unchanged, as it is within the next 2 days.
            </ResponsiveModalDescription>
          )}
        </ResponsiveModalHeader>

        <Card className="mx-2">
          <CardContent className="space-y-6 px-4 text-sm">
            <div className="flex items-center justify-between">
              <span>SIP amount</span>
              <span className="font-medium">
                {formatToINR(amount || sipDetail.amount)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>New SIP date</span>
              <span className="font-medium">
                {formatDate(newNextInstallmentDate, "dd MMM yyyy")}
              </span>
            </div>
          </CardContent>
        </Card>

        <ResponsiveModalFooter>
          <ResponsiveModalClose asChild>
            <Button onClick={onConfirm} size="lg" className="w-full">
              Confirm
            </Button>
          </ResponsiveModalClose>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export default ConfirmEditSipModal;
