import type { TickerSymbol } from "@/shared/types/stock.types.js";
import { cleanSymbols } from "@/shared/utils/normalize-stock-symbol.js";
import type { Server, Socket } from "socket.io";
import {
  chartQueue,
  startIntradayChartPollingIfNeeded,
  stopIntradayChartPolling,
} from "../services/intraday-chart-polling.service.js";
import {
  startStockPricePollingIfNeeded,
  stopStockPricePolling,
  stockQueue,
} from "../services/stock-price-polling.service.js";

export const registerStockHandler = (io: Server, socket: Socket) => {
  socket.on("stock:subscribe", (symbols: TickerSymbol | TickerSymbol[]) => {
    const symbolList = Array.isArray(symbols) ? symbols : [symbols];
    const rawSymbols = cleanSymbols(symbolList);

    rawSymbols.forEach((symbol) => {
      socket.join(symbol);
      stockQueue.add(symbol);
    });

    startStockPricePollingIfNeeded(io);
  });

  socket.on("stock:unsubscribe", (symbols: TickerSymbol | TickerSymbol[]) => {
    const symbolList = Array.isArray(symbols) ? symbols : [symbols];
    const rawSymbols = cleanSymbols(symbolList);

    rawSymbols.forEach((symbol) => {
      socket.leave(symbol);

      const roomData = io.sockets.adapter.rooms.get(symbol);
      if (!roomData || roomData.size === 0) {
        stockQueue.delete(symbol);
      }
    });

    if (stockQueue.size === 0) {
      stopStockPricePolling();
    }
  });

  socket.on("chart:subscribe", (symbols: TickerSymbol | TickerSymbol[]) => {
    const symbolList = Array.isArray(symbols) ? symbols : [symbols];
    const rawSymbols = cleanSymbols(symbolList);

    rawSymbols.forEach((symbol) => {
      socket.join(symbol);
      chartQueue.add(symbol);
    });

    startIntradayChartPollingIfNeeded(io);
  });

  socket.on("chart:unsubscribe", (symbols: TickerSymbol | TickerSymbol[]) => {
    const symbolList = Array.isArray(symbols) ? symbols : [symbols];
    const rawSymbols = cleanSymbols(symbolList);

    rawSymbols.forEach((symbol) => {
      socket.leave(symbol);

      const roomData = io.sockets.adapter.rooms.get(symbol);
      if (!roomData || roomData.size === 0) {
        chartQueue.delete(symbol);
      }
    });

    if (chartQueue.size === 0) {
      stopIntradayChartPolling();
    }
  });

  socket.on("disconnecting", () => {
    // Get all sockets in all rooms to check cleanup
    const rooms = io.sockets.adapter.rooms;
    rooms.forEach((roomSockets, roomName) => {
      if (roomSockets.size <= 1) {
        stockQueue.delete(roomName);
        chartQueue.delete(roomName);
      }
    });

    // Stop polling if no more subscriptions
    if (stockQueue.size === 0) {
      stopStockPricePolling();
    }

    // Stop chart polling if no more chart subscriptions
    if (chartQueue.size === 0) {
      stopIntradayChartPolling();
    }
  });
};
