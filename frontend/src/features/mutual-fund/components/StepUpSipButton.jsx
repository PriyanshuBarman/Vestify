import { Button } from "@/components/ui/button";
import { BarChartIcon, ChevronDownIcon } from "lucide-react";
import { Link } from "react-router";
import StepUpDetailsModal from "./overlays/StepUpDetailsModal";
import { useState } from "react";
import { useRemoveStepUp } from "../hooks/useRemoveStepUp";

function StepUpSipButton({ sipDetail }) {
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
          />
        </>
      ) : (
        <Button
          asChild
          variant="ghost"
          className="bg-primary/10 text-primary py-4"
        >
          <Link to="/mutual-funds/step-up" state={sipDetail}>
            <BarChartIcon className="h-4 w-4 stroke-4" />
            Add step-up
          </Link>
        </Button>
      )}
    </div>
  );
}
export default StepUpSipButton;
