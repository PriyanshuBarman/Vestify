import { cn } from "@/lib/utils";

function CopyrightFooter({ className }) {
  return (
    <footer
      className={cn("flex", "flex-col", "items-center", "gap-2", className)}
    >
      <div className="flex items-center justify-center">
        <img
          src="/transparent-logo.png"
          alt="Vestify logo"
          className="bg-foreground/40 size-4.5 rounded-full"
        />
        <span className="ml-2 text-xs tracking-wider">Vestify</span>
      </div>
      <p className="text-muted-foreground flex items-center text-center text-xs">
        Copyright © 2025 Vestify
      </p>
    </footer>
  );
}
export default CopyrightFooter;
