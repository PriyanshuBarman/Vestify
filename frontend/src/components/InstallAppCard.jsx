import { Download } from "lucide-react";

import { useInstallPWA } from "@/hooks/useInstallPWA";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

import IconWrapper from "./IconWrapper";

function InstallAppCard() {
  const isMobile = useIsMobile();
  const { isPwaSupported, handleInstallClick } = useInstallPWA();
  if (!isPwaSupported || !isMobile) return null;

  return (
    <Item
      variant="outline"
      className="mx-4 cursor-pointer rounded-2xl"
      onClick={handleInstallClick}
    >
      <ItemContent>
        <ItemTitle>Install Web App</ItemTitle>
        <ItemDescription>Better experience & offline support</ItemDescription>
      </ItemContent>
      <ItemActions>
        <IconWrapper>
          <Download className="size-4" />
        </IconWrapper>
      </ItemActions>
    </Item>
  );
}

export default InstallAppCard;
