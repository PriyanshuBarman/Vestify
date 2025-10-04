import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { FRONTEND_URL } from "./config/env.config.js";
import { authRoutes } from "./src/auth/routes/auth.routes.js";
import { mutualFundRoutes } from "./src/mutualfund/routes/index.routes.js";
import { errorHandler } from "./src/shared/middlewares/error.middleware.js";
import { notFoundHandler } from "./src/shared/middlewares/notFound.middleware.js";
import { walletRoutes } from "./src/wallet/routes/wallet.routes.js";
import userRoutes from "./src/user/routes/index.routes.js";
import eventRoutes from "./src/shared/events/events.route.js";

const app = express();

app.use(cors({ origin: FRONTEND_URL, credentials: true }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
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
