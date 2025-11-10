import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FundLogo from "@/features/mutual-fund/components/FundLogo";

function CompanyLogo({ searchType, item }) {
  return (
    <>
      {searchType === "indianStocks" && (
        <Avatar className="size-10">
          <AvatarImage
            src={`https://img.logo.dev/ticker/${item.symbol}.NS?token=pk_Rlq_iuMcQHGZ2xOrcVGX7g&retina=true&fallback=404`}
          />
          <AvatarFallback className="bg-foreground/10"></AvatarFallback>
        </Avatar>
      )}

      {searchType === "mutualFunds" && (
        <FundLogo
          fundHouseDomain={item.detail_info}
          className="size-10 rounded-full"
        />
      )}
    </>
  );
}

export default CompanyLogo;
