import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useSocket } from "@/components/SocketProvider";

import { fetchIntradayChart } from "../api/stock";
import { useGetLiveData } from "./useGetLiveData";

export function useGetIntradayChart(symbol, isActive = false) {
  const socket = useSocket();
  const [liveChartData, setLiveChartData] = useState(null);
  const live = useGetLiveData(symbol);
  const {
    data: queryData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["stocks", "intraday-chart", symbol],
    queryFn: () => fetchIntradayChart(symbol),
    enabled: Boolean(symbol),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!socket || !isActive || !symbol) {
      socket?.emit("chart:unsubscribe", symbol);
      socket?.off("chart:update");
      return;
    }

    socket.emit("chart:subscribe", symbol);
    socket.on("chart:update", (data) => {
      setLiveChartData(data.data);
    });
    return () => {
      socket.emit("chart:unsubscribe", symbol);
      socket.off("chart:update");
    };
  }, [socket, isActive, symbol]);

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
    error,
    refetch,
  };
}
