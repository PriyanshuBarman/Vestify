import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/useIsMobile";
import { InfoIcon, XIcon } from "lucide-react";
import { useState } from "react";

/**
 * Reusable InfoDrawer component for displaying information
 * - Mobile: Opens a drawer from bottom
 * - Desktop: Opens a dialog/modal
 * - Fully responsive and reusable across the app
 */
export function InfoDrawer({
  title,
  children,
  triggerClassName = "",
  iconSize = "sm:size-4 size-3.5",
}) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const TriggerButton = (
    <Button
      variant="ghost"
      size="sm"
      className={`${triggerClassName} cursor-pointer`}
      aria-label={`More information about ${title}`}
    >
      <InfoIcon
        className={`${iconSize} text-muted-foreground hover:text-foreground transition-colors`}
      />
    </Button>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>
        <DrawerContent className="max-h-[80vh]">
          <DrawerHeader className="text-left">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-lg font-semibold">
                {title}
              </DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm" className="p-1">
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-6">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
      <DialogContent >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
