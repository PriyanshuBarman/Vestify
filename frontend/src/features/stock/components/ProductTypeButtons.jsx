import { Button } from "@/components/ui/button";

function ProductTypeButtons() {
  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="rounded-full text-xs shadow-none border-foreground bg-accent"
      >
        Delivery
      </Button>
      <Button
        disabled={true}
        size="sm"
        variant="outline"
        className="rounded-full text-xs shadow-none"
      >
        Intraday
      </Button>
      <Button
        disabled={true}
        size="sm"
        variant="outline"
        className="rounded-full text-xs shadow-none"
      >
        MTF
      </Button>
    </>
  );
}

export default ProductTypeButtons;
