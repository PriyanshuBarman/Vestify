export const getTransactionTitle = (tnx, peerProfile, assetInfo) => {
  // 1. Peer-to-Peer Transfer
  if (peerProfile?.name) {
    return peerProfile.name;
  }

  // 2. Stock Order
  if (tnx.assetCategory === "STOCK" || tnx.stockOrder) {
    const stockName =
      tnx.stockOrder?.longName ||
      tnx.stockOrder?.name ||
      assetInfo?.name ||
      "Stock";
    return tnx.type === "DEBIT" ? `Bought ${stockName}` : `Sold ${stockName}`;
  }

  // 3. Mutual Fund Order
  if (tnx.assetCategory === "MUTUAL_FUND" || tnx.mfOrder) {
    const fundName =
      tnx.mfOrder?.fundShortName ||
      tnx.mfOrder?.fundName ||
      assetInfo?.name ||
      "Mutual Fund";
    return tnx.type === "DEBIT" ? fundName : fundName;
  }

  // 4. Other Asset Categories
  if (assetInfo?.name) {
    return tnx.type === "DEBIT"
      ? `Paid for ${assetInfo.name}`
      : `Received from ${assetInfo.name}`;
  }

  // 5. Fallback for Deleted Account / Unknown
  return "Deleted account";
};
