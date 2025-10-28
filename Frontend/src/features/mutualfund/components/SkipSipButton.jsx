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
import { tz } from "@date-fns/tz";
import { addMonths, differenceInDays, format } from "date-fns";
import { SkipForwardIcon } from "lucide-react";
import { useState } from "react";
import { useSkipSip } from "../hooks/useSkipSip";

function SkipSipButton({ sipId, nextInstallmentDate }) {
  const isMobile = useIsMobile();
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

  return isMobile ? (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" disabled={isPending}>
          Skip
        </Button>
      </DrawerTrigger>

      <DrawerContent className="gap-4">
        <DrawerHeader className="items-center">
          <SkipForwardIcon className="text-primary size-12" />
        </DrawerHeader>

        <DrawerTitle className="text-center text-lg font-medium">
          Are you sure you want to skip{" "}
          {format(nextInstallmentDate, "dd MMM yy")} installment?
        </DrawerTitle>

        <DrawerDescription className="bg-accent mx-4 rounded-lg p-4 text-center text-sm">
          Your next due date will be {getNextInstallmentDate()}
        </DrawerDescription>

        <DrawerFooter className="flex-row">
          <DrawerClose asChild>
            <Button
              size="lg"
              variant="outline"
              disabled={isPending}
              className="flex-1"
            >
              Keep investing
            </Button>
          </DrawerClose>

          <Button
            size="lg"
            onClick={handleSkipSip}
            disabled={isPending}
            className="flex-1"
          >
            {!isPending && <Spinner />} Skip anyway
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" disabled={isPending}>
          Skip
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-8">
        <DialogHeader className="items-center">
          <SkipForwardIcon className="text-primary mt-2 size-18" />
        </DialogHeader>

        <DialogTitle className="text-center text-lg font-medium">
          Are you sure you want to skip{" "}
          {format(nextInstallmentDate, "dd MMM yy")} installment?
        </DialogTitle>

        <DialogDescription className="bg-accent mx-4 rounded-lg p-4 text-center text-sm">
          Your next due date will be {getNextInstallmentDate()}
        </DialogDescription>

        <DialogFooter className="flex-row gap-3">
          <DialogClose asChild>
            <Button
              size="lg"
              variant="outline"
              disabled={isPending}
              className="flex-1"
            >
              Keep investing
            </Button>
          </DialogClose>

          <Button
            size="lg"
            onClick={handleSkipSip}
            disabled={isPending}
            className="flex-1"
          >
            {isPending && <Spinner />} Skip anyway
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SkipSipButton;
