import GoBackBar from "@/components/GoBackBar";
import DeleteAccountModal from "@/components/overlays/DeleteAccountModal";
import { Button } from "@/components/ui/button";
import { useDeleteAccount } from "@/hooks/useDeleteAccount";
import { useState } from "react";

function DeleteAccountPage() {
  const [openModal, setOpenModal] = useState(false);
  const { mutate: deleteAccount } = useDeleteAccount();

  return (
    <div className="flex h-dvh flex-col px-4 pb-4 sm:mx-auto sm:h-fit sm:max-w-lg">
      <GoBackBar showSearchIcon={false} className="px-0" />
      <section className="mt-18 text-sm">
        <h2 className="text-2xl font-semibold">Delete Account</h2>
        <p className="text-muted-foreground mt-2">
          Deleting your account will permanently remove all your data, including
          your mutual fund portfolio, transaction history, and virtual wallet
          balance etc. Once deleted, your account and investment records cannot
          be recovered or restored.
        </p>
      </section>

      <Button
        onClick={() => setOpenModal(true)}
        size="lg"
        variant="destructive"
        className="mx-auto mt-auto w-full sm:mt-14 sm:w-fit"
      >
        Delete Account
      </Button>
      <DeleteAccountModal
        open={openModal}
        onOpenChange={setOpenModal}
        deleteAccount={deleteAccount}
      />
    </div>
  );
}
export default DeleteAccountPage;
