import { ApiError } from "../../shared/utils/apiError.utils.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.utils.js";
import * as sipService from "../services/sip.service.js";

export const createSip = asyncHandler(async (req, res) => {
  const { userId } = req.user;
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
});

export const editSip = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { sipId } = req.params;
  const { amount, sipDate } = req.body;

  if (!sipId || sipId === "") {
    throw new ApiError(400, "sipId is required");
  }
  if (!amount || !sipDate) {
    throw new ApiError(400, "amount or sipDate one is required");
  }

  await sipService.editSip({
    userId,
    sipId,
    amount,
    sipDate,
  });

  return res
    .status(200)
    .json({ success: true, message: "SIP edit request placed" });
});

export const skipSip = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { sipId } = req.params;

  if (!sipId || sipId === "") {
    throw new ApiError(400, `sipId is required`);
  }

  await sipService.skipSip(userId, sipId);

  return res
    .status(200)
    .json({ success: true, message: "SIP Skipped Successfully" });
});

export const cancelSip = asyncHandler(async (req, res) => {
  const { sipId } = req.params;

  if (!sipId || sipId === "") {
    throw new ApiError(400, `sipId is required`);
  }

  await sipService.cancelSip(sipId);

  return res
    .status(200)
    .json({ success: true, message: "SIP Cancelled Successfully" });
});

export const getAllSips = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const data = await sipService.getAllSips(userId);

  return res.status(200).json({
    success: true,
    sips: data.allSips,
    totalActiveSipAmount: data.totalActiveSipAmount,
  });
});

export const getSipDetail = asyncHandler(async (req, res) => {
  const { sipId } = req.params;

  if (!sipId) {
    throw new ApiError(400, "sipId is required");
  }

  const data = await sipService.getSipDetail(sipId);

  return res.status(200).json({
    success: true,
    sip: data.sipDetail,
    installments: data.installments,
  });
});
