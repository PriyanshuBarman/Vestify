"use client";

import { createContext, useContext } from "react";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const BannerContext = createContext({
  show: true,
  setShow: () => {},
});

export const Banner = ({
  children,
  visible,
  defaultVisible = true,
  onClose,
  className,
  inset = false,
  ...props
}) => {
  const [show, setShow] = useControllableState({
    defaultProp: defaultVisible,
    prop: visible,
    onChange: onClose,
  });

  if (!show) {
    return null;
  }

  return (
    <BannerContext.Provider value={{ show, setShow }}>
      <div
        className={cn(
          "flex w-full items-center justify-between gap-2 bg-primary px-4 py-2 text-primary-foreground",
          inset && "rounded-lg",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </BannerContext.Provider>
  );
};

export const BannerIcon = ({ icon: Icon, className, ...props }) => (
  <div
    className={cn(
      "rounded-full border border-background/20 bg-background/10 p-1 shadow-sm",
      className,
    )}
    {...props}
  >
    <Icon size={16} />
  </div>
);

export const BannerTitle = ({ className, ...props }) => (
  <p className={cn("flex-1 text-sm", className)} {...props} />
);

export const BannerAction = ({
  variant = "outline",
  size = "sm",
  className,
  ...props
}) => (
  <Button
    className={cn(
      "shrink-0 bg-transparent hover:bg-background/10 hover:text-background",
      className,
    )}
    size={size}
    variant={variant}
    {...props}
  />
);

export const BannerClose = ({
  variant = "ghost",
  size = "icon",
  onClick,
  className,
  ...props
}) => {
  const { setShow } = useContext(BannerContext);

  const handleClick = (e) => {
    setShow(false);
    onClick?.(e);
  };

  return (
    <Button
      className={cn(
        "shrink-0 bg-transparent hover:bg-background/10 hover:text-background",
        className,
      )}
      onClick={handleClick}
      size={size}
      variant={variant}
      {...props}
    >
      <XIcon size={18} />
    </Button>
  );
};
