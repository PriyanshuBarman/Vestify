import { cn } from "@/lib/utils";

const colorMap = {
  default: "bg-primary outline-primary/70",
  red: "bg-destructive outline-destructive/60",
  foreground: "bg-foreground outline-foreground/70",
};

function IconWrapper({ children, color = "default", className }) {
  return (
    <div className="glass rounded-2xl border-r border-b p-2 shadow-lg">
      <div
        className={cn(
          "text-background w-fit rounded-lg p-2 outline-2 drop-shadow-md",
          colorMap[color],
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default IconWrapper;
