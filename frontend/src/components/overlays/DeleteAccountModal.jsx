import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "../ui/responsive-modal";
import { Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import IconWrapper from "../IconWrapper";

function DeleteAccountModal({ open, onOpenChange, deleteAccount }) {
  return (
    <ResponsiveModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveModalContent>
        <ResponsiveModalHeader className="items-center gap-4">
          <IconWrapper color="red">
            <Trash2Icon />
          </IconWrapper>
          <ResponsiveModalTitle>Delete Account?</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>

        <ResponsiveModalFooter>
          <ResponsiveModalClose asChild>
            <Button
              onClick={() => deleteAccount()}
              size="lg"
              variant="destructive"
              className="w-full"
            >
              Yes, Delete Account
            </Button>
          </ResponsiveModalClose>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export default DeleteAccountModal;
