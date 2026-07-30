import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { fetchStockData } from "../api/stock";

export function useGetLiveData(symbol, { fallback } = {}) {
  const hasFallback = Boolean(fallback);

  const isMarketOpen = useSelector((state) => state.stock.isMarketOpen);
  const liveData = useSelector((state) => state.stock.liveStocks?.[symbol]);

  const { data: queryData, isPending } = useQuery({
    queryKey: ["stocks", "quote", symbol],
    queryFn: () => fetchStockData(symbol),
    enabled: Boolean(symbol) && !hasFallback && !isMarketOpen,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  const baseData = hasFallback ? fallback : queryData;

  if (isMarketOpen) {
    return {
      price:
        liveData?.regularMarketPrice ??
        baseData?.regularMarketPrice ??
        baseData?.price,
      change:
        liveData?.regularMarketChange ??
        baseData?.regularMarketChange ??
        baseData?.change,
      changePercent:
        liveData?.regularMarketChangePercent ??
        baseData?.regularMarketChangePercent ??
        baseData?.changePercent,
      dayHigh:
        liveData?.regularMarketDayHigh ??
        baseData?.regularMarketDayHigh ??
        baseData?.dayHigh,
      dayLow:
        liveData?.regularMarketDayLow ??
        baseData?.regularMarketDayLow ??
        baseData?.dayLow,
      volume:
        liveData?.regularMarketVolume ??
        baseData?.regularMarketVolume ??
        baseData?.volume,
      fiftyTwoWeekLow: liveData?.fiftyTwoWeekLow ?? baseData?.fiftyTwoWeekLow,
      fiftyTwoWeekHigh:
        liveData?.fiftyTwoWeekHigh ?? baseData?.fiftyTwoWeekHigh,
    };
  }

  return {
    isPending: hasFallback ? false : isPending,
    price: baseData?.regularMarketPrice ?? baseData?.price ?? 0,
    change: baseData?.regularMarketChange ?? baseData?.change ?? 0,
    changePercent:
      baseData?.regularMarketChangePercent ?? baseData?.changePercent ?? 0,
    dayHigh: baseData?.regularMarketDayHigh ?? baseData?.dayHigh ?? 0,
    dayLow: baseData?.regularMarketDayLow ?? baseData?.dayLow ?? 0,
    volume: baseData?.regularMarketVolume ?? baseData?.volume ?? 0,
    fiftyTwoWeekLow: baseData?.fiftyTwoWeekLow ?? 0,
    fiftyTwoWeekHigh: baseData?.fiftyTwoWeekHigh ?? 0,
  };
}
