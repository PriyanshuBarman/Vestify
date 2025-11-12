import { cn } from "@/lib/utils";
import { Avatar } from "./ui/avatar";

function LogoShapeOnly({ className }) {
  return (
    <Avatar
      className={cn("relative flex items-center justify-center", className)}
    >
      <div className="circle bg-primary absolute top-[29%] left-[26%] h-[16%] w-[16%] rounded-full" />
      <div className="bg-primary absolute top-[27%] right-[34%] h-[48%] w-[16%] rotate-30 rounded-full" />
    </Avatar>
  );
}

export default LogoShapeOnly;
