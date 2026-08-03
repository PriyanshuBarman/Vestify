import { envConfig } from "@/config/env.config.js";
import type { Server as HTTPServer } from "http";
import { Server } from "socket.io";
import { registerOnlineUsersHandler } from "./handlers/online-users-handler.js";
import { registerStockHandler } from "./handlers/stock-handler.js";
import { authenticateSocket } from "./middlewares/auth.middleware.js";
import { startIntradayChartPollingIfNeeded } from "./services/intraday-chart-polling.service.js";
import { initializeMarketScheduler } from "./services/market-scheduler.service.js";
import { startStockPricePollingIfNeeded } from "./services/stock-price-polling.service.js";
import { isMarketOpen } from "./utils/cron.utils.js";

import { startOrderExecutionIfNeeded } from "./services/stock-order-execution.service.js";

let io: Server | null = null;

export function initSocket(httpServer: HTTPServer): Server {
  io = new Server(httpServer, {
    cors: { origin: envConfig.FRONTEND_URL, credentials: true },
  });

  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    const isOpen = isMarketOpen();
    socket.emit("market:status", isOpen);

    registerOnlineUsersHandler(io!, socket);
    registerStockHandler(io!, socket);
    startStockPricePollingIfNeeded(io!);
    startIntradayChartPollingIfNeeded(io!);
    startOrderExecutionIfNeeded();
  });

  initializeMarketScheduler(io);
  startOrderExecutionIfNeeded();

  return io;
}

export function getIO(): Server {
  if (!io) {
    throw new Error("Socket.io has not been initialized!");
  }
  return io;
}
