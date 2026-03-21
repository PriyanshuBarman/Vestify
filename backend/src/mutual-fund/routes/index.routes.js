import { Router } from "express";
import { authenticate } from "#shared/middlewares/auth.middleware.js";

import { orderRoutes } from "./order.routes.js";
import { portfolioRoutes } from "./portfolio.routes.js";
import { sipRoutes } from "./sip.routes.js";
import { watchlistRoutes } from "./watchlist.routes.js";

export const mutualFundRoutes = Router();

mutualFundRoutes.use(authenticate);

mutualFundRoutes.use("/orders", orderRoutes);
mutualFundRoutes.use("/portfolio", portfolioRoutes);
mutualFundRoutes.use("/watchlist", watchlistRoutes);
mutualFundRoutes.use("/sips", sipRoutes);
