import IncognitoIcon from "@/components/icons/IncognitoIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function UserAvatar({ user, onClick, className }) {
  return (
    <Avatar
      onClick={onClick}
      className={cn("size-9 cursor-pointer", className)}
    >
      <AvatarImage src={user?.avatar} />
      <AvatarFallback className="font-medium">
        {user?.name?.charAt(0)?.toUpperCase() || (
          <IncognitoIcon className="size-5" />
        )}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
