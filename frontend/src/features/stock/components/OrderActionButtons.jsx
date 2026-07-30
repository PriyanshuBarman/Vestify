import { useNavigate } from "react-router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function OrderActionButtons({ order, className }) {
  const navigate = useNavigate();

  if (!order || order.status !== "OPEN") return null;

  const handleCancel = () => {
    const isTriggerOrder = order.type === "GTT";
    const orderTypeLabel = isTriggerOrder
      ? "Trigger"
      : `${order.action?.toLowerCase() || ""}`;
    const title = `You are cancelling your ${orderTypeLabel} order for ${order.name} for ${order.quantity} qty`;

    navigate("/stocks/confirm-cancel", {
      state: {
        orderId: order.id,
        title,
      },
    });
  };

  const handleModify = () => {
    if (order.type === "GTT") {
      navigate(`/stocks/gtt-order/${order.symbol}`, {
        state: { order },
      });
    } else {
      navigate("/stocks/buysell", {
        state: { symbol: order.symbol, action: order.action, order },
      });
    }
  };

  return (
    <div className={cn("flex items-center gap-4 flex-row w-full", className)}>
      <Button
        onClick={handleCancel}
        className="text-primary hover:bg-primary/25 flex-1 bg-primary/15 py-5.5"
      >
        Cancel
      </Button>
      <Button onClick={handleModify} className="bg-primary py-5.5 flex-1">
        Modify
      </Button>
    </div>
  );
}

export default OrderActionButtons;
