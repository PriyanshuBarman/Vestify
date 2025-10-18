import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetUser } from "@/hooks/useGetUser";

function ProfileAvatar({ className, fallbackClassName, ...props }) {
  const { data: user } = useGetUser();

  return (
    <Avatar className={cn("size-28", className)} {...props}>
      <AvatarImage
        src={user?.profile?.avatar}
        alt="User Profile Picture"
        className="object-cover"
      />
      <AvatarFallback
        className={cn(
          "text-4xl font-semibold text-shadow-lg",
          fallbackClassName,
        )}
      >
        {user?.profile?.name?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}

export default ProfileAvatar;
