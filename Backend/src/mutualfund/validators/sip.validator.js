import { ApiError } from "../../shared/utils/apiError.utils.js";

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
