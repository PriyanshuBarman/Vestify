import { ApiError } from "#shared/utils/api-error.utils.js";
import { asyncHandler } from "#shared/utils/async-handler.utils.js";
import { formatDate } from "date-fns";
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
  const { sipId } = req.params;
  const { amount, sipDate } = req.body;

  const { message, notice } = await sipService.editSip({
    sipId,
    amount,
    sipDate,
  });

  return res.status(200).json({ success: true, message, notice });
});

export const skipSip = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { sipId } = req.params;

  if (!sipId) {
    throw new ApiError(400, `sipId is required`);
  }

  await sipService.skipSip(userId, sipId);

  return res
    .status(200)
    .json({ success: true, message: "SIP Skipped Successfully" });
});

export const cancelSip = asyncHandler(async (req, res) => {
  const { sipId } = req.params;

  if (!sipId) {
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

// ---------------------------------------------------
// Step-up SIP controllers
// ---------------------------------------------------

export const addEditStepUp = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { sipId, amount, percentage, intervalInMonths } = req.body;

  const sip = await sipService.addEditStepUp({
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
});

export const removeStepUp = asyncHandler(async (req, res) => {
  const { sipId } = req.params;
  if (!sipId) {
    throw new ApiError(400, "sipId is required");
  }

  await sipService.removeStepUp(sipId);

  return res
    .status(200)
    .json({ success: true, message: "Step-Up removed successfully" });
});
