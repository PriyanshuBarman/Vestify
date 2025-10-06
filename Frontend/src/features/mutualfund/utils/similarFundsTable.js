export const columnsConfig = {
  return_1y: {
    name: "1Y Return",
    shortName: "1Y",
    prefix: "",
    suffix: "%",
  },
  return_3y: {
    name: "3Y Returns",
    shortName: "3Y",
    prefix: "",
    suffix: "%",
  },
  return_5y: {
    name: "5Y Returns",
    shortName: "5Y",
    prefix: "",
    suffix: "%",
  },
  return_since_inception: {
    name: "All Returns",
    shortName: "All Returns",
    prefix: "",
    suffix: "%",
  },
  expense_ratio: {
    name: "Expense Ratio",
    shortName: "TER",
    prefix: "",
    suffix: "%",
  },
  aum: {
    name: "Fund size",
    shortName: "Fund size",
    prefix: "₹",
    suffix: "Cr",
  },
  fund_rating: {
    name: "Rating",
    shortName: "Rating",
    prefix: "",
    suffix: " ★",
  },
  sip_min: {
    name: "Min SIP",
    shortName: "Min SIP",
    prefix: "₹",
    suffix: "",
  },
  lump_min: {
    name: "Min Lump.",
    shortName: "Min Lump.",
    prefix: "₹",
    suffix: "",
  },
};

export const columnKeys = Object.keys(columnsConfig);

export function getNewOrder(clicked, activeColumn, sortOrder) {
  if (activeColumn === clicked) {
    return sortOrder === "desc" ? "asc" : "desc";
  }
  return "desc";
}

export function sortPeersBy(peers, activeColumn, order) {
  return peers.toSorted((a, b) =>
    order === "asc"
      ? a[activeColumn] - b[activeColumn]
      : b[activeColumn] - a[activeColumn],
  );
}

// For Mobile (Loop)
export function getNextColumn(activeColumn) {
  const currentIndex = columnKeys.indexOf(activeColumn);
  const nextIndex = (currentIndex + 1) % columnKeys.length;
  return columnKeys[nextIndex];
}
