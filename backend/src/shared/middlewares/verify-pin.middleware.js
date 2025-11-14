import db from "#config/db.config.js";
import { ApiError } from "../utils/api-error.utils.js";
import bcrypt from "bcrypt";

export const verifyPin = async (req, res, next) => {
  try {
    const { pin } = req.body;
    const { userId } = req.user;

    if (!pin) {
      throw new ApiError(400, "pin is required");
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: { pin: true },
    });

    if (!user.pin) {
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
};
