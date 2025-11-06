import { ApiError } from "../../shared/utils/apiError.utils.js";

export const validateInvestmentOrder = (req, res, next) => {
  const {
    amount,
    schemeCode,
    fundName,
    shortName,
    fundType,
    fundCategory,
    fundHouseDomain,
  } = req.body;

  const requiredFields = [
    "amount",
    "schemeCode",
    "fundName",
    "shortName",
    "fundType",
    "fundCategory",
    "fundHouseDomain",
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

export const validateRedemptionOrder = (req, res, next) => {
  const { amount, fundId } = req.body;

  if (!fundId) {
    throw new ApiError(400, "fundId required");
  }

  if (!amount) {
    throw new ApiError(400, "amount required");
  }
  if (isNaN(amount) || amount <= 0) {
    throw new ApiError(400, "invalid amount");
  }

  next();
};
