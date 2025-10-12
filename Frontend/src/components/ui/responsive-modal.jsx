import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

import { useIsMobile } from "@/hooks/useIsMobile";

/**
 * A universal responsive modal that automatically switches
 * between <Dialog> (desktop) and <Drawer> (mobile)
 *
 * You can use it exactly like shadcn's Dialog/Drawer:
 *
 * <ResponsiveModal>
 *   <ResponsiveModalTrigger>Open</ResponsiveModalTrigger>
 *   <ResponsiveModalContent>
 *     <ResponsiveModalHeader>
 *       <ResponsiveModalTitle>Title</ResponsiveModalTitle>
 *       <ResponsiveModalDescription>Description</ResponsiveModalDescription>
 *     </ResponsiveModalHeader>
 *     ...content...
 *     <ResponsiveModalFooter>Footer buttons</ResponsiveModalFooter>
 *   </ResponsiveModalContent>
 * </ResponsiveModal>
 */
export function ResponsiveModal({ children, ...props }) {
  const isMobile = useIsMobile();
  const Comp = isMobile ? Drawer : Dialog;
  return <Comp {...props}>{children}</Comp>;
}

export function ResponsiveModalTrigger({ children, ...props }) {
  const isMobile = useIsMobile();
  const Comp = isMobile ? DrawerTrigger : DialogTrigger;
  return <Comp {...props}>{children}</Comp>;
}

export function ResponsiveModalContent({ children, ...props }) {
  const isMobile = useIsMobile();
  const Comp = isMobile ? DrawerContent : DialogContent;
  return <Comp {...props}>{children}</Comp>;
}

export function ResponsiveModalHeader({ children, ...props }) {
  const isMobile = useIsMobile();
  const Comp = isMobile ? DrawerHeader : DialogHeader;
  return <Comp {...props}>{children}</Comp>;
}

export function ResponsiveModalTitle({ children, ...props }) {
  const isMobile = useIsMobile();
  const Comp = isMobile ? DrawerTitle : DialogTitle;
  return <Comp {...props}>{children}</Comp>;
}

export function ResponsiveModalDescription({ children, ...props }) {
  const isMobile = useIsMobile();
  const Comp = isMobile ? DrawerDescription : DialogDescription;
  return <Comp {...props}>{children}</Comp>;
}

export function ResponsiveModalFooter({ children, ...props }) {
  const isMobile = useIsMobile();
  const Comp = isMobile ? DrawerFooter : DialogFooter;
  return <Comp {...props}>{children}</Comp>;
}

export function ResponsiveModalClose({ children, ...props }) {
  const isMobile = useIsMobile();
  const Comp = isMobile ? DrawerClose : DialogClose;
  return <Comp {...props}>{children}</Comp>;
}
