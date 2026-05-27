import { cn } from "@/lib/utils";
import { useGetUser } from "@/hooks/useGetUser";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import IncognitoIcon from "@/components/icons/IncognitoIcon";

function UserAvatar({ user, onClick, className }) {
  const { data: self } = useGetUser();
  const isSelf = user.userId === self.id;

  return (
    <Avatar
      onClick={onClick}
      className={cn("size-10 overflow-visible cursor-pointer", className)}
    >
      <AvatarImage
        src={user?.avatar}
        loading="lazy"
        draggable="false"
        alt={`${user?.name}'s avatar`}
        className="rounded-full"
      />
      <AvatarFallback className="font-medium">
        {user?.name?.charAt(0)?.toUpperCase() || (
          <IncognitoIcon className="size-5" />
        )}
      </AvatarFallback>
      {isSelf && <AvatarBadge />}
    </Avatar>
  );
}

export default UserAvatar;
