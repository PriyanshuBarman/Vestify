import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { fetchStockData } from "../api/stock";

export function useGetLiveStockField(symbol) {
  const isMarketOpen = useSelector((state) => state.stock.isMarketOpen);
  const liveData = useSelector((state) => state.stock.liveStocks?.[symbol]);

  const { data: queryData, isPending } = useQuery({
    queryKey: ["stock", symbol],
    queryFn: () => fetchStockData(symbol),
  });

  if (isMarketOpen) {
    return {
      price: liveData?.regularMarketPrice || queryData?.regularMarketPrice,
      change: liveData?.regularMarketChange || queryData?.regularMarketChange,
      changePercent:
        liveData?.regularMarketChangePercent ||
        queryData?.regularMarketChangePercent,
      dayHigh:
        liveData?.regularMarketDayHigh || queryData?.regularMarketDayHigh,
      dayLow: liveData?.regularMarketDayLow || queryData?.regularMarketDayLow,
      volume: liveData?.regularMarketVolume || queryData?.regularMarketVolume,
      fiftyTwoWeekLow: liveData?.fiftyTwoWeekLow || queryData?.fiftyTwoWeekLow,
      fiftyTwoWeekHigh:
        liveData?.fiftyTwoWeekHigh || queryData?.fiftyTwoWeekHigh,
    };
  }

  return {
    isPending,
    price: queryData?.regularMarketPrice,
    change: queryData?.regularMarketChange,
    changePercent: queryData?.regularMarketChangePercent,
    dayHigh: queryData?.regularMarketDayHigh,
    dayLow: queryData?.regularMarketDayLow,
    volume: queryData?.regularMarketVolume,
    fiftyTwoWeekLow: queryData?.fiftyTwoWeekLow,
    fiftyTwoWeekHigh: queryData?.fiftyTwoWeekHigh,
  };
}
