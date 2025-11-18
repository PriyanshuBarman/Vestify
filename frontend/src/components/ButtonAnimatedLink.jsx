import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ButtonAnimatedLink({ children, className, ...props }) {
  return (
    <Button
      {...props}
      asChild
      variant="link"
      className={cn(
        "after:bg-primary relative !no-underline after:absolute after:bottom-2 after:h-px after:w-2/3 after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100",
        className,
      )}
    >
      {children}
    </Button>
  );
}

export default ButtonAnimatedLink;
