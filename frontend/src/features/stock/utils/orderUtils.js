import { formatDate, setHours, setMinutes } from "date-fns";

import { formatToINR } from "@/utils/formatters";

const validityConfig = {
  DAY_END: "Day end",
  YEAR: "1 Year",
};

export function getOrderDetailsItems(order) {
  if (!order || !order.id) return [];

  const items = [
    {
      title: "Order type",
      value: [
        order?.action?.toLowerCase(),
        order?.productType?.toLowerCase(),
        order?.type?.toLowerCase(),
      ]
        .filter(Boolean)
        .join(", "),
    },
    {
      title: "Order price",
      value: order?.limitPrice ? formatToINR(order.limitPrice) : "At market",
    },
    {
      title: "Validity",
      value: validityConfig[order?.validity] || order?.validity || "-",
    },
    {
      title: "Expires on",
      value: order?.expiresAt
        ? formatDate(new Date(order.expiresAt), "dd MMM yy")
        : "-",
    },
  ];

  // add trigger price at second position if it exists
  if (order?.triggerPrice) {
    items.splice(1, 0, {
      title: "Trigger price",
      value: formatToINR(order.triggerPrice),
    });
  }

  return items;
}

export function getOrderTimelineSteps(order) {
  if (!order || !order.id) return [];

  const firstStep = {
    id: 1,
    label: "Request received",
    date: order.createdAt
      ? formatDate(new Date(order.createdAt), "dd MMM yy, h:mm a")
      : "",
    completed: true,
    status: "COMPLETED",
  };

  const secondStep = {
    id: 2,
    label: "",
    date: "",
    completed: order.status !== "OPEN",
    status: order.status,
    failureReason: order.failureReason,
  };

  if (order.status === "UNSUCCESSFUL") {
    secondStep.label = "Order failed";
    secondStep.date = order.updatedAt
      ? formatDate(new Date(order.updatedAt), "dd MMM yy, h:mm a")
      : "";
  } else if (order.status === "CANCELLED") {
    secondStep.label = "Order cancelled";
    secondStep.date = order.updatedAt
      ? formatDate(new Date(order.updatedAt), "dd MMM yy, h:mm a")
      : "";
  } else if (order.status === "OPEN") {
    const isTriggerOrLimit =
      Boolean(order.triggerPrice) || Boolean(order.limitPrice);

    secondStep.label = isTriggerOrLimit
      ? "Order yet to be triggered"
      : "Order to be placed";

    secondStep.date = isTriggerOrLimit
      ? ""
      : order.expiresAt
        ? formatDate(
            setHours(setMinutes(new Date(order.expiresAt), 15), 9),
            "dd MMM yy, h:mm a",
          )
        : "";
  } else {
    secondStep.label = "Order processed";
    secondStep.date = order.executedAt
      ? formatDate(new Date(order.executedAt), "dd MMM yy, h:mm a")
      : "";
  }

  return [firstStep, secondStep];
}

export function getOrderSuccessItems(order) {
  if (!order) return [];

  const baseItems = [
    {
      label: "Quantity",
      value: order.quantity,
    },
    {
      label: "Type",
      value: order.productType?.toLowerCase(),
    },
  ];

  if (order.type === "GTT") {
    const items = [...baseItems];
    if (order.triggerPrice) {
      items.push({
        label: "If price hits",
        value: formatToINR(order.triggerPrice),
      });
    }
    if (order.limitPrice) {
      items.push({
        label: "Limit price",
        value: formatToINR(order.limitPrice),
      });
    }
    items.push({ label: "Validity", value: "1 year" });
    return items;
  }

  if (order.type === "SL") {
    const items = [...baseItems];
    if (order.triggerPrice) {
      items.push({
        label: "Trigger price",
        value: formatToINR(order.triggerPrice),
      });
    }
    if (order.limitPrice) {
      items.push({
        label: "Limit price",
        value: formatToINR(order.limitPrice),
      });
    }
    items.push({ label: "Validity", value: "1 year" });
    return items;
  }

  // Default: REGULAR order
  return baseItems;
}

export function partitionOpenOrders(pendingOrders = []) {
  const gttOrders = [];
  const openOrders = [];

  for (const order of pendingOrders) {
    if (order.type === "GTT") {
      gttOrders.push(order);
    } else {
      openOrders.push(order);
    }
  }

  return { gttOrders, openOrders };
}
