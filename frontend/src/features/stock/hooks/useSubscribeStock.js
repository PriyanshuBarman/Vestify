import { useEffect } from "react";

import { socket } from "@/config/socket";

/**
 * Subscribes to live stock updates for one symbol or multiple symbols.
 *
 * @param {string | string[]} symbols - A single stock symbol ("TCS") or an array of symbols (["TCS", "INFY"]).
 *
 */

export function useSubscribeStock(symbols) {
  useEffect(() => {
    if (!symbols || symbols?.length === 0) return;

    const normalizedSymbols = Array.isArray(symbols) ? symbols : [symbols];

    socket.emit("subscribe-stocks", normalizedSymbols);

    return () => {
      socket.emit("unsubscribe-stocks", normalizedSymbols);
    };
  }, [symbols]);
}
