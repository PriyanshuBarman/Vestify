import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";

function Logo({ className }) {
  return (
    <Avatar className={cn("size-8.5 shadow sm:size-10", className)}>
      <AvatarImage src="/logo.png" alt="Vestify Logo" />
      <AvatarFallback />
    </Avatar>
  );
}

export default Logo;
