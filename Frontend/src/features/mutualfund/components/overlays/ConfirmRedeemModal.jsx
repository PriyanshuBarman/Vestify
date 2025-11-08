import { Badge } from "@/components/ui/badge";
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
import { InfoIcon } from "lucide-react";
import { getNavAndProcessDateForRedemption } from "../../utils/getNavAndProcessDate";
import { formatDate } from "date-fns";

function ConfirmRedeemModal({
  amount,
  units,
  isOpen,
  onOpenChange,
  onConfirm,
}) {
  const { processDate, navDate } = getNavAndProcessDateForRedemption();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={onOpenChange}>
      <ResponsiveModalContent className="gap-4">
        <ResponsiveModalHeader className="items-start gap-2">
          <ResponsiveModalTitle className="text-muted-foreground text-sm font-normal">
            Amount you get
          </ResponsiveModalTitle>
          <h2 className="flex items-center gap-2 text-3xl font-semibold">
            {formatToINR(amount)}
            {units && <Badge variant="secondary">Approx</Badge>}
          </h2>
          <ResponsiveModalDescription className="text-start">
            The amount you get will depend on the NAV of{" "}
            {formatDate(navDate, "dd MMM")}
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>

        <Card className="mx-2">
          <CardContent className="space-y-6 px-4 text-sm">
            <div className="flex items-center justify-between">
              <span>Redeem Wallet</span>
              <span className="font-medium">Vestify Wallet</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                Applicable NAV date
                <InfoIcon
                  className={`hover:text-foreground size-4 transition-colors`}
                />
              </span>
              <span className="font-medium">
                {formatDate(navDate, "dd MMM")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                Process Date
                <InfoIcon
                  className={`hover:text-foreground size-4 transition-colors`}
                />
              </span>
              <span className="font-medium">
                {formatDate(processDate, "dd MMM")}
              </span>
            </div>
            {units && (
              <div className="flex items-center justify-between">
                <span>No of units.</span>
                <span className="font-medium">{units.toFixed(3)}</span>
              </div>
            )}
            {/* <div className="flex items-center justify-between">
              <span>Exit load (approx)</span>
              <span className="font-medium">{formatToINR(10)}</span>
            </div> */}
          </CardContent>
        </Card>

        <ResponsiveModalFooter>
          <ResponsiveModalClose asChild>
            <Button onClick={onConfirm} size="lg" className="w-full">
              Confirm Redeem
            </Button>
          </ResponsiveModalClose>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export default ConfirmRedeemModal;
