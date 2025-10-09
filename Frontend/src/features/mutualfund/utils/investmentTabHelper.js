export function sortPortfolio(portfolio, columnKey, orderBy) {
  const sortedPortfolio = portfolio.toSorted((a, b) => {
    return orderBy === "asc"
      ? a[columnKey] - b[columnKey]
      : b[columnKey] - a[columnKey];
  });

  return sortedPortfolio;
}

export function getNewOrder(clicked, columnKey, orderBy) {
  if (columnKey === clicked) {
    return orderBy === "desc" ? "asc" : "desc";
  }
  return clicked === "expense_ratio" ? "asc" : "desc";
}
