import { CheckCircleIcon, ClockIcon, CircleXIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reusable component for displaying order status icons
 * @param {Object} props
 * @param {string} props.status - The order status (COMPLETED, PENDING, FAILED)
 * @param {string} props.className - Custom Tailwind classes for the icon (default: "size-5")
 * @returns {JSX.Element} The status icon component
 */
function OrderStatusIcon({ status, className = "size-5" }) {
  const icons = {
    COMPLETED: <CheckCircleIcon className={cn("text-primary", className)} />,
    PENDING: <ClockIcon className={cn("text-primary", className)} />,
    FAILED: <CircleXIcon className={cn("text-destructive", className)} />,
  };

  return icons[status] || null;
}

export default OrderStatusIcon;
