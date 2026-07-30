import { TrashSimpleIcon } from "@phosphor-icons/react";
import { Navigate, useLocation } from "react-router";

import { Button } from "@/components/ui/button";
import GoBackBar from "@/components/GoBackBar";

import { useCancelOrder } from "../hooks/useCancelOrder";

function ConfirmCancelPage() {
  const location = useLocation();
  const state = location.state || {};
  const { title, orderId } = state;

  const { mutate: cancel, isPending: isCancelling } = useCancelOrder();

  const handleCancel = () => {
    cancel(orderId);
  };

  if (!title || !orderId) {
    return <Navigate to="/error?hideRefresh=true" replace />;
  }

  return (
    <div className="flex h-dvh flex-col px-4 pb-4 sm:mx-auto sm:h-fit sm:max-w-lg">
      <GoBackBar showSearchIcon={false} className="px-0" />
      <div className="mt-20 flex flex-col items-center justify-center gap-8">
        <TrashSimpleIcon weight="fill" className="text-primary  size-32 p-6 " />

        <h1 className="text-center sm:text-lg font-medium">{title}</h1>
      </div>

      <div className="mt-auto flex w-full flex-col items-center justify-end gap-4 sm:mt-16">
        <Button
          size="lg"
          onClick={handleCancel}
          disabled={isCancelling}
          className="w-full"
        >
          Confirm Cancel
        </Button>
      </div>
    </div>
  );
}

export default ConfirmCancelPage;
