import { Router } from "express";
import { authenticate } from "#shared/middlewares/auth.middleware.js";
import { profileRoutes } from "./profile.routes.js";
import { userRoutes } from "./user.routes.js";
import { accountRoutes } from "./account.routes.js";

const router = Router();

router.use("/users", authenticate, userRoutes);
router.use("/profiles", authenticate, profileRoutes);
router.use("/accounts", authenticate, accountRoutes);

export default router;
