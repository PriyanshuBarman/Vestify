import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getMainDomain } from "../utils/getMainDomain";

function FundLogo({ fundHouseDomain, className, noFormat = false }) {
  const domain = noFormat ? fundHouseDomain : getMainDomain(fundHouseDomain);
  return (
    <Avatar className={cn("size-9 rounded-md sm:size-10", className)}>
      <AvatarImage
        src={`https://img.logo.dev/${domain}?token=pk_Rlq_iuMcQHGZ2xOrcVGX7g&retina=true`}
        alt="fund logo"
        className="object-contain"
      />
      <AvatarFallback className={cn("rounded-md sm:size-10", className)} />
    </Avatar>
  );
}

export default FundLogo;
