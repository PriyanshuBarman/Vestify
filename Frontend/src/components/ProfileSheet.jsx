import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/useIsMobile";
import ProfilePage from "@/pages/ProfilePage";
import { Button } from "./ui/button";

function ProfileSheet({ children }) {
  const isMobile = useIsMobile();

  return (
    <Sheet modal={!isMobile}>
      <SheetTrigger asChild>
        <Button
        variant="ghost"
          type="button"
          className="relative flex size-8.5 shrink-0 overflow-hidden rounded-full"
        >
          {children}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="h-svh min-w-md pt-18 sm:rounded-l-2xl"
      >
        <ProfilePage />
      </SheetContent>
    </Sheet>
  );
}

export default ProfileSheet;
