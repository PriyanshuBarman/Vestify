import { cn } from "@/lib/utils";
import { CheckCheckIcon, CircleXIcon, ClockFadingIcon } from "lucide-react";

/**
 * Reusable component for displaying order status icons
 * @param {Object} props
 * @param {string} props.status - The order status (COMPLETED, PENDING, FAILED)
 * @param {string} props.className - Custom Tailwind classes for the icon (default: "size-5")
 * @returns {JSX.Element} The status icon component
 */
function OrderStatusIcon({ status, className = "size-5" }) {
  const icons = {
    COMPLETED: <CheckCheckIcon className={cn("text-primary", className)} />,
    PENDING: <ClockFadingIcon className={cn("text-primary", className)} />,
    FAILED: <CircleXIcon className={cn("text-destructive", className)} />,
  };

  return icons[status] || null;
}

export default OrderStatusIcon;
