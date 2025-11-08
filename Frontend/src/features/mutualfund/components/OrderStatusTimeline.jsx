import { formatDate } from "date-fns";
import OrderStatusIcon from "./OrderStatusIcon";

function OrderStatusTimeline({ order }) {
  const steps = [
    {
      id: 1,
      label: "Order Placed",
      date: order.createdAt && formatDate(order.createdAt, "dd MMM yy, h:mm a"),
      completed: true,
      status: "COMPLETED",
    },
    {
      id: 2,
      label:
        order.status === "FAILED"
          ? `Order Failed Reason: ${order.failureReason}`
          : order.status === "PENDING"
            ? "Order to be process"
            : "Order processed",
      date: order.processDate && formatDate(order.processDate, "dd MMM yy"),
      completed: order.status === "PENDING" ? false : true,
      status: order.status,
    },
  ];

  return (
    <div className="border-b py-6">
      <h2 className="text-md mb-4 font-medium">Status</h2>
      <div className="relative space-y-6">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex items-start gap-3">
            {/* Vertical line */}
            {index !== steps.length - 1 && (
              <div className="absolute top-6 left-[10px] h-full w-px bg-gray-300"></div>
            )}

            {/* Icon */}
            <OrderStatusIcon status={step.status} />

            {/* Text */}
            <div className="space-y-2">
              <p
                className={`text-sm font-medium ${
                  step.completed && "text-muted-foreground"
                }`}
              >
                {step.label}
              </p>
              <p className="text-xs text-gray-500">{step.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderStatusTimeline;
