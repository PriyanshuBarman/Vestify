import "dotenv/config";
import cors from "cors";
import express from "express";
import requestIp from "request-ip";
import cookieParser from "cookie-parser";
import config from "./config/env.config.js";
import { authRoutes } from "./src/auth/routes/auth.routes.js";
import { walletRoutes } from "./src/wallet/routes/wallet.routes.js";
import { eventRoutes } from "./src/shared/events/events.route.js";
import { mutualFundRoutes } from "./src/mutual-fund/routes/index.routes.js";
import { errorHandler } from "./src/shared/middlewares/error.middleware.js";
import { notFoundHandler } from "./src/shared/middlewares/not-found.middleware.js";
import userRoutes from "./src/user/routes/index.routes.js";
import { globalLimiter } from "#shared/middlewares/rate-limiter.middleware.js";

const app = express();

app.use(cors({ origin: config.FRONTEND_URL, credentials: true }));
app.use(globalLimiter);
app.use(requestIp.mw());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/wallet", walletRoutes);
app.use("/api/v1/mutual-funds", mutualFundRoutes);
app.use("/api/v1/events", eventRoutes);

app.use("/healthz", (req, res) => {
  res.status(200).json({ message: "ok" });
});

app.all("*", notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
