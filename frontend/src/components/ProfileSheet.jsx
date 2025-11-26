import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/useIsMobile";
import ProfilePage from "@/pages/ProfilePage";
import { toast } from "sonner";

function ProfileSheet({ open, onOpenChange }) {
  const isMobile = useIsMobile();

  const closeSheet = () => {
    if (isMobile) return;
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="h-svh min-w-md pt-18">
        <ProfilePage closeSheet={closeSheet} />
      </SheetContent>
    </Sheet>
  );
}

export default ProfileSheet;
