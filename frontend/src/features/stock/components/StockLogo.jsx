import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function StockLogo({ symbol, className }) {
  const symbolWithSuffix = symbol?.endsWith(".NS") ? symbol : `${symbol}.NS`;
  return (
    <Avatar className={cn("size-10 rounded-lg", className)}>
      <AvatarImage
        src={`https://img.logo.dev/ticker/${symbolWithSuffix}?token=pk_Rlq_iuMcQHGZ2xOrcVGX7g&retina=true&fallback=404`}
      />
      <AvatarFallback className="rounded-lg"></AvatarFallback>
    </Avatar>
  );
}

export default StockLogo;
