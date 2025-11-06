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
import { MessageCircleXIcon } from "lucide-react";
import { useState } from "react";
import { useDeleteSip } from "../../hooks/useDeleteSip";

function CancelSipButton({ sipId }) {
  const { mutate: cancelSip, isPending } = useDeleteSip();
  const [isOpen, setIsOpen] = useState(false);

  const handleCancelSip = () => {
    cancelSip({ sipId });
    setIsOpen(false);
  };

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <ResponsiveModalTrigger asChild>
        <Button variant="ghost" disabled={isPending}>
          <span className="border-muted-foreground border-b border-dashed">
            Cancel SIP
          </span>
        </Button>
      </ResponsiveModalTrigger>

      <ResponsiveModalContent className="gap-4">
        <ResponsiveModalHeader className="items-center">
          <MessageCircleXIcon className="text-primary size-12" />
        </ResponsiveModalHeader>

        <ResponsiveModalTitle className="text-center text-lg font-medium">
          Future installments will be stopped
        </ResponsiveModalTitle>

        <ResponsiveModalDescription className="px-4 text-center text-sm">
          Your invested amount stays in this fund until you redeem.
        </ResponsiveModalDescription>

        <ResponsiveModalFooter>
          <Button
            size="lg"
            onClick={handleCancelSip}
            disabled={isPending}
            className="w-full"
          >
            {isPending && <Spinner />} Cancel SIP
          </Button>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export default CancelSipButton;
