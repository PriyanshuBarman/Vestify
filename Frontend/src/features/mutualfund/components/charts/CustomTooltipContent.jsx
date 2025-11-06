function CustomTooltipContent({ active, payload, label, coordinate, viewBox }) {
  if (!active || !payload?.length || !coordinate) return null;

  // const nav = payload[0].payload.nav;
  const nav = payload[0].payload.nav.toFixed(2);

  const tooltipWidth = 140;
  const padding = 10;

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
      <span className="">NAV: ₹ {nav}</span>
      <span className="mx-1">|</span>
      <span>{label}</span>
    </div>
  );
}

export default CustomTooltipContent;
