// Get count of active filters
export const getActiveFilterCount = (filters) => {
  const count =
    filters.fund_category.length +
    filters.amc_name.length +
    filters.crisil_rating.length +
    (filters.fund_rating_gte !== "" ? 1 : 0) +
    (filters.sort_by !== "popularity" ? 1 : 0);

  return count;
};

// Get active filter buttons configuration
const arr = [
  {
    key: "fund_category",
    label: "Categories",
    component: "FilterCategoriesTab",
  },
  {
    key: "amc_name",
    label: "Fund House",
    component: "FilterFundHouseTab",
  },
  {
    key: "crisil_rating",
    label: "Risk",
    component: "FilterRiskTab",
  },
];

export const getActiveFilterButtons = (filters) => {
  const buttons = [];

  arr.forEach((item) => {
    if (filters[item.key].length > 0) {
      buttons.push({
        ...item,
        count: filters[item.key].length,
      });
    }
  });

  // lastly add the rating filter button if it is selected (separetely because it is not an array)
  if (filters.fund_rating_gte !== "") {
    buttons.push({
      key: "fund_rating_gte",
      label: "Rating",
      component: "FilterRatingsTab",
    });
  }

  return buttons;
};
