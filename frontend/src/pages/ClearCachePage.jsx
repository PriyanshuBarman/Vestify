import GoBackBar from "@/components/GoBackBar";
import ConfirmModal from "@/components/overlays/ConfirmModal";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { DatabaseZapIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function ClearCachePage() {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const clearCache = () => {
    queryClient.clear();
    navigate("/");
    toast.success("Cache cleared successfully");
  };

  return (
    <div className="flex h-dvh flex-col px-4 pb-4 sm:mx-auto sm:h-fit sm:max-w-lg">
      <GoBackBar showSearchIcon={false} className="px-0" />
      <section className="mt-18 text-sm">
        <h2 className="text-2xl font-semibold">Clear Cache</h2>
        <p className="text-muted-foreground mt-2 whitespace-pre-line">
          {` Use this option only if you see outdated or incorrect data in the app. If everything looks updated, please do NOT clear the cache. 
          Clearing the cache is not recommended unless necessary, and it should not be done frequently.`}
        </p>
      </section>

      <Button
        onClick={() => setOpenModal(true)}
        size="lg"
        variant="destructive"
        className="mx-auto mt-auto w-full sm:mt-14 sm:w-fit"
      >
        Clear Cache
      </Button>
      <ConfirmModal
        title="Clear Cache"
        description="Are you sure you want to clear cache?"
        isOpen={openModal}
        onOpenChange={setOpenModal}
        action={clearCache}
        actionMessage="Yes, Clear Cache"
        variant="destructive"
        icon={<DatabaseZapIcon />}
      />
    </div>
  );
}
export default ClearCachePage;
