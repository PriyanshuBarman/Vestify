import type { Server, Socket } from "socket.io";
import { cleanSymbols } from "@/shared/utils/normalize-stock-symbol.js";
import type { TickerSymbol } from "@/shared/types/stock.types.js";
import {
  chartSubscribedStocks,
  startChartPollingIfNeeded,
  stopChartPolling,
} from "../services/chart.service.js";
import {
  startPollingIfNeeded,
  stopPolling,
  subscribedStocks,
} from "../services/polling.service.js";

export const registerStockHandler = (io: Server, socket: Socket) => {
  socket.on("subscribe-stocks", (symbols: TickerSymbol[]) => {
    const rawSymbols = cleanSymbols(symbols);

    rawSymbols.forEach((symbol) => {
      socket.join(symbol);
      subscribedStocks.add(symbol);
    });

    // Try to start polling if market is open and not already polling
    startPollingIfNeeded(io);
  });

  socket.on("unsubscribe-stocks", (symbols: TickerSymbol[]) => {
    const rawSymbols = cleanSymbols(symbols);

    rawSymbols.forEach((symbol) => {
      socket.leave(symbol);

      const roomData = io.sockets.adapter.rooms.get(symbol);
      if (!roomData || roomData.size === 0) {
        subscribedStocks.delete(symbol);
      }
    });

    // Stop polling if no more subscriptions
    if (subscribedStocks.size === 0) {
      stopPolling();
    }
  });

  socket.on("subscribe-intraday-chart", (symbols: TickerSymbol[]) => {
    console.log(`Chart subscription: ${socket.id} subscribed to ${symbols}`);
    const rawSymbols = cleanSymbols(symbols);

    rawSymbols.forEach((symbol) => {
      socket.join(symbol);
      chartSubscribedStocks.add(symbol);
    });

    startChartPollingIfNeeded(io);
  });

  socket.on("unsubscribe-intraday-chart", (symbols: TickerSymbol[]) => {
    console.log("Chart unsubscription");
    const rawSymbols = cleanSymbols(symbols);

    rawSymbols.forEach((symbol) => {
      socket.leave(symbol);

      const roomData = io.sockets.adapter.rooms.get(symbol);
      if (!roomData || roomData.size === 0) {
        chartSubscribedStocks.delete(symbol);
      }
    });

    if (chartSubscribedStocks.size === 0) {
      stopChartPolling();
    }
  });

  socket.on("disconnecting", () => {
    console.log("Disconnecting");

    // Get all sockets in all rooms to check cleanup
    const rooms = io.sockets.adapter.rooms;
    rooms.forEach((roomSockets, roomName) => {
      if (roomSockets.size <= 1) {
        subscribedStocks.delete(roomName);
        chartSubscribedStocks.delete(roomName);
      }
    });

    // Stop polling if no more subscriptions
    if (subscribedStocks.size === 0) {
      stopPolling();
    }

    // Stop chart polling if no more chart subscriptions
    if (chartSubscribedStocks.size === 0) {
      stopChartPolling();
    }
  });
};
