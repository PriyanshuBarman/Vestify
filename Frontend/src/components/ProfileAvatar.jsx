import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetUser } from "@/hooks/useGetUser";

function ProfileAvatar({ className, ...props }) {
  const { data: user } = useGetUser();

  return (
    <Avatar className={cn("size-32", className)} {...props}>
      <AvatarImage
        src={user?.profile?.avatar}
        alt="User Profile Picture"
        className="object-cover"
      />
      <AvatarFallback className="text-4xl font-semibold text-shadow-lg">
        {user?.profile?.name?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}

export default ProfileAvatar;
