import type { ApiRequest } from "@/shared/types/types.js";
import type { Request, Response } from "express";

import type {
  CreateStockSipSchema,
  EditStockSipSchema,
} from "../schemas/sip.schema.js";
import * as sipService from "../services/sip.service.js";

export const createSip = async (
  req: ApiRequest<CreateStockSipSchema>,
  res: Response,
) => {
  const { userId } = req.user!;
  const {
    symbol,
    name,
    shortName,
    frequency,
    type,
    sipDate,
    amount,
    quantity,
  } = req.body;

  const { sip } = await sipService.createSip({
    userId,
    symbol,
    name,
    shortName,
    frequency,
    type,
    sipDate,
    amount,
    quantity,
  });

  res
    .status(200)
    .json({ success: true, message: "Stock SIP created successfully", sip });
};

export const editSip = async (
  req: ApiRequest<EditStockSipSchema, { sipId: string }>,
  res: Response,
) => {
  const { userId } = req.user!;
  const { sipId } = req.params;
  const { frequency, type, sipDate, amount, quantity } = req.body;

  const result = await sipService.editSip({
    userId,
    sipId,
    frequency,
    type,
    sipDate,
    amount,
    quantity,
  });

  res
    .status(200)
    .json({ success: true, message: result.message, notice: result?.notice });
};

export const cancelSip = async (
  req: ApiRequest<{}, { sipId: string }>,
  res: Response,
) => {
  const { sipId } = req.params;

  await sipService.cancelSip(sipId);

  res
    .status(200)
    .json({ success: true, message: "Stock SIP Cancelled Successfully" });
};

export const getAllSips = async (req: Request, res: Response) => {
  const { userId } = req.user!;

  const data = await sipService.getAllSips(userId);

  res.status(200).json({
    success: true,
    sips: data.sips,
  });
};

export const getSipDetail = async (
  req: ApiRequest<{}, { sipId: string }>,
  res: Response,
) => {
  const { userId } = req.user!;
  const { sipId } = req.params;

  const data = await sipService.getSipDetail(sipId, userId);

  res.status(200).json({
    success: true,
    sip: data.sip,
  });
};
