import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ProfilePage from "@/pages/ProfilePage";
import { Button } from "./ui/button";

function ProfileSheet({ children }) {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          type="button"
          className="relative flex size-8.5 shrink-0 overflow-hidden rounded-full"
        >
          {children}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="h-svh min-w-md pt-18">
        <ProfilePage />
      </SheetContent>
    </Sheet>
  );
}

export default ProfileSheet;
