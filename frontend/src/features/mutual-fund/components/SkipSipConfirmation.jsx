import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { X } from "lucide-react";

export function SkipSipConfirmation({
  isOpen,
  onClose,
  onConfirm,
  isPending,
  sipDetails,
  nextInstallmentDate,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50">
      <div className="animate-in slide-in-from-bottom-8 w-full rounded-t-3xl bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Skip this month's SIP?</h2>
          <button onClick={onClose} className="text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-gray-500">SIP Amount</span>
              <span className="font-medium">
                ₹{sipDetails.amount?.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Next Installment</span>
              <span className="font-medium">
                {format(new Date(nextInstallmentDate), "d MMM yyyy")}
              </span>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600">
            You can resume your SIP anytime from the SIPs section.
          </p>

          <Button
            variant="destructive"
            size="lg"
            className="w-full py-6 text-base font-medium"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? "Processing..." : "Skip SIP"}
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full py-6 text-base font-medium"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
