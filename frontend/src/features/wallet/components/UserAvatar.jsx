import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import IncognitoIcon from "@/components/icons/IncognitoIcon";

function UserAvatar({ user, onClick, className }) {
  return (
    <Avatar
      onClick={onClick}
      className={cn("size-9 cursor-pointer", className)}
    >
      <AvatarImage
        src={user?.avatar}
        loading="lazy"
        draggable="false"
        alt={`${user?.name}'s avatar`}
      />
      <AvatarFallback className="font-medium">
        {user?.name?.charAt(0)?.toUpperCase() || (
          <IncognitoIcon className="size-5" />
        )}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
