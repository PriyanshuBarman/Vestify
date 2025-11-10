export const columnsConfig = {
  return_1y: { name: "1Y Returns", shortName: "1Y", suffix: "%" },
  return_3y: { name: "3Y Returns", shortName: "3Y", suffix: "%" },
  return_5y: { name: "5Y Returns", shortName: "5Y", suffix: "%" },
  return_since_inception: {
    name: "All Returns",
    shortName: "All Returns",
    suffix: "%",
  },
  fund_rating: { name: "Rating", shortName: "Rating", suffix: " ★" },
  expense_ratio: { name: "Expense Ratio", shortName: "TER", suffix: "%" },
  aum: {
    name: "Fund size",
    shortName: "Fund size",
    prefix: "₹",
    suffix: "Cr",
  },
  // sip_min: { name: "Min SIP", shortName: "Min SIP", prefix: "₹" },
  // lump_min: { name: "Min Lumpsum", shortName: "Min Lump.", prefix: "₹" },
};

export const columnKeys = Object.keys(columnsConfig);

export function getNewOrder(clicked, columnKey, orderBy) {
  if (columnKey === clicked) {
    return orderBy === "desc" ? "asc" : "desc";
  }
  return clicked === "expense_ratio" ? "asc" : "desc";
}

export function sortPeersBy(peers, columnKey, orderBy) {
  return peers.toSorted((a, b) =>
    orderBy === "asc"
      ? a[columnKey] - b[columnKey]
      : b[columnKey] - a[columnKey],
  );
}

// For Mobile (Loop)
export function getNextColumn(columnKey) {
  const currentIndex = columnKeys.indexOf(columnKey);
  const nextIndex = (currentIndex + 1) % columnKeys.length;
  return columnKeys[nextIndex];
}
