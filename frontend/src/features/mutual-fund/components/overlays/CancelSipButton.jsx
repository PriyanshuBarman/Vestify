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
import IconWrapper from "@/components/IconWrapper";

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
          <span className="border-muted-foreground flex items-center gap-2 border-b border-dashed">
            {isPending && <Spinner className="text-primary" />} Cancel SIP
          </span>
        </Button>
      </ResponsiveModalTrigger>

      <ResponsiveModalContent>
        <ResponsiveModalHeader className="items-center">
          <IconWrapper>
            <MessageCircleXIcon className="sm:size-8" />
          </IconWrapper>
        </ResponsiveModalHeader>

        <ResponsiveModalTitle className="pb-2 text-center font-medium">
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
