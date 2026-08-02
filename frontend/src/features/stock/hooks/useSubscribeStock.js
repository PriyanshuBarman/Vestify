import { useEffect } from "react";

import { useSocket } from "@/components/SocketProvider";

/**
 * Subscribes to live stock updates for one symbol or multiple symbols.
 * @param {string | string[]} symbols - A single stock symbol ("TCS") or an array of symbols (["TCS", "INFY"]).
 */

export function useSubscribeStock(symbols, { enabled = true } = {}) {
  const socket = useSocket();

  useEffect(() => {
    if (!socket || !enabled || !symbols || symbols?.length === 0) return;

    const normalizedSymbols = Array.isArray(symbols) ? symbols : [symbols];

    socket.emit("stock:subscribe", normalizedSymbols);

    return () => {
      socket.emit("stock:unsubscribe", normalizedSymbols);
    };
  }, [socket, symbols, enabled]);
}
