export const collectionConfig = [
  {
    label: "High Returns",
    img: "/high-returns.svg",
    description: "Funds with highest returns in the last 1 years.",
    filters: {
      limit: 40,
      fund_type: "Equity",
    },
  },
  {
    label: "Gold Funds",
    img: "/gold-funds.svg",
    description:
      "Alternative to buying physical gold as it replicates the price of gold on a daily basis",
    filters: {
      goldFunds: true,
    },
  },
  {
    label: "Sip with ₹100",
    img: "/sip-with-100.svg",
    description: "Funds with min investment of just 100 every month",
    filters: { plan: "GROWTH", limit: 40, sip_min: 100, fund_type: "Equity" },
  },
  {
    label: "Large Cap",
    img: "/large-cap.svg",
    description: "Funds with majority investments in large cap companies.",
    filters: {
      fund_category: "Large Cap Fund",
    },
  },
  {
    label: "Mid Cap",
    img: "/mid-cap.svg",
    description: "Funds with majority investments in mid cap companies.",
    filters: {
      fund_category: "Mid Cap Fund",
    },
  },
  {
    label: "Small Cap",
    img: "/small-cap.svg",
    description: "Funds with majority investments in small cap companies.",
    filters: {
      fund_category: "Small Cap Fund",
    },
  },
];

export const DEFAULT_COLUMNS = [
  "return_1y",
  "return_3y",
  "return_5y",
  "return_since_inception",
  "aum",
];

export const sortOptions = {
  popularity: "Popularity",
  return_1y: "1Y Returns",
  return_3y: "3Y Returns",
  return_5y: "5Y Returns",
  fund_rating: "Rating",
  expense_ratio: "Expense Ratio",
  aum: "Fund Size",
  return_since_inception: "All Returns",
  // lump_min: "Min Lumpsum",
  // sip_min: "Min SIP",
};
