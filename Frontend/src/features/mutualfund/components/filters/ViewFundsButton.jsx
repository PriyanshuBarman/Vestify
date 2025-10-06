import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

function ViewFundsButton({ totalCount, isFetching, onClick }) {
  return (
    <Button
      disabled={!totalCount && isFetching}
      className={`h-12 w-full font-semibold`}
      onClick={onClick}
    >
      {isFetching ? (
        <Loader2Icon className="size-5 animate-spin" />
      ) : (
        `View ${totalCount} funds`
      )}
    </Button>
  );
}
export default ViewFundsButton;
