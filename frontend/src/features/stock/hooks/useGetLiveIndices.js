import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { fetchIndices } from "../api/stock";

export function useGetLiveIndices(symbols) {
  const isOpen = useSelector((state) => state.stock.isMarketOpen);

  // Select the entire liveStocks and filter in useMemo to avoid selector issues
  const liveStocks = useSelector((state) => state.stock.liveStocks);

  const { data: queryData, isPending } = useQuery({
    queryKey: ["indices", symbols],
    queryFn: () => fetchIndices(symbols),
  });

  // Memoize the result to prevent unnecessary re-renders
  const result = useMemo(() => {
    const symbolsArray = Array.isArray(symbols) ? symbols : [symbols];
    const dataObject = {};

    if (isOpen) {
      symbolsArray.forEach((symbol) => {
        dataObject[symbol] = {
          price:
            liveStocks?.[symbol]?.regularMarketPrice?.toFixed(2) ||
            queryData?.[symbol]?.regularMarketPrice?.toFixed(2),
          change:
            liveStocks?.[symbol]?.regularMarketChange?.toFixed(2) ||
            queryData?.[symbol]?.regularMarketChange?.toFixed(2),
          changePercent:
            liveStocks?.[symbol]?.regularMarketChangePercent?.toFixed(2) ||
            queryData?.[symbol]?.regularMarketChangePercent?.toFixed(2),
          dayHigh:
            liveStocks?.[symbol]?.regularMarketDayHigh?.toFixed(2) ||
            queryData?.[symbol]?.regularMarketDayHigh?.toFixed(2),
          dayLow:
            liveStocks?.[symbol]?.regularMarketDayLow?.toFixed(2) ||
            queryData?.[symbol]?.regularMarketDayLow?.toFixed(2),
          volume:
            liveStocks?.[symbol]?.regularMarketVolume?.toFixed(2) ||
            queryData?.[symbol]?.regularMarketVolume?.toFixed(2),
          fiftyTwoWeekLow:
            liveStocks?.[symbol]?.fiftyTwoWeekLow?.toFixed(2) ||
            queryData?.[symbol]?.fiftyTwoWeekLow?.toFixed(2),
          fiftyTwoWeekHigh:
            liveStocks?.[symbol]?.fiftyTwoWeekHigh?.toFixed(2) ||
            queryData?.[symbol]?.fiftyTwoWeekHigh?.toFixed(2),
        };
      });
    } else {
      symbolsArray.forEach((symbol) => {
        dataObject[symbol] = {
          price: queryData?.[symbol]?.regularMarketPrice?.toFixed(2),
          change: queryData?.[symbol]?.regularMarketChange?.toFixed(2),
          changePercent:
            queryData?.[symbol]?.regularMarketChangePercent?.toFixed(2),
          dayHigh: queryData?.[symbol]?.regularMarketDayHigh?.toFixed(2),
          dayLow: queryData?.[symbol]?.regularMarketDayLow?.toFixed(2),
          volume: queryData?.[symbol]?.regularMarketVolume?.toFixed(2),
          fiftyTwoWeekLow: queryData?.[symbol]?.fiftyTwoWeekLow?.toFixed(2),
          fiftyTwoWeekHigh: queryData?.[symbol]?.fiftyTwoWeekHigh?.toFixed(2),
        };
      });
    }

    return dataObject;
  }, [symbols, isOpen, liveStocks, queryData, isPending]);

  return result;
}
