import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Spinner } from "@/components/ui/spinner";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MessageCircleXIcon } from "lucide-react";
import { useDeleteSip } from "../hooks/useDeleteSip";

function CancelSipButton({ sipId }) {
  const isMobile = useIsMobile();
  const { mutate: cancelSip, isPending } = useDeleteSip();

  const handleCancelSip = () => {
    cancelSip({ sipId });
  };

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" disabled={isPending}>
            <span className="border-muted-foreground border-b border-dashed">
              Cancel SIP
            </span>
          </Button>
        </DrawerTrigger>

        <DrawerContent className="gap-4">
          <DrawerHeader className="items-center">
            <MessageCircleXIcon className="text-primary size-12" />
          </DrawerHeader>

          <DrawerTitle className="text-center text-lg font-medium">
            Future installments will be stopped
          </DrawerTitle>

          <DrawerDescription className="px-4 text-center text-sm">
            Your invested amount stays in this fund until you redeem.
          </DrawerDescription>

          <DrawerFooter className="flex-row">
            <DrawerClose asChild>
              <Button
                size="lg"
                variant="outline"
                disabled={isPending}
                className="w-1/2"
              >
                Don't Cancel
              </Button>
            </DrawerClose>

            <Button
              size="lg"
              onClick={handleCancelSip}
              disabled={isPending}
              className="w-1/2"
            >
              {isPending && <Spinner />} Cancel SIP
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" disabled={isPending}>
          <span className="border-muted-foreground border-b border-dashed">
            Cancel SIP
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-6">
        <DialogHeader className="items-center">
          <MessageCircleXIcon className="text-primary mt-2 size-18" />
        </DialogHeader>

        <DialogTitle className="text-center text-lg font-medium">
          Future installments will be stopped
        </DialogTitle>

        <DialogDescription className="px-4 text-center text-sm">
          Your invested amount stays in this fund until you redeem.
        </DialogDescription>

        <DialogFooter className="shrink-0 flex-row">
          <DialogClose asChild>
            <Button
              size="lg"
              variant="outline"
              disabled={isPending}
              className="w-1/2"
            >
              Don't Cancel
            </Button>
          </DialogClose>

          <Button
            size="lg"
            onClick={handleCancelSip}
            disabled={isPending}
            className="w-1/2"
          >
            {isPending && <Spinner />} Cancel SIP
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CancelSipButton;
