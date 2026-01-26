import SendIcon from "@/components/icons/SendIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router";

function ProfileDialog({ isOpen, onOpenChange, clickedProfile }) {
  const navigate = useNavigate();
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only text-center">Profile</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="size-20">
              <AvatarImage
                src={clickedProfile?.avatar}
                alt={clickedProfile?.name}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl">
                {clickedProfile?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold">
              {clickedProfile?.name || "User"}
            </h3>
            <p className="text-muted-foreground text-sm">
              @{clickedProfile?.username || "username"}
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={clickedProfile?.userId === "system"}
              className="w-full"
              onClick={() =>
                navigate("/wallet/enter-amount", {
                  state: {
                    receiverId: clickedProfile?.userId,
                    receiverName: clickedProfile?.name,
                    receiverUsername: clickedProfile?.username,
                    receiverAvatar: clickedProfile?.avatar,
                  },
                })
              }
            >
              <SendIcon />
              Pay
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileDialog;
