import GoBackBar from "@/components/GoBackBar";
import ConfirmModal from "@/components/overlays/ConfirmModal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteAccount } from "@/hooks/useDeleteAccount";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";

function DeleteAccountPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deleteAccount, isPending } = useDeleteAccount();

  return (
    <div className="flex h-dvh flex-col px-4 pb-4 sm:mx-auto sm:h-fit sm:max-w-lg sm:pt-20">
      <GoBackBar showSearchIcon={false} className="px-0" />
      <section className="mt-18 text-sm">
        <h2 className="text-2xl font-semibold sm:text-3xl">Delete Account</h2>
        <p className="text-muted-foreground mt-2 sm:mt-4 sm:text-base">
          Deleting your account will permanently remove all your data, including
          your mutual fund portfolio, transaction history, and virtual wallet
          balance etc. Once deleted, your account and investment records cannot
          be recovered or restored.
        </p>
      </section>

      <Button
        onClick={() => setIsModalOpen(true)}
        size="lg"
        variant="destructive"
        className="mt-auto w-full max-sm:mx-auto sm:mt-14 sm:mr-auto sm:w-fit"
      >
        {isPending && <Spinner />} Delete Account
      </Button>
      <ConfirmModal
        title="Delete account?"
        description="Are you sure you want to delete your account?"
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        action={deleteAccount}
        actionMessage="Yes, Delete Account"
        variant="destructive"
        icon={<Trash2Icon />}
      />
    </div>
  );
}
export default DeleteAccountPage;
