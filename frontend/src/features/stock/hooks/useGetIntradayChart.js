import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { socket } from "@/config/socket";

import { fetchIntradayChart } from "../api/stock";
import { useGetLiveStockField } from "./useGetLiveStockField";

export function useGetIntradayChart(symbol, isActive = false) {
  const [liveChartData, setLiveChartData] = useState(null);
  const live = useGetLiveStockField(symbol);
  const {
    data: queryData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["intraday-chart", symbol],
    queryFn: () => fetchIntradayChart(symbol),
    staleTime: 0,
  });

  useEffect(() => {
    if (!isActive || !symbol) {
      socket.emit("unsubscribe-intraday-chart", [symbol]);
      socket.off("intraday-chart-update");
      return;
    }

    socket.emit("subscribe-intraday-chart", [symbol]);
    socket.on("intraday-chart-update", (data) => {
      setLiveChartData(data.data);
    });
    return () => {
      socket.emit("unsubscribe-intraday-chart", [symbol]);
      socket.off("intraday-chart-update");
    };
  }, [isActive, symbol]);

  // return live chart data if available & update last point with current/live price, otherwise return query data .
  const data = useMemo(() => {
    if (!liveChartData) return queryData;

    const merged = [...liveChartData];
    if (merged.length > 0 && live.price !== null) {
      merged[merged.length - 1].close = live.price;
    }
    return merged;
  }, [liveChartData, live.price, queryData]);

  return {
    data,
    live,
    setRealtimeData: setLiveChartData,
    isLoading,
    refetch,
  };
}
