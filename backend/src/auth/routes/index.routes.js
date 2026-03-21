import { Router } from "express";
import { authRoutes } from "./auth.routes.js";
import { sessionRoutes } from "./session.routes.js";

const router = Router();

router.use("/", authRoutes);
router.use("/sessions", sessionRoutes);

export default router;
