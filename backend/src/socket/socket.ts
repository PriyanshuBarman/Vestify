import { envConfig } from "@/config/env.config.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { registerStockHandler } from "./handlers/stock-handler.js";
import { initializeMarketScheduler } from "./services/market-scheduler.service.js";
import { startPollingIfNeeded } from "./services/polling.service.js";
import { startChartPollingIfNeeded } from "./services/chart.service.js";
import { isMarketOpen } from "./utils/cron.utils.js";

export const app = express();
export const server = createServer(app);
const io = new Server(server, {
  cors: { origin: envConfig.FRONTEND_URL, credentials: true },
});

io.on("connection", (socket) => {
  startPollingIfNeeded(io);
  startChartPollingIfNeeded(io);
  const isOpen = isMarketOpen();
  io.emit("market-status-update", isOpen);

  registerStockHandler(io, socket);
});

initializeMarketScheduler(io);
