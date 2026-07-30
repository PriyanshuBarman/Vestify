import "dotenv/config";
import cors from "cors";
import requestIp from "request-ip";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import express from "express";
import userRoutes from "./user/routes/index.routes.js";
import authRoutes from "./auth/routes/index.routes.js";
import { stockRoutes } from "./stock/routes/index.routes.js";
import { walletRoutes } from "./wallet/routes/wallet.routes.js";
import { communityRoutes } from "./community/routes/index.routes.js";
import { mutualFundRoutes } from "./mutual-fund/routes/index.routes.js";
import { errorHandler } from "./shared/middlewares/error.middleware.js";
import { notFoundHandler } from "./shared/middlewares/not-found.middleware.js";
import { globalLimiter } from "@/shared/middlewares/rate-limiter.middleware.js";
import { announcementRoutes } from "./announcement/routes/announcement.routes.js";
import { envConfig } from "@/config/env.config.js";
import { publicRoutes } from "./public-api/routes/public-api.routes.js";
import { initSocket } from "./socket/socket.js";

const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO instance
initSocket(httpServer);

app.use(cors({ origin: envConfig.FRONTEND_URL, credentials: true }));
app.use(globalLimiter);
app.use(requestIp.mw());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1/wallet", walletRoutes);
app.use("/api/v1/mutual-funds", mutualFundRoutes);
app.use("/api/v1/community", communityRoutes);
app.use("/api/v1/public", publicRoutes);
app.use("/api/v1", announcementRoutes);
app.use("/api/v1/stocks", stockRoutes);

app.use("/healthz", (_req, res) => {
  res.status(200).json({ message: "ok" });
});

app.all("/{*splat}", notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
