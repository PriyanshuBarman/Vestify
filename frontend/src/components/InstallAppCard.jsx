import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Download } from "lucide-react";
import IconWrapper from "./IconWrapper";
import { useInstallApp } from "@/hooks/useInstallApp";
import { useIsMobile } from "@/hooks/useIsMobile";

function InstallAppCard() {
  const isMobile = useIsMobile();
  const { isInstallable, handleInstall } = useInstallApp();
  if (!isInstallable || !isMobile) return null;

  return (
    <Item
      variant="outline"
      className="mx-4 cursor-pointer rounded-2xl"
      onClick={handleInstall}
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
