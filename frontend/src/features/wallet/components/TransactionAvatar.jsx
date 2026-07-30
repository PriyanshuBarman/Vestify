import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FundLogo from "@/components/FundLogo";
import IncognitoIcon from "@/components/icons/IncognitoIcon";
import StockLogo from "@/components/StockLogo";

function TransactionAvatar({ tnx, peerProfile, assetInfo, onClick }) {
  // A. Peer-to-Peer User Avatar
  if (peerProfile) {
    return (
      <Avatar onClick={onClick} className="size-9 dark:bg-foreground">
        <AvatarImage src={peerProfile.avatar} className="object-contain" />
        <AvatarFallback className="text-sm font-semibold uppercase">
          {peerProfile.name?.charAt(0) || <IncognitoIcon className="size-5" />}
        </AvatarFallback>
      </Avatar>
    );
  }

  // B. Mutual Fund AMC Logo
  if (tnx.assetCategory === "MUTUAL_FUND" && tnx.mfOrder?.fundHouseDomain) {
    return (
      <FundLogo
        fundHouseDomain={tnx.mfOrder.fundHouseDomain}
        noFormat
        className="size-9 rounded-full"
      />
    );
  }

  // C. Stock Ticker Logo
  if (tnx.assetCategory === "STOCK" && tnx.stockOrder?.symbol) {
    return (
      <StockLogo
        symbol={tnx.stockOrder.symbol}
        className="size-9 rounded-full"
      />
    );
  }

  // D. Generic Asset Image (AMFI / NSE logos)
  if (assetInfo?.img) {
    return (
      <Avatar className="size-8 dark:bg-foreground">
        <AvatarImage src={assetInfo.img} className="object-contain" />
        <AvatarFallback className="text-sm uppercase">
          {tnx.assetCategory?.charAt(0) || "A"}
        </AvatarFallback>
      </Avatar>
    );
  }

  // E. Deleted Account / Unknown Fallback
  return (
    <Avatar className="size-9 dark:bg-foreground">
      <AvatarFallback className="text-sm uppercase">
        <IncognitoIcon className="size-5" />
      </AvatarFallback>
    </Avatar>
  );
}

export default TransactionAvatar;
