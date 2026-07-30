function CustomTooltipContent({
  active,
  payload,
  label,
  coordinate,
  viewBox,
  showTimeOnly = false,
}) {
  if (!active || !payload?.length || !coordinate) return null;

  const close = payload[0].payload.close.toFixed(2);

  // Format date for display - handle YYYY-MM-DD format
  let formattedDate = label;

  const date = new Date(label);
  formattedDate = showTimeOnly
    ? date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      })
    : date.toLocaleDateString("en-IN", {
        dateStyle: "medium",
      });

  const tooltipWidth = 140;
  const padding = 14;

  let x = coordinate.x;

  // Clamp X to prevent tooltip overflow
  if (x - tooltipWidth / 2 < 0) {
    x = tooltipWidth / 2 + padding;
  } else if (x + tooltipWidth / 2 > viewBox?.width) {
    x = viewBox?.width - tooltipWidth / 2 - padding;
  }

  return (
    <div
      className="absolute -top-4 left-0 rounded px-4 py-1 text-xs whitespace-nowrap"
      style={{
        left: `${x}px`,
        transform: "translateX(-50%)",
        maxWidth: "90vw",
        textAlign: "center",
        pointerEvents: "none",
      }}
    >
      <span className="">Price: &#8377; {close}</span>
      <span className="mx-1">|</span>
      <span>{formattedDate}</span>
    </div>
  );
}

export default CustomTooltipContent;
