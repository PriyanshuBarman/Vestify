import IconWrapper from "../IconWrapper";
import { Button } from "../ui/button";
import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "../ui/responsive-modal";

function ConfirmModal({
  isOpen,
  onOpenChange,
  icon,
  title,
  description,
  action,
  actionMessage,
  variant,
}) {
  return (
    <ResponsiveModal open={isOpen} onOpenChange={onOpenChange}>
      <ResponsiveModalContent>
        <ResponsiveModalHeader className="items-center gap-2">
          <IconWrapper color={variant === "destructive" && "destructive"}>
            {icon}
          </IconWrapper>
          <ResponsiveModalTitle>{title}</ResponsiveModalTitle>
          <ResponsiveModalDescription>{description}</ResponsiveModalDescription>
        </ResponsiveModalHeader>

        <ResponsiveModalFooter>
          <ResponsiveModalClose asChild>
            <Button
              onClick={action}
              size="lg"
              variant={variant}
              className="w-full"
            >
              {actionMessage}
            </Button>
          </ResponsiveModalClose>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export default ConfirmModal;
