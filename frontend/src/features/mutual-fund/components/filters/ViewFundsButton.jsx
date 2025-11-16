import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

function ViewFundsButton({ totalCount, isFetching, onClick }) {
  return (
    <Button
      disabled={!totalCount && isFetching}
      size="lg"
      className="w-full"
      onClick={onClick}
    >
      {isFetching ? <Spinner /> : `View ${totalCount} funds`}
    </Button>
  );
}
export default ViewFundsButton;
