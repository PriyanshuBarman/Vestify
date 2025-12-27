import { ApiError } from "#shared/utils/api-error.utils.js";

export const validateSip = (req, res, next) => {
  const amount = req.body.amount;
  const requiredFields = [
    "amount",
    "sipDate",
    "schemeCode",
    "fundName",
    "fundShortName", // required for order placement
    "fundCategory",
    "fundHouseDomain",
    "fundType", // required for order placement
  ];

  for (const field of requiredFields) {
    if (!req.body[field] || req.body[field] == "") {
      throw new ApiError(400, `${field} is required`);
    }
  }

  if (!amount || amount <= 0 || isNaN(amount)) {
    throw new ApiError(400, "Invalid amount");
  }

  next();
};

export const validateSipEdit = (req, res, next) => {
  const { sipId } = req.params;
  const { amount, sipDate } = req.body;
  if (!sipId) {
    throw new ApiError(400, "sipId is required");
  }
  if (!amount && !sipDate) {
    throw new ApiError(400, "amount or sipDate one is required");
  }
  next();
};

export const validateStepUp = (req, res, next) => {
  const { sipId, amount, percentage, intervalInMonths } = req.body;
  if (!sipId) {
    throw new ApiError(400, "sipId is required");
  }
  if (!intervalInMonths) {
    throw new ApiError(400, "interval is required");
  }
  if (!amount && !percentage) {
    throw new ApiError(400, "amount or percentage one is required");
  }
  next();
};
