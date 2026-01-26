import { Button } from "@/components/ui/button";
import { BarChartIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useRemoveStepUp } from "../hooks/useRemoveStepUp";
import StepUpDetailsModal from "./overlays/StepUpDetailsModal";

function StepUpSipButton({ sipDetail, isOtherUserProfile }) {
  const isStepUpAdded = sipDetail?.stepUpIntervalInMonths;
  const [openModal, setOpenModal] = useState(false);
  const { mutate: removeStepUp, isPending } = useRemoveStepUp();

  return (
    <div>
      {isStepUpAdded ? (
        <>
          <Button
            className="px-3 pr-2 text-[0.8rem] tracking-tight sm:text-sm sm:tracking-normal"
            variant="outline"
            disabled={isPending}
            onClick={() => setOpenModal(true)}
          >
            {isPending ? (
              "Removing..."
            ) : (
              <div className="flex items-center gap-1">
                Step-up added <ChevronDownIcon />
              </div>
            )}
          </Button>
          <StepUpDetailsModal
            isOpen={openModal}
            onOpenChange={setOpenModal}
            sipDetail={sipDetail}
            onConfirm={removeStepUp}
            isPending={isPending}
            isOtherUserProfile={isOtherUserProfile}
          />
        </>
      ) : (
        <Button
          asChild
          variant="ghost"
          className="bg-primary/10 text-primary py-4"
        >
          <Link
            to={isOtherUserProfile ? "#" : "/mutual-funds/step-up"}
            state={sipDetail}
          >
            <BarChartIcon className="h-4 w-4 stroke-4" />
            {isOtherUserProfile ? "No step-up" : "Add step-up"}
          </Link>
        </Button>
      )}
    </div>
  );
}
export default StepUpSipButton;
