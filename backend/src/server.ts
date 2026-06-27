import "dotenv/config";
import cors from "cors";
import express from "express";
import requestIp from "request-ip";
import cookieParser from "cookie-parser";
import userRoutes from "./user/routes/index.routes.js";
import authRoutes from "./auth/routes/index.routes.js";
import { eventRoutes } from "./shared/events/events.route.js";
import { walletRoutes } from "./wallet/routes/wallet.routes.js";
import { communityRoutes } from "./community/routes/community.routes.js";
import { mutualFundRoutes } from "./mutual-fund/routes/index.routes.js";
import { errorHandler } from "./shared/middlewares/error.middleware.js";
import { notFoundHandler } from "./shared/middlewares/not-found.middleware.js";
import { globalLimiter } from "@/shared/middlewares/rate-limiter.middleware.js";
import { announcementRoutes } from "./announcement/routes/announcement.routes.js";
import { envConfig } from "@/config/env.config.js";
import { landingRoutes } from "./landing/routes/landing.routes.js";

const app = express();

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
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/community", communityRoutes);
app.use("/api/v1/landing", landingRoutes);
app.use("/api/v1", announcementRoutes);

app.use("/healthz", (_req, res) => {
  res.status(200).json({ message: "ok" });
});

app.all("/{*splat}", notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
