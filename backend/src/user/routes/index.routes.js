import { Router } from "express";
import { profileRoutes } from "./profile.routes.js";
import { userRoutes } from "./user.routes.js";
import { accountRoutes } from "./account.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/profiles", profileRoutes);
router.use("/accounts", accountRoutes);

export default router;
