import { db } from "@/config/db.config.js";
import bcrypt from "bcrypt";
import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-error.utils.js";

export async function verifyPin(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const { pin } = req.body;
    const { userId } = req.user!;

    if (!pin) {
      throw new ApiError(400, "pin is required");
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: { pin: true },
    });

    if (!user?.pin) {
      throw new ApiError(400, "Please Setup Your Pin First");
    }

    const isMatched = await bcrypt.compare(pin.toString(), user.pin);

    if (!isMatched) {
      throw new ApiError(400, "Invalid Pin");
    }

    next();
  } catch (error) {
    next(error);
  }
}
