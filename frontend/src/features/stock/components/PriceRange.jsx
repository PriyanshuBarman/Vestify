import { formatToINR } from "@/utils/formatters";

const getMarkerPositionPercent = (low, high, current) => {
  const min = Math.min(low, high);
  const max = Math.max(low, high);

  if (![min, max, current].every(Number.isFinite) || min === max) return 0;

  return Math.min(100, Math.max(0, ((current - min) / (max - min)) * 100));
};

function PriceRange({ low, high, current, leftTitle, rightTitle }) {
  const dayLow = Math.min(low, high);
  const dayHigh = Math.max(low, high);
  const markerPosition = getMarkerPositionPercent(dayLow, dayHigh, current);

  return (
    <div>
      <div className=" flex items-center justify-between gap-4">
        <div className="flex flex-col items-start">
          <span className="text-muted-foreground text-xs">{leftTitle}</span>
          <span className="mt-1 max-sm:text-sm font-semibold tabular-nums">
            {formatToINR(dayLow)}
          </span>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-muted-foreground text-xs">{rightTitle}</span>
          <span className="mt-1 max-sm:text-sm font-semibold tabular-nums">
            {formatToINR(dayHigh)}
          </span>
        </div>
      </div>

      <div className="relative py-4">
        <div className="h-1 sm:h-1.5  bg-accent" />

        {/* Arrow-Badge */}
        <div
          className="absolute -bottom-0 sm:-bottom-0 -translate-x-1/2"
          style={{ left: `${markerPosition}%` }}
        >
          <div className="mx-auto h-0 w-0 border-x-6 sm:border-x-8 sm:border-b-10 border-b-8  border-r-transparent border-b-foreground border-l-transparent" />
        </div>
      </div>
    </div>
  );
}

export default PriceRange;
