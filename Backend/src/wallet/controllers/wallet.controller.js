import { ApiError } from "../../shared/utils/apiError.utils.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.utils.js";
import * as walletService from "../services/wallet.service.js";

export const sendMoney = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const { amount, note, receiverId } = req.body;

  if (!amount) {
    throw new ApiError(400, "amount is required");
  }
  if (amount <= 0) {
    throw new ApiError(400, "amount shouldn't be in negative");
  }
  if (!receiverId) {
    throw new ApiError(400, "receiverId is required");
  }

  const balance = await walletService.sendMoney(
    userId,
    amount,
    note,
    receiverId
  );

  return res.status(201).json({
    success: true,
    message: "Money send successfully",
    balance,
  });
});

export const getAllTnx = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const transactions = await walletService.fetchAllTnx(userId);

  return res.status(200).json({ success: true, transactions });
});

export const checkBalance = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const balance = await walletService.fetchBalance(userId);

  return res.status(200).json({ success: true, balance });
});
