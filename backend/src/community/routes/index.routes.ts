import { Router } from "express";
import { authenticate } from "@/shared/middlewares/auth.middleware.js";
import { coreCommunityRoutes } from "./community.routes.js";
import { mutualFundCommunityRoutes } from "./mutual-fund.routes.js";
import { stockCommunityRoutes } from "./stock.routes.js";

export const communityRoutes = Router();

communityRoutes.use(authenticate);

communityRoutes.use(coreCommunityRoutes);
communityRoutes.use("/users/:username/mutual-funds", mutualFundCommunityRoutes);
communityRoutes.use("/users/:username/stocks", stockCommunityRoutes);
