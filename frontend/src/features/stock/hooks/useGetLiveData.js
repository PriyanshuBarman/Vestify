import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { fetchMultipleStockQuotes, fetchStockData } from "../api/stock";

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

/**
 * Fetches and merges live and fallback data for multiple stock symbols.
 * Returns a map of { symbol: { regularMarketPrice, regularMarketChange, ... } }
 *
 * Only includes entries for symbols that have actual price data available
 * (either from WebSocket live updates or from the REST API batch fetch).
 */
export function useGetMultipleLiveData(symbols) {
  const liveStocks = useSelector((state) => state.stock.liveStocks || {});

  const symbolsKey = useMemo(() => {
    if (!symbols) return "";
    const arr = Array.isArray(symbols) ? symbols : [symbols];
    return arr.filter(Boolean).sort().join(",");
  }, [symbols]);

  // Fetch quotes for all symbols via REST (always enabled, cached for 5 min)
  const { data: batchData } = useQuery({
    queryKey: ["stocks", "quotes", symbolsKey],
    queryFn: () => fetchMultipleStockQuotes(symbolsKey),
    enabled: Boolean(symbolsKey),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
  });

  // Compute merged map only when we have actual data
  // No useMemo — we need this to always reflect the latest batchData/liveStocks
  if (!symbolsKey) return {};
  if (!batchData && Object.keys(liveStocks).length === 0) return {};

  const symbolList = symbolsKey.split(",");
  const mergedMap = {};

  symbolList.forEach((sym) => {
    const cleanSym = sym ? sym.replace(".NS", "").toUpperCase() : "";
    const nseSym = cleanSym ? `${cleanSym}.NS` : "";

    const live = liveStocks[cleanSym] || liveStocks[nseSym] || liveStocks[sym];
    const batch =
      batchData?.[cleanSym] || batchData?.[nseSym] || batchData?.[sym];

    // Only create an entry if we have actual price data from either source
    const price = live?.regularMarketPrice ?? batch?.regularMarketPrice;
    if (price === undefined) return;

    mergedMap[sym] = {
      ...batch,
      ...live,
      regularMarketPrice: price,
      regularMarketChange:
        live?.regularMarketChange ?? batch?.regularMarketChange,
      regularMarketChangePercent:
        live?.regularMarketChangePercent ?? batch?.regularMarketChangePercent,
    };

    if (cleanSym && cleanSym !== sym) {
      mergedMap[cleanSym] = mergedMap[sym];
    }
  });

  return mergedMap;
}
