import type { ApiRequest } from "@/shared/types/types.js";
import type { Request, Response } from "express";
import type { SendMoneySchema } from "../schemas/wallet.schema.js";
import * as walletService from "../services/wallet.service.js";

export const sendMoney = async (
  req: ApiRequest<SendMoneySchema>,
  res: Response,
) => {
  const { userId } = req.user!;

  const { amount, note, receiverId } = req.body;

  const balance = await walletService.sendMoney({
    userId,
    amount,
    note,
    receiverId,
  });

  res.status(201).json({
    success: true,
    message: "Money send successfully",
    balance,
  });
};

export const getAllTnx = async (req: Request, res: Response) => {
  const { userId } = req.user!;

  const transactions = await walletService.getAllTnx(userId);

  res.status(200).json({ success: true, transactions });
};

export const checkBalance = async (req: Request, res: Response) => {
  const { userId } = req.user!;
  const balance = await walletService.getBalance(userId);

  res.status(200).json({ success: true, balance });
};
