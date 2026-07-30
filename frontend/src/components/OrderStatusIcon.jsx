import {
  CheckCircleIcon,
  ClockCountdownIcon,
  XCircleIcon,
} from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

function OrderStatusIcon({ status, className = "size-5.5" }) {
  if (status === "COMPLETED" || status === "SUCCESSFUL") {
    return (
      <CheckCircleIcon
        weight="fill"
        className={cn("text-primary", className)}
      />
    );
  }

  if (status === "PENDING" || status === "OPEN") {
    return <ClockCountdownIcon className={cn("text-primary", className)} />;
  }

  if (
    status === "FAILED" ||
    status === "UNSUCCESSFUL" ||
    status === "CANCELLED"
  ) {
    return (
      <XCircleIcon
        weight="fill"
        className={cn("text-destructive", className)}
      />
    );
  }

  return null;
}

export default OrderStatusIcon;
