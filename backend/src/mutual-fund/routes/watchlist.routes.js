import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import * as watchlistService from "../controllers/watchlist.controller.js";
import { validateWatchlist } from "../validators/watchlist.validator.js";

export const watchlistRoutes = Router();

watchlistRoutes.post(
  "/",
  authenticate,
  validateWatchlist,
  watchlistService.addToWatchlist
);

watchlistRoutes.delete(
  "/:schemeCode",
  authenticate,
  watchlistService.removeFromWatchlist
);

watchlistRoutes.get("/", authenticate, watchlistService.getWatchlist);

watchlistRoutes.get(
  "/:schemeCode",
  authenticate,
  watchlistService.isInWatchlist
);
