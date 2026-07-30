import OrderStatusIcon from "@/components/OrderStatusIcon";

import { getOrderTimelineSteps } from "../utils/orderUtils";

function OrderStatusTimeline({ order }) {
  const steps = getOrderTimelineSteps(order);

  return (
    <div className="border-b  py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-md  font-medium">Order status</h2>
        <div className="flex items-center gap-2">
          <span className="capitalize font-medium text-xs">
            {order.status?.toLowerCase()}
          </span>
          <OrderStatusIcon status={order.status} />
        </div>
      </div>
      <div className="relative mt-6 space-y-6">
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
              {step?.failureReason && (
                <div className="py-2 px-4 rounded-xl bg-negative/25 font-medium text-2xs ">
                  {step.failureReason}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderStatusTimeline;
