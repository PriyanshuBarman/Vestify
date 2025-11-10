import { ApiError } from "#shared/utils/api-error.utils.js";

export const validateWatchlist = (req, res, next) => {
  const { schemeCode, fundName, fundShortName, fundHouseDomain } = req.body;

  if (!schemeCode) {
    throw new ApiError(400, "schemeCode is required");
  }
  if (!fundName) {
    throw new ApiError(400, "fundName is required");
  }
  if (!fundShortName) {
    throw new ApiError(400, "fundShortName is required");
  }
  if (!fundHouseDomain) {
    throw new ApiError(400, "fundHouseDomain is required");
  }

  next();
};
