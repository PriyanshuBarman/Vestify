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

function DeleteAccountModal({ open, onOpenChange, deleteAccount }) {
  return (
    <ResponsiveModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveModalContent>
        <ResponsiveModalHeader className="items-center gap-2">
          <div className="glass rounded-2xl p-2 shadow-lg">
            <div className="bg-destructive text-background outline-destructive/60 w-fit rounded-lg p-2 shadow outline-2">
              <Trash2Icon />
            </div>
          </div>
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
