import type { ApiRequest } from "@/shared/types/types.js";
import type { Request, Response } from "express";

import type {
  CreateSipSchema,
  EditSipSchema,
  StepUpSipSchema,
} from "../schemas/sip.schema.js";
import * as sipService from "../services/sip.service.js";

export const createSip = async (
  req: ApiRequest<CreateSipSchema>,
  res: Response,
) => {
  const { userId } = req.user!;
  const {
    amount,
    sipDate,
    fundName,
    fundShortName,
    fundCategory,
    schemeCode,
    fundHouseDomain,
    fundType,
  } = req.body;

  const { order, sip } = await sipService.createSip({
    userId,
    amount,
    sipDate,
    fundName,
    fundShortName, // required for order placement
    fundCategory,
    schemeCode,
    fundHouseDomain,
    fundType, // required for order placement
  });

  return res
    .status(200)
    .json({ success: true, message: "SIP created successfully", order, sip });
};

export const editSip = async (
  req: ApiRequest<EditSipSchema, { sipId: string }>,
  res: Response,
) => {
  const { userId } = req.user!;
  const { sipId } = req.params;
  const { amount, sipDate } = req.body;

  const result = await sipService.editSip({
    userId,
    sipId,
    amount,
    sipDate,
  });

  return res
    .status(200)
    .json({ success: true, message: result.message, notice: result?.notice });
};

export const skipSip = async (
  req: ApiRequest<{}, { sipId: string }>,
  res: Response,
) => {
  const { userId } = req.user!;
  const { sipId } = req.params;

  await sipService.skipSip(userId, sipId);

  return res
    .status(200)
    .json({ success: true, message: "SIP Skipped Successfully" });
};

export const cancelSip = async (
  req: ApiRequest<{}, { sipId: string }>,
  res: Response,
) => {
  const { sipId } = req.params;

  await sipService.cancelSip(sipId);

  return res
    .status(200)
    .json({ success: true, message: "SIP Cancelled Successfully" });
};

export const getAllSips = async (req: Request, res: Response) => {
  const { userId } = req.user!;

  const data = await sipService.getAllSips(userId);

  return res.status(200).json({
    success: true,
    sips: data.allSips,
    totalActiveSipAmount: data.totalActiveSipAmount,
  });
};

export const getSipDetail = async (
  req: ApiRequest<{}, { sipId: string }>,
  res: Response,
) => {
  const { sipId } = req.params;

  const data = await sipService.getSipDetail(sipId);

  return res.status(200).json({
    success: true,
    sip: data.sipDetail,
    installments: data.installments,
  });
};

// ---------------------------------------------------
// Step-up SIP controllers
// ---------------------------------------------------

export const addOrUpdateStepUp = async (
  req: ApiRequest<StepUpSipSchema, { sipId: string }>,
  res: Response,
) => {
  const { sipId } = req.params;
  const { amount, percentage, intervalInMonths } = req.body;

  const sip = await sipService.addOrUpdateStepUp({
    sipId,
    amount,
    percentage,
    intervalInMonths,
  });

  return res.status(200).json({
    success: true,
    message: "Step-Up added/edited successfully",
    sip,
  });
};

export const removeStepUp = async (
  req: ApiRequest<{}, { sipId: string }>,
  res: Response,
) => {
  const { sipId } = req.params;

  await sipService.removeStepUp(sipId);

  return res
    .status(200)
    .json({ success: true, message: "Step-Up removed successfully" });
};
