import { cn } from "@/lib/utils";
import LogoShapeOnly from "./LogoShapeOnly";

function CopyrightFooter({ className }) {
  return (
    <footer className={cn("flex flex-col items-center", className)}>
      <div className="flex items-center justify-center">
        <LogoShapeOnly />
        <span className="text-xs font-medium tracking-wider">Vestify</span>
      </div>
      <p className="text-muted-foreground flex items-center text-center text-xs">
        Copyright &copy; {new Date().getFullYear()} Vestify
      </p>
    </footer>
  );
}
export default CopyrightFooter;
