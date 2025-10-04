import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { addClient } from "./eventManager.js";

const router = Router();

router.get("/", authenticate, (req, res) => {
  const { userId } = req.user;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  addClient(userId, res);

  // Initial connection message
  res.write(`data: ${JSON.stringify({ type: "CONNECTED" })}\n\n`);
});

export default router;
