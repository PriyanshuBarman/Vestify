export const validateQuery = (req, res, next) => {
  const { sort_by, order_by, fund_type } = req.query;

  const validSortOptions = ["invested", "current", "pnl", "returnPercent"];
  const validOrderOptions = ["asc", "desc"];
  const validFundTypes = ["EQUITY", "DEBT", "HYBRID", "OTHER"];

  if (sort_by && !validSortOptions.includes(sort_by)) {
    return res.status(400).json({
      success: false,
      message: "Invalid sort_by value",
      validSortOptions,
    });
  }

  if (order_by && !validOrderOptions.includes(order_by)) {
    return res.status(400).json({
      success: false,
      message: "Invalid order_by value",
      validOrderOptions,
    });
  }

  if (fund_type && !validFundTypes.includes(fund_type?.toUpperCase())) {
    return res.status(400).json({
      success: false,
      message: "Invalid fundType value",
      validFundTypes,
    });
  }

  next();
};
