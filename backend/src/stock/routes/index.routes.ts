import { Router } from "express";
import { authenticate } from "@/shared/middlewares/auth.middleware.js";

import { stockDataRoutes } from "./stock.routes.js";
import { watchlistRoutes } from "./watchlist.routes.js";
import { orderRoutes } from "./order.routes.js";
import { portfolioRoutes } from "./portfolio.routes.js";

export const stockRoutes = Router();

// Authenticated routes
stockRoutes.use("/watchlist", authenticate, watchlistRoutes);
stockRoutes.use("/orders", authenticate, orderRoutes);
stockRoutes.use("/portfolio", authenticate, portfolioRoutes);

// Public stock data routes
stockRoutes.use("/", stockDataRoutes);
