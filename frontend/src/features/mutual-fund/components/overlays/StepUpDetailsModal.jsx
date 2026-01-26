import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-modal";
import { formatToINR } from "@/utils/formatters";
import { formatDate } from "date-fns";
import { useNavigate } from "react-router";

function StepUpDetailsModal({
  isOpen,
  onOpenChange,
  onConfirm,
  isPending,
  sipDetail,
  isOtherUserProfile,
}) {
  const navigate = useNavigate();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={onOpenChange}>
      <ResponsiveModalContent className="gap-4">
        <ResponsiveModalHeader className="items-start gap-2">
          <ResponsiveModalTitle>Step-up details</ResponsiveModalTitle>
        </ResponsiveModalHeader>

        <Card className="mx-2">
          <CardContent className="space-y-6 px-4 text-sm">
            <Row label="SIP increases by">
              {sipDetail.stepUpAmount
                ? formatToINR(sipDetail.stepUpAmount)
                : sipDetail.stepUpPercentage + "%"}
            </Row>
            <Row label="After every">
              {sipDetail.stepUpIntervalInMonths} months
            </Row>
            <Row label="Upcoming step-up">
              {formatDate(sipDetail.nextStepUpDate, "MMM yy")}
            </Row>
          </CardContent>
        </Card>

        <ResponsiveModalFooter>
          <ResponsiveModalClose asChild>
            <div className="flex gap-2 sm:mt-4">
              <Button
                size="lg"
                disabled={isPending || isOtherUserProfile}
                variant="outline"
                onClick={() => onConfirm({ sipId: sipDetail.id })}
                className="flex-1"
              >
                Remove Step-up
              </Button>
              <Button
                size="lg"
                disabled={isPending || isOtherUserProfile}
                className="flex-1"
                onClick={() =>
                  navigate("/mutual-funds/step-up", { state: sipDetail })
                }
              >
                Edit details
              </Button>
            </div>
          </ResponsiveModalClose>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className="font-medium">{children}</span>
    </div>
  );
}

export default StepUpDetailsModal;
