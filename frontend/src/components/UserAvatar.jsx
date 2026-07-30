import { useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import { useGetUser } from "@/hooks/useGetUser";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import IncognitoIcon from "@/components/icons/IncognitoIcon";
import { selectOnlineUserIds } from "@/store/slices/onlineUsersSlice";

function UserAvatar({ user, onClick, className }) {
  const { data: self } = useGetUser();
  const onlineUserIds = useSelector(selectOnlineUserIds);

  const isSelf = user?.userId === self?.id || user?.id === self?.id;
  const targetUserId = user?.userId || user?.id;
  const isOnline = isSelf || onlineUserIds?.includes(targetUserId);

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
      {isOnline && <AvatarBadge />}
    </Avatar>
  );
}

export default UserAvatar;
