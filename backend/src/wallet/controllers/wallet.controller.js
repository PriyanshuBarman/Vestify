import * as walletService from "../services/wallet.service.js";

export const sendMoney = async (req, res) => {
  const { userId } = req.user;

  const { amount, note, receiverId } = req.body;

  const balance = await walletService.sendMoney({
    userId,
    amount,
    note,
    receiverId,
  });

  return res.status(201).json({
    success: true,
    message: "Money send successfully",
    balance,
  });
};

export const getAllTnx = async (req, res) => {
  const { userId } = req.user;

  const transactions = await walletService.getAllTnx(userId);

  return res.status(200).json({ success: true, transactions });
};

export const checkBalance = async (req, res) => {
  const { userId } = req.user;
  const balance = await walletService.getBalance(userId);

  return res.status(200).json({ success: true, balance });
};
